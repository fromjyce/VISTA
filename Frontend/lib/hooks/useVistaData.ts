/**
 * VISTA Data Hooks
 *
 * These hooks provide a clean interface for fetching and managing data.
 * Currently uses local mock data, but designed for easy backend integration.
 *
 * To integrate with backend:
 * 1. Replace the import paths with API calls
 * 2. Add proper error handling
 * 3. Implement caching as needed
 */

import { useState, useEffect, useCallback } from 'react'

// Types
export interface RegulatorySoruce {
  id: string
  name: string
  shortName: string
  description: string
  enabled: boolean
  lastCheck: string | null
  changesDetected: number
  status: 'uptodate' | 'processing' | 'error' | 'disabled'
  category: string
  jurisdiction: string
  url: string
}

export interface DebatePhase {
  agent: string
  position: string
  reasoning: string[]
  confidence: number
}

export interface JudgeVerdict {
  agent: string
  verdict: string
  decision: string
  controlId: string
  requirement: string
  reasoning: string[]
}

export interface Debate {
  id: string
  timestamp: string
  regulationId: string
  regulationTitle: string
  source: string
  sourceUrl: string
  summary: string
  proposer: DebatePhase
  critic: DebatePhase
  judge: JudgeVerdict
  consensus: boolean
  confidence: number
  status: 'interpreting' | 'approved' | 'rejected'
  priority: 'low' | 'medium' | 'high' | 'critical'
  affectedSystems: string[]
  complianceDeadline: string
}

export interface ReasoningStep {
  step: number
  phase: string
  detail: string
  timestamp: string
}

export interface Finding {
  id: string
  timestamp: string
  type: string
  source: string
  sourceFile: string
  severity: 'critical' | 'warning' | 'info'
  status: 'open' | 'fixing' | 'reviewing' | 'fixed'
  extracted: string
  fullMatch: string
  requirement: string
  regulation: string
  reasoningChain: ReasoningStep[]
  remediation: {
    action: string
    scheduled: string | null
    assignee: string
    ticket: string
    completedAt?: string
  }
  xaiExplanation: string
  autoRemediated: boolean
  matchLocation: {
    file: string
    row: number | null
    column: string
    context: string
  }
}

export interface DataSource {
  id: string
  name: string
  type: 'file' | 'database' | 'api' | 'email' | 'chat' | 'transaction'
  subType: string
  description: string
  addedAt: string
  lastScanned: string | null
  status: 'pending' | 'scanning' | 'scanned' | 'error'
  findingsCount: number
  recordCount: number
  fileInfo?: {
    fileName: string
    fileSize: number
    mimeType: string
  }
  connectionInfo?: {
    host: string
    database: string
    table: string
  }
  apiInfo?: {
    endpoint: string
    method: string
    authType: string
  }
  sampleContent: string
}

export interface XAILog {
  id: string
  timestamp: string
  type: string
  source?: string
  regulation?: string
  title?: string
  summary?: string
  impact?: string
  affectedControls?: string[]
  xaiReasoning?: {
    trigger?: string
    analysis?: string[]
    recommendation?: string
    confidence?: number
  }
}

// Mock data imports - Replace these with API calls for backend integration
import regulatorySourcesData from '@/mockdata/regulatory-sources.json'
import debatesData from '@/mockdata/debates.json'
import findingsData from '@/mockdata/findings.json'
import dataSourcesData from '@/mockdata/data-sources.json'
import xaiLogsData from '@/mockdata/xai-logs.json'

// Simulated API delay for realistic feel
const simulateApiDelay = (ms: number = 300) =>
  new Promise(resolve => setTimeout(resolve, ms + Math.random() * 200))

/**
 * Hook for fetching regulatory sources
 */
export function useRegulatorySources() {
  const [sources, setSources] = useState<RegulatorySoruce[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSources = useCallback(async () => {
    try {
      setLoading(true)
      // TODO: Replace with API call
      // const response = await fetch('/api/regulatory-sources')
      await simulateApiDelay()
      setSources(regulatorySourcesData.sources as RegulatorySoruce[])
      setError(null)
    } catch (err) {
      setError('Failed to fetch regulatory sources')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const toggleSource = useCallback(async (id: string) => {
    // TODO: Replace with API call
    // await fetch(`/api/regulatory-sources/${id}/toggle`, { method: 'POST' })
    setSources(prev => prev.map(s =>
      s.id === id
        ? { ...s, enabled: !s.enabled, status: !s.enabled ? 'uptodate' : 'disabled' as const }
        : s
    ))
  }, [])

  const refreshSource = useCallback(async (id: string) => {
    // Simulate checking source
    setSources(prev => prev.map(s =>
      s.id === id ? { ...s, status: 'processing' as const } : s
    ))

    await simulateApiDelay(2000)

    const changes = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0
    setSources(prev => prev.map(s =>
      s.id === id
        ? {
            ...s,
            status: 'uptodate' as const,
            lastCheck: new Date().toISOString(),
            changesDetected: changes
          }
        : s
    ))

    return changes
  }, [])

  useEffect(() => {
    fetchSources()
  }, [fetchSources])

  return { sources, loading, error, toggleSource, refreshSource, refetch: fetchSources }
}

/**
 * Hook for fetching debates
 */
export function useDebates() {
  const [debates, setDebates] = useState<Debate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDebates = useCallback(async () => {
    try {
      setLoading(true)
      // TODO: Replace with API call
      await simulateApiDelay()
      setDebates(debatesData.debates as Debate[])
      setError(null)
    } catch (err) {
      setError('Failed to fetch debates')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateDebateStatus = useCallback(async (id: string, status: Debate['status']) => {
    // TODO: Replace with API call
    setDebates(prev => prev.map(d =>
      d.id === id ? { ...d, status } : d
    ))
  }, [])

  const addDebate = useCallback(async (debate: Omit<Debate, 'id' | 'timestamp'>) => {
    const newDebate: Debate = {
      ...debate,
      id: `DEB-2026-${String(debates.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString()
    }
    setDebates(prev => [newDebate, ...prev])
    return newDebate
  }, [debates.length])

  useEffect(() => {
    fetchDebates()
  }, [fetchDebates])

  return { debates, loading, error, updateDebateStatus, addDebate, refetch: fetchDebates }
}

/**
 * Hook for fetching findings
 */
export function useFindings() {
  const [findings, setFindings] = useState<Finding[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFindings = useCallback(async () => {
    try {
      setLoading(true)
      // TODO: Replace with API call
      await simulateApiDelay()
      setFindings(findingsData.findings as Finding[])
      setError(null)
    } catch (err) {
      setError('Failed to fetch findings')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateFindingStatus = useCallback(async (id: string, status: Finding['status']) => {
    // TODO: Replace with API call
    setFindings(prev => prev.map(f =>
      f.id === id ? { ...f, status } : f
    ))
  }, [])

  const addFinding = useCallback(async (finding: Omit<Finding, 'id' | 'timestamp'>) => {
    const newFinding: Finding = {
      ...finding,
      id: `FND-2026-${String(findings.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString()
    }
    setFindings(prev => [newFinding, ...prev])
    return newFinding
  }, [findings.length])

  useEffect(() => {
    fetchFindings()
  }, [fetchFindings])

  // Summary stats
  const stats = {
    total: findings.length,
    critical: findings.filter(f => f.severity === 'critical').length,
    warning: findings.filter(f => f.severity === 'warning').length,
    open: findings.filter(f => f.status === 'open').length,
    fixed: findings.filter(f => f.status === 'fixed').length,
    autoRemediated: findings.filter(f => f.autoRemediated).length
  }

  return { findings, loading, error, stats, updateFindingStatus, addFinding, refetch: fetchFindings }
}

/**
 * Hook for fetching data sources
 */
export function useDataSources() {
  const [dataSources, setDataSources] = useState<DataSource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDataSources = useCallback(async () => {
    try {
      setLoading(true)
      // TODO: Replace with API call
      await simulateApiDelay()
      setDataSources(dataSourcesData.dataSources as DataSource[])
      setError(null)
    } catch (err) {
      setError('Failed to fetch data sources')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const addDataSource = useCallback(async (source: Omit<DataSource, 'id' | 'addedAt' | 'lastScanned' | 'status' | 'findingsCount'>) => {
    const newSource: DataSource = {
      ...source,
      id: `DS-2026-${String(dataSources.length + 1).padStart(3, '0')}`,
      addedAt: new Date().toISOString(),
      lastScanned: null,
      status: 'pending',
      findingsCount: 0
    }
    setDataSources(prev => [...prev, newSource])
    return newSource
  }, [dataSources.length])

  const removeDataSource = useCallback(async (id: string) => {
    // TODO: Replace with API call
    setDataSources(prev => prev.filter(s => s.id !== id))
  }, [])

  const scanDataSource = useCallback(async (id: string): Promise<number> => {
    // Update status to scanning
    setDataSources(prev => prev.map(s =>
      s.id === id ? { ...s, status: 'scanning' as const } : s
    ))

    await simulateApiDelay(3000)

    // Simulate finding detection
    const findingsDetected = Math.floor(Math.random() * 3)

    setDataSources(prev => prev.map(s =>
      s.id === id
        ? {
            ...s,
            status: 'scanned' as const,
            lastScanned: new Date().toISOString(),
            findingsCount: s.findingsCount + findingsDetected
          }
        : s
    ))

    return findingsDetected
  }, [])

  useEffect(() => {
    fetchDataSources()
  }, [fetchDataSources])

  return { dataSources, loading, error, addDataSource, removeDataSource, scanDataSource, refetch: fetchDataSources }
}

/**
 * Hook for XAI logs - used by Ask Regulator chatbot
 */
export function useXAILogs() {
  const [logs, setLogs] = useState<typeof xaiLogsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true)
      // TODO: Replace with API call
      await simulateApiDelay(100)
      setLogs(xaiLogsData)
      setError(null)
    } catch (err) {
      setError('Failed to fetch XAI logs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  // Helper functions for chatbot context
  const getRecentRegulatorytUpdates = useCallback(() => {
    return logs?.regulatoryUpdates || []
  }, [logs])

  const getDebateLogs = useCallback(() => {
    return logs?.debateLogs || []
  }, [logs])

  const getFindingLogs = useCallback(() => {
    return logs?.findingLogs || []
  }, [logs])

  const getRemediationLogs = useCallback(() => {
    return logs?.remediationLogs || []
  }, [logs])

  const getKnowledgeBase = useCallback(() => {
    return logs?.knowledgeBase || null
  }, [logs])

  const searchLogs = useCallback((query: string) => {
    if (!logs) return []

    const results: Array<{ type: string; data: any; relevance: number }> = []
    const q = query.toLowerCase()

    // Search regulatory updates
    logs.regulatoryUpdates.forEach(update => {
      if (update.title.toLowerCase().includes(q) ||
          update.summary.toLowerCase().includes(q) ||
          update.regulation.toLowerCase().includes(q)) {
        results.push({ type: 'regulatory_update', data: update, relevance: 1 })
      }
    })

    // Search debate logs
    logs.debateLogs.forEach(debate => {
      if (debate.regulation.toLowerCase().includes(q)) {
        results.push({ type: 'debate', data: debate, relevance: 0.9 })
      }
    })

    // Search finding logs
    logs.findingLogs.forEach(finding => {
      if (finding.dataType.toLowerCase().includes(q) ||
          finding.source.toLowerCase().includes(q)) {
        results.push({ type: 'finding', data: finding, relevance: 0.8 })
      }
    })

    return results.sort((a, b) => b.relevance - a.relevance)
  }, [logs])

  return {
    logs,
    loading,
    error,
    getRecentRegulatorytUpdates,
    getDebateLogs,
    getFindingLogs,
    getRemediationLogs,
    getKnowledgeBase,
    searchLogs,
    refetch: fetchLogs
  }
}

/**
 * Combined hook for dashboard stats
 */
export function useDashboardStats() {
  const { findings } = useFindings()
  const { debates } = useDebates()
  const { sources } = useRegulatorySources()
  const { dataSources } = useDataSources()

  const stats = {
    // Findings
    totalFindings: findings.length,
    criticalFindings: findings.filter(f => f.severity === 'critical' && f.status === 'open').length,
    warningFindings: findings.filter(f => f.severity === 'warning' && f.status === 'open').length,
    fixedFindings: findings.filter(f => f.status === 'fixed').length,
    autoRemediatedCount: findings.filter(f => f.autoRemediated).length,

    // Debates
    totalDebates: debates.length,
    pendingDebates: debates.filter(d => d.status === 'interpreting').length,
    approvedDebates: debates.filter(d => d.status === 'approved').length,

    // Sources
    enabledSources: sources.filter(s => s.enabled).length,
    totalSources: sources.length,
    processingSourcess: sources.filter(s => s.status === 'processing').length,

    // Data Sources
    totalDataSources: dataSources.length,
    scannedDataSources: dataSources.filter(s => s.status === 'scanned').length,

    // Compliance Score (calculated)
    complianceScore: Math.max(0, Math.min(100,
      100 -
      (findings.filter(f => f.severity === 'critical' && f.status === 'open').length * 15) -
      (findings.filter(f => f.severity === 'warning' && f.status === 'open').length * 5)
    ))
  }

  return stats
}

/**
 * Hook for file upload handling
 */
export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const uploadFile = useCallback(async (file: File): Promise<{ content: string; metadata: any }> => {
    setUploading(true)
    setProgress(0)

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100))
        }
      }

      reader.onload = async (e) => {
        const content = e.target?.result as string

        // Simulate processing delay
        await simulateApiDelay(500)

        const metadata = {
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          uploadedAt: new Date().toISOString(),
          lineCount: content.split('\n').length,
          charCount: content.length
        }

        setUploading(false)
        setProgress(100)

        resolve({ content, metadata })
      }

      reader.onerror = () => {
        setUploading(false)
        reject(new Error('Failed to read file'))
      }

      reader.readAsText(file)
    })
  }, [])

  return { uploadFile, uploading, progress }
}
