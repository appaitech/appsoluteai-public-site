import { Helmet } from 'react-helmet-async';
import { Organization, WithContext } from 'schema-dts';

export function Seo() {
  const schema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AppsoluteAI",
    "description": "Transform Your Ideas into Real Applications",
    "url": "https://appsoluteai.com",
    "logo": "https://appsoluteai.com/logo.png",
    "sameAs": [
      "https://twitter.com/appsoluteai",
      "https://linkedin.com/company/appsoluteai",
      "https://github.com/appsoluteai"
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
      <title>AppsoluteAI - Transform Ideas into Reality</title>
      <meta name="description" content="Transform your ideas into reality with AppsoluteAI" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {/* Primary Meta Tags */}
      <meta name="title" content="AppsoluteAI - Transform Your Ideas into Real Applications" />
      <meta name="keywords" content="app development, idea to app, custom software development, MVP development, fast app deployment, mobile app development, web application, enterprise solutions" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://appsoluteai.com/" />
      <meta property="og:title" content="AppsoluteAI - Transform Your Ideas into Real Applications" />
      <meta property="og:description" content="Transform your ideas into reality with AppsoluteAI's rapid development services." />
      <meta property="og:image" content="https://appsoluteai.com/og-image.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://appsoluteai.com/" />
      <meta property="twitter:title" content="AppsoluteAI - Transform Your Ideas into Real Applications" />
      <meta property="twitter:description" content="Transform your ideas into reality with AppsoluteAI's rapid development services." />
      <meta property="twitter:image" content="https://appsoluteai.com/twitter-image.jpg" />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#10b981" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://appsoluteai.com" />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
} 