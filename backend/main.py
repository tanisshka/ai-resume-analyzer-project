from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from openai import OpenAI
from dotenv import load_dotenv
import os

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load embedding model once
model = SentenceTransformer("all-MiniLM-L6-v2")

# Setup LLM client
load_dotenv(override=True)
api_key = os.getenv("API_KEY")

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1"
)

# ----------- PDF TEXT EXTRACTION -----------
def extract_text_from_pdf(file):
    text = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text


# ----------- CLEAN TEXT -----------
def clean_text(text):
    return text.lower().replace("\n", " ").strip()


# ----------- ATS SCORE (FIXED) -----------
def compute_similarity(resume, job):
    embeddings = model.encode([resume, job])

    score = cosine_similarity(
        [embeddings[0]],
        [embeddings[1]]
    )[0][0]

    # ✅ FIX: convert numpy -> python float
    return float(round(score * 100, 2))


# ----------- LLM FEEDBACK -----------
def generate_feedback(resume, job):

    prompt = f"""
    You are an expert ATS resume evaluator.

    Compare the resume with the job description.

    Give output in this format:

    Summary:
    Strengths:
    Missing Skills:
    Suggestions:

    Be strict and specific.

    Job Description:
    {job}

    Resume:
    {resume}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
    )

    return response.choices[0].message.content


# ----------- API ENDPOINT -----------
@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    job: str = Form(...)
):
    try:
        # Extract resume text
        resume_text = extract_text_from_pdf(file.file)

        # Clean text
        resume_text = clean_text(resume_text)
        job_text = clean_text(job)

        # Compute ATS score
        score = compute_similarity(resume_text, job_text)

        # Generate feedback
        feedback = generate_feedback(resume_text, job_text)

        return {
            "score": score,
            "feedback": feedback
        }

    except Exception as e:
        return {
            "error": str(e)
        }