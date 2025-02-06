import { z } from "zod";

export const BotConfigSchema = z.object({
  botEndpoint: z.string().url(),
  apiKey: z.string().min(1),
});

export type BotConfig = z.infer<typeof BotConfigSchema>;

export const getBotConfig = (): BotConfig | null => {
  const config = localStorage.getItem('botConfig');
  if (!config) return null;
  try {
    return BotConfigSchema.parse(JSON.parse(config));
  } catch {
    return null;
  }
};

export const setBotConfig = (config: BotConfig) => {
  localStorage.setItem('botConfig', JSON.stringify(config));
};