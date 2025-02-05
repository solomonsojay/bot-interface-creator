import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

const SetupGuide = () => {
  const generatePDF = () => {
    // Note: In a production environment, you'd want to use a proper PDF generation library
    const content = `
Solana Sniper Bot Setup Guide

Requirements:
1. Node.js v16 or higher
2. Git
3. VPS with Ubuntu 20.04 or higher (recommended providers: DigitalOcean, AWS, or Linode)
4. Twitter Developer Account
5. Solana Wallet

Step 1: VPS Setup
----------------
1. Create a VPS instance (recommended: 2GB RAM, 1 CPU)
2. SSH into your VPS
3. Update system: 
   sudo apt update && sudo apt upgrade -y
4. Install Node.js:
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
5. Install Git:
   sudo apt install git

Step 2: Bot Installation
---------------------
1. Clone the repository:
   git clone <your-repo-url>
2. Navigate to project directory:
   cd <project-directory>
3. Install dependencies:
   npm install
4. Create production build:
   npm run build
5. Install PM2 for process management:
   sudo npm install -g pm2

Step 3: Configuration
------------------
1. Set up Twitter Developer Account:
   - Visit developer.twitter.com
   - Create a new app
   - Get API keys and access tokens
2. Set up Solana wallet:
   - Create a new wallet
   - Export private key
3. Configure API keys in the bot interface:
   - Twitter API Key
   - Twitter API Secret
   - Twitter Access Token
   - Solana Private Key

Step 4: Running the Bot
--------------------
1. Start the bot with PM2:
   pm2 start npm --name "solana-sniper" -- start
2. Monitor bot status:
   pm2 status
3. View logs:
   pm2 logs solana-sniper

Step 5: Bot Management
-------------------
1. Add/Remove KOLs:
   - Use the Settings dialog
   - Add Twitter handles of KOLs to monitor
2. Configure Contract Addresses:
   - Add contract addresses to monitor
   - Optionally add names for easy reference

Maintenance
----------
1. Update bot:
   git pull
   npm install
   npm run build
   pm2 restart solana-sniper
2. Monitor system resources:
   htop
3. Check logs regularly:
   pm2 logs solana-sniper

Security Recommendations
---------------------
1. Use SSH keys for VPS access
2. Enable UFW firewall
3. Regular system updates
4. Secure API keys storage
5. Regular backup of configuration

For support or questions, please refer to the documentation or contact support.
    `;

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
          Complete setup instructions for deploying and configuring the bot
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full rounded-md border p-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold">Requirements</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Node.js v16 or higher</li>
                <li>Git</li>
                <li>VPS with Ubuntu 20.04 or higher</li>
                <li>Twitter Developer Account</li>
                <li>Solana Wallet</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold">Step 1: VPS Setup</h3>
              <div className="space-y-2">
                <p>1. Create a VPS instance (recommended: 2GB RAM, 1 CPU)</p>
                <p>2. SSH into your VPS</p>
                <p>3. Update system packages</p>
                <p>4. Install Node.js and Git</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold">Step 2: Bot Installation</h3>
              <div className="space-y-2">
                <p>1. Clone the repository</p>
                <p>2. Install dependencies</p>
                <p>3. Build the application</p>
                <p>4. Set up process management with PM2</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold">Step 3: Configuration</h3>
              <div className="space-y-2">
                <p>1. Set up Twitter Developer Account</p>
                <p>2. Configure Solana wallet</p>
                <p>3. Add API keys in the bot interface</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold">Step 4: Running the Bot</h3>
              <div className="space-y-2">
                <p>1. Start the bot using PM2</p>
                <p>2. Monitor bot status and logs</p>
                <p>3. Configure KOLs and contracts</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold">Security Recommendations</h3>
              <div className="space-y-2">
                <p>1. Use SSH keys for VPS access</p>
                <p>2. Enable UFW firewall</p>
                <p>3. Regular system updates</p>
                <p>4. Secure API keys storage</p>
              </div>
            </section>
          </div>
        </ScrollArea>
        
        <div className="mt-4 flex justify-end">
          <Button onClick={generatePDF} className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Download Setup Guide
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SetupGuide;