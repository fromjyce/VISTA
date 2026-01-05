"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  RefreshCw,
  Download,
  Play,
  Settings,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Brain,
  Scale,
  FileText,
  AlertTriangle,
  Loader2
} from "lucide-react"

import { useState, useCallback, useEffect } from "react"

export default function WatcherPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [expandedDebate, setExpandedDebate] = useState<string | null>(null)
  const [runningPhase, setRunningPhase] = useState<string>("")

  const [sources, setSources] = useState<any[]>([])
  const [debates, setDebates] = useState<any[]>([])

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      const sourcesRes = await fetch("http://localhost:8000/api/watcher/sources")
      const sourcesData = await sourcesRes.json()
      setSources(sourcesData)

      const debatesRes = await fetch("http://localhost:8000/api/watcher/debates")
      const debatesData = await debatesRes.json()
      // Only load pending debates on initial load
      setDebates(debatesData.filter((d: any) => d.status === "interpreting"))
    }
    loadData()
  }, [])

  // Simulate running compliance check
  const handleRunCheck = useCallback(async () => {
    setIsRunning(true)

    // Phase 1: Fetching from sources
    setRunningPhase("Initializing Watcher Agent...")
    await new Promise(r => setTimeout(r, 800))

    // Call backend run_check
    setRunningPhase("Running AI Watcher scan...")
    const res = await fetch("http://localhost:8000/api/watcher/run_check", { method: "POST" })
    const data = await res.json()

    // Filter out old approved/rejected debates and only add new ones
    const newDebates = data.debates.filter((newD: any) => 
      !debates.some(existingD => existingD.id === newD.id)
    )

    // Update sources and debates from backend
    setSources(data.sources)
    setDebates(prev => [...prev.filter((d: any) => d.status === "interpreting"), ...newDebates])

    setRunningPhase("Check complete!")
    await new Promise(r => setTimeout(r, 500))

    setIsRunning(false)
    setRunningPhase("")
  }, [])

  // Generate India-based mock debate (no longer used, kept for reference)
  // const generateMockDebate = (): Omit<any, "id" | "timestamp"> => { ... }

  // Helper to get debate text (handles both string and object format)
  const getDebateText = (content: string | { position: string; reasoning?: string[] }): string => {
    if (typeof content === 'string') return content
    return content.position
  }

  // Helper to get judge decision text
  const getJudgeText = (judge: string | { decision: string; verdict?: string }): string => {
    if (typeof judge === 'string') return judge
    return judge.decision
  }

  // Format time ago
  const formatTimeAgo = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const seconds = Math.floor((Date.now() - dateObj.getTime()) / 1000)
    if (seconds < 60) return "Just now"
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`
    return `${Math.floor(seconds / 86400)} days ago`
  }

  // Approve debate
  const handleApproveDebate = (id: string) => {
    setDebates(debates.map((d: any) => d.id === id ? { ...d, status: "approved" } : d))
    // Update corresponding source status to reflect approval
    const debate = debates.find((d: any) => d.id === id)
    if (debate) {
      setSources(sources.map((s: any) => 
        s.shortName === debate.source 
          ? { ...s, status: "uptodate", changes: (s.changes || 0) + 1, lastCheck: new Date().toISOString() }
          : s
      ))
    }
  }

  // Reject debate
  const handleRejectDebate = (id: string) => {
    setDebates(debates.map((d: any) => d.id === id ? { ...d, status: "rejected" } : d))
    // Update corresponding source status to reflect rejection
    const debate = debates.find((d: any) => d.id === id)
    if (debate) {
      setSources(sources.map((s: any) => 
        s.shortName === debate.source 
          ? { ...s, status: "error", changes: 0, lastCheck: new Date().toISOString() }
          : s
      ))
    }
  }

  // Toggle source enabled
  const handleToggleSource = (id: string) => {
    setSources(sources.map((s: any) => s.id === id ? { ...s, enabled: !s.enabled } : s))
  }

  // Export debate log
  const handleExportDebate = (debate: any) => {
    const exportData = {
      ...debate,
      exportedAt: new Date().toISOString(),
      format: "VISTA Regulatory Debate Log"
    }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `vista_debate_${debate.id}_${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-[#1A1F71]/5 via-white to-[#10B981]/5 relative">
      {/* Decorative Background Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-40 right-24 w-[30rem] h-[30rem] bg-[#1A1F71] rounded-full blur-3xl opacity-[0.10]"></div>
        <div className="absolute bottom-32 left-24 w-96 h-96 bg-[#10B981] rounded-full blur-3xl opacity-[0.12]"></div>
        <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-[#8B5CF6] rounded-full blur-3xl opacity-[0.08]"></div>
      </div>

      {/* Top Bar */}
      <div className="border-b bg-card/80 backdrop-blur relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="font-[family-name:var(--font-audiowide)] text-3xl font-bold">Regulatory Watcher</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor regulatory changes with AI Constitutional Debate
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-4 h-4" />
              Sources
              {showSettings ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-gradient-to-r from-[#1A1F71] to-[#1A1F71]/90 hover:shadow-lg transition-all"
              onClick={handleRunCheck}
              disabled={isRunning}
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Check Now
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Running Phase Indicator */}
        {isRunning && (
          <div className="max-w-7xl mx-auto px-8 pb-4">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#8B5CF6]/20 to-[#1A1F71]/20 rounded-lg border border-[#8B5CF6]/30">
              <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse"></div>
              <span className="text-sm font-medium text-[#8B5CF6]">{runningPhase}</span>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8 relative z-10">
        {/* Compliance Sources Settings Panel */}
        {showSettings && (
          <section className="animate-in slide-in-from-top-2 duration-300">
            <Card className="p-6 bg-gradient-to-br from-[#1A1F71]/10 via-white to-[#F7B600]/10 border-2 border-[#1A1F71]/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-[family-name:var(--font-audiowide)] text-lg font-bold">Compliance Sources</h2>
                  <p className="text-sm text-muted-foreground">Toggle regulatory frameworks to monitor</p>
                </div>
                <Badge className="bg-[#1A1F71]/20 text-[#1A1F71] border-[#1A1F71]/30">
                  {sources.filter(s => s.enabled).length}/{sources.length} Active
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {sources.map(source => (
                  <div
                    key={source.id}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      source.enabled
                        ? "bg-gradient-to-r from-[#10B981]/10 to-white border-[#10B981]/30"
                        : "bg-gray-50 border-gray-200 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${source.enabled ? "bg-[#10B981]" : "bg-gray-400"}`}></div>
                      <div>
                        <p className="font-medium text-sm">{source.shortName}</p>
                        <p className="text-xs text-muted-foreground">{source.name}</p>
                      </div>
                    </div>
                    <Switch
                      checked={source.enabled}
                      onCheckedChange={() => handleToggleSource(source.id)}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </section>
        )}

        {/* Monitored Feeds Status */}
        <section>
          <h2 className="font-[family-name:var(--font-audiowide)] text-xl font-bold mb-6">Monitored Feeds</h2>
          <Card className="overflow-hidden bg-white/90 backdrop-blur">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#1A1F71]/10 via-[#F7B600]/10 to-[#10B981]/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Source</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Last Check</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Changes</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {sources.filter((s: any) => s.enabled).map((feed: any) => (
                    <tr key={feed.id} className="hover:bg-gradient-to-r hover:from-[#1A1F71]/5 hover:to-transparent transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                          <div>
                            <p className="text-sm font-medium">{feed.shortName}</p>
                            <p className="text-xs text-muted-foreground">{feed.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {feed.lastCheck ? formatTimeAgo(feed.lastCheck) : "Never"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-mono font-bold ${feed.changesDetected > 0 ? "text-[#F7B600]" : "text-muted-foreground"}`}>
                          {feed.changesDetected}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={feed.status === "processing" ? "secondary" : "default"}
                          className={
                            feed.status === "processing"
                              ? "bg-[#F7B600]/20 text-[#F7B600] border-[#F7B600]/30"
                              : "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30"
                          }
                        >
                          {feed.status === "uptodate" ? "Up to date" : "Processing"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* AI Constitutional Debates */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-[family-name:var(--font-audiowide)] text-xl font-bold">AI Constitutional Debates</h2>
            <Badge className="bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]/30">
              {debates.filter(d => d.status === "interpreting").length} Pending Review
            </Badge>
          </div>

          <div className="space-y-6">
            {debates.filter((d: any) => d.status === "interpreting").map((debate: any) => (
              <Card
                key={debate.id}
                className={`relative overflow-hidden transition-all duration-300 ${
                  debate.status === "interpreting"
                    ? "bg-gradient-to-br from-[#8B5CF6]/15 via-white to-[#1A1F71]/5"
                    : debate.status === "approved"
                      ? "bg-gradient-to-br from-[#10B981]/15 via-white to-[#10B981]/5"
                      : "bg-gradient-to-br from-gray-100 via-white to-gray-50"
                } hover:shadow-2xl`}
              >
                {/* Status corner accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full ${
                  debate.status === "interpreting"
                    ? "bg-gradient-to-bl from-[#8B5CF6]/20 to-transparent"
                    : debate.status === "approved"
                      ? "bg-gradient-to-bl from-[#10B981]/20 to-transparent"
                      : "bg-gradient-to-bl from-gray-200 to-transparent"
                }`}></div>

                {/* Glow effect */}
                {debate.status === "interpreting" && (
                  <div className="absolute top-4 right-4 w-20 h-20 rounded-full blur-3xl opacity-10 bg-[#8B5CF6] animate-pulse"></div>
                )}

                <div className="relative p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs font-mono">
                          {debate.id}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {debate.source}
                        </Badge>
                      </div>
                      <h3 className={`font-bold text-lg ${
                        debate.status === "interpreting"
                          ? "bg-gradient-to-r from-[#8B5CF6] to-[#1A1F71] bg-clip-text text-transparent"
                          : debate.status === "approved"
                            ? "bg-gradient-to-r from-[#10B981] to-[#10B981]/70 bg-clip-text text-transparent"
                            : "text-gray-500"
                      }`}>
                        {debate.regulationTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Detected: {formatTimeAgo(debate.timestamp)}
                      </p>
                    </div>
                    <Badge className={
                      debate.status === "interpreting"
                        ? "bg-gradient-to-r from-[#8B5CF6]/30 to-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]/40 animate-pulse shadow-lg shadow-[#8B5CF6]/20"
                        : debate.status === "approved"
                          ? "bg-gradient-to-r from-[#10B981]/30 to-[#10B981]/20 text-[#10B981] border-[#10B981]/40 shadow-lg shadow-[#10B981]/20"
                          : "bg-gray-200 text-gray-600"
                    }>
                      {debate.status === "interpreting" ? "Pending Review" : debate.status === "approved" ? "Approved" : "Rejected"}
                    </Badge>
                  </div>

                  {/* Control & Requirement Box */}
                  <div className={`rounded-lg p-4 mb-4 border-2 ${
                    debate.status === "interpreting"
                      ? "bg-gradient-to-r from-[#8B5CF6]/10 via-white to-[#1A1F71]/5 border-[#8B5CF6]/20"
                      : debate.status === "approved"
                        ? "bg-gradient-to-r from-[#10B981]/10 via-white to-[#10B981]/5 border-[#10B981]/20"
                        : "bg-gray-50 border-gray-200"
                  }`}>
                    <p className={`text-sm font-mono font-bold mb-2 ${
                      debate.status === "interpreting" ? "text-[#8B5CF6]" : debate.status === "approved" ? "text-[#10B981]" : "text-gray-500"
                    }`}>
                      {debate.controlId}
                    </p>
                    <p className="text-sm">
                      Confidence: <span className="font-bold text-[#10B981]">{debate.confidence}%</span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">{debate.requirement}</p>
                  </div>

                  {/* Expandable Debate Section */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mb-4 gap-2"
                    onClick={() => setExpandedDebate(expandedDebate === debate.id ? null : debate.id)}
                  >
                    <Brain className="w-4 h-4" />
                    {expandedDebate === debate.id ? "Hide" : "View"} AI Constitutional Debate
                    {expandedDebate === debate.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>

                  {expandedDebate === debate.id && (
                    <div className="space-y-3 mb-4 bg-gradient-to-br from-[#8B5CF6]/15 to-[#8B5CF6]/5 p-4 rounded-lg border-2 border-[#8B5CF6]/30 relative overflow-hidden animate-in slide-in-from-top-2">
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#8B5CF6]/20 to-transparent rounded-tl-full"></div>

                      <div className="space-y-3 relative">
                        {/* Proposer */}
                        <div className="bg-gradient-to-r from-[#1A1F71]/15 to-white/80 backdrop-blur p-3 rounded-lg text-sm border-l-4 border-[#1A1F71] hover:border-l-[6px] transition-all">
                          <p className="font-medium text-xs text-[#1A1F71] mb-1 flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            PROPOSER
                          </p>
                          <p className="text-xs">{getDebateText(debate.proposer)}</p>
                          {typeof debate.proposer === 'object' && debate.proposer.reasoning && (
                              <div className="mt-2 space-y-1">
                                {debate.proposer.reasoning.map((r: string, i: number) => (
                                  <p key={i} className="text-xs text-muted-foreground">• {r}</p>
                                ))}
                              </div>
                            )}
                        </div>

                        {/* Critic */}
                        <div className="bg-gradient-to-r from-[#F59E0B]/15 to-white/80 backdrop-blur p-3 rounded-lg text-sm border-l-4 border-[#F59E0B] hover:border-l-[6px] transition-all">
                          <p className="font-medium text-xs text-[#F59E0B] mb-1 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            CRITIC
                          </p>
                          <p className="text-xs">{getDebateText(debate.critic)}</p>
                          {typeof debate.critic === 'object' && debate.critic.reasoning && (
                            <div className="mt-2 space-y-1">
                              {debate.critic.reasoning.map((r: string, i: number) => (
                                <p key={i} className="text-xs text-muted-foreground">• {r}</p>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Judge */}
                        <div className="bg-gradient-to-r from-[#F7B600]/15 to-white/80 backdrop-blur p-3 rounded-lg text-sm border-2 border-[#F7B600] hover:border-[3px] transition-all relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-16 h-16 bg-[#F7B600] rounded-full blur-2xl opacity-10"></div>
                          <p className="font-medium text-xs text-[#F7B600] mb-1 flex items-center gap-1 relative">
                            <Scale className="w-3 h-3" />
                            JUDGE {typeof debate.judge === 'object' && debate.judge.verdict && (
                              <Badge variant="outline" className="ml-2 text-[10px] py-0">{debate.judge.verdict}</Badge>
                            )}
                          </p>
                          <p className="text-xs font-medium relative">{getJudgeText(debate.judge)}</p>
                          {typeof debate.judge === 'object' && debate.judge.reasoning && (
                            <div className="mt-2 space-y-1">
                              {debate.judge.reasoning.map((r: string, i: number) => (
                                <p key={i} className="text-xs text-muted-foreground">• {r}</p>
                              ))}
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground mt-2 relative">
                            Confidence: {debate.confidence}% | Consensus: {debate.consensus ? "YES" : "NO"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 relative">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 hover:bg-[#1A1F71]/10 hover:scale-105 transition-all"
                      onClick={() => handleExportDebate(debate)}
                    >
                      <Download className="w-4 h-4" />
                      Export Log
                    </Button>
                    {debate.status === "interpreting" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#10B981] to-[#10B981]/90 hover:shadow-xl hover:scale-105 transition-all gap-2"
                          onClick={() => handleApproveDebate(debate.id)}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-destructive/10 border-destructive/30 hover:border-destructive hover:scale-105 transition-all gap-2"
                          onClick={() => handleRejectDebate(debate.id)}
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {debates.length === 0 && (
              <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-white">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No regulatory debates yet.</p>
                <p className="text-sm text-muted-foreground mt-1">Click "Run Check Now" to scan for regulatory changes.</p>
              </Card>
            )}
          </div>
        </section>

        {/* Stats Summary */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-[#1A1F71]/10 via-white to-[#F7B600]/10">
            <h3 className="font-[family-name:var(--font-audiowide)] text-lg font-bold mb-4">Watcher Statistics</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-2xl font-bold text-[#1A1F71]">{debates.filter((d: any) => d.status !== "rejected").length}</p>
                <p className="text-xs text-muted-foreground">Active Debates</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-2xl font-bold text-[#8B5CF6]">{debates.filter((d: any) => d.status === "interpreting").length}</p>
                <p className="text-xs text-muted-foreground">Pending Review</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-2xl font-bold text-[#10B981]">{debates.filter((d: any) => d.status === "approved").length}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-2xl font-bold text-[#F7B600]">{sources.filter((s: any) => s.enabled).length}</p>
                <p className="text-xs text-muted-foreground">Active Sources</p>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
