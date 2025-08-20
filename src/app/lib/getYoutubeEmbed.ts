export function getYoutubeEmbed(url: string): string {
  try {
    const parsed = new URL(url);

    // Normal video → https://www.youtube.com/watch?v=XXXX
    if (parsed.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
    }

    // Shorts → https://www.youtube.com/shorts/XXXX
    if (parsed.pathname.startsWith("/shorts/")) {
      const id = parsed.pathname.split("/")[2];
      return `https://www.youtube.com/embed/${id}`;
    }

    // Playlist → https://www.youtube.com/playlist?list=XXXX
    if (parsed.searchParams.get("list")) {
      return `https://www.youtube.com/embed/videoseries?list=${parsed.searchParams.get("list")}`;
    }

    // Embed ya válido
    if (parsed.pathname.startsWith("/embed/")) {
      return url;
    }

    // Si no coincide con nada, devuelvo el original
    return url;
  } catch {
    // Eliminamos el parámetro 'e' ya que no se usa
    return url;
  }
}