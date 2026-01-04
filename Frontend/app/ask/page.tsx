"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, AlertCircle } from "lucide-react"

export default function AskPage() {
  return (
    <div className="flex-1 bg-gradient-to-b from-white via-[#8B5CF6]/5 to-white relative">
      {/* Decorative Background Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-32 w-96 h-96 bg-[#8B5CF6] rounded-full blur-3xl opacity-[0.12]"></div>
        <div className="absolute bottom-40 left-20 w-[30rem] h-[30rem] bg-[#1A1F71] rounded-full blur-3xl opacity-[0.10]"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#F7B600] rounded-full blur-3xl opacity-[0.08]"></div>
      </div>

      {/* Top Bar */}
      <div className="border-b bg-card/80 backdrop-blur relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="font-[family-name:var(--font-audiowide)] text-3xl font-bold">Ask The Regulator</h1>
          <p className="text-sm text-muted-foreground mt-1">AI-powered regulatory interpretation and guidance</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8 h-[calc(100vh-120px)] flex flex-col relative z-10">
        {/* Chat History */}
        <div className="flex-1 overflow-auto space-y-6 mb-6">
          <Card className="relative p-6 bg-gradient-to-br from-[#8B5CF6]/15 via-white to-[#F7B600]/15 hover:shadow-xl transition-all duration-300 overflow-hidden group">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#8B5CF6]/20 to-transparent rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#F7B600]/20 to-transparent rounded-tl-full"></div>
            
            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#8B5CF6] rounded-full blur-3xl opacity-5"></div>
            
            <div className="relative">
              <p className="text-sm font-medium mb-2 bg-gradient-to-r from-[#8B5CF6] to-[#F7B600] bg-clip-text text-transparent">Welcome to VISTA's Regulatory Q&A</p>
              <p className="text-base">
                I'm an AI agent trained on 500+ regulatory frameworks including PCI DSS, GDPR, CCPA, SOX, and AML
                regulations. Ask me anything about compliance requirements, interpretations, or how they apply to your
                organization.
              </p>
            </div>
          </Card>

          <Card className="relative p-6 ml-8 bg-gradient-to-br from-[#F7B600]/15 via-white to-[#F7B600]/5 border-2 border-[#F7B600]/40 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group">
            {/* Decorative accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#F7B600]/30 to-transparent rounded-bl-full"></div>
            
            <p className="text-sm font-medium mb-2 relative bg-gradient-to-r from-[#F7B600] to-[#F59E0B] bg-clip-text text-transparent">Question: What does PCI DSS require for SSN storage?</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white to-[#1A1F71]/5 border-l-4 border-l-primary hover:shadow-lg transition-shadow duration-300">
            <p className="text-sm font-medium mb-3 text-primary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              VISTA Regulatory AI
            </p>
            <div className="space-y-3 text-sm">
              <p>
                <strong>Direct Answer:</strong> PCI DSS explicitly prohibits storing SSNs alongside payment card data.
                Here's why:
              </p>

              <div className="bg-gradient-to-r from-[#F7B600]/10 to-white p-3 rounded border-l-4 border-l-accent">
                <p className="font-mono text-xs font-bold mb-2 text-[#F7B600]">PCI DSS 3.2.1</p>
                <p className="text-xs">
                  Render PAN unreadable anywhere it is stored (including portable digital media, backup media, and in
                  logs)
                </p>
              </div>

              <p>
                <strong>Regulatory Interpretation:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>SSNs are NOT payment card data, but are often classified as PII</li>
                <li>GDPR, CCPA, and state laws have separate requirements for PII storage</li>
                <li>Best practice: Never co-locate SSN with card data in same database</li>
              </ul>

              <p>
                <strong>Risk Assessment:</strong>
              </p>
              <div className="text-xs bg-gradient-to-r from-warning/20 to-warning/10 p-3 rounded-lg border-2 border-warning/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-12 h-12 bg-warning rounded-full blur-xl opacity-10"></div>
                <span className="relative"><span className="font-medium">High Risk</span> - A breach exposing both PAN and SSN would violate both
                payment and privacy regulations simultaneously</span>
              </div>

              <p>
                <strong>VISTA Recommendation:</strong> Implement separate encryption keys for PII vs. payment data.
                Conduct impact assessment on any existing co-location.
              </p>
            </div>
          </Card>

          <Card className="relative p-6 ml-8 bg-gradient-to-br from-[#F7B600]/15 via-white to-[#F7B600]/5 border-2 border-[#F7B600]/40 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group">
            {/* Decorative accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#F7B600]/30 to-transparent rounded-bl-full"></div>
            
            <p className="text-sm font-medium mb-2 relative bg-gradient-to-r from-[#F7B600] to-[#F59E0B] bg-clip-text text-transparent">Question: How do I handle GDPR consent for EU merchants?</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white to-[#1A1F71]/5 border-l-4 border-l-primary hover:shadow-lg transition-shadow duration-300">
            <p className="text-sm font-medium mb-3 text-primary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              VISTA Regulatory AI
            </p>
            <div className="space-y-3 text-sm">
              <p>
                <strong>GDPR Consent Requirements for Payment Processing:</strong>
              </p>

                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-[#1A1F71]/15 to-white/80 backdrop-blur p-3 rounded-lg border-l-4 border-[#1A1F71] hover:border-l-[6px] transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#1A1F71] rounded-full blur-2xl opacity-5"></div>
                    <p className="text-xs font-medium mb-1 text-[#1A1F71] relative">Lawful Basis #1: Contract Performance</p>
                    <p className="text-xs relative">
                      If payment processing is part of a purchase contract, you can process data without explicit consent
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[#8B5CF6]/15 to-white/80 backdrop-blur p-3 rounded-lg border-l-4 border-[#8B5CF6] hover:border-l-[6px] transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#8B5CF6] rounded-full blur-2xl opacity-5"></div>
                    <p className="text-xs font-medium mb-1 text-[#8B5CF6] relative">Lawful Basis #2: Legitimate Interest</p>
                    <p className="text-xs relative">
                      For fraud prevention and analytics, conduct LIA (Legitimate Interest Assessment)
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[#F7B600]/15 to-white/80 backdrop-blur p-3 rounded-lg border-l-4 border-[#F7B600] hover:border-l-[6px] transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#F7B600] rounded-full blur-2xl opacity-5"></div>
                    <p className="text-xs font-medium mb-1 text-[#F7B600] relative">Lawful Basis #3: Explicit Consent</p>
                    <p className="text-xs relative">Only required for marketing, tracking, or non-essential processing</p>
                  </div>
                </div>

              <div className="bg-gradient-to-r from-success/20 to-success/10 p-3 rounded-lg text-xs border-2 border-success/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-12 h-12 bg-success rounded-full blur-xl opacity-10"></div>
                <span className="relative"><span className="font-medium">Best Practice</span>: Maintain documentation showing which lawful basis
                applies to each processing activity</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Input Area */}
        <div className="relative border-t pt-6 bg-gradient-to-r from-[#8B5CF6]/5 via-white to-[#F7B600]/5 p-4 rounded-lg overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#8B5CF6]/10 to-transparent rounded-br-full"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#F7B600]/10 to-transparent rounded-tl-full"></div>
          
          <div className="relative flex gap-3">
            <Input placeholder="Ask a regulatory compliance question..." className="flex-1 border-2 border-[#8B5CF6]/20 focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all bg-white/80 backdrop-blur" />
            <Button size="lg" className="gap-2 bg-gradient-to-r from-[#8B5CF6] to-[#8B5CF6]/90 hover:shadow-xl hover:scale-105 transition-all">
              <Send className="w-4 h-4" />
              Ask
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1 relative">
            <AlertCircle className="w-3 h-3" />
            VISTA's responses are AI-generated guidance only. Consult legal counsel for binding interpretations.
          </p>
        </div>
      </div>
    </div>
  )
}
