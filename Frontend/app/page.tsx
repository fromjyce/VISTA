"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Eye, Brain, Search, Wrench, BookOpen, RefreshCw, Zap, FileCheck, Shield, Network, TrendingUp, Scale, Clock, DollarSign } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A1F71_1px,transparent_1px),linear-gradient(to_bottom,#1A1F71_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03]"></div>
        
        {/* Curved lines - more prominent */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100" stroke="#1A1F71" strokeWidth="2" fill="none" />
          <path d="M0,300 Q350,250 700,300 T1400,300 T2100,300" stroke="#F7B600" strokeWidth="2" fill="none" />
          <path d="M0,500 Q450,450 900,500 T1800,500 T2700,500" stroke="#10B981" strokeWidth="2" fill="none" />
          <path d="M0,700 Q300,650 600,700 T1200,700 T1800,700" stroke="#F59E0B" strokeWidth="2" fill="none" />
          <path d="M0,900 Q550,850 1100,900 T2200,900" stroke="#8B5CF6" strokeWidth="2" fill="none" />
        </svg>
        
        {/* Floating circles - more visible */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#1A1F71] rounded-full blur-3xl opacity-[0.04] animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-[32rem] h-[32rem] bg-[#F7B600] rounded-full blur-3xl opacity-[0.04] animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#10B981] rounded-full blur-3xl opacity-[0.03] animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* SECTION 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A1F71]/10 via-white to-[#F7B600]/10">
        {/* Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <Image
            src="/logo.png"
            alt="VISTA Logo"
            width={600}
            height={600}
            className="object-contain"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="ComplianceGuard AI"
              width={200}
              height={200}
              className="mx-auto"
              priority
            />
          </div>
          
          <h1 className="font-[family-name:var(--font-audiowide)] text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-[#1A1F71] via-[#1A1F71] to-[#F7B600] bg-clip-text text-transparent animate-gradient">
            Compliance That Runs Itself
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            AI agents working 24/7. Zero human triggers. Full audit trail.
          </p>

          <div className="flex flex-col items-center gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-[#1A1F71] hover:bg-[#1A1F71]/90 text-white px-8 py-6 text-lg"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                Explore Prototype <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <a 
              href="#agents" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 animate-bounce"
            >
              ↓ See How It Works
            </a>
          </div>
        </div>

        {/* Decorative curves */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* SECTION 2: The Agents */}
      <section id="agents" className="py-20 px-6 bg-gradient-to-br from-[#1A1F71]/15 via-[#F7B600]/10 to-[#10B981]/10 relative">
        {/* Additional decorative background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#1A1F71] rounded-full blur-3xl opacity-[0.12]"></div>
          <div className="absolute bottom-20 right-10 w-[32rem] h-[32rem] bg-[#F7B600] rounded-full blur-3xl opacity-[0.15]"></div>
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#10B981] rounded-full blur-3xl opacity-[0.08]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-[#8B5CF6] rounded-full blur-3xl opacity-[0.08]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="font-[family-name:var(--font-audiowide)] text-4xl md:text-5xl font-bold text-center mb-4">
            Meet Your Compliance Team
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Five autonomous agents that trigger each other in a continuous loop
          </p>

          {/* Circular Flow Layout */}
          <div className="relative max-w-6xl mx-auto">
            {/* Center Circle - Continuous Loop Indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-52 h-52 rounded-full bg-gradient-to-br from-[#1A1F71] via-[#F7B600] to-[#1A1F71] flex items-center justify-center shadow-2xl">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-white via-gray-50 to-white flex flex-col items-center justify-center">
                  <RefreshCw className="w-12 h-12 text-[#1A1F71] mb-2 animate-spin" style={{ animationDuration: "3s" }} />
                  <span className="font-[family-name:var(--font-audiowide)] text-sm font-bold">CONTINUOUS</span>
                  <span className="text-xs text-muted-foreground">LOOP</span>
                </div>
              </div>
            </div>

            {/* Agent Cards in Circular Pattern - Fixed positioning */}
            <div className="relative h-[900px] lg:h-[750px]">
              {/* Watcher - Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 z-10">
                <Card className="p-6 relative group hover:shadow-2xl transition-all duration-300 border-t-4 border-t-[#1A1F71] hover:scale-105 bg-gradient-to-br from-white to-[#1A1F71]/5 backdrop-blur">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#1A1F71]/10 flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-10 h-10 text-[#1A1F71]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-audiowide)] text-lg font-bold mb-2">WATCHER</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Tracks RBI, DPDP Act, CERT-In, PCI DSS, NPCI feeds
                    </p>
                    <div className="text-xs bg-[#1A1F71]/10 rounded px-3 py-2 font-mono">
                      Every 6 hours
                    </div>
                  </div>
                </Card>
              </div>

              {/* Interpreter - Top Right */}
              <div className="absolute top-32 right-0 lg:right-12 w-72 z-10">
                <Card className="p-6 relative group hover:shadow-2xl transition-all duration-300 border-t-4 border-t-[#F7B600] hover:scale-105 bg-gradient-to-br from-white to-[#F7B600]/5 backdrop-blur">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#F7B600]/10 flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-10 h-10 text-[#F7B600]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-audiowide)] text-lg font-bold mb-2">INTERPRETER</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Debates interpretations using Constitutional AI
                    </p>
                    <div className="text-xs bg-[#F7B600]/10 rounded px-3 py-2 font-mono">
                      On new regulation
                    </div>
                  </div>
                </Card>
              </div>

              {/* Monitor - Bottom Right */}
              <div className="absolute bottom-32 right-0 lg:right-12 w-72 z-10">
                <Card className="p-6 relative group hover:shadow-2xl transition-all duration-300 border-t-4 border-t-[#10B981] hover:scale-105 bg-gradient-to-br from-white to-[#10B981]/5 backdrop-blur">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-4">
                      <Search className="w-10 h-10 text-[#10B981]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-audiowide)] text-lg font-bold mb-2">MONITOR</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Scans transactions, emails, logs for PCI/PII
                    </p>
                    <div className="text-xs bg-[#10B981]/10 rounded px-3 py-2 font-mono">
                      On control update
                    </div>
                  </div>
                </Card>
              </div>

              {/* Learner - Top Left */}
              <div className="absolute top-32 left-0 lg:left-12 w-72 z-10">
                <Card className="p-6 relative group hover:shadow-2xl transition-all duration-300 border-t-4 border-t-[#8B5CF6] hover:scale-105 bg-gradient-to-br from-white to-[#8B5CF6]/5 backdrop-blur">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-10 h-10 text-[#8B5CF6]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-audiowide)] text-lg font-bold mb-2">LEARNER</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Improves accuracy from every outcome
                    </p>
                    <div className="text-xs bg-[#8B5CF6]/10 rounded px-3 py-2 font-mono">
                      On remediation
                    </div>
                  </div>
                </Card>
              </div>

              {/* Remediator - Bottom Left */}
              <div className="absolute bottom-32 left-0 lg:left-12 w-72 z-10">
                <Card className="p-6 relative group hover:shadow-2xl transition-all duration-300 border-t-4 border-t-[#F59E0B] hover:scale-105 bg-gradient-to-br from-white to-[#F59E0B]/5 backdrop-blur">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mx-auto mb-4">
                      <Wrench className="w-10 h-10 text-[#F59E0B]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-audiowide)] text-lg font-bold mb-2">REMEDIATOR</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Auto-generates fixes and evidence packages
                    </p>
                    <div className="text-xs bg-[#F59E0B]/10 rounded px-3 py-2 font-mono">
                      On violation
                    </div>
                  </div>
                </Card>
              </div>

              
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: The Loop */}
      <section className="py-20 px-6 bg-gradient-to-b from-white via-[#F7B600]/5 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-audiowide)] text-4xl md:text-5xl font-bold text-center mb-4">
            Always Running. Always Compliant.
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            No buttons to click. No schedules to set. Agents trigger each other.
          </p>

          {/* Loop Diagram */}
          <Card className="p-12 bg-gradient-to-br from-card to-[#1A1F71]/5 border-2 border-[#1A1F71]/20">
            <div className="relative">
              {/* Top flow */}
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#1A1F71] flex items-center justify-center text-white mb-2">
                    <Eye className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-mono">REGULATION</span>
                </div>
                
                <ArrowRight className="w-8 h-8 text-[#F7B600]" />
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#F7B600] flex items-center justify-center text-white mb-2">
                    <Brain className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-mono">INTERPRET</span>
                </div>
                
                <ArrowRight className="w-8 h-8 text-[#F7B600]" />
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#10B981] flex items-center justify-center text-white mb-2">
                    <Search className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-mono">SCAN</span>
                </div>
                
                <ArrowRight className="w-8 h-8 text-[#F7B600]" />
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#F59E0B] flex items-center justify-center text-white mb-2">
                    <Wrench className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-mono">FIX</span>
                </div>
                
                <ArrowRight className="w-8 h-8 text-[#F7B600]" />
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white mb-2">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-mono">LEARN</span>
                </div>
              </div>

              {/* Loop back indicator */}
              <div className="flex items-center justify-center">
                <div className="border-2 border-dashed border-[#F7B600] rounded-full px-6 py-3 bg-[#F7B600]/10">
                  <RefreshCw className="w-6 h-6 text-[#F7B600] inline mr-2 animate-spin" style={{ animationDuration: "3s" }} />
                  <span className="font-[family-name:var(--font-audiowide)] text-lg font-bold">CONTINUOUS</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 4: Why VISTA × Why Visa */}
      <section className="py-20 px-6 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        {/* Curved Line Background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,100 Q400,50 800,100 T1600,100" stroke="#1A1F71" strokeWidth="3" fill="none" opacity="0.1" />
            <path d="M0,250 Q500,200 1000,250 T2000,250" stroke="#F7B600" strokeWidth="3" fill="none" opacity="0.1" />
            <path d="M0,400 Q350,350 700,400 T1400,400" stroke="#10B981" strokeWidth="3" fill="none" opacity="0.1" />
            <path d="M0,550 Q450,500 900,550 T1800,550" stroke="#F59E0B" strokeWidth="3" fill="none" opacity="0.1" />
            <path d="M0,700 Q600,650 1200,700 T2400,700" stroke="#8B5CF6" strokeWidth="3" fill="none" opacity="0.1" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-audiowide)] text-4xl md:text-5xl font-bold mb-4">
              Why Visa x VISTA
            </h2>
            <p className="text-lg text-muted-foreground">Industry Expert Perspective</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Point 1 */}
            <Card className="p-6 border-l-4 border-l-[#1A1F71] hover:shadow-lg transition-all bg-white">
              <Network className="w-10 h-10 text-[#1A1F71] mb-4" />
              <h3 className="font-bold text-lg mb-2">Network Liability</h3>
              <p className="text-sm text-muted-foreground">
                Visa guarantees trust across the entire network. VISTA provides proactive network-wide assurance.
              </p>
            </Card>

            {/* Point 2 */}
            <Card className="p-6 border-l-4 border-l-[#F7B600] hover:shadow-lg transition-all bg-white">
              <TrendingUp className="w-10 h-10 text-[#F7B600] mb-4" />
              <h3 className="font-bold text-lg mb-2">Regulatory Velocity</h3>
              <p className="text-sm text-muted-foreground">
                Continuous loop triggers re-interpretation within hours. Compliance becomes a state, not an event.
              </p>
            </Card>

            {/* Point 3 */}
            <Card className="p-6 border-l-4 border-l-[#10B981] hover:shadow-lg transition-all bg-white">
              <Brain className="w-10 h-10 text-[#10B981] mb-4" />
              <h3 className="font-bold text-lg mb-2">Explainability</h3>
              <p className="text-sm text-muted-foreground">
                Constitutional AI Debate produces defensible reasoning chains. Show your work, not just confidence scores.
              </p>
            </Card>

            {/* Point 4 */}
            <Card className="p-6 border-l-4 border-l-[#F59E0B] hover:shadow-lg transition-all bg-white">
              <Clock className="w-10 h-10 text-[#F59E0B] mb-4" />
              <h3 className="font-bold text-lg mb-2">65,000 TPS Scale</h3>
              <p className="text-sm text-muted-foreground">
                Agents self-trigger on events. No analyst queue. The loop runs 24/7 without human intervention.
              </p>
            </Card>

            {/* Point 5 */}
            <Card className="p-6 border-l-4 border-l-[#8B5CF6] hover:shadow-lg transition-all bg-white">
              <DollarSign className="w-10 h-10 text-[#8B5CF6] mb-4" />
              <h3 className="font-bold text-lg mb-2">Risk Prevention</h3>
              <p className="text-sm text-muted-foreground">
                Predictive detection catches violations before breaches. Network-wide visibility for compliance teams.
              </p>
            </Card>

            {/* Point 6 */}
            <Card className="p-6 border-l-4 border-l-[#1A1F71] hover:shadow-lg transition-all bg-white">
              <Shield className="w-10 h-10 text-[#1A1F71] mb-4" />
              <h3 className="font-bold text-lg mb-2">VRM Integration</h3>
              <p className="text-sm text-muted-foreground">
                Pushes rules directly to Visa Risk Manager. Detection to enforcement in seconds, not days.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 5: Footer with CTA */}
      <footer className="bg-gradient-to-br from-[#1A1F71] via-[#1A1F71] to-[#1A1F71]/90 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#F7B600] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F7B600] rounded-full blur-3xl"></div>
        </div>

        {/* Main Footer Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {/* Left: VISTA Logo & Name */}
            <div className="flex flex-col items-center md:items-start">
              <div className="w-[120px] h-[120px] rounded-full bg-white flex items-center justify-center mb-4 shadow-md">
                <Image
                  src="/logo.png"
                  alt="VISTA Logo"
                  width={140}
                  height={140}
                  className="rounded-full"
                />
              </div>
              <h3 className="font-[family-name:var(--font-audiowide)] text-2xl font-bold mb-2">
                VISTA
              </h3>
              <p className="text-sm opacity-75 text-center md:text-left">
                Visa-aligned Intelligent<br />
                System for Trust & Assurance
              </p>
            </div>

            {/* Center: CTA */}
            <div className="text-center">
              <h3 className="font-[family-name:var(--font-audiowide)] text-xl md:text-2xl font-bold mb-6 leading-tight">
                See agents detect, interpret,<br />and fix a PCI violation in real-time
              </h3>
              <Button 
                asChild 
                size="lg" 
                className="bg-[#F7B600] hover:bg-[#F7B600]/90 text-[#1A1F71] px-8 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  Explore Prototype <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Right: Competition & Team */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F7B600]/20 rounded-full border border-[#F7B600]/30 mb-3">
                  
                  <span className="font-bold text-[#F7B600]">Team JNR</span>
                </div>
              </div>
              <p className="text-lg font-semibold mb-1">
                VISA × Shaastra 2026
              </p>
              <p className="text-sm opacity-75">
                Problem Statement 4
              </p>
              <p className="text-xs opacity-60 mt-2">
                Autonomous Compliance Intelligence
              </p>
            </div>
          </div>
        </div>

      </footer>
    </div>
  )
}
