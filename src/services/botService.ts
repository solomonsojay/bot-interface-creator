
import { supabase } from "@/integrations/supabase/client";
import { TradeResponse } from "@/types/trading";

interface SnipeParams {
  amount: number;
  slippage: number;
  priorityFee?: number;
  contractAddress?: string;
}

interface KOLResponse {
  tweets: Array<{
    username: string;
    text: string;
    timestamp: string;
  }>;
}

interface ContractCheckResponse {
  score: number;
  warnings?: string[];
  error?: string;
}

class BotService {
  async executeSnipe(params: SnipeParams): Promise<TradeResponse> {
    try {
      console.log('Executing snipe with params:', params);
      const { data, error } = await supabase.functions.invoke('solana-bot/snipe', {
        body: { 
          ...params,
          priorityFee: params.priorityFee || 5000,
        },
      });

      if (error) {
        console.error('Snipe execution error:', error);
        throw error;
      }

      console.log('Snipe execution successful:', data);
      return data as TradeResponse;
    } catch (error) {
      console.error('Snipe execution failed:', error);
      throw error;
    }
  }

  async checkContract(address: string): Promise<ContractCheckResponse> {
    try {
      console.log('Checking contract:', address);
      const { data, error } = await supabase.functions.invoke('solana-bot/check-contract', {
        body: { address },
      });

      if (error) {
        console.error('Contract check error:', error);
        throw error;
      }

      console.log('Contract check successful:', data);
      return data as ContractCheckResponse;
    } catch (error) {
      console.error('Contract check failed:', error);
      throw error;
    }
  }

  async monitorKOLs(): Promise<KOLResponse> {
    try {
      console.log('Starting KOL monitoring');
      const { data, error } = await supabase.functions.invoke('solana-bot/monitor-kols', {
        body: {},
      });

      if (error) {
        console.error('KOL monitoring error:', error);
        throw error;
      }

      console.log('KOL monitoring successful:', data);
      return data as KOLResponse;
    } catch (error) {
      console.error('KOL monitoring failed:', error);
      throw error;
    }
  }
}

export const botService = new BotService();
