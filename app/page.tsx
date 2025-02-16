import FAQ from "./components/leadingPage/faq";
import Header from "./components/leadingPage/header";
import Hero from "./components/leadingPage/hero";
import Pricing from "./components/leadingPage/pricing";
import VideoExplanation from "./components/leadingPage/video-explanation";

export default function Home() {
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
