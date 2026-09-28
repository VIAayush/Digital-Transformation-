// Company facts taken from the existing viralinbound.com site.
// Keep this file the single source for contact details and external links.

export const SITE = {
  name: "Viral Inbound",
  url: "https://viralinbound.com",
  email: "hello@viralinbound.com",
  phone: "+91 8968430834",
  phoneHref: "tel:+918968430834",
  whatsapp: "https://wa.me/918968430834",
  bookCall: "https://calendar.app.google/F8fMPtg6ixrFUiqh7",
  hours: "9:30–6:30 IST, Mon–Fri",
  offices: [
    { city: "Bengaluru", line: "Koramangala, Bengaluru 560047" },
    { city: "Thane", line: "Thane West, Thane, Maharashtra 400607" },
  ],
  social: [
    { label: "LinkedIn", href: "https://linkedin.com/company/viralinbound" },
    { label: "X", href: "https://x.com/viralinbound" },
    { label: "Instagram", href: "https://instagram.com/viralinbound" },
  ],
  legal: [
    { label: "Privacy Policy", href: "https://viralinbound.com/privacy-policy" },
    { label: "Cookie Policy", href: "https://viralinbound.com/cookie-policy" },
    { label: "Terms & Conditions", href: "https://viralinbound.com/terms-conditions" },
  ],
  careers: "https://viralinbound.com/careers",
  // Existing Google Apps Script endpoint used by every form on the live site.
  formEndpoint:
    "https://script.google.com/macros/s/AKfycbzg3Qw2dlz0coiDv-4Q7kAtIJxL4jjqQUMugthcSVBEabT4kCjbRJS2_6RR0vW3lFQd/exec",
  analytics: {
    gtm: "GTM-M7FT3M4Q",
    ga: "G-WYRYEV8PCD",
  },
} as const;

export const NAV = [
  { label: "Solutions", href: "/#solutions" },
  { label: "Approach", href: "/#approach" },
  { label: "Products / Work", href: "/#work" },
  { label: "AI & Automation", href: "/#ai" },
  { label: "About", href: "/#why" },
  { label: "Contact", href: "/#start" },
] as const;
