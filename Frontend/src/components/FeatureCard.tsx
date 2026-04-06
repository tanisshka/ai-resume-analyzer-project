import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <Card 
      className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-primary">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-card-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};
