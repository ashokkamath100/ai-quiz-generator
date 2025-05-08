# 🧠 QuizBear: AI-Powered Quiz Generator

QuizBear is a full-stack web app that generates intelligent, context-aware quizzes from raw text input. It's designed for learners, educators, and content creators who want to turn any text into a study tool — instantly.

![Screenshot](./screenshot.png)

---

## 🚀 Features

- ✍️ Generate multiple-choice questions from any text
- 🧠 Uses OpenAI GPT-4o + LangChain for smart question generation
- 📚 Study modes: Flashcards, Spaced Repetition, Quiz
- 🗃️ Auto-saves quizzes to a MongoDB-backed library
- 📈 Mastery score system (coming soon)
- 🧩 Built with modern web stack (Next.js + FastAPI)

---

## 🛠️ Tech Stack

### Frontend
- **Next.js (App Router, Client Components)**
- **Tailwind CSS** for styling
- **React Hooks** (state & refs)
- Deployed via **Vercel** or any static host

### Backend
- **FastAPI** for the quiz generation API
- **LangChain** for prompt templates + parsing
- **OpenAI GPT-4o** for question generation
- **MongoDB** for quiz storage (via Motor async driver)

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/quizbear.git
cd quizbear
2. Set up the backend (FastAPI)
bash
Copy
Edit
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
Add your .env file:

ini
Copy
Edit
OPENAI_API_KEY=your-openai-key
MONGODB_URI=your-mongodb-uri
Then run:

bash
Copy
Edit
uvicorn main:app --reload
3. Set up the frontend (Next.js)
bash
Copy
Edit
cd frontend
npm install
Add your .env.local:

ini
Copy
Edit
NEXT_PUBLIC_LAMBDA_API=http://127.0.0.1:8000/
Then run:

bash
Copy
Edit
npm run dev
📦 API Endpoints
Method	Endpoint	Description
POST	/create	Generate a new quiz from text
GET	/quiz/{quiz_id}	Retrieve a saved quiz
DELETE	/deleteQuiz/{id}	Delete a quiz from the database
GET	/myLibrary	Fetch all saved quizzes

🧪 Example Input
css
Copy
Edit
"BaristaFIRE is a semi-retirement strategy where individuals reduce their full-time work..."
Output:
Multiple questions in MCQ format

Auto-generated title + description

Saved to your quiz library

📌 Roadmap
 Quiz generation from text

 Save/load quizzes from backend

 User accounts & auth

 Mastery tracking

 Study gamification

 Export to Anki / CSV

🙌 Contributing
PRs welcome! If you have suggestions for features or bug fixes, please open an issue or submit a pull request.