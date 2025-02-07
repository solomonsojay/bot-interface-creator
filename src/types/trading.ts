
export interface ProfitTarget {
  percentage: number;
  amount: number;
  price?: number;
}

export interface TradeResponse {
  success: boolean;
  txHash?: string;
  entryPrice?: number;
  profitTargets?: ProfitTarget[];
  timestamp?: string;
  error?: string;
}
