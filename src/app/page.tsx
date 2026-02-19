import App from "@/ai/App";
import { getLiveHomeData, getNavigationData } from "@/ai/live-data";
import { draftMode } from "next/headers";

export default async function HomePage() {
  const draft = await draftMode();
  const [liveData, navigation] = await Promise.all([
    getLiveHomeData({ preview: draft.isEnabled }),
    getNavigationData()
  ]);

  return <App liveData={liveData} navItems={navigation.navItems} footerLinks={navigation.footerLinks} />;
}
