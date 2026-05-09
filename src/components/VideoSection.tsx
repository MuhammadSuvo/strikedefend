function toEmbedUrl(input: string): string | null {
  const url = input.trim();
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    let id: string | null = null;
    if (host === "youtu.be") {
      id = u.pathname.slice(1);
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch") id = u.searchParams.get("v");
      else if (u.pathname.startsWith("/embed/")) id = u.pathname.slice("/embed/".length);
      else if (u.pathname.startsWith("/shorts/")) id = u.pathname.slice("/shorts/".length);
    }
    if (!id) return null;
    id = id.split(/[/?]/)[0];
    if (!/^[A-Za-z0-9_-]{6,}$/.test(id)) return null;
    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return null;
  }
}

export function VideoSection({
  enabled,
  title,
  subtitle,
  url
}: {
  enabled: boolean;
  title: string;
  subtitle: string;
  url: string | null;
}) {
  if (!enabled || !url) return null;
  const embed = toEmbedUrl(url);
  if (!embed) return null;
  return (
    <section className="border-y border-white/5 bg-ink-800/30">
      <div className="section py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="tag">Watch</span>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">{title}</h2>
          {subtitle && <p className="mt-3 text-sm text-white/70 sm:text-base">{subtitle}</p>}
        </div>
        <div className="mx-auto mt-8 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-glow">
          <div className="relative aspect-video w-full">
            <iframe
              src={embed}
              title={title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
