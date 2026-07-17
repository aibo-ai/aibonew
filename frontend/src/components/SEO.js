import { Helmet } from 'react-helmet';

const SITE_URL = 'https://www.myaibo.in';
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

/**
 * @param {string} title - Page <title> and og:title/twitter:title
 * @param {string} description - Meta description and og:description/twitter:description
 * @param {string} [path] - Path only, e.g. "/solutions/geo" — used to build the canonical URL and og:url.
 *                          If omitted, no canonical tag is rendered.
 * @param {string[]} [keywords] - Optional list of target keywords for this page.
 * @param {string} [image] - Absolute URL to a page-specific social share image. Falls back to the site default.
 */
export default function SEO({ title, description, path, keywords, image }) {
  const canonicalUrl = path ? `${SITE_URL}${path}` : undefined;
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph — overrides the generic defaults in index.html for this page */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MyAibo" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@myaibo_in" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
