"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import ReactMarkdown from 'react-markdown'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  AlertCircle,
  Bot,
  User,
  Loader2,
Trash2,
  Lightbulb,
  Shield,
  Scale,
  ExternalLink,
  Database,
  Clock,
  Brain,
  BookOpen
} from "lucide-react"

export default function AskPage() {
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "assistant", content: string, timestamp: string }[]>([])
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // On mount, load chat history from backend
  useEffect(() => {
    fetch("http://localhost:8000/api/ask/history")
      .then(res => res.json())
      .then(setChatHistory)
    // Reset to default suggestions on mount
    setSuggestedQuestions([
      "What are my current critical compliance violations?",
      "How do I remediate Aadhaar exposure findings?",
      "Explain RBI data localization requirements",
      "Summarize the recent regulatory debates",
      "What does PCI DSS require for card storage in India?",
      "How do I handle CERT-In incident reporting?"
    ])
  }, [])

  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    "What are my current critical compliance violations?",
    "How do I remediate Aadhaar exposure findings?",
    "Explain RBI data localization requirements",
    "Summarize the recent regulatory debates",
    "What does PCI DSS require for card storage in India?",
    "How do I handle CERT-In incident reporting?"
  ])

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

    // Validate if question is allowed
    if (!suggestedQuestions.some(q => q.toLowerCase() === text.toLowerCase())) {
      setError("Please select or type a valid suggested question.")
      return
    }
    setError(null)
    setInputValue("")
    setIsTyping(true)

    // Add user message to chatHistory immediately
    setChatHistory(prev => [...prev, { role: "user", content: text, timestamp: new Date().toISOString() }])

    // Send to backend
    const res = await fetch("http://localhost:8000/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    })
    const data = await res.json()
    setChatHistory(prev => [...prev, { role: "assistant", content: data.content, timestamp: data.timestamp }])
    if (data.suggested_questions && Array.isArray(data.suggested_questions)) {
      setSuggestedQuestions(data.suggested_questions)
    }
    setIsTyping(false)
    inputRef.current?.focus()
  }, [inputValue, suggestedQuestions])

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Clear chat
  const handleClearChat = () => {
    setChatHistory([])
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gradient-to-b from-white via-[#8B5CF6]/5 to-white relative" suppressHydrationWarning>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 mx-auto mt-4 max-w-xl">
          {error}
        </div>
      )}
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
            {chatHistory.length === 0 && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#1A1F71] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <Card className="p-4 bg-gradient-to-br from-[#8B5CF6]/10 via-white to-[#8B5CF6]/5 border-[#8B5CF6]/20">
                    <p className="text-sm">Hi! I'm VISTA's regulatory assistant. Ask me anything about your compliance status!</p>

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
                  </Card>
                </div>
              </div>
            )}

            {/* Regular Messages */}
            {chatHistory.filter((m: { role: "user" | "assistant" | "system" }) => m.role !== "system").map((message: { role: "user" | "assistant", content: string, timestamp: string }, idx: number) => (
              <div key={idx} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
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
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  </Card>
                  <p className={`text-xs text-muted-foreground mt-1 ${message.role === "user" ? "text-right" : ""}`}>
                    {formatTime(new Date(message.timestamp))}
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
          {/* Always show follow-up suggestions unless typing */}
          {!isTyping && suggestedQuestions.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-[#F7B600]" />
                Follow-up suggestions:
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
          )}
        </div>
      </div>
    </div>
  )
}
