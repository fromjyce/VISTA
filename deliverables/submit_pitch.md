# ComplianceGuard AI

## Agentic AI-Enabled Continuous PCI/PII Compliance Platform

**Problem Statement 4** | VISA x Shaastra 2026 - 24 Hour AI Hackathon

---

## 1. Problem Statement

### The Compliance Crisis in Financial Services

Financial institutions operate under strict regulatory frameworks—PCI DSS for payment card security, GDPR for European data privacy, CCPA for California residents, and AML regulations for anti-money laundering. Non-compliance leads to massive fines, reputational damage, and security breaches.

**The core problem:** Traditional compliance is manual, reactive, and point-in-time. Teams read 400-page regulatory documents manually, conduct annual audits instead of continuous monitoring, and detect violations only after breaches occur.

### Industry Pain Points (Verified Statistics)

| Pain Point | Impact | Source |
|------------|--------|--------|
| Average data breach cost in financial sector | **$6.08 million** | IBM Cost of Data Breach Report 2024 |
| Mean time to identify a breach | **197 days** | IBM Cost of Data Breach Report 2024 |
| Increase in compliance hours since 2020 | **+61%** | Bank Policy Institute Survey 2024 |
| Total GDPR fines issued since 2018 | **$5.88 billion** | DLA Piper GDPR Fines Tracker 2025 |
| New requirements in PCI DSS 4.0 | **64 new controls** | PCI Security Standards Council |

### What PS4 Demands

PS4 requires an **"agentic AI-powered compliance platform built on autonomous, agent-based systems that can make decisions, plan tasks, and operate independently using tools and data, without constant human supervision."**

Key requirements include:
- Autonomous regulatory interpretation across GDPR, CCPA, LGPD, PCI DSS
- Agent-based monitoring of transactions, communications, and logs in real-time
- Natural language interaction with regulations and findings
- Dynamic risk dashboards and audit-ready evidence packages
- Agents that adapt behavior based on real-time feedback

---

## 2. Solution Overview

### Our Approach: Autonomous Compliance Loop

ComplianceGuard AI is a multi-agent system where specialized AI agents work together in a **continuous, self-triggering loop**. Unlike traditional orchestrated systems where a central controller routes tasks, our agents trigger each other automatically through an event-driven architecture.

When a new regulation is published, the system automatically:
1. **Detects** the change via RSS feed monitoring
2. **Interprets** it using a 3-agent debate chamber
3. **Scans** all company data for violations
4. **Generates** fixes and audit-ready evidence
5. **Learns** from feedback to improve accuracy

All of this happens **without any human clicking buttons**.

### The Autonomous Loop

```mermaid
flowchart LR
    subgraph Loop["AUTONOMOUS COMPLIANCE LOOP (24/7)"]
        A[WATCH<br/>Regulatory Feeds] -->|new regulation| B[INTERPRET<br/>AI Debate Chamber]
        B -->|obligations extracted| C[SCAN<br/>Data Sources]
        C -->|violations found| D[FIX<br/>Evidence + Remediation]
        D -->|cycle complete| E[LEARN<br/>Adapt Thresholds]
        E -->|improved models| A
    end
```

### Key Innovation: Constitutional AI Debate Chamber

Large Language Models can "hallucinate"—generating plausible-sounding but incorrect interpretations of regulations. In compliance, a hallucinated loophole could lead to millions in fines.

Our solution: **Three AI agents debate each interpretation before finalizing it.**

- **Proposer Agent:** Drafts a conservative, strict interpretation
- **Critic Agent:** Challenges the proposal, finds loopholes and over-restrictions
- **Judge Agent:** Synthesizes a balanced, practical policy from both perspectives

This adversarial self-review reduces hallucination and creates a defensible reasoning trace for auditors.

```mermaid
sequenceDiagram
    participant R as Regulation Text
    participant P as Proposer
    participant C as Critic
    participant J as Judge
    participant O as Final Policy

    R->>P: New PCI DSS requirement
    P->>P: Draft strict interpretation
    P->>C: "Block ALL unencrypted PAN storage"
    C->>C: Challenge proposal
    C->>J: "Too strict - breaks dev environment"
    J->>J: Synthesize balanced policy
    J->>O: "Block production, 7-day grace for dev"

    Note over P,J: Confidence: 94%<br/>Reasoning trace saved
```

---

## 3. System Architecture

### Five-Layer Architecture

Our system is organized into five distinct layers, each with specific responsibilities:

**Layer 1 - Interface:** User-facing components including the compliance dashboard, natural language chat interface, and live reasoning panel that shows AI decision-making in real-time.

**Layer 2 - Agents:** Five autonomous agents that communicate via Redis Pub/Sub events. Each agent subscribes to specific event types and publishes results that trigger downstream agents.

**Layer 3 - AI Services:** Core AI capabilities including the RAG pipeline for regulatory Q&A, LLM gateway for reasoning, and NER models for entity detection.

**Layer 4 - Storage:** Persistent storage for the control library (with version control), findings store, and immutable audit logs.

**Layer 5 - Data & External:** Integration with regulatory feeds, enterprise data sources, and Visa APIs for rule deployment.

```mermaid
flowchart TB
    subgraph L1["LAYER 1: INTERFACE"]
        UI[Streamlit Dashboard]
        Chat[RAG Chat Interface]
        Trace[Live Reasoning Panel]
    end

    subgraph L2["LAYER 2: AUTONOMOUS AGENTS"]
        EB((Redis<br/>Event Bus))
        RW[Regulatory Watcher]
        IA[Interpreter Agent]
        MA[Monitor Agent]
        RA[Remediator Agent]
        LA[Learning Agent]
    end

    subgraph L3["LAYER 3: AI SERVICES"]
        RAG[RAG Pipeline<br/>FAISS + MiniLM]
        LLM[LLM Gateway<br/>GPT-4o]
        NER[NER Engine<br/>spaCy]
        PRED[Prediction<br/>XGBoost]
    end

    subgraph L4["LAYER 4: STORAGE"]
        CL[(Control Library)]
        FS[(Findings Store)]
        AL[(Audit Log)]
    end

    subgraph L5["LAYER 5: DATA & EXTERNAL"]
        RF[Regulatory Feeds]
        DS[Data Sources]
        VISA[Visa APIs]
    end

    L1 <--> EB
    RW & IA & MA & RA & LA <--> EB
    L2 <--> L3
    L3 <--> L4
    L4 <--> L5
    RA --> VISA
```

---

## 4. Agent Architecture

### Self-Triggering Event Flow

The key differentiator of our architecture is that **agents trigger each other automatically** via events. There is no central scheduler or human-initiated workflow.

Each agent:
- **Subscribes** to specific event channels
- **Processes** incoming events autonomously
- **Publishes** results to trigger downstream agents

```mermaid
flowchart TD
    subgraph Triggers["TRIGGER SOURCES"]
        T1[Scheduled Poll<br/>Every 6 hours]
        T2[Webhook<br/>Real-time]
        T3[User Query<br/>On-demand]
    end

    subgraph Events["EVENT BUS (Redis Pub/Sub)"]
        E1[/new_regulation/]
        E2[/obligations_updated/]
        E3[/findings_generated/]
        E4[/remediation_complete/]
    end

    subgraph Agents["AUTONOMOUS AGENTS"]
        RW[REGULATORY WATCHER<br/>───────────────<br/>Subscribes: timer<br/>Publishes: new_regulation]
        IA[INTERPRETER AGENT<br/>───────────────<br/>Subscribes: new_regulation<br/>Publishes: obligations_updated]
        MA[MONITOR AGENT<br/>───────────────<br/>Subscribes: obligations_updated<br/>Publishes: findings_generated]
        RA[REMEDIATOR AGENT<br/>───────────────<br/>Subscribes: findings_generated<br/>Publishes: remediation_complete]
        LA[LEARNING AGENT<br/>───────────────<br/>Subscribes: remediation_complete<br/>Adapts thresholds]
    end

    T1 --> RW
    T2 --> RW
    T3 --> IA

    RW -->|publish| E1
    E1 -->|subscribe| IA
    IA -->|publish| E2
    E2 -->|subscribe| MA
    MA -->|publish| E3
    E3 -->|subscribe| RA
    RA -->|publish| E4
    E4 -->|subscribe| LA
```

### Agent Responsibilities

**Regulatory Watcher:** Monitors RSS feeds from PCI SSC, EUR-Lex, FinCEN, and other regulatory bodies. Uses SHA-256 hash comparison to detect document changes. Polls every 6 hours and emits `new_regulation` events.

**Interpreter Agent:** Receives regulatory documents and runs the Constitutional AI Debate. Extracts obligations, definitions, and required controls. Updates the Control Library with new or modified controls.

**Monitor Agent:** Scans enterprise data sources (databases, files, emails, logs) for PII/PCI violations. Uses a three-stage pipeline: Regex pattern matching → spaCy NER → Validation (Luhn algorithm for credit cards). Calculates risk scores and emits findings.

**Remediator Agent:** Generates fix recommendations using RAG to find relevant guidance. Creates structured evidence packages for auditors. Pushes compliance rules to Visa Risk Manager API.

**Learning Agent:** Collects feedback on false positives and remediation outcomes. Adjusts detection thresholds and retrains prediction models. Enables the system to improve accuracy over time.

---

## 5. Module Details

### Detection Pipeline

The Monitor Agent uses a multi-stage pipeline to detect sensitive data with high accuracy:

```mermaid
flowchart LR
    subgraph Input["DATA SOURCES"]
        DB[(Databases)]
        FILES[Files]
        EMAIL[Emails]
        LOGS[Logs]
    end

    subgraph S1["STAGE 1"]
        REGEX[Regex Patterns<br/>Credit Card, SSN<br/>Email, Phone]
    end

    subgraph S2["STAGE 2"]
        NER[spaCy NER<br/>Names, Addresses<br/>Organizations]
    end

    subgraph S3["STAGE 3"]
        VAL[Validators<br/>Luhn Algorithm<br/>Format Checks]
    end

    subgraph S4["STAGE 4"]
        SCORE[Confidence<br/>Scoring<br/>0.0 - 1.0]
    end

    subgraph Output["OUTPUT"]
        FIND[(Findings Store)]
        ALERT[Alert Engine]
    end

    Input --> S1 --> S2 --> S3 --> S4 --> Output
```

**Stage 1 - Pattern Matching:** Regex patterns identify potential PII/PCI data (credit cards, SSNs, emails, phone numbers).

**Stage 2 - Entity Recognition:** spaCy NER model extracts named entities (person names, addresses, organizations) that regex cannot capture.

**Stage 3 - Validation:** Validators confirm data validity—Luhn algorithm for credit cards, format checks for SSNs, RFC 5322 for emails.

**Stage 4 - Confidence Scoring:** Final score calculated as: Base (0.70) + Validation pass (+0.25) - No context (-0.35). Only findings above threshold are reported.

### Control Library Management

PS4 explicitly requires agents to **"update control libraries"**. Our Control Library Manager handles the complete lifecycle:

```mermaid
flowchart TD
    A[New Regulation Detected] --> B{Control Exists?}
    B -->|No| C[CREATE Control]
    B -->|Yes| D{Changed?}
    D -->|Yes| E[UPDATE Version]
    D -->|No| F[No Action]

    C --> G[Status: Draft]
    G --> H[Debate Chamber Validates]
    H --> I{Valid?}
    I -->|Yes| J[Status: Active]
    I -->|No| K[Flag for Review]

    E --> L[Increment Version]
    L --> M[Log to Audit Trail]

    N[Regulation Repealed] --> O[DEPRECATE Control]
    O --> P[Set Deprecated Date]
```

Each control is versioned with full audit trail, showing which agent made changes and why.

### Adaptive Learning

The Learning Agent enables the system to improve over time by processing feedback:

- **False Positive Feedback:** When users mark a finding as incorrect, the system adjusts detection thresholds
- **Remediation Outcomes:** Successful fixes are prioritized in future recommendations
- **Interpretation Corrections:** Human corrections improve the Constitutional AI prompts

This creates a continuous improvement loop where the system becomes more accurate with use.

---

## 6. Visa API Integration

As a Visa hackathon, integration with Visa APIs demonstrates real-world applicability:

**Visa Risk Manager (VRM):** When the Remediator Agent detects a payment-related violation, it automatically generates a VRM rule and pushes it to the Visa network via API. This enables real-time fraud prevention.

**Visa Transaction Controls (VCTC):** For data quality issues (e.g., unclear merchant names), the system can trigger user verification via VCTC, cleaning data at the source.

```mermaid
sequenceDiagram
    participant RA as Remediator Agent
    participant VRM as Visa Risk Manager
    participant VN as Visa Network

    RA->>RA: Detect PAN in logs
    RA->>RA: Generate VRM rule
    RA->>VRM: POST /v1/rules
    VRM->>VRM: Validate rule
    VRM->>VN: Deploy to network
    VN-->>VRM: Confirmation
    VRM-->>RA: Rule ID returned
    RA->>RA: Log to audit trail
```

---

## 7. PS4 Requirements Mapping

| PS4 Requirement | Our Implementation |
|-----------------|-------------------|
| **"Autonomous agents"** | 5 agents communicate via Redis Pub/Sub, triggering each other without human intervention |
| **"Make decisions, plan tasks"** | Constitutional AI Debate Chamber makes interpretation decisions with reasoning traces |
| **"Operate independently"** | Event-driven architecture—agents run 24/7 without manual triggers |
| **"Without constant human supervision"** | Full autonomous loop; humans only review high-risk decisions |
| **"Adapt behavior based on feedback"** | Learning Agent adjusts thresholds and retrains models from user feedback |
| **"Monitor transactions, communications, logs"** | Unified scanner covers databases, files, O365 emails, Slack, application logs |
| **"Predictive behavioral insights"** | XGBoost model predicts 7-day risk scores; Prophet for trend forecasting |
| **"Natural language interaction"** | RAG-powered chat interface answers compliance questions with citations |
| **"AI-generated dashboards"** | LLM generates Plotly visualization code at runtime based on user queries |
| **"Update control libraries"** | Auto CREATE/UPDATE/DEPRECATE with version control and audit trail |
| **"Evidence packages"** | Structured packages with findings, reasoning traces, and remediation steps |

---

## 8. Technology Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Agent Orchestration** | LangGraph | Supports cyclic workflows (debate loops, retry logic) |
| **Event Bus** | Redis Pub/Sub | Low-latency agent-to-agent messaging |
| **Primary LLM** | GPT-4o-mini | Cost-effective ($0.15/1M tokens), handles 90% of calls |
| **Complex LLM** | GPT-4o | Reserved for Judge decisions and ambiguous cases |
| **Embeddings** | MiniLM-L6-v2 | Free, local, 384-dimensional vectors |
| **Vector Store** | FAISS | In-memory, sub-millisecond similarity search |
| **NER** | spaCy (en_core_web_sm) | Production-ready named entity recognition |
| **Prediction** | XGBoost + Prophet | Risk classification + time series forecasting |
| **Dashboard** | Streamlit + Plotly | Rapid prototyping with interactive visualizations |
| **Database** | SQLite | Zero-configuration, sufficient for hackathon scale |
| **External APIs** | Visa Developer Platform | VRM for rule deployment, VCTC for user verification |

---

## 9. Dashboard Wireframe

The user interface provides real-time visibility into compliance status:

```mermaid
flowchart TB
    subgraph Header["ComplianceGuard AI"]
        H1[Settings]
        H2[Export]
        H3[Help]
    end

    subgraph Row1["KEY METRICS"]
        M1[Compliance Score<br/>87%<br/>Gauge Chart]
        M2[Regulation Coverage<br/>PCI: 82%<br/>GDPR: 100%<br/>CCPA: 71%]
        M3[Active Alerts<br/>Critical: 2<br/>High: 5]
    end

    subgraph Row2["LIVE AGENT REASONING"]
        R2[Real-time WebSocket feed showing<br/>agent decisions and debate traces]
    end

    subgraph Row3["DETAILS"]
        D1[Recent Findings<br/>with severity and<br/>fix suggestions]
        D2[Chat Interface<br/>Ask compliance<br/>questions in NL]
    end

    subgraph Row4["RISK HEATMAP"]
        R4[Data Source × Regulation<br/>matrix showing risk levels]
    end

    Header --> Row1 --> Row2 --> Row3 --> Row4
```

**Key Components:**
- **Compliance Score:** Overall percentage with gauge visualization
- **Live Reasoning:** WebSocket-powered real-time agent activity log
- **Findings Table:** Sortable violations with severity and fix recommendations
- **Chat Interface:** Natural language Q&A about compliance status
- **Risk Heatmap:** Matrix showing which data sources have issues per regulation

---

## 10. References

### Regulatory Sources
- PCI Security Standards Council: https://www.pcisecuritystandards.org
- EUR-Lex (GDPR): https://eur-lex.europa.eu/eli/reg/2016/679/oj
- California AG (CCPA): https://oag.ca.gov/privacy/ccpa
- FinCEN (AML): https://www.fincen.gov
- Visa Developer Portal: https://developer.visa.com

### Industry Statistics
- IBM Cost of Data Breach Report 2024: $6.08M average breach cost, 197 days MTTI
- DLA Piper GDPR Fines Tracker 2025: $5.88B total fines
- Bank Policy Institute Survey 2024: 61% increase in compliance hours
- PCI SSC: 64 new requirements in PCI DSS 4.0 (effective March 2025)

### Technical References
- Constitutional AI Paper: arxiv.org/abs/2212.08073 (Anthropic, 2022)
- LangGraph Documentation: langchain-ai.github.io/langgraph
- FAISS: github.com/facebookresearch/faiss

---

## Why This Solution Wins

| Criteria | Our Strength |
|----------|--------------|
| **True Autonomy** | Agents self-trigger via events—no human buttons needed |
| **Innovation** | Constitutional AI Debate is a novel approach to hallucination reduction |
| **PS4 Alignment** | Every requirement explicitly addressed with specific implementation |
| **Visa Integration** | Direct API integration with Risk Manager for rule deployment |
| **Practicality** | Standard open-source stack, buildable in 24-hour hackathon |
| **Transparency** | Live reasoning traces let judges see AI decision-making |

---

*ComplianceGuard AI — Autonomous Compliance, Continuous Protection*
