# RAG AI Assistant

A React and TypeScript frontend for uploading PDF documents, viewing them, and asking questions against their content through a retrieval-augmented generation (RAG) backend.

## Prerequisites

- Node.js and npm
- A compatible backend API configured for authentication, document upload, PDF preview, and chat

> **Backend requirement:** This repository contains the frontend only. An appropriate backend setup is required for the application to provide authentication, document processing, and chat functionality. The backend must be running and expose the API routes expected by this frontend.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

   Set `VITE_API_URL` to the base URL of your compatible backend API.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL shown by Vite in your browser.

## Available scripts

```bash
npm run dev       # Start the development server
npm run build     # Type-check and create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

## Main features

- User registration, login, logout, and token refresh
- PDF document upload and deletion
- PDF preview with page navigation and zoom controls
- RAG chat with Markdown responses and document sources
- Per-user chat history stored in browser local storage

## Expected backend capabilities

The backend should provide compatible endpoints for:

- Authentication: `/auth/login`, `/auth/register`, `/auth/me`, `/auth/logout`, and `/auth/refresh`
- Documents: `/kb/documents`, `/kb/upload`, and `/kb/documents/:documentId/preview`
- Chat: `/chat/ask`

The API response and request formats must match the Zod schemas in `src/api`.
