# AI Interview Preparation Platform

A full stack job interview preparation app built with React, Express, MongoDB, and Google Gemini. It takes a job description and candidate information, then creates a saved interview preparation report with a match score, skill gaps, technical and behavioral questions, and a day-by-day preparation plan. A separate action generates a tailored resume PDF.

## Current implementation

- User registration and login with hashed passwords, JWT cookie authentication, logout token blacklisting, and a current-user endpoint.
- Protected interview workspace with a job-description form and candidate self-description field.
- Resume text extraction from an uploaded PDF, followed by Gemini generation of structured interview reports.
- Saved reports with match score, skill-gap severity, technical and behavioral questions with answer guidance, and a preparation roadmap.
- Recent report list and report detail page.
- Gemini-generated resume HTML rendered to PDF with Puppeteer.

The project does **not** currently implement the broader tutorial description's standalone resume analyzer, explicit resume parsing/skill extraction, or a distinct ATS scoring workflow. The match score is generated as part of the interview report. The frontend advertises PDF/DOCX uploads, but the backend parses PDF only; use a PDF until this is corrected.

## Stack

**Frontend:** React 19, Vite, React Router, Axios, Sass  
**Backend:** Node.js, Express 5, MongoDB/Mongoose, JWT, bcryptjs, Multer, pdf-parse  
**AI and PDF:** Google GenAI SDK (Gemini), Zod response schema, Puppeteer

## Repository layout

```text
Backend/
  server.js
  src/
    app.js
    config/database.js
    controllers/
    middlewares/
    models/
    routes/
    services/ai.service.js
Frontend/
  src/
    features/auth/
    features/interview/
    app.routes.jsx
    App.jsx
```

## Requirements

- Node.js and npm
- MongoDB connection string (local MongoDB or MongoDB Atlas)
- Google Gemini API key with access to the model configured in `Backend/src/services/ai.service.js`
- A PDF resume for the current resume-upload flow

## Setup

1. Create `Backend/.env` using [`Backend.env.example`](Backend.env.example) and fill in the values. Keep real credentials out of source control.
2. Install and start the backend:

   ```bash
   cd Backend
   npm install
   npm run dev
   ```

   The server listens on `http://localhost:3000`.

3. In another terminal, install and start the frontend:

   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

   Vite serves the app at `http://localhost:5173`, which is the origin allowed by the backend's current CORS configuration.

4. Register an account, enter a job description, and provide a PDF resume. The form also has a self-description field; the current backend controller nevertheless attempts to parse an uploaded file, so a resume PDF is required by this implementation.

## Environment variables

| Variable               | Used for                                                            |
| ---------------------- | ------------------------------------------------------------------- |
| `MONGO_URI`            | MongoDB connection string                                           |
| `JWT_SECRET`           | Signing and verifying authentication JWTs; use a long random secret |
| `GOOGLE_GENAI_API_KEY` | Gemini API access                                                   |

## API

See [API reference](docs/API.md) for routes, request fields, and authentication behavior. The frontend currently hardcodes the backend base URL to `http://localhost:3000` in its Axios clients, and the backend hardcodes the frontend origin to `http://localhost:5173`.

## Known gaps before public deployment

- Align the UI's accepted file types and size message with the backend's actual PDF-only parsing and 3 MB upload limit.
- Add request validation and clear error handling for missing/invalid uploads, empty fields, and Gemini/API failures.
- Configure cookie security options and verify authorization on every report-specific operation, including resume PDF generation.
- Move frontend and backend origins into deployment configuration; configure CORS, HTTPS, secrets, and production logging.
- Review uploaded resume handling, data retention, and privacy disclosures before inviting users to submit personal data.
- Add meaningful automated tests and a deployment guide only after the relevant setup and behavior have been verified.

## Screenshots

No screenshots were included with the supplied project files. Add current screenshots or a short demo here after capturing the running application.

## Attribution

The project is based on the tutorial and source repository linked above. If you publish or present it, retain appropriate attribution and check the source repository's license and any applicable course terms. Clearly describe your own changes and be prepared to explain the code.
