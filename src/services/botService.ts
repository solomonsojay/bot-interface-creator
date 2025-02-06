import { BotConfig, getBotConfig } from "@/utils/botConfig";

class BotService {
  private config: BotConfig | null = null;

  constructor() {
    this.config = getBotConfig();
  }

  async executeSnipe(params: { amount: number; slippage: number }) {
    if (!this.config) {
      throw new Error("Bot configuration not found");
    }

    try {
      const response = await fetch(`${this.config.botEndpoint}/snipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to execute snipe');
      }

      return await response.json();
    } catch (error) {
      console.error('Snipe execution failed:', error);
      throw error;
    }
  }

  async getStatus() {
    if (!this.config) {
      throw new Error("Bot configuration not found");
    }

    try {
      const response = await fetch(`${this.config.botEndpoint}/status`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get bot status');
      }

      return await response.json();
    } catch (error) {
      console.error('Status check failed:', error);
      throw error;
    }
  }
}

export const botService = new BotService();