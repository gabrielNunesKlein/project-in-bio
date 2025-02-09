import Header from "./components/leadingPage/header";
import Hero from "./components/leadingPage/hero";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Hero />
      { /*
      <VideoExplanation />
      <Pricing />
      <FAQ /> */}
    </div>
  );
}
