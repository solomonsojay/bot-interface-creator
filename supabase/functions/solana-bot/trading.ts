
import type { SnipeParams, ProfitTarget } from "./types.ts";

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
}) {
  try {
    console.log("Executing Raydium trade with params:", params);
    const response = await fetch(`${RAYDIUM_API_URL}/swap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) {
      throw new Error(`Raydium API error: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log("Trade execution result:", result);
    return result;
  } catch (error) {
    console.error('Raydium trade execution failed:', error);
    throw error;
  }
}

async function calculateProfitTargets(entryPrice: number): Promise<ProfitTarget[]> {
  return [
    { percentage: 200, amount: 60, price: entryPrice * 3 }, // Take 60% profit at 2x
    { percentage: 300, amount: 40, price: entryPrice * 4 }, // Take remaining 40% profit at 3x
  ];
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

export async function executeSnipe(params: SnipeParams) {
  console.log("Starting snipe execution with params:", params);
  
  // Check contract score first
  const scoreData = await checkContractScore(params.contractAddress);
  if (scoreData.score < 84) {
    throw new Error(`Contract score too low: ${scoreData.score}`);
  }
  
  // Get DEX data for price monitoring
  const dexData = await getDexScreenerData(params.contractAddress);
  const entryPrice = dexData.pairs[0]?.priceUsd;
  
  if (!entryPrice) {
    throw new Error("Could not determine entry price");
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
}
