
import { getKOLTweets } from "./twitter.ts";
import { executeSnipe, checkContractScore } from "./trading.ts";
import type { SnipeParams } from "./types.ts";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to create error response
function createErrorResponse(error: Error | string, status = 500) {
  const message = error instanceof Error ? error.message : error;
  console.error('Error:', message);
  return new Response(
    JSON.stringify({ error: message }),
    { 
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
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

    if (!path) {
      return createErrorResponse('Invalid endpoint', 404);
    }

    switch (path) {
      case 'monitor-kols': {
        const kols = ["aeyakovenko", "rajgokal", "kashdhanda", "blknoiz06", "0xMert", "Danny_Crypton", "defiWiman"];
        console.log("Monitoring KOLs:", kols);
        
        try {
          const tweets = await Promise.all(
            kols.map(async kol => {
              try {
                return await getKOLTweets(kol);
              } catch (error) {
                console.error(`Error fetching tweets for ${kol}:`, error);
                return { username: kol, error: error instanceof Error ? error.message : 'Unknown error' };
              }
            })
          );

          return new Response(JSON.stringify({ tweets }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } catch (error) {
          return createErrorResponse('Failed to fetch KOL tweets');
        }
      }

      case 'check-contract': {
        const { address } = await req.json();
        if (!address) {
          return createErrorResponse('Contract address is required', 400);
        }

        try {
          const score = await checkContractScore(address);
          return new Response(JSON.stringify({ score }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } catch (error) {
          return createErrorResponse('Failed to check contract score');
        }
      }

      case 'snipe': {
        const params = await req.json();
        if (!params.contractAddress || !params.amount) {
          return createErrorResponse('Missing required parameters', 400);
        }

        try {
          const result = await executeSnipe(params as SnipeParams);
          return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } catch (error) {
          return createErrorResponse('Snipe execution failed');
        }
      }

      default:
        return createErrorResponse('Invalid endpoint', 404);
    }
  } catch (error) {
    return createErrorResponse('Internal server error');
  }
});
