import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type RevalidateBody = {
  secret?: string;
  path?: string;
  paths?: string[];
  postType?: string;
  slug?: string;
  categorySlug?: string;
  tagSlug?: string;
  authorSlug?: string;
};

function normalizePath(path: string): string {
  if (!path) return "/";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    try {
      const parsed = new URL(path);
      return parsed.pathname || "/";
    } catch {
      return "/";
    }
  }
  return path.startsWith("/") ? path : `/${path}`;
}

function inferPaths(body: RevalidateBody): string[] {
  const inferred = new Set<string>(["/", "/sitemap.xml"]);

  if (Array.isArray(body.paths)) {
    for (const path of body.paths) {
      if (typeof path === "string" && path.trim()) inferred.add(normalizePath(path.trim()));
    }
  }

  if (typeof body.path === "string" && body.path.trim()) {
    inferred.add(normalizePath(body.path.trim()));
  }

  if (body.slug) {
    if (body.postType === "page") {
      inferred.add(normalizePath(body.slug));
    } else {
      inferred.add(`/stories/${body.slug.replace(/^\/+/, "").replace(/\/+$/, "")}`);
    }
  }

  if (body.categorySlug) inferred.add(`/category/${body.categorySlug}`);
  if (body.tagSlug) inferred.add(`/tag/${body.tagSlug}`);
  if (body.authorSlug) inferred.add(`/author/${body.authorSlug}`);

  inferred.add("/search");
  return [...inferred];
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "REVALIDATE_SECRET is not set" },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const querySecret = url.searchParams.get("secret");
  let body: RevalidateBody = {};

  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    body = {};
  }

  const bodySecret = typeof body.secret === "string" ? body.secret : "";
  if (querySecret !== secret && bodySecret !== secret) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }

  const paths = inferPaths(body);
  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    ok: true,
    revalidated: paths,
    now: new Date().toISOString()
  });
}

export async function GET(request: Request) {
  return POST(request);
}
