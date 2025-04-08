
import { Helmet } from "react-helmet";

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
  noIndex?: boolean;
  alternateLanguages?: Array<{
    hrefLang: string;
    href: string;
  }>;
  twitterCardType?: "summary" | "summary_large_image" | "app" | "player";
  twitterSite?: string;
  twitterCreator?: string;
}

const SeoHead = ({
  title,
  description,
  keywords,
  ogImage = "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop",
  ogType = "website",
  canonicalUrl,
  structuredData,
  noIndex = false,
  alternateLanguages = [],
  twitterCardType = "summary_large_image",
  twitterSite = "@guideindia",
  twitterCreator = "@guideindia",
}: SeoHeadProps) => {
  // Format structuredData to handle arrays properly
  const formatStructuredData = () => {
    if (!structuredData) return null;
    
    if (Array.isArray(structuredData)) {
      return structuredData.map(data => JSON.stringify(data));
    } else {
      return JSON.stringify(structuredData);
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Indexing controls */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Alternate language versions */}
      {alternateLanguages.map((lang) => (
        <link 
          key={lang.hrefLang} 
          rel="alternate" 
          hrefLang={lang.hrefLang} 
          href={lang.href} 
        />
      ))}
      
      {/* Structured Data for SEO */}
      {Array.isArray(structuredData) ? (
        structuredData.map((data, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))
      ) : (
        structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )
      )}
    </Helmet>
  );
};

export default SeoHead;
