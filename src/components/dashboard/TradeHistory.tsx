
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { botService } from "@/services/botService";

const TradeHistory = () => {
  const { data: tradeHistory } = useQuery({
    queryKey: ['trade-history'],
    queryFn: () => botService.getTradeHistory(),
    refetchInterval: 30000,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Trade History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {tradeHistory?.trades?.map((trade, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{trade.token}</span>
                  <span className={trade.profit > 0 ? "text-green-500" : "text-red-500"}>
                    {trade.profit > 0 ? "+" : ""}{trade.profit}%
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  <div>Entry: {trade.entryPrice} SOL</div>
                  <div>Exit: {trade.exitPrice} SOL</div>
                  <div>Amount: {trade.amount} SOL</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(trade.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TradeHistory;
