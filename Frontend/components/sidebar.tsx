"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Eye, RefreshCw, MessageSquare, Download, Shield } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, color: "#1A1F71" },
    { href: "/watcher", label: "Regulatory Watcher", icon: Eye, color: "#8B5CF6" },
    { href: "/compliance", label: "Continuous Compliance", icon: RefreshCw, color: "#10B981" },
    { href: "/ask", label: "Ask Regulator", icon: MessageSquare, color: "#F7B600" },
    { href: "/export", label: "Evidence Export", icon: Download, color: "#F59E0B" },
  ]

  return (
    <aside className="w-64 bg-gradient-to-b from-[#1A1F71] via-[#1A1F71] to-[#1A1F71]/95 text-sidebar-foreground border-r border-sidebar-border sticky top-0 h-screen overflow-auto relative">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F7B600]/5 via-transparent to-[#8B5CF6]/5 pointer-events-none"></div>
      
      <div className="p-6 relative z-10">
        <Link href="/" className="flex items-center gap-3 mb-8 group">
          <div className="relative">
            <div className="absolute inset-0 bg-[#F7B600] rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-[#f8f7f5] to-[#f8f7f5]/80 p-2 rounded-lg">
              <Image
                src="/logo.png"
                alt="VISTA Logo"
                width={140}
                height={140}
                className="w-12 h-12 object-contain"
                priority
              />
            </div>
          </div>
          <div>
            <span className="font-[family-name:var(--font-audiowide)] text-xl font-bold block">VISTA</span>
            <span className="text-xs text-sidebar-primary">ComplianceGuard AI</span>
          </div>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-[#F7B600] to-[#F7B600]/90 text-[#1A1F71] shadow-lg"
                    : "text-sidebar-foreground hover:bg-white/10"
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F7B600]/20 to-transparent animate-pulse"></div>
                )}
                <div className={`relative p-1.5 rounded-md transition-all ${isActive ? "bg-[#1A1F71]/10" : "bg-white/5 group-hover:bg-white/10"}`}>
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? "" : "group-hover:text-[#F7B600]"}`} />
                </div>
                <span className="relative">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-gradient-to-t from-[#1A1F71] to-transparent relative z-10">
        <div className="text-center">
          <p className="text-xs text-sidebar-primary font-medium mb-1">Team JNR</p>
          <p className="text-xs text-sidebar-foreground/60 mt-2">Visa × Shaastra 2026</p>
        </div>
      </div>
    </aside>
  )
}
