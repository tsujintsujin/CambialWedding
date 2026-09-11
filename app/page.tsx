import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Venues from "./components/Venues";
import Story from "./components/Story";
import Motif from "./components/Motif";
import Rsvp from "./components/Rsvp";
import Guestbook from "./components/Guestbook";
import Details from "./components/Details";
import Gallery from "./components/Gallery";
import { galleryImages } from "./lib/galleryFiles";
import Footer from "./components/Footer";
import Music from "./components/Music";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Countdown />
        <Venues />
        <Motif />
        <Rsvp />
        <Guestbook />
        <Details />
        <Gallery images={galleryImages()} />
      </main>
      <Footer />
      <Music />
    </>
  );
}
