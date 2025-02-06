import GuideSection from "./GuideSection";

const SetupSteps = () => {
  return (
    <div className="space-y-6">
      <GuideSection title="Initial Setup">
        <div className="space-y-2">
          <p>1. Update system packages</p>
          <p>2. Install Node.js and development tools</p>
          <p>3. Configure firewall</p>
          <p>4. Create non-root user</p>
        </div>
      </GuideSection>

      <GuideSection title="Bot Installation">
        <div className="space-y-2">
          <p>1. Clone repository</p>
          <p>2. Install dependencies</p>
          <p>3. Configure PM2</p>
          <p>4. Build and start the bot</p>
        </div>
      </GuideSection>

      <GuideSection title="Configuration">
        <div className="space-y-2">
          <p>1. Set up API keys</p>
          <p>2. Configure Solana wallet</p>
          <p>3. Set up Twitter integration</p>
          <p>4. Configure bot endpoints</p>
        </div>
      </GuideSection>

      <GuideSection title="Monitoring & Maintenance">
        <div className="space-y-2">
          <p>1. Monitor bot logs</p>
          <p>2. Check system resources</p>
          <p>3. Regular updates</p>
          <p>4. Backup procedures</p>
        </div>
      </GuideSection>

      <GuideSection title="Security">
        <div className="space-y-2">
          <p>1. Firewall configuration</p>
          <p>2. Regular updates</p>
          <p>3. Secure key storage</p>
          <p>4. Access monitoring</p>
        </div>
      </GuideSection>
    </div>
  );
};

export default SetupSteps;