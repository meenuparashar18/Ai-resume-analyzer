# 🤖 AI Resume Analyzer

An AI-powered Resume Analyzer built using **HTML, CSS, and Vanilla JavaScript**. The application allows users to upload a PDF resume, extract its content, and analyze it using **Google Gemini AI** to receive an ATS score, resume score, strengths, weaknesses, missing skills, improvement suggestions, and interview tips.

---

## ✨ Features

- 📄 Upload PDF Resume
- 🤖 AI-Powered Resume Analysis using Gemini API
- 📊 Resume Score (0–100)
- 🎯 ATS Compatibility Score
- 💼 Skills Detection
- ❌ Missing Skills Identification
- 💪 Strengths Analysis
- ⚠️ Weaknesses Analysis
- 💡 Resume Improvement Suggestions
- 🎤 Interview Preparation Tips
- 🌙 Light/Dark Theme Toggle
- 📱 Fully Responsive UI
- 🎨 Modern Glassmorphism Design

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6)
- Google Gemini API
- PDF.js
- Font Awesome

---

## 📂 Project Structure

```
AI-Resume-Analyzer/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/AI-Resume-Analyzer.git
```

### 2. Open the Project

Simply open the project folder in **VS Code**.

### 3. Add Your Gemini API Key

Open **script.js**

Replace

```javascript
const API_KEY = "ADD_YOUR_API_KEY_HERE";
```

with

```javascript
const API_KEY = "YOUR_GEMINI_API_KEY";
```

### 4. Run the Project

Open **index.html** using **Live Server**.

---

## 📖 How It Works

1. Upload a PDF resume.
2. PDF.js extracts the text from the resume.
3. The extracted content is sent to Google Gemini AI.
4. Gemini analyzes the resume and returns structured JSON data.
5. JavaScript displays:
   - Resume Score
   - ATS Score
   - Skills
   - Missing Skills
   - Strengths
   - Weaknesses
   - Suggestions
   - Interview Tips

---



---

## 🔒 API Key Notice

For security reasons, **do not upload your actual Gemini API key to GitHub**.

Before pushing the project, replace your key with:

```javascript
const API_KEY = "ADD_YOUR_API_KEY_HERE";
```

---

## 🚀 Future Improvements

- DOCX Resume Support
- Resume Preview
- Download AI Analysis as PDF
- Multiple Resume Comparison
- Job Description Matching
- Resume History
- AI Cover Letter Generator
- AI Resume Builder

---

