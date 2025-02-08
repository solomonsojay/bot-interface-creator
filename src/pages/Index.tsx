
import SettingsDialog from "@/components/SettingsDialog";
import KOLTwitterFeed from "@/components/dashboard/KOLTwitterFeed";
import AIPredictions from "@/components/dashboard/AIPredictions";
import SniperModule from "@/components/dashboard/SniperModule";
import TradeHistory from "@/components/dashboard/TradeHistory";
import ActiveMonitoring from "@/components/dashboard/ActiveMonitoring";

const Index = () => {
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
          <KOLTwitterFeed />
          <AIPredictions />
          <SniperModule />
        </div>

        {/* Trade History & Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TradeHistory />
          <ActiveMonitoring />
        </div>
      </div>
    </div>
  );
};

export default Index;
