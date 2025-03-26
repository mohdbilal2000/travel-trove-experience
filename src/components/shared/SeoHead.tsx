
import { Helmet } from "react-helmet";

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
}

const SeoHead = ({
  title,
  description,
  keywords,
  ogImage = "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop",
  ogType = "website",
  canonicalUrl,
  structuredData,
}: SeoHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Structured Data for SEO */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SeoHead;
