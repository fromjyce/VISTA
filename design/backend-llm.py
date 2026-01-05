from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq  # Make sure groq sdk is installed
import os

app = FastAPI()

groq_client = Groq(api_key="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")

def call_groq(prompt: str) -> str:
    response = groq_client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=512,
        temperature=0.7,
    )
    return response.choices[0].message.content

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ComplianceData(BaseModel):
    compliance_score: int
    critical_issues: int
    at_risk: int
    passing_controls: int

class AgentStatus(BaseModel):
    name: str
    status: str
    last_sync: str
    items: str

class ViolationCategory(BaseModel):
    name: str
    value: int

class Finding(BaseModel):
    id: str
    type: str
    source: str
    status: str
    timestamp: str

class ComplianceTrend(BaseModel):
    date: str
    score: int

import json

@app.get("/api/compliance")
def get_compliance_data():
    prompt = (
        "Generate a JSON object with realistic compliance dashboard metrics: "
        "compliance_score (int 70-100), critical_issues (int 0-10), at_risk (int 0-20), passing_controls (int 50-100). "
        "Example: {\"compliance_score\": 91, \"critical_issues\": 2, \"at_risk\": 7, \"passing_controls\": 82}"
    )
    result = call_groq(prompt)
    try:
        data = json.loads(result)
    except Exception:
        data = {"compliance_score": 90, "critical_issues": 1, "at_risk": 5, "passing_controls": 80}
    return data

@app.get("/api/system_liveness")
def get_system_liveness():
    prompt = (
        "Generate a JSON list of 5 compliance system agents, each with fields: name (Watcher, Interpreter, Monitor, Remediator, Learning), "
        "status (active/idle/error), last_sync (e.g., '2 min ago'), and items (short summary, e.g., '5 sources'). "
        "Example: [{\"name\": \"Watcher\", \"status\": \"active\", \"last_sync\": \"2 min ago\", \"items\": \"5 sources\"}, ...]"
    )
    result = call_groq(prompt)
    try:
        agents = json.loads(result)
    except Exception:
        agents = [
            {"name": "Watcher", "status": "active", "last_sync": "2 min ago", "items": "5 sources"},
            {"name": "Interpreter", "status": "active", "last_sync": "5 min ago", "items": "3 pending"},
            {"name": "Monitor", "status": "active", "last_sync": "1 min ago", "items": "10 findings"},
            {"name": "Remediator", "status": "active", "last_sync": "8 min ago", "items": "2 fixed"},
            {"name": "Learning", "status": "active", "last_sync": "7 hr ago", "items": "92% accuracy"},
        ]
    return agents

@app.get("/api/compliance_trend")
def get_compliance_trend():
    prompt = (
        "Generate a JSON list of 5 objects representing compliance trend over 5 days. "
        "Each object should have date (e.g., 'Jan 1') and score (int 70-100). "
        "Example: [{\"date\": \"Jan 1\", \"score\": 82}, ...]"
    )
    result = call_groq(prompt)
    try:
        trend = json.loads(result)
    except Exception:
        trend = [
            {"date": "Jan 1", "score": 82},
            {"date": "Jan 2", "score": 85},
            {"date": "Jan 3", "score": 83},
            {"date": "Jan 4", "score": 87},
            {"date": "Jan 5", "score": 90},
        ]
    return trend

@app.get("/api/violations")
def get_violations_by_category():
    prompt = (
        "Generate a JSON list of 3 violation categories for a compliance dashboard. "
        "Each object should have name (e.g., 'PCI DSS') and value (int). "
        "Example: [{\"name\": \"PCI DSS\", \"value\": 5}, ...]"
    )
    result = call_groq(prompt)
    try:
        categories = json.loads(result)
    except Exception:
        categories = [
            {"name": "PCI DSS", "value": 5},
            {"name": "DPDP/UIDAI", "value": 3},
            {"name": "RBI/NPCI", "value": 4},
        ]
    return categories

@app.get("/api/recent_findings")
def get_recent_findings():
    prompt = (
        "Generate a JSON list of 3 recent findings for a compliance dashboard. "
        "Each object should have id, type, source, status, timestamp. "
        "Example: [{\"id\": \"F001\", \"type\": \"PCI\", \"source\": \"System A\", \"status\": \"Open\", \"timestamp\": \"2 min ago\"}, ...]"
    )
    result = call_groq(prompt)
    try:
        findings = json.loads(result)
    except Exception:
        findings = [
            {"id": "F001", "type": "PCI", "source": "System A", "status": "Open", "timestamp": "2 min ago"},
            {"id": "F002", "type": "DPDP", "source": "System B", "status": "Fixing", "timestamp": "5 min ago"},
            {"id": "F003", "type": "RBI", "source": "System C", "status": "Reviewing", "timestamp": "10 min ago"},
        ]
    return findings

import uuid
from datetime import datetime, timedelta

@app.get("/api/data_sources")
def get_data_sources():
    prompt = (
        "Generate a JSON list of 3-5 data sources for a compliance dashboard. "
        "Each source should have id (string), name (string), type (email, chat, database, api, file, transaction), content (string), and addedAt (ISO timestamp). "
        "Example: [{\"id\": \"src1\", \"name\": \"Customer Support Chat Logs\", \"type\": \"chat\", \"content\": \"...\", \"addedAt\": \"2024-01-01T12:00:00Z\"}, ...]"
    )
    result = call_groq(prompt)
    try:
        data_sources = json.loads(result)
    except Exception:
        now = datetime.utcnow()
        data_sources = [
            {"id": str(uuid.uuid4()), "name": "Customer Support Chat Logs", "type": "chat", "content": "[10:30] Customer: I need help with UPI payment\n[10:31] Agent: Can you share your mobile number for verification?\n[10:32] Customer: Sure, it's +91-98765-43210", "addedAt": (now - timedelta(minutes=10)).isoformat() + "Z"},
            {"id": str(uuid.uuid4()), "name": "Email Inquiries", "type": "email", "content": "From: customer@gmail.com\nSubject: KYC Verification\nHi Support, my Aadhaar is 7294-8361-7842 and PAN is ABCDE1234F...", "addedAt": (now - timedelta(minutes=20)).isoformat() + "Z"},
            {"id": str(uuid.uuid4()), "name": "KYC Database", "type": "database", "content": "ID,CUSTOMER_NAME,PAN_NUMBER,AADHAAR_LAST4,MOBILE,ACCOUNT_NUMBER\n234,Priya Sharma,BMPPS1234K,7842,+91-9876543210,50100123456789", "addedAt": (now - timedelta(minutes=30)).isoformat() + "Z"}
        ]
    return data_sources

@app.post("/api/add_source")
def add_source(source: dict):
    # This endpoint would normally persist the source, but for demo just echo back with a new id and timestamp
    source["id"] = str(uuid.uuid4())
    source["addedAt"] = datetime.utcnow().isoformat() + "Z"
    return source

@app.get("/api/compliance_findings")
def get_compliance_findings():
    prompt = (
        "Generate a JSON list of 3-5 compliance findings for a compliance dashboard. Each finding should have: "
        "id (string), type (string), source (string), severity (critical/warning/success), status (open/fixing/reviewing/fixed), extracted (string), "
        "requirement (string), reasoningChain (list of strings), remediation (string), xaiExplanation (string), autoRemediated (bool), timestamp (ISO or relative string). "
        "Example: [{\"id\": \"F001\", \"type\": \"Aadhaar Number Exposure\", ...}]"
    )
    result = call_groq(prompt)
    try:
        findings = json.loads(result)
    except Exception:
        now = datetime.utcnow()
        findings = [
            {
                "id": "F001",
                "type": "Aadhaar Number Exposure",
                "source": "Customer Support Chat Logs",
                "severity": "critical",
                "status": "open",
                "extracted": "XXXX-XXXX-7842",
                "requirement": "DPDP Act Section 8(6) - Aadhaar is Sensitive Personal Data",
                "reasoningChain": [
                    "Detection: Regex matched 12-digit Aadhaar pattern in chat",
                    "Context Analysis: Found in Customer Support Chat Logs without encryption",
                    "Severity: CRITICAL - Aadhaar exposure violates UIDAI guidelines",
                    "Remediation: Immediate masking, UIDAI notification assessment"
                ],
                "remediation": "Auto-mask Aadhaar (show only last 4 digits). Implement input validation to prevent Aadhaar capture. Create audit trail.",
                "xaiExplanation": "Aadhaar numbers are classified as Sensitive Personal Data under DPDP Act 2023 and UIDAI guidelines. This 12-digit unique identifier linked to biometric data was detected in plaintext.",
                "autoRemediated": True,
                "timestamp": (now - timedelta(minutes=5)).isoformat() + "Z"
            },
            {
                "id": "F002",
                "type": "PAN Card Exposure",
                "source": "Email Inquiries",
                "severity": "critical",
                "status": "fixing",
                "extracted": "ABXXXX34F",
                "requirement": "IT Act SPDI Rules - PAN is financial sensitive data",
                "reasoningChain": [
                    "Detection: PAN format matched in email",
                    "Context: PAN found in Email Inquiries - likely part of KYC data",
                    "Severity: HIGH - PAN exposure enables financial fraud"
                ],
                "remediation": "Encrypt PAN in storage. Mask in all non-production exports. Review access permissions.",
                "xaiExplanation": "PAN (Permanent Account Number) is classified as sensitive financial information under IT Act SPDI Rules.",
                "autoRemediated": False,
                "timestamp": (now - timedelta(minutes=15)).isoformat() + "Z"
            }
        ]
    return findings

@app.get("/api/ai_findings/{finding_id}")
def get_ai_finding_details(finding_id: str):
    # For demo, just echo a detailed LLM explanation for the finding
    prompt = (
        f"Given the compliance finding with id {finding_id}, generate a JSON object with: "
        "reasoningChain (list of strings), xaiExplanation (string), remediation (string), autoRemediated (bool). "
        "Example: {\"reasoningChain\": [...], \"xaiExplanation\": \"...\", \"remediation\": \"...\", \"autoRemediated\": true}"
    )
    result = call_groq(prompt)
    try:
        details = json.loads(result)
    except Exception:
        details = {
            "reasoningChain": [
                "Detection: Regex matched pattern in content",
                "Context: Found in source without encryption",
                "Severity: CRITICAL - Data exposure violates compliance",
                "Remediation: Mask and notify"
            ],
            "xaiExplanation": "Sensitive data was detected in plaintext. This violates compliance requirements.",
            "remediation": "Mask and audit trail.",
            "autoRemediated": True
        }
    return details

# --- Ask Screen Chat Endpoints ---

chat_history = []

from datetime import datetime
from fastapi import Request

@app.post("/api/ask")
def ask_llm(request: Request):
    import asyncio
    async def get_body():
        return await request.json()
    body = asyncio.run(get_body())
    user_message = body.get("message", "")
    timestamp = datetime.utcnow().isoformat() + "Z"
    chat_history.append({"role": "user", "content": user_message, "timestamp": timestamp})
    prompt = (
        f"You are VISTA's regulatory assistant AI for Indian compliance. Answer the following user question with regulatory accuracy and context, markdown formatting, and XAI explanations if relevant.\n"
        f"User: {user_message}"
    )
    llm_response = call_groq(prompt)
    response_timestamp = datetime.utcnow().isoformat() + "Z"
    chat_history.append({"role": "assistant", "content": llm_response, "timestamp": response_timestamp})

    # Generate next-stage suggested questions based on the answer
    def generate_suggested_questions(answer):
        # For demo: simple logic to suggest follow-ups based on keywords
        if "aadhaar" in answer.lower():
            return [
                "What are the penalties for Aadhaar data exposure?",
                "How can I mask Aadhaar numbers in my system?",
                "What are UIDAI's latest compliance guidelines?"
            ]
        elif "pci" in answer.lower():
            return [
                "How do I achieve PCI DSS certification?",
                "What are the key PCI DSS controls?",
                "How to handle PCI DSS audits in India?"
            ]
        elif "rbi" in answer.lower():
            return [
                "What is RBI's data localization policy?",
                "How do I comply with RBI security guidelines?",
                "What are RBI's requirements for payment data?"
            ]
        else:
            return [
                "What are my current critical compliance violations?",
                "How do I remediate Aadhaar exposure findings?",
                "Explain RBI data localization requirements"
            ]

    suggested_questions = generate_suggested_questions(llm_response)

    return {
        "role": "assistant",
        "content": llm_response,
        "timestamp": response_timestamp,
        "suggested_questions": suggested_questions
    }

@app.get("/api/ask/history")
def get_chat_history():
    return chat_history[-20:]  # return last 20 messages

# --- Regulatory Watcher Endpoints ---
import random

watcher_sources = [
    {
        "id": "src-rbi",
        "name": "Reserve Bank of India Circulars",
        "shortName": "RBI",
        "enabled": True,
        "lastCheck": None,
        "changesDetected": 0,
        "status": "uptodate"
    },
    {
        "id": "src-dpdp",
        "name": "DPDP Act Notifications",
        "shortName": "DPDP",
        "enabled": True,
        "lastCheck": None,
        "changesDetected": 0,
        "status": "uptodate"
    },
    {
        "id": "src-npci",
        "name": "NPCI/UPI Guidelines",
        "shortName": "NPCI/UPI",
        "enabled": True,
        "lastCheck": None,
        "changesDetected": 0,
        "status": "uptodate"
    },
    {
        "id": "src-cert",
        "name": "CERT-In Directions",
        "shortName": "CERT-In",
        "enabled": False,
        "lastCheck": None,
        "changesDetected": 0,
        "status": "disabled"
    }
]

watcher_debates = []

@app.get("/api/watcher/sources")
def get_watcher_sources():
    return watcher_sources

@app.get("/api/watcher/debates")
def get_watcher_debates():
    return watcher_debates

@app.post("/api/watcher/run_check")
def run_watcher_check():
    # Simulate scan: update sources, possibly add a new debate
    import datetime
    now = datetime.datetime.utcnow().isoformat() + "Z"
    for src in watcher_sources:
        if src["enabled"]:
            src["lastCheck"] = now
            src["status"] = random.choice(["processing", "uptodate"])
            src["changesDetected"] = random.randint(0, 3)
        else:
            src["status"] = "disabled"

    # 60% chance to add a new debate
    if random.random() > 0.4:
        prompt = (
            "Generate a JSON object for a new regulatory debate detected by an AI Watcher agent in India. "
            "Fields: regulationId, regulationTitle, source, sourceUrl, summary, proposer (object with agent, position, reasoning, confidence), "
            "critic (object with agent, position, reasoning, confidence), judge (object with agent, verdict, decision, controlId, requirement, reasoning), "
            "consensus (bool), confidence (int), controlId, requirement, status (interpreting), priority (low/medium/high/critical), affectedSystems (list), complianceDeadline (date ISO), timestamp (ISO string). "
            "Example: {\"regulationId\":\"RBI/2026-26/123\",...}"
        )
        result = call_groq(prompt)
        try:
            debate = json.loads(result)
        except Exception:
            debate = {
                "regulationId": f"RBI/2026-26/{random.randint(100,999)}",
                "regulationTitle": "RBI Tokenization Mandate - Card-on-File Extension",
                "source": "RBI",
                "sourceUrl": "https://rbi.org.in/Scripts/NotificationUser.aspx",
                "summary": "Extension of tokenization mandate to include recurring payments and subscription services",
                "proposer": {
                    "agent": "Proposer Agent",
                    "position": "All recurring payment tokens must be device-bound. Recommend blocking all non-tokenized recurring transactions immediately.",
                    "reasoning": [
                        "RBI circular mandates token-based processing for all CoF transactions",
                        "Previous deadline was extended multiple times - no further extensions expected",
                        "Penalty risk for continued non-compliance"
                    ],
                    "confidence": 94
                },
                "critic": {
                    "agent": "Critic Agent",
                    "position": "Device binding for recurring payments is impractical. Subscription renewals happen without user device interaction. Need server-to-server token validation.",
                    "reasoning": [
                        "Recurring payments are initiated by merchant, not customer device",
                        "Device binding would break auto-renewal flows",
                        "Industry practice allows merchant-initiated transactions with different token type"
                    ],
                    "confidence": 89
                },
                "judge": {
                    "agent": "Judge Agent",
                    "verdict": "PRACTICAL_IMPLEMENTATION",
                    "decision": "Device-bound tokens for customer-initiated payments. Network tokens with merchant authentication for recurring/subscription payments. Implement audit trail for all token types.",
                    "controlId": "CTL-RBI-TOKEN-001",
                    "requirement": "Tokenization with device binding for interactive, network tokens for recurring payments",
                    "reasoning": [
                        "Balances security requirement with operational necessity",
                        "Aligns with card network tokenization standards",
                        "Provides clear audit trail for compliance verification"
                    ]
                },
                "consensus": True,
                "confidence": 92,
                "controlId": "CTL-RBI-TOKEN-001",
                "requirement": "Tokenization with device binding for interactive, network tokens for recurring payments",
                "status": "interpreting",
                "priority": "high",
                "affectedSystems": ["Payment Gateway", "Subscription Service", "Token Vault"],
                "complianceDeadline": "2026-03-31",
                "timestamp": now
            }
        watcher_debates.append({"id": f"deb-{random.randint(1000,9999)}", **debate})
    return {"sources": watcher_sources, "debates": watcher_debates}

# To run the server, use: uvicorn backend-llm:app --reload
