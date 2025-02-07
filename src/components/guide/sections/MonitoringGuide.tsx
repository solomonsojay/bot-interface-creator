
const MonitoringGuide = () => {
  return `
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
\`\`\``;
};

export default MonitoringGuide;
