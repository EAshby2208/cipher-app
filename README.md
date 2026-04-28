# Cipher Messaging Web Application - CS4610 Final Project

## Project Overview

This project is a full-stack web application that allows users to encrypt and decrypt messages using a customizable cipher system, store those messages, and receive AI-generated analysis of their cipher.

This application combines
* A keyword-based substituion cipher
* A repeating numeric shift system
* Asynchronus AI-powered analysis

Users can experiement with cipher configurations, save results to a personal dashboard, and request intelligent feedback on the strength and structure of their cipher.

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
    * Describes keyword + numeric key roles
    * Evaluates cipher strength
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
3. Backgorund worker processes the job
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
* Supabase (ProstgreSQL + Auth)
### AI Integration
* Open AI API
* Vercel AI SDK
### Backgroudn Processing
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
* `create_at`

### `analysis_jobs`






## ...(cont)










---

<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->
