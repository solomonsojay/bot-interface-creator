import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';
import { createHmac } from "node:crypto";
import { decode as base64Decode } from "https://deno.land/std/encoding/base64.ts";

// Constants
const TWITTER_API_URL = "https://api.twitter.com/2";
const DEXSCREENER_API_URL = "https://api.dexscreener.com/latest/dex";
const SOLSNIFFER_API_URL = "https://api.solsniffer.com/v1";

// Environment variables
const TWITTER_API_KEY = Deno.env.get("TWITTER_CONSUMER_KEY");
const TWITTER_API_SECRET = Deno.env.get("TWITTER_CONSUMER_SECRET");
const TWITTER_ACCESS_TOKEN = Deno.env.get("TWITTER_ACCESS_TOKEN");
const TWITTER_ACCESS_TOKEN_SECRET = Deno.env.get("TWITTER_ACCESS_TOKEN_SECRET");
const SOLSNIFFER_API_KEY = Deno.env.get("SOLSNIFFER_API_KEY");

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Twitter OAuth helpers
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

// Bot functionality
async function getKOLTweets(username: string) {
  const url = `${TWITTER_API_URL}/users/by/username/${username}/tweets?tweet.fields=created_at,text`;
  const oauthHeader = generateOAuthHeader("GET", url);
  
  const response = await fetch(url, {
    headers: {
      Authorization: oauthHeader,
    },
  });
  
  return response.json();
}

async function checkContractScore(address: string) {
  const response = await fetch(`${SOLSNIFFER_API_URL}/contracts/${address}/audit`, {
    headers: {
      'Authorization': `Bearer ${SOLSNIFFER_API_KEY}`,
    },
  });
  
  return response.json();
}

async function getDexScreenerData(address: string) {
  const response = await fetch(`${DEXSCREENER_API_URL}/tokens/${address}`);
  return response.json();
}

interface SnipeParams {
  contractAddress: string;
  amount: number;
  slippage: number;
  priorityFee: number;
}

async function executeSnipe(params: SnipeParams) {
  // Here we would integrate with a Solana wallet and DEX
  // This is a placeholder for the actual implementation
  console.log("Executing snipe with params:", params);
  return {
    success: true,
    txHash: "sample_tx_hash",
    timestamp: new Date().toISOString(),
  };
}

// Main handler
Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();

    switch (path) {
      case 'monitor-kols': {
        const kols = ["aeyakovenko", "rajgokal", "kashdhanda", "blknoiz06", "0xMert", "Danny_Crypton", "defiWiman"];
        const tweets = await Promise.all(kols.map(kol => getKOLTweets(kol)));
        return new Response(JSON.stringify({ tweets }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'check-contract': {
        const { address } = await req.json();
        const score = await checkContractScore(address);
        return new Response(JSON.stringify({ score }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'snipe': {
        const params = await req.json();
        const result = await executeSnipe(params);
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      default:
        return new Response(JSON.stringify({ error: 'Invalid endpoint' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});