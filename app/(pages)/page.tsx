import FAQ from "../components/leadingPage/faq";
import Header from "../components/leadingPage/header";
import Hero from "../components/leadingPage/hero";
import Pricing from "../components/leadingPage/pricing";
import VideoExplanation from "../components/leadingPage/video-explanation";
import { trackServerEvent } from '@/app/lib/mixpanel'

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
