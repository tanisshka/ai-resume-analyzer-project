
# AI Resume Analyzer (FastAPI + Gemini API)

An AI-powered Resume Analyzer built using **FastAPI** and **Google Gemini API** that analyzes resumes and provides intelligent feedback, improvement suggestions, and skill recommendations.

This project demonstrates the practical use of **Generative AI with modern backend development**.

---

## Features

- AI-powered resume analysis using Gemini API
- Provides improvement suggestions
- Identifies missing skills
- Fast backend using FastAPI
- REST API based system
- Automatic interactive API documentation

---

## Tech Stack

- FastAPI
- Python
- Google Gemini API
- Uvicorn
- Pydantic
- HTML, CSS

---

## Project Structure

```

ai-resume-analyzer/
│
├── main.py
├── requirements.txt
├── .env
├── .gitignore
├── README.md
│
└── app/
├── routes/
├── services/
└── utils/

````

---

## How it Works

1. User submits resume content  
2. FastAPI backend processes the request  
3. Resume content is sent to Gemini API  
4. Gemini analyzes the resume  
5. Feedback and suggestions are returned  

---

## Installation

### 1. Clone repository

```bash
git clone https://github.com/tanisshka/ai-resume-analyzer.git
````

### 2. Navigate to project folder

```bash
cd ai-resume-analyzer
```

### 3. Create virtual environment

```bash
python -m venv venv
```

### 4. Activate virtual environment

**Windows:**

```bash
venv\Scripts\activate
```

**Mac/Linux:**

```bash
source venv/bin/activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

---

## Environment Variables

Create a `.env` file and add:

```env
GEMINI_API_KEY=your_api_key_here
```

---

## Run the Application

```bash
uvicorn main:app --reload
```

Application will run at:

```
http://127.0.0.1:8000
```

Interactive API Docs:

```
http://127.0.0.1:8000/docs
```

---

## API Endpoint

**POST** `/analyze`

**Input:** Resume text

**Output:** AI-generated feedback and suggestions

---

## Learning Outcomes

* FastAPI backend development
* REST API design
* Gemini API integration
* Generative AI application development
* Backend architecture and project structuring

---

## Future Improvements

* Resume file upload (PDF/DOCX)
* Resume scoring system
* Frontend improvements
* Deployment

---

## Author

**Tanishka Patil**

LinkedIn: [https://linkedin.com/in/tanishka-patil-6967251a7](https://linkedin.com/in/tanishka-patil-6967251a7)

GitHub: [https://github.com/tanisshka](https://github.com/tanisshka)

````



