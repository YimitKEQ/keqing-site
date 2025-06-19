import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "rgof28cu", // ✅ Must match Sanity project ID
  dataset: "production", // ✅ Should be 'production' unless otherwise set
  useCdn: true,
  apiVersion: "2023-06-01",
});
