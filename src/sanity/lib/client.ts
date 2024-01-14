import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "@/src/sanity/lib/api";

export const client = createClient({
  projectId,
  dataset,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion, // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getProfile() {
  const posts = await client.fetch(
    '*[_type == "portfolio"][0]{about,experience,education,lastEducation,navbar,location,headline,image{"url": asset->url},title,skills,name}'
  );
  return posts;
}
