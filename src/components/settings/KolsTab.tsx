import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserPlus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const KolsTab = () => {
  const { toast } = useToast();
  const [newKol, setNewKol] = useState({
    twitterHandle: "",
    name: "",
  });
  const [kols, setKols] = useState<Array<{id: string, twitter_handle: string, name: string | null}>>([]);

  useEffect(() => {
    fetchKols();
  }, []);

  const fetchKols = async () => {
    const { data, error } = await supabase
      .from('kol_accounts')
      .select('*');
    
    if (error) {
      toast({
        title: "Error fetching KOLs",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setKols(data || []);
  };

  const handleAddKol = async () => {
    if (!newKol.twitterHandle) {
      toast({
        title: "Error",
        description: "Please enter a Twitter handle",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('kol_accounts')
      .insert([
        {
          twitter_handle: newKol.twitterHandle,
          name: newKol.name || null,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }
      ]);

    if (error) {
      toast({
        title: "Error adding KOL",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "KOL Added",
      description: "The KOL has been added successfully.",
    });

    setNewKol({ twitterHandle: "", name: "" });
    fetchKols();
  };

  const handleDeleteKol = async (id: string) => {
    const { error } = await supabase
      .from('kol_accounts')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting KOL",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "KOL Deleted",
      description: "The KOL has been removed.",
    });

    fetchKols();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Twitter Handle"
          value={newKol.twitterHandle}
          onChange={(e) => setNewKol({ ...newKol, twitterHandle: e.target.value })}
        />
        <Input
          placeholder="Name (Optional)"
          value={newKol.name}
          onChange={(e) => setNewKol({ ...newKol, name: e.target.value })}
        />
        <Button onClick={handleAddKol} size="icon">
          <UserPlus className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="h-[200px]">
        <div className="space-y-2">
          {kols.map((kol) => (
            <div key={kol.id} className="flex items-center justify-between p-2 border rounded">
              <div className="truncate">
                <p className="font-medium truncate">{kol.name || 'Unnamed KOL'}</p>
                <p className="text-sm text-muted-foreground truncate">@{kol.twitter_handle}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteKol(kol.id)}
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

export default KolsTab;