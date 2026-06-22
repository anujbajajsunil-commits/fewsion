import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Paperclip, Check, ShieldAlert, Wifi, 
  MessageSquare, UserCheck, Compass, Sparkles, Image, Globe 
} from 'lucide-react';
import { Message, UserRole } from '../types';

interface MessagingSysProps {
  role: UserRole;
  currentUserId: string;
  messages: Message[];
  onSendMessage: (text: string, attachmentUrl?: string, attachmentName?: string) => void;
}

export default function MessagingSys({ role, currentUserId, messages, onSendMessage }: MessagingSysProps) {
  const [inputText, setInputText] = useState('');
  const [activeRoom, setActiveRoom] = useState<'Aria' | 'Logix' | 'General'>('Logix');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // File attach simulated states
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [simulatedAttachment, setSimulatedAttachment] = useState<{ name: string, url: string } | null>(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !simulatedAttachment) return;

    onSendMessage(
      inputText, 
      simulatedAttachment?.url, 
      simulatedAttachment?.name
    );

    setInputText('');
    setSimulatedAttachment(null);
    setShowAttachMenu(false);
  };

  const simulateAttachFile = (name: string, url: string) => {
    setSimulatedAttachment({ name, url });
    setShowAttachMenu(false);
  };

  const filteredMessages = messages.filter(msg => {
    if (activeRoom === 'Logix') {
      return msg.campaignId === 'camp_1' || msg.senderId === 'brand_1' || msg.senderId === 'inf_1';
    }
    return !msg.campaignId; // general room
  });

  return (
    <div className="glass-panel rounded-xl border border-white/5 h-[560px] grid grid-cols-1 md:grid-cols-12 overflow-hidden text-left">
      
      {/* Rooms Sidebar */}
      <div className="md:col-span-4 border-r border-white/5 bg-black/40 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#AC71E0]" /> Discussion Channels
            </h3>
            <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 uppercase bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20">
              <Wifi className="w-3 h-3 text-emerald-400 animate-pulse" /> Live Server
            </span>
          </div>

          {/* Rooms List */}
          <div className="p-2 space-y-1">
            <button 
              onClick={() => setActiveRoom('Logix')}
              className={`w-full p-3 rounded-lg text-left transition flex items-center justify-between text-xs ${activeRoom === 'Logix' ? 'bg-[#735DD7]/10 border border-[#735DD7]/20 text-white' : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'}`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#735DD7] to-[#AC71E0] flex items-center justify-center font-bold text-xs text-white">
                  LA
                </div>
                <div>
                  <h4 className="font-extrabold">Logix Headphone Campaign</h4>
                  <p className="text-[10px] text-gray-500 truncate max-w-[130px]">Brief & scripts align</p>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#AC71E0]" />
            </button>

            <button 
              onClick={() => setActiveRoom('General')}
              className={`w-full p-3 rounded-lg text-left transition flex items-center justify-between text-xs ${activeRoom === 'General' ? 'bg-[#735DD7]/10 border border-[#735DD7]/20 text-white' : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'}`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs text-gray-400 border border-white/10">
                  🌐
                </div>
                <div>
                  <h4 className="font-extrabold">General Creators Hub</h4>
                  <p className="text-[10px] text-gray-500 truncate max-w-[130px]">SaaS wide general chat</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* User Identity Box */}
        <div className="p-3.5 bg-black/60 border-t border-white/5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#735DD7]/15 border border-[#735DD7]/30 flex items-center justify-center font-bold text-xs capitalize text-white">
            {role[0]}
          </div>
          <div className="text-[11px]">
            <span className="text-gray-400 block tracking-wide uppercase text-[8px] font-mono leading-none">Logged Roleset</span>
            <span className="text-white font-bold capitalize mt-0.5 inline-block">{role} Dashboard</span>
          </div>
        </div>
      </div>

      {/* Primary Chat Box */}
      <div className="md:col-span-8 flex flex-col justify-between h-full bg-black/10 relative">
        {/* Header bar */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-white">
              {activeRoom === 'Logix' ? 'Campaign Desk: Logix Audio x Aria Thorne' : 'General Platform Lounge'}
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[10px] font-mono text-gray-500">AES-256 Secured encryption</span>
        </div>

        {/* Message Feeds Scroll block */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[410px]">
          {filteredMessages.map((msg) => {
            const isSelf = msg.senderRole === role;

            return (
              <div 
                key={msg.id} 
                className={`flex gap-3 max-w-[85%] text-xs ${isSelf ? 'ml-auto flex-row-reverse text-right' : 'mr-auto text-left'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold ${isSelf ? 'bg-[#735DD7] text-white' : 'bg-white/10 text-gray-300'}`}>
                  {msg.senderName[0]}
                </div>

                <div className="space-y-1">
                  {/* Sender Name & Timestamp */}
                  <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <span className="font-extrabold text-gray-300">{msg.senderName}</span>
                    <span className="capitalize px-1.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-[8px] tracking-wide">{msg.senderRole}</span>
                    <span className="font-mono text-[9px]">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>

                  {/* Bubble */}
                  <div className={`p-3.5 rounded-xl border leading-relaxed ${isSelf ? 'bg-[#735DD7]/20 border-[#735DD7]/40 text-gray-100 rounded-tr-none' : 'bg-white/5 border-white/5 text-gray-300 rounded-tl-none'}`}>
                    <p>{msg.text}</p>

                    {/* Show Attachment info if exists */}
                    {msg.attachmentUrl && (
                      <div className="mt-2.5 p-2 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Image className="w-3.5 h-3.5 text-[#AC71E0]" /> {msg.attachmentName}
                        </span>
                        <a 
                          href={msg.attachmentUrl} 
                          target="_blank" 
                          referrerPolicy="no-referrer"
                          className="text-xs text-[#AC71E0] hover:underline"
                        >
                          View File
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          <div ref={chatEndRef} />
        </div>

        {/* Input Controls Bar */}
        <form onSubmit={handleSend} className="p-3 bg-black/40 border-t border-white/5 flex items-center gap-2.5 relative">
          
          {/* File attachment simulator box */}
          {showAttachMenu && (
            <div className="absolute bottom-16 left-3 w-56 glass-panel rounded-lg p-2 border border-white/10 text-xs text-gray-400 space-y-1 shadow-lg z-20">
              <span className="text-[10px] text-gray-600 block px-2 py-0.5 uppercase font-semibold font-mono tracking-wider">Simulate Asset Upload</span>
              <button 
                type="button"
                onClick={() => simulateAttachFile('audio_leak_approved.mp3', '#')}
                className="w-full p-1.5 hover:bg-white/5 rounded text-left flex items-center gap-1 text-white text-[11px]"
              >
                📎 audio_leak_approved.mp3
              </button>
              <button 
                type="button"
                onClick={() => simulateAttachFile('creative_reels_outline.pdf', '#')}
                className="w-full p-1.5 hover:bg-white/5 rounded text-left flex items-center gap-1 text-white text-[11px]"
              >
                📎 creative_reels_outline.pdf
              </button>
              <button 
                type="button"
                onClick={() => simulateAttachFile('invoice_draft_payout.png', '#')}
                className="w-full p-1.5 hover:bg-white/5 rounded text-left flex items-center gap-1 text-white text-[11px]"
              >
                📎 invoice_draft_payout.png
              </button>
            </div>
          )}

          {/* Paperclip attach toggle */}
          <button 
            type="button"
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-white transition flex items-center justify-center shrink-0"
            title="Attach Deliverable File"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Submited attachment status banner */}
          {simulatedAttachment && (
            <div className="px-2.5 py-1.5 bg-[#735DD7]/20 border border-[#735DD7]/30 text-white rounded-lg flex items-center gap-1.5 text-xs max-w-[150px] truncate">
              <span className="font-mono text-[10px] shrink-0">Ready:</span>
              <span className="font-bold truncate">{simulatedAttachment.name}</span>
              <button 
                type="button" 
                onClick={() => setSimulatedAttachment(null)} 
                className="text-red-400 font-bold hover:text-white"
              >
                x
              </button>
            </div>
          )}

          <input 
            type="text" 
            placeholder="Type message text, script directives, ask revisions..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2 bg-black/60 border border-white/10 rounded-lg text-xs hover:border-[#735DD7] focus:outline-none focus:border-[#735DD7] transition text-white"
          />

          <button 
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#735DD7] hover:bg-opacity-90 font-bold text-white transition flex items-center justify-center text-xs gap-1 cursor-pointer shrink-0"
          >
            <Send className="w-3.5 h-3.5" /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
