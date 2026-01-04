"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  AlertCircle,
  Bot,
  User,
  Loader2,
  Scale,
  ChevronRight,
  ExternalLink,
  Lightbulb,
  Shield,
  Trash2,
  Database,
  Clock,
  Brain,
  BookOpen
} from "lucide-react"
import { useVistaStore, ChatMessage } from "@/lib/store"

// Suggested questions based on India regulatory context
const getSuggestedQuestions = (hasFindings: boolean, hasDebates: boolean) => {
  const questions: string[] = []

  if (hasFindings) {
    questions.push("What are my current critical compliance violations?")
    questions.push("How do I remediate Aadhaar exposure findings?")
    questions.push("Explain RBI data localization requirements")
  }

  if (hasDebates) {
    questions.push("Summarize the recent regulatory debates")
    questions.push("What new compliance controls were approved?")
    questions.push("How does DPDP Act affect our data processing?")
  }

  questions.push("What does PCI DSS require for card storage in India?")
  questions.push("How do I handle CERT-In incident reporting?")
  questions.push("What are RBI KYC verification requirements?")

  return questions.slice(0, 6)
}

// AI response generator with context from findings, debates, and XAI logs
const generateAIResponse = (
  question: string,
  findings: ReturnType<typeof useVistaStore>["getFindings"],
  debates: ReturnType<typeof useVistaStore>["getDebates"],
  xaiLogs: ReturnType<typeof useVistaStore>["getXAILogs"],
  knowledgeBase: ReturnType<typeof useVistaStore>["getKnowledgeBase"],
  searchXAI: ReturnType<typeof useVistaStore>["searchXAIContext"]
): { content: string; relatedFindings?: string[]; relatedDebates?: string[] } => {
  const q = question.toLowerCase()
  const allFindings = findings()
  const allDebates = debates()
  const logs = xaiLogs()
  const kb = knowledgeBase()

  // Search XAI context for relevant information
  const xaiResults = searchXAI(question)

  // Check for findings-related queries
  if (q.includes("critical") || q.includes("violation") || q.includes("finding")) {
    const criticalFindings = allFindings.filter(f => f.severity === "critical" && f.status === "open")
    const relatedIds = criticalFindings.map(f => f.id)

    if (criticalFindings.length > 0) {
      return {
        content: `**Current Critical Violations**\n\nYou have ${criticalFindings.length} critical compliance violation(s) that require immediate attention:\n\n${criticalFindings.map((f, i) => `${i + 1}. **${f.type}** (${f.id})\n   - Source: ${f.source}\n   - Requirement: ${f.requirement}\n   - Status: ${f.status}\n   - ${f.autoRemediated ? "Auto-remediation scheduled" : "Manual review required"}`).join("\n\n")}\n\n**Recommended Actions:**\n- Review each finding's XAI explanation for context\n- Approve auto-remediation tasks where applicable\n- Create remediation tasks for manual review items\n- Document all decisions for audit trail\n\n**Indian Regulatory Context:**\n- Aadhaar exposures must be reported to UIDAI within 72 hours\n- PAN exposures require IT Act compliance review\n- Card data requires RBI tokenization compliance`,
        relatedFindings: relatedIds
      }
    } else {
      return {
        content: "**No Critical Violations**\n\nGreat news! You currently have no critical compliance violations. However, I recommend:\n\n1. Running regular compliance scans on new data sources\n2. Reviewing the Regulatory Watcher for pending debates\n3. Keeping your compliance sources up to date\n\nWould you like me to explain any specific Indian compliance requirement?"
      }
    }
  }

  // Check for debate-related queries
  if (q.includes("debate") || q.includes("regulatory") || q.includes("ruling") || q.includes("control")) {
    const pendingDebates = allDebates.filter(d => d.status === "interpreting")
    const approvedDebates = allDebates.filter(d => d.status === "approved")
    const relatedIds = [...pendingDebates, ...approvedDebates].map(d => d.id)

    // Get debate logs from XAI
    const debateLogs = logs?.debateLogs || []

    return {
      content: `**Regulatory Debate Summary**\n\n**Pending Review (${pendingDebates.length}):**\n${pendingDebates.length > 0 ? pendingDebates.map(d => `- **${d.regulationTitle}**\n  Control: ${d.controlId} | Confidence: ${d.confidence}%\n  Requirement: ${d.requirement}`).join("\n\n") : "No pending debates"}\n\n**Recently Approved (${approvedDebates.length}):**\n${approvedDebates.length > 0 ? approvedDebates.map(d => `- **${d.regulationTitle}**\n  Control: ${d.controlId} | Confidence: ${d.confidence}%`).join("\n\n") : "No approved debates"}\n\n**XAI Insight:** The AI Constitutional Debate process uses a Proposer-Critic-Judge framework to interpret Indian regulations. This ensures balanced analysis considering both strict compliance and operational practicality.\n\n**Active Debate Sources:** RBI Circulars, DPDP Act 2023, CERT-In Directions, PCI DSS v4.0, NPCI Guidelines`,
      relatedDebates: relatedIds
    }
  }

  // Aadhaar queries
  if (q.includes("aadhaar") || q.includes("uidai")) {
    const aadhaarFindings = allFindings.filter(f => f.type.toLowerCase().includes("aadhaar"))
    const aadhaarInfo = kb?.indianPII?.AADHAAR || {}

    return {
      content: `**Aadhaar Data Protection Requirements**\n\n**UIDAI Regulations:**\n\n1. **Storage Restrictions**\n   - Full Aadhaar cannot be stored without explicit purpose\n   - Only last 4 digits may be displayed\n   - Virtual ID (VID) recommended for verification\n\n2. **Display & Masking**\n   - Format: XXXX-XXXX-1234 (mask first 8 digits)\n   - Never display full Aadhaar in logs, emails, or support tickets\n\n3. **DPDP Act Classification**\n   - Aadhaar is Sensitive Personal Data under Section 8(6)\n   - Requires explicit consent for processing\n   - Data localization mandatory (India servers only)\n\n4. **Penalties**\n   - Up to Rs. 250 crore for data breaches\n   - Criminal liability under IT Act for negligence\n\n${aadhaarFindings.length > 0 ? `\n**Your Current Aadhaar Findings:**\nYou have ${aadhaarFindings.length} Aadhaar-related finding(s). ${aadhaarFindings.filter(f => f.status === "open").length} are currently open.\n` : ""}\n**VISTA Recommendation:** Implement Aadhaar masking at data entry, use VID for verification APIs, encrypt at rest with AES-256.`,
      relatedFindings: aadhaarFindings.map(f => f.id)
    }
  }

  // PAN Card queries
  if (q.includes("pan") && !q.includes("pci")) {
    const panFindings = allFindings.filter(f => f.type.toLowerCase().includes("pan card"))
    return {
      content: `**PAN Card Data Requirements**\n\n**IT Act SPDI Rules:**\n\n1. **Classification**\n   - PAN is financial sensitive data under SPDI Rules 2011\n   - Linked to tax records and financial history\n\n2. **Protection Requirements**\n   - Encrypt at rest using approved algorithms\n   - Mask in all non-production environments\n   - Access logging mandatory\n\n3. **KYC Usage**\n   - RBI allows PAN for customer identification\n   - Must verify against NSDL/UTIITSL database\n   - Store encrypted, display masked (AB***1234C)\n\n${panFindings.length > 0 ? `\n**Your Current PAN Findings:**\nYou have ${panFindings.length} PAN Card finding(s). ${panFindings.filter(f => f.status === "open").length} are currently open.\n` : ""}\n**VISTA Recommendation:** Never store PAN in plaintext. Implement field-level encryption for database storage.`,
      relatedFindings: panFindings.map(f => f.id)
    }
  }

  // PCI DSS / Card queries
  if (q.includes("pci") || q.includes("card") || (q.includes("credit") && q.includes("card"))) {
    const cardFindings = allFindings.filter(f => f.type.toLowerCase().includes("card"))
    const pciInfo = kb?.regulations?.PCI_DSS || {}

    return {
      content: `**PCI DSS Requirements in India**\n\n**Key Requirements:**\n\n1. **PCI DSS 3.4** - Render PAN unreadable anywhere stored\n   - Use tokenization (RBI mandated for card-on-file)\n   - Encryption with AES-256 minimum\n\n2. **RBI Card Storage Guidelines (2022)**\n   - No entity except card networks can store full card data\n   - CoF tokenization mandatory since Oct 2022\n   - Device-based tokens for recurring payments\n\n3. **Display Requirements**\n   - Show only first 6 + last 4 digits\n   - Never log full PAN in any system\n   - CVV must never be stored\n\n4. **India-Specific Requirements**\n   - RBI data localization: All payment data on India servers\n   - PA/PG aggregators must be PCI DSS compliant\n   - Annual RoC submission to RBI\n\n${cardFindings.length > 0 ? `\n**Your Current Card Findings:**\nYou have ${cardFindings.length} card-related finding(s). ${cardFindings.filter(f => f.status === "open").length} are currently open.\n` : ""}\n**VISTA Recommendation:** Implement card-on-file tokenization via network tokens. Use P2PE for transmission.`,
      relatedFindings: cardFindings.map(f => f.id)
    }
  }

  // DPDP Act queries
  if (q.includes("dpdp") || q.includes("data protection") || q.includes("privacy")) {
    const dpdpInfo = kb?.regulations?.DPDP_ACT || {}
    const dpdpDebates = allDebates.filter(d => d.source.includes("DPDP") || d.regulationTitle.includes("DPDP"))

    return {
      content: `**DPDP Act 2023 Requirements**\n\n**Key Provisions:**\n\n1. **Consent Management (Section 6)**\n   - Free, specific, informed, unambiguous consent required\n   - Consent Manager registration mandatory\n   - Easy withdrawal mechanism required\n\n2. **Data Principal Rights (Section 11-14)**\n   - Right to access personal data\n   - Right to correction and erasure\n   - Right to grievance redressal\n\n3. **Data Fiduciary Obligations**\n   - Purpose limitation - collect only what's needed\n   - Storage limitation - delete when no longer required\n   - Appoint Data Protection Officer for significant fiduciaries\n\n4. **Cross-Border Transfers**\n   - Transfers allowed except to blacklisted countries\n   - Government may notify restricted countries\n   - Sectoral regulators (RBI) may have stricter rules\n\n5. **Penalties**\n   - Up to Rs. 250 crore for data breaches\n   - Up to Rs. 200 crore for non-compliance with DPO duties\n\n${dpdpDebates.length > 0 ? `\n**Related Regulatory Debates:**\n${dpdpDebates.map(d => `- ${d.regulationTitle}`).join("\n")}\n` : ""}\n**VISTA Recommendation:** Implement consent capture UI, maintain processing records, appoint DPO if processing significant data.`,
      relatedDebates: dpdpDebates.map(d => d.id)
    }
  }

  // RBI Data Localization queries
  if (q.includes("rbi") || q.includes("localization") || q.includes("data storage")) {
    const rbiDebates = allDebates.filter(d => d.source.includes("RBI") || d.regulationTitle.toLowerCase().includes("rbi"))
    const rbiInfo = kb?.regulations?.RBI_DATA_LOC || {}

    return {
      content: `**RBI Data Localization Requirements**\n\n**April 2018 Circular (Updated 2024):**\n\n1. **Scope**\n   - All payment system data must be stored in India\n   - Applies to PSOs, banks, PAs, and PGs\n   - End-to-end transaction data included\n\n2. **Storage Requirements**\n   - Primary data center in India\n   - DR site also in India\n   - No mirroring to foreign locations for payment data\n\n3. **Processing Exceptions**\n   - Cross-border transactions: Foreign leg can be processed abroad\n   - Must bring data back to India within 24 hours\n   - Domestic transactions: Must be processed entirely in India\n\n4. **Compliance Verification**\n   - Annual system audit required\n   - Board-approved data storage policy\n   - Quarterly compliance reports\n\n**Penalties:**\n- License revocation for non-compliance\n- Regulatory action under PSS Act\n\n${rbiDebates.length > 0 ? `\n**Related Regulatory Debates:**\n${rbiDebates.map(d => `- ${d.regulationTitle}`).join("\n")}\n` : ""}\n**VISTA Recommendation:** Audit all cloud services for India-region deployment. Document data flows with localization mapping.`,
      relatedDebates: rbiDebates.map(d => d.id)
    }
  }

  // CERT-In queries
  if (q.includes("cert") || q.includes("incident") || q.includes("breach") || q.includes("6 hour") || q.includes("reporting")) {
    const certInfo = kb?.regulations?.CERT_IN || {}

    return {
      content: `**CERT-In Incident Reporting Requirements**\n\n**April 2022 Directions:**\n\n1. **Mandatory Reporting (6 Hours)**\n   - Targeted scanning/probing of critical systems\n   - Compromise of critical information systems\n   - Unauthorized access to IT systems\n   - Data breaches and leaks\n   - Attacks on servers and network equipment\n\n2. **Log Retention (180 Days)**\n   - All ICT system logs must be maintained\n   - Must be retained in India\n   - Available for CERT-In inspection\n\n3. **Synchronization Requirements**\n   - Connect to NTP servers (ntp.nic.in or approved)\n   - System clocks must be synchronized\n   - Critical for incident correlation\n\n4. **Reporting Format**\n   - Use prescribed form on CERT-In portal\n   - Include: Date/time, affected systems, impact assessment\n   - Follow-up reports within 24 hours\n\n**Non-Compliance Penalties:**\n- Up to 1 year imprisonment\n- Fine up to Rs. 1 lakh\n\n**VISTA Recommendation:** Configure automated SIEM alerts to trigger incident reports. Implement 6-hour SLA for security team response.`
    }
  }

  // UPI / NPCI queries
  if (q.includes("upi") || q.includes("npci") || q.includes("vpa") || q.includes("payment")) {
    const upiFindings = allFindings.filter(f => f.type.toLowerCase().includes("upi") || f.type.toLowerCase().includes("vpa"))

    return {
      content: `**NPCI/UPI Compliance Requirements**\n\n**UPI Operating Guidelines:**\n\n1. **VPA Protection**\n   - VPAs uniquely identify bank accounts\n   - Must be masked in logs (abc***@okaxis)\n   - Never expose full VPA in error messages\n\n2. **Transaction Limits**\n   - Standard UPI: Rs. 1 lakh per transaction\n   - UPI Lite: Rs. 500 per transaction, Rs. 2,000 wallet limit\n   - Merchant payments: May have higher limits\n\n3. **Fraud Prevention**\n   - Implement device binding for UPI apps\n   - Velocity checks on transactions\n   - Report fraud to NPCI within 24 hours\n\n4. **Data Requirements**\n   - Transaction data localized in India\n   - Real-time settlement reporting to NPCI\n   - Customer dispute resolution within T+5 days\n\n${upiFindings.length > 0 ? `\n**Your Current UPI Findings:**\nYou have ${upiFindings.length} UPI-related finding(s). ${upiFindings.filter(f => f.status === "open").length} are currently open.\n` : ""}\n**VISTA Recommendation:** Implement VPA masking filter in all logging pipelines. Enable NPCI fraud reporting integration.`,
      relatedFindings: upiFindings.map(f => f.id)
    }
  }

  // KYC queries
  if (q.includes("kyc") || q.includes("verification") || q.includes("customer")) {
    return {
      content: `**RBI KYC Requirements**\n\n**Master Direction on KYC (2016, Updated 2023):**\n\n1. **Customer Identification**\n   - OVD (Officially Valid Documents): Aadhaar, PAN, Passport, Voter ID\n   - Video KYC allowed for remote onboarding\n   - Re-KYC periodicity based on risk category\n\n2. **Video KYC (V-CIP)**\n   - Live video interaction with trained official\n   - Geo-tagging of customer location\n   - Concurrent document verification\n   - Recording retention: 8 years\n\n3. **C-KYC Registry**\n   - Upload KYC to CERSAI C-KYC registry\n   - Fetch existing KYC for simplified onboarding\n   - 14-character KYC Identifier\n\n4. **Risk Categorization**\n   - Low risk: Simplified due diligence\n   - Medium risk: Standard CDD\n   - High risk: Enhanced due diligence + senior approval\n\n**Penalties:**\n- RBI monetary penalties for non-compliance\n- Account freezing for non-verified customers\n\n**VISTA Recommendation:** Implement automated V-KYC with Aadhaar OTP verification. Integrate with C-KYC registry for existing customer checks.`
    }
  }

  // AML / PMLA queries
  if (q.includes("aml") || q.includes("pmla") || q.includes("money laundering") || q.includes("suspicious")) {
    return {
      content: `**PMLA / AML Requirements in India**\n\n**Prevention of Money Laundering Act 2002:**\n\n1. **Customer Due Diligence**\n   - Verify identity using OVDs\n   - Understand nature of business/occupation\n   - Identify beneficial owners (>25% ownership)\n\n2. **Transaction Monitoring**\n   - Cash transactions > Rs. 10 lakh: Report to FIU-IND\n   - Suspicious transactions: STR within 7 days\n   - Cross-border wire transfers: Enhanced scrutiny\n\n3. **Record Retention**\n   - All records: 5 years from end of relationship\n   - STR records: 5 years from filing\n   - Available for ED/FIU inspection\n\n4. **Reporting Obligations**\n   - CTR: Cash Transaction Report (monthly)\n   - STR: Suspicious Transaction Report (within 7 days)\n   - CCT: Counterfeit Currency Report\n\n**Designated Officers:**\n- Appoint Principal Officer for FIU reporting\n- Designated Director for PMLA compliance\n\n**VISTA Recommendation:** Configure rule-based STR triggers in transaction monitoring. Implement automated CTR generation for cash threshold breaches.`
    }
  }

  // Remediation queries
  if (q.includes("remediat") || q.includes("fix") || q.includes("resolve")) {
    const openFindings = allFindings.filter(f => f.status === "open")
    const remediationLogs = logs?.remediationLogs || []

    return {
      content: `**Remediation Guidance**\n\n**Current Open Findings: ${openFindings.length}**\n\n**Remediation Process:**\n\n1. **Review XAI Explanation**\n   - Each finding includes an AI-generated explanation\n   - Understand the Indian regulatory context and risk level\n\n2. **Auto-Remediation**\n   - Critical Aadhaar/Card exposures are auto-scheduled\n   - Review and approve within 24 hours or override\n\n3. **Manual Remediation**\n   - PAN and PII findings require human review\n   - Document your decision rationale\n   - Create remediation tasks with deadlines\n\n4. **Verification**\n   - Re-scan affected sources after remediation\n   - Update finding status to "Fixed"\n   - Audit trail automatically maintained\n\n**Priority Order:**\n${openFindings.length > 0 ? openFindings.sort((a, b) => a.severity === "critical" ? -1 : 1).map((f, i) => `${i + 1}. ${f.id} - ${f.type} (${f.severity})`).join("\n") : "No open findings to remediate!"}\n\n${remediationLogs.length > 0 ? `**Recent Remediation Activity:**\n${remediationLogs.slice(0, 3).map(r => `- ${r.action}: ${r.findingId}`).join("\n")}` : ""}\n\nWould you like detailed remediation steps for a specific finding?`,
      relatedFindings: openFindings.map(f => f.id)
    }
  }

  // Default response with India context summary
  return {
    content: `**Regulatory Q&A Response**\n\nI can help you with compliance questions across Indian regulatory frameworks:\n\n- **DPDP Act 2023** - Digital Personal Data Protection\n- **RBI Guidelines** - Data localization, KYC, Tokenization\n- **CERT-In Directions** - Incident reporting (6-hour rule)\n- **PCI DSS India** - Card data protection with RBI overlay\n- **NPCI/UPI** - Payment system compliance\n- **PMLA** - Anti-money laundering requirements\n- **IT Act SPDI** - Sensitive personal data rules\n\n**Your Current Status:**\n- ${allFindings.filter(f => f.status === "open").length} open compliance findings\n- ${allDebates.filter(d => d.status === "interpreting").length} pending regulatory debates\n\n**Knowledge Base Loaded:**\n${kb ? `- ${Object.keys(kb.regulations || {}).length} regulation frameworks\n- ${Object.keys(kb.indianPII || {}).length} PII type definitions` : "- XAI knowledge base ready"}\n\n**Try asking:**\n- "What are my current critical violations?"\n- "How do I remediate Aadhaar exposure?"\n- "Explain DPDP Act consent requirements"\n- "What is CERT-In 6-hour reporting rule?"\n\n*Note: VISTA's responses are AI-generated guidance based on Indian regulatory frameworks. Consult legal counsel for binding interpretations.*`
  }
}

export default function AskPage() {
  const store = useVistaStore()
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const chatHistory = store.getChatHistory()
  const findings = store.getFindings()
  const debates = store.getDebates()
  const xaiLogs = store.getXAILogs()
  const knowledgeBase = store.getKnowledgeBase()

  const suggestedQuestions = getSuggestedQuestions(findings.length > 0, debates.length > 0)

  // Auto-scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory, isTyping])

  // Send message
  const handleSend = useCallback(async (messageText?: string) => {
    const text = messageText || inputValue.trim()
    if (!text) return

    // Add user message
    store.addChatMessage({
      role: "user",
      content: text
    })

    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 1500))

    // Generate AI response with XAI context
    const response = generateAIResponse(
      text,
      () => findings,
      () => debates,
      () => xaiLogs,
      () => knowledgeBase,
      store.searchXAIContext.bind(store)
    )

    store.addChatMessage({
      role: "assistant",
      content: response.content,
      relatedFindings: response.relatedFindings,
      relatedDebates: response.relatedDebates
    })

    setIsTyping(false)
    inputRef.current?.focus()
  }, [inputValue, findings, debates, store])

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Clear chat
  const handleClearChat = () => {
    store.clearChatHistory()
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  // Get simple welcome content with India context
  const getWelcomeContent = () => {
    const findingsCount = findings.length
    const debatesCount = debates.length
    const kbLoaded = knowledgeBase ? "fully loaded" : "loading"
    return `Hi! I'm VISTA's regulatory assistant with access to Indian compliance frameworks. I have loaded ${findingsCount} compliance findings and ${debatesCount} regulatory debates from your system. My knowledge base (${kbLoaded}) covers DPDP Act 2023, RBI guidelines, CERT-In directions, PCI DSS India, NPCI/UPI regulations, and PMLA requirements. Ask me anything about your compliance status!`
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gradient-to-b from-white via-[#8B5CF6]/5 to-white relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-32 w-96 h-96 bg-[#8B5CF6] rounded-full blur-3xl opacity-[0.08]"></div>
        <div className="absolute bottom-40 left-20 w-[30rem] h-[30rem] bg-[#1A1F71] rounded-full blur-3xl opacity-[0.06]"></div>
      </div>

      {/* Header */}
      <div className="flex-shrink-0 border-b bg-card/80 backdrop-blur relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#1A1F71]">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-audiowide)] text-xl font-bold">Ask The Regulator</h1>
              <p className="text-xs text-muted-foreground">AI-powered regulatory guidance</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground"
            onClick={handleClearChat}
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
        </div>
      </div>

      {/* Chat Messages - Scrollable Area */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="space-y-6">
            {/* Welcome Message - Simple */}
            {chatHistory.length === 1 && chatHistory[0].role === "system" && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#1A1F71] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <Card className="p-4 bg-gradient-to-br from-[#8B5CF6]/10 via-white to-[#8B5CF6]/5 border-[#8B5CF6]/20">
                    <p className="text-sm">{getWelcomeContent()}</p>
                  </Card>

                  {/* Context indicators */}
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground flex-wrap">
                    <div className="flex items-center gap-1">
                      <Database className="w-3 h-3" />
                      <span>{findings.length} findings</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Scale className="w-3 h-3" />
                      <span>{debates.length} debates</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Brain className="w-3 h-3 text-[#8B5CF6]" />
                      <span>XAI logs active</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-[#10B981]" />
                      <span>India KB loaded</span>
                    </div>
                  </div>

                  {/* Suggested Questions */}
                  <div className="mt-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                      <Lightbulb className="w-3 h-3 text-[#F7B600]" />
                      Try asking:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.slice(0, 4).map((question, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2 hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6]/30"
                          onClick={() => handleSend(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Messages */}
            {chatHistory.filter(m => m.role !== "system").map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role !== "user" && (
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#1A1F71] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className={`max-w-[80%] ${message.role === "user" ? "order-first" : ""}`}>
                  <Card className={`p-4 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-[#1A1F71] to-[#1A1F71]/90 text-white border-0"
                      : "bg-gradient-to-br from-[#8B5CF6]/10 via-white to-[#8B5CF6]/5 border-[#8B5CF6]/20"
                  }`}>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      {message.content.split("\n").map((line, i) => {
                        if (line.startsWith("**") && line.endsWith("**")) {
                          return <p key={i} className="font-bold text-sm mb-2">{line.replace(/\*\*/g, "")}</p>
                        }
                        if (line.startsWith("- ")) {
                          return <p key={i} className="text-sm ml-2 mb-1">{line}</p>
                        }
                        if (line.match(/^\d+\./)) {
                          return <p key={i} className="text-sm mb-1">{line}</p>
                        }
                        return line ? <p key={i} className="text-sm mb-2">{line}</p> : <br key={i} />
                      })}
                    </div>

                    {/* Related items */}
                    {(message.relatedFindings?.length || message.relatedDebates?.length) && (
                      <div className="mt-3 pt-3 border-t border-[#8B5CF6]/20">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Related:</p>
                        <div className="flex flex-wrap gap-1">
                          {message.relatedFindings?.map(id => (
                            <Badge key={id} variant="outline" className="text-xs gap-1">
                              <Shield className="w-3 h-3" />
                              {id}
                            </Badge>
                          ))}
                          {message.relatedDebates?.map(id => (
                            <Badge key={id} variant="outline" className="text-xs gap-1">
                              <Scale className="w-3 h-3" />
                              {id}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                  <p className={`text-xs text-muted-foreground mt-1 ${message.role === "user" ? "text-right" : ""}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>

                {message.role === "user" && (
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#F7B600] to-[#F59E0B] flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#1A1F71] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <Card className="p-3 bg-gradient-to-br from-[#8B5CF6]/10 via-white to-[#8B5CF6]/5 border-[#8B5CF6]/20">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#8B5CF6]" />
                    <span className="text-sm text-muted-foreground">Analyzing...</span>
                  </div>
                </Card>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area - Fixed at Bottom */}
      <div className="flex-shrink-0 border-t bg-white/80 backdrop-blur relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about compliance requirements..."
              className="flex-1 px-4 py-3 rounded-xl border-2 border-[#8B5CF6]/20 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all bg-white text-sm"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
            />
            <Button
              className="gap-2 bg-gradient-to-r from-[#8B5CF6] to-[#8B5CF6]/90 hover:shadow-lg transition-all px-6 rounded-xl"
              onClick={() => handleSend()}
              disabled={isTyping || !inputValue.trim()}
            >
              {isTyping ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Send
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            AI-generated guidance with XAI. Consult legal counsel for binding interpretations.
          </p>
        </div>
      </div>
    </div>
  )
}
