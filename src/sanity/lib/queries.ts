import { client } from "./client";

// Focused query for the portfolio home page: includes resolved social links.
export async function getPortfolioPage() {
  return client.fetch(
    `*[_type == "portfolio"][0]{
      name, image, location, headline, title, about, education,
      tagline, highlightPhrase, contactHeadline, contactSubtitle, currentPosition,
      "cvUrl": coalesce(cvUrl, resume.asset->url, cv.asset->url),
      experience,
      "skills": skills[]{ level, "items": technologies[].name },
      "projects": projects[]{ projectName, description, skills, link, start, end },
      "socials": navbar.socials[]{ name, href, "slug": slug.current }
    }`
  );
}
