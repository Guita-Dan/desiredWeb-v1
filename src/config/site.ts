export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Desired Web",
  description: "Creative Web Design Agency specializing in modern and responsive designs.",
  url: "https://desiredweb.com",
  address: "123 Creative Avenue, Web City, Designland",
  phone: "+1 (555) 123-4567",
  email: "contact@desiredweb.com",
  mainNav: [
    {
      title: "Services",
      href: "/services",
      description: "Explore the design and development services we offer.",
      items: [],
    },
    {
      title: "Portfolio",
      href: "/portfolio",
      description: "Browse our latest projects and designs.",
      items: [],
    },
    {
      title: "About Us",
      href: "/about",
      description: "Learn more about Desired Web and our story.",
      items: [],
    },
    {
      title: "Blog",
      href: "/blog",
      description: "Get insights, tips, and updates from our team.",
      items: [],
    },
    {
      title: "Contact",
      href: "/contact",
      description: "Reach out to us for your web design needs.",
      items: [],
    },
  ]
};
