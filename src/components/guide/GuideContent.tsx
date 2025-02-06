const GuideContent = () => {
  const generateContent = () => {
    return `
Solana Sniper Bot - Complete Setup Guide
=======================================

1. VPS Requirements & Initial Setup
---------------------------------
Minimum VPS Specifications:
- 4GB RAM (recommended for Node.js and monitoring)
- 2 CPU Cores
- 40GB SSD Storage
- Ubuntu 20.04 LTS or higher

Initial Server Setup:
\`\`\`bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install essential tools
sudo apt install -y git build-essential

# Verify installations
node --version  # Should be 18.x or higher
npm --version
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

# Create non-root user
sudo adduser botuser
sudo usermod -aG sudo botuser

# Switch to new user
su - botuser
\`\`\`

3. Bot Installation
------------------
\`\`\`bash
# Clone repository (use your actual repository URL)
git clone https://github.com/your-username/solana-sniper-bot.git
cd solana-sniper-bot

# Install dependencies
npm install

# Create configuration file
cp config.example.json config.json

# Edit configuration
nano config.json
\`\`\`

4. Configuration
---------------
Required API Keys:
1. Twitter API Keys (for KOL monitoring)
2. SolSniffer API Key (for contract analysis)

Configure your config.json:
\`\`\`json
{
  "twitter": {
    "apiKey": "your-twitter-api-key",
    "apiSecretKey": "your-twitter-api-secret-key",
    "accessToken": "your-twitter-access-token",
    "accessTokenSecret": "your-twitter-access-token-secret"
  },
  "solana": {
    "rpcEndpoint": "https://api.mainnet-beta.solana.com",
    "walletPrivateKey": "your-wallet-private-key"
  },
  "solsniffer": {
    "apiKey": "your-solsniffer-api-key"
  },
  "trading": {
    "defaultAmount": 0.1,
    "defaultSlippage": 15,
    "priorityFee": 5000,
    "profitTarget": 300,
    "moonbagPercentage": 25
  }
}
\`\`\`

5. Running the Bot
-----------------
\`\`\`bash
# Install PM2 for process management
sudo npm install -g pm2

# Start the bot
pm2 start npm --name "solana-sniper" -- start

# Monitor bot logs
pm2 logs solana-sniper

# Enable startup on system boot
pm2 startup
pm2 save
\`\`\`

6. Monitoring & Maintenance
--------------------------
Common monitoring commands:
\`\`\`bash
# View bot status
pm2 status

# Monitor logs
pm2 logs solana-sniper

# Restart bot
pm2 restart solana-sniper

# Update bot
git pull
npm install
pm2 restart solana-sniper
\`\`\`

7. Troubleshooting
-----------------
Common issues and solutions:

1. Twitter API Rate Limits:
   - Monitor rate limit headers
   - Implement exponential backoff

2. Solana RPC Node Issues:
   - Use multiple fallback RPC endpoints
   - Monitor for timeout errors

3. Contract Analysis Errors:
   - Verify SolSniffer API key
   - Check contract address format

4. Trading Errors:
   - Verify wallet balance
   - Check slippage settings
   - Monitor priority fee effectiveness

8. Security Best Practices
-------------------------
1. Secure your API keys:
   - Use environment variables
   - Regular key rotation
   - Restricted IP access

2. Wallet security:
   - Use a dedicated trading wallet
   - Regular backup of seed phrase
   - Monitor for unauthorized transactions

3. Server security:
   - Regular security updates
   - SSH key authentication
   - Firewall configuration
   - Regular log monitoring

9. Backup & Recovery
-------------------
Regular backup procedures:
\`\`\`bash
# Backup configuration
cp config.json config.backup.json

# Create complete backup
tar -czf bot-backup-$(date +%Y%m%d).tar.gz /path/to/bot/directory

# Backup wallet
# Store seed phrase securely offline
\`\`\`

10. Performance Optimization
--------------------------
1. Monitor system resources:
\`\`\`bash
# Install monitoring tools
sudo apt install htop iotop

# Monitor system resources
htop
\`\`\`

2. Optimize Node.js:
\`\`\`bash
# Set Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
\`\`\`

For support or questions, please refer to our documentation or contact support team.
    `;
  };

  return { generateContent };
};

export default GuideContent;