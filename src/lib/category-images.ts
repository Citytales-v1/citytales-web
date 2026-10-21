/** Shown only when a category has no image set in the backend. */
const CATEGORY_FALLBACK_IMAGE = "/images/events/hero-wide.jpg";

/** Event category tile photo (Pick your Vibe + Explore) — the backend's `imageUrl`. */
export function categoryCoverImage(imageUrl?: string | null): string {
  return imageUrl?.trim() || CATEGORY_FALLBACK_IMAGE;
}
