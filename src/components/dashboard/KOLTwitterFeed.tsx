
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Twitter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { botService } from "@/services/botService";

const KOLTwitterFeed = () => {
  const { data: kolData, isError: kolError } = useQuery({
    queryKey: ['kol-monitoring'],
    queryFn: () => botService.monitorKOLs(),
    refetchInterval: 60000,
  });

  return (
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
            {kolError ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Failed to fetch KOL data</AlertDescription>
              </Alert>
            ) : kolData?.tweets?.length ? (
              kolData.tweets.map((tweet, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <p className="font-medium">@{tweet.username}</p>
                  <p className="text-sm text-muted-foreground">{tweet.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(tweet.timestamp).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <div className="p-3 border rounded-lg">
                <p className="text-sm text-muted-foreground">No recent memecoin mentions</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default KOLTwitterFeed;
