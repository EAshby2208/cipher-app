# AI-Assisted Cipher Messaging Web Application

## Project Overview

This project is a full-stack web application that allows users to encrypt and decrypt messages using a customizable cipher system, store those messages, and receive AI-generated analysis of their cipher.

This application combines:
* A keyword-based substitution cipher
* A repeating numeric shift system
* Asynchronous AI-powered analysis

Users can experiment with cipher configurations, save results to a personal dashboard, and request intelligent feedback on the strength and structure of their cipher.

## Features

### Core Features
* **Encrypt/Decrypt Messages**
    * Custom Keyword substitution alphabet
    * Repeating numeric shift sequence
* **User Authentication**
    * Secure login/signup using Supabase Auth
* **Message Storage**
    * Save encrypted/decrypted messages
    * Retrieve messages in a personal dashboard
* **Dashboard**
    * View recent messages
    * Delete saved messages
* **AI-Powered Cipher Analysis**
    * Explain how the cipher works
    * Describe keyword + numeric key roles
    * Evaluate cipher strength
* **Background Job Processing**
    * Analysis runs asynchronously (non-blocking)
    * Job status tracked in database
    * Frontend polls for results

### Additional Features
* Loading states for async operations
* Error handling for API requests
* Clean UI with Tailwind CSS
* Optional message saving toggle

## How It Works

### Cipher System
The cipher combines two techniques:
1. **Keyword Substitution Alphabet**
    * Builds a custom alphabet from a keyword
2. **Numeric Shift Sequence**
    * Applies repeating shifts to characters

### AI Analysis Flow
1. User clicks **Analyze Cipher**
2. App creates a job in the database (`analysis_jobs`)
3. Background worker processes the job
4. OpenAI generates an explanation
5. Result is saved and returned to frontend

## Tech Stack
### Frontend
* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
### Backend
* Next.js API Routes
### Database & Auth
* Supabase (PostgreSQL + Auth)
### AI Integration
* OpenAI API
* Vercel AI SDK
### Background Processing
* Database-backed job queue using Supabase
* Worker function processes jobs asynchronously

## Database Schema
### `messages`
Stores user messages
* `id`
* `user_id`
* `phrase`
* `result`
* `keyphrase`
* `keycode`
* `mode`
* `created_at`

### `analysis_jobs`
Handles background AI processing
* `id`
* `user_id`
* `phrase`
* `keyphrase`
* `keycode`
* `status` (`pending`,`completed`,`failed`)
* `result`
* `created_at`

## Background Worker Design

The application uses a **database-backed job queue**:
* Jobs are inserted with `status = "pending"`
* Worker function:
    * Fetches pending jobs
    * Processes them using OpenAI
    * Updates status to `completed` or `failed`
* Frontend polls for updates every 2 seconds

This demonstrates **non-blocking asynchronous processing** without requiring external queue infrastructure.

## LLM Integration

The app uses OpenAI to:
* Explain how the cipher works
* Describe the role of the keyword and numeric key
* Evaluate cipher strength

Example output includes:
* Structural explanation
* Security assessment
* Clear, user-friendly breakdown

## Setup Instructions

### 1. Clone the repository
```
git clone https://github.com/EAshby2208/cipher-app.git
cd cipher-app
```
### 2. Install dependencies
```bash
npm install
```
### 3. Configure environment variables
Create a `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_key

OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-4.1-mini

NEXT_PUBLIC_BASE_URL=http://localhost:3000

(optional for testing without API usage)
DRY_RUN=true
```
### 4. Run the development server
```md
npm run dev
```

## Testing the Application

### Cipher Functionality
* Enter text + keyphrase + numeric code
* Test both encode and decode

### Message Storage
* Save messages
* Verify they appear in dashboard
* Test delete functionality

### AI Analysis
1. Click **Analyze Cipher**
2. Observe:
    * Job created in database (`pending`)
    * Status updates to `completed`
    * AI response appears in UI

## Future Improvements
* Add Redis-based queue for scalability
* Add AI suggestions for stronger keys
* Add pagination for message history
* Enhance UI and visualizations

## Author
Elisabeth Ashby

Utah State University

Spring 2026

CS4610 - Final Project
