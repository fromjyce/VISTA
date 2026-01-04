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

# Add more endpoints for other dashboard data as needed

# To run the server, use: uvicorn backend-llm:app --reload
