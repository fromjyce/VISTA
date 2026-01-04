"use client"

import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Download,
  FileText,
  Shield,
  Scale,
  Calendar,
  Loader2,
  CheckCircle2,
  Eye,
  Brain,
  Wrench,
  FileJson,
  FileBadge,
  Filter,
  Building,
  Settings
} from "lucide-react"
import { useVistaStore } from "@/lib/store"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

interface ReportConfig {
  includeFindings: boolean
  includeDebates: boolean
  includeDataSources: boolean
  includeComplianceScore: boolean
  includeRemediation: boolean
  includeXAI: boolean
  includeAuditTrail: boolean
  regulationFilter: string
  severityFilter: string
  statusFilter: string
  organizationName: string
  reportTitle: string
}

export default function ExportPage() {
  const store = useVistaStore()
  const [isExporting, setIsExporting] = useState(false)
  const [exportPhase, setExportPhase] = useState("")
  const [lastExport, setLastExport] = useState<Date | null>(null)

  const [config, setConfig] = useState<ReportConfig>({
    includeFindings: true,
    includeDebates: true,
    includeDataSources: false,
    includeComplianceScore: true,
    includeRemediation: true,
    includeXAI: true,
    includeAuditTrail: true,
    regulationFilter: "all",
    severityFilter: "all",
    statusFilter: "all",
    reportTitle: "Compliance Evidence Package"
  })

  const findings = store.getFindings()
  const debates = store.getDebates()
  const dataSources = store.getDataSources()
  const stats = store.getStats()

  // Filter findings based on config (India regulations)
  const getFilteredFindings = () => {
    let filtered = [...findings]

    if (config.severityFilter !== "all") {
      filtered = filtered.filter(f => f.severity === config.severityFilter)
    }

    if (config.statusFilter !== "all") {
      filtered = filtered.filter(f => f.status === config.statusFilter)
    }

    if (config.regulationFilter !== "all") {
      filtered = filtered.filter(f => {
        const req = f.requirement.toLowerCase()
        if (config.regulationFilter === "pci") return req.includes("pci") || req.includes("card")
        if (config.regulationFilter === "dpdp") return req.includes("dpdp") || req.includes("personal data") || req.includes("aadhaar")
        if (config.regulationFilter === "rbi") return req.includes("rbi") || req.includes("localization") || req.includes("kyc")
        if (config.regulationFilter === "certin") return req.includes("cert-in") || req.includes("incident")
        if (config.regulationFilter === "npci") return req.includes("npci") || req.includes("upi") || req.includes("vpa")
        return true
      })
    }

    return filtered
  }

  // Filter debates based on config (India regulations)
  const getFilteredDebates = () => {
    let filtered = [...debates]

    if (config.regulationFilter !== "all") {
      filtered = filtered.filter(d => {
        const source = d.source.toLowerCase()
        const title = d.regulationTitle.toLowerCase()
        if (config.regulationFilter === "pci") return source.includes("pci") || title.includes("pci")
        if (config.regulationFilter === "dpdp") return source.includes("dpdp") || title.includes("dpdp") || title.includes("consent")
        if (config.regulationFilter === "rbi") return source.includes("rbi") || title.includes("rbi") || title.includes("localization")
        if (config.regulationFilter === "certin") return source.includes("cert") || title.includes("cert-in") || title.includes("incident")
        if (config.regulationFilter === "npci") return source.includes("npci") || title.includes("upi")
        return true
      })
    }

    return filtered
  }

  // Calculate compliance score based on filtered findings
  const getComplianceScore = () => {
    const filtered = getFilteredFindings()
    const criticalOpen = filtered.filter(f => f.severity === "critical" && f.status === "open").length
    const warningOpen = filtered.filter(f => f.severity === "warning" && f.status === "open").length
    return Math.max(20, 100 - (criticalOpen * 20) - (warningOpen * 5))
  }

  // Generate PDF Report
  const handleExportPDF = useCallback(async () => {
    setIsExporting(true)

    try {
      setExportPhase("Initializing report generator...")
      await new Promise(r => setTimeout(r, 500))

      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // Colors
      const visaBlue = [26, 31, 113] as [number, number, number]
      const visaGold = [247, 182, 0] as [number, number, number]
      const successGreen = [16, 185, 129] as [number, number, number]
      const warningOrange = [245, 158, 11] as [number, number, number]
      const dangerRed = [239, 68, 68] as [number, number, number]
      const purple = [139, 92, 246] as [number, number, number]

      setExportPhase("Generating header...")
      await new Promise(r => setTimeout(r, 300))

      // Header
      pdf.setFillColor(...visaBlue)
      pdf.rect(0, 0, pageWidth, 50, "F")

      // Gold accent
      pdf.setFillColor(...visaGold)
      pdf.rect(0, 50, pageWidth, 4, "F")

      // Logo circle
      pdf.setFillColor(255, 255, 255)
      pdf.circle(25, 25, 14, "F")
      pdf.setTextColor(...visaBlue)
      pdf.setFontSize(18)
      pdf.setFont("helvetica", "bold")
      // TODO: Provide logoBase64 value or import it if needed
      // pdf.addImage(logoBase64, "PNG", 13, 10, 24, 24, undefined, "FAST")
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
      pdf.setFontSize(28)
      pdf.setFont("helvetica", "bold")
      pdf.text("VISTA", 48, 22)

      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")
      pdf.text("Visa-aligned Intelligent System for Trust & Assurance", 48, 30)

      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text(config.reportTitle, 48, 42)

      // Right side metadata
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(9)
      pdf.setFont("helvetica", "normal")
      const reportDate = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
      pdf.text(`Generated: ${reportDate}`, pageWidth - 15, 18, { align: "right" })
      pdf.text("VISA x Shaastra 2026", pageWidth - 15, 32, { align: "right" })

      let yPos = 64

      // Executive Summary
      pdf.setTextColor(...visaBlue)
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Executive Summary", 15, yPos)
      yPos += 10

      const filteredFindings = getFilteredFindings()
      const filteredDebates = getFilteredDebates()
      const score = getComplianceScore()

      // Summary cards
      const summaryMetrics = [
        { label: "Compliance Score", value: `${score}%`, color: score >= 80 ? successGreen : score >= 50 ? warningOrange : dangerRed },
        { label: "Total Findings", value: filteredFindings.length.toString(), color: visaBlue },
        { label: "Critical Open", value: filteredFindings.filter(f => f.severity === "critical" && f.status === "open").length.toString(), color: dangerRed },
        { label: "Resolved", value: filteredFindings.filter(f => f.status === "fixed").length.toString(), color: successGreen }
      ]

      const cardWidth = (pageWidth - 40) / 4
      summaryMetrics.forEach((metric, index) => {
        const xPos = 15 + (index * (cardWidth + 5))
        pdf.setFillColor(245, 247, 250)
        pdf.roundedRect(xPos, yPos, cardWidth, 22, 2, 2, "F")
        pdf.setFillColor(...metric.color)
        pdf.rect(xPos, yPos, 2, 22, "F")

        pdf.setTextColor(100, 100, 100)
        pdf.setFontSize(7)
        pdf.setFont("helvetica", "normal")
        pdf.text(metric.label, xPos + 5, yPos + 7)

        pdf.setTextColor(...metric.color)
        pdf.setFontSize(14)
        pdf.setFont("helvetica", "bold")
        pdf.text(metric.value, xPos + 5, yPos + 17)
      })

      yPos += 32

      setExportPhase("Adding compliance findings...")
      await new Promise(r => setTimeout(r, 400))

      // Findings Section
      if (config.includeFindings && filteredFindings.length > 0) {
        pdf.setTextColor(...visaBlue)
        pdf.setFontSize(14)
        pdf.setFont("helvetica", "bold")
        pdf.text("Compliance Findings", 15, yPos)
        yPos += 8

        const findingsData = filteredFindings.map(f => [
          f.id,
          f.type,
          f.source,
          f.severity.toUpperCase(),
          f.status.charAt(0).toUpperCase() + f.status.slice(1),
          f.requirement.substring(0, 40) + "..."
        ])

        autoTable(pdf, {
          startY: yPos,
          head: [["ID", "Type", "Source", "Severity", "Status", "Requirement"]],
          body: findingsData,
          headStyles: {
            fillColor: visaBlue,
            textColor: [255, 255, 255],
            fontStyle: "bold",
            fontSize: 8
          },
          bodyStyles: { fontSize: 7 },
          columnStyles: {
            0: { cellWidth: 18 },
            3: { cellWidth: 20 },
            4: { cellWidth: 18 },
            5: { cellWidth: 50 }
          },
          didParseCell: (hookData) => {
            if (hookData.section === "body" && hookData.column.index === 3) {
              const severity = hookData.cell.raw?.toString().toLowerCase()
              if (severity === "critical") {
                hookData.cell.styles.textColor = dangerRed
                hookData.cell.styles.fontStyle = "bold"
              } else if (severity === "warning") {
                hookData.cell.styles.textColor = warningOrange
                hookData.cell.styles.fontStyle = "bold"
              }
            }
          },
          alternateRowStyles: { fillColor: [245, 247, 250] },
          margin: { left: 15, right: 15 }
        })

        yPos = (pdf as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12
      }

      // Check for new page
      if (yPos > pageHeight - 60) {
        pdf.addPage()
        yPos = 20
      }

      setExportPhase("Adding XAI explanations...")
      await new Promise(r => setTimeout(r, 400))

      // XAI Section
      if (config.includeXAI && filteredFindings.length > 0) {
        pdf.setTextColor(...purple)
        pdf.setFontSize(14)
        pdf.setFont("helvetica", "bold")
        pdf.text("Explainable AI (XAI) Analysis", 15, yPos)
        yPos += 8

        filteredFindings.slice(0, 3).forEach((finding) => {
          if (yPos > pageHeight - 50) {
            pdf.addPage()
            yPos = 20
          }

          pdf.setFillColor(245, 245, 255)
          pdf.roundedRect(15, yPos, pageWidth - 30, 35, 2, 2, "F")

          pdf.setTextColor(...purple)
          pdf.setFontSize(9)
          pdf.setFont("helvetica", "bold")
          pdf.text(`${finding.id} - ${finding.type}`, 20, yPos + 8)

          pdf.setTextColor(80, 80, 80)
          pdf.setFontSize(7)
          pdf.setFont("helvetica", "normal")

          const xaiText = pdf.splitTextToSize(finding.xaiExplanation, pageWidth - 50)
          pdf.text(xaiText.slice(0, 3), 20, yPos + 15)

          yPos += 40
        })
      }

      // Debates Section
      if (config.includeDebates && filteredDebates.length > 0) {
        if (yPos > pageHeight - 60) {
          pdf.addPage()
          yPos = 20
        }

        setExportPhase("Adding regulatory debates...")
        await new Promise(r => setTimeout(r, 400))

        pdf.setTextColor(...visaBlue)
        pdf.setFontSize(14)
        pdf.setFont("helvetica", "bold")
        pdf.text("AI Constitutional Debates", 15, yPos)
        yPos += 8

        const debatesData = filteredDebates.map(d => [
          d.id,
          d.regulationTitle.substring(0, 35) + "...",
          d.source,
          `${d.confidence}%`,
          d.status.charAt(0).toUpperCase() + d.status.slice(1)
        ])

        autoTable(pdf, {
          startY: yPos,
          head: [["ID", "Regulation", "Source", "Confidence", "Status"]],
          body: debatesData,
          headStyles: {
            fillColor: visaGold,
            textColor: visaBlue,
            fontStyle: "bold",
            fontSize: 8
          },
          bodyStyles: { fontSize: 7 },
          alternateRowStyles: { fillColor: [255, 251, 235] },
          margin: { left: 15, right: 15 }
        })

        yPos = (pdf as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12
      }

      // Remediation Section
      if (config.includeRemediation) {
        if (yPos > pageHeight - 60) {
          pdf.addPage()
          yPos = 20
        }

        setExportPhase("Adding remediation tasks...")
        await new Promise(r => setTimeout(r, 400))

        pdf.setTextColor(...successGreen)
        pdf.setFontSize(14)
        pdf.setFont("helvetica", "bold")
        pdf.text("Remediation Status", 15, yPos)
        yPos += 8

        const autoRemediatedCount = filteredFindings.filter(f => f.autoRemediated).length
        const manualCount = filteredFindings.filter(f => !f.autoRemediated).length
        const fixedCount = filteredFindings.filter(f => f.status === "fixed").length

        const remediationData = [
          ["Auto-Remediation Scheduled", autoRemediatedCount.toString(), "Pending execution within 24 hours"],
          ["Manual Review Required", manualCount.toString(), "Requires human approval"],
          ["Successfully Resolved", fixedCount.toString(), "Audit trail preserved"]
        ]

        autoTable(pdf, {
          startY: yPos,
          head: [["Category", "Count", "Notes"]],
          body: remediationData,
          headStyles: {
            fillColor: successGreen,
            textColor: [255, 255, 255],
            fontStyle: "bold",
            fontSize: 8
          },
          bodyStyles: { fontSize: 8 },
          alternateRowStyles: { fillColor: [236, 253, 245] },
          margin: { left: 15, right: 15 }
        })

        yPos = (pdf as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12
      }

      // Audit Trail
      if (config.includeAuditTrail) {
        if (yPos > pageHeight - 60) {
          pdf.addPage()
          yPos = 20
        }

        setExportPhase("Generating audit trail...")
        await new Promise(r => setTimeout(r, 400))

        pdf.setTextColor(...visaBlue)
        pdf.setFontSize(14)
        pdf.setFont("helvetica", "bold")
        pdf.text("Audit Trail", 15, yPos)
        yPos += 8

        const auditEvents = [
          ["Report Generated", new Date().toISOString(), "System", `Filters: ${config.regulationFilter}, ${config.severityFilter}, ${config.statusFilter}`],
          ["Findings Exported", new Date().toISOString(), "System", `${filteredFindings.length} findings included`],
          ["Debates Exported", new Date().toISOString(), "System", `${filteredDebates.length} debates included`],
          ["XAI Analysis Included", new Date().toISOString(), "System", config.includeXAI ? "Yes" : "No"]
        ]

        autoTable(pdf, {
          startY: yPos,
          head: [["Event", "Timestamp", "Actor", "Details"]],
          body: auditEvents,
          headStyles: {
            fillColor: visaBlue,
            textColor: [255, 255, 255],
            fontStyle: "bold",
            fontSize: 8
          },
          bodyStyles: { fontSize: 7 },
          alternateRowStyles: { fillColor: [245, 247, 250] },
          margin: { left: 15, right: 15 }
        })
      }

      // Footer on all pages
      const totalPages = pdf.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)

        // Footer line
        pdf.setDrawColor(...visaGold)
        pdf.setLineWidth(0.5)
        pdf.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15)

        // Footer text
        pdf.setTextColor(100, 100, 100)
        pdf.setFontSize(7)
        pdf.setFont("helvetica", "normal")
        pdf.text("VISTA - Autonomous Compliance Intelligence | Confidential - For Authorized Use Only", 15, pageHeight - 8)
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 15, pageHeight - 8, { align: "right" })
      }

      setExportPhase("Finalizing export...")
      await new Promise(r => setTimeout(r, 300))

      // Save PDF
      const fileName = `VISTA_${config.reportTitle.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`
      pdf.save(fileName)

      setLastExport(new Date())
      setExportPhase("Export complete!")
      await new Promise(r => setTimeout(r, 500))

    } catch (error) {
      console.error("Error generating PDF:", error)
      setExportPhase("Error generating report")
    } finally {
      setIsExporting(false)
      setExportPhase("")
    }
  }, [config, findings, debates, dataSources, store])

  // Export JSON
  const handleExportJSON = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      config,
      findings: config.includeFindings ? getFilteredFindings() : [],
      debates: config.includeDebates ? getFilteredDebates() : [],
      dataSources: config.includeDataSources ? dataSources : [],
      complianceScore: config.includeComplianceScore ? getComplianceScore() : null,
      stats
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `VISTA_Export_${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    setLastExport(new Date())
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-white via-[#10B981]/5 to-white relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-32 right-20 w-96 h-96 bg-[#10B981] rounded-full blur-3xl opacity-[0.10]"></div>
        <div className="absolute bottom-32 left-32 w-[28rem] h-[28rem] bg-[#1A1F71] rounded-full blur-3xl opacity-[0.08]"></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-[#F7B600] rounded-full blur-3xl opacity-[0.06]"></div>
      </div>

      {/* Top Bar */}
      <div className="border-b bg-card/80 backdrop-blur relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="font-[family-name:var(--font-audiowide)] text-3xl font-bold">Evidence Export</h1>
            <p className="text-sm text-muted-foreground mt-1">Generate customized compliance reports and evidence packages</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleExportJSON}
            >
              <FileJson className="w-4 h-4" />
              Export JSON
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-gradient-to-r from-[#1A1F71] to-[#1A1F71]/90 hover:shadow-lg transition-all"
              onClick={handleExportPDF}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export PDF
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Export Phase */}
        {isExporting && (
          <div className="max-w-7xl mx-auto px-8 pb-4">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#10B981]/20 to-[#1A1F71]/20 rounded-lg border border-[#10B981]/30">
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
              <span className="text-sm font-medium text-[#10B981]">{exportPhase}</span>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8 relative z-10">
        <div className="grid grid-cols-3 gap-8">
          {/* Report Configuration */}
          <div className="col-span-2 space-y-6">
            {/* Report Details */}
            <section>
              <h2 className="font-[family-name:var(--font-audiowide)] text-xl font-bold mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Report Configuration
              </h2>
              <Card className="p-6 bg-gradient-to-br from-[#1A1F71]/10 via-white to-[#F7B600]/10 border-[#1A1F71]/20">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Report Title</label>
                    <Input
                      value={config.reportTitle}
                      onChange={(e) => setConfig({ ...config, reportTitle: e.target.value })}
                      placeholder="Compliance Evidence Package"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Organization Name
                    </label>
                    <Input
                      value={config.organizationName}
                      onChange={(e) => setConfig({ ...config, organizationName: e.target.value })}
                      placeholder="Your Organization"
                    />
                  </div>
                </div>
              </Card>
            </section>

            {/* Include Sections */}
            <section>
              <h2 className="font-[family-name:var(--font-audiowide)] text-lg font-bold mb-4">Include Sections</h2>
              <Card className="p-6 bg-white/90 backdrop-blur">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "includeFindings", label: "Compliance Findings", icon: Shield, desc: "All detected violations and their status" },
                    { key: "includeDebates", label: "Regulatory Debates", icon: Scale, desc: "AI Constitutional Debate records" },
                    { key: "includeXAI", label: "XAI Explanations", icon: Brain, desc: "Explainable AI analysis for each finding" },
                    { key: "includeRemediation", label: "Remediation Status", icon: Wrench, desc: "Auto and manual remediation tracking" },
                    { key: "includeComplianceScore", label: "Compliance Score", icon: CheckCircle2, desc: "Overall compliance health metrics" },
                    { key: "includeAuditTrail", label: "Audit Trail", icon: Eye, desc: "Export activity logging" },
                    { key: "includeDataSources", label: "Data Sources", icon: FileText, desc: "Scanned data source metadata" }
                  ].map(item => {
                    const Icon = item.icon
                    const isChecked = config[item.key as keyof ReportConfig] as boolean
                    return (
                      <div
                        key={item.key}
                        className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          isChecked
                            ? "bg-gradient-to-r from-[#10B981]/10 to-white border-[#10B981]/30"
                            : "bg-gray-50 border-gray-200 opacity-60"
                        }`}
                        onClick={() => setConfig({ ...config, [item.key]: !isChecked })}
                      >
                        <Checkbox checked={isChecked} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className={`w-4 h-4 ${isChecked ? "text-[#10B981]" : "text-gray-400"}`} />
                            <span className="font-medium text-sm">{item.label}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </section>

            {/* Filters */}
            <section>
              <h2 className="font-[family-name:var(--font-audiowide)] text-lg font-bold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h2>
              <Card className="p-6 bg-white/90 backdrop-blur">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Regulation Framework</label>
                    <Select value={config.regulationFilter} onValueChange={(v) => setConfig({ ...config, regulationFilter: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regulations</SelectItem>
                        <SelectItem value="pci">PCI DSS India</SelectItem>
                        <SelectItem value="dpdp">DPDP Act 2023</SelectItem>
                        <SelectItem value="rbi">RBI Guidelines</SelectItem>
                        <SelectItem value="certin">CERT-In Directions</SelectItem>
                        <SelectItem value="npci">NPCI/UPI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Severity Level</label>
                    <Select value={config.severityFilter} onValueChange={(v) => setConfig({ ...config, severityFilter: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Severities</SelectItem>
                        <SelectItem value="critical">Critical Only</SelectItem>
                        <SelectItem value="warning">Warning Only</SelectItem>
                        <SelectItem value="info">Info Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <Select value={config.statusFilter} onValueChange={(v) => setConfig({ ...config, statusFilter: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="fixing">In Progress</SelectItem>
                        <SelectItem value="fixed">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </section>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <section>
              <h2 className="font-[family-name:var(--font-audiowide)] text-lg font-bold mb-4">Report Preview</h2>
              <Card className="p-6 bg-gradient-to-br from-[#1A1F71]/10 via-white to-[#10B981]/10 border-[#1A1F71]/20">
                <div className="space-y-4">
                  <div className="p-4 bg-[#1A1F71] rounded-lg text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <img src="/logo.png" alt="VISTA Logo" className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold">VISTA</p>
                        <p className="text-xs opacity-80">{config.reportTitle}</p>
                      </div>
                    </div>
                    <div className="h-1 w-full bg-[#F7B600] rounded mt-2"></div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Included Content:</p>
                    <div className="space-y-1">
                      {config.includeFindings && (
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                          <span>{getFilteredFindings().length} Compliance Findings</span>
                        </div>
                      )}
                      {config.includeDebates && (
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                          <span>{getFilteredDebates().length} Regulatory Debates</span>
                        </div>
                      )}
                      {config.includeXAI && (
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                          <span>XAI Explanations</span>
                        </div>
                      )}
                      {config.includeRemediation && (
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                          <span>Remediation Status</span>
                        </div>
                      )}
                      {config.includeAuditTrail && (
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                          <span>Audit Trail</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Compliance Score Preview</p>
                    <div className={`text-4xl font-bold ${
                      getComplianceScore() >= 80 ? "text-[#10B981]" : getComplianceScore() >= 50 ? "text-[#F7B600]" : "text-destructive"
                    }`}>
                      {getComplianceScore()}%
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Quick Stats */}
            <Card className="p-6 bg-white/90 backdrop-blur">
              <h3 className="font-bold mb-4">Data Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Findings</span>
                  <Badge>{findings.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Filtered Findings</span>
                  <Badge className="bg-[#1A1F71]/20 text-[#1A1F71]">{getFilteredFindings().length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Debates</span>
                  <Badge>{debates.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Filtered Debates</span>
                  <Badge className="bg-[#F7B600]/20 text-[#F7B600]">{getFilteredDebates().length}</Badge>
                </div>
              </div>
            </Card>

            {/* Last Export */}
            {lastExport && (
              <Card className="p-4 bg-[#10B981]/10 border-[#10B981]/30">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                  <div>
                    <p className="text-sm font-medium text-[#10B981]">Last Export</p>
                    <p className="text-xs text-muted-foreground">
                      {lastExport.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Report Templates */}
        <section>
          <h2 className="font-[family-name:var(--font-audiowide)] text-lg font-bold mb-4">Quick Export Templates</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                name: "Full Evidence Package",
                desc: "Complete India compliance documentation",
                icon: Shield,
                color: "#1A1F71",
                applyConfig: { includeFindings: true, includeDebates: true, includeXAI: true, includeRemediation: true, includeAuditTrail: true, includeComplianceScore: true, regulationFilter: "all" }
              },
              {
                name: "Critical Findings Only",
                desc: "Urgent Aadhaar/PAN/Card exposures",
                icon: FileText,
                color: "#EF4444",
                applyConfig: { includeFindings: true, severityFilter: "critical", includeXAI: true, includeRemediation: true, regulationFilter: "all" }
              },
              {
                name: "RBI Compliance Report",
                desc: "Data localization & tokenization",
                icon: Scale,
                color: "#F7B600",
                applyConfig: { includeFindings: true, regulationFilter: "rbi", includeRemediation: true, includeDebates: true }
              },
              {
                name: "DPDP Act Report",
                desc: "Personal data protection status",
                icon: Eye,
                color: "#10B981",
                applyConfig: { includeFindings: true, regulationFilter: "dpdp", includeXAI: true, includeDebates: true, includeAuditTrail: true }
              }
            ].map((template, i) => {
              const Icon = template.icon
              return (
                <Card
                  key={i}
                  className="p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all border-2 hover:border-opacity-50"
                  style={{ borderColor: `${template.color}30` }}
                  onClick={() => setConfig({ ...config, ...template.applyConfig, reportTitle: template.name })}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${template.color}20` }}>
                      <Icon className="w-4 h-4" style={{ color: template.color }} />
                    </div>
                    <span className="font-medium text-sm">{template.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{template.desc}</p>
                </Card>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
