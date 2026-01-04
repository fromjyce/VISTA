"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Download } from "lucide-react"

export default function WatcherPage() {
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
            <p className="text-sm text-muted-foreground mt-1">Monitor regulatory changes in real-time</p>
          </div>
          <Button size="sm" className="gap-2 bg-gradient-to-r from-[#1A1F71] to-[#1A1F71]/90 hover:shadow-lg transition-all">
            <RefreshCw className="w-4 h-4" />
            Simulate Update
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8 relative z-10">
        {/* Monitored Feeds */}
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
                  {[
                    { source: "PCI SSC", lastCheck: "2 min ago", changes: 0, status: "uptodate" },
                    { source: "EUR-Lex GDPR", lastCheck: "5 min ago", changes: 1, status: "processing" },
                    { source: "FinCEN AML", lastCheck: "8 min ago", changes: 0, status: "uptodate" },
                    { source: "CCPA/CPRA", lastCheck: "12 min ago", changes: 0, status: "uptodate" },
                  ].map((feed) => (
                    <tr key={feed.source} className="hover:bg-gradient-to-r hover:from-[#1A1F71]/5 hover:to-transparent transition-colors duration-200">
                      <td className="px-6 py-4 text-sm font-medium">
                        {feed.source}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{feed.lastCheck}</td>
                      <td className="px-6 py-4 text-sm font-mono font-bold">{feed.changes}</td>
                      <td className="px-6 py-4">
                        <Badge variant={feed.status === "processing" ? "secondary" : "default"} className={feed.status === "processing" ? "bg-[#F7B600]/20 text-[#F7B600] border-[#F7B600]/30" : "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30"}>
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

        {/* Recent Changes */}
        <section>
          <h2 className="font-[family-name:var(--font-audiowide)] text-xl font-bold mb-6">Recent Regulatory Changes</h2>
          <div className="space-y-6">
            {[
              {
                id: "GDPR-2025-001",
                title: "GDPR Amendment 2025/001",
                source: "EUR-Lex",
                status: "interpreting",
                control: "CTL-2025-047: Biometric Consent Control",
                confidence: 92,
                requirement: "Explicit consent required for biometric data collection",
              },
              {
                id: "PCI-DSS-4.1",
                title: "PCI DSS v4.1 - TLS 1.2 End of Life",
                source: "PCI SSC",
                status: "approved",
                control: "CTL-PCI-TLS: Minimum TLS 1.3",
                confidence: 98,
                requirement: "All payment card transmissions must use TLS 1.3 or higher",
              },
            ].map((change) => (
              <Card key={change.id} className={`relative p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden group ${change.status === "interpreting" ? "bg-gradient-to-br from-[#8B5CF6]/15 via-white to-[#1A1F71]/5" : "bg-gradient-to-br from-[#10B981]/15 via-white to-[#10B981]/5"}`}>
                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full ${change.status === "interpreting" ? "bg-gradient-to-bl from-[#8B5CF6]/20 to-transparent" : "bg-gradient-to-bl from-[#10B981]/20 to-transparent"}`}></div>
                
                {/* Status glow */}
                <div className={`absolute top-4 right-4 w-20 h-20 rounded-full blur-3xl opacity-10 ${change.status === "interpreting" ? "bg-[#8B5CF6] animate-pulse" : "bg-[#10B981]"}`}></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`font-bold text-lg ${change.status === "interpreting" ? "bg-gradient-to-r from-[#8B5CF6] to-[#1A1F71] bg-clip-text text-transparent" : "bg-gradient-to-r from-[#10B981] to-[#10B981]/70 bg-clip-text text-transparent"}`}>{change.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Source: {change.source} • Detected:{" "}
                        {change.status === "interpreting" ? "5 min ago" : "2 days ago"}
                      </p>
                    </div>
                    <Badge className={change.status === "interpreting" ? "bg-gradient-to-r from-[#8B5CF6]/30 to-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]/40 animate-pulse shadow-lg shadow-[#8B5CF6]/20" : "bg-gradient-to-r from-[#10B981]/30 to-[#10B981]/20 text-[#10B981] border-[#10B981]/40 shadow-lg shadow-[#10B981]/20"}>
                      {change.status === "interpreting" ? "AI Interpreting..." : "Approved"}
                    </Badge>
                  </div>

                  <div className={`bg-gradient-to-r rounded-lg p-4 mb-4 border-2 ${change.status === "interpreting" ? "from-[#8B5CF6]/10 via-white to-[#1A1F71]/5 border-[#8B5CF6]/20" : "from-[#10B981]/10 via-white to-[#10B981]/5 border-[#10B981]/20"}`}>
                    <p className={`text-sm font-mono font-bold mb-2 ${change.status === "interpreting" ? "text-[#8B5CF6]" : "text-[#10B981]"}`}>{change.control}</p>
                    <p className="text-sm">
                      Confidence: <span className="font-bold text-[#10B981]">{change.confidence}%</span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-3">{change.requirement}</p>
                  </div>

                  {change.status === "interpreting" && (
                    <div className="space-y-3 mb-4 bg-gradient-to-br from-[#8B5CF6]/15 to-[#8B5CF6]/5 p-4 rounded-lg border-2 border-[#8B5CF6]/30 relative overflow-hidden">
                      {/* Decorative corner */}
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#8B5CF6]/20 to-transparent rounded-tl-full"></div>
                      
                      <p className="text-sm font-bold flex items-center gap-2 relative">
                        <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse"></span>
                        AI Constitutional Debate
                      </p>
                      <div className="space-y-3 relative">
                        <div className="bg-gradient-to-r from-[#1A1F71]/15 to-white/80 backdrop-blur p-3 rounded-lg text-sm border-l-4 border-[#1A1F71] hover:border-l-[6px] transition-all">
                          <p className="font-medium text-xs text-[#1A1F71] mb-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1A1F71]"></span>
                            PROPOSER
                          </p>
                          <p className="text-xs">
                            Amendment requires explicit consent for ALL biometric collection. Recommend blocking all
                            biometric features until consent mechanism implemented.
                          </p>
                        </div>
                        <div className="bg-gradient-to-r from-[#F59E0B]/15 to-white/80 backdrop-blur p-3 rounded-lg text-sm border-l-4 border-[#F59E0B] hover:border-l-[6px] transition-all">
                          <p className="font-medium text-xs text-[#F59E0B] mb-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                            CRITIC
                          </p>
                          <p className="text-xs">
                            Article 9(2)(g) allows legitimate interest for fraud prevention. Blocking ALL biometric would
                            disable fraud detection systems.
                          </p>
                        </div>
                        <div className="bg-gradient-to-r from-[#F7B600]/15 to-white/80 backdrop-blur p-3 rounded-lg text-sm border-2 border-[#F7B600] hover:border-[3px] transition-all relative overflow-hidden">
                          {/* Judge glow */}
                          <div className="absolute top-0 left-0 w-16 h-16 bg-[#F7B600] rounded-full blur-2xl opacity-10"></div>
                          
                          <p className="font-medium text-xs text-[#F7B600] mb-1 flex items-center gap-1 relative">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F7B600]"></span>
                            JUDGE
                          </p>
                          <p className="text-xs font-medium relative">
                            Block consumer-facing biometric collection. Allow internal fraud detection under legitimate
                            interest with documentation.
                          </p>
                          <p className="text-xs text-muted-foreground mt-2 relative">Confidence: 94% • Consensus: YES</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 relative">
                    <Button variant="outline" size="sm" className="gap-2 hover:bg-[#1A1F71]/10 hover:scale-105 transition-all">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                    {change.status === "interpreting" && (
                      <>
                        <Button size="sm" className="bg-gradient-to-r from-[#10B981] to-[#10B981]/90 hover:shadow-xl hover:scale-105 transition-all">Approve</Button>
                        <Button variant="outline" size="sm" className="hover:bg-destructive/10 border-destructive/30 hover:border-destructive hover:scale-105 transition-all">
                          Override
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
