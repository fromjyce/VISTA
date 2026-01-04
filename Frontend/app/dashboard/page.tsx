"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { AlertCircle, CheckCircle2, AlertTriangle, TrendingUp, RefreshCw, Download, Eye, Brain, Search, Wrench, BookOpen } from "lucide-react"

const complianceData = [
  { date: "1/4", score: 82 },
  { date: "1/5", score: 83 },
  { date: "1/6", score: 81 },
  { date: "1/7", score: 85 },
  { date: "1/8", score: 87 },
]

const violationData = [
  { name: "PCI", value: 45 },
  { name: "Privacy", value: 30 },
  { name: "AML", value: 25 },
]

const violationBreakdown = [
  { type: "PAN Exposure", count: 3, status: "critical" },
  { type: "SSN Logging", count: 2, status: "warning" },
  { type: "Unencrypted Data", count: 1, status: "warning" },
]

const COLORS = ["#1A1F71", "#F7B600", "#EF4444"]

export default function DashboardPage() {
  return (
    <div className="flex-1 bg-gradient-to-b from-white via-gray-50 to-white relative">
      {/* Decorative Background Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#1A1F71] rounded-full blur-3xl opacity-[0.08]"></div>
        <div className="absolute bottom-40 left-20 w-[32rem] h-[32rem] bg-[#F7B600] rounded-full blur-3xl opacity-[0.10]"></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-[#10B981] rounded-full blur-3xl opacity-[0.06]"></div>
      </div>

      {/* Top Bar */}
      <div className="border-b bg-card/80 backdrop-blur relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="font-[family-name:var(--font-audiowide)] text-3xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Compliance health overview</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8 relative z-10">
        {/* Key Metrics */}
        <section>
          <h2 className="font-[family-name:var(--font-audiowide)] text-xl font-bold mb-6">Compliance Health</h2>
          <div className="grid grid-cols-4 gap-6">
            <Card className="relative p-6 bg-gradient-to-br from-[#1A1F71]/15 via-white to-[#10B981]/10 border-l-4 border-l-[#1A1F71] hover:shadow-2xl transition-all duration-300 hover:scale-105 group overflow-hidden">
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Icon background glow */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-[#10B981] rounded-full blur-2xl opacity-20"></div>
              
              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium bg-gradient-to-r from-[#1A1F71] to-[#10B981] bg-clip-text text-transparent">PCI Score</span>
                  <div className="p-2 bg-gradient-to-br from-[#10B981]/20 to-[#10B981]/10 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-[#10B981]" />
                  </div>
                </div>
                
                <div className="text-5xl font-bold bg-gradient-to-r from-[#1A1F71] to-[#10B981] bg-clip-text text-transparent mb-4">87%</div>
                
                {/* Enhanced progress bar */}
                <div className="relative mt-4 w-full bg-gradient-to-r from-gray-200 to-gray-100 rounded-full h-3 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A1F71] via-[#10B981] to-[#10B981] h-3 rounded-full transition-all duration-500 shadow-lg" style={{ width: "87%" }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="relative p-6 bg-gradient-to-br from-destructive/15 via-white to-destructive/5 border-l-4 border-l-destructive hover:shadow-2xl transition-all duration-300 hover:scale-105 group overflow-hidden">
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Icon background glow */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-destructive rounded-full blur-2xl opacity-20 animate-pulse"></div>
              
              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium bg-gradient-to-r from-destructive to-destructive/70 bg-clip-text text-transparent">Critical Issues</span>
                  <div className="p-2 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                  </div>
                </div>
                
                <div className="text-5xl font-bold text-destructive mb-4">3</div>
                <p className="text-xs text-muted-foreground">Require immediate action</p>
              </div>
            </Card>

            <Card className="relative p-6 bg-gradient-to-br from-[#F7B600]/15 via-white to-[#F59E0B]/10 border-l-4 border-l-[#F7B600] hover:shadow-2xl transition-all duration-300 hover:scale-105 group overflow-hidden">
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Icon background glow */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-[#F7B600] rounded-full blur-2xl opacity-20"></div>
              
              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium bg-gradient-to-r from-[#F7B600] to-[#F59E0B] bg-clip-text text-transparent">At Risk</span>
                  <div className="p-2 bg-gradient-to-br from-[#F7B600]/20 to-[#F59E0B]/10 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-[#F7B600]" />
                  </div>
                </div>
                
                <div className="text-5xl font-bold bg-gradient-to-r from-[#F7B600] to-[#F59E0B] bg-clip-text text-transparent mb-4">12</div>
                <p className="text-xs text-muted-foreground">Needs review in 7 days</p>
              </div>
            </Card>

            <Card className="relative p-6 bg-gradient-to-br from-[#10B981]/15 via-white to-[#10B981]/5 border-l-4 border-l-[#10B981] hover:shadow-2xl transition-all duration-300 hover:scale-105 group overflow-hidden">
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Icon background glow */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-[#10B981] rounded-full blur-2xl opacity-20"></div>
              
              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium bg-gradient-to-r from-[#10B981] to-[#10B981]/70 bg-clip-text text-transparent">Passing Controls</span>
                  <div className="p-2 bg-gradient-to-br from-[#10B981]/20 to-[#10B981]/10 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  </div>
                </div>
                
                <div className="text-5xl font-bold text-[#10B981] mb-4">24</div>
                <p className="text-xs text-muted-foreground">Fully compliant</p>
              </div>
            </Card>
          </div>
        </section>

        {/* System Liveness */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F71]/8 via-gray-50 to-[#F7B600]/8 rounded-lg -z-10"></div>
          <h2 className="font-[family-name:var(--font-audiowide)] text-xl font-bold mb-6 pt-6 px-6">System Liveness (Continuous Operation)</h2>
          <Card className="p-6 bg-white/80 backdrop-blur mx-6 mb-6">
            <div className="space-y-4">
              {[
                { name: "Watcher", status: "active", lastSync: "2 min ago", items: "156 regs", icon: Eye, color: "#1A1F71" },
                { name: "Interpreter", status: "active", lastSync: "5 min ago", items: "3 pending", icon: Brain, color: "#F7B600" },
                { name: "Monitor", status: "active", lastSync: "1 min ago", items: "2,847 items", icon: Search, color: "#10B981" },
                { name: "Remediator", status: "active", lastSync: "8 min ago", items: "12 today", icon: Wrench, color: "#F59E0B" },
                { name: "Learning", status: "active", lastSync: "1 hr ago", items: "94% accuracy", icon: BookOpen, color: "#8B5CF6" },
              ].map((agent) => {
                const Icon = agent.icon
                return (
                  <div key={agent.name} className="relative p-4 bg-gradient-to-r from-white via-gray-50/50 to-white rounded-xl border hover:border-opacity-40 hover:shadow-lg transition-all duration-300 group overflow-hidden" style={{ borderColor: `${agent.color}30` }}>
                    {/* Animated status indicator */}
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-12 rounded-r-full shadow-lg" style={{ backgroundColor: agent.color, boxShadow: `0 0 10px ${agent.color}50` }}>
                      <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: agent.color }}></div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {/* Icon with glow effect */}
                      <div className="relative">
                        <div className="absolute inset-0 rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity" style={{ backgroundColor: agent.color }}></div>
                        <div className="relative p-3 bg-gradient-to-br rounded-lg" style={{ background: `linear-gradient(to bottom right, ${agent.color}, ${agent.color}CC)` }}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      
                      {/* Content with gradient text */}
                      <div className="flex-1">
                        <p className="font-medium bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${agent.color}, ${agent.color}B3)` }}>{agent.name}</p>
                        <p className="text-xs text-muted-foreground">Last sync: {agent.lastSync}</p>
                      </div>
                      
                      <Badge className="font-mono border" style={{ backgroundColor: `${agent.color}20`, color: agent.color, borderColor: `${agent.color}30` }}>{agent.items}</Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-2 gap-6">
          <Card className="relative p-6 bg-gradient-to-br from-[#1A1F71]/8 via-white to-[#F7B600]/8 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#1A1F71]/20 to-transparent rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#F7B600]/20 to-transparent rounded-tl-full"></div>
            
            {/* Header with gradient */}
            <div className="relative mb-6 pb-3 border-b border-[#1A1F71]/10">
              <h3 className="font-[family-name:var(--font-audiowide)] font-bold bg-gradient-to-r from-[#1A1F71] to-[#F7B600] bg-clip-text text-transparent">
                Compliance Trend (7 Days)
              </h3>
            </div>
            {/* Chart with enhanced background */}
            <div className="relative bg-white/50 backdrop-blur p-4 rounded-lg">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={complianceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A1F71" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1A1F71" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[70, 95]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="#1A1F71" fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="relative p-6 bg-gradient-to-br from-[#F7B600]/8 via-white to-[#10B981]/8 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F7B600]/20 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#10B981]/20 to-transparent rounded-tr-full"></div>
            
            {/* Header with gradient */}
            <div className="relative mb-6 pb-3 border-b border-[#F7B600]/10">
              <h3 className="font-[family-name:var(--font-audiowide)] font-bold bg-gradient-to-r from-[#F7B600] to-[#10B981] bg-clip-text text-transparent">
                Violations by Category
              </h3>
            </div>
            {/* Chart with enhanced background */}
            <div className="relative bg-white/50 backdrop-blur p-4 rounded-lg">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={violationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {violationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* Recent Findings */}
        <section>
          <h2 className="font-[family-name:var(--font-audiowide)] text-xl font-bold mb-6">Recent Findings</h2>
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-white">
            {/* Gradient header with pattern */}
            <div className="relative bg-gradient-to-r from-[#1A1F71]/15 via-[#F7B600]/15 to-[#10B981]/15 p-4 border-b border-white/50">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#1A1F71_1px,transparent_1px)] bg-[length:20px_20px]"></div>
              
              <div className="relative flex items-center justify-between">
                <h3 className="font-[family-name:var(--font-audiowide)] font-bold">Recent Findings</h3>
                <Badge className="bg-gradient-to-r from-[#1A1F71] to-[#1A1F71]/80 text-white">Live</Badge>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#1A1F71]/10 via-[#F7B600]/10 to-[#10B981]/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Finding</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Source</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { id: "F-001", type: "PAN Exposure", source: "support_email", status: "critical", label: "Open" },
                    { id: "F-002", type: "SSN Logging", source: "chat_log", status: "warning", label: "Fixing" },
                    { id: "F-003", type: "PAN Exposure", source: "transaction", status: "success", label: "Fixed" },
                  ].map((finding) => (
                    <tr key={finding.id} className="hover:bg-gradient-to-r hover:from-[#1A1F71]/5 hover:via-transparent hover:to-[#F7B600]/5 transition-all duration-200 group">
                      <td className="px-6 py-4 text-sm font-mono font-bold bg-gradient-to-r from-[#1A1F71] to-[#1A1F71]/70 bg-clip-text text-transparent">{finding.id}</td>
                      <td className="px-6 py-4 text-sm font-medium">{finding.type}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{finding.source}</td>
                      <td className="px-6 py-4">
                        <Badge
                          className={
                            finding.status === "critical"
                              ? "bg-gradient-to-r from-destructive to-destructive/80 text-white border-0"
                              : finding.status === "warning"
                                ? "bg-gradient-to-r from-[#F7B600]/20 to-[#F59E0B]/20 text-[#F7B600] border-[#F7B600]/30"
                                : "bg-gradient-to-r from-[#10B981]/20 to-[#10B981]/20 text-[#10B981] border-[#10B981]/30"
                          }
                        >
                          {finding.label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm" className="hover:bg-gradient-to-r hover:from-[#1A1F71]/10 hover:to-transparent transition-all">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
