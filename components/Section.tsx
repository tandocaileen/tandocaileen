export default function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`flex min-h-[100svh] snap-start flex-col justify-center py-28 ${className}`}
    >
      {children}
    </section>
  );
}
