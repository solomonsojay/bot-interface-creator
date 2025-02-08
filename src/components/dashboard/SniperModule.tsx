
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Rocket, Shield } from "lucide-react";
import { botService } from "@/services/botService";
import { getBotConfig } from "@/utils/botConfig";

const SniperModule = () => {
  const { toast } = useToast();

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
  );
};

export default SniperModule;
