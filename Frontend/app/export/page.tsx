"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar } from "lucide-react"

export default function ExportPage() {
  return (
    <div className="flex-1 bg-gradient-to-b from-white via-[#10B981]/5 to-white relative">
      {/* Decorative Background Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-32 left-32 w-96 h-96 bg-[#10B981] rounded-full blur-3xl opacity-[0.12]"></div>
        <div className="absolute bottom-20 right-20 w-[28rem] h-[28rem] bg-[#1A1F71] rounded-full blur-3xl opacity-[0.10]"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#F7B600] rounded-full blur-3xl opacity-[0.08]"></div>
      </div>

      <div className="border-b bg-card/80 backdrop-blur relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="font-[family-name:var(--font-audiowide)] text-3xl font-bold">Evidence Export</h1>
          <p className="text-sm text-muted-foreground mt-1">Generate audit-ready compliance reports</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 relative z-10">
        <div className="grid gap-6">
          {[
            { name: "PCI DSS Annual Report", date: "Jan 4, 2026", pages: 47, format: "PDF", color: "#1A1F71" },
            { name: "GDPR Data Processing Agreement", date: "Jan 1, 2026", pages: 23, format: "PDF", color: "#8B5CF6" },
            { name: "Compliance Finding Log", date: "Dec 30, 2025", pages: 12, format: "CSV", color: "#10B981" },
            { name: "Risk Assessment Summary", date: "Dec 28, 2025", pages: 8, format: "PDF", color: "#F7B600" },
          ].map((report) => (
            <Card key={report.name} className="relative p-6 flex items-center justify-between hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group" style={{ background: `linear-gradient(to bottom right, white, ${report.color}10)` }}>
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full" style={{ background: `linear-gradient(to bottom left, ${report.color}20, transparent)` }}></div>
              
              {/* Icon glow */}
              <div className="absolute top-6 left-6 w-16 h-16 rounded-full blur-2xl opacity-10" style={{ backgroundColor: report.color }}></div>
              
              <div className="flex items-start gap-4 flex-1 relative">
                <div className="relative p-3 rounded-lg transition-all duration-300 group-hover:scale-110" style={{ background: `linear-gradient(to bottom right, ${report.color}, ${report.color}CC)` }}>
                  <div className="absolute inset-0 rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity" style={{ backgroundColor: report.color }}></div>
                  <FileText className="w-6 h-6 text-white relative" />
                </div>
                <div>
                  <h3 className="font-bold text-lg bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${report.color}, ${report.color}B3)` }}>{report.name}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {report.date}
                    </span>
                    <span className="font-medium">{report.pages} pages</span>
                    <Badge className="font-mono border" style={{ borderColor: `${report.color}40`, color: report.color, backgroundColor: `${report.color}15` }}>{report.format}</Badge>
                  </div>
                </div>
              </div>
              <Button className="gap-2 bg-gradient-to-r from-[#10B981] to-[#10B981]/90 hover:shadow-xl hover:scale-105 transition-all duration-300 relative">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </Card>
          ))}
        </div>

        {/* Summary Card */}
        <Card className="relative mt-8 p-8 bg-gradient-to-br from-[#10B981]/10 via-white to-[#1A1F71]/10 border-2 border-[#10B981]/20 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#10B981_25%,transparent_25%,transparent_75%,#10B981_75%,#10B981),linear-gradient(45deg,#10B981_25%,transparent_25%,transparent_75%,#10B981_75%,#10B981)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]"></div>
          </div>
          
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#10B981]/20 to-transparent rounded-br-full"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#1A1F71]/20 to-transparent rounded-tl-full"></div>
          
          <div className="text-center relative">
            <h2 className="font-[family-name:var(--font-audiowide)] text-2xl font-bold mb-4 bg-gradient-to-r from-[#10B981] to-[#1A1F71] bg-clip-text text-transparent">Export Summary</h2>
            <div className="grid grid-cols-3 gap-6 mt-6">
              <div className="relative p-6 bg-gradient-to-br from-[#1A1F71]/15 via-white to-[#1A1F71]/5 rounded-xl border-2 border-[#1A1F71]/20 hover:border-[#1A1F71]/40 hover:scale-105 transition-all overflow-hidden group/card">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#1A1F71] rounded-full blur-2xl opacity-10"></div>
                <p className="text-4xl font-bold text-[#1A1F71] relative">4</p>
                <p className="text-sm text-muted-foreground mt-2 relative">Total Reports</p>
              </div>
              <div className="relative p-6 bg-gradient-to-br from-[#10B981]/15 via-white to-[#10B981]/5 rounded-xl border-2 border-[#10B981]/20 hover:border-[#10B981]/40 hover:scale-105 transition-all overflow-hidden group/card">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#10B981] rounded-full blur-2xl opacity-10"></div>
                <p className="text-4xl font-bold text-[#10B981] relative">90</p>
                <p className="text-sm text-muted-foreground mt-2 relative">Total Pages</p>
              </div>
              <div className="relative p-6 bg-gradient-to-br from-[#F7B600]/15 via-white to-[#F7B600]/5 rounded-xl border-2 border-[#F7B600]/20 hover:border-[#F7B600]/40 hover:scale-105 transition-all overflow-hidden group/card">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#F7B600] rounded-full blur-2xl opacity-10"></div>
                <p className="text-4xl font-bold text-[#F7B600] relative">100%</p>
                <p className="text-sm text-muted-foreground mt-2 relative">Audit Ready</p>
              </div>
            </div>
            <Button className="mt-8 bg-gradient-to-r from-[#10B981] to-[#1A1F71] hover:shadow-2xl hover:scale-105 transition-all" size="lg">
              Download All Reports
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
