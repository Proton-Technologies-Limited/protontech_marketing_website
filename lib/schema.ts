import { howItWorks, solutions } from "./content";
import { site } from "./site";

/** schema.org structured data for the landing page (rendered as JSON-LD). */
export function landingSchema() {
  const org = `${site.url}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: site.legalName,
        alternateName: site.name,
        url: site.url,
        logo: `${site.url}/brand/proton-logo.png`,
        email: site.email,
        description: site.description,
        ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": org },
        inLanguage: "en",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#service`,
        name: `${site.name}: free websites for decoration companies`,
        url: site.url,
        image: `${site.url}/opengraph-image`,
        provider: { "@id": org },
        description: site.description,
        areaServed: "Worldwide",
        serviceType: "B2B web design and development",
        knowsAbout: solutions.capabilities,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Website plans",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Custom website design & build",
              price: String(site.pricing.build),
              priceCurrency: site.pricing.currency,
              description: "Custom design, development and launch of your business website.",
            },
            {
              "@type": "Offer",
              name: "Hosting & care plan",
              price: String(site.pricing.carePerYear),
              priceCurrency: site.pricing.currency,
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: String(site.pricing.carePerYear),
                priceCurrency: site.pricing.currency,
                unitText: "YEAR",
              },
              description: "Hosting, SSL, maintenance, security updates, backups and support.",
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: howItWorks.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
