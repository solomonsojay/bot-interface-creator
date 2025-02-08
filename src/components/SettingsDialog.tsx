
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApiKeysTab from "./settings/ApiKeysTab";
import ContractsTab from "./settings/ContractsTab";
import KolsTab from "./settings/KolsTab";
import SetupGuide from "./SetupGuide";

const SettingsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="keys">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="keys">API Keys</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="kols">KOLs</TabsTrigger>
            <TabsTrigger value="guide">Setup Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="keys">
            <ApiKeysTab />
          </TabsContent>

          <TabsContent value="contracts">
            <ContractsTab />
          </TabsContent>

          <TabsContent value="kols">
            <KolsTab />
          </TabsContent>

          <TabsContent value="guide">
            <SetupGuide />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
