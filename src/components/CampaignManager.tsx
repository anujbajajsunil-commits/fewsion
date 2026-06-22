import React, { useState } from 'react';
import { 
  FilePlus, Layers, DollarSign, Calendar, Sparkles, Clipboard, 
  Send, ShieldCheck, Check, X, AlertTriangle, Play, Pause, FolderKanban, CheckCircle2 
} from 'lucide-react';
import { Campaign, Application, UserRole } from '../types';

interface CampaignManagerProps {
  role: UserRole;
  currentUserId: string;
  campaigns: Campaign[];
  applications: Application[];
  onAddCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt'>) => void;
  onUpdateCampaignStatus: (id: string, status: Campaign['status']) => void;
  onApplyToCampaign: (campaignId: string, proposal: string) => void;
  onUpdateApplicationStatus: (id: string, status: Application['status'], feedback?: string) => void;
}

export default function CampaignManager({
  role,
  currentUserId,
  campaigns,
  applications,
  onAddCampaign,
  onUpdateCampaignStatus,
  onApplyToCampaign,
  onUpdateApplicationStatus
}: CampaignManagerProps) {
  // Brand creation states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCampName, setNewCampName] = useState('');
  const [newCampDesc, setNewCampDesc] = useState('');
  const [newCampCat, setNewCampCat] = useState('Consumer Electronics');
  const [newCampBudget, setNewCampBudget] = useState<number>(5000);
  const [newCampDuration, setNewCampDuration] = useState('30 Days');
  const [newCampDeliverables, setNewCampDeliverables] = useState('');
  const [newCampReqs, setNewCampReqs] = useState('');

  // Influencer proposal inputs
  const [applyingCampId, setApplyingCampId] = useState<string | null>(null);
  const [proposalText, setProposalText] = useState('');

  // Editor feedback review inputs
  const [editorFeedback, setEditorFeedback] = useState<{ [id: string]: string }>({});

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampName || !newCampDesc) return;

    onAddCampaign({
      name: newCampName,
      description: newCampDesc,
      category: newCampCat,
      budget: Number(newCampBudget),
      duration: newCampDuration,
      deliverables: newCampDeliverables,
      requirements: newCampReqs,
      status: 'active',
      brandId: 'brand_1'
    });

    // Reset Form
    setNewCampName('');
    setNewCampDesc('');
    setNewCampDeliverables('');
    setNewCampReqs('');
    setShowAddForm(false);
  };

  // Status colors utils
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
      case 'paused': return 'bg-amber-400/10 text-amber-400 border-amber-400/20';
      case 'closed': return 'bg-red-400/10 text-red-400 border-red-400/20';
      default: return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
    }
  };

  const getAppStatusClass = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
      case 'approved': return 'bg-blue-400/15 text-blue-400 border-blue-400/20';
      case 'editor_review': return 'bg-[#735DD7]/15 text-[#AC71E0] border-[#735DD7]/30 animate-pulse';
      case 'revision_requested': return 'bg-amber-400/10 text-amber-400 border-amber-400/20';
      case 'rejected': return 'bg-red-400/10 text-red-400 border-red-400/20';
      default: return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Campaign Workspace</h2>
          <p className="text-sm text-gray-400 mt-1">
            Deploy creative campaign instructions, coordinate editorial approvals, and monitor reach logs.
          </p>
        </div>

        {role === 'brand' && !showAddForm && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#735DD7] to-[#5047B5] text-white font-semibold text-sm hover:opacity-90 transition flex items-center gap-2 cursor-pointer shadow-lg shadow-[#735DD7]/10"
          >
            <FilePlus className="w-4 h-4" /> Deploy Campaign Brief
          </button>
        )}
      </div>

      {/* --- BRAND: CREATE FORM SHEET --- */}
      {showAddForm && role === 'brand' && (
        <form onSubmit={handleCreateCampaign} className="glass-panel p-6 rounded-xl border border-[#735DD7]/40 space-y-6 glow-purple relative">
          <div className="absolute top-4 right-4">
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)}
              className="p-1 px-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition text-xs"
            >
              Cancel Brief
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#AC71E0]" />
            <h3 className="text-base font-bold text-white">Create Creative Sponsoring Program Brief</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
            {/* Campaign Name */}
            <div className="md:col-span-8 space-y-1.5Col">
              <label className="text-gray-400 block font-medium">Campaign Brief Title</label>
              <input 
                type="text" 
                required
                placeholder="e.g., Wireless Active Noise Cancelling Headphone Promo Drop"
                value={newCampName}
                onChange={(e) => setNewCampName(e.target.value)}
                className="w-full p-2.5 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#735DD7] transition"
              />
            </div>

            {/* Campaign Category */}
            <div className="md:col-span-4 space-y-1.5">
              <label className="text-gray-400 block font-medium">Category</label>
              <select 
                value={newCampCat}
                onChange={(e) => setNewCampCat(e.target.value)}
                className="w-full p-2.5 bg-black/40 border border-white/10 rounded-lg text-white"
              >
                <option value="Consumer Electronics">Consumer Electronics</option>
                <option value="Fitness & Wellness">Fitness & Wellness</option>
                <option value="Travel & Photography">Travel & Photography</option>
                <option value="Beauty & Fashion">Beauty & Fashion</option>
                <option value="Food & Cooking">Food & Cooking</option>
              </select>
            </div>

            {/* Campaign Description */}
            <div className="md:col-span-12 space-y-1.5">
              <label className="text-gray-400 block font-medium">Brief Description & Objectives</label>
              <textarea 
                required
                rows={4}
                placeholder="Give details about your product features, core marketing message, links and what angles creators should focus on..."
                value={newCampDesc}
                onChange={(e) => setNewCampDesc(e.target.value)}
                className="w-full p-2.5 bg-black/40 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#735DD7] transition"
              />
            </div>

            {/* Budget */}
            <div className="md:col-span-6 space-y-1.5">
              <label className="text-gray-400 block font-medium">Campaign Budget (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="number" 
                  min="500" 
                  value={newCampBudget}
                  onChange={(e) => setNewCampBudget(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white font-mono"
                />
              </div>
            </div>

            {/* Duration */}
            <div className="md:col-span-6 space-y-1.5">
              <label className="text-gray-400 block font-medium">Promotion Duration</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={newCampDuration}
                  onChange={(e) => setNewCampDuration(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white font-mono"
                />
              </div>
            </div>

            {/* Deliverables */}
            <div className="md:col-span-6 space-y-1.5">
              <label className="text-gray-400 block font-medium">Required Deliverables</label>
              <input 
                type="text" 
                placeholder="e.g., 1 YouTube Video Integration + 2 Story Frames with links"
                value={newCampDeliverables}
                onChange={(e) => setNewCampDeliverables(e.target.value)}
                className="w-full p-2.5 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#735DD7] transition"
              />
            </div>

            {/* Requirements */}
            <div className="md:col-span-6 space-y-1.5">
              <label className="text-gray-400 block font-medium">Influencer Requirements</label>
              <input 
                type="text" 
                placeholder="e.g., USA/UK audience, followers > 200K, fitness niche"
                value={newCampReqs}
                onChange={(e) => setNewCampReqs(e.target.value)}
                className="w-full p-2.5 bg-black/40 border border-[#444] rounded-lg text-white focus:outline-none focus:border-[#735DD7] transition"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="submit" 
              className="px-6 py-2.5 rounded-lg bg-[#735DD7] text-white hover:bg-opacity-90 font-bold text-xs shadow-md shadow-[#735DD7]/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" /> Deploy & Escrow Budget
            </button>
          </div>
        </form>
      )}

      {/* --- ACTIVE CAMPAIGNS LISTING --- */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-white font-bold">
          <FolderKanban className="w-5 h-5 text-[#AC71E0]" />
          <h3>Active Creative Briefs ({campaigns.length})</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((camp) => {
            const hasApplied = applications.some(app => app.campaignId === camp.id && app.influencerId === currentUserId);

            return (
              <div key={camp.id} className="glass-panel p-5 rounded-xl border border-white/5 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Title Bar */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{camp.category}</span>
                      <h4 className="font-bold text-sm text-white mt-1 leading-snug">{camp.name}</h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full border text-[9px] font-mono capitalize ${getStatusBadgeClass(camp.status)}`}>
                      {camp.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {camp.description}
                  </p>

                  {/* Financials & Duration strip */}
                  <div className="grid grid-cols-2 gap-3 py-2 px-3 bg-black/40 border border-white/5 rounded-lg text-xs font-mono">
                    <div className="text-left">
                      <div className="text-[9px] text-gray-500 uppercase">Escrow Budget</div>
                      <div className="text-emerald-400 font-bold mt-0.5">${camp.budget.toLocaleString()} USD</div>
                    </div>
                    <div className="text-left">
                      <div className="text-[9px] text-gray-500 uppercase">Duration Campaign</div>
                      <div className="text-white font-semibold mt-0.5">{camp.duration}</div>
                    </div>
                  </div>

                  {/* Criteria requirements */}
                  <div className="space-y-1.5 text-xs">
                    <div>
                      <span className="text-gray-500 font-medium">Deliverables:</span> <span className="text-gray-300 font-light">{camp.deliverables || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 font-medium font-sans">Ideal Profiles:</span> <span className="text-gray-300 font-light italic">{camp.requirements || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* --- ACTIONS SECTION DEPENDING ON ROLE --- */}
                <div className="border-t border-white/5 pt-4 mt-4 text-xs">
                  {role === 'influencer' && (
                    <div className="space-y-3">
                      {hasApplied ? (
                        <div className="p-2 bg-[#735DD7]/10 border border-[#735DD7]/20 rounded-lg text-center text-[#AC71E0] font-semibold italic flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[#AC71E0]" /> Your sponsorship application is currently under review
                        </div>
                      ) : (
                        <div>
                          {applyingCampId === camp.id ? (
                            <div className="space-y-2">
                              <textarea 
                                placeholder="Explain why you are the best fit, and pitch your content deliverable layout idea..."
                                value={proposalText}
                                onChange={(e) => setProposalText(e.target.value)}
                                className="w-full p-2 bg-black/40 border border-[#735DD7]/50 rounded-lg text-xs hover:border-[#735DD7] focus:outline-none focus:border-[#735DD7] text-white"
                                rows={2}
                              />
                              <div className="flex justify-end gap-2 text-[10px]">
                                <button 
                                  onClick={() => setApplyingCampId(null)}
                                  className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-md text-gray-400 hover:text-white"
                                >
                                  Cancel
                                </button>
                                <button 
                                  onClick={() => {
                                    if (!proposalText) return;
                                    onApplyToCampaign(camp.id, proposalText);
                                    setApplyingCampId(null);
                                    setProposalText('');
                                  }}
                                  className="px-3.5 py-1.5 bg-[#735DD7] hover:bg-opacity-90 rounded-md text-white font-bold flex items-center gap-1 cursor-pointer"
                                >
                                  <Send className="w-3 h-3" /> Submit Sponsoring Pitch
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button 
                              onClick={() => setApplyingCampId(camp.id)}
                              className="w-full py-2 bg-gradient-to-r from-[#735DD7] to-[#5047B5] hover:opacity-90 font-bold text-white rounded-lg transition"
                            >
                              Apply to campaign
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {role === 'brand' && (
                    <div className="flex gap-2">
                      {camp.status === 'active' ? (
                        <button 
                          onClick={() => onUpdateCampaignStatus(camp.id, 'paused')}
                          className="flex-1 py-1.5 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 font-semibold rounded-lg border border-amber-400/20 flex items-center justify-center gap-1"
                        >
                          <Pause className="w-3.5 h-3.5" /> Pause Sponsoring
                        </button>
                      ) : (
                        <button 
                          onClick={() => onUpdateCampaignStatus(camp.id, 'active')}
                          className="flex-1 py-1.5 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-300 font-semibold rounded-lg border border-emerald-400/20 flex items-center justify-center gap-1"
                        >
                          <Play className="w-3.5 h-3.5" /> Resume Briefing
                        </button>
                      )}
                      <button 
                        onClick={() => onUpdateCampaignStatus(camp.id, 'closed')}
                        className="px-3.5 py-1.5 bg-red-400/10 hover:bg-red-400/20 text-red-300 font-semibold rounded-lg border border-red-400/20"
                      >
                        Archived
                      </button>
                    </div>
                  )}

                  {role === 'admin' && (
                    <p className="text-gray-500 font-mono text-[10px] text-center">Platform Audit ID: {camp.id} · Active Escrow Verified</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- APPLICATIONS & INFLUENCER CONTENT DRAFTS MODERATION SECTOR --- */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2 text-white font-bold">
          <ShieldCheck className="w-5 h-5 text-[#AC71E0]" />
          <h3>Content Approvals & Sponsorship Logs ({applications.length})</h3>
        </div>

        {/* Filters to relevant applications depending on role */}
        <div className="space-y-4">
          {applications.map((app) => {
            // Hide application if role is influencer and it is not theirs
            if (role === 'influencer' && app.influencerId !== currentUserId) return null;

            return (
              <div key={app.id} className="glass-panel p-5 rounded-xl border border-white/5 space-y-4 text-xs">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 bg-white/[0.02] p-3 rounded-lg border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={app.influencerAvatar} 
                      alt="" 
                      className="w-10 h-10 object-cover rounded-full border border-[#735DD7]"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm">{app.influencerName} <span className="font-mono text-xs font-normal text-gray-400">{app.influencerHandle}</span></h4>
                      <p className="text-gray-400 text-xs mt-0.5">Applied to: <span className="font-semibold text-gray-200">{app.campaignName}</span></p>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className={`px-2 py-0.5 rounded-full border text-[9px] font-mono capitalize ${getAppStatusClass(app.status)}`}>
                      {app.status.replace('_', ' ')}
                    </span>
                    <div className="text-[10px] text-gray-500 font-mono">{new Date(app.submittedAt).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Proposal body */}
                <div className="space-y-1.5 pl-1 text-left">
                  <span className="text-gray-500 font-bold block text-[10px] font-mono uppercase tracking-wider">Candidate Proposal Pitch</span>
                  <p className="text-gray-300 leading-relaxed italic">&ldquo;{app.proposal}&rdquo;</p>
                </div>

                {/* Submited Content Preview for Review */}
                {app.contentUrl && (
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                      <span className="text-[#AC71E0] font-bold">SUBMITTED POST DRAFT PREVIEW (VIDEO DELIVERABLE)</span>
                      <span>compliance_check_passed.mp4</span>
                    </div>

                    <div className="aspect-video w-full max-w-md bg-black rounded-lg border border-white/10 flex items-center justify-center overflow-hidden relative group">
                      <video 
                        src={app.contentUrl} 
                        className="w-full h-full object-cover opacity-75"
                        controls
                        muted
                        playsInline
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 rounded text-[9px] text-emerald-400 font-mono flex items-center gap-1 border border-emerald-400/20">
                        <Check className="w-3 h-3 text-emerald-400" /> Auto compliance ready (60s Limit safe)
                      </div>
                    </div>
                  </div>
                )}

                {/* Feedbacks list if revision requested */}
                {app.feedback && (
                  <div className="p-3 bg-amber-400/5 rounded-lg border border-amber-400/20 font-mono text-[11px] text-amber-300">
                    <span className="font-bold">MODERATION REPORT:</span> &ldquo;{app.feedback}&rdquo;
                  </div>
                )}

                {/* --- MODERATOR ACTIONS IF IN EDITOR ROLE --- */}
                {role === 'editor' && app.status === 'editor_review' && (
                  <div className="pt-4 border-t border-white/5 space-y-3">
                    <div className="space-y-1">
                      <label className="text-gray-500 font-mono text-[10px] uppercase font-bold block">Revision Directions / Audit Feedback</label>
                      <input 
                        type="text"
                        placeholder="Add specific modifications regarding logo sizing, vocal volumes, or caption tags... (Optional)"
                        value={editorFeedback[app.id] || ''}
                        onChange={(e) => setEditorFeedback({ ...editorFeedback, [app.id]: e.target.value })}
                        className="w-full p-2 bg-black/40 border border-white/10 rounded-lg text-xs"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => onUpdateApplicationStatus(app.id, 'completed')}
                        className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 font-bold text-white rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Check className="w-4 h-4" /> Approve Draft & Release Escrow
                      </button>
                      <button 
                        onClick={() => {
                          const f = editorFeedback[app.id] || 'Please review creative directives. Brand require adjusting details.';
                          onUpdateApplicationStatus(app.id, 'revision_requested', f);
                        }}
                        className="px-4 py-2 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 text-amber-300 font-semibold rounded-lg"
                      >
                        Request Revision
                      </button>
                      <button 
                        onClick={() => onUpdateApplicationStatus(app.id, 'rejected')}
                        className="px-4 py-2 bg-red-400/15 hover:bg-red-400/25 border border-red-400/30 text-red-400 font-semibold rounded-lg"
                      >
                        Reject Pitch
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions of completing for Influencers if revision requested */}
                {role === 'influencer' && app.status === 'revision_requested' && (
                  <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex gap-2 text-left">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white block">Revising Draft Deliverable</span>
                        <span className="text-[11px] text-gray-400">Please adjust your draft video post files with the requested guidelines from editor and resubmit.</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onUpdateApplicationStatus(app.id, 'editor_review')}
                      className="px-4 py-1.5 bg-[#735DD7] hover:bg-opacity-90 font-bold text-white rounded-md transition"
                    >
                      Resubmit Core Deliverable
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
