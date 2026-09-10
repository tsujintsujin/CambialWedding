export default function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-[12px] uppercase tracking-widest2 text-muted">
      {children}
    </p>
  );
}
