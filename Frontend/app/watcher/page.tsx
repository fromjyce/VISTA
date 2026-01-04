"use client"

import { useState, useCallback } from "react"
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
import { useVistaStore, DebateEntry } from "@/lib/store"

export default function WatcherPage() {
  const store = useVistaStore()
  const [isRunning, setIsRunning] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [expandedDebate, setExpandedDebate] = useState<string | null>(null)
  const [runningPhase, setRunningPhase] = useState<string>("")

  const sources = store.getSources()
  const debates = store.getDebates()

  // Simulate running compliance check
  const handleRunCheck = useCallback(async () => {
    setIsRunning(true)
    const enabledSources = sources.filter(s => s.enabled)

    // Phase 1: Fetching from sources
    setRunningPhase("Initializing Watcher Agent...")
    await new Promise(r => setTimeout(r, 800))

    for (const source of enabledSources) {
      setRunningPhase(`Fetching from ${source.shortName}...`)
      store.updateSourceStatus(source.id, "processing")
      await new Promise(r => setTimeout(r, 600 + Math.random() * 400))
    }

    // Phase 2: Analyzing changes
    setRunningPhase("Analyzing regulatory changes...")
    await new Promise(r => setTimeout(r, 1000))

    // Phase 3: AI Constitutional Debate (simulate finding a new regulation)
    const shouldCreateDebate = Math.random() > 0.4 // 60% chance of finding something new

    if (shouldCreateDebate) {
      setRunningPhase("New regulation detected! Starting AI Constitutional Debate...")
      await new Promise(r => setTimeout(r, 1200))

      const newDebateData = generateMockDebate()
      setRunningPhase(`PROPOSER analyzing ${newDebateData.regulationTitle}...`)
      await new Promise(r => setTimeout(r, 1000))

      setRunningPhase("CRITIC evaluating proposed interpretation...")
      await new Promise(r => setTimeout(r, 1000))

      setRunningPhase("JUDGE synthesizing final ruling...")
      await new Promise(r => setTimeout(r, 800))

      store.addDebate(newDebateData)
    }

    // Phase 4: Update all sources
    setRunningPhase("Updating compliance ruleset...")
    for (const source of enabledSources) {
      const changes = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0
      store.updateSourceStatus(source.id, "uptodate", changes)
    }

    setRunningPhase("Check complete!")
    await new Promise(r => setTimeout(r, 500))

    setIsRunning(false)
    setRunningPhase("")
  }, [sources, store])

  // Generate India-based mock debate
  const generateMockDebate = (): Omit<DebateEntry, "id" | "timestamp"> => {
    const mockDebates = [
      {
        regulationId: `RBI/2026-26/${Date.now() % 1000}`,
        regulationTitle: "RBI Tokenization Mandate - Card-on-File Extension",
        source: "RBI",
        sourceUrl: "https://rbi.org.in/Scripts/NotificationUser.aspx",
        summary: "Extension of tokenization mandate to include recurring payments and subscription services",
        proposer: {
          agent: "Proposer Agent",
          position: "All recurring payment tokens must be device-bound. Recommend blocking all non-tokenized recurring transactions immediately.",
          reasoning: [
            "RBI circular mandates token-based processing for all CoF transactions",
            "Previous deadline was extended multiple times - no further extensions expected",
            "Penalty risk for continued non-compliance"
          ],
          confidence: 94
        },
        critic: {
          agent: "Critic Agent",
          position: "Device binding for recurring payments is impractical. Subscription renewals happen without user device interaction. Need server-to-server token validation.",
          reasoning: [
            "Recurring payments are initiated by merchant, not customer device",
            "Device binding would break auto-renewal flows",
            "Industry practice allows merchant-initiated transactions with different token type"
          ],
          confidence: 89
        },
        judge: {
          agent: "Judge Agent",
          verdict: "PRACTICAL_IMPLEMENTATION",
          decision: "Device-bound tokens for customer-initiated payments. Network tokens with merchant authentication for recurring/subscription payments. Implement audit trail for all token types.",
          controlId: "CTL-RBI-TOKEN-001",
          requirement: "Tokenization with device binding for interactive, network tokens for recurring payments",
          reasoning: [
            "Balances security requirement with operational necessity",
            "Aligns with card network tokenization standards",
            "Provides clear audit trail for compliance verification"
          ]
        },
        consensus: true,
        confidence: 92,
        controlId: "CTL-RBI-TOKEN-001",
        requirement: "Tokenization with device binding for interactive, network tokens for recurring payments",
        status: "interpreting" as const,
        priority: "high" as const,
        affectedSystems: ["Payment Gateway", "Subscription Service", "Token Vault"],
        complianceDeadline: "2026-03-31"
      },
      {
        regulationId: `DPDP/2026/DPO-${Date.now() % 1000}`,
        regulationTitle: "DPDP Act - Data Protection Officer Appointment",
        source: "DPDP Act",
        sourceUrl: "https://www.meity.gov.in/data-protection",
        summary: "Significant Data Fiduciaries must appoint Data Protection Officers",
        proposer: {
          agent: "Proposer Agent",
          position: "As per DPDP Act, we must immediately appoint a DPO with direct reporting to board. Block all new data processing until DPO is appointed.",
          reasoning: [
            "Section 10 mandates DPO for Significant Data Fiduciaries",
            "Non-compliance can result in Rs. 250 crore penalty",
            "DPO must be based in India"
          ],
          confidence: 96
        },
        critic: {
          agent: "Critic Agent",
          position: "The 'Significant Data Fiduciary' threshold is not yet defined by MeitY. Blocking processing is premature. Focus on identifying qualified candidate.",
          reasoning: [
            "SDF notification pending from government",
            "Many organizations may not qualify as SDF",
            "Current privacy officer can fulfill interim role"
          ],
          confidence: 85
        },
        judge: {
          agent: "Judge Agent",
          verdict: "PROACTIVE_PREPARATION",
          decision: "Begin DPO search immediately. Designate interim privacy officer with DPO responsibilities. Document all data processing activities for future DPO review.",
          controlId: "CTL-DPDP-DPO-001",
          requirement: "DPO appointment preparation with interim privacy officer designation",
          reasoning: [
            "Proactive approach reduces compliance risk",
            "Interim arrangement provides coverage",
            "Documentation supports eventual DPO onboarding"
          ]
        },
        consensus: true,
        confidence: 90,
        controlId: "CTL-DPDP-DPO-001",
        requirement: "DPO appointment preparation with interim privacy officer designation",
        status: "interpreting" as const,
        priority: "high" as const,
        affectedSystems: ["HR Systems", "Privacy Portal", "Data Governance"],
        complianceDeadline: "2026-06-30"
      },
      {
        regulationId: `NPCI/UPI/${Date.now() % 1000}`,
        regulationTitle: "NPCI - UPI Lite X Offline Payments Enhancement",
        source: "NPCI/UPI",
        sourceUrl: "https://www.npci.org.in/",
        summary: "New guidelines for offline UPI transactions with enhanced limits",
        proposer: {
          agent: "Proposer Agent",
          position: "UPI Lite X allows Rs. 500 per transaction, Rs. 2000 daily limit offline. Recommend immediate implementation to capture market share.",
          reasoning: [
            "NPCI pushing for financial inclusion in low-connectivity areas",
            "Competitive advantage for early adopters",
            "Simplified merchant settlement for small transactions"
          ],
          confidence: 88
        },
        critic: {
          agent: "Critic Agent",
          position: "Offline transactions create reconciliation complexity. Fraud detection is limited without real-time validation. Need robust offline dispute resolution.",
          reasoning: [
            "Offline fraud detection is challenging",
            "Settlement delays can impact merchants",
            "Need secure local storage for transaction queue"
          ],
          confidence: 82
        },
        judge: {
          agent: "Judge Agent",
          verdict: "PHASED_ROLLOUT",
          decision: "Phase 1: Enable for trusted merchants with good history. Phase 2: Expand to all merchants with offline fraud scoring. Implement 24-hour settlement guarantee.",
          controlId: "CTL-UPI-OFFLINE-001",
          requirement: "Phased UPI Lite X rollout with offline fraud detection",
          reasoning: [
            "Risk-based approach for new payment channel",
            "Allows learning from initial deployment",
            "Settlement guarantee builds merchant trust"
          ]
        },
        consensus: true,
        confidence: 86,
        controlId: "CTL-UPI-OFFLINE-001",
        requirement: "Phased UPI Lite X rollout with offline fraud detection",
        status: "interpreting" as const,
        priority: "medium" as const,
        affectedSystems: ["UPI Gateway", "Fraud Detection", "Merchant Portal"],
        complianceDeadline: "2026-04-30"
      }
    ]
    return mockDebates[Math.floor(Math.random() * mockDebates.length)]
  }

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
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return "Just now"
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`
    return `${Math.floor(seconds / 86400)} days ago`
  }

  // Approve debate
  const handleApproveDebate = (id: string) => {
    store.updateDebateStatus(id, "approved")
  }

  // Reject debate
  const handleRejectDebate = (id: string) => {
    store.updateDebateStatus(id, "rejected")
  }

  // Export debate log
  const handleExportDebate = (debate: DebateEntry) => {
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
                      onCheckedChange={() => store.toggleSource(source.id)}
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
                  {sources.filter(s => s.enabled).map((feed) => (
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
            {debates.map((debate) => (
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
                <p className="text-2xl font-bold text-[#1A1F71]">{store.getStats().totalDebates}</p>
                <p className="text-xs text-muted-foreground">Total Debates</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-2xl font-bold text-[#8B5CF6]">{store.getStats().pendingDebates}</p>
                <p className="text-xs text-muted-foreground">Pending Review</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-2xl font-bold text-[#10B981]">{store.getStats().approvedDebates}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-2xl font-bold text-[#F7B600]">{store.getStats().enabledSources}</p>
                <p className="text-xs text-muted-foreground">Active Sources</p>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
