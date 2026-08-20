export default function About() {
  return (
    <section className="flex h-full w-full items-center overflow-y-auto bg-paper px-6 text-ink md:px-12">
      <div className="mx-auto grid w-full max-w-[1400px] gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <p className="text-[12px] uppercase tracking-widest2 text-ink/40">About</p>
        <div>
          <h2 className="font-display text-3xl italic leading-snug text-ink md:text-4xl">
            Each painting in this collection has a story behind it, and we
            cannot and would not pick out any single one as a favorite.
          </h2>
          <p className="mt-8 max-w-lg text-sm leading-relaxed text-ink/60">
            GalleryType brings together contemporary painters, sculptors, and
            photographers whose work spans two decades of quiet, deliberate
            practice. The collection travels between museums and private
            spaces, always returning home to be seen again with fresh eyes.
          </p>
        </div>
      </div>
    </section>
  );
}
