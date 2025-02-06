import { supabase } from "@/integrations/supabase/client";

interface SnipeParams {
  amount: number;
  slippage: number;
  priorityFee?: number;
  contractAddress?: string;
}

class BotService {
  async executeSnipe(params: SnipeParams) {
    try {
      const { data, error } = await supabase.functions.invoke('solana-bot', {
        body: { 
          ...params,
          priorityFee: params.priorityFee || 5000,
        },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Snipe execution failed:', error);
      throw error;
    }
  }

  async checkContract(address: string) {
    try {
      const { data, error } = await supabase.functions.invoke('solana-bot', {
        body: { address },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Contract check failed:', error);
      throw error;
    }
  }

  async monitorKOLs() {
    try {
      const { data, error } = await supabase.functions.invoke('solana-bot', {
        body: {},
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('KOL monitoring failed:', error);
      throw error;
    }
  }
}

export const botService = new BotService();