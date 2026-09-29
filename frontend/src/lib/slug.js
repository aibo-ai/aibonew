/**
 * URL-safe slug: lowercase, alphanumerics joined by single hyphens.
 * Mirrors slugify() in backend/routes/admin_api.py so a post's link, its
 * canonical URL and the API lookup always agree — even for legacy rows whose
 * stored slug has stray spaces or pasted text (e.g. "…-question Meta title ").
 */
export function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const blogPath = (blog) => `/blog/${slugify(blog.slug) || blog.id}`;
