
const InitialSetupGuide = () => {
  return `
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
\`\`\``;
};

export default InitialSetupGuide;
