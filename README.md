# Aura 🎙️🤖

Aura is an intelligent, AI-powered meeting platform built with Next.js. It features a complete suite of meeting tools including video calls, real-time AI voice agents that can join your meetings, automatic transcript summaries, and a post-meeting chatbot to query meeting context.

## 🌟 Features

* **Video Meetings:** High-quality video and audio conferencing powered by [Stream Video](https://getstream.io/video/).
* **Realtime AI Voice Agent:** Invite an AI agent to your meeting that listens and speaks in real-time, built using the `@stream-io/openai-realtime-api` and OpenAI.
* **Automatic Meeting Summaries:** Background jobs powered by [Inngest](https://www.inngest.com/) process the call transcripts with OpenAI `gpt-4o` to generate accurate meeting summaries.
* **Post-Meeting Text Chatbot:** After a meeting, users can chat with the AI using [Stream Chat](https://getstream.io/chat/). The bot uses the transcript summary to provide highly accurate, context-aware answers to your questions.
* **Modern Tech Stack:** Built with Next.js 15, React 19, tRPC for typesafe API calls, and Drizzle ORM connected to a Neon Serverless Postgres database.

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org) (App Router)
* **Language:** TypeScript
* **Styling & UI:** Tailwind CSS, Radix UI (shadcn/ui essentials)
* **Database & ORM:** PostgreSQL (Neon), [Drizzle ORM](https://orm.drizzle.team)
* **Authentication:** [Better Auth](https://better-auth.com)
* **Real-time Comms:** Stream IO (Video & Chat)
* **Background Jobs:** Inngest
* **AI Provider:** OpenAI (GPT-4o & Realtime API)

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed, and accounts set up for PostgreSQL, Stream, Inngest, and OpenAI.

### 1. Clone & Install
\`\`\`bash
git clone <repository>
cd aura
npm install
\`\`\`

### 2. Environment Variables
Create a \`.env\` file in the root directory and add the necessary tokens:

\`\`\`env
# Database
DATABASE_URL=your_neon_postgres_database_url

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Stream IO
NEXT_PUBLIC_STREAM_KEY=your_stream_api_key
NEXT_PUBLIC_STREAM_CHAT_API_KEY=your_stream_chat_api_key
STREAM_SECRET=your_stream_api_secret

# Other necessary variables for Better Auth and Inngest
\`\`\`

### 3. Database Setup
Push the Drizzle schema to your database.
\`\`\`bash
npm run db:push
\`\`\`
*(Optional: Use `npm run db:studio` to view the local Drizzle Studio)*

### 4. Running Locally

Aura requires multiple processes to run properly (the Next.js server, the webhooks, and the Inngest local dev server). We've provided a script to run them all concurrently:

\`\`\`bash
npm run dev:all
\`\`\`

* **Web:** \`http://localhost:3000\`
* **Inngest Dev Server:** \`http://127.0.0.1:8288\`

---
*Built with modern web technologies.*
