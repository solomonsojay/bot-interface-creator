import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

const SetupGuide = () => {
  const generatePDF = () => {
    const content = `
Solana Sniper Bot - Complete Setup Guide
=======================================

1. VPS Requirements & Initial Setup
---------------------------------
Minimum VPS Specifications:
- 2GB RAM
- 1 CPU Core
- 20GB SSD Storage
- Ubuntu 20.04 LTS or higher

Initial Server Setup:
\`\`\`bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl git build-essential

# Install Node.js 16.x
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installations
node --version
npm --version
git --version
\`\`\`

2. Security Setup
----------------
\`\`\`bash
# Configure UFW firewall
sudo apt install ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 3000
sudo ufw enable

# Create non-root user (replace 'botuser' with your preferred username)
sudo adduser botuser
sudo usermod -aG sudo botuser

# Switch to new user
su - botuser
\`\`\`

3. Bot Installation
------------------
\`\`\`bash
# Clone repository (replace with your actual repository URL)
git clone https://github.com/your-username/solana-sniper-bot.git
cd solana-sniper-bot

# Install dependencies
npm install

# Install PM2 globally
sudo npm install -g pm2

# Build the application
npm run build

# Start the bot with PM2
pm2 start npm --name "solana-sniper" -- start

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup
\`\`\`

4. Bot Configuration
-------------------
Create a configuration file:
\`\`\`bash
nano config.json
\`\`\`

Add your configuration:
\`\`\`json
{
  "port": 3000,
  "apiKey": "your-secure-api-key",
  "twitter": {
    "apiKey": "your-twitter-api-key",
    "apiSecretKey": "your-twitter-api-secret-key",
    "accessToken": "your-twitter-access-token"
  },
  "solana": {
    "rpcEndpoint": "https://api.mainnet-beta.solana.com",
    "privateKey": "your-solana-private-key"
  }
}
\`\`\`

5. Connecting Bot to Interface
-----------------------------
In the interface settings:
1. Navigate to Bot Configuration tab
2. Enter your VPS URL: http://your-vps-ip:3000
3. Enter the API key you configured in config.json
4. Test connection

API Endpoints to implement on the bot:
\`\`\`javascript
// Required endpoints
GET /status - Check bot status
POST /snipe - Execute snipe operation
GET /balance - Get wallet balance
GET /transactions - Get recent transactions
\`\`\`

6. Monitoring & Maintenance
--------------------------
Common monitoring commands:
\`\`\`bash
# View bot logs
pm2 logs solana-sniper

# Monitor system resources
htop

# Check bot status
pm2 status

# Restart bot
pm2 restart solana-sniper

# Update bot
git pull
npm install
npm run build
pm2 restart solana-sniper
\`\`\`

7. Backup & Recovery
-------------------
Regular backup commands:
\`\`\`bash
# Backup configuration
cp config.json config.json.backup

# Backup database (if applicable)
# Add your database backup commands here

# Create a complete backup of the bot directory
tar -czf bot-backup-$(date +%Y%m%d).tar.gz /path/to/bot/directory
\`\`\`

8. Troubleshooting
-----------------
Common issues and solutions:

1. Bot not starting:
\`\`\`bash
# Check logs
pm2 logs solana-sniper

# Verify node modules
rm -rf node_modules
npm install
\`\`\`

2. Connection issues:
\`\`\`bash
# Check if port is open
sudo netstat -tulpn | grep 3000

# Verify firewall settings
sudo ufw status
\`\`\`

3. Performance issues:
\`\`\`bash
# Monitor system resources
htop

# Check disk space
df -h
\`\`\`

9. Security Best Practices
-------------------------
1. Keep system updated:
\`\`\`bash
sudo apt update && sudo apt upgrade -y
\`\`\`

2. Monitor authentication logs:
\`\`\`bash
sudo tail -f /var/log/auth.log
\`\`\`

3. Regular security audits:
\`\`\`bash
# Check for failed login attempts
grep "Failed password" /var/log/auth.log

# Check for unauthorized sudo usage
grep "sudo:" /var/log/auth.log
\`\`\`

10. Additional Resources
----------------------
- Solana Documentation: https://docs.solana.com
- Twitter API Documentation: https://developer.twitter.com/en/docs
- PM2 Documentation: https://pm2.keymetrics.io/docs/usage/quick-start/

For support or questions, please refer to our documentation or contact support team.

Note: Replace all placeholder values (your-username, your-secure-api-key, etc.) with your actual values.
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
          Complete setup instructions with command-line examples for deploying and configuring the bot
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full rounded-md border p-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold">VPS Requirements</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>2GB RAM minimum</li>
                <li>1 CPU Core</li>
                <li>20GB SSD Storage</li>
                <li>Ubuntu 20.04 LTS or higher</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold">Initial Setup</h3>
              <div className="space-y-2">
                <p>1. Update system packages</p>
                <p>2. Install Node.js and development tools</p>
                <p>3. Configure firewall</p>
                <p>4. Create non-root user</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold">Bot Installation</h3>
              <div className="space-y-2">
                <p>1. Clone repository</p>
                <p>2. Install dependencies</p>
                <p>3. Configure PM2</p>
                <p>4. Build and start the bot</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold">Configuration</h3>
              <div className="space-y-2">
                <p>1. Set up API keys</p>
                <p>2. Configure Solana wallet</p>
                <p>3. Set up Twitter integration</p>
                <p>4. Configure bot endpoints</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold">Monitoring & Maintenance</h3>
              <div className="space-y-2">
                <p>1. Monitor bot logs</p>
                <p>2. Check system resources</p>
                <p>3. Regular updates</p>
                <p>4. Backup procedures</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold">Security</h3>
              <div className="space-y-2">
                <p>1. Firewall configuration</p>
                <p>2. Regular updates</p>
                <p>3. Secure key storage</p>
                <p>4. Access monitoring</p>
              </div>
            </section>
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