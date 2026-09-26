export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "PhotographyStudio",
    "@id": "https://YOUR-DOMAIN.com/#business",
    name: "MAX Studio",
    url: "https://YOUR-DOMAIN.com",
    image: "https://YOUR-DOMAIN.com/images/studio/max-studio.jpg",
    telephone: "+91-XXXXXXXXXX",

    address: {
      "@type": "PostalAddress",
      streetAddress: "YOUR REAL ADDRESS",
      addressLocality: "Delhi",
      addressRegion: "Delhi",
      postalCode: "YOUR PINCODE",
      addressCountry: "IN",
    },

    areaServed: {
      "@type": "City",
      name: "Delhi",
    },

    priceRange: "₹₹",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}