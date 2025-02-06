import GuideSection from "./GuideSection";

const VpsRequirements = () => {
  return (
    <GuideSection title="VPS Requirements">
      <ul className="list-disc list-inside space-y-2">
        <li>2GB RAM minimum</li>
        <li>1 CPU Core</li>
        <li>20GB SSD Storage</li>
        <li>Ubuntu 20.04 LTS or higher</li>
      </ul>
    </GuideSection>
  );
};

export default VpsRequirements;