# ComplianceGuard AI - Solution Deck

## Agentic AI for Continuous PCI/PII Compliance

**Hackathon:** VISA x Shaastra 2026 | **Track:** RegTech, FinTech, Agentic AI

---

## Table of Contents

1. [The Problem We Solve](#1-the-problem-we-solve)
2. [Solution Overview](#2-solution-overview)
3. [How It Works (Simple Explanation)](#3-how-it-works-simple-explanation)
4. [Solution Modules](#4-solution-modules)
5. [System Architecture](#5-system-architecture)
6. [Agent Flow - The Autonomous Loop](#6-agent-flow---the-autonomous-loop)
7. [What You'll See in the Demo](#7-what-youll-see-in-the-demo)
8. [Technology Stack](#8-technology-stack)
9. [References & Sources](#9-references--sources)

---

## 1. The Problem We Solve

### What is Compliance?

Banks and financial companies must follow **rules** (called regulations) to protect customer data. For example:
- **PCI DSS** = Rules for protecting credit card numbers
- **GDPR** = Rules for protecting personal data in Europe
- **CCPA** = Rules for protecting personal data in California

### The Pain Points

| Pain Point | Real-World Impact | Source |
|------------|-------------------|--------|
| **Data breaches are expensive** | Average cost: **$6.08 million** per breach in financial sector | IBM Cost of Data Breach Report 2024 |
| **Breaches take too long to find** | Average time to detect: **197 days** | IBM Cost of Data Breach Report 2024 |
| **Manual compliance is slow** | Compliance teams spend **61% more hours** than 5 years ago | Bank Policy Institute Survey 2024 |
| **Fines are massive** | Total GDPR fines since 2018: **$5.88 billion** | DLA Piper GDPR Fines Tracker 2025 |
| **Rules change constantly** | PCI DSS 4.0 has **64 new requirements** effective March 2025 | PCI Security Standards Council |

### The Core Problem (In Simple Terms)

```
TODAY'S COMPLIANCE PROCESS:
━━━━━━━━━━━━━━━━━━━━━━━━━━

1. New regulation comes out
         ↓
2. Compliance team MANUALLY reads it (weeks)
         ↓
3. They MANUALLY check company data (weeks)
         ↓
4. They MANUALLY write a report (days)
         ↓
5. They MANUALLY fix issues (weeks)

Total time: MONTHS
By then, a breach may have already happened!
```

### What Companies Need

| They Need | But They Have |
|-----------|---------------|
| **24/7 automatic monitoring** | Annual audits (once a year!) |
| **Instant detection** of violations | 197-day detection time |
| **AI that reads regulations** for them | Teams manually reading 400-page documents |
| **Automatic fix recommendations** | Waiting for consultants |

---

## 2. Solution Overview

### Our Solution: ComplianceGuard AI

> **One-line description:** An AI system where intelligent "agents" work together 24/7 to read regulations, scan company data, find violations, and fix them — all automatically, without humans clicking buttons.

### What Makes Us Different

```
OUR SOLUTION:
━━━━━━━━━━━━━

1. New regulation comes out
         ↓
2. AI AUTOMATICALLY reads it (minutes)
         ↓
3. AI AUTOMATICALLY scans all data (hours)
         ↓
4. AI AUTOMATICALLY writes report (seconds)
         ↓
5. AI AUTOMATICALLY suggests fixes (seconds)

Total time: HOURS, not months!
```

### The "Agentic" Difference

**What is an "Agent"?**
Think of an agent like a **smart employee** that:
- Has a specific job (reading regulations, scanning data, etc.)
- Can make decisions on its own
- Can ask other agents for help
- Works 24/7 without getting tired

**Our system has 4 agents working together:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│    REGULATORY          INTERPRETER        MONITOR        REMEDIATOR│
│     WATCHER              AGENT             AGENT           AGENT   │
│                                                                     │
│   "I watch for       "I understand      "I scan your    "I suggest │
│    new rules"         what rules         data for         how to   │
│                        mean"             violations"      fix it"  │
│                                                                     │
│        │                  │                  │                │     │
│        └──────────────────┴──────────────────┴────────────────┘     │
│                                                                     │
│              They talk to each other AUTOMATICALLY                  │
│              No human needs to tell them what to do!                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. How It Works (Simple Explanation)

### The Autonomous Compliance Loop

Imagine a **security guard** that:
1. Watches the news for new security threats
2. Checks all the doors and windows
3. Writes a report of what they found
4. Suggests how to fix problems
5. Does this **automatically, 24/7**

That's what our AI does for data compliance!

```
THE AUTOMATIC LOOP (Runs 24/7 Without Human Input)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

        ┌─────────────────────────────────────────┐
        │                                         │
        │   1. WATCH: "Is there a new rule?"      │
        │      (Checks every 6 hours)             │
        │                                         │
        └─────────────────┬───────────────────────┘
                          │ YES!
                          ▼
        ┌─────────────────────────────────────────┐
        │                                         │
        │   2. UNDERSTAND: "What does it mean?"   │
        │      (AI reads and interprets)          │
        │                                         │
        └─────────────────┬───────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────────────┐
        │                                         │
        │   3. SCAN: "Are we following it?"       │
        │      (Checks all company data)          │
        │                                         │
        └─────────────────┬───────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────────────┐
        │                                         │
        │   4. FIX: "Here's how to solve it"      │
        │      (Generates recommendations)        │
        │                                         │
        └─────────────────┬───────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────────────┐
        │                                         │
        │   5. LEARN: "Did the fix work?"         │
        │      (Improves for next time)           │
        │                                         │
        └─────────────────┬───────────────────────┘
                          │
                          └──────────► Back to Step 1
```

### Real Example

```
EXAMPLE: Credit Card Number Found in Email Log

STEP 1 - DETECT
━━━━━━━━━━━━━━━
Monitor Agent scans support emails
Finds: "Customer sent card: 4532-XXXX-XXXX-1234"
This violates PCI DSS Rule 3.4.1!

STEP 2 - ALERT
━━━━━━━━━━━━━━
System creates alert:
  Severity: CRITICAL
  Location: support_emails/ticket_4521.txt
  Rule violated: PCI DSS 3.4.1 (Don't store card numbers)

STEP 3 - RECOMMEND FIX
━━━━━━━━━━━━━━━━━━━━━━
Remediator Agent suggests:
  "Delete the email attachment"
  "Train staff to reject card numbers in emails"
  "Add email filter to block card patterns"

STEP 4 - GENERATE EVIDENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━
System creates audit-ready report showing:
  - What was found
  - Which rule was broken
  - What fix was recommended
  - Timeline of events

All this happens in SECONDS, not weeks!
```

---

## 4. Solution Modules

### Module 1: Regulatory Watcher

**Job:** Watch for new rules and regulations

**How it works:**
- Connects to official regulation websites (like RSS news feeds)
- Checks every 6 hours: "Did anything change?"
- If YES → Alerts the Interpreter Agent

**Sources it watches:**
| Source | What It Covers |
|--------|----------------|
| PCI Security Standards Council | Credit card security rules |
| EUR-Lex (European Union) | GDPR privacy rules |
| FinCEN (US Treasury) | Anti-money laundering rules |
| California AG Office | CCPA privacy rules |

---

### Module 2: Interpreter Agent (with "Debate Chamber")

**Job:** Understand what regulations actually mean

**The Problem:** Regulations are written in complex legal language. AI can sometimes "hallucinate" (make things up).

**Our Solution: Constitutional AI Debate**

Three AI personalities "debate" each interpretation:

```
THE DEBATE CHAMBER
━━━━━━━━━━━━━━━━━━

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    PROPOSER     │    │     CRITIC      │    │      JUDGE      │
│                 │    │                 │    │                 │
│  "Here's what   │───▶│  "Wait, that's  │───▶│  "After hearing │
│   the rule      │    │   too strict!   │    │   both sides,   │
│   means..."     │    │   What about    │    │   here's the    │
│                 │    │   exception X?" │    │   final answer" │
└─────────────────┘    └─────────────────┘    └─────────────────┘

This debate REDUCES errors by having AI check itself!
```

**Why this matters:**
- Single AI can make mistakes
- Debate forces the AI to defend its interpretation
- Final answer is more reliable

---

### Module 3: Monitor Agent

**Job:** Scan company data to find violations

**What it scans:**

| Data Type | Examples | What It Looks For |
|-----------|----------|-------------------|
| Databases | Customer tables, order records | Credit card numbers, SSNs stored incorrectly |
| Files | CSV exports, JSON configs | Personal data in plain text |
| Emails | Support tickets, communications | Customers sharing sensitive info |
| Logs | Application logs, error logs | Accidentally logged passwords or card numbers |

**How it detects sensitive data:**

```
DETECTION PIPELINE
━━━━━━━━━━━━━━━━━━

Step 1: PATTERN MATCHING
        Look for patterns like:
        - Credit cards: 4XXX-XXXX-XXXX-XXXX
        - SSN: XXX-XX-XXXX
        - Emails: something@domain.com

Step 2: VALIDATION
        Is it real?
        - Run Luhn algorithm on credit cards
        - Check if SSN format is valid

Step 3: CONFIDENCE SCORE
        How sure are we? (0-100%)
        - Pattern matched: +70%
        - Validation passed: +25%
        - Found in sensitive context: +5%
```

---

### Module 4: Remediator Agent

**Job:** Suggest fixes and create audit evidence

**What it produces:**

1. **Fix Recommendations**
   - Step-by-step instructions to fix each violation
   - Ranked by priority (Critical → High → Medium → Low)

2. **Evidence Packages**
   - Audit-ready documents for regulators
   - Shows: What was found, when, and how it was fixed

3. **Dashboard Updates**
   - Real-time compliance score
   - Risk heatmaps showing problem areas

---

### Module 5: Learning Agent (Adaptive Behavior)

**Job:** Get smarter over time based on feedback

**How it learns:**

```
FEEDBACK LOOP
━━━━━━━━━━━━━

User marks finding as "False Positive"
(It wasn't really a violation)
            │
            ▼
Learning Agent records this
            │
            ▼
Adjusts detection sensitivity
            │
            ▼
Fewer false alarms next time!
```

**PS4 Requirement:** "Adapt behavior based on real-time feedback" ✓

---

### Module 6: Control Library Manager

**Job:** Keep track of all compliance rules and controls

**What is a "Control"?**
A control is a specific action that satisfies a regulation.

Example:
- **Regulation:** "PCI DSS 3.4.1 - Protect stored card numbers"
- **Control:** "Encrypt all card numbers using AES-256 encryption"

**Auto-Update Feature:**

```
When new regulation detected:
  → AI creates new control automatically
  → Adds to Control Library
  → Links to relevant data sources
  → Schedules scan for compliance

This is "update control libraries" from PS4 Task 4.3 ✓
```

---

## 5. System Architecture

### How Everything Connects

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ComplianceGuard AI Architecture                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ╔═══════════════════════════════════════════════════════════════════════╗  │
│  ║                        USER INTERFACE LAYER                            ║  │
│  ║                                                                        ║  │
│  ║   ┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐   ║  │
│  ║   │    Chat    │   │ Dashboard  │   │   Alerts   │   │  Reports   │   ║  │
│  ║   │ "Ask me    │   │ Compliance │   │ "Critical  │   │ "Download  │   ║  │
│  ║   │  anything" │   │ Score: 87% │   │  issue!"   │   │  evidence" │   ║  │
│  ║   └────────────┘   └────────────┘   └────────────┘   └────────────┘   ║  │
│  ║                                                                        ║  │
│  ╚════════════════════════════════════════════════════════════════════════╝  │
│                                      │                                       │
│                                      ▼                                       │
│  ╔═══════════════════════════════════════════════════════════════════════╗  │
│  ║                         AI AGENTS LAYER                                ║  │
│  ║                     (The "Brain" of the System)                        ║  │
│  ║                                                                        ║  │
│  ║   ┌──────────────┐                              ┌──────────────┐       ║  │
│  ║   │  REGULATORY  │──────► EVENT BUS ◄──────────│  INTERPRETER │       ║  │
│  ║   │   WATCHER    │       (Messages)             │    AGENT     │       ║  │
│  ║   │              │            │                 │              │       ║  │
│  ║   │ "New rule!"  │            │                 │ "It means.." │       ║  │
│  ║   └──────────────┘            │                 └──────────────┘       ║  │
│  ║                               │                                        ║  │
│  ║   ┌──────────────┐            │                 ┌──────────────┐       ║  │
│  ║   │   MONITOR    │◄───────────┴────────────────►│  REMEDIATOR  │       ║  │
│  ║   │    AGENT     │                              │    AGENT     │       ║  │
│  ║   │              │                              │              │       ║  │
│  ║   │ "Found it!"  │                              │ "Fix this.." │       ║  │
│  ║   └──────────────┘                              └──────────────┘       ║  │
│  ║                                                                        ║  │
│  ║                        ┌──────────────┐                                ║  │
│  ║                        │   LEARNING   │                                ║  │
│  ║                        │    AGENT     │                                ║  │
│  ║                        │ "Getting     │                                ║  │
│  ║                        │  smarter.."  │                                ║  │
│  ║                        └──────────────┘                                ║  │
│  ║                                                                        ║  │
│  ╚════════════════════════════════════════════════════════════════════════╝  │
│                                      │                                       │
│                                      ▼                                       │
│  ╔═══════════════════════════════════════════════════════════════════════╗  │
│  ║                         DATA STORAGE LAYER                             ║  │
│  ║                                                                        ║  │
│  ║   ┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐   ║  │
│  ║   │ Regulation │   │  Control   │   │  Findings  │   │   Audit    │   ║  │
│  ║   │  Database  │   │  Library   │   │   Store    │   │    Logs    │   ║  │
│  ║   │            │   │            │   │            │   │            │   ║  │
│  ║   │ GDPR, PCI  │   │ All rules  │   │ Violations │   │ Everything │   ║  │
│  ║   │ CCPA, etc. │   │ we follow  │   │   found    │   │   logged   │   ║  │
│  ║   └────────────┘   └────────────┘   └────────────┘   └────────────┘   ║  │
│  ║                                                                        ║  │
│  ╚════════════════════════════════════════════════════════════════════════╝  │
│                                      │                                       │
│                                      ▼                                       │
│  ╔═══════════════════════════════════════════════════════════════════════╗  │
│  ║                     DATA SOURCES (What We Scan)                        ║  │
│  ║                                                                        ║  │
│  ║   ┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐   ║  │
│  ║   │ Databases  │   │   Files    │   │   Emails   │   │    Logs    │   ║  │
│  ║   │ (Customer  │   │ (Exports,  │   │ (Support   │   │ (App logs, │   ║  │
│  ║   │  records)  │   │  configs)  │   │  tickets)  │   │  errors)   │   ║  │
│  ║   └────────────┘   └────────────┘   └────────────┘   └────────────┘   ║  │
│  ║                                                                        ║  │
│  ╚════════════════════════════════════════════════════════════════════════╝  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Agent Flow - The Autonomous Loop

### How Agents Talk to Each Other

The key innovation: **Agents trigger each other automatically.**

No human needs to say "Now scan the data" - the agents do it themselves!

```
AUTONOMOUS AGENT FLOW
━━━━━━━━━━━━━━━━━━━━━

                    ┌─────────────────────────────────┐
                    │     REGULATORY WATCHER          │
                    │                                 │
                    │  Polling every 6 hours...       │
                    │  "New PCI DSS update found!"    │
                    │                                 │
                    └───────────────┬─────────────────┘
                                    │
                                    │ SENDS MESSAGE:
                                    │ "new_regulation_detected"
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │      INTERPRETER AGENT          │
                    │                                 │
                    │  RECEIVES message automatically │
                    │                                 │
                    │  1. Reads new regulation        │
                    │  2. Runs Debate Chamber         │
                    │     - Proposer: "It means X"    │
                    │     - Critic: "But what about Y"│
                    │     - Judge: "Final answer: Z"  │
                    │  3. Updates Control Library     │
                    │                                 │
                    └───────────────┬─────────────────┘
                                    │
                                    │ SENDS MESSAGE:
                                    │ "controls_updated"
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │        MONITOR AGENT            │
                    │                                 │
                    │  RECEIVES message automatically │
                    │                                 │
                    │  1. Identifies affected data    │
                    │  2. Scans all relevant sources  │
                    │  3. Calculates risk scores      │
                    │  4. Creates findings list       │
                    │                                 │
                    └───────────────┬─────────────────┘
                                    │
                                    │ SENDS MESSAGE:
                                    │ "violations_found"
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │       REMEDIATOR AGENT          │
                    │                                 │
                    │  RECEIVES message automatically │
                    │                                 │
                    │  1. Generates fix suggestions   │
                    │  2. Creates evidence package    │
                    │  3. Updates dashboard           │
                    │  4. Sends alerts if critical    │
                    │                                 │
                    └───────────────┬─────────────────┘
                                    │
                                    │ SENDS MESSAGE:
                                    │ "remediation_complete"
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │        LEARNING AGENT           │
                    │                                 │
                    │  RECEIVES message automatically │
                    │                                 │
                    │  1. Records what happened       │
                    │  2. Analyzes effectiveness      │
                    │  3. Adjusts for next time       │
                    │                                 │
                    └───────────────┬─────────────────┘
                                    │
                                    │ LOOP CONTINUES...
                                    │
                                    ▼
                              Back to Start


TOTAL HUMAN INVOLVEMENT: ZERO
(Unless critical issue needs approval)
```

### Why This Matters for PS4

| PS4 Requirement | How We Address It |
|-----------------|-------------------|
| "Autonomous" | Agents trigger each other, no human buttons |
| "Make decisions" | Debate Chamber makes interpretation decisions |
| "Plan tasks" | Each agent plans its own work |
| "Minimal human supervision" | Loop runs 24/7 automatically |
| "Adapt behavior" | Learning Agent improves over time |

---

## 7. What You'll See in the Demo

### Demo Wireframe (Single Page View)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ComplianceGuard AI                                    [Settings] [Help]    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────┐  ┌─────────────────────────────┐  │
│  │                                     │  │                             │  │
│  │     COMPLIANCE SCORE                │  │    REGULATION COVERAGE      │  │
│  │                                     │  │                             │  │
│  │           ┌─────┐                   │  │  PCI DSS  ████████░░ 82%    │  │
│  │          /       \                  │  │  GDPR     ██████████ 100%   │  │
│  │         │   87%   │                 │  │  CCPA     ███████░░░ 71%    │  │
│  │          \       /                  │  │  AML      █████████░ 94%    │  │
│  │           └─────┘                   │  │                             │  │
│  │        Overall Score                │  │                             │  │
│  │                                     │  │                             │  │
│  └─────────────────────────────────────┘  └─────────────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  LIVE AGENT ACTIVITY (Real-Time Reasoning Traces)                    │  │
│  │                                                                       │  │
│  │  [10:30:15] REGULATORY_WATCHER: Checking PCI SSC feed...             │  │
│  │  [10:30:16] REGULATORY_WATCHER: New update detected!                 │  │
│  │  [10:30:17] INTERPRETER: Starting Constitutional AI Debate...        │  │
│  │  [10:30:18] INTERPRETER > PROPOSER: "Block all unencrypted storage"  │  │
│  │  [10:30:19] INTERPRETER > CRITIC: "Too strict, dev env exception?"   │  │
│  │  [10:30:20] INTERPRETER > JUDGE: "Block production, warn on dev"     │  │
│  │  [10:30:21] INTERPRETER: Debate complete. Confidence: 94%            │  │
│  │  [10:30:22] MONITOR: Re-scanning affected data sources...            │  │
│  │  [10:30:25] MONITOR: Found 2 new violations                          │  │
│  │  [10:30:26] REMEDIATOR: Generating fix recommendations...            │  │
│  │                                                                       │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────────┐  │
│  │  RECENT FINDINGS                │  │  CHAT WITH AI                   │  │
│  │                                 │  │                                 │  │
│  │  [CRITICAL] Credit card in log │  │  You: What are our GDPR gaps?   │  │
│  │  Source: app.log line 4521     │  │                                 │  │
│  │  Rule: PCI DSS 3.4.1           │  │  AI: I found 2 GDPR gaps:       │  │
│  │  [Fix Suggestion]              │  │                                 │  │
│  │                                 │  │  1. Data retention policy      │  │
│  │  [HIGH] SSN in email           │  │     missing for backups         │  │
│  │  Source: support_tickets       │  │                                 │  │
│  │  Rule: CCPA 1798.100           │  │  2. Right-to-delete not         │  │
│  │  [Fix Suggestion]              │  │     fully automated             │  │
│  │                                 │  │                                 │  │
│  │  [MEDIUM] Outdated encryption  │  │  [Generate Evidence Package]    │  │
│  │  Source: user_database         │  │                                 │  │
│  │  Rule: PCI DSS 4.2.1           │  │                                 │  │
│  │  [Fix Suggestion]              │  │                                 │  │
│  │                                 │  │                                 │  │
│  └─────────────────────────────────┘  └─────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  RISK HEATMAP (Which data sources have most issues?)                 │  │
│  │                                                                       │  │
│  │              PCI DSS    GDPR    CCPA    AML                          │  │
│  │  Databases    [LOW]    [LOW]   [MED]   [LOW]                         │  │
│  │  Files        [MED]    [LOW]   [LOW]   [LOW]                         │  │
│  │  Emails       [HIGH]   [MED]   [HIGH]  [LOW]                         │  │
│  │  Logs         [CRIT]   [LOW]   [LOW]   [LOW]                         │  │
│  │                                                                       │  │
│  │  Color Key: [LOW]=Green [MED]=Yellow [HIGH]=Orange [CRIT]=Red        │  │
│  │                                                                       │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### What Each Component Shows

| Component | What It Shows | PS4 Requirement |
|-----------|---------------|-----------------|
| **Compliance Score** | Overall compliance percentage | "Dynamic risk dashboards" |
| **Regulation Coverage** | How well we comply with each regulation | "Cross-regulatory analysis" |
| **Live Agent Activity** | Real-time AI thinking (visible to judges!) | "Autonomous agents" |
| **Recent Findings** | Violations detected with severity | "Continuous monitoring" |
| **Chat Interface** | Natural language questions | "Natural language interaction" |
| **Risk Heatmap** | Where are the biggest risks? | "Compliance risk heatmaps" |

---

## 8. Technology Stack

### What We Use (and Why)

| Category | Technology | Why We Chose It |
|----------|------------|-----------------|
| **Agent Framework** | LangGraph | Lets agents talk to each other in loops |
| **AI Model** | GPT-4o / GPT-4o-mini | Best for understanding regulations |
| **Vector Database** | FAISS | Fast search through regulation documents |
| **Message Bus** | Redis | Lets agents send messages to each other |
| **NLP** | spaCy | Finds names, addresses in text |
| **Dashboard** | Streamlit | Quick to build, looks professional |
| **Database** | SQLite | Simple, no setup required |

### Simple Explanation of Key Technologies

**LangGraph** = A tool that lets us create AI "agents" that can:
- Have conversations
- Use tools (like searching databases)
- Work in loops (keep going until done)

**FAISS** = A super-fast search engine for documents:
- We feed it all regulation documents
- When user asks a question, it finds relevant parts in milliseconds

**Redis** = A message delivery system:
- Agent A says "I found something!"
- Redis delivers that message to Agent B
- Agent B wakes up and starts working

---

## 9. References & Sources

### Regulatory Sources (Official)

| Source | URL | What We Use It For |
|--------|-----|-------------------|
| PCI Security Standards Council | https://www.pcisecuritystandards.org | PCI DSS 4.0 requirements |
| EUR-Lex (European Union) | https://eur-lex.europa.eu | GDPR full text |
| California Attorney General | https://oag.ca.gov/privacy/ccpa | CCPA regulations |
| FinCEN (US Treasury) | https://www.fincen.gov | AML/BSA guidance |
| Visa Developer Portal | https://developer.visa.com | Visa API integration |

### Industry Statistics (Verified)

| Statistic | Value | Source | Year |
|-----------|-------|--------|------|
| Average data breach cost (financial) | $6.08 million | IBM Cost of Data Breach Report | 2024 |
| Time to identify a breach | 197 days | IBM Cost of Data Breach Report | 2024 |
| Total GDPR fines issued | $5.88 billion | DLA Piper GDPR Fines Tracker | 2025 |
| Increase in compliance hours | 61% (since 2020) | Bank Policy Institute Survey | 2024 |
| RegTech market size by 2035 | $115.5 billion | Globe Newswire Market Report | 2024 |
| PCI DSS 4.0 new requirements | 64 new requirements | PCI SSC Official | 2024 |

### Technical References

| Technology | Documentation | What It Does |
|------------|---------------|--------------|
| LangGraph | https://langchain-ai.github.io/langgraph | Agent orchestration |
| Constitutional AI | https://arxiv.org/abs/2212.08073 | Anthropic's paper on AI debate |
| FAISS | https://github.com/facebookresearch/faiss | Vector similarity search |
| spaCy | https://spacy.io | NLP and entity recognition |

### Academic Foundation

| Concept | Source | How We Use It |
|---------|--------|---------------|
| Constitutional AI | Anthropic (2022) | Debate Chamber design |
| RAG (Retrieval-Augmented Generation) | Lewis et al. (2020) | Finding relevant regulations |
| ReAct Pattern | Yao et al. (2022) | Agent reasoning approach |

---

## Summary: Why This Solution Wins

### PS4 Keywords We Hit

| PS4 Says | We Deliver |
|----------|------------|
| "Agentic AI" | 5 specialized agents working together |
| "Autonomous" | Self-triggering loop, no human buttons |
| "Make decisions" | Debate Chamber for interpretation |
| "Plan tasks" | Each agent plans its own work |
| "Minimal human supervision" | 24/7 automatic operation |
| "Adapt behavior" | Learning Agent improves over time |
| "Evidence packages" | Auto-generated audit reports |
| "Update control libraries" | Auto-add/update/deprecate controls |
| "Natural language" | Chat interface for questions |
| "Dynamic dashboards" | Real-time compliance visualization |

### The "Wow" Moment for Judges

```
DEMO SCENARIO:
━━━━━━━━━━━━━━

1. Show the system running quietly
2. Simulate a new regulation being published
3. Watch the agents:
   - WATCHER detects it
   - INTERPRETER debates and decides
   - MONITOR scans and finds issues
   - REMEDIATOR suggests fixes
4. All in 60 seconds, with ZERO human clicks

Judge reaction: "It really works autonomously!"
```

---

**Document Version:** 1.0
**Last Updated:** January 4, 2025
**Prepared for:** VISA x Shaastra 2026 - 24 Hour AI Hackathon
