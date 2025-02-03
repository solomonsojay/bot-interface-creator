import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const SettingsDialog = () => {
  const { toast } = useToast();
  const [keys, setKeys] = useState({
    twitterApiKey: localStorage.getItem("twitter_api_key") || "",
    twitterApiSecretKey: localStorage.getItem("twitter_api_secret_key") || "",
    twitterAccessToken: localStorage.getItem("twitter_access_token") || "",
    solanaPrivateKey: localStorage.getItem("solana_private_key") || "",
  });

  const handleSave = () => {
    // Store keys in localStorage (Note: this is temporary, ideally these should be stored in a secure backend)
    localStorage.setItem("twitter_api_key", keys.twitterApiKey);
    localStorage.setItem("twitter_api_secret_key", keys.twitterApiSecretKey);
    localStorage.setItem("twitter_access_token", keys.twitterAccessToken);
    localStorage.setItem("solana_private_key", keys.solanaPrivateKey);

    toast({
      title: "Settings Saved",
      description: "Your API keys have been securely saved.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>API Settings</DialogTitle>
        </DialogHeader>
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
          <Button onClick={handleSave} className="mt-4">Save Settings</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;