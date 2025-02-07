
import type { SnipeParams, ProfitTarget, TradeResponse } from "./types.ts";

const DEXSCREENER_API_URL = "https://api.dexscreener.com/latest/dex";
const SOLSNIFFER_API_URL = "https://api.solsniffer.com/v1";
const RAYDIUM_API_URL = "https://api.raydium.io/v2";
const SOLSNIFFER_API_KEY = Deno.env.get("SOLSNIFFER_API_KEY");

async function executeRadiumTrade(params: {
  inputMint: string;
  outputMint: string;
  amount: number;
  slippage: number;
  priorityFee: number;
}): Promise<{ txHash: string }> {
  if (!params.inputMint || !params.outputMint) {
    throw new Error("Missing mint addresses");
  }

  console.log("Executing Raydium trade with params:", params);
  const response = await fetch(`${RAYDIUM_API_URL}/swap`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Raydium API error:', errorText);
    throw new Error(`Raydium API error: ${response.status} - ${errorText}`);
  }
  
  const result = await response.json();
  console.log("Trade execution result:", result);
  return result;
}

async function calculateProfitTargets(entryPrice: number): Promise<ProfitTarget[]> {
  if (!entryPrice || entryPrice <= 0) {
    throw new Error("Invalid entry price");
  }

  return [
    { percentage: 200, amount: 60, price: entryPrice * 3 }, // Take 60% profit at 2x
    { percentage: 300, amount: 40, price: entryPrice * 4 }, // Take remaining 40% profit at 3x
  ];
}

export async function checkContractScore(address: string) {
  if (!SOLSNIFFER_API_KEY) {
    throw new Error("SOLSNIFFER_API_KEY not configured");
  }

  if (!address) {
    throw new Error("Contract address is required");
  }

  const response = await fetch(`${SOLSNIFFER_API_URL}/contracts/${address}/audit`, {
    headers: {
      'Authorization': `Bearer ${SOLSNIFFER_API_KEY}`,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Contract check failed: ${response.statusText}`);
  }

  return response.json();
}

async function getDexScreenerData(address: string) {
  if (!address) {
    throw new Error("Contract address is required");
  }

  const response = await fetch(`${DEXSCREENER_API_URL}/tokens/${address}`);
  if (!response.ok) {
    throw new Error(`DexScreener API error: ${response.statusText}`);
  }

  return response.json();
}

export async function executeSnipe(params: SnipeParams): Promise<TradeResponse> {
  console.log("Starting snipe execution with params:", params);
  
  try {
    // Check contract score first
    const scoreData = await checkContractScore(params.contractAddress);
    if (scoreData.score < 84) {
      return {
        success: false,
        error: `Contract score too low: ${scoreData.score}`,
        timestamp: new Date().toISOString(),
      };
    }
    
    // Get DEX data for price monitoring
    const dexData = await getDexScreenerData(params.contractAddress);
    const entryPrice = dexData.pairs?.[0]?.priceUsd;
    
    if (!entryPrice) {
      return {
        success: false,
        error: "Could not determine entry price",
        timestamp: new Date().toISOString(),
      };
    }
    
    // Execute trade on Raydium
    const tradeResult = await executeRadiumTrade({
      inputMint: "So11111111111111111111111111111111111111112", // SOL
      outputMint: params.contractAddress,
      amount: params.amount,
      slippage: params.slippage,
      priorityFee: params.priorityFee,
    });
    
    // Calculate take-profit targets
    const profitTargets = await calculateProfitTargets(entryPrice);
    
    return {
      success: true,
      txHash: tradeResult.txHash,
      entryPrice,
      profitTargets,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Snipe execution failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      timestamp: new Date().toISOString(),
    };
  }
}
