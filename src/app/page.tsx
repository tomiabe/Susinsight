import App from "@/ai/App";
import { getLiveHomeData } from "@/ai/live-data";
import { draftMode } from "next/headers";

export default async function HomePage() {
  const draft = await draftMode();
  const liveData = await getLiveHomeData({ preview: draft.isEnabled });
  return <App liveData={liveData} />;
}
