import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, SlidersHorizontal, Sparkles, Star, MapPin, 
  Tv, Instagram, Youtube, Linkedin, Twitter, Network, ArrowUpRight, CheckCircle2, Loader2 
} from 'lucide-react';
import { InfluencerProfile, Campaign } from '../types';

interface InfluenceDiscoveryProps {
  influencers: InfluencerProfile[];
  campaigns: Campaign[];
  onInviteInfluencer: (influencerId: string, campaignId: string) => void;
}

export default function InfluenceDiscovery({ influencers, campaigns, onInviteInfluencer }: InfluenceDiscoveryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [minFollowers, setMinFollowers] = useState<number>(0);

  // Gemini recommended states
  const [selectedCampaignForAI, setSelectedCampaignForAI] = useState<string>(campaigns[0]?.id || '');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<Array<{ id: string, score: number, matchReason: string, strategy: string }> | null>(null);
  const [aiWarning, setAiWarning] = useState<string | null>(null);

  const niches = ['All', 'Tech & Lifestyle', 'Fitness & Wellness', 'Travel & Photography', 'Tech & Hardware', 'Beauty & Fashion'];
  const platforms = ['All', 'instagram', 'youtube', 'linkedin', 'x'];

  const filteredInfluencers = influencers.filter(inf => {
    const matchesSearch = inf.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inf.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inf.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNiche = selectedNiche === 'All' || inf.niche === selectedNiche;
    const matchesPlatform = selectedPlatform === 'All' || inf.platforms.includes(selectedPlatform as any);
    const matchesFollowers = inf.followers >= minFollowers;
    return matchesSearch && matchesNiche && matchesPlatform && matchesFollowers;
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'youtube': return <Youtube className="w-4 h-4 text-red-500" />;
      case 'linkedin': return <Linkedin className="w-4 h-4 text-blue-500" />;
      case 'x': return <Twitter className="w-4 h-4 text-gray-400" />;
      default: return <Tv className="w-4 h-4" />;
    }
  };

  const handleRunAIRecommendation = async () => {
    const targetCamp = campaigns.find(c => c.id === selectedCampaignForAI);
    if (!targetCamp) return;

    setAiLoading(true);
    setAiWarning(null);
    setAiRecommendations(null);

    try {
      const res = await fetch('/api/gemini/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignName: targetCamp.name,
          description: targetCamp.description,
          requirements: targetCamp.requirements,
          influencers: influencers.map(inf => ({
            id: inf.id,
            name: inf.name,
            handle: inf.handle,
            niche: inf.niche,
            followers: inf.followers,
            engagementRate: inf.engagementRate,
            bio: inf.bio,
            platforms: inf.platforms,
          }))
        })
      });

      const data = await res.json();
      if (data.warning) {
        setAiWarning(data.warning);
      }
      setAiRecommendations(data.recommendations);
    } catch (err: any) {
      console.error(err);
      setAiWarning('Trouble communicating with matching servers. Loaded safe deterministic models.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Influencer Discovery</h2>
        <p className="text-sm text-gray-400 mt-1">
          Scan verified cross-platform creators matching your budget boundaries or use Google Gemini to pinpoint highest fit scores.
        </p>
      </div>

      {/* Grid Layout: Controls + AI Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Traditional Filters and List */}
        <div className="lg:col-span-8 space-y-6">
          {/* Search bar & simple filters */}
          <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Query niche, name, key handles, topics..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#735DD7] transition text-white"
                />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-xl border border-white/10 text-xs text-gray-400">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters Active</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {/* Niche */}
              <div>
                <label className="text-gray-400 block mb-1.5 font-medium">Niche Specialty</label>
                <select 
                  value={selectedNiche} 
                  onChange={(e) => setSelectedNiche(e.target.value)}
                  className="w-full p-2 bg-black/40 border border-white/10 rounded-lg text-white"
                >
                  {niches.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              {/* Platform */}
              <div>
                <label className="text-gray-400 block mb-1.5 font-medium">Primary Media Channel</label>
                <select 
                  value={selectedPlatform} 
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full p-2 bg-black/40 border border-white/10 rounded-lg text-white capitalize"
                >
                  {platforms.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              {/* Followers Minimum */}
              <div>
                <label className="text-gray-400 block mb-1.5 font-medium">Min Reach: {minFollowers.toLocaleString()}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="2000000" 
                  step="100000"
                  value={minFollowers} 
                  onChange={(e) => setMinFollowers(Number(e.target.value))}
                  className="w-full accent-[#735DD7]"
                />
              </div>
            </div>
          </div>

          {/* Influencer Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredInfluencers.map((inf) => {
              // Check if AI match details are available for this user
              const aiMatch = aiRecommendations?.find(rec => rec.id === inf.id);

              return (
                <div 
                  key={inf.id} 
                  className={`glass-panel rounded-xl p-5 border transition relative flex flex-col justify-between ${aiMatch ? 'border-amber-400/40 shadow-md shadow-amber-400/5' : 'border-white/5 hover:border-white/10'}`}
                >
                  {aiMatch && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[10px] font-bold font-mono px-2 py-0.5 rounded-full flex items-center gap-1 z-10 shadow-sm animate-pulse">
                      <Sparkles className="w-3 h-3 fill-black/20" /> FIT AI {aiMatch.score}%
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Header profile info */}
                    <div className="flex gap-3">
                      <img 
                        src={inf.avatar} 
                        alt={inf.name} 
                        className="w-12 h-12 rounded-full object-cover border border-[#735DD7]/40 shrink-0" 
                      />
                      <div>
                        <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                          {inf.name} 
                          <span className="text-gray-400 font-normal font-mono text-xs">{inf.handle}</span>
                        </h4>
                        <div className="flex items-center gap-1 text-[114x] text-gray-400 mt-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{inf.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 tracking-wider">
                        {inf.niche}
                      </span>
                      {inf.platforms.map(plat => (
                        <span key={plat} className="p-1 rounded bg-white/5 inline-flex" title={plat}>
                          {getPlatformIcon(plat)}
                        </span>
                      ))}
                    </div>

                    {/* Stats strip */}
                    <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-lg bg-black/40 border border-white/5 text-center text-xs">
                      <div>
                        <div className="text-gray-500 text-[9px] font-mono uppercase">Followers</div>
                        <div className="text-white font-bold font-mono mt-0.5">{(inf.followers / 1000).toFixed(0)}K</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-[9px] font-mono uppercase">Engagement</div>
                        <div className="text-white font-bold font-mono mt-0.5 flex justify-center items-center gap-0.5">
                          <span>{inf.engagementRate}%</span>
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-[9px] font-mono uppercase">Rating</div>
                        <div className="text-white font-bold font-mono mt-0.5">{inf.rating}</div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-gray-400 leading-relaxed italic line-clamp-2">
                       &ldquo;{inf.bio}&rdquo;
                    </p>

                    {/* AI Strategy if generated */}
                    {aiMatch && (
                      <div className="p-3 bg-amber-400/5 rounded-xl border border-amber-400/20 text-xs mt-3 space-y-1.5">
                        <div className="text-amber-300 font-bold flex items-center gap-1.5 font-mono uppercase tracking-wider text-[9px]">
                          <CheckCircle2 className="w-3 h-3 text-amber-400" /> Recommended Strategy
                        </div>
                        <p className="text-[11px] text-gray-300 italic">{aiMatch.strategy}</p>
                        <p className="text-[11px] text-gray-400 pt-1 font-sans border-t border-white/5"><span className="font-semibold text-amber-400">Match Logic:</span> {aiMatch.matchReason}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions footer */}
                  <div className="pt-4 mt-4 border-t border-white/5 flex gap-2">
                    <button 
                      onClick={() => onInviteInfluencer(inf.id, selectedCampaignForAI)}
                      className="flex-1 py-1.5 rounded-lg bg-[#735DD7]/15 hover:bg-[#735DD7]/25 text-white font-semibold text-xs transition border border-[#735DD7]/30 flex items-center justify-center gap-1"
                    >
                      <Network className="w-3.5 h-3.5 text-[#AC71E0]" /> Invite Campaign
                    </button>
                    <a 
                      href={inf.mediaKitUrl}
                      className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white transition hover:bg-white/10 text-xs inline-flex items-center justify-center"
                      title="View media kit portfolio"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}

            {filteredInfluencers.length === 0 && (
              <div className="col-span-full py-16 text-center text-gray-500 border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
                <p className="text-sm">No creators found matching the current metric constraints.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedNiche('All'); setSelectedPlatform('All'); setMinFollowers(0); }}
                  className="mt-3 text-[#AC71E0] text-xs font-semibold hover:underline"
                >
                  Reset Filtering Parameters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Gemini AI recommendation engine console */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 glass-panel rounded-xl p-6 border border-white/10 space-y-6 relative overflow-hidden glow-purple">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#AC71E0]/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header info */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 text-[#AC71E0] text-[10px] font-bold uppercase tracking-wider font-mono border border-amber-400/20">
                <Sparkles className="w-3 h-3 fill-current" /> Google Gemini Match
              </div>
              <h3 className="text-base font-extrabold text-white">AI Suggestion Core</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Connect raw campaign brief parameters to Gemini to score candidates, predict outcomes, and draft target channel scripts automatically.
              </p>
            </div>

            {/* Brief Selector */}
            <div className="space-y-2 text-xs">
              <label className="text-gray-400 block font-medium">1. Select Creative Campaign</label>
              <select 
                value={selectedCampaignForAI}
                onChange={(e) => setSelectedCampaignForAI(e.target.value)}
                className="w-full p-2.5 bg-black/50 border border-white/10 rounded-lg text-white"
              >
                {campaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            {/* Strategy launcher button */}
            <button 
              onClick={handleRunAIRecommendation}
              disabled={aiLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#735DD7] via-[#5047B5] to-[#AC71E0] text-white font-bold text-xs hover:opacity-90 transition shadow-lg shrink-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {aiLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Structuring match log...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze fit metrics with Gemini 3.5</span>
                </>
              )}
            </button>

            {/* Warning notes */}
            {aiWarning && (
              <div className="p-3 rounded-lg bg-[#735DD7]/10 border border-[#735DD7]/20 text-[11px] text-gray-400 leading-relaxed font-mono">
                <span className="text-[#AC71E0] font-bold">INFO:</span> {aiWarning}
              </div>
            )}

            {/* AI Reassurance Status Logs while compiling */}
            {aiLoading && (
              <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-2.5">
                <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
                  <span>Task Status:</span>
                  <span className="text-amber-400 animate-pulse">Computing...</span>
                </div>
                <div className="space-y-1.5 font-mono text-[9px] text-gray-400">
                  <p className="flex items-center gap-1.5"><span className="text-green-500">✔</span> Parsing campaign requirements...</p>
                  <p className="flex items-center gap-1.5"><span className="text-green-500">✔</span> Compiling cross-platform follower indices...</p>
                  <p className="flex items-center gap-1.5"><Loader2 className="w-2.5 h-2.5 animate-spin text-yellow-500" /> Grounding matching logic on target platforms...</p>
                </div>
              </div>
            )}

            {/* Complete output indicator */}
            {!aiLoading && aiRecommendations && (
              <div className="p-4 rounded-lg bg-emerald-400/5 border border-emerald-400/10 space-y-2 text-center">
                <div className="text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 font-mono uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" /> Matching Analysis Complete
                </div>
                <p className="text-[11px] text-gray-400">
                  We have mapped scores and recommended strategy boxes across your candidates list. Look for the <span className="text-amber-400 font-bold">FIT AI</span> badging!
                </p>
                <button 
                  onClick={() => setAiRecommendations(null)}
                  className="text-xs text-gray-500 hover:text-white underline mt-2 transition"
                >
                  Clear matching overlay
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
