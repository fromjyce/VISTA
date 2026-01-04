"use client"

import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertCircle,
  CheckCircle2,
  Zap,
  Plus,
  X,
  Database,
  Mail,
  MessageSquare,
  FileText,
  Activity,
  Loader2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Shield,
  Clock,
  Eye,
  Wrench,
  Brain,
  Upload,
  Link,
  Server,
  CreditCard
} from "lucide-react"
import { useVistaStore, ComplianceFinding, DataSource } from "@/lib/store"

// Source type configuration with India-based examples
const sourceTypeConfig = {
  email: {
    inputType: "textarea",
    placeholder: "Paste email content here...\n\nExample:\nFrom: customer@gmail.com\nSubject: KYC Verification\n\nHi Support, my Aadhaar is 7294-8361-7842 and PAN is ABCDE1234F...",
    label: "Email Content",
    icon: Mail
  },
  chat: {
    inputType: "textarea",
    placeholder: "Paste chat transcript here...\n\nExample:\n[10:30] Customer: I need help with UPI payment\n[10:31] Agent: Can you share your mobile number for verification?\n[10:32] Customer: Sure, it's +91-98765-43210",
    label: "Chat Transcript",
    icon: MessageSquare
  },
  database: {
    inputType: "connection",
    placeholder: "postgresql://user:pass@kyc-db.internal:5432/customers",
    label: "Connection String",
    icon: Database
  },
  api: {
    inputType: "api",
    placeholder: "https://api.gateway.fintech.in/v2/transactions",
    label: "API Endpoint",
    icon: Link
  },
  file: {
    inputType: "file",
    placeholder: "Upload a file to scan (CSV, JSON, TXT)",
    label: "File Upload",
    icon: Upload
  },
  transaction: {
    inputType: "textarea",
    placeholder: "Paste UPI/transaction log data...\n\nExample:\nTXN_ID,VPA,CARD_NUM,AMOUNT,STATUS\nUPI2026010512345,user@okaxis,4532-8891-2234-3456,15000,SUCCESS",
    label: "Transaction Data",
    icon: CreditCard
  }
}

export default function CompliancePage() {
  const store = useVistaStore()
  const [isScanning, setIsScanning] = useState(false)
  const [scanPhase, setScanPhase] = useState("")
  const [showAddSource, setShowAddSource] = useState(false)
  const [newSourceName, setNewSourceName] = useState("")
  const [newSourceType, setNewSourceType] = useState<DataSource["type"]>("email")
  const [newSourceContent, setNewSourceContent] = useState("")
  const [expandedFinding, setExpandedFinding] = useState<string | null>(null)
  const [complianceScore, setComplianceScore] = useState(45)
  const [apiEndpoint, setApiEndpoint] = useState("")
  const [apiHeaders, setApiHeaders] = useState("")
  const [dbConnectionString, setDbConnectionString] = useState("")
  const [dbQuery, setDbQuery] = useState("")
  const [uploadedFileName, setUploadedFileName] = useState("")

  const dataSources = store.getDataSources()
  const findings = store.getFindings()

  // Get icon for source type
  const getSourceIcon = (type: DataSource["type"]) => {
    switch (type) {
      case "email": return Mail
      case "chat": return MessageSquare
      case "database": return Database
      case "api": return Activity
      case "file": return FileText
      case "transaction": return Activity
      default: return FileText
    }
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadedFileName(file.name)

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setNewSourceContent(content)
    }
    reader.readAsText(file)
  }

  // Get content based on source type - India-based mock data
  const getContentForSource = (): string => {
    switch (newSourceType) {
      case "database":
        return `Connection: ${dbConnectionString}\nQuery: ${dbQuery}\n\n[Mock Database Result]\nID,CUSTOMER_NAME,PAN_NUMBER,AADHAAR_LAST4,MOBILE,ACCOUNT_NUMBER\n234,Priya Sharma,BMPPS1234K,7842,+91-9876543210,50100123456789\n235,Amit Verma,AVXPS4567K,5678,+91-8765432109,1234567890123456`
      case "api":
        return `Endpoint: ${apiEndpoint}\nHeaders: ${apiHeaders}\n\n[Mock API Response]\n{"customer": {"name": "Rajesh Kumar", "pan": "ABCPK1234A", "aadhaar": "9876-5432-1098", "vpa": "rajesh.kumar@okaxis", "card": "4532-8891-2234-3456"}}`
      default:
        return newSourceContent
    }
  }

  // Add new data source
  const handleAddSource = () => {
    if (!newSourceName) return

    const content = getContentForSource()
    if (!content) return

    store.addDataSource({
      name: newSourceName,
      type: newSourceType,
      content: content
    })

    // Reset all fields
    setNewSourceName("")
    setNewSourceContent("")
    setApiEndpoint("")
    setApiHeaders("")
    setDbConnectionString("")
    setDbQuery("")
    setUploadedFileName("")
    setShowAddSource(false)
  }

  // Check if form is valid based on source type
  const isFormValid = () => {
    if (!newSourceName) return false
    switch (newSourceType) {
      case "database":
        return !!dbConnectionString
      case "api":
        return !!apiEndpoint
      case "file":
        return !!newSourceContent
      default:
        return !!newSourceContent
    }
  }

  // Remove data source
  const handleRemoveSource = (id: string) => {
    store.removeDataSource(id)
  }

  // Scan all data sources
  const handleScan = useCallback(async () => {
    setIsScanning(true)

    setScanPhase("Initializing Monitor Agent...")
    await new Promise(r => setTimeout(r, 800))

    setScanPhase("Loading compliance ruleset from Regulatory Watcher...")
    await new Promise(r => setTimeout(r, 600))

    let newFindings: Omit<ComplianceFinding, "id" | "timestamp">[] = []

    for (const source of dataSources) {
      setScanPhase(`Scanning ${source.name}...`)
      await new Promise(r => setTimeout(r, 800))

      // Detect patterns in content
      const detectedFindings = analyzeContent(source)
      newFindings = [...newFindings, ...detectedFindings]
    }

    setScanPhase("Running AI compliance reasoning chain...")
    await new Promise(r => setTimeout(r, 1000))

    setScanPhase("Generating XAI explanations...")
    await new Promise(r => setTimeout(r, 800))

    setScanPhase("Queuing auto-remediation tasks...")
    await new Promise(r => setTimeout(r, 600))

    // Add findings to store
    for (const finding of newFindings) {
      store.addFinding(finding)
    }

    // Update compliance score based on findings
    const criticalCount = [...findings, ...newFindings.map(f => ({ ...f, id: "", timestamp: new Date() }))].filter(f => f.severity === "critical" && f.status === "open").length
    const newScore = Math.max(20, 100 - (criticalCount * 15) - (newFindings.length * 5))
    setComplianceScore(newScore)

    setScanPhase("Scan complete!")
    await new Promise(r => setTimeout(r, 500))

    setIsScanning(false)
    setScanPhase("")
  }, [dataSources, findings, store])

  // Analyze content for India-specific compliance violations
  const analyzeContent = (source: DataSource): Omit<ComplianceFinding, "id" | "timestamp">[] => {
    const detected: Omit<ComplianceFinding, "id" | "timestamp">[] = []
    const sourceName = source.name.toLowerCase().replace(/\s+/g, "_")

    // Check for Aadhaar Number (12 digits, XXXX-XXXX-XXXX format)
    const aadhaarRegex = /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g
    const aadhaarMatches = source.content.match(aadhaarRegex)
    if (aadhaarMatches) {
      // Filter out card numbers (16 digits)
      const validAadhaar = aadhaarMatches.filter(m => m.replace(/[-\s]/g, '').length === 12)
      if (validAadhaar.length > 0) {
        detected.push({
          type: "Aadhaar Number Exposure",
          source: sourceName,
          severity: "critical",
          status: "open",
          extracted: validAadhaar[0].replace(/(\d{4})[-\s]?(\d{4})[-\s]?(\d{4})/, "XXXX-XXXX-$3"),
          requirement: "DPDP Act Section 8(6) - Aadhaar is Sensitive Personal Data",
          reasoningChain: [
            `Detection: Regex matched 12-digit Aadhaar pattern in ${source.type}`,
            `Context Analysis: Found in ${source.name} without encryption`,
            "Validation: Aadhaar format verified (XXXX-XXXX-XXXX)",
            "Severity: CRITICAL - Aadhaar exposure violates UIDAI guidelines",
            "Remediation: Immediate masking, UIDAI notification assessment"
          ],
          remediation: "Auto-mask Aadhaar (show only last 4 digits). Implement input validation to prevent Aadhaar capture. Create audit trail.",
          xaiExplanation: `Aadhaar numbers are classified as Sensitive Personal Data under DPDP Act 2023 and UIDAI guidelines. This 12-digit unique identifier linked to biometric data was detected in plaintext in "${source.name}". UIDAI strictly prohibits storing or displaying full Aadhaar numbers. Violation can result in penalties up to Rs. 250 crore.`,
          autoRemediated: true
        })
      }
    }

    // Check for PAN Card (ABCDE1234F format)
    const panCardRegex = /\b[A-Z]{5}\d{4}[A-Z]\b/g
    const panCardMatches = source.content.match(panCardRegex)
    if (panCardMatches) {
      detected.push({
        type: "PAN Card Exposure",
        source: sourceName,
        severity: "critical",
        status: "open",
        extracted: panCardMatches[0].replace(/^(.{2}).+(.{2})$/, "$1XXXX$2"),
        requirement: "IT Act SPDI Rules - PAN is financial sensitive data",
        reasoningChain: [
          `Detection: PAN format (5 letters, 4 digits, 1 letter) matched in ${source.type}`,
          `Context Analysis: PAN found in ${source.name} - likely part of KYC data`,
          "Validation: Format indicates Individual/Company PAN",
          "Severity: HIGH - PAN exposure enables financial fraud",
          "Remediation: Encrypt at rest, mask in all exports"
        ],
        remediation: "Encrypt PAN in storage. Mask in all non-production exports. Review access permissions.",
        xaiExplanation: `PAN (Permanent Account Number) is classified as sensitive financial information under IT Act SPDI Rules. This 10-character identifier links to tax records and financial history. Combined with name, it creates identity theft risk. IT Act mandates encryption at rest for such data.`,
        autoRemediated: false
      })
    }

    // Check for Credit/Debit Card PAN (16 digits)
    const cardRegex = /\b(?:\d{4}[-\s]?){3}\d{4}\b/g
    const cardMatches = source.content.match(cardRegex)
    if (cardMatches) {
      const validCards = cardMatches.filter(m => m.replace(/[-\s]/g, '').length === 16)
      if (validCards.length > 0) {
        detected.push({
          type: "Card Number Exposure",
          source: sourceName,
          severity: "critical",
          status: "open",
          extracted: validCards[0].replace(/(\d{4})[-\s]?(\d{4})[-\s]?(\d{4})[-\s]?(\d{4})/, "$1-XXXX-XXXX-$4"),
          requirement: "PCI DSS 3.4 / RBI Card Storage Guidelines",
          reasoningChain: [
            `Detection: 16-digit card pattern matched in ${source.type}`,
            "Validation: Luhn checksum verification pending",
            `Context: Card found in ${source.name} - debug logging suspected`,
            "Severity: CRITICAL - Direct PCI DSS violation",
            "Remediation: Disable debug logging, truncate historical logs"
          ],
          remediation: "Immediately disable debug logging. Truncate card to first 6 + last 4 digits in logs. Add PCI-compliant logging filter.",
          xaiExplanation: `Credit/Debit card Primary Account Numbers (PAN) must never be stored in plaintext per PCI DSS Requirement 3.4 and RBI Card Storage Guidelines. Only first 6 and last 4 digits may be displayed. Full PAN storage is a critical violation that can result in loss of card processing privileges.`,
          autoRemediated: true
        })
      }
    }

    // Check for Indian Mobile Numbers
    const mobileRegex = /(?:\+91[-\s]?)?[6-9]\d{4}[-\s]?\d{5}\b/g
    const mobileMatches = source.content.match(mobileRegex)
    if (mobileMatches && mobileMatches.length > 0 && source.type !== "chat") {
      detected.push({
        type: "Mobile Number Exposure",
        source: sourceName,
        severity: "warning",
        status: "open",
        extracted: mobileMatches[0].replace(/(\d{5})[-\s]?(\d{5})$/, "XXXXX-$2"),
        requirement: "DPDP Act - Mobile number is Personal Data requiring consent",
        reasoningChain: [
          `Detection: Indian mobile pattern (+91-XXXXX-XXXXX) matched`,
          `Context: Found in ${source.name} (${source.type} source)`,
          "Classification: Mobile number = Personal Data under DPDP",
          "Severity: MEDIUM - Requires documented consent",
          "Remediation: Implement consent mechanism, mask in logs"
        ],
        remediation: "Document lawful basis for mobile collection. Implement auto-redaction in logs. Add consent checkpoint.",
        xaiExplanation: `Under DPDP Act 2023, mobile numbers are Personal Data as they directly identify individuals. Storage requires documented lawful basis. TRAI DND regulations also require consent before using mobile numbers for communication.`,
        autoRemediated: false
      })
    }

    // Check for UPI VPA
    const vpaRegex = /\b[\w.-]+@(?:ok(?:axis|sbi|icici|hdfc)|ybl|paytm|ibl|upi)\b/gi
    const vpaMatches = source.content.match(vpaRegex)
    if (vpaMatches) {
      detected.push({
        type: "UPI VPA Exposure",
        source: sourceName,
        severity: "warning",
        status: "open",
        extracted: vpaMatches[0].replace(/^(.{3}).+(@.+)$/, "$1***$2"),
        requirement: "NPCI Guidelines - VPA should be masked to prevent fraud",
        reasoningChain: [
          `Detection: UPI VPA pattern (user@provider) matched`,
          "Validation: Recognized NPCI registered handle suffix",
          `Context: VPA logged in ${source.name} enables targeted vishing`,
          "Severity: MEDIUM - Enables social engineering attacks",
          "Remediation: Mask VPA in logs, show only first 3 chars + provider"
        ],
        remediation: "Implement VPA masking filter in logging pipeline. Sanitize historical logs.",
        xaiExplanation: `UPI Virtual Payment Addresses uniquely identify bank accounts. Exposed VPAs enable targeted vishing attacks where fraudsters impersonate bank officials. NPCI guidelines recommend masking VPAs in all non-essential contexts.`,
        autoRemediated: true
      })
    }

    // Check for Bank Account Numbers (9-18 digits)
    const accountRegex = /\b\d{9,18}\b/g
    const accountMatches = source.content.match(accountRegex)
    if (accountMatches && !cardMatches) {
      const potentialAccounts = accountMatches.filter(m => m.length >= 9 && m.length <= 18)
      if (potentialAccounts.length > 0 && source.content.toLowerCase().includes('account')) {
        detected.push({
          type: "Bank Account Exposure",
          source: sourceName,
          severity: "warning",
          status: "open",
          extracted: potentialAccounts[0].replace(/^(.+)(\d{4})$/, "XXXX-XXXX-$2"),
          requirement: "RBI IT Framework - Account numbers must be encrypted",
          reasoningChain: [
            `Detection: Bank account pattern (9-18 digits) matched`,
            `Context: Found near 'account' keyword in ${source.name}`,
            "Classification: Financial identifier requiring protection",
            "Severity: HIGH - Enables fraudulent transfers with IFSC",
            "Remediation: Tokenize account numbers, encrypt at rest"
          ],
          remediation: "Implement tokenization for account numbers. Decrypt only at point of NEFT/IMPS processing.",
          xaiExplanation: `Bank account numbers combined with IFSC codes enable fraudulent NEFT/IMPS transfers. RBI IT Framework mandates encryption of such data at rest. Tokenization recommended for processing queues.`,
          autoRemediated: false
        })
      }
    }

    return detected
  }

  // Update finding status
  const handleUpdateFindingStatus = (id: string, status: ComplianceFinding["status"]) => {
    store.updateFindingStatus(id, status)
    if (status === "fixed") {
      setComplianceScore(prev => Math.min(100, prev + 10))
    }
  }

  // Format time ago
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return "Just now"
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`
    return `${Math.floor(seconds / 86400)} days ago`
  }

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
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="font-[family-name:var(--font-audiowide)] text-3xl font-bold">Continuous Compliance</h1>
            <p className="text-sm text-muted-foreground mt-1">Real-time scanning with explainable AI reasoning</p>
          </div>
          <Button
            size="sm"
            className="gap-2 bg-gradient-to-r from-[#1A1F71] to-[#1A1F71]/90 hover:shadow-lg transition-all"
            onClick={handleScan}
            disabled={isScanning || dataSources.length === 0}
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Scan All Sources
              </>
            )}
          </Button>
        </div>

        {/* Scanning Phase Indicator */}
        {isScanning && (
          <div className="max-w-7xl mx-auto px-8 pb-4">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#F7B600]/20 to-[#1A1F71]/20 rounded-lg border border-[#F7B600]/30">
              <div className="w-2 h-2 rounded-full bg-[#F7B600] animate-pulse"></div>
              <span className="text-sm font-medium text-[#F7B600]">{scanPhase}</span>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8 relative z-10">
        {/* Data Sources Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-[family-name:var(--font-audiowide)] text-xl font-bold">Data Sources</h2>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setShowAddSource(!showAddSource)}
            >
              <Plus className="w-4 h-4" />
              Add Source
            </Button>
          </div>

          {/* Add Source Form */}
          {showAddSource && (
            <Card className="p-6 mb-6 bg-gradient-to-br from-[#1A1F71]/10 via-white to-[#F7B600]/10 border-2 border-[#1A1F71]/20 animate-in slide-in-from-top-2">
              <h3 className="font-bold mb-4">Add New Data Source</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Source Name</label>
                  <Input
                    placeholder="e.g., Customer Support Chat Logs"
                    value={newSourceName}
                    onChange={(e) => setNewSourceName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Source Type</label>
                  <Select value={newSourceType} onValueChange={(v) => setNewSourceType(v as DataSource["type"])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="chat">Chat Log</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
                      <SelectItem value="api">API Response</SelectItem>
                      <SelectItem value="file">File Upload</SelectItem>
                      <SelectItem value="transaction">Transaction Log</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Dynamic Input Based on Source Type */}
              <div className="mb-4">
                {(() => {
                  const config = sourceTypeConfig[newSourceType]
                  const IconComponent = config.icon

                  if (config.inputType === "textarea") {
                    return (
                      <>
                        <label className="text-sm font-medium mb-2 flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-[#1A1F71]" />
                          {config.label}
                        </label>
                        <Textarea
                          placeholder={config.placeholder}
                          className="h-32 font-mono text-sm"
                          value={newSourceContent}
                          onChange={(e) => setNewSourceContent(e.target.value)}
                        />
                      </>
                    )
                  }

                  if (config.inputType === "file") {
                    return (
                      <>
                        <label className="text-sm font-medium mb-2 flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-[#1A1F71]" />
                          {config.label}
                        </label>
                        <div className="border-2 border-dashed border-[#1A1F71]/30 rounded-lg p-6 text-center hover:border-[#1A1F71]/50 transition-colors cursor-pointer relative">
                          <input
                            type="file"
                            accept=".txt,.csv,.json,.log,.xml"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <Upload className="w-8 h-8 mx-auto text-[#1A1F71]/50 mb-2" />
                          {uploadedFileName ? (
                            <div className="text-sm">
                              <span className="font-medium text-[#10B981]">✓ {uploadedFileName}</span>
                              <p className="text-xs text-muted-foreground mt-1">{newSourceContent.length} characters loaded</p>
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground">
                              <p className="font-medium">Drop file here or click to browse</p>
                              <p className="text-xs mt-1">Supports: .txt, .csv, .json, .log, .xml</p>
                            </div>
                          )}
                        </div>
                      </>
                    )
                  }

                  if (config.inputType === "connection") {
                    return (
                      <>
                        <label className="text-sm font-medium mb-2 flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-[#1A1F71]" />
                          {config.label}
                        </label>
                        <div className="space-y-3">
                          <Input
                            placeholder={config.placeholder}
                            className="font-mono text-sm"
                            value={dbConnectionString}
                            onChange={(e) => setDbConnectionString(e.target.value)}
                          />
                          <div>
                            <label className="text-xs font-medium mb-1 block text-muted-foreground">SQL Query (optional)</label>
                            <Textarea
                              placeholder="SELECT * FROM users WHERE ..."
                              className="h-20 font-mono text-sm"
                              value={dbQuery}
                              onChange={(e) => setDbQuery(e.target.value)}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Server className="w-3 h-3" />
                            Mock mode: Will simulate database response for demo
                          </p>
                        </div>
                      </>
                    )
                  }

                  if (config.inputType === "api") {
                    return (
                      <>
                        <label className="text-sm font-medium mb-2 flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-[#1A1F71]" />
                          {config.label}
                        </label>
                        <div className="space-y-3">
                          <Input
                            placeholder={config.placeholder}
                            className="font-mono text-sm"
                            value={apiEndpoint}
                            onChange={(e) => setApiEndpoint(e.target.value)}
                          />
                          <div>
                            <label className="text-xs font-medium mb-1 block text-muted-foreground">Headers (JSON format, optional)</label>
                            <Textarea
                              placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                              className="h-20 font-mono text-sm"
                              value={apiHeaders}
                              onChange={(e) => setApiHeaders(e.target.value)}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Activity className="w-3 h-3" />
                            Mock mode: Will simulate API response for demo
                          </p>
                        </div>
                      </>
                    )
                  }

                  return null
                })()}
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddSource} disabled={!isFormValid()} className="bg-[#1A1F71] disabled:opacity-50">
                  Add Source
                </Button>
                <Button variant="outline" onClick={() => setShowAddSource(false)}>
                  Cancel
                </Button>
              </div>
            </Card>
          )}

          {/* Data Sources Grid */}
          <div className="grid grid-cols-2 gap-4">
            {dataSources.map(source => {
              const Icon = getSourceIcon(source.type)
              return (
                <Card key={source.id} className="relative p-4 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                    onClick={() => handleRemoveSource(source.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#1A1F71]/20 to-[#1A1F71]/10">
                      <Icon className="w-5 h-5 text-[#1A1F71]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{source.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{source.type}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Added {formatTimeAgo(source.addedAt)}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {source.content.length} chars
                    </Badge>
                  </div>
                  <div className="mt-3 p-2 bg-gray-100 rounded text-xs font-mono truncate">
                    {source.content.substring(0, 100)}...
                  </div>
                </Card>
              )
            })}

            {dataSources.length === 0 && (
              <Card className="col-span-2 p-8 text-center bg-gradient-to-br from-gray-50 to-white">
                <Database className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No data sources added yet.</p>
                <p className="text-sm text-muted-foreground mt-1">Add data sources to scan for compliance violations.</p>
              </Card>
            )}
          </div>
        </section>

        {/* Scan Results / Findings */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-[family-name:var(--font-audiowide)] text-xl font-bold">Compliance Findings</h2>
            <div className="flex items-center gap-4">
              <Badge className="bg-destructive/20 text-destructive border-destructive/30">
                {findings.filter(f => f.severity === "critical" && f.status === "open").length} Critical
              </Badge>
              <Badge className="bg-[#F7B600]/20 text-[#F7B600] border-[#F7B600]/30">
                {findings.filter(f => f.severity === "warning" && f.status === "open").length} Warning
              </Badge>
            </div>
          </div>

          <div className="space-y-6">
            {findings.map(finding => (
              <Card
                key={finding.id}
                className={`relative overflow-hidden transition-all duration-300 ${
                  finding.severity === "critical"
                    ? "bg-gradient-to-br from-destructive/15 via-white to-destructive/5 border-l-4 border-l-destructive"
                    : finding.severity === "warning"
                      ? "bg-gradient-to-br from-[#F7B600]/15 via-white to-[#F59E0B]/5 border-l-4 border-l-[#F7B600]"
                      : "bg-gradient-to-br from-[#1A1F71]/10 via-white to-[#1A1F71]/5 border-l-4 border-l-[#1A1F71]"
                } hover:shadow-2xl`}
              >
                {/* Glow effect */}
                {finding.status === "open" && finding.severity === "critical" && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-destructive rounded-full blur-3xl opacity-10 animate-pulse"></div>
                )}

                <div className="relative p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs font-mono">{finding.id}</Badge>
                        <Badge variant="outline" className="text-xs">{finding.source}</Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTimeAgo(finding.timestamp)}
                        </Badge>
                      </div>
                      <h3 className={`font-bold text-lg ${
                        finding.severity === "critical"
                          ? "bg-gradient-to-r from-destructive to-destructive/70 bg-clip-text text-transparent"
                          : finding.severity === "warning"
                            ? "bg-gradient-to-r from-[#F7B600] to-[#F59E0B] bg-clip-text text-transparent"
                            : "bg-gradient-to-r from-[#1A1F71] to-[#1A1F71]/70 bg-clip-text text-transparent"
                      }`}>
                        {finding.type}
                      </h3>
                      <p className="text-sm text-muted-foreground">{finding.requirement}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={
                        finding.severity === "critical"
                          ? "bg-gradient-to-r from-destructive to-destructive/80 text-white border-0 animate-pulse shadow-lg shadow-destructive/50"
                          : finding.severity === "warning"
                            ? "bg-gradient-to-r from-[#F7B600]/30 to-[#F59E0B]/20 text-[#F7B600] border-[#F7B600]/40"
                            : "bg-gradient-to-r from-[#1A1F71]/30 to-[#1A1F71]/20 text-[#1A1F71] border-[#1A1F71]/40"
                      }>
                        {finding.severity.toUpperCase()}
                      </Badge>
                      <Badge className={
                        finding.status === "fixed"
                          ? "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30"
                          : finding.status === "fixing"
                            ? "bg-[#F7B600]/20 text-[#F7B600] border-[#F7B600]/30"
                            : "bg-destructive/20 text-destructive border-destructive/30"
                      }>
                        {finding.status.charAt(0).toUpperCase() + finding.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  {/* Extracted Data */}
                  <div className={`p-4 rounded-lg mb-4 border-2 ${
                    finding.severity === "critical"
                      ? "bg-gradient-to-r from-destructive/10 via-white to-destructive/5 border-destructive/20"
                      : finding.severity === "warning"
                        ? "bg-gradient-to-r from-[#F7B600]/10 via-white to-[#F59E0B]/5 border-[#F7B600]/20"
                        : "bg-gradient-to-r from-[#1A1F71]/10 via-white to-[#1A1F71]/5 border-[#1A1F71]/20"
                  }`}>
                    <p className="text-xs font-medium mb-1">EXTRACTED DATA</p>
                    <p className="font-mono text-sm font-bold">{finding.extracted}</p>
                  </div>

                  {/* Expandable Details */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mb-4 gap-2"
                    onClick={() => setExpandedFinding(expandedFinding === finding.id ? null : finding.id)}
                  >
                    <Brain className="w-4 h-4" />
                    {expandedFinding === finding.id ? "Hide" : "View"} AI Reasoning & Remediation
                    {expandedFinding === finding.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>

                  {expandedFinding === finding.id && (
                    <div className="space-y-4 mb-4 animate-in slide-in-from-top-2">
                      {/* Reasoning Chain */}
                      <div className={`p-4 rounded-lg border-2 ${
                        finding.severity === "critical"
                          ? "bg-gradient-to-br from-destructive/15 to-destructive/5 border-destructive/30"
                          : "bg-gradient-to-br from-[#F7B600]/15 to-[#F7B600]/5 border-[#F7B600]/30"
                      }`}>
                        <p className="text-sm font-bold flex items-center gap-2 mb-3">
                          <Eye className="w-4 h-4" />
                          COMPLIANCE REASONING CHAIN
                        </p>
                        <div className="space-y-2">
                          {finding.reasoningChain.map((step, index) => (
                            <div key={index} className="flex gap-2 p-2 bg-white/70 backdrop-blur rounded-lg border text-sm">
                              <span className={`font-bold ${
                                finding.severity === "critical" ? "text-destructive" : "text-[#F7B600]"
                              }`}>
                                {index + 1}.
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* XAI Explanation */}
                      <div className="p-4 rounded-lg bg-gradient-to-br from-[#8B5CF6]/15 to-[#8B5CF6]/5 border-2 border-[#8B5CF6]/30">
                        <p className="text-sm font-bold flex items-center gap-2 mb-2 text-[#8B5CF6]">
                          <Lightbulb className="w-4 h-4" />
                          EXPLAINABLE AI (XAI)
                        </p>
                        <p className="text-sm">{finding.xaiExplanation}</p>
                      </div>

                      {/* Remediation */}
                      <div className={`p-4 rounded-lg border-2 ${
                        finding.autoRemediated
                          ? "bg-gradient-to-r from-[#10B981]/15 to-[#10B981]/5 border-[#10B981]/30"
                          : "bg-gradient-to-r from-[#F7B600]/15 to-[#F7B600]/5 border-[#F7B600]/30"
                      }`}>
                        <p className={`text-sm font-bold flex items-center gap-2 mb-2 ${
                          finding.autoRemediated ? "text-[#10B981]" : "text-[#F7B600]"
                        }`}>
                          <Wrench className="w-4 h-4" />
                          {finding.autoRemediated ? "AUTO-REMEDIATION SCHEDULED" : "MANUAL REMEDIATION REQUIRED"}
                        </p>
                        <p className="text-sm">{finding.remediation}</p>
                        {finding.autoRemediated && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Audit trail created | Evidence exported | Executes in 24 hrs unless overridden
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    {finding.status === "open" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#10B981] to-[#10B981]/90 hover:shadow-xl hover:scale-105 transition-all gap-2"
                          onClick={() => handleUpdateFindingStatus(finding.id, "fixing")}
                        >
                          <Wrench className="w-4 h-4" />
                          Start Fixing
                        </Button>
                        {!finding.autoRemediated && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => handleUpdateFindingStatus(finding.id, "reviewing")}
                          >
                            <Eye className="w-4 h-4" />
                            Review
                          </Button>
                        )}
                      </>
                    )}
                    {finding.status === "fixing" && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-[#10B981] to-[#10B981]/90 hover:shadow-xl hover:scale-105 transition-all gap-2"
                        onClick={() => handleUpdateFindingStatus(finding.id, "fixed")}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Mark as Fixed
                      </Button>
                    )}
                    {finding.status === "reviewing" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#10B981] to-[#10B981]/90 gap-2"
                          onClick={() => handleUpdateFindingStatus(finding.id, "fixing")}
                        >
                          Confirm & Fix
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateFindingStatus(finding.id, "fixed")}
                        >
                          Dismiss
                        </Button>
                      </>
                    )}
                    {finding.status === "fixed" && (
                      <Badge className="bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30 gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Resolved
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {findings.length === 0 && (
              <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-white">
                <Shield className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No compliance findings yet.</p>
                <p className="text-sm text-muted-foreground mt-1">Add data sources and run a scan to check for violations.</p>
              </Card>
            )}
          </div>
        </section>

        {/* Compliance Score */}
        <section>
          <Card className={`relative p-8 border-2 hover:shadow-2xl transition-all duration-300 overflow-hidden ${
            complianceScore >= 80
              ? "bg-gradient-to-br from-[#10B981]/10 via-white to-[#10B981]/10 border-[#10B981]/20"
              : complianceScore >= 50
                ? "bg-gradient-to-br from-[#F7B600]/10 via-white to-[#F7B600]/10 border-[#F7B600]/20"
                : "bg-gradient-to-br from-destructive/10 via-white to-destructive/10 border-destructive/20"
          }`}>
            {/* Decorative corners */}
            <div className={`absolute top-0 left-0 w-32 h-32 rounded-br-full ${
              complianceScore >= 80 ? "bg-gradient-to-br from-[#10B981]/20 to-transparent" : complianceScore >= 50 ? "bg-gradient-to-br from-[#F7B600]/20 to-transparent" : "bg-gradient-to-br from-destructive/20 to-transparent"
            }`}></div>
            <div className={`absolute bottom-0 right-0 w-32 h-32 rounded-tl-full ${
              complianceScore >= 80 ? "bg-gradient-to-tl from-[#10B981]/20 to-transparent" : complianceScore >= 50 ? "bg-gradient-to-tl from-[#F7B600]/20 to-transparent" : "bg-gradient-to-tl from-destructive/20 to-transparent"
            }`}></div>

            <div className="text-center relative">
              <p className="font-[family-name:var(--font-audiowide)] text-sm font-medium mb-4">CONTENT COMPLIANCE SCORE</p>

              {/* Circular gauge */}
              <div className="relative inline-block mb-4">
                <div className={`absolute inset-0 blur-3xl opacity-30 animate-pulse ${
                  complianceScore >= 80 ? "bg-[#10B981]" : complianceScore >= 50 ? "bg-[#F7B600]" : "bg-destructive"
                }`}></div>
                <div className={`relative w-48 h-48 mx-auto rounded-full flex items-center justify-center border-4 ${
                  complianceScore >= 80
                    ? "bg-gradient-to-br from-[#10B981]/20 via-white to-[#10B981]/20 border-[#10B981]"
                    : complianceScore >= 50
                      ? "bg-gradient-to-br from-[#F7B600]/20 via-white to-[#F7B600]/20 border-[#F7B600]"
                      : "bg-gradient-to-br from-destructive/20 via-white to-destructive/20 border-destructive"
                }`}>
                  <div className={`text-6xl font-bold ${
                    complianceScore >= 80
                      ? "text-[#10B981]"
                      : complianceScore >= 50
                        ? "text-[#F7B600]"
                        : "text-destructive"
                  }`}>
                    {complianceScore}%
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground font-medium mb-2">
                {findings.filter(f => f.status === "open").length} open violations found
              </p>
              <p className={`text-sm font-bold mb-6 ${
                complianceScore >= 80 ? "text-[#10B981]" : complianceScore >= 50 ? "text-[#F7B600]" : "text-destructive"
              }`}>
                {complianceScore >= 80
                  ? "Good standing - minor issues only"
                  : complianceScore >= 50
                    ? "Attention required - review findings"
                    : "Immediate action required"}
              </p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
