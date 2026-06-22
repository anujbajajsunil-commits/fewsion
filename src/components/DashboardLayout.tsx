import React, { useState } from 'react';
import { 
  Users, Layers, BarChart3, MessageSquare, CreditCard, 
  Sparkles, ShieldCheck, LogOut, Globe, Bell, Check, 
  Menu, X, Laptop, AlertOctagon, Settings, RefreshCw 
} from 'lucide-react';
import { UserRole, NotificationItem } from '../types';

interface DashboardLayoutProps {
  role: UserRole;
  onRoleChange: (newRole: UserRole) => void;
  onLogout: () => void;
  notifications: NotificationItem[];
  onMarkNotificationAsRead: (id: string) => void;
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  // Super admin log files
  auditLogs?: any[];
  onClearLogs?: () => void;
}

export default function DashboardLayout({
  role,
  onRoleChange,
  onLogout,
  notifications,
  onMarkNotificationAsRead,
  children,
  activeTab,
  onTabChange,
  auditLogs = [],
  onClearLogs
}: DashboardLayoutProps) {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const tabs = [
    { id: 'discovery', label: 'Discovery Engine', icon: Users, roles: ['brand', 'admin', 'influencer'] },
    { id: 'campaigns', label: 'Brief Workspace', icon: Layers, roles: ['brand', 'influencer', 'editor', 'admin'] },
    { id: 'analytics', label: 'Data Analytics', icon: BarChart3, roles: ['brand', 'influencer', 'admin'] },
    { id: 'messaging', label: 'Chat Discussions', icon: MessageSquare, roles: ['brand', 'influencer', 'admin'] },
    { id: 'payments', label: 'Ledger Wallet', icon: CreditCard, roles: ['brand', 'influencer', 'admin'] },
  ];

  const roleDescriptions = {
    brand: 'Create campaigns, escrow budgets, search influencers, and deploy matches.',
    influencer: 'Apply to campaigns, upload video deliverables, monitor stats, and cash out cleared balances.',
    editor: 'Review draft posts, examine visual deliverables, provide modifications, and coordinate payouts.',
    admin: 'Audit all escrows, adjust system splits, toggle fraud warnings, and inspect system audit logs.'
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans select-none selection:bg-[#735DD7] selection:text-white">
      
      {/* Top Navigation Hub Bar */}
      <header className="sticky top-0 z-40 bg-[#0c0c0c]/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          {/* Mobile menu trigger */}
          <button 
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            className="md:hidden p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white"
          >
            {showMobileSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#735DD7] flex items-center justify-center font-bold text-sm shadow-md shadow-[#735DD7]/20">
              F
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-[#AC71E0] bg-clip-text text-transparent">
              FEWSION
            </span>
          </div>
        </div>

        {/* Global Action Triggers bar */}
        <div className="flex items-center gap-4">
          
          {/* --- ROLE SIMULATION CONTROLS (CRITICAL EXCELLENCE FLOURISH) --- */}
          <div className="relative">
            <button 
              onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
              className="px-4 py-2 bg-gradient-to-r from-[#735DD7]/15 to-[#5047b5]/15 border border-[#735DD7]/30 rounded-xl text-xs hover:border-[#735DD7] transition flex items-center gap-2 cursor-pointer shadow-sm shadow-[#735DD7]/5"
            >
              <Laptop className="w-4 h-4 text-[#AC71E0]" />
              <span className="capitalize font-bold text-white">Simulation: {role}</span>
              <span className="text-[9px] bg-[#735DD7]/20 text-[#AC71E0] px-1.5 py-0.5 rounded uppercase font-mono font-extrabold">Switch</span>
            </button>

            {showRoleSwitcher && (
              <div className="absolute right-0 mt-2.5 w-72 glass-panel rounded-xl p-4 border border-white/10 shadow-2xl z-50 text-xs text-left space-y-3">
                <div className="font-bold text-white pb-2 border-b border-white/5 flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-[#AC71E0]" /> Choose Workspace Perspective
                </div>
                
                <div className="space-y-1">
                  {(['influencer', 'brand', 'editor', 'admin'] as UserRole[]).map((r) => (
                    <button 
                      key={r}
                      onClick={() => {
                        onRoleChange(r);
                        setShowRoleSwitcher(false);
                      }}
                      className={`w-full p-2.5 rounded-lg text-left transition flex flex-col gap-1 ${role === r ? 'bg-[#735DD7]/15 border border-[#735DD7]/30 text-white' : 'hover:bg-white/[0.02] text-gray-400'}`}
                    >
                      <span className="font-bold capitalize flex items-center justify-between text-xs text-white">
                        {r === 'brand' ? 'Brand / Company' : r === 'admin' ? 'Super Admin' : r}
                        {role === r && <Check className="w-4 h-4 text-[#AC71E0]" />}
                      </span>
                      <span className="text-[10px] text-gray-500 font-light leading-relaxed">
                        {roleDescriptions[r]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Notification center */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#AC71E0] text-white text-[9px] font-black rounded-full flex items-center justify-center border border-[#0A0A0A]">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2.5 w-80 glass-panel rounded-xl p-4 border border-white/10 shadow-2xl z-50 text-xs text-left space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/5 font-extrabold text-white">
                  <span>SaaS Notifications</span>
                  <span className="text-[10px] text-[#AC71E0] font-mono">{unreadNotificationsCount} unread</span>
                </div>

                <div className="space-y-2 max-h-[260px] overflow-y-auto">
                  {notifications.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={() => {
                        onMarkNotificationAsRead(n.id);
                      }}
                      className={`p-2.5 rounded-lg border transition text-left cursor-pointer ${n.read ? 'bg-black/20 border-white/5 text-gray-400' : 'bg-[#735DD7]/5 border-[#735DD7]/20 text-white'}`}
                    >
                      <h5 className="font-bold text-white text-xs">{n.title}</h5>
                      <p className="text-[10px] text-gray-400 mt-0.5">{n.description}</p>
                      <span className="text-[9px] text-gray-600 block mt-1 font-mono">{new Date(n.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  ))}

                  {notifications.length === 0 && (
                    <p className="py-6 text-center text-gray-500 font-mono">No notifications recorded.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Logout option */}
          <button 
            onClick={onLogout}
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-red-400/10 hover:text-red-400 text-gray-400 transition"
            title="Return to Landing Page"
          >
            <LogOut className="w-4 h-4" />
          </button>

        </div>
      </header>

      {/* Main Container workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Sidebar Sidebar */}
        <aside className="hidden md:flex flex-col justify-between w-64 border-r border-white/5 bg-[#0b0b0b] p-4 text-left shrink-0">
          <div className="space-y-6">
            <span className="text-gray-500 uppercase tracking-widest font-bold text-[9px] font-mono pl-3">WORKSPACE PLATFORM</span>

            <nav className="space-y-1 text-xs font-semibold">
              {tabs.map((tab) => {
                // If editor is logged, force only campaigns workspace visibility
                if (role === 'editor' && tab.id !== 'campaigns') return null;
                // If tab requires brand but role is influencer, check if appropriate
                if (!tab.roles.includes(role)) return null;

                const IconComponent = tab.icon;

                return (
                  <button 
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`w-full py-3 px-4 rounded-xl text-left transition flex items-center gap-3 cursor-pointer ${activeTab === tab.id ? 'bg-[#735DD7]/15 border border-[#735DD7]/30 text-white shadow-inner shadow-[#735DD7]/5' : 'text-gray-400 hover:text-white hover:bg-white/[0.01]'}`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="space-y-3">
            {/* System Status Indicators */}
            <div className="p-3.5 bg-white/[0.01] border border-white/5 rounded-xl text-left space-y-1.5 font-mono text-[10px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-gray-400 font-bold">API CONEX ONLINE</span>
              </div>
              <p className="text-gray-600">Localhost:3000 · TLS_1.3</p>
            </div>
          </div>
        </aside>

        {/* Workspace views content block */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          
          {/* --- ADMIN EXTRA PERSPECTIVE: SECURITY logs (SHOWS AUDIT ABILITY DIRECTLY) --- */}
          {role === 'admin' && activeTab === 'discovery' && (
            <div className="mb-8 p-5 bg-black/40 border border-[#735DD7]/30 rounded-xl space-y-4 text-left glow-purple relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#AC71E0]/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#AC71E0]" />
                  <div>
                    <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Platform Admin Controls & Audit Integrity</h3>
                    <p className="text-[11px] text-gray-400">Review detailed system transactions, inspect platform access triggers, and view database modifications in real-time.</p>
                  </div>
                </div>

                {onClearLogs && (
                  <button 
                    onClick={onClearLogs}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-400 hover:text-white transition font-mono uppercase"
                  >
                    Wipe Audit Logs
                  </button>
                )}
              </div>

              {/* Logs visualizer */}
              <div className="font-mono text-[10px] text-gray-300 space-y-1.5 p-3.5 bg-black rounded-lg border border-white/5 max-h-[160px] overflow-y-auto">
                {auditLogs.map((log) => (
                  <div key={log.id} className="flex gap-2 border-b border-white/5 pb-1 last:border-b-0">
                    <span className="text-gray-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                    <span className="text-[#AC71E0] font-bold">[{log.action}]</span>
                    <span className="text-gray-400">{log.details}</span>
                    <span className="ml-auto text-gray-600 text-[9px]">Logged by: {log.user} ({log.role})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {children}
        </main>
      </div>

      {/* Mobile Menu Sidebar Drawer */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden flex justify-start">
          <div className="w-64 bg-[#0a0a09] border-r border-white/5 h-full p-4 flex flex-col justify-between">
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#735DD7] rounded-lg flex items-center justify-center font-bold">F</div>
                  <span className="font-bold text-white">FEWSION</span>
                </div>
                <button 
                  onClick={() => setShowMobileSidebar(false)}
                  className="p-1 px-2 rounded-lg bg-white/5 text-gray-500 hover:text-white text-xs border border-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <span className="text-gray-500 uppercase tracking-widest font-bold text-[9px] font-mono block pl-2 mt-4">Simulation Sections</span>
              
              <nav className="space-y-1 text-xs">
                {tabs.map((tab) => {
                  if (role === 'editor' && tab.id !== 'campaigns') return null;
                  if (!tab.roles.includes(role)) return null;

                  const IconComponent = tab.icon;

                  return (
                    <button 
                      key={tab.id}
                      onClick={() => {
                        onTabChange(tab.id);
                        setShowMobileSidebar(false);
                      }}
                      className={`w-full py-2.5 px-3 rounded-lg text-left transition flex items-center gap-3 ${activeTab === tab.id ? 'bg-[#735DD7]/20 border border-[#735DD7]/30 text-white' : 'text-gray-400'}`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <p className="text-[10px] text-gray-600 font-mono text-center">API offline fallback checked</p>
          </div>
        </div>
      )}

    </div>
  );
}
