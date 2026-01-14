# ComplianceGuard AI v2.0 - Fixed Solution Documentation

## Agentic AI-Enabled Continuous PCI/PII Compliance Platform

**Track:** RegTech | FinTech | Agentic AI | Generative AI | Risk & Compliance Automation

**Hackathon:** VISA x Shaastra 2026 - 24 Hour AI Hackathon

---

## LOOPHOLES IDENTIFIED & FIXED

| # | Loophole in v1 | PS4 Requirement | Fix in v2 |
|---|----------------|-----------------|-----------|
| 1 | No "update control libraries" mechanism | Task 4.3: "update control libraries" | Added **Control Library Manager** with version control |
| 2 | Weak adaptive behavior | "adapt behavior based on real-time environmental feedback" | Added **Adaptive Learning Engine** with feedback loops |
| 3 | No Visa API integration | VISA Hackathon requirement | Added **Visa Risk Manager (VRM)** + **VCTC** integration |
| 4 | Pre-coded dashboards, not "AI-generated" | Task 4.2: "AI-generated dashboards" | Added **Dynamic Dashboard Generator** using LLM |
| 5 | No predictive behavioral insights | Task 3.2: "predictive behavioral insights" | Added **Predictive Analytics Module** |
| 6 | No marketing/communications monitoring | Task 3.1: "marketing content, communications" | Added **Communications Scanner** |
| 7 | Static PDF ingestion only | Task 1.3: "autonomously scanning regulatory changes" | Added **Regulatory Feed Monitor** (RSS/webhooks) |
| 8 | Orchestrated agents (supervisor routes) | True autonomy requires self-triggering | Added **Autonomous Compliance Loop** |
| 9 | No visible reasoning traces | Judges need to see AI thinking | Added **Live Reasoning Panel** |
| 10 | No AML domain coverage | Task 1.1: "AML...domains" | Added **AML Rules Engine** |
| 11 | No "conflicting controls" detection | Task 2.2: "identify conflicting or outdated controls" | Added **Control Conflict Analyzer** |
| 12 | No systemic risk detection | Task 3.3: "identify systemic risks" | Added **Systemic Risk Correlator** |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [PS4 Requirements - Word-for-Word Mapping](#2-ps4-requirements---word-for-word-mapping)
3. [Core Innovation: Autonomous Compliance Loop](#3-core-innovation-autonomous-compliance-loop)
4. [System Architecture](#4-system-architecture)
5. [Agent Architecture - Self-Triggering Design](#5-agent-architecture---self-triggering-design)
6. [Module Specifications](#6-module-specifications)
7. [Visa API Integration](#7-visa-api-integration)
8. [Live Reasoning Traces](#8-live-reasoning-traces)
9. [Technology Stack](#9-technology-stack)
10. [References](#10-references)

---

## 1. Executive Summary

### Solution Name: ComplianceGuard AI v2.0

### One-Line Description

> A **truly autonomous** agentic AI platform where self-triggering agents form a **continuous compliance loop**—detecting regulatory changes, scanning data, updating control libraries, and generating evidence—all without human intervention.

### Key Differentiators (vs v1)

```
v1 (ORCHESTRATED)                    v2 (AUTONOMOUS)
━━━━━━━━━━━━━━━━━━                   ━━━━━━━━━━━━━━━━━━

User triggers scan                   Regulatory change detected (RSS)
       │                                    │
       ▼                                    ▼ (auto-trigger)
Supervisor routes                    Interpreter re-interprets
       │                                    │
       ▼                                    ▼ (auto-trigger)
Monitor scans                        Monitor re-scans affected data
       │                                    │
       ▼                                    ▼ (auto-trigger)
Remediator fixes                     Control Library auto-updated
       │                                    │
       ▼                                    ▼ (auto-trigger)
Report generated                     Evidence package auto-generated
                                            │
                                            ▼ (auto-trigger)
                                     Visa VRM rules auto-pushed
```

---

## 2. PS4 Requirements - Word-for-Word Mapping

### Objective Statement Mapping

| PS4 Objective Phrase | Our Solution |
|---------------------|--------------|
| "agentic AI-powered compliance platform" | LangGraph multi-agent system with 5 specialized agents |
| "autonomous, agent-based systems" | Self-triggering agents with event-driven architecture |
| "make decisions" | Constitutional AI Debate Chamber for interpretation decisions |
| "plan tasks" | Task Planner sub-module decomposes compliance goals |
| "operate independently" | Autonomous Compliance Loop runs 24/7 without human triggers |
| "without constant human supervision" | Human-in-loop only for HIGH_RISK decisions (>$100K impact) |
| "pursue long-term compliance goals" | Goal-Oriented Agent with quarterly compliance targets |
| "break down complex regulatory objectives into manageable steps" | Hierarchical Task Network (HTN) planner |
| "access multiple data sources" | Unified Data Connector for DB, Files, APIs, Logs, Communications |
| "adapt its behavior based on real-time regulatory updates" | Regulatory Feed Monitor + Adaptive Learning Engine |
| "adapt its behavior based on...operational feedback" | Feedback Ingestion Loop + Model Fine-tuning Pipeline |

---

### Task 1: Regulatory Discovery and Interpretation

| Sub-Requirement | Exact PS4 Words | Solution Component | How It Works |
|-----------------|-----------------|-------------------|--------------|
| **1.1** | "Identify publicly available regulatory updates, rulebooks, and supervisory guidance across **finance, conduct, AML, and data privacy** domains" | **Regulatory Feed Monitor** | RSS feeds from: PCISSC, EUR-Lex, FinCEN, FCA, RBI. Covers: PCI DSS 4.0, GDPR, CCPA, LGPD, AML/BSA, FCA Conduct Rules |
| **1.2** | "Analyze document structures, **obligations, definitions, and required controls**" | **Document Analyzer** + **Obligation Extractor** | NLP pipeline extracts: (1) OBLIGATION: "must encrypt", (2) DEFINITION: "PAN means...", (3) CONTROL: "AES-256 encryption" |
| **1.3** | "Configure agents capable of **autonomously scanning, parsing, and summarizing** regulatory changes" | **Regulatory Watcher Agent** | Polling interval: 6 hours. Auto-parses new docs, summarizes via LLM, triggers downstream agents |

#### Regulatory Feed Sources

```
REGULATORY FEED MONITOR
━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────────────────┐
│                         LIVE FEED SOURCES                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  DATA PRIVACY                          FINANCIAL CONDUCT                │
│  ┌─────────────────────┐               ┌─────────────────────┐          │
│  │ GDPR Updates        │               │ FCA Handbook        │          │
│  │ (EUR-Lex RSS)       │               │ (fca.org.uk/rss)    │          │
│  ├─────────────────────┤               ├─────────────────────┤          │
│  │ CCPA/CPRA Updates   │               │ SEC Guidance        │          │
│  │ (oag.ca.gov)        │               │ (sec.gov/rss)       │          │
│  ├─────────────────────┤               ├─────────────────────┤          │
│  │ LGPD Updates        │               │ RBI Circulars       │          │
│  │ (gov.br webhooks)   │               │ (rbi.org.in)        │          │
│  └─────────────────────┘               └─────────────────────┘          │
│                                                                         │
│  PCI/PAYMENT SECURITY                  AML/CFT                          │
│  ┌─────────────────────┐               ┌─────────────────────┐          │
│  │ PCI SSC Updates     │               │ FinCEN Advisories   │          │
│  │ (pcissc.org)        │               │ (fincen.gov/rss)    │          │
│  ├─────────────────────┤               ├─────────────────────┤          │
│  │ Card Scheme         │               │ FATF Guidance       │          │
│  │ Bulletins           │               │ (fatf-gafi.org)     │          │
│  └─────────────────────┘               └─────────────────────┘          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   CHANGE DETECTION ENGINE     │
                    │                               │
                    │  • Hash comparison (SHA-256)  │
                    │  • Semantic diff (embeddings) │
                    │  • Impact classification      │
                    │                               │
                    └───────────────────────────────┘
                                    │
                                    ▼ (AUTO-TRIGGER)
                    ┌───────────────────────────────┐
                    │   INTERPRETER AGENT           │
                    │   (Re-analyze affected regs)  │
                    └───────────────────────────────┘
```

---

### Task 2: Agentic Compliance Processing Strategy

| Sub-Requirement | Exact PS4 Words | Solution Component | How It Works |
|-----------------|-----------------|-------------------|--------------|
| **2.1** | "Design an approach using **autonomous agents, RAG pipelines, AI orchestration layers, and large language models**" | **LangGraph** + **FAISS RAG** + **GPT-4o** | LangGraph for cyclic agent flows, FAISS for regulatory retrieval, GPT-4o for complex reasoning |
| **2.2** | "Equip agents to interpret regulations, **map them to internal policies**, and identify **conflicting or outdated controls**" | **Policy Mapper** + **Control Conflict Analyzer** | Maps regulations → policies → controls. Detects: (1) Missing controls, (2) Outdated controls, (3) Conflicting controls |
| **2.3** | "Ensure that agents can **independently operate tools** (e.g., search APIs, document repositories, workflow systems) to perform **multi-step reasoning and planning**" | **Tool Registry** + **HTN Planner** | Agents have tool access: RAG Search, DB Query, File Scan, Visa API, Jira/ServiceNow. HTN breaks goals into sub-tasks |

#### Control Conflict Detection

```
CONTROL CONFLICT ANALYZER
━━━━━━━━━━━━━━━━━━━━━━━━━

Input: New regulation interpreted + Existing control library

Detection Types:

1. MISSING CONTROL
   ┌─────────────────────────────────────────────────────────────┐
   │ Regulation: PCI DSS 4.0 Req 3.4.1                           │
   │ Requires: "Render PAN unreadable using cryptography"        │
   │                                                             │
   │ Control Library Check:                                      │
   │ ❌ No control found for "PAN encryption at rest"            │
   │                                                             │
   │ → AUTO-ACTION: Add control CTL-2025-001 to library          │
   └─────────────────────────────────────────────────────────────┘

2. OUTDATED CONTROL
   ┌─────────────────────────────────────────────────────────────┐
   │ Existing Control: CTL-2020-015                              │
   │ States: "Use TLS 1.0 for data in transit"                   │
   │                                                             │
   │ New Requirement: PCI DSS 4.0 Req 4.2.1                      │
   │ States: "Use TLS 1.2 or higher"                             │
   │                                                             │
   │ → AUTO-ACTION: Deprecate CTL-2020-015, add CTL-2025-002     │
   └─────────────────────────────────────────────────────────────┘

3. CONFLICTING CONTROLS
   ┌─────────────────────────────────────────────────────────────┐
   │ Control A (GDPR): CTL-2023-010                              │
   │ States: "Delete customer data after 30 days"                │
   │                                                             │
   │ Control B (AML): CTL-2023-020                               │
   │ States: "Retain transaction records for 5 years"            │
   │                                                             │
   │ CONFLICT DETECTED: Retention period contradiction           │
   │                                                             │
   │ → AUTO-ACTION: Create CTL-2025-003 with resolution:         │
   │   "Retain transaction records 5 years, delete non-AML       │
   │    customer PII after 30 days with data minimization"       │
   └─────────────────────────────────────────────────────────────┘
```

---

### Task 3: Continuous Monitoring, Insights, and Risk Detection

| Sub-Requirement | Exact PS4 Words | Solution Component | How It Works |
|-----------------|-----------------|-------------------|--------------|
| **3.1** | "Deploy agents to monitor **transactional data, marketing content, communications, and operational logs** in real time" | **Unified Data Scanner** | Scans: (1) Databases, (2) Files, (3) Emails/Chat via API, (4) Marketing PDFs/HTML, (5) Application logs |
| **3.2** | "Generate **proactive alerts, anomaly detections, compliance risk heatmaps, and predictive behavioral insights**" | **Alert Engine** + **Anomaly Detector** + **Predictive Analytics Module** | ML-based anomaly detection, risk heatmaps, behavioral prediction using historical patterns |
| **3.3** | "Enable **cross analysis across multiple regulatory domains** to identify **systemic risks or overlapping obligations**" | **Systemic Risk Correlator** + **Cross-Reg Mapper** | Correlates findings across PCI+GDPR+AML, identifies systemic patterns |

#### Communications & Marketing Content Scanner

```
COMMUNICATIONS SCANNER (NEW IN v2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Data Sources:
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  INTERNAL COMMUNICATIONS              MARKETING CONTENT                 │
│  ┌─────────────────────┐               ┌─────────────────────┐          │
│  │ Email (O365 API)    │               │ Website HTML        │          │
│  │ • Customer emails   │               │ • Privacy policy    │          │
│  │ • Support tickets   │               │ • Terms of service  │          │
│  ├─────────────────────┤               ├─────────────────────┤          │
│  │ Chat (Slack API)    │               │ Marketing PDFs      │          │
│  │ • #support channel  │               │ • Brochures         │          │
│  │ • Customer DMs      │               │ • Product sheets    │          │
│  ├─────────────────────┤               ├─────────────────────┤          │
│  │ Call Transcripts    │               │ Social Media        │          │
│  │ (Whisper STT)       │               │ • Posts, Ads        │          │
│  └─────────────────────┘               └─────────────────────┘          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       COMPLIANCE CHECKS                                  │
│                                                                         │
│  1. PII Exposure Check                                                  │
│     • Credit card numbers in emails                                     │
│     • SSN in support tickets                                            │
│     • Customer addresses shared externally                              │
│                                                                         │
│  2. Marketing Compliance                                                │
│     • GDPR consent language present?                                    │
│     • "Unsubscribe" link in marketing emails?                           │
│     • Accurate benefit claims? (no misleading)                          │
│                                                                         │
│  3. Conduct Risk                                                        │
│     • Inappropriate advice detection                                    │
│     • Unauthorized promises to customers                                │
│     • Discriminatory language detection                                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Predictive Behavioral Insights

```
PREDICTIVE ANALYTICS MODULE (NEW IN v2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Purpose: Predict compliance risks BEFORE they materialize

Model Architecture:
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  INPUT FEATURES                        PREDICTION TARGETS               │
│  ┌─────────────────────┐               ┌─────────────────────┐          │
│  │ Historical findings │               │ Risk Score (7 days) │          │
│  │ per data source     │──────────────▶│ Probability: 0-1    │          │
│  ├─────────────────────┤               ├─────────────────────┤          │
│  │ Regulatory change   │               │ Likely Violations   │          │
│  │ velocity            │──────────────▶│ [PCI_3.4, GDPR_32]  │          │
│  ├─────────────────────┤               ├─────────────────────┤          │
│  │ Remediation time    │               │ Remediation Effort  │          │
│  │ patterns            │──────────────▶│ Hours: estimate     │          │
│  ├─────────────────────┤               ├─────────────────────┤          │
│  │ Data growth rate    │               │ Capacity Alert      │          │
│  │                     │──────────────▶│ "Scan backlog in 3d"│          │
│  └─────────────────────┘               └─────────────────────┘          │
│                                                                         │
│  Model: XGBoost Classifier + Time Series (Prophet)                      │
│  Training: Historical compliance data (6 months)                        │
│  Retraining: Weekly with new findings data                              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

Example Prediction Output:
{
  "prediction_id": "PRED-2025-0042",
  "generated_at": "2025-01-04T10:00:00Z",
  "predictions": [
    {
      "data_source": "customer_support_emails",
      "risk_score_7d": 0.78,
      "likely_violations": ["GDPR_Art32", "PCI_DSS_3.4.1"],
      "reasoning": "Support ticket volume increased 40%. Historical pattern
                   shows PII exposure follows within 5 days.",
      "recommended_action": "Increase scan frequency to 2x/day"
    }
  ]
}
```

---

### Task 4: Interactive, Autonomous Compliance Assurance Platform

| Sub-Requirement | Exact PS4 Words | Solution Component | How It Works |
|-----------------|-----------------|-------------------|--------------|
| **4.1** | "Build an intelligent compliance assistant that allows **SMEs, auditors, and regulators** to query compliance findings in **natural language**" | **Compliance Chat Assistant** | RAG-powered chat with role-based responses (SME gets technical, auditor gets evidence, regulator gets formal) |
| **4.2** | "Create **dynamic, AI-generated dashboards** that visualize compliance posture, regulatory mappings, agent-driven tasks, and remediation progress" | **Dynamic Dashboard Generator** | LLM generates Plotly code based on user query. Dashboards are CREATED at runtime, not pre-coded |
| **4.3** | "Ensure agents can autonomously **create evidence packages, update control libraries, and recommend corrective actions**—adapting behavior based on **real-time environmental feedback**" | **Evidence Generator** + **Control Library Manager** + **Adaptive Learning Engine** | Full autonomous loop with feedback ingestion |

#### Dynamic Dashboard Generator (AI-Generated)

```
DYNAMIC DASHBOARD GENERATOR (NEW IN v2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Problem with v1: Dashboards were pre-coded in Streamlit. PS4 says "AI-generated".

Solution: LLM generates visualization code at runtime based on user request.

Flow:
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  User Request: "Show me a heatmap of PCI violations by department"      │
│                                                                         │
│                                    │                                    │
│                                    ▼                                    │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    DASHBOARD GENERATOR AGENT                     │   │
│  │                                                                  │   │
│  │  1. Parse user intent                                            │   │
│  │  2. Query findings database                                      │   │
│  │  3. Generate Plotly code via LLM                                 │   │
│  │  4. Execute code safely (sandboxed)                              │   │
│  │  5. Return visualization                                         │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                    │                                    │
│                                    ▼                                    │
│  Generated Code (by LLM):                                               │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  import plotly.express as px                                     │   │
│  │  data = query_findings(regulation="PCI_DSS", group_by="dept")    │   │
│  │  fig = px.imshow(data.pivot("dept","req","count"),               │   │
│  │                  color_continuous_scale="Reds",                  │   │
│  │                  title="PCI Violations by Department")           │   │
│  │  return fig                                                      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                    │                                    │
│                                    ▼                                    │
│  Rendered Dashboard (truly AI-generated, not pre-coded)                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Control Library Manager (Auto-Update)

```
CONTROL LIBRARY MANAGER (NEW IN v2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Purpose: Agents autonomously ADD, UPDATE, DEPRECATE controls

Control Library Schema:
{
  "control_id": "CTL-2025-001",
  "version": 1,
  "status": "active",  // active | deprecated | draft
  "created_by": "interpreter_agent",
  "created_at": "2025-01-04T10:30:00Z",

  "regulation_source": {
    "regulation": "PCI DSS 4.0",
    "requirement": "3.4.1",
    "text": "Render PAN unreadable anywhere it is stored"
  },

  "control_specification": {
    "name": "PAN Encryption at Rest",
    "description": "All PAN data must be encrypted using AES-256",
    "implementation": "Database column encryption + file encryption",
    "verification_method": "Scan for unencrypted PAN patterns"
  },

  "lifecycle": {
    "effective_date": "2025-01-04",
    "review_date": "2025-04-04",
    "deprecated_date": null,
    "superseded_by": null
  },

  "audit_trail": [
    {
      "action": "created",
      "agent": "interpreter_agent",
      "timestamp": "2025-01-04T10:30:00Z",
      "reasoning": "New PCI DSS 4.0 requirement detected via RSS feed"
    }
  ]
}

Auto-Update Triggers:
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  TRIGGER                           ACTION                               │
│  ━━━━━━━                           ━━━━━━                               │
│                                                                         │
│  New regulation detected    ──▶    CREATE new control (draft)           │
│                                    ──▶ Constitutional AI validates      │
│                                    ──▶ Promote to active                │
│                                                                         │
│  Regulation updated         ──▶    UPDATE existing control version      │
│                                    ──▶ Increment version number         │
│                                    ──▶ Log change in audit_trail        │
│                                                                         │
│  Regulation repealed        ──▶    DEPRECATE control                    │
│                                    ──▶ Set deprecated_date              │
│                                    ──▶ Notify dependent policies        │
│                                                                         │
│  Conflict detected          ──▶    CREATE resolution control            │
│                                    ──▶ Link conflicting controls        │
│                                    ──▶ Flag for human review if HIGH    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Adaptive Learning Engine

```
ADAPTIVE LEARNING ENGINE (NEW IN v2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Purpose: Agents LEARN from feedback to improve over time

Feedback Sources:
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  1. FALSE POSITIVE FEEDBACK                                             │
│     User marks finding as "Not a violation"                             │
│     ──▶ Adjust detection confidence thresholds                          │
│     ──▶ Add to negative training examples                               │
│                                                                         │
│  2. REMEDIATION OUTCOME FEEDBACK                                        │
│     Remediation marked "successful" or "failed"                         │
│     ──▶ Update remediation recommendation ranking                       │
│     ──▶ Prioritize successful remediation types                         │
│                                                                         │
│  3. INTERPRETATION CORRECTION                                           │
│     Human corrects agent's regulation interpretation                    │
│     ──▶ Fine-tune interpretation prompts                                │
│     ──▶ Add to Constitutional AI training set                           │
│                                                                         │
│  4. SCAN RESULT VALIDATION                                              │
│     Auditor validates/invalidates scan findings                         │
│     ──▶ Adjust pattern matching rules                                   │
│     ──▶ Update NER model weights                                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

Adaptation Mechanism:
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  FEEDBACK                              ADAPTATION                       │
│     │                                                                   │
│     ▼                                                                   │
│  ┌─────────────────┐                                                    │
│  │ Feedback Store  │                                                    │
│  │ (SQLite)        │                                                    │
│  └────────┬────────┘                                                    │
│           │                                                             │
│           ▼ (Batch: every 100 feedback items OR weekly)                 │
│  ┌─────────────────┐                                                    │
│  │ Learning Module │                                                    │
│  │                 │                                                    │
│  │ • Analyze       │                                                    │
│  │   feedback      │                                                    │
│  │   patterns      │                                                    │
│  │                 │                                                    │
│  │ • Update        │                                                    │
│  │   thresholds    │──────▶  Detection Engine (confidence thresholds)   │
│  │                 │                                                    │
│  │ • Refine        │                                                    │
│  │   prompts       │──────▶  Agent Prompts (few-shot examples)          │
│  │                 │                                                    │
│  │ • Retrain       │                                                    │
│  │   models        │──────▶  NER Model (entity weights)                 │
│  │                 │                                                    │
│  └─────────────────┘                                                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Core Innovation: Autonomous Compliance Loop

### The "Self-Triggering" Design

**Problem with v1:** Agents waited for Supervisor to route tasks. This is "orchestrated", not "autonomous".

**Solution in v2:** Agents trigger EACH OTHER based on events. No central scheduler needed.

```
AUTONOMOUS COMPLIANCE LOOP
━━━━━━━━━━━━━━━━━━━━━━━━━━

This loop runs CONTINUOUSLY (24/7) without human triggers.

                    ┌─────────────────────────────────────────┐
                    │         REGULATORY FEED MONITOR         │
                    │                                         │
                    │  Polls RSS feeds every 6 hours          │
                    │  Detects: "PCI DSS 4.0.1 update"        │
                    │                                         │
                    └────────────────┬────────────────────────┘
                                     │
                                     │ EVENT: new_regulation_detected
                                     │
                                     ▼
                    ┌─────────────────────────────────────────┐
                    │          INTERPRETER AGENT              │
                    │                                         │
                    │  TRIGGER: Receives new_regulation event │
                    │                                         │
                    │  ACTIONS:                               │
                    │  1. Parse regulatory document           │
                    │  2. Run Constitutional AI Debate        │
                    │  3. Extract new/updated obligations     │
                    │  4. Update Control Library              │
                    │                                         │
                    │  EMITS: obligations_updated event       │
                    │                                         │
                    └────────────────┬────────────────────────┘
                                     │
                                     │ EVENT: obligations_updated
                                     │
                                     ▼
                    ┌─────────────────────────────────────────┐
                    │            MONITOR AGENT                │
                    │                                         │
                    │  TRIGGER: Receives obligations_updated  │
                    │                                         │
                    │  ACTIONS:                               │
                    │  1. Identify affected data sources      │
                    │  2. Re-scan with updated rules          │
                    │  3. Generate new findings               │
                    │  4. Calculate updated risk scores       │
                    │                                         │
                    │  EMITS: findings_generated event        │
                    │                                         │
                    └────────────────┬────────────────────────┘
                                     │
                                     │ EVENT: findings_generated
                                     │
                                     ▼
                    ┌─────────────────────────────────────────┐
                    │           REMEDIATOR AGENT              │
                    │                                         │
                    │  TRIGGER: Receives findings_generated   │
                    │                                         │
                    │  ACTIONS:                               │
                    │  1. Generate remediation recommendations│
                    │  2. Create evidence package             │
                    │  3. Push rules to Visa VRM (if payment) │
                    │  4. Update compliance dashboard         │
                    │                                         │
                    │  EMITS: remediation_complete event      │
                    │                                         │
                    └────────────────┬────────────────────────┘
                                     │
                                     │ EVENT: remediation_complete
                                     │
                                     ▼
                    ┌─────────────────────────────────────────┐
                    │          LEARNING AGENT (NEW)           │
                    │                                         │
                    │  TRIGGER: Receives remediation_complete │
                    │                                         │
                    │  ACTIONS:                               │
                    │  1. Collect feedback metrics            │
                    │  2. Update prediction models            │
                    │  3. Adjust agent thresholds             │
                    │  4. Log learning cycle                  │
                    │                                         │
                    │  LOOP CONTINUES...                      │
                    │                                         │
                    └─────────────────────────────────────────┘


PARALLEL TRIGGERS (Can run simultaneously):

┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Regulatory     │     │   Scheduled      │     │   User Query     │
│   Feed Change    │     │   Scan (Daily)   │     │   (On-Demand)    │
└────────┬─────────┘     └────────┬─────────┘     └────────┬─────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────────────────────┐
                    │           EVENT BUS (Redis)             │
                    │                                         │
                    │  Routes events to appropriate agents    │
                    │  Ensures at-least-once delivery         │
                    │  Prevents duplicate processing          │
                    │                                         │
                    └─────────────────────────────────────────┘
```

---

## 4. System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                      ComplianceGuard AI v2.0 - System Architecture                   │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌────────────────────────────────────────────────────────────────────────────────┐ │
│  │                            PRESENTATION LAYER                                   │ │
│  │                                                                                 │ │
│  │   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐               │ │
│  │   │   Chat UI       │  │   Dynamic       │  │   Reasoning     │               │ │
│  │   │   (Role-Based)  │  │   Dashboards    │  │   Trace Panel   │               │ │
│  │   │                 │  │   (AI-Generated)│  │   (LIVE)        │               │ │
│  │   │ • SME View      │  │                 │  │                 │               │ │
│  │   │ • Auditor View  │  │ • Heatmaps      │  │ • Agent logs    │               │ │
│  │   │ • Regulator View│  │ • Trends        │  │ • Debate traces │               │ │
│  │   └─────────────────┘  └─────────────────┘  └─────────────────┘               │ │
│  │                                                                                 │ │
│  │                              STREAMLIT + WebSocket                              │ │
│  └────────────────────────────────────────────────────────────────────────────────┘ │
│                                          │                                          │
│                                          ▼                                          │
│  ┌────────────────────────────────────────────────────────────────────────────────┐ │
│  │                          EVENT-DRIVEN AGENT LAYER                               │ │
│  │                                                                                 │ │
│  │                         ┌─────────────────────┐                                 │ │
│  │                         │     EVENT BUS       │                                 │ │
│  │                         │      (Redis)        │                                 │ │
│  │                         └──────────┬──────────┘                                 │ │
│  │                                    │                                            │ │
│  │   ┌────────────────────────────────┼────────────────────────────────┐          │ │
│  │   │                                │                                │          │ │
│  │   ▼                                ▼                                ▼          │ │
│  │ ┌───────────────┐  ┌───────────────────────────┐  ┌───────────────┐           │ │
│  │ │  REGULATORY   │  │       INTERPRETER         │  │    MONITOR    │           │ │
│  │ │   WATCHER     │  │         AGENT             │  │     AGENT     │           │ │
│  │ │               │  │                           │  │               │           │ │
│  │ │ • RSS Polling │  │ ┌───────────────────────┐ │  │ • PII Scanner │           │ │
│  │ │ • Change Det. │  │ │ CONSTITUTIONAL AI     │ │  │ • PCI Scanner │           │ │
│  │ │ • Feed Parser │  │ │ DEBATE CHAMBER        │ │  │ • Comms Scan  │           │ │
│  │ │               │  │ │                       │ │  │ • Log Scanner │           │ │
│  │ └───────┬───────┘  │ │ Proposer → Critic →  │ │  │               │           │ │
│  │         │          │ │ Judge                 │ │  │ • NER Model   │           │ │
│  │         │          │ │                       │ │  │ • Validators  │           │ │
│  │         │          │ └───────────────────────┘ │  │               │           │ │
│  │         │          │                           │  └───────┬───────┘           │ │
│  │         │          │ • Obligation Extractor    │          │                   │ │
│  │         │          │ • Control Library Mgr     │          │                   │ │
│  │         │          │ • Conflict Analyzer       │          │                   │ │
│  │         │          └─────────────┬─────────────┘          │                   │ │
│  │         │                        │                        │                   │ │
│  │   ┌─────┴────────────────────────┼────────────────────────┴─────┐             │ │
│  │   │                              │                              │             │ │
│  │   ▼                              ▼                              ▼             │ │
│  │ ┌───────────────┐  ┌───────────────────────────┐  ┌───────────────┐           │ │
│  │ │  REMEDIATOR   │  │        LEARNING           │  │   DASHBOARD   │           │ │
│  │ │    AGENT      │  │         AGENT             │  │   GENERATOR   │           │ │
│  │ │               │  │                           │  │               │           │ │
│  │ │ • Fix Recs    │  │ • Feedback Ingestion      │  │ • Query Parse │           │ │
│  │ │ • Evidence Gen│  │ • Threshold Tuning        │  │ • Code Gen    │           │ │
│  │ │ • Visa VRM    │  │ • Prediction Update       │  │ • Render      │           │ │
│  │ │   Integration │  │ • Prompt Refinement       │  │               │           │ │
│  │ │               │  │                           │  │               │           │ │
│  │ └───────────────┘  └───────────────────────────┘  └───────────────┘           │ │
│  │                                                                                 │ │
│  │                               LangGraph Orchestration                           │ │
│  └────────────────────────────────────────────────────────────────────────────────┘ │
│                                          │                                          │
│                                          ▼                                          │
│  ┌────────────────────────────────────────────────────────────────────────────────┐ │
│  │                            CORE SERVICES LAYER                                  │ │
│  │                                                                                 │ │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐        │ │
│  │  │    RAG    │ │  Control  │ │ Findings  │ │  Audit    │ │ Predictive│        │ │
│  │  │  Pipeline │ │  Library  │ │   Store   │ │    Log    │ │ Analytics │        │ │
│  │  │  (FAISS)  │ │  (SQLite) │ │ (SQLite)  │ │ (Append)  │ │  (ML)     │        │ │
│  │  └───────────┘ └───────────┘ └───────────┘ └───────────┘ └───────────┘        │ │
│  │                                                                                 │ │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐                                    │ │
│  │  │    LLM    │ │  Feedback │ │   Visa    │                                    │ │
│  │  │  Gateway  │ │   Store   │ │    API    │                                    │ │
│  │  │ (GPT-4o)  │ │           │ │  Gateway  │                                    │ │
│  │  └───────────┘ └───────────┘ └───────────┘                                    │ │
│  │                                                                                 │ │
│  └────────────────────────────────────────────────────────────────────────────────┘ │
│                                          │                                          │
│                                          ▼                                          │
│  ┌────────────────────────────────────────────────────────────────────────────────┐ │
│  │                          DATA INTEGRATION LAYER                                 │ │
│  │                                                                                 │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                │ │
│  │  │   Regulatory    │  │   Enterprise    │  │  Communications │                │ │
│  │  │     Feeds       │  │      Data       │  │     Sources     │                │ │
│  │  │                 │  │                 │  │                 │                │ │
│  │  │ • PCI SSC RSS   │  │ • Databases     │  │ • O365 API      │                │ │
│  │  │ • EUR-Lex RSS   │  │ • File Systems  │  │ • Slack API     │                │ │
│  │  │ • FinCEN RSS    │  │ • Cloud Storage │  │ • Marketing CMS │                │ │
│  │  │ • FCA Updates   │  │ • App Logs      │  │ • Call Transcripts│              │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘                │ │
│  │                                                                                 │ │
│  └────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Agent Architecture - Self-Triggering Design

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                  ComplianceGuard AI v2.0 - Self-Triggering Agent Architecture        │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  EVENT FLOW (No Central Scheduler - Agents Trigger Each Other)                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                        │
│                                                                                      │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                         EVENT BUS (Redis Pub/Sub)                             │   │
│  │                                                                               │   │
│  │  Channels:                                                                    │   │
│  │  • regulatory_changes     • obligations_updated    • findings_generated       │   │
│  │  • remediation_complete   • feedback_received      • dashboard_requested      │   │
│  │                                                                               │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│       │              │              │              │              │                  │
│       │ SUBSCRIBE    │ SUBSCRIBE    │ SUBSCRIBE    │ SUBSCRIBE    │ SUBSCRIBE       │
│       ▼              ▼              ▼              ▼              ▼                  │
│                                                                                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │ REGULATORY │  │INTERPRETER │  │  MONITOR   │  │ REMEDIATOR │  │  LEARNING  │    │
│  │  WATCHER   │  │   AGENT    │  │   AGENT    │  │   AGENT    │  │   AGENT    │    │
│  │            │  │            │  │            │  │            │  │            │    │
│  │ Listens:   │  │ Listens:   │  │ Listens:   │  │ Listens:   │  │ Listens:   │    │
│  │ (timer)    │  │ regulatory │  │ obligations│  │ findings   │  │ remediation│    │
│  │            │  │ _changes   │  │ _updated   │  │ _generated │  │ _complete  │    │
│  │            │  │            │  │            │  │            │  │            │    │
│  │ Emits:     │  │ Emits:     │  │ Emits:     │  │ Emits:     │  │ Emits:     │    │
│  │ regulatory │  │ obligations│  │ findings   │  │ remediation│  │ thresholds │    │
│  │ _changes   │  │ _updated   │  │ _generated │  │ _complete  │  │ _updated   │    │
│  │            │  │            │  │            │  │            │  │            │    │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘  └────────────┘    │
│                                                                                      │
│                                                                                      │
│  AGENT INTERNALS                                                                     │
│  ━━━━━━━━━━━━━━━                                                                     │
│                                                                                      │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                         INTERPRETER AGENT                                     │   │
│  │                                                                               │   │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐ │   │
│  │  │                   CONSTITUTIONAL AI DEBATE CHAMBER                       │ │   │
│  │  │                                                                          │ │   │
│  │  │   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐          │ │   │
│  │  │   │   PROPOSER   │      │    CRITIC    │      │    JUDGE     │          │ │   │
│  │  │   │              │      │              │      │              │          │ │   │
│  │  │   │ "Draft       │ ───▶ │ "Challenge   │ ───▶ │ "Synthesize  │          │ │   │
│  │  │   │  conservative│      │  loopholes,  │      │  balanced    │          │ │   │
│  │  │   │  policy"     │      │  over-       │      │  policy"     │          │ │   │
│  │  │   │              │      │  restrictions│      │              │          │ │   │
│  │  │   │              │ ◀─── │  "           │ ◀─── │              │          │ │   │
│  │  │   │  (Iterate    │      │              │      │  (Max 3      │          │ │   │
│  │  │   │   if needed) │      │              │      │   rounds)    │          │ │   │
│  │  │   └──────────────┘      └──────────────┘      └──────────────┘          │ │   │
│  │  │                                                                          │ │   │
│  │  │   OUTPUT: Validated interpretation with reasoning trace                  │ │   │
│  │  │                                                                          │ │   │
│  │  └─────────────────────────────────────────────────────────────────────────┘ │   │
│  │                                                                               │   │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐ │   │
│  │  │                      CONTROL LIBRARY MANAGER                             │ │   │
│  │  │                                                                          │ │   │
│  │  │   Actions: CREATE | UPDATE | DEPRECATE | RESOLVE_CONFLICT                │ │   │
│  │  │                                                                          │ │   │
│  │  │   On CREATE:                                                             │ │   │
│  │  │   1. Generate control from obligation                                    │ │   │
│  │  │   2. Assign control_id (CTL-YYYY-NNN)                                    │ │   │
│  │  │   3. Set status = "draft"                                                │ │   │
│  │  │   4. Constitutional AI validates                                         │ │   │
│  │  │   5. If validated, status = "active"                                     │ │   │
│  │  │   6. Emit: control_created event                                         │ │   │
│  │  │                                                                          │ │   │
│  │  └─────────────────────────────────────────────────────────────────────────┘ │   │
│  │                                                                               │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                      │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                           MONITOR AGENT                                       │   │
│  │                                                                               │   │
│  │  Data Sources Supported:                                                      │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐             │   │
│  │  │ Databases   │ │ File Systems│ │ App Logs    │ │Communications│            │   │
│  │  │ (SQL)       │ │ (CSV, JSON) │ │ (txt, json) │ │ (Email,Chat)│            │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘             │   │
│  │                                                                               │   │
│  │  Detection Pipeline:                                                          │   │
│  │  ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐            │   │
│  │  │  Regex    │───▶│   NER     │───▶│ Validator │───▶│ Confidence│            │   │
│  │  │  Engine   │    │  Model    │    │  (Luhn)   │    │  Scorer   │            │   │
│  │  └───────────┘    └───────────┘    └───────────┘    └───────────┘            │   │
│  │                                                                               │   │
│  │  PII Types Detected:                                                          │   │
│  │  • Credit Card (PAN) • CVV • SSN • Email • Phone • Names • Addresses          │   │
│  │  • Bank Account • Passport • Driver License • Health ID                       │   │
│  │                                                                               │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                      │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                          REMEDIATOR AGENT                                     │   │
│  │                                                                               │   │
│  │  Remediation Actions:                                                         │   │
│  │  1. Generate fix recommendations (RAG-powered)                                │   │
│  │  2. Create evidence package (audit-ready)                                     │   │
│  │  3. Push rules to Visa VRM (for payment violations)                           │   │
│  │  4. Create Jira ticket (for workflow integration)                             │   │
│  │  5. Update compliance dashboard                                               │   │
│  │                                                                               │   │
│  │  Evidence Package Structure:                                                  │   │
│  │  evidence_package_YYYY-MM-DD/                                                 │   │
│  │  ├── manifest.json                                                            │   │
│  │  ├── executive_summary.md                                                     │   │
│  │  ├── requirement_X.X.X/                                                       │   │
│  │  │   ├── status.json                                                          │   │
│  │  │   ├── findings.json                                                        │   │
│  │  │   ├── remediation.md                                                       │   │
│  │  │   └── reasoning_trace.json  ◀── LIVE TRACE                                │   │
│  │  └── attestation.md                                                           │   │
│  │                                                                               │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Module Specifications

### Module 1: Regulatory Feed Monitor (NEW)

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Autonomously detect regulatory changes without human triggers |
| **Feed Sources** | PCI SSC, EUR-Lex, FinCEN, FCA, OAG-CA, FATF |
| **Polling Interval** | 6 hours |
| **Change Detection** | SHA-256 hash comparison + semantic embedding diff |
| **Output Event** | `regulatory_changes` → triggers Interpreter Agent |

### Module 2: Constitutional AI Debate Chamber

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Reduce hallucination through adversarial self-review |
| **Agents** | Proposer (conservative), Critic (adversarial), Judge (balanced) |
| **Max Rounds** | 3 iterations |
| **Output** | Validated interpretation + reasoning trace |
| **Confidence Metric** | Debate convergence score (0-1) |

### Module 3: Control Library Manager (NEW)

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Agents autonomously update control library |
| **Operations** | CREATE, UPDATE, DEPRECATE, RESOLVE_CONFLICT |
| **Version Control** | Incremental versioning with full audit trail |
| **Auto-Triggers** | New regulation → CREATE, Regulation updated → UPDATE |
| **Human Escalation** | Conflicts with >$100K impact flagged for review |

### Module 4: Unified Data Scanner

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Scan ALL data types mentioned in PS4 Task 3.1 |
| **Data Types** | Transactions, Marketing, Communications, Logs |
| **Connectors** | SQL, Files, O365, Slack, S3, REST APIs |
| **Detection** | Regex + NER + Validators + Confidence Scoring |

### Module 5: Predictive Analytics (NEW)

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Generate "predictive behavioral insights" (PS4 3.2) |
| **Model** | XGBoost + Prophet time series |
| **Predictions** | 7-day risk score, likely violations, capacity alerts |
| **Retraining** | Weekly with new findings data |

### Module 6: Dynamic Dashboard Generator (NEW)

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | "AI-generated dashboards" (not pre-coded) |
| **Mechanism** | LLM generates Plotly code from user query |
| **Execution** | Sandboxed Python execution |
| **Output** | Runtime-generated visualizations |

### Module 7: Adaptive Learning Engine (NEW)

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | "Adapt behavior based on real-time feedback" |
| **Feedback Sources** | False positives, remediation outcomes, interpretation corrections |
| **Adaptations** | Threshold tuning, prompt refinement, model retraining |
| **Batch Frequency** | Every 100 feedback items OR weekly |

---

## 7. Visa API Integration

### Why This Matters

This is a **VISA hackathon**. Integration with Visa APIs demonstrates:
1. Real-world applicability
2. Understanding of sponsor ecosystem
3. End-to-end compliance automation

### Visa Risk Manager (VRM) Integration

```
VISA RISK MANAGER INTEGRATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When ComplianceGuard detects a payment-related violation:

1. DETECTION
   Monitor Agent finds: "PAN exposed in transaction log"
   Regulation: PCI DSS 3.4.1

2. RULE GENERATION
   Remediator Agent generates VRM rule:
   {
     "rule_id": "VRM-CG-2025-001",
     "condition": "transaction.log.contains_pan == true",
     "action": "BLOCK",
     "alert_level": "HIGH"
   }

3. API CALL
   POST /visariskmanager/v1/rules
   Authorization: Bearer {visa_api_token}
   Body: {rule_json}

4. CONFIRMATION
   VRM rule deployed to Visa network
   Transactions matching rule will be flagged/blocked

Flow Diagram:
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  ComplianceGuard│     │   Visa API      │     │  Visa Network   │
│  Remediator     │────▶│   Gateway       │────▶│  (VRM Active)   │
│  Agent          │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Visa Transaction Controls (VCTC) Integration

```
VISA TRANSACTION CONTROLS INTEGRATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When user feedback is needed for data cleanup:

1. ANOMALY DETECTED
   Monitor Agent finds: "Merchant name 'XYZ123 Corp' is unclear"

2. VCTC NOTIFICATION
   Push notification to cardholder via VCTC:
   "We noticed a charge from 'XYZ123 Corp'. Is this correct?"

3. USER RESPONSE
   User confirms: "Yes, this is Starbucks"

4. DATA CLEANUP
   Learning Agent updates merchant mapping:
   XYZ123 Corp → Starbucks

This "human-in-the-loop" cleans data at the source.
```

---

## 8. Live Reasoning Traces

### Purpose

Judges need to SEE the AI thinking in real-time. This demonstrates true autonomy and transparency.

### Implementation

```
LIVE REASONING TRACE PANEL
━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────────────────┐
│                      LIVE AGENT REASONING                               │
│                      (WebSocket Real-Time Feed)                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  [10:30:15] REGULATORY_WATCHER                                          │
│  ├─ Polling EUR-Lex RSS feed...                                         │
│  ├─ Detected change: GDPR Amendment 2025/001                            │
│  └─ Emitting event: regulatory_changes                                  │
│                                                                         │
│  [10:30:16] INTERPRETER_AGENT                                           │
│  ├─ Received: regulatory_changes event                                  │
│  ├─ Loading document: GDPR_Amendment_2025_001.pdf                       │
│  ├─ Starting Constitutional AI Debate...                                │
│  │                                                                      │
│  │  ┌─ PROPOSER [10:30:17]                                              │
│  │  │  "New amendment requires explicit consent for biometric           │
│  │  │   data. Propose blocking ALL biometric collection until           │
│  │  │   consent mechanism implemented."                                 │
│  │  │                                                                   │
│  │  ├─ CRITIC [10:30:18]                                                │
│  │  │  "Over-restriction. Amendment allows 'legitimate interest'        │
│  │  │   exception for security purposes. Blocking ALL biometric         │
│  │  │   would disable fraud detection systems."                         │
│  │  │                                                                   │
│  │  └─ JUDGE [10:30:19]                                                 │
│  │     "RULING: Block consumer-facing biometric collection.             │
│  │      Allow internal fraud detection biometrics under                 │
│  │      legitimate interest with documentation requirement."            │
│  │                                                                      │
│  ├─ Debate converged in 1 round. Confidence: 0.94                       │
│  ├─ Updating Control Library...                                         │
│  │   - CREATE: CTL-2025-047 (Biometric Consent Control)                 │
│  │   - UPDATE: CTL-2023-015 (Fraud Detection - add documentation)       │
│  └─ Emitting event: obligations_updated                                 │
│                                                                         │
│  [10:30:20] MONITOR_AGENT                                               │
│  ├─ Received: obligations_updated event                                 │
│  ├─ Identifying affected data sources...                                │
│  ├─ Re-scanning: customer_biometrics_table                              │
│  ├─ Findings: 2 new violations detected                                 │
│  └─ Emitting event: findings_generated                                  │
│                                                                         │
│  [10:30:22] REMEDIATOR_AGENT                                            │
│  ├─ Received: findings_generated event                                  │
│  ├─ Generating remediation for finding F-2025-0089                      │
│  ├─ Creating evidence package...                                        │
│  ├─ Pushing rule to Visa VRM (biometric transaction flag)               │
│  └─ Dashboard updated. Compliance score: 94 → 91                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Technical Implementation

```
WebSocket Server (FastAPI):

@app.websocket("/ws/reasoning")
async def reasoning_websocket(websocket: WebSocket):
    await websocket.accept()

    # Subscribe to reasoning channel
    pubsub = redis.pubsub()
    pubsub.subscribe("agent_reasoning")

    for message in pubsub.listen():
        if message["type"] == "message":
            await websocket.send_json({
                "timestamp": datetime.now().isoformat(),
                "agent": message["data"]["agent"],
                "step": message["data"]["step"],
                "content": message["data"]["content"]
            })

Agent Logging (in each agent):

def log_reasoning(self, step: str, content: str):
    redis.publish("agent_reasoning", json.dumps({
        "agent": self.name,
        "step": step,
        "content": content
    }))
```

---

## 9. Technology Stack

### Core Stack

| Layer | Component | Technology | Purpose |
|-------|-----------|------------|---------|
| **Orchestration** | Agent Framework | LangGraph | Cyclic workflows, event-driven agents |
| **Event Bus** | Message Broker | Redis Pub/Sub | Agent-to-agent communication |
| **AI/ML** | LLM (Primary) | GPT-4o-mini | Cost-effective reasoning |
| **AI/ML** | LLM (Complex) | GPT-4o | Judge decisions, complex queries |
| **AI/ML** | Embeddings | sentence-transformers/all-MiniLM-L6-v2 | Vector embeddings |
| **AI/ML** | NER | spaCy (en_core_web_sm) | Named entity extraction |
| **AI/ML** | Prediction | XGBoost + Prophet | Behavioral predictions |
| **Storage** | Vector Store | FAISS | Similarity search |
| **Storage** | Control Library | SQLite | Version-controlled controls |
| **Storage** | Findings | SQLite | Scan results |
| **Storage** | Feedback | SQLite | Learning data |
| **Frontend** | Dashboard | Streamlit | Rapid UI |
| **Frontend** | Live Traces | WebSocket | Real-time reasoning |
| **Integration** | Visa APIs | REST | VRM, VCTC integration |

### Dependencies

```
# Core Framework
langchain>=0.1.0
langgraph>=0.0.20
langchain-openai>=0.0.5

# Event Bus
redis>=5.0.0

# Vector Store & Embeddings
faiss-cpu>=1.7.4
sentence-transformers>=2.2.2

# NLP
spacy>=3.7.0

# ML/Prediction
xgboost>=2.0.0
prophet>=1.1.0

# Web Framework
streamlit>=1.30.0
fastapi>=0.109.0
uvicorn>=0.27.0
websockets>=12.0

# Data Processing
pandas>=2.0.0
numpy>=1.24.0

# Document Processing
pypdf>=3.17.0
beautifulsoup4>=4.12.0
feedparser>=6.0.0  # RSS parsing

# Communication APIs
O365>=2.0.0  # Microsoft 365
slack-sdk>=3.0.0

# Utilities
python-dotenv>=1.0.0
pydantic>=2.5.0

# Visualization
plotly>=5.18.0
```

---

## 10. References

### Regulatory Sources

| Reference | URL | Domain |
|-----------|-----|--------|
| PCI Security Standards Council | https://www.pcisecuritystandards.org/ | PCI DSS |
| EUR-Lex | https://eur-lex.europa.eu/ | GDPR |
| California AG | https://oag.ca.gov/privacy/ccpa | CCPA |
| FinCEN | https://www.fincen.gov/ | AML/BSA |
| FCA Handbook | https://www.handbook.fca.org.uk/ | Conduct |
| FATF | https://www.fatf-gafi.org/ | AML |

### Technical References

| Reference | URL | Usage |
|-----------|-----|-------|
| LangGraph | https://langchain-ai.github.io/langgraph/ | Agent orchestration |
| Constitutional AI Paper | https://arxiv.org/abs/2212.08073 | Debate chamber design |
| Visa Developer Portal | https://developer.visa.com/ | API integration |
| Visa Risk Manager | https://developer.visa.com/capabilities/vrm | VRM API |

### Industry Statistics

| Statistic | Value | Source |
|-----------|-------|--------|
| Avg. data breach cost (financial) | $6.08M | IBM 2024 |
| Time to identify breach | 197 days | IBM 2024 |
| Compliance hours increase | 61% since 2020 | BPI Survey |
| RegTech market by 2035 | $115.5B | Globe Newswire |

---

## Summary: PS4 Requirements Coverage (v2 Fixed)

| PS4 Requirement | v1 Status | v2 Status | Solution Component |
|-----------------|-----------|-----------|-------------------|
| Autonomous regulatory interpretation | Partial | **FIXED** | Constitutional AI + RSS Feeds |
| Policy mapping and gap detection | Done | Done | Policy Mapper |
| Monitor transactional data | Done | Done | Unified Scanner |
| Monitor **marketing content** | **MISSING** | **FIXED** | Communications Scanner |
| Monitor **communications** | **MISSING** | **FIXED** | O365/Slack Integration |
| Monitor operational logs | Done | Done | Log Scanner |
| Proactive alerts | Done | Done | Alert Engine |
| Anomaly detections | Partial | Done | Anomaly Detector |
| Compliance risk heatmaps | Done | Done | Dashboard |
| **Predictive behavioral insights** | **MISSING** | **FIXED** | Predictive Analytics Module |
| Cross-regulatory analysis | Partial | Done | Systemic Risk Correlator |
| **Systemic risks** detection | **MISSING** | **FIXED** | Systemic Risk Correlator |
| NL query compliance findings | Done | Done | Chat Interface |
| **AI-generated dashboards** | **WEAK** | **FIXED** | Dynamic Dashboard Generator |
| Visualize agent-driven tasks | Partial | Done | Live Reasoning Panel |
| Remediation progress | Done | Done | Dashboard |
| **Create evidence packages** | Done | Done | Evidence Generator |
| **Update control libraries** | **MISSING** | **FIXED** | Control Library Manager |
| Recommend corrective actions | Done | Done | Remediator Agent |
| **Adapt based on real-time feedback** | **WEAK** | **FIXED** | Adaptive Learning Engine |
| **Visa API integration** | **MISSING** | **FIXED** | VRM + VCTC Integration |
| **Self-triggering agents** | **NO** | **FIXED** | Event Bus Architecture |
| **Live reasoning traces** | **NO** | **FIXED** | WebSocket Panel |

---

**Document Version:** 2.0 (Fixed)
**Last Updated:** January 4, 2025
**Prepared for:** VISA x Shaastra 2026 - 24 Hour AI Hackathon
