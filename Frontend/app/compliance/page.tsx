"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Zap } from "lucide-react"

export default function CompliancePage() {
  return (
    <div className="flex-1 bg-gradient-to-b from-white via-[#F7B600]/5 to-white relative">
      {/* Decorative Background Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-32 left-20 w-96 h-96 bg-[#F7B600] rounded-full blur-3xl opacity-[0.12]"></div>
        <div className="absolute bottom-20 right-32 w-[28rem] h-[28rem] bg-[#1A1F71] rounded-full blur-3xl opacity-[0.10]"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#10B981] rounded-full blur-3xl opacity-[0.08]"></div>
      </div>

      {/* Top Bar */}
      <div className="border-b bg-card/80 backdrop-blur relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="font-[family-name:var(--font-audiowide)] text-3xl font-bold">Continuous Compliance</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time scanning with explainable AI reasoning</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8 relative z-10">
        {/* Scan Input */}
        <section>
          <h2 className="font-[family-name:var(--font-audiowide)] text-xl font-bold mb-6">Scan Content</h2>
          <Card className="relative p-6 bg-gradient-to-br from-[#1A1F71]/12 via-white to-[#F7B600]/8 hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F7B600]/20 to-transparent rounded-bl-full"></div>
            
            <div className="relative">
              <label className="block text-sm font-medium mb-3 bg-gradient-to-r from-[#1A1F71] to-[#F7B600] bg-clip-text text-transparent">Paste or upload content for compliance scanning</label>
              <textarea
                className="w-full h-32 p-4 border-2 border-[#1A1F71]/20 rounded-lg bg-white/80 backdrop-blur text-sm font-mono focus:ring-2 focus:ring-[#1A1F71] focus:border-[#1A1F71] transition-all"
                placeholder="Hi Support, I have a question about my credit card. My card number is 4532-1234-5678-9010 and my SSN is 123-45-6789. Can you help me?"
                defaultValue="Hi Support, I have a question about my credit card. My card number is 4532-1234-5678-9010 and my SSN is 123-45-6789. Can you help me?"
              />
              <div className="flex gap-3 mt-4">
                <Button className="gap-2 bg-gradient-to-r from-[#1A1F71] to-[#1A1F71]/90 hover:shadow-lg hover:scale-105 transition-all">
                  <Zap className="w-4 h-4" />
                  Scan Now
                </Button>
                <Button variant="outline" className="border-[#F7B600]/30 hover:bg-[#F7B600]/10 hover:border-[#F7B600] transition-all">Upload File</Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Scan Results */}
        <section>
          <h2 className="font-[family-name:var(--font-audiowide)] text-xl font-bold mb-6">Scan Results</h2>
          <div className="space-y-6">
            {/* Finding 1: PAN */}
            <Card className="relative p-6 border-l-4 border-l-destructive bg-gradient-to-br from-destructive/15 via-white to-destructive/5 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              {/* Animated warning pulse */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-destructive rounded-full blur-3xl opacity-10 animate-pulse"></div>
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg bg-gradient-to-r from-destructive to-destructive/70 bg-clip-text text-transparent">PAN Exposure Detected</h3>
                    <p className="text-sm text-muted-foreground">Credit card number found in unencrypted field</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-destructive to-destructive/80 text-white border-0 animate-pulse shadow-lg shadow-destructive/50">CRITICAL</Badge>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-destructive/10 via-white to-destructive/5 p-4 rounded-lg border-2 border-destructive/20">
                    <p className="text-xs font-medium text-destructive mb-2">VIOLATION</p>
                    <p className="text-sm font-mono font-bold">Requirement: PCI DSS 3.4 - Render PAN unreadable</p>
                    <p className="text-sm text-muted-foreground mt-2">Extracted: "4532-1234-5678-9010"</p>
                  </div>

                  <div className="space-y-3 bg-gradient-to-br from-destructive/15 to-destructive/5 p-4 rounded-lg border-2 border-destructive/30 relative overflow-hidden">
                    {/* Decorative corner */}
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-destructive/20 to-transparent rounded-tl-full"></div>
                    
                    <p className="text-sm font-bold flex items-center gap-2 relative">
                      <span className="w-2 h-2 rounded-full bg-destructive animate-pulse"></span>
                      COMPLIANCE REASONING CHAIN
                    </p>
                    <div className="space-y-2 text-sm relative">
                      <div className="flex gap-2 p-3 bg-white/70 backdrop-blur rounded-lg border border-destructive/10 hover:border-destructive/30 transition-colors">
                        <span className="font-bold text-destructive">1.</span>
                        <span>
                          <strong>Detection:</strong> Regex pattern matched 16-digit card sequence
                        </span>
                      </div>
                      <div className="flex gap-2 p-3 bg-white/70 backdrop-blur rounded-lg border border-destructive/10 hover:border-destructive/30 transition-colors">
                        <span className="font-bold text-destructive">2.</span>
                        <span>
                          <strong>Context Analysis:</strong> Field is in plaintext email log (unencrypted medium)
                        </span>
                      </div>
                      <div className="flex gap-2 p-3 bg-white/70 backdrop-blur rounded-lg border border-destructive/10 hover:border-destructive/30 transition-colors">
                        <span className="font-bold text-destructive">3.</span>
                        <span>
                          <strong>Severity:</strong> PAN in plaintext = critical PCI violation
                        </span>
                      </div>
                      <div className="flex gap-2 p-3 bg-white/70 backdrop-blur rounded-lg border border-destructive/10 hover:border-destructive/30 transition-colors">
                        <span className="font-bold text-destructive">4.</span>
                        <span>
                          <strong>Remediation:</strong> Delete email, implement input validation layer
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-success/15 to-success/5 border-2 border-success p-4 rounded-lg relative overflow-hidden">
                    {/* Success glow */}
                    <div className="absolute top-0 left-0 w-16 h-16 bg-success rounded-full blur-2xl opacity-20"></div>
                    
                    <p className="text-sm font-bold flex items-center gap-2 text-success relative">
                      <CheckCircle2 className="w-4 h-4" />
                      Auto-remediation scheduled
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 relative">
                      Audit trail created • Evidence exported • Will be deleted in 24 hrs unless overridden
                    </p>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#1A1F71] to-[#1A1F71]/90 hover:shadow-xl hover:scale-[1.02] transition-all">View Detailed Report</Button>
                </div>
              </div>
            </Card>

            {/* Finding 2: SSN */}
            <Card className="relative p-6 border-l-4 border-l-[#F7B600] bg-gradient-to-br from-[#F7B600]/15 via-white to-[#F59E0B]/5 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              {/* Animated warning pulse */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F7B600] rounded-full blur-3xl opacity-10 animate-pulse"></div>
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg bg-gradient-to-r from-[#F7B600] to-[#F59E0B] bg-clip-text text-transparent">SSN Logging Detected</h3>
                    <p className="text-sm text-muted-foreground">Social Security Number stored in plaintext log</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-[#F7B600]/30 to-[#F59E0B]/20 text-[#F7B600] border-[#F7B600]/40 shadow-lg shadow-[#F7B600]/20">WARNING</Badge>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-[#F7B600]/10 via-white to-[#F59E0B]/5 p-4 rounded-lg border-2 border-[#F7B600]/20">
                    <p className="text-xs font-medium text-[#F7B600] mb-2">VIOLATION</p>
                    <p className="text-sm font-mono font-bold">Requirement: Privacy - PII must be masked in logs</p>
                    <p className="text-sm text-muted-foreground mt-2">Extracted: "123-45-6789"</p>
                  </div>

                  <div className="bg-gradient-to-r from-[#F7B600]/15 to-[#F59E0B]/10 border-2 border-[#F7B600]/30 p-4 rounded-lg relative overflow-hidden">
                    {/* Decorative corner */}
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#F7B600]/20 to-transparent rounded-tl-full"></div>
                    
                    <p className="text-sm font-bold flex items-center gap-2 text-[#F7B600] relative">
                      <AlertCircle className="w-4 h-4" />
                      Needs manual review
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 relative">
                      Determine if SSN was intentionally logged or accidental. Document decision.
                    </p>
                  </div>

                  <Button variant="outline" className="w-full hover:bg-[#F7B600]/10 border-[#F7B600]/30 hover:border-[#F7B600] hover:scale-[1.02] transition-all">
                    Create Remediation Task
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Compliance Score */}
        <section>
          <Card className="relative p-8 bg-gradient-to-br from-destructive/10 via-white to-warning/10 border-2 border-destructive/20 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,#EF4444_25%,transparent_25%,transparent_75%,#EF4444_75%,#EF4444),linear-gradient(45deg,#EF4444_25%,transparent_25%,transparent_75%,#EF4444_75%,#EF4444)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]"></div>
            </div>
            
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-destructive/20 to-transparent rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-warning/20 to-transparent rounded-tl-full"></div>
            
            <div className="text-center relative">
              <p className="font-[family-name:var(--font-audiowide)] text-sm font-medium mb-4 bg-gradient-to-r from-destructive to-warning bg-clip-text text-transparent">CONTENT COMPLIANCE SCORE</p>
              
              {/* Circular gauge effect */}
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-destructive to-warning blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-destructive/20 via-white to-warning/20 flex items-center justify-center border-4 border-gradient-to-r from-destructive to-warning">
                  <div className="text-6xl font-bold bg-gradient-to-r from-destructive to-warning bg-clip-text text-transparent">45%</div>
                </div>
              </div>
              
              <p className="text-muted-foreground font-medium mb-2">2 critical violations found</p>
              <p className="text-sm text-destructive font-bold mb-6">Immediate action required</p>
              
              <Button className="bg-gradient-to-r from-[#1A1F71] to-[#1A1F71]/90 hover:shadow-xl hover:scale-105 transition-all">
                Download Evidence Package
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
