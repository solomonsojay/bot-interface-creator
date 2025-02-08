
import InitialSetupGuide from "./sections/InitialSetupGuide";
import BotInstallationGuide from "./sections/BotInstallationGuide";
import MonitoringGuide from "./sections/MonitoringGuide";
import TroubleshootingGuide from "./sections/TroubleshootingGuide";

const GuideContent = () => {
  const generateContent = () => {
    return `
Solana Sniper Bot - Complete Setup Guide
=======================================

${InitialSetupGuide()}

${BotInstallationGuide()}

${MonitoringGuide()}

${TroubleshootingGuide()}

9. Frontend Deployment
---------------------
The frontend can be deployed in two ways:

A. Standalone Web Hosting (Recommended):
\`\`\`bash
# Build the frontend
npm run build

# Deploy to Netlify/Vercel (recommended)
# Follow platform-specific deployment steps
\`\`\`

B. VPS Hosting (Optional):
\`\`\`bash
# Install nginx
sudo apt install nginx

# Configure nginx
sudo nano /etc/nginx/sites-available/solana-sniper

# Add configuration
server {
    listen 80;
    server_name your_domain.com;
    root /var/www/solana-sniper;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/solana-sniper /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
\`\`\`

10. System Integration
--------------------
1. Backend Configuration:
   - Deploy Supabase Edge Functions
   - Set up required environment variables
   - Test API endpoints using the Supabase dashboard

2. Frontend Configuration:
   - Update API endpoints in config
   - Set CORS headers appropriately
   - Test connection to backend services

3. Bot Integration:
   - Configure bot API access
   - Set up wallet connections
   - Test trading functionality

11. Accessing the Interface
-------------------------
1. Web Access:
   - Access via deployed URL (if using web hosting)
   - Or via VPS IP/domain (if self-hosting)

2. Configuration:
   - Set up API keys in settings
   - Configure trading parameters
   - Test monitoring systems

For support or questions, please refer to our documentation or contact the support team.
    `;
  };

  return { generateContent };
};

export default GuideContent;
