# 🧠 QuizBear: AI-Powered Quiz Generator

**QuizBear** is a full-stack web app that generates intelligent, context-aware quizzes from raw text input. It's designed for learners, educators, and content creators who want to turn *any text* into an interactive study tool — instantly.

## 📸 Screenshot
> _(Add a screenshot here)_  
> Example: `![QuizBear screenshot](./screenshot.png)`

## 🚀 Features
- ✍️ Generate multiple-choice questions from any input text  
- 🧠 Powered by OpenAI GPT-4o + LangChain for smart question creation  
- 📚 Study modes: **Flashcards**, **Spaced Repetition**, **Quiz**  
- 🗃️ Auto-saves quizzes to a MongoDB-backed library  
- 📈 Mastery score system (coming soon!)  
- 🧩 Built with a modern tech stack: **Next.js + FastAPI**

## 🛠️ Tech Stack

### Frontend
- **Next.js** (App Router, Client Components)  
- **Tailwind CSS** for clean, responsive UI  
- **React Hooks** for interactivity  
- Deployed via **Vercel** or compatible static hosts

### Backend
- **FastAPI** for blazing-fast REST API  
- **LangChain** for templated prompt engineering  
- **OpenAI GPT-4o** for natural language understanding  
- **MongoDB** via async `motor` driver for persistent storage

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/quizbear.git
cd quizbear
```

### 2. Set up the backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
Create a `.env` file:
```env
OPENAI_API_KEY=your-openai-key
MONGODB_URI=your-mongodb-uri
```
Then run the backend:
```bash
uvicorn main:app --reload
```

### 3. Set up the frontend (Next.js)
```bash
cd frontend
npm install
```
Create `.env.local`:
```env
NEXT_PUBLIC_LAMBDA_API=http://127.0.0.1:8000/
```
Then run:
```bash
npm run dev
```

## 📦 API Endpoints

| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| POST   | `/create`             | Generate a new quiz from input     |
| GET    | `/quiz/{quiz_id}`     | Retrieve a specific quiz           |
| DELETE | `/deleteQuiz/{id}`    | Delete a quiz from the database    |
| GET    | `/myLibrary`          | Fetch all saved quizzes            |

## 🧪 Example Input
```text
"BaristaFIRE is a semi-retirement strategy where individuals reduce their full-time work..."
```
**Output**:  
- Multiple-choice questions in clean JSON format  
- Auto-generated quiz **title** + **description**  
- Persisted to MongoDB via `/create` API

## 📌 Roadmap
- [x] Quiz generation from text  
- [x] Save/load quizzes from backend  
- [ ] User accounts & authentication  
- [ ] Mastery score & analytics  
- [ ] Study gamification  
- [ ] Export to Anki / CSV / PDF

## 🙌 Contributing
Pull requests are welcome! If you’d like to suggest a feature, report a bug, or contribute code, please open an [issue](https://github.com/yourusername/quizbear/issues) or submit a PR.

## 📄 License
MIT © 2025 [Your Name]
