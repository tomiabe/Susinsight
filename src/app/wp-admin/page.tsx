import { redirect } from "next/navigation";
import { getWordPressAdminUrl } from "@/ai/wp-url";

export default function WpAdminRedirectPage() {
  redirect(getWordPressAdminUrl());
}
