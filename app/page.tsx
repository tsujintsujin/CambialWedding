import Header from "./components/Header";
import Hero from "./components/Hero";
import Events from "./components/Events";
import Articles from "./components/Articles";
import FeaturedArtwork from "./components/FeaturedArtwork";
import About from "./components/About";
import CollectionCTA from "./components/CollectionCTA";
import { SectionNavProvider } from "./components/SectionNavContext";
import ScrollLockSections from "./components/ScrollLockSections";

const IDS = ["home", "blog", "articles", "artists", "about", "collection"];

export default function Home() {
  return (
    <SectionNavProvider ids={IDS}>
      <Header />
      <ScrollLockSections
        sections={[
          <Hero key="home" />,
          <Events key="blog" />,
          <Articles key="articles" />,
          <FeaturedArtwork key="artists" />,
          <About key="about" />,
          <CollectionCTA key="collection" />,
        ]}
      />
    </SectionNavProvider>
  );
}
