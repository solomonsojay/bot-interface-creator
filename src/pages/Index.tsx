import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Rocket, Twitter, TrendingUp, Shield, Settings } from "lucide-react";

const Index = () => {
  const { toast } = useToast();

  const handleSnipe = () => {
    toast({
      title: "Snipe Executed",
      description: "Purchased 0.1 SOL with 15% slippage",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Solana Sniper Bot</h1>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  {["@aeyakovenko", "@rajgokal", "@kashdhanda", "@blknoiz06", "@0xMert", "@Danny_Crypton", "@defiWiman"].map((kol) => (
                    <div key={kol} className="p-3 border rounded-lg">
                      <p className="font-medium">{kol}</p>
                      <p className="text-sm text-muted-foreground">No recent memecoin mentions</p>
                    </div>
                  ))}
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
                    <li>Priority Fees: Enabled</li>
                    <li>Take Profit: 75% at 3-5x</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Alert variant="destructive">
                  <Shield className="h-4 w-4" />
                  <AlertTitle>Contract Score Warning</AlertTitle>
                  <AlertDescription>
                    Current contract score: 82 (Below safe threshold)
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
      </div>
    </div>
  );
};

export default Index;