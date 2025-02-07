
const BotInstallationGuide = () => {
  return `
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
\`\`\``;
};

export default BotInstallationGuide;
