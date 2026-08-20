import Header from "./components/Header";
import Hero from "./components/Hero";
import Events from "./components/Events";
import Articles from "./components/Articles";
import FeaturedArtwork from "./components/FeaturedArtwork";
import About from "./components/About";
import CollectionCTA from "./components/CollectionCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Events />
        <Articles />
        <FeaturedArtwork />
        <About />
        <CollectionCTA />
      </main>
      <Footer />
    </>
  );
}
