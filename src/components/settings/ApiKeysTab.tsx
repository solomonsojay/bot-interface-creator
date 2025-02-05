import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ApiKeys {
  twitterApiKey: string;
  twitterApiSecretKey: string;
  twitterAccessToken: string;
  solanaPrivateKey: string;
}

const ApiKeysTab = () => {
  const { toast } = useToast();
  const [keys, setKeys] = useState<ApiKeys>(() => {
    const savedKeys = localStorage.getItem('apiKeys');
    return savedKeys ? JSON.parse(savedKeys) : {
      twitterApiKey: "",
      twitterApiSecretKey: "",
      twitterAccessToken: "",
      solanaPrivateKey: "",
    };
  });

  useEffect(() => {
    localStorage.setItem('apiKeys', JSON.stringify(keys));
  }, [keys]);

  const handleSave = () => {
    if (!keys.twitterApiKey || !keys.twitterApiSecretKey || !keys.twitterAccessToken || !keys.solanaPrivateKey) {
      toast({
        title: "Error",
        description: "Please fill in all API keys",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('apiKeys', JSON.stringify(keys));
    toast({
      title: "Settings Saved",
      description: "Your API keys have been saved for this session.",
    });
  };

  return (
    <div>
      <Alert className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Keys are stored in memory only and will be cleared when you close your browser. 
          Never share your private keys with anyone.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="twitterApiKey">Twitter API Key</Label>
          <Input
            id="twitterApiKey"
            type="password"
            value={keys.twitterApiKey}
            onChange={(e) => setKeys({ ...keys, twitterApiKey: e.target.value })}
            placeholder="Enter Twitter API Key"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="twitterApiSecretKey">Twitter API Secret Key</Label>
          <Input
            id="twitterApiSecretKey"
            type="password"
            value={keys.twitterApiSecretKey}
            onChange={(e) => setKeys({ ...keys, twitterApiSecretKey: e.target.value })}
            placeholder="Enter Twitter API Secret Key"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="twitterAccessToken">Twitter Access Token</Label>
          <Input
            id="twitterAccessToken"
            type="password"
            value={keys.twitterAccessToken}
            onChange={(e) => setKeys({ ...keys, twitterAccessToken: e.target.value })}
            placeholder="Enter Twitter Access Token"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="solanaPrivateKey">Solana Private Key</Label>
          <Input
            id="solanaPrivateKey"
            type="password"
            value={keys.solanaPrivateKey}
            onChange={(e) => setKeys({ ...keys, solanaPrivateKey: e.target.value })}
            placeholder="Enter Solana Private Key"
          />
        </div>
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
};

export default ApiKeysTab;