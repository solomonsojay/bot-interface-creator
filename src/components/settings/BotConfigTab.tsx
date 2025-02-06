import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { BotConfig, BotConfigSchema, setBotConfig } from "@/utils/botConfig";

export function BotConfigTab() {
  const { toast } = useToast();
  const [isTesting, setIsTesting] = useState(false);

  const form = useForm<BotConfig>({
    resolver: zodResolver(BotConfigSchema),
    defaultValues: {
      botEndpoint: "",
      apiKey: "",
    },
  });

  const onSubmit = async (data: BotConfig) => {
    try {
      setIsTesting(true);
      // Test connection before saving
      const response = await fetch(`${data.botEndpoint}/status`, {
        headers: {
          'Authorization': `Bearer ${data.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to connect to bot');
      }

      setBotConfig(data);
      toast({
        title: "Configuration Saved",
        description: "Bot connection configured successfully",
      });
    } catch (error) {
      toast({
        title: "Configuration Failed",
        description: error instanceof Error ? error.message : "Failed to connect to bot",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="botEndpoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bot Endpoint</FormLabel>
              <FormControl>
                <Input placeholder="https://your-vps-ip:port" {...field} />
              </FormControl>
              <FormDescription>
                The URL where your bot is running (e.g., https://your-vps-ip:3000)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Key</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your bot API key" {...field} />
              </FormControl>
              <FormDescription>
                The API key configured in your bot for authentication
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isTesting}>
          {isTesting ? "Testing Connection..." : "Save Configuration"}
        </Button>
      </form>
    </Form>
  );
}