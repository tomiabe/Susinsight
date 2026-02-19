import { redirect } from "next/navigation";
import { getWordPressLoginUrl } from "@/ai/wp-url";

export default function LoginRedirectPage() {
  redirect(getWordPressLoginUrl());
}
