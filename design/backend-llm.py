from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
from datetime import datetime, timedelta
from typing import List, Optional

app = FastAPI()

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

@app.get("/api/compliance")
def get_compliance_data():
    # Simulate realistic compliance data
    data = ComplianceData(
        compliance_score=random.randint(70, 100),
        critical_issues=random.randint(0, 10),
        at_risk=random.randint(0, 20),
        passing_controls=random.randint(50, 100)
    )
    return data

@app.get("/api/system_liveness")
def get_system_liveness():
    agents = [
        AgentStatus(name="Watcher", status="active", last_sync="2 min ago", items="5 sources"),
        AgentStatus(name="Interpreter", status="active", last_sync="5 min ago", items="3 pending"),
        AgentStatus(name="Monitor", status="active", last_sync="1 min ago", items="10 findings"),
        AgentStatus(name="Remediator", status="active", last_sync="8 min ago", items="2 fixed"),
        AgentStatus(name="Learning", status="active", last_sync="1 hr ago", items="92% accuracy"),
    ]
    return agents

@app.get("/api/compliance_trend")
def get_compliance_trend():
    trend = [
        ComplianceTrend(date="Jan 1", score=82),
        ComplianceTrend(date="Jan 2", score=85),
        ComplianceTrend(date="Jan 3", score=83),
        ComplianceTrend(date="Jan 4", score=87),
        ComplianceTrend(date="Jan 5", score=90),
    ]
    return trend

@app.get("/api/violations")
def get_violations_by_category():
    categories = [
        ViolationCategory(name="PCI DSS", value=5),
        ViolationCategory(name="DPDP/UIDAI", value=3),
        ViolationCategory(name="RBI/NPCI", value=4),
    ]
    return categories

@app.get("/api/recent_findings")
def get_recent_findings():
    findings = [
        Finding(id="F001", type="PCI", source="System A", status="Open", timestamp="2 min ago"),
        Finding(id="F002", type="DPDP", source="System B", status="Fixing", timestamp="5 min ago"),
        Finding(id="F003", type="RBI", source="System C", status="Reviewing", timestamp="10 min ago"),
    ]
    return findings

# Add more endpoints for other dashboard data as needed

# To run the server, use: uvicorn backend-llm:app --reload
