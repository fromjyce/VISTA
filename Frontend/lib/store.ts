/**
 * VISTA Shared Store - Cross-page state management for compliance logging
 *
 * This store loads data from local mock JSON files.
 * For backend integration, replace the JSON imports with API calls.
 */

// Import mock data
import regulatorySourcesData from '@/mockdata/regulatory-sources.json'
import debatesData from '@/mockdata/debates.json'
import findingsData from '@/mockdata/findings.json'
import dataSourcesData from '@/mockdata/data-sources.json'
import xaiLogsData from '@/mockdata/xai-logs.json'

// Types matching India-based mock data structure
export interface DebateEntry {
  id: string
  timestamp: Date
  regulationId: string
  regulationTitle: string
  source: string
  sourceUrl?: string
  summary?: string
  proposer: string | { agent: string; position: string; reasoning: string[]; confidence: number }
  critic: string | { agent: string; position: string; reasoning: string[]; confidence: number }
  judge: string | { agent: string; verdict: string; decision: string; controlId: string; requirement: string; reasoning: string[] }
  consensus: boolean
  confidence: number
  controlId: string
  requirement: string
  status: "interpreting" | "approved" | "rejected"
  priority?: "low" | "medium" | "high" | "critical"
  affectedSystems?: string[]
  complianceDeadline?: string
}

export interface ReasoningStep {
  step: number
  phase: string
  detail: string
  timestamp: string
}

export interface ComplianceFinding {
  id: string
  timestamp: Date
  type: string
  source: string
  sourceFile?: string
  severity: "critical" | "warning" | "info"
  status: "open" | "fixing" | "fixed" | "reviewing"
  extracted: string
  fullMatch?: string
  requirement: string
  regulation?: string
  reasoningChain: string[] | ReasoningStep[]
  remediation: string | { action: string; scheduled: string | null; assignee: string; ticket: string; completedAt?: string }
  xaiExplanation: string
  autoRemediated: boolean
  matchLocation?: {
    file: string
    row: number | null
    column: string
    context: string
  }
}

export interface ComplianceSource {
  id: string
  name: string
  shortName: string
  description?: string
  enabled: boolean
  lastCheck: Date | null
  changesDetected: number
  status: "uptodate" | "processing" | "error" | "disabled"
  category?: string
  jurisdiction?: string
  url?: string
}

export interface ChatMessage {
  id: string
  timestamp: Date
  role: "user" | "assistant" | "system"
  content: string
  relatedFindings?: string[]
  relatedDebates?: string[]
  actions?: ChatAction[]
}

export interface ChatAction {
  id: string
  label: string
  type: "view_finding" | "view_debate" | "create_task" | "export_report"
  targetId?: string
}

export interface DataSource {
  id: string
  name: string
  type: "email" | "chat" | "database" | "api" | "file" | "transaction"
  subType?: string
  description?: string
  content: string
  addedAt: Date
  lastScanned?: Date | null
  status?: "pending" | "scanning" | "scanned" | "error"
  findingsCount?: number
  recordCount?: number
  fileInfo?: {
    fileName: string
    fileSize: number
    mimeType: string
  }
}

export interface XAILogs {
  regulatoryUpdates: any[]
  debateLogs: any[]
  findingLogs: any[]
  remediationLogs: any[]
  systemLogs: any[]
  knowledgeBase: any
}

// Helper to parse dates from JSON
const parseDate = (dateStr: string | null): Date | null => {
  return dateStr ? new Date(dateStr) : null
}

// Store class for managing all VISTA data
class VistaStore {
  private debates: DebateEntry[] = []
  private findings: ComplianceFinding[] = []
  private sources: ComplianceSource[] = []
  private chatHistory: ChatMessage[] = []
  private dataSources: DataSource[] = []
  private xaiLogs: XAILogs | null = null
  private listeners: Set<() => void> = new Set()

  constructor() {
    this.initializeFromMockData()
  }

  private initializeFromMockData() {
    // Load regulatory sources from India-based mock data
    this.sources = regulatorySourcesData.sources.map(s => ({
      id: s.id,
      name: s.name,
      shortName: s.shortName,
      description: s.description,
      enabled: s.enabled,
      lastCheck: parseDate(s.lastCheck),
      changesDetected: s.changesDetected,
      status: s.status as ComplianceSource["status"],
      category: s.category,
      jurisdiction: s.jurisdiction,
      url: s.url
    }))

    // Load debates from mock data
    this.debates = debatesData.debates.map(d => ({
      id: d.id,
      timestamp: new Date(d.timestamp),
      regulationId: d.regulationId,
      regulationTitle: d.regulationTitle,
      source: d.source,
      sourceUrl: d.sourceUrl,
      summary: d.summary,
      proposer: d.proposer,
      critic: d.critic,
      judge: d.judge,
      consensus: d.consensus,
      confidence: d.confidence,
      controlId: d.judge.controlId,
      requirement: d.judge.requirement,
      status: d.status as DebateEntry["status"],
      priority: d.priority as DebateEntry["priority"],
      affectedSystems: d.affectedSystems,
      complianceDeadline: d.complianceDeadline
    }))

    // Load findings from mock data
    this.findings = findingsData.findings.map(f => ({
      id: f.id,
      timestamp: new Date(f.timestamp),
      type: f.type,
      source: f.source,
      sourceFile: f.sourceFile,
      severity: f.severity as ComplianceFinding["severity"],
      status: f.status as ComplianceFinding["status"],
      extracted: f.extracted,
      fullMatch: f.fullMatch,
      requirement: f.requirement,
      regulation: f.regulation,
      reasoningChain: f.reasoningChain,
      remediation: f.remediation,
      xaiExplanation: f.xaiExplanation,
      autoRemediated: f.autoRemediated,
      matchLocation: f.matchLocation
    }))

    // Load data sources from mock data
    this.dataSources = dataSourcesData.dataSources.map(ds => ({
      id: ds.id,
      name: ds.name,
      type: ds.type as DataSource["type"],
      subType: ds.subType,
      description: ds.description,
      content: ds.sampleContent,
      addedAt: new Date(ds.addedAt),
      lastScanned: parseDate(ds.lastScanned),
      status: ds.status as DataSource["status"],
      findingsCount: ds.findingsCount,
      recordCount: ds.recordCount,
      fileInfo: ds.fileInfo
    }))

    // Load XAI logs
    this.xaiLogs = {
      regulatoryUpdates: xaiLogsData.regulatoryUpdates,
      debateLogs: xaiLogsData.debateLogs,
      findingLogs: xaiLogsData.findingLogs,
      remediationLogs: xaiLogsData.remediationLogs,
      systemLogs: xaiLogsData.systemLogs,
      knowledgeBase: xaiLogsData.knowledgeBase
    }

    // Initialize welcome chat message with India context
    this.chatHistory = [
      {
        id: "MSG-001",
        timestamp: new Date(),
        role: "system",
        content: `Welcome to VISTA's Regulatory Q&A. I'm an AI compliance assistant with access to Indian regulatory frameworks including RBI guidelines, DPDP Act 2023, CERT-In directions, PCI DSS, PMLA, and NPCI/UPI regulations. I have loaded ${this.findings.length} compliance findings and ${this.debates.length} regulatory debates from your system. Ask me anything about compliance requirements or your current compliance status.`
      }
    ]
  }

  // Notify all listeners of state change
  private notify() {
    this.listeners.forEach(listener => listener())
  }

  // Subscribe to store changes
  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  // XAI Logs
  getXAILogs() { return this.xaiLogs }

  getKnowledgeBase() { return this.xaiLogs?.knowledgeBase || null }

  getDebateLogs() { return this.xaiLogs?.debateLogs || [] }

  getFindingLogs() { return this.xaiLogs?.findingLogs || [] }

  // Debates
  getDebates() { return [...this.debates] }

  addDebate(debate: Omit<DebateEntry, "id" | "timestamp">) {
    const newDebate: DebateEntry = {
      ...debate,
      id: `DEB-2026-${String(this.debates.length + 1).padStart(3, "0")}`,
      timestamp: new Date()
    }
    this.debates.unshift(newDebate)
    this.notify()
    return newDebate
  }

  updateDebateStatus(id: string, status: DebateEntry["status"]) {
    const debate = this.debates.find(d => d.id === id)
    if (debate) {
      debate.status = status
      this.notify()
    }
  }

  // Findings
  getFindings() { return [...this.findings] }

  addFinding(finding: Omit<ComplianceFinding, "id" | "timestamp">) {
    const newFinding: ComplianceFinding = {
      ...finding,
      id: `FND-2026-${String(this.findings.length + 1).padStart(3, "0")}`,
      timestamp: new Date()
    }
    this.findings.unshift(newFinding)
    this.notify()
    return newFinding
  }

  updateFindingStatus(id: string, status: ComplianceFinding["status"]) {
    const finding = this.findings.find(f => f.id === id)
    if (finding) {
      finding.status = status
      this.notify()
    }
  }

  // Sources
  getSources() { return [...this.sources] }

  toggleSource(id: string) {
    const source = this.sources.find(s => s.id === id)
    if (source) {
      source.enabled = !source.enabled
      source.status = source.enabled ? "uptodate" : "disabled"
      if (!source.enabled) {
        source.lastCheck = null
      }
      this.notify()
    }
  }

  updateSourceStatus(id: string, status: ComplianceSource["status"], changes?: number) {
    const source = this.sources.find(s => s.id === id)
    if (source) {
      source.status = status
      source.lastCheck = new Date()
      if (changes !== undefined) {
        source.changesDetected = changes
      }
      this.notify()
    }
  }

  // Chat
  getChatHistory() { return [...this.chatHistory] }

  addChatMessage(message: Omit<ChatMessage, "id" | "timestamp">) {
    const newMessage: ChatMessage = {
      ...message,
      id: `MSG-${String(this.chatHistory.length + 1).padStart(3, "0")}`,
      timestamp: new Date()
    }
    this.chatHistory.push(newMessage)
    this.notify()
    return newMessage
  }

  clearChatHistory() {
    this.chatHistory = [this.chatHistory[0]] // Keep welcome message
    this.notify()
  }

  // Data Sources
  getDataSources() { return [...this.dataSources] }

  addDataSource(source: Omit<DataSource, "id" | "addedAt">) {
    const newSource: DataSource = {
      ...source,
      id: `DS-2026-${String(this.dataSources.length + 1).padStart(3, "0")}`,
      addedAt: new Date(),
      status: "pending",
      findingsCount: 0
    }
    this.dataSources.push(newSource)
    this.notify()
    return newSource
  }

  updateDataSourceStatus(id: string, status: DataSource["status"], findingsCount?: number) {
    const source = this.dataSources.find(s => s.id === id)
    if (source) {
      source.status = status
      source.lastScanned = new Date()
      if (findingsCount !== undefined) {
        source.findingsCount = (source.findingsCount || 0) + findingsCount
      }
      this.notify()
    }
  }

  removeDataSource(id: string) {
    this.dataSources = this.dataSources.filter(s => s.id !== id)
    this.notify()
  }

  // Get summary stats
  getStats() {
    const criticalOpen = this.findings.filter(f => f.severity === "critical" && f.status === "open").length
    const warningOpen = this.findings.filter(f => f.severity === "warning" && f.status === "open").length

    return {
      totalDebates: this.debates.length,
      pendingDebates: this.debates.filter(d => d.status === "interpreting").length,
      approvedDebates: this.debates.filter(d => d.status === "approved").length,
      totalFindings: this.findings.length,
      criticalFindings: criticalOpen,
      warningFindings: warningOpen,
      fixedFindings: this.findings.filter(f => f.status === "fixed").length,
      enabledSources: this.sources.filter(s => s.enabled).length,
      totalSources: this.sources.length,
      totalDataSources: this.dataSources.length,
      // Compliance score calculation
      complianceScore: Math.max(0, Math.min(100, 100 - (criticalOpen * 15) - (warningOpen * 5)))
    }
  }

  // Search XAI logs for chatbot context
  searchXAIContext(query: string) {
    const results: any[] = []
    const q = query.toLowerCase()

    // Search knowledge base for regulations
    if (this.xaiLogs?.knowledgeBase) {
      const kb = this.xaiLogs.knowledgeBase

      // Search regulations
      Object.entries(kb.regulations || {}).forEach(([key, reg]: [string, any]) => {
        if (key.toLowerCase().includes(q) ||
            reg.fullName?.toLowerCase().includes(q)) {
          results.push({ type: 'regulation', key, data: reg })
        }
      })

      // Search Indian PII types
      Object.entries(kb.indianPII || {}).forEach(([key, pii]: [string, any]) => {
        if (key.toLowerCase().includes(q) ||
            pii.description?.toLowerCase().includes(q)) {
          results.push({ type: 'pii_type', key, data: pii })
        }
      })
    }

    // Search debate logs
    this.xaiLogs?.debateLogs.forEach(debate => {
      if (debate.regulation?.toLowerCase().includes(q)) {
        results.push({ type: 'debate_log', data: debate })
      }
    })

    // Search finding logs
    this.xaiLogs?.findingLogs.forEach(finding => {
      if (finding.dataType?.toLowerCase().includes(q) ||
          finding.source?.toLowerCase().includes(q)) {
        results.push({ type: 'finding_log', data: finding })
      }
    })

    return results
  }
}

// Singleton instance
export const vistaStore = new VistaStore()

// React hook for using the store
import { useState, useEffect } from "react"

export function useVistaStore() {
  const [, setTick] = useState(0)

  useEffect(() => {
    const unsubscribe = vistaStore.subscribe(() => setTick(t => t + 1))
    return unsubscribe
  }, [])

  return vistaStore
}
