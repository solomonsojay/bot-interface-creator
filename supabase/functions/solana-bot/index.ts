
import { getKOLTweets } from "./twitter.ts";
import { executeSnipe } from "./trading.ts";
import type { SnipeParams } from "./types.ts";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
        const result = await executeSnipe(params as SnipeParams);
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
