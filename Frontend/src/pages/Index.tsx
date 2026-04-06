import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { useNavigate } from "react-router-dom";
import { FileText, Brain, Target, TrendingUp, Zap, Shield } from "lucide-react";
import interviewHero from "@/assets/interview-hero.webp";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={interviewHero}
            alt="Professional job interview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-4">
              <Zap className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
              AI Resume Analyser
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Transform your resume with AI-powered insights. Get personalized feedback, 
              optimize for ATS systems, and land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                onClick={() => navigate("/auth")}
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-6 shadow-glow animate-float"
              >
                <FileText className="mr-2 h-5 w-5" />
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 text-lg px-8 py-6"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary-foreground/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-card border-t">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 AI Resume Analyser. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
