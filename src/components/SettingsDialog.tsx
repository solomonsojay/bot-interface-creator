import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, AlertTriangle, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

const SettingsDialog = () => {
  const { toast } = useToast();
  const [keys, setKeys] = useState({
    twitterApiKey: "",
    twitterApiSecretKey: "",
    twitterAccessToken: "",
    solanaPrivateKey: "",
  });
  const [newContract, setNewContract] = useState({
    address: "",
    name: "",
  });
  const [contracts, setContracts] = useState<Array<{id: string, contract_address: string, name: string | null}>>([]);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    const { data, error } = await supabase
      .from('contract_addresses')
      .select('*');
    
    if (error) {
      toast({
        title: "Error fetching contracts",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setContracts(data || []);
  };

  const handleSave = () => {
    // Store keys only in memory (React state)
    toast({
      title: "Settings Saved",
      description: "Your API keys have been saved for this session only.",
    });
  };

  const handleAddContract = async () => {
    if (!newContract.address) {
      toast({
        title: "Error",
        description: "Please enter a contract address",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('contract_addresses')
      .insert([
        {
          contract_address: newContract.address,
          name: newContract.name || null,
        }
      ]);

    if (error) {
      toast({
        title: "Error adding contract",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Contract Added",
      description: "The contract address has been added successfully.",
    });

    setNewContract({ address: "", name: "" });
    fetchContracts();
  };

  const handleDeleteContract = async (id: string) => {
    const { error } = await supabase
      .from('contract_addresses')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting contract",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Contract Deleted",
      description: "The contract address has been removed.",
    });

    fetchContracts();
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
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        
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
          <Button onClick={handleSave} className="mt-4">Save Settings</Button>

          <div className="border-t pt-4 mt-4">
            <Label>Contract Addresses</Label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Contract Address"
                value={newContract.address}
                onChange={(e) => setNewContract({ ...newContract, address: e.target.value })}
              />
              <Input
                placeholder="Name (Optional)"
                value={newContract.name}
                onChange={(e) => setNewContract({ ...newContract, name: e.target.value })}
              />
              <Button onClick={handleAddContract} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-[200px] mt-4">
              <div className="space-y-2">
                {contracts.map((contract) => (
                  <div key={contract.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="truncate">
                      <p className="font-medium truncate">{contract.name || 'Unnamed Contract'}</p>
                      <p className="text-sm text-muted-foreground truncate">{contract.contract_address}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteContract(contract.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;