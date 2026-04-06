import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

/* ---------- Clean markdown junk like **bold**, _italic_, `code` ---------- */
function cleanText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .trim();
}

/* ---------- Parse AI feedback into readable sections ---------- */
function parseFeedback(text) {
  const sections = {
    summary: "",
    strengths: [],
    gaps: [],
    suggestions: [],
  };

  let current = null;

  text.split("\n").forEach((line) => {
    const clean = cleanText(line);
    if (!clean) return;

    if (/summary/i.test(clean)) {
      current = "summary";
      return;
    }
    if (/strength/i.test(clean)) {
      current = "strengths";
      return;
    }
    if (/missing|gap/i.test(clean)) {
      current = "gaps";
      return;
    }
    if (/suggestion|recommend/i.test(clean)) {
      current = "suggestions";
      return;
    }

    if (current === "summary") {
      sections.summary += clean + " ";
    } else if (current) {
      sections[current].push(clean.replace(/^[-•\d.]+/, "").trim());
    }
  });

  return sections;
}

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button onClick={() => navigate("/analysis")}>Go Back</Button>
      </div>
    );
  }

  const { score, feedback } = state.result;
  const parsed = parseFeedback(feedback);

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">AI Resume Analysis</h1>
          <p className="text-muted-foreground">
            ATS compatibility and improvement insights
          </p>
        </div>

        {/* ATS Score Card */}
        <div className="rounded-2xl bg-gradient-primary p-6 text-primary-foreground shadow-glow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">ATS Score</h2>
            {/* <span className="text-4xl font-bold">{score}%</span> */}
            <span className="text-4xl font-bold">
              {Number(score).toFixed(2)}%
            </span>
          </div>

          <div className="w-full bg-primary-foreground/20 rounded-full h-3">
            <div
              className="bg-primary-foreground h-3 rounded-full"
              style={{ width: `${score}%` }}
            />
          </div>

          <p className="mt-3 text-sm opacity-90">
            Higher score = stronger job description alignment
          </p>
        </div>

        {/* Summary */}
        {parsed.summary && (
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="text-muted-foreground leading-relaxed">
              {parsed.summary}
            </p>
          </div>
        )}

        {/* Strengths */}
        {parsed.strengths.length > 0 && (
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-xl font-semibold mb-3">Strengths</h2>
            <ul className="list-disc pl-6 space-y-2">
              {parsed.strengths.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Missing Skills */}
        {parsed.gaps.length > 0 && (
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-xl font-semibold mb-3">Missing Skills</h2>
            <ul className="list-disc pl-6 space-y-2">
              {parsed.gaps.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggestions */}
        {parsed.suggestions.length > 0 && (
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-xl font-semibold mb-3">Suggestions</h2>
            <ul className="list-disc pl-6 space-y-2">
              {parsed.suggestions.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            className="bg-gradient-primary hover:opacity-90"
            onClick={() => navigate("/analysis")}
          >
            Analyze Another Resume
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Result;
