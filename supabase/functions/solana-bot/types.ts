
export interface SnipeParams {
  contractAddress: string;
  amount: number;
  slippage: number;
  priorityFee: number;
}

export interface ProfitTarget {
  percentage: number;
  amount: number;
  price?: number;
}
