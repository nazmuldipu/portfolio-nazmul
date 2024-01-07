import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "@/sanity/lib/api";

export const client = createClient({
  projectId,
  dataset,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion, // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getNavbar() {
  const posts = await client.fetch(
    '*[_type == "navbar"][0]{ title, names[]{name, href, isSubMenu}, email, phone, socials, logo }'
  );
  return posts;
}
