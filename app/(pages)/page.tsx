import { Metadata } from "next";
import FAQ from "../components/leadingPage/faq";
import Header from "../components/leadingPage/header";
import Hero from "../components/leadingPage/hero";
import Pricing from "../components/leadingPage/pricing";
import VideoExplanation from "../components/leadingPage/video-explanation";
import { trackServerEvent } from '@/app/lib/mixpanel'
import { getSEOTags } from "../lib/seo";

export const metadata: Metadata = getSEOTags({
  appName: "ProjectInBio",
  appDescription:
    "ProjectInBio - Seus projetos e redes sociais em um único link",
  keywords: ["ProjectInBio", "projetos", "redes sociais", "link"],
  appDomain: "https://project-in-bio-gamma-vert.vercel.app/",
  canonicalUrlRelative: "/",
});

export default function Home() {
  
  trackServerEvent("page_view", {
    page: "home",
  });

  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Hero />
      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  );
}
