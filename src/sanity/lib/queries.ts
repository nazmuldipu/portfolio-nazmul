// import groq from "groq";

import { client } from "./client";

// export const navbar = groq`
// //   **[_type == "navbar"][0]{ title, names[]{name, href, isSubMenu}, email, phone, socials, logo }`;
// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getProfile() {
  const posts = await client.fetch(
    '*[_type == "portfolio"][0]{about,experience,education,lastEducation,navbar,location,headline,image,title,skills,name}'
  );
  return posts;
}

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
