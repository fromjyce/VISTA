# VISTA - Visa-aligned Intelligent System for Trust & Assurance

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen?logo=spring)](https://spring.io/projects/spring-boot)
[![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![LangChain](https://img.shields.io/badge/LangChain-0.1+-green?logo=chainlink)](https://langchain.com/)
[![FAISS](https://img.shields.io/badge/FAISS-1.7.4-orange)](https://github.com/facebookresearch/faiss)
[![Sentence Transformers](https://img.shields.io/badge/Sentence--Transformers-2.2+-yellow)](https://www.sbert.net/)

**Autonomous Agentic AI for Continuous PCI/PII Compliance**

[Features](#key-features) • [Architecture](#architecture) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Team](#team)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [AI Agents](#ai-agents)
- [RAG Model](#rag-model)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

---

## Overview

**VISTA** is an **autonomous, agentic AI-powered compliance platform** designed for Visa's network-scale regulatory challenges. Unlike traditional compliance tools that require manual triggers, VISTA operates through a **continuous compliance loop** where AI agents autonomously detect regulatory changes, interpret obligations, scan data, remediate violations, and generate audit-ready evidence—24/7, without human intervention.

### Built For

**Hackathon:** VISA × Shaastra 2026 - 24 Hour AI Hackathon  
**Problem Statement:** PS4 - Agentic AI for Compliance Automation  
**Team:** JNR

### Core Innovation

> **Behavioral Autonomy over Orchestration**  
> Agents are not scripts or models—they are autonomous, event-driven services that interpret regulations, enforce deterministic compliance, and generate audit-ready evidence continuously.

### The Continuous Compliance Loop

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   REGULATION  →  INTERPRET  →  SCAN  →  FIX  →  LEARN      │
│       ↑                                            │        │
│       └────────────────────────────────────────────┘        │
│                    CONTINUOUS LOOP                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```



---

## Key Features

###  Autonomous AI Agents

| Agent | Purpose | Trigger | AI Used |
|-------|---------|---------|---------|
| **Watcher** | Monitors regulatory feeds (PCI SSC, GDPR, FinCEN, RBI, NPCI) | Every 6 hours | None (RSS polling) |
| **Interpreter** | Debates interpretations using Constitutional AI | On new regulation | Gemini (safe) |
| **Monitor** | Scans transactions, emails, logs for PCI/PII violations | On control update | None (deterministic) |
| **Remediator** | Auto-generates fixes and evidence packages | On violation | Gemini (XAI only) |


### India-Specific Compliance

- **RBI Tokenization Mandates**
- **DPDP Act (Data Protection Officer requirements)**
- **NPCI UPI Lite X Guidelines**
- **Aadhaar/PAN Card exposure detection**

---

## Architecture

### High-Level System Design

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js)                      │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐      │
│  │Dashboard │ Watcher  │Compliance│   Ask    │  Export  │      │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘      │
└────────────────────────┬────────────────────────────────────────┘
                         │ REST API / WebSocket
┌────────────────────────┴────────────────────────────────────────┐
│                    PYTHON BACKEND (FastAPI)                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    API GATEWAY                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐      │
│  │ Watcher  │Interpret │ Monitor  │Remediate │ Learner  │      │
│  │  Agent   │  Agent   │  Agent   │  Agent   │  Agent   │      │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Detection Engine | RAG Service | XAI Tracer | Events   │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────────┐
│                    JAVA BACKEND (Spring Boot)                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Gateway | Control Library | Compliance State | Audit    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────────┐
│              DATA LAYER (SQLite + Vector Store)                 │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐      │
│  │ Sources  │ Debates  │ Findings │ Controls │ Evidence │      │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

### Agent Communication Flow

```
┌─────────────┐
│   WATCHER   │ Detects regulation change (RSS)
└──────┬──────┘
       │ Event: regulation.updated
       ▼
┌─────────────┐
│ INTERPRETER │ AI Constitutional Debate
└──────┬──────┘
       │ Event: controls.updated
       ▼
┌─────────────┐
│   MONITOR   │ Scans data with new rules
└──────┬──────┘
       │ Event: violation.detected
       ▼
┌─────────────┐
│ REMEDIATOR  │ Masks data + generates evidence
└──────┬──────┘
       │ Event: evidence.generated
       ▼
┌─────────────┐
│   LEARNER   │ Updates accuracy metrics
└─────────────┘
```

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0.10 | React framework with App Router |
| **React** | 19.2.0 | UI library |
| **TypeScript** | 5.0 | Type safety |
| **Tailwind CSS** | 4.1.9 | Utility-first styling |
| **shadcn/ui** | Latest | Component library (Radix UI) |
| **Recharts** | 2.15.4 | Data visualization |
| **Lucide React** | 0.454.0 | Icon library |
| **jsPDF** | 4.0.0 | PDF generation |
| **Zustand** | (via custom store) | State management |

### Backend (Python)

| Technology | Version | Purpose |
|------------|---------|---------|
| **FastAPI** | 0.109+ | High-performance API framework |
| **Python** | 3.13 | Runtime |
| **Uvicorn** | 0.27+ | ASGI server |
| **Pydantic** | 2.5+ | Data validation |
| **aiosqlite** | 0.19+ | Async SQLite |
| **Google Gemini** | 1.0+ | AI/LLM integration |
| **httpx** | 0.26+ | Async HTTP client |
| **WebSockets** | 12.0 | Real-time communication |

### Backend (Java - Optional)

| Technology | Version | Purpose |
|------------|---------|---------|
| **Spring Boot** | 3.2.0 | Enterprise backend framework |
| **Java** | 17 | Runtime |
| **Spring Cloud** | 2023.0.0 | Microservices support |
| **Maven** | 3.x | Build tool |

### AI/ML & RAG

- **Google Gemini API** - Constitutional AI debates, explainability
- **LangChain** - RAG orchestration framework
- **FAISS** - Vector similarity search
- **Sentence Transformers** - Document embeddings (all-MiniLM-L6-v2)
- **ChromaDB** - Alternative vector store

### DevOps

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Git** - Version control

---

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm/pnpm
- **Python** 3.13+
- **Java** 17+ (optional, for Spring Boot backend)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/fromjyce/VISTA.git
cd VISTA
```

### 2. Frontend Setup

```bash
cd Frontend
npm install
# or
pnpm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Frontend will be available at: **http://localhost:3000**

### 3. Python Backend Setup

```bash
cd py_backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\Activate.ps1
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
# Create .env file with:
# GEMINI_API_KEY=your_api_key_here
# HOST=localhost
# PORT=8000

# Run the server
uvicorn main:app --reload
```

Backend API will be available at: **http://localhost:8000**  
API Documentation: **http://localhost:8000/docs**

### 4. Java Backend Setup (Optional)

```bash
cd vista-backend

# Build with Maven
mvn clean install

# Run gateway service
cd gateway
mvn spring-boot:run
```

### 5. RAG Model Setup 

```bash
cd RAG_MODEL

# Install dependencies
pip install -r requirements.txt

# Configure vector store and embeddings
# Edit config.py for custom settings

# Initialize vector store
python -m vectorstore.init

# Start RAG service (if standalone)
python -m chain.serve
```

### 6. Environment Variables

Create a `.env` file in `py_backend/`:

```env
# AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
HOST=localhost
PORT=8000
DEBUG=true

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# Database
DATABASE_URL=sqlite:///./vista.db

# Optional: Redis for event bus
REDIS_URL=redis://localhost:6379
```

---

## Project Structure

```
VISTA/
├── Frontend/                    # Next.js Frontend
│   ├── app/                    # App Router pages
│   │   ├── page.tsx           # Landing page
│   │   ├── dashboard/         # Dashboard page
│   │   ├── watcher/           # Regulatory Watcher page
│   │   ├── compliance/        # Compliance Loop page
│   │   ├── ask/               # Ask Regulator chatbot
│   │   └── export/            # Evidence Export page
│   ├── components/            # React components
│   │   ├── sidebar.tsx        # Navigation sidebar
│   │   └── ui/                # shadcn/ui components
│   ├── lib/                   # Utilities
│   │   ├── store.ts           # Zustand state management
│   │   └── utils.ts           # Helper functions
│   ├── mockdata/              # Sample data
│   ├── public/                # Static assets
│   └── package.json
│
├── py_backend/                 # Python FastAPI Backend
│   ├── main.py                # FastAPI entry point
│   ├── config.py              # Configuration
│   ├── agents/                # AI Agents
│   │   ├── watcher.py         # Regulatory Watcher Agent
│   │   ├── monitor.py         # Compliance Monitor Agent
│   │   └── base.py            # Base agent class
│   ├── ai/                    # AI/LLM integration
│   │   ├── gemini.py          # Google Gemini client
│   │   ├── debate.py          # Constitutional AI debate
│   │   └── prompts.py         # Prompt templates
│   ├── api/                   # API routes
│   │   └── routes/            # Endpoint handlers
│   ├── database/              # Database layer
│   │   ├── db.py              # SQLite async client
│   │   ├── models.py          # Data models
│   │   └── schema.sql         # Database schema
│   ├── detection/             # Compliance detection
│   │   ├── pipeline.py        # Detection pipeline
│   │   ├── patterns.py        # Regex patterns (PAN, Aadhaar, etc.)
│   │   └── validators.py      # Validation logic
│   ├── events/                # Event bus
│   │   ├── bus.py             # Event dispatcher
│   │   └── types.py           # Event types
│   ├── xai/                   # Explainable AI
│   │   ├── tracer.py          # Decision tracing
│   │   └── export.py          # Evidence export
│   ├── rag_code/              # RAG for chatbot
│   │   ├── chain.py           # RAG chain
│   │   ├── vector_store.py    # Vector database
│   │   └── retriever.py       # Document retrieval
│   ├── requirements.txt       # Python dependencies
│   └── vista.db               # SQLite database
│
├── vista-backend/              # Java Spring Boot Backend (Optional)
│   ├── gateway/               # API Gateway
│   ├── compliance-core/       # Core compliance services
│   │   ├── control-library/   # Control definitions
│   │   ├── compliance-state/  # State management
│   │   ├── evidence-service/  # Evidence generation
│   │   └── audit-ledger/      # Audit logging
│   └── pom.xml
│
├── RAG_MODEL/                  # RAG & LLM Integration
│   ├── llm/                   # LLM providers (Gemini, OpenAI)
│   ├── chain/                 # LangChain orchestration
│   ├── retrieval/             # Document retrieval logic
│   ├── vectorstore/           # FAISS/ChromaDB vector stores
│   ├── embeddings/            # Sentence transformers
│   ├── documents/             # Document loaders & processors
│   ├── scraper/               # Web scraping for regulations
│   ├── data/                  # Regulations & vector indices
│   ├── config.py              # RAG configuration
│   └── requirements.txt       # RAG dependencies
│
├── docker/                     # Docker configuration
│   └── Dockerfile.gateway
├── docker-compose.yml          # Multi-container setup
├── deliverables/               # Hackathon deliverables
├── design/                     # Design documents
├── README.md                   # Original README
├── FINAL_README.md            # This file
└── LICENSE
```

---

## AI Agents

### 1. Watcher Agent

**Purpose:** Monitors regulatory feeds for changes  
**Trigger:** Scheduled (every 6 hours)  
**AI Used:** None (RSS polling)

**Sources Monitored:**
- PCI SSC (Payment Card Industry Security Standards Council)
- EUR-Lex (GDPR updates)
- FinCEN (AML/BSA guidance)
- RBI (Reserve Bank of India)
- NPCI (National Payments Corporation of India)

**Output:** `regulation.updated` event

### 2. Interpreter Agent

**Purpose:** Interprets regulations using Constitutional AI debate  
**Trigger:** On `regulation.updated` event  
**AI Used:** Google Gemini (safe, explainable)

**Process:**
1. **Proposer** suggests interpretation
2. **Critic** challenges assumptions
3. **Judge** synthesizes final ruling

**Output:** `controls.updated` event with new compliance rules

### 3. Monitor Agent

**Purpose:** Scans data for PCI/PII violations  
**Trigger:** On `controls.updated` or new data ingestion  
**AI Used:** None (deterministic regex + Luhn algorithm)

**Detection Patterns:**
- Credit card numbers (PAN) - Luhn validation
- Aadhaar numbers (12-digit UIDAI)
- PAN cards (10-character alphanumeric)
- UPI VPAs (virtual payment addresses)
- Mobile numbers (unmasked)

**Output:** `violation.detected` event

### 4. Remediator Agent

**Purpose:** Masks sensitive data and generates evidence  
**Trigger:** On `violation.detected` event  
**AI Used:** Google Gemini (for XAI explanations only)

**Actions:**
1. Mask sensitive data (e.g., `4532********1234`)
2. Log decision with reasoning
3. Generate evidence package (JSON/PDF)
4. Push rules to Visa Risk Manager (simulated)

**Output:** `evidence.generated` event

### 5. Learner Agent

**Purpose:** Improves detection accuracy from feedback  
**Trigger:** On `evidence.generated` event  
**AI Used:** Feedback loop + model fine-tuning

**Metrics Tracked:**
- Detection accuracy
- False positive rate
- Remediation success rate
- Compliance score trend

---

## RAG Model

The RAG (Retrieval-Augmented Generation) model powers the "Ask The Regulator" chatbot and provides intelligent compliance guidance.

### Components

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **LLM Providers** | Google Gemini, OpenAI | Natural language understanding |
| **Embeddings** | Sentence Transformers (all-MiniLM-L6-v2) | Document vectorization |
| **Vector Store** | FAISS, ChromaDB | Similarity search |
| **Orchestration** | LangChain | RAG pipeline management |
| **Document Processing** | PyPDF, Unstructured, BeautifulSoup | Regulation parsing |
| **Web Scraping** | Selenium, Playwright | Live regulatory feed scraping |

### Configuration

Key settings in `RAG_MODEL/config.py`:
- **Embedding Model:** `sentence-transformers/all-MiniLM-L6-v2` (384 dimensions)
- **Chunk Size:** 512 tokens with 50 token overlap
- **Vector Store:** FAISS with cosine similarity
- **LLM:** Google Gemini with temperature 0.7

### Data Sources

Regulatory documents from:
- PCI DSS standards
- GDPR/CCPA regulations
- RBI circulars
- NPCI guidelines
- FinCEN guidance

---

## API Documentation

### Base URL

```
http://localhost:8000
```

### Key Endpoints

#### Compliance Sources

```http
GET /api/sources
```

Returns all monitored regulatory sources.

#### AI Debates

```http
GET /api/debates
POST /api/debates/{id}/approve
POST /api/debates/{id}/reject
```

Manage AI Constitutional Debate outcomes.

#### Findings

```http
GET /api/findings
GET /api/findings/{id}
POST /api/findings/{id}/fix
```

View and remediate compliance violations.

#### Scan Data

```http
POST /api/scan
```

Manually trigger compliance scan on data.

**Request Body:**
```json
{
  "source": "customer_chat",
  "data": "Customer PAN: ABCDE1234F, Card: 4532123456781234"
}
```

#### Statistics

```http
GET /api/stats
```

Returns dashboard statistics.

#### WebSocket (Real-time Traces)

```
ws://localhost:8000/ws/traces
```

Streams live XAI reasoning traces.

---



