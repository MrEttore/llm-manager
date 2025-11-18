<p align="center">
  <img src="assets/logo.svg" alt="Logo" width="200" draggable="false"/>
</p>

# llm-manager <!-- omit in toc -->

Personal GenAI backend orchestrator that centralizes LLM providers for my projects.

![Build](https://img.shields.io/badge/build-automated-lightgrey)

## Table of Contents <!-- omit in toc -->

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Projects Using the llm-manager](#projects-using-the-llm-manager)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Run Locally](#run-locally)
  - [Docker (Optional)](#docker-optional)
- [API Reference](#api-reference)
- [Roadmap](#roadmap)
- [Acknowledgements](#acknowledgements)

## Overview

LLM Manager is a lightweight Express service that exposes a unified API for LLM providers. It gives my projects a consistent, vendor-agnostic gateway so I can swap or mix providers without changing frontend code. By consolidating provider SDKs in one secure backend, I can enforce best practices, centralize observability, and keep API keys off the client.

- One backend wiring multiple GenAI providers with a single contract.
- Secure key custody and rate limiting before requests hit provider APIs.
- Deploy once (Vercel, Docker, or local) and reuse across any project, such as [Dialectiq](https://dialectiq-ten.vercel.app/).

> Backend-only service. Handles REST and Server-Sent Events (SSE) endpoints for OpenAI chat completions today, with abstractions ready for additional providers.

## Tech Stack

- Language(s): TypeScript
- Backend: Node.js, Express
- Infra: Vercel (serverless), Docker

## Features

- [x] REST endpoint for OpenAI chat completions with provider abstraction
- [x] SSE streaming endpoint for real-time token delivery
- [x] Centralized environment-driven configuration to protect secrets and tune providers
- [ ] Expand OpenAI coverage (vision, images, TTS)
- [ ] Add Anthropic, Google Gemini, and Ollama integrations behind the same API
- [ ] Pluggable guardrails, logging, and analytics middleware

## Projects Using the llm-manager

- [Dialectiq](https://dialectiq-ten.vercel.app/)

## Project Structure

```text
llm-manager/
├─ api/                 # Vercel serverless entrypoint forwarding to built app
├─ src/
│  ├─ app.ts            # Express app bootstrap
│  ├─ server.ts         # HTTP server for local/runtime usage
│  ├─ config/           # CORS and environment configuration
│  ├─ controllers/      # HTTP controllers
│  ├─ middlewares/      # Error and 404 handlers
│  ├─ routes/           # Versioned API routers
│  ├─ services/         # Provider-specific SDK wrappers
│  └─ types/            # Shared request/response typings
└─ Dockerfile
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm (ships with Node) or another package manager
- Optional: Docker Desktop if you want containerized deployments

### Environment Variables

Create a `.env` file at the project root (copy from `.env.example`). Provide the variables required by the backend.

```bash
# Runtime
NODE_ENV=development
PORT=3000

# Provider configuration
OPENAI_API_KEY=sk-...
```

> Keep provider API keys exclusively in the backend. Frontend apps should call this service instead of the vendor SDKs directly.

### Installation

Clone the repository:

```sh
git clone https://github.com/MrEttore/llm-manager.git
cd llm-manager
```

Install dependencies:

```sh
npm install
```

### Run Locally

```sh
# Start the TypeScript dev server with hot reload
npm run dev

# Lint and type-check
npm run check
```

The API will be available at `http://localhost:3000` (configurable via `PORT`).

### Docker (Optional)

```sh
# Build the image
docker build -t mrettore/llm-manager:dev .

# Run the container
docker run --rm -p 3000:3000 --env-file .env mrettore/llm-manager:dev
```

Deploy the same image to your preferred registry or run it in any container platform.

## API Reference

- `POST /api/v1/openai/chat/completion`

  - Body: `{ "model": "gpt-4o-mini", "messages": [{ "role": "user", "content": "Hello" }] }`
  - Response: `{ "role": "assistant", "content": "..." }`

- `POST /api/v1/openai/chat/stream`
  - Body: same payload as above.
  - Response: Server-Sent Events stream emitting incremental `{ role, content }` chunks; terminates with `{ done: true }`.

All endpoints inherit JSON error responses from the global error handler `{ "error": { code, message } }`.

## Roadmap

- [ ] Add Anthropic Claude and Google Gemini providers behind the same contract
- [ ] Support additional OpenAI capabilities (images, TTS, structured outputs)
- [ ] Introduce request guardrails, content filtering, and usage analytics
- [ ] Ship a lightweight SDK or client helpers for frontend and Node consumers

## Acknowledgements

- [OpenAI Node SDK](https://github.com/openai/openai-node)
- [Express](https://expressjs.com/)
- [Vercel](https://vercel.com/) for frictionless deployments
