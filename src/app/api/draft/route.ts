import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPageById, getStoryById } from "@/ai/live-data";

type QueryMap = Record<string, string | undefined>;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries()) as QueryMap;

  if (!process.env.PREVIEW_SECRET || params.secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  const rawSlug = (params.slug || "").trim();
  const rawId = Number(params.id || "");
  const type = (params.type || "post").toLowerCase();

  if (rawSlug) {
    const normalized = rawSlug.startsWith("/") ? rawSlug : `/${rawSlug}`;
    const target =
      type === "page"
        ? normalized
        : normalized.startsWith("/stories/")
          ? normalized
          : `/stories/${normalized.replace(/^\//, "")}`;
    redirect(target);
  }

  if (Number.isFinite(rawId) && rawId > 0) {
    if (type === "page") {
      const page = await getPageById(rawId, { preview: true });
      if (page?.uri) {
        redirect(page.uri);
      }
    } else {
      const post = await getStoryById(rawId, { preview: true });
      if (post?.slug) {
        redirect(`/stories/${post.slug}`);
      }
    }
  }

  redirect("/");
}
