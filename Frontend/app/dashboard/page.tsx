"use client"

import { useState, useCallback, useEffect, useMemo } from "react"
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
import { AlertCircle, CheckCircle2, AlertTriangle, TrendingUp, RefreshCw, Download, Eye, Brain, Search, Wrench, BookOpen, Loader2 } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { useVistaStore } from "@/lib/store"

// Types for dashboard display
interface DashboardFinding {
  id: string
  type: string
  source: string
  status: "critical" | "warning" | "success"
  label: string
  timestamp: string
}

interface AgentStatus {
  name: string
  status: "active" | "idle" | "error"
  lastSync: string
  items: string
  icon: typeof Eye
  color: string
}

const COLORS = ["#1A1F71", "#F7B600", "#EF4444"]

// Helper to format time ago
const formatTimeAgo = (date: Date) => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return "Just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`
  return `${Math.floor(seconds / 86400)} days ago`
}

export default function DashboardPage() {
  const store = useVistaStore()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [lastUpdatedText, setLastUpdatedText] = useState("")
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Get data from store
  const storeFindings = store.getFindings()
  const storeDebates = store.getDebates()
  const storeSources = store.getSources()
  const storeStats = store.getStats()

  // Compute dashboard data from store
  const dashboardData = useMemo(() => {
    // Map findings to dashboard format
    const findings: DashboardFinding[] = storeFindings.slice(0, 6).map(f => ({
      id: f.id,
      type: f.type,
      source: f.source,
      status: f.severity === "critical" ? "critical" : f.severity === "warning" ? "warning" : "success",
      label: f.status === "open" ? "Open" : f.status === "fixing" ? "Fixing" : f.status === "reviewing" ? "Reviewing" : "Fixed",
      timestamp: formatTimeAgo(f.timestamp)
    }))

    // Compute violation categories from findings
    const pciCount = storeFindings.filter(f =>
      f.requirement.toLowerCase().includes("pci") ||
      f.type.toLowerCase().includes("card")
    ).length

    const dpdpCount = storeFindings.filter(f =>
      f.requirement.toLowerCase().includes("dpdp") ||
      f.type.toLowerCase().includes("aadhaar") ||
      f.type.toLowerCase().includes("mobile")
    ).length

    const rbiCount = storeFindings.filter(f =>
      f.requirement.toLowerCase().includes("rbi") ||
      f.type.toLowerCase().includes("upi") ||
      f.type.toLowerCase().includes("bank") ||
      f.type.toLowerCase().includes("vpa")
    ).length

    const violationData = [
      { name: "PCI DSS", value: pciCount || 2 },
      { name: "DPDP/UIDAI", value: dpdpCount || 2 },
      { name: "RBI/NPCI", value: rbiCount || 2 },
    ]

    // Compliance trend data (simulated for the past 5 days)
    const baseScore = storeStats.complianceScore
    const complianceData = [
      { date: "Jan 1", score: Math.max(60, baseScore - 8) },
      { date: "Jan 2", score: Math.max(60, baseScore - 5) },
      { date: "Jan 3", score: Math.max(60, baseScore - 6) },
      { date: "Jan 4", score: Math.max(60, baseScore - 2) },
      { date: "Jan 5", score: baseScore },
    ]

    // Agent status based on actual store data
    const agents: AgentStatus[] = [
      {
        name: "Watcher",
        status: "active",
        lastSync: "2 min ago",
        items: `${storeStats.enabledSources} sources`,
        icon: Eye,
        color: "#1A1F71"
      },
      {
        name: "Interpreter",
        status: "active",
        lastSync: "5 min ago",
        items: `${storeStats.pendingDebates} pending`,
        icon: Brain,
        color: "#F7B600"
      },
      {
        name: "Monitor",
        status: "active",
        lastSync: "1 min ago",
        items: `${storeStats.totalFindings} findings`,
        icon: Search,
        color: "#10B981"
      },
      {
        name: "Remediator",
        status: "active",
        lastSync: "8 min ago",
        items: `${storeStats.fixedFindings} fixed`,
        icon: Wrench,
        color: "#F59E0B"
      },
      {
        name: "Learning",
        status: "active",
        lastSync: "1 hr ago",
        items: "92% accuracy",
        icon: BookOpen,
        color: "#8B5CF6"
      },
    ]

    return {
      pciScore: storeStats.complianceScore,
      criticalIssues: storeStats.criticalFindings,
      atRisk: storeStats.warningFindings + storeStats.pendingDebates,
      passingControls: storeStats.fixedFindings + storeStats.approvedDebates,
      complianceData,
      violationData,
      findings,
      agents
    }
  }, [storeFindings, storeDebates, storeSources, storeStats])

  // Update timestamp on client side only to avoid hydration mismatch
  useEffect(() => {
    const updateTimestamp = () => {
      setLastUpdatedText(
        lastUpdated.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }

    updateTimestamp()
    const interval = setInterval(updateTimestamp, 1000)

    return () => clearInterval(interval)
  }, [lastUpdated])

  // Simulate data refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    setLastUpdated(new Date())
    setIsRefreshing(false)
  }, [])

  // Generate PDF Report
  const handleExportPDF = useCallback(async () => {
    setIsExporting(true)

    try {
      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // Colors
      const visaBlue = [26, 31, 113] as [number, number, number]
      const visaGold = [247, 182, 0] as [number, number, number]
      const successGreen = [16, 185, 129] as [number, number, number]
      const warningOrange = [245, 158, 11] as [number, number, number]
      const dangerRed = [239, 68, 68] as [number, number, number]

      // Header with gradient-like effect
      pdf.setFillColor(...visaBlue)
      pdf.rect(0, 0, pageWidth, 45, "F")

      // Gold accent line
      pdf.setFillColor(...visaGold)
      pdf.rect(0, 45, pageWidth, 3, "F")

      // Logo placeholder (circle with V)
      pdf.setFillColor(255, 255, 255)
      pdf.circle(25, 22, 12, "F")
      pdf.setTextColor(...visaBlue)
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      // Add VISTA logo image from public folder into the PDF (assumes /public/logo.png exists)
      // We need to fetch and convert the image to base64 first
      const logoImgUrl = "/logo.png"
      const logoImg = await fetch(logoImgUrl).then(r => r.blob())
      const reader = new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = () => resolve(fileReader.result as string)
        fileReader.onerror = reject
        fileReader.readAsDataURL(logoImg)
      })
      const logoBase64 = await reader

      // Draw the logo image as a circle with white background for contrast
      pdf.setFillColor(255, 255, 255)
      pdf.circle(25, 22, 12, "F")
      pdf.addImage(logoBase64, "PNG", 13, 10, 24, 24, undefined, "FAST")

      // Title
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(24)
      pdf.setFont("helvetica", "bold")
      pdf.text("VISTA", 45, 20)

      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")
      pdf.text("Visa-aligned Intelligent System for Trust & Assurance", 45, 28)

      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Compliance Dashboard Report", 45, 38)

      // Report metadata
      pdf.setTextColor(100, 100, 100)
      pdf.setFontSize(9)
      pdf.setFont("helvetica", "normal")
      const reportDate = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      pdf.text(`Generated: ${reportDate}`, pageWidth - 15, 20, { align: "right" })
      pdf.text("VISA x Shaastra 2026", pageWidth - 15, 26, { align: "right" })

      let yPos = 58

      // Compliance Health Section
      pdf.setTextColor(...visaBlue)
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Compliance Health Overview", 15, yPos)
      yPos += 10

      // Metrics cards
      const metrics = [
        { label: "Compliance Score", value: `${dashboardData.pciScore}%`, color: successGreen },
        { label: "Critical Issues", value: dashboardData.criticalIssues.toString(), color: dangerRed },
        { label: "At Risk", value: dashboardData.atRisk.toString(), color: warningOrange },
        { label: "Passing Controls", value: dashboardData.passingControls.toString(), color: successGreen },
      ]

      const cardWidth = (pageWidth - 40) / 4
      metrics.forEach((metric, index) => {
        const xPos = 15 + (index * (cardWidth + 5))

        // Card background
        pdf.setFillColor(245, 247, 250)
        pdf.roundedRect(xPos, yPos, cardWidth, 25, 3, 3, "F")

        // Left border accent
        pdf.setFillColor(...metric.color)
        pdf.rect(xPos, yPos, 2, 25, "F")

        // Label
        pdf.setTextColor(100, 100, 100)
        pdf.setFontSize(8)
        pdf.setFont("helvetica", "normal")
        pdf.text(metric.label, xPos + 6, yPos + 8)

        // Value
        pdf.setTextColor(...metric.color)
        pdf.setFontSize(16)
        pdf.setFont("helvetica", "bold")
        pdf.text(metric.value, xPos + 6, yPos + 20)
      })

      yPos += 35

      // System Liveness Section
      pdf.setTextColor(...visaBlue)
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("System Liveness (Agent Status)", 15, yPos)
      yPos += 8

      // Agent status table
      autoTable(pdf, {
        startY: yPos,
        head: [["Agent", "Status", "Last Sync", "Activity"]],
        body: dashboardData.agents.map(agent => [
          agent.name,
          agent.status.toUpperCase(),
          agent.lastSync,
          agent.items,
        ]),
        headStyles: {
          fillColor: visaBlue,
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 9,
        },
        bodyStyles: {
          fontSize: 9,
        },
        alternateRowStyles: {
          fillColor: [245, 247, 250],
        },
        margin: { left: 15, right: 15 },
        tableWidth: "auto",
      })

      yPos = (pdf as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15

      // Violations by Category Section
      pdf.setTextColor(...visaBlue)
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Violations by Category", 15, yPos)
      yPos += 8

      autoTable(pdf, {
        startY: yPos,
        head: [["Category", "Count", "Percentage"]],
        body: dashboardData.violationData.map(v => {
          const total = dashboardData.violationData.reduce((sum, item) => sum + item.value, 0)
          return [v.name, v.value.toString(), `${Math.round((v.value / total) * 100)}%`]
        }),
        headStyles: {
          fillColor: visaGold,
          textColor: visaBlue,
          fontStyle: "bold",
          fontSize: 9,
        },
        bodyStyles: {
          fontSize: 9,
        },
        alternateRowStyles: {
          fillColor: [255, 251, 235],
        },
        margin: { left: 15, right: 15 },
        tableWidth: "auto",
      })

      yPos = (pdf as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15

      // Check if we need a new page
      if (yPos > pageHeight - 80) {
        pdf.addPage()
        yPos = 20
      }

      // Recent Findings Section
      pdf.setTextColor(...visaBlue)
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Recent Findings", 15, yPos)
      yPos += 8

      autoTable(pdf, {
        startY: yPos,
        head: [["ID", "Type", "Source", "Status", "Time"]],
        body: dashboardData.findings.map(f => [
          f.id,
          f.type,
          f.source,
          f.label,
          f.timestamp,
        ]),
        headStyles: {
          fillColor: visaBlue,
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 9,
        },
        bodyStyles: {
          fontSize: 9,
        },
        didParseCell: (hookData) => {
          if (hookData.section === "body" && hookData.column.index === 3) {
            const status = dashboardData.findings[hookData.row.index]?.status
            if (status === "critical") {
              hookData.cell.styles.textColor = dangerRed
              hookData.cell.styles.fontStyle = "bold"
            } else if (status === "warning") {
              hookData.cell.styles.textColor = warningOrange
              hookData.cell.styles.fontStyle = "bold"
            } else if (status === "success") {
              hookData.cell.styles.textColor = successGreen
              hookData.cell.styles.fontStyle = "bold"
            }
          }
        },
        alternateRowStyles: {
          fillColor: [245, 247, 250],
        },
        margin: { left: 15, right: 15 },
        tableWidth: "auto",
      })

      yPos = (pdf as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15

      // Compliance Trend Section
      if (yPos > pageHeight - 60) {
        pdf.addPage()
        yPos = 20
      }

      pdf.setTextColor(...visaBlue)
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Compliance Trend (7 Days)", 15, yPos)
      yPos += 8

      autoTable(pdf, {
        startY: yPos,
        head: [["Date", "Score"]],
        body: dashboardData.complianceData.map(d => [d.date, `${d.score}%`]),
        headStyles: {
          fillColor: successGreen,
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 9,
        },
        bodyStyles: {
          fontSize: 9,
        },
        alternateRowStyles: {
          fillColor: [236, 253, 245],
        },
        margin: { left: 15, right: 15 },
        tableWidth: "auto",
      })

      // Footer
      const totalPages = pdf.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)

        // Footer line
        pdf.setDrawColor(...visaGold)
        pdf.setLineWidth(0.5)
        pdf.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15)

        // Footer text
        pdf.setTextColor(100, 100, 100)
        pdf.setFontSize(8)
        pdf.setFont("helvetica", "normal")
        pdf.text("VISTA - Autonomous Compliance Intelligence", 15, pageHeight - 8)
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 15, pageHeight - 8, { align: "right" })
      }

      // Save PDF
      pdf.save(`VISTA_Compliance_Report_${new Date().toISOString().split("T")[0]}.pdf`)

    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsExporting(false)
    }
  }, [dashboardData])

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
            <p className="text-sm text-muted-foreground mt-1">
              Compliance health overview • Last updated: {lastUpdatedText || "Loading..."}
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-[#1A1F71] hover:bg-[#1A1F71]/90"
              onClick={handleExportPDF}
              disabled={isExporting}
            >
              {isExporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isExporting ? "Generating..." : "Export Report"}
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
                  <span className="text-sm font-medium bg-gradient-to-r from-[#1A1F71] to-[#10B981] bg-clip-text text-transparent">Compliance Score</span>
                  <div className="p-2 bg-gradient-to-br from-[#10B981]/20 to-[#10B981]/10 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-[#10B981]" />
                  </div>
                </div>

                <div className="text-5xl font-bold bg-gradient-to-r from-[#1A1F71] to-[#10B981] bg-clip-text text-transparent mb-4">
                  {dashboardData.pciScore}%
                </div>

                {/* Enhanced progress bar */}
                <div className="relative mt-4 w-full bg-gradient-to-r from-gray-200 to-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-[#1A1F71] via-[#10B981] to-[#10B981] h-3 rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${dashboardData.pciScore}%` }}
                  >
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

                <div className="text-5xl font-bold text-destructive mb-4">{dashboardData.criticalIssues}</div>
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

                <div className="text-5xl font-bold bg-gradient-to-r from-[#F7B600] to-[#F59E0B] bg-clip-text text-transparent mb-4">{dashboardData.atRisk}</div>
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

                <div className="text-5xl font-bold text-[#10B981] mb-4">{dashboardData.passingControls}</div>
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
              {dashboardData.agents.map((agent) => {
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

                      <Badge
                        className="font-mono border"
                        style={{ backgroundColor: `${agent.color}20`, color: agent.color, borderColor: `${agent.color}30` }}
                      >
                        {agent.items}
                      </Badge>
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
                <AreaChart data={dashboardData.complianceData}>
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
                    data={dashboardData.violationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {dashboardData.violationData.map((entry, index) => (
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
                    <th className="px-6 py-3 text-left text-sm font-semibold">Time</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {dashboardData.findings.map((finding) => (
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
                      <td className="px-6 py-4 text-sm text-muted-foreground">{finding.timestamp}</td>
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
