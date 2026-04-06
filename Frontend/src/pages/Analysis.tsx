import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Upload, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Analysis = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        setResumeFile(file);
        toast.success("Resume uploaded successfully!");
      } else {
        toast.error("Please upload a PDF file only");
        e.target.value = "";
      }
    }
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description");
      return;
    }
    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append("file", resumeFile);
    formData.append("job", jobDescription);

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      navigate("/result", { state: { result: data } });
    } catch (err) {
      toast.error("Backend not running");
    }

    setIsAnalyzing(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-gradient-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">AI Resume Analyser</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="ghost" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
            Resume Analysis
          </h1>
          <p className="text-muted-foreground">
            Upload your resume and job description for AI-powered insights
          </p>
        </div>

        <Card className="shadow-glow border-border/50 bg-gradient-card animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Start Your Analysis
            </CardTitle>
            <CardDescription>
              Provide the job description and your resume to get personalized
              feedback
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Job Description */}
            <div className="space-y-2">
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea
                id="job-description"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[200px] bg-background"
              />
            </div>

            {/* Resume Upload */}
            <div className="space-y-2">
              <Label htmlFor="resume">Resume (PDF only)</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => document.getElementById("resume")?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    {resumeFile ? resumeFile.name : "Choose PDF file"}
                  </Button>
                </div>
              </div>
              {resumeFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {resumeFile.name} (
                  {(resumeFile.size / 1024).toFixed(2)} KB)
                </p>
              )}
            </div>

            {/* Analyze Button */}
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Analysis;
