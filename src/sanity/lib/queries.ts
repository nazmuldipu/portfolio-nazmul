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
