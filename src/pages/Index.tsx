
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Rocket, Twitter, TrendingUp, Shield, FileDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import SettingsDialog from "@/components/SettingsDialog";
import SetupGuide from "@/components/SetupGuide";
import { botService } from "@/services/botService";
import { getBotConfig } from "@/utils/botConfig";

const Index = () => {
  const { toast } = useToast();

  // Query for KOL monitoring
  const { data: kolData, isError: kolError } = useQuery({
    queryKey: ['kol-monitoring'],
    queryFn: () => botService.monitorKOLs(),
    refetchInterval: 60000, // Refresh every minute
  });

  const handleSnipe = async () => {
    const config = getBotConfig();
    if (!config) {
      toast({
        title: "Missing Configuration",
        description: "Please configure your bot endpoint and API key in settings first.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const result = await botService.executeSnipe({
        amount: 0.1,
        slippage: 15,
      });
      
      if (result.success) {
        toast({
          title: "Snipe Executed Successfully",
          description: `Transaction Hash: ${result.txHash?.slice(0, 8)}...`,
        });
      } else {
        toast({
          title: "Snipe Failed",
          description: result.error || "Failed to execute snipe",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Snipe Failed",
        description: error instanceof Error ? error.message : "Failed to execute snipe",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Solana Sniper Bot</h1>
          <SettingsDialog />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Twitter Feed */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Twitter className="h-5 w-5" />
                KOL Twitter Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {kolError ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>Failed to fetch KOL data</AlertDescription>
                    </Alert>
                  ) : kolData?.tweets?.length ? (
                    kolData.tweets.map((tweet, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <p className="font-medium">@{tweet.username}</p>
                        <p className="text-sm text-muted-foreground">{tweet.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(tweet.timestamp).toLocaleString()}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">No recent memecoin mentions</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Prediction Module */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                AI Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">BONK</span>
                      <span className="text-green-500">94% Success Rate</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Volume</span>
                        <span>High</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Liquidity</span>
                        <span>Stable</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Sentiment</span>
                        <span>Positive</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Sniping Module */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Sniper Module
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Current Settings</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Purchase Amount: 0.1 SOL</li>
                    <li>Slippage: 15%</li>
                    <li>Priority Fees: 5000 lamports</li>
                    <li>Take Profit: 60% at 2x, 40% at 3x</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Alert variant="destructive">
                  <Shield className="h-4 w-4" />
                  <AlertTitle>Safety Check</AlertTitle>
                  <AlertDescription>
                    Contract score check will be performed before execution
                  </AlertDescription>
                </Alert>
                <Button 
                  className="w-full" 
                  onClick={handleSnipe}
                >
                  Execute Snipe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Setup Guide */}
        <SetupGuide />
      </div>
    </div>
  );
};

export default Index;
