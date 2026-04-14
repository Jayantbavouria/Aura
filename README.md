# Aura - Intelligent Meeting Platform

Aura is a modern, high-performance web application designed for seamless video conferencing, real-time chat, and AI-driven interactions. Built with top-tier technologies, it offers a robust platform for scheduling and joining meetings, managing events, and interacting with specialized AI chatbots.

## 🚀 Key Features

*   **Real-time Video & Audio:** Integrated via Stream IO for low-latency, reliable meeting experiences.
*   **Live Chat & AI Chatbots:** Stream Chat and OpenAI integrations provide rich text communication and intelligent AI assistance within the app.
*   **Authentication & Security:** Secure user sessions and onboarding powered by Better Auth.
*   **Resilient Background Workflows:** Managed by Inngest, ensuring reliable webhook processing, automated scheduling, and event-driven updates.
*   **Intuitive UI/UX:** Built with Tailwind CSS, Radix UI primitives, shadcn/ui patterns, and refined animations for a premium user experience.

## 🛠️ Tech Stack

### Core Framework & State Management
*   **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19)
*   **API Layer:** [tRPC](https://trpc.io/) for end-to-end typesafe APIs.
*   **State & Data Fetching:** [TanStack React Query](https://tanstack.com/query)

### Database & ORM
*   **Database:** [Neon](https://neon.tech/) (Serverless Postgres)
*   **ORM:** [Drizzle ORM](https://orm.drizzle.team/)

### External Services & Integrations
*   **Video & Chat:** [Stream IO](https://getstream.io/) (Video React SDK, Chat SDK)
*   **Background Jobs:** [Inngest](https://www.inngest.com/)
*   **Authentication:** [Better Auth](https://better-auth.com/)
*   **AI:** OpenAI Realtime API & `@stream-io/openai-realtime-api`

### Styling & UI Design
*   [Tailwind CSS v4](https://tailwindcss.com/)
*   [Radix UI](https://www.radix-ui.com/) (Accessible components)
*   [Lucide React](https://lucide.dev/) (Iconography)
*   [Recharts](https://recharts.org/) (Data visualization)

## 🚦 Getting Started

### Prerequisites

Ensure you have Node.js (>= 20.x) installed. You'll also need accounts and active API keys for the following integrated services:
*   Neon Database
*   Stream IO (Video and Chat)
*   Inngest
*   OpenAI

### Installation

1.  Clone the repository and enter the workspace:
    ```bash
    cd aura
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure your environment variables:
    Update the `.env` file in the root directory. Ensure all URIs and keys for the database, Stream, Inngest, and Better Auth are populated.

4.  Sync database schema (Drizzle):
    ```bash
    npm run db:push
    ```

5.  Start the complete development environment:
    This script runs the Next.js dev server, sets up an ngrok tunnel for receiving webhooks, and starts the Inngest local development server simultaneously.
    ```bash
    npm run dev:all
    ```
    
    *(Alternatively, to run only the Next.js frontend, use `npm run dev`)*

## 🏗️ Architecture Overview

*   **Data Integrity:** tRPC combined with TanStack Query ensures seamless data synchronization between the Next.js server and the client, catching interface discrepancies at compile time.
*   **Asynchronous Reliability:** Inngest handles offloading of long-running tasks (e.g., webhook processing, sending email alerts, recording processing), allowing the primary APIs to respond instantly.
*   **Media Optimization:** Stream IO handles complex WebRTC video/audio connections and chat socket networks on their highly optimized global edge network, entirely bypassing the Next.js backend bottleneck.
