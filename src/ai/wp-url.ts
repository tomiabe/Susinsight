export function getWordPressBaseUrl(): string {
  const explicit =
    process.env.WORDPRESS_BASE_URL ||
    process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL;
  if (explicit) return explicit.endsWith("/") ? explicit.slice(0, -1) : explicit;

  const graphql = process.env.WORDPRESS_GRAPHQL_URL;
  if (!graphql) return "https://susinsight.com";

  try {
    const parsed = new URL(graphql);
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return "https://susinsight.com";
  }
}

export function getWordPressLoginUrl(): string {
  const explicit =
    process.env.WORDPRESS_LOGIN_URL ||
    process.env.NEXT_PUBLIC_WORDPRESS_LOGIN_URL;
  if (explicit) return explicit;
  return `${getWordPressBaseUrl()}/wp-login.php`;
}

export function getWordPressAdminUrl(): string {
  const explicit =
    process.env.WORDPRESS_ADMIN_URL ||
    process.env.NEXT_PUBLIC_WORDPRESS_ADMIN_URL;
  if (explicit) return explicit;
  return `${getWordPressBaseUrl()}/wp-admin/`;
}
