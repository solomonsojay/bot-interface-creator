
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Eye } from "lucide-react";

const ActiveMonitoring = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Active Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>System Status</AlertTitle>
              <AlertDescription>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Bot Status:</span>
                    <span className="text-green-500">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tokens Monitored:</span>
                    <span>147</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Update:</span>
                    <span>{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActiveMonitoring;
