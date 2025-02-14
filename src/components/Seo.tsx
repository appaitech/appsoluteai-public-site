import { Helmet } from 'react-helmet-async';
import { Organization, WithContext } from 'schema-dts';

export function Seo() {
  const schema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Idea2RealApp",
    "description": "Transform Your Ideas into Real Applications",
    "url": "https://idea2realapp.com",
    "logo": "https://idea2realapp.com/logo.png",
    "sameAs": [
      "https://twitter.com/idea2realapp",
      "https://linkedin.com/company/idea2realapp",
      "https://github.com/idea2realapp"
    ],
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+1-234-567-8900",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    }],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };

  return (
    <Helmet>
      <title>Idea2RealApp - Transform Ideas into Reality</title>
      <meta name="description" content="Transform your ideas into reality with Idea2RealApp" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {/* Primary Meta Tags */}
      <meta name="title" content="Idea2RealApp - Transform Your Ideas into Real Applications" />
      <meta name="keywords" content="app development, idea to app, custom software development, MVP development, fast app deployment, mobile app development, web application, enterprise solutions" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://idea2realapp.com/" />
      <meta property="og:title" content="Idea2RealApp - Transform Your Ideas into Real Applications" />
      <meta property="og:description" content="Transform your ideas into reality with Idea2RealApp's rapid development services." />
      <meta property="og:image" content="https://idea2realapp.com/og-image.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://idea2realapp.com/" />
      <meta property="twitter:title" content="Idea2RealApp - Transform Your Ideas into Real Applications" />
      <meta property="twitter:description" content="Transform your ideas into reality with Idea2RealApp's rapid development services." />
      <meta property="twitter:image" content="https://idea2realapp.com/twitter-image.jpg" />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#10b981" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://idea2realapp.com" />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
} 