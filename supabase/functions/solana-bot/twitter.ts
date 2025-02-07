
import { createHmac } from "node:crypto";

const TWITTER_API_URL = "https://api.twitter.com/2";

// Environment variables
const TWITTER_API_KEY = Deno.env.get("TWITTER_CONSUMER_KEY");
const TWITTER_API_SECRET = Deno.env.get("TWITTER_CONSUMER_SECRET");
const TWITTER_ACCESS_TOKEN = Deno.env.get("TWITTER_ACCESS_TOKEN");
const TWITTER_ACCESS_TOKEN_SECRET = Deno.env.get("TWITTER_ACCESS_TOKEN_SECRET");

function generateOAuthSignature(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string,
  tokenSecret: string
): string {
  const signatureBaseString = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(
    Object.entries(params)
      .sort()
      .map(([k, v]) => `${k}=${v}`)
      .join("&")
  )}`;
  
  const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;
  const hmacSha1 = createHmac("sha1", signingKey);
  return hmacSha1.update(signatureBaseString).digest("base64");
}

function generateOAuthHeader(method: string, url: string): string {
  const oauthParams = {
    oauth_consumer_key: TWITTER_API_KEY!,
    oauth_nonce: Math.random().toString(36).substring(2),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: TWITTER_ACCESS_TOKEN!,
    oauth_version: "1.0",
  };

  const signature = generateOAuthSignature(
    method,
    url,
    oauthParams,
    TWITTER_API_SECRET!,
    TWITTER_ACCESS_TOKEN_SECRET!
  );

  return "OAuth " + Object.entries({ ...oauthParams, oauth_signature: signature })
    .sort()
    .map(([k, v]) => `${encodeURIComponent(k)}="${encodeURIComponent(v)}"`)
    .join(", ");
}

export async function getKOLTweets(username: string) {
  const url = `${TWITTER_API_URL}/users/by/username/${username}/tweets?tweet.fields=created_at,text`;
  const oauthHeader = generateOAuthHeader("GET", url);
  
  const response = await fetch(url, {
    headers: {
      Authorization: oauthHeader,
    },
  });
  
  return response.json();
}
