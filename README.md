# AI-Assisted Cipher Messaging Web Application

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

## LLM Integration

## Setup Instructions

## Testing the Application

## Author
Elisabeth Ashby

Utah State University

Spring 2026

CS4610 - Final Project
