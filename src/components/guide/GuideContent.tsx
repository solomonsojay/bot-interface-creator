
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

9. Performance Optimization
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
