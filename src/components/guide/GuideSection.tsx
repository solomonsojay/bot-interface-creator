import { ReactNode } from "react";

interface GuideSectionProps {
  title: string;
  children: ReactNode;
}

const GuideSection = ({ title, children }: GuideSectionProps) => {
  return (
    <section>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </section>
  );
};

export default GuideSection;