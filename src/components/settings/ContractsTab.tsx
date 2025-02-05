import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContractsTab = () => {
  const { toast } = useToast();
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
          user_id: (await supabase.auth.getUser()).data.user?.id
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
    <div className="space-y-4">
      <div className="flex gap-2">
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
      
      <ScrollArea className="h-[200px]">
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
  );
};

export default ContractsTab;