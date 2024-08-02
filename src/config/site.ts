/**
 * Configuration object for the site, including name, description, and relevant links.
 */
export const siteConfig = {
  name: "Barrierefreiheit im öffentlichen Verkehr der Schweiz",
  description:
    "Offene Daten für den öffentlichen Verkehr in der Schweiz: Zugang für alle und inklusive Gestaltung für Menschen mit Behinderungen.",
  links: {
    gitlab:
      "https://gitlab.fhnw.ch/iit-projektschiene/fs24/24fs_iit38-public-transport-in-switzerland_access-for-all-and-inclusive-design-for-people-with-disabilities",
    email_luigi: "mailto:luigi.adinolfi@students.fhnw.ch",
    email_raveena: "mailto:raveena.ramany@students.fhnw.ch",
  },
};

/**
 * Type definition representing the structure of the site configuration.
 */
export type SiteConfig = typeof siteConfig;
