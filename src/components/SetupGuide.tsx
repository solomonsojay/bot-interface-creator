import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import VpsRequirements from "./guide/VpsRequirements";
import SetupSteps from "./guide/SetupSteps";
import GuideContent from "./guide/GuideContent";

const SetupGuide = () => {
  const { generateContent } = GuideContent();

  const generatePDF = () => {
    const content = generateContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'solana-sniper-setup-guide.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Solana Sniper Bot Setup Guide</CardTitle>
        <CardDescription>
          Complete setup instructions with command-line examples for deploying and configuring the bot
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full rounded-md border p-4">
          <div className="space-y-6">
            <VpsRequirements />
            <SetupSteps />
          </div>
        </ScrollArea>
        
        <div className="mt-4 flex justify-end">
          <Button onClick={generatePDF} className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Download Complete Guide
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SetupGuide;