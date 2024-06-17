const STAGING_URL = "https://hanoi-frontend-staging.onrender.com";
const PRODUCTION_URL = "https://hanoi-frontend-prod-latest.onrender.com";

export function getURL(type: "staging" | "production"): string {
  return type === "staging" ? STAGING_URL : PRODUCTION_URL;
}