export default function CollectionCTA() {
  return (
    <section id="collection" className="relative overflow-hidden bg-accent-deep px-6 py-28 text-center md:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(166,41,58,0.5),transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-xl">
        <p className="mb-4 text-[12px] uppercase tracking-widest2 text-paper/50">The Collection</p>
        <h2 className="font-display text-4xl italic text-paper md:text-5xl">
          Discover the full collection
        </h2>
        <a
          href="#contact"
          className="mt-10 inline-block rounded-full border border-paper/30 px-8 py-3 text-[12px] uppercase tracking-widest2 text-paper transition-colors hover:border-paper hover:bg-paper hover:text-accent-deep"
        >
          Explore
        </a>
      </div>
    </section>
  );
}
