import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Users, Compass, BarChart3, ShieldCheck, Mail, HelpCircle, 
  Sparkles, Check, Lock, DollarSign, Globe, Star, MessageSquare 
} from 'lucide-react';

interface LandingPageProps {
  onStartApp: () => void;
}

export default function LandingPage({ onStartApp }: LandingPageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('growth');

  const faqs = [
    {
      q: "How does the AI Recommendation Engine work?",
      a: "Our advanced algorithm, powered by Google Gemini, analyzes your campaign requirements, category descriptions, and target demographics to instantly scan our influencer index and suggest the absolute best match based on content style and audience overlap."
    },
    {
      q: "Are the social integrations and metrics real?",
      a: "Yes! In production, we integrate directly with Instagram Graph API, YouTube Reporting API, and TikTok Business API to pull certified, fraud-free reach, follower, and engagement stats. Our simulation simulates this flow with precision."
    },
    {
      q: "How are influencer payouts protected?",
      a: "Our platform features safe escrow custody via Stripe or Razorpay. Brands fund the campaign budget upfront. Once the influencer submits their content draft, the Editor approves the post, and our wallet mechanism instantly releases the payouts."
    },
    {
      q: "Can we downgrade or cancel our plan anytime?",
      a: "Absolutely. There are no contracts. You can switch plans or cancel your subscription directly from the billing tab in your Brand Dashboard."
    }
  ];

  const trustedBrands = [
    { name: "Sennheiser", logo: "⚡ SENNHEISER" },
    { name: "Sony", logo: "✦ SONY" },
    { name: "Nike Wellness", logo: "▲ NIKE WELLNESS" },
    { name: "Logix Labs", logo: "⬡ LOGIX AUDIO" },
    { name: "Nordic Wear", logo: "▼ NORDIC WEAR" }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-x-hidden selection:bg-[#735DD7] selection:text-white">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#735DD7] to-[#AC71E0] flex items-center justify-center font-bold text-lg shadow-lg shadow-[#735DD7]/20">
              F
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-white/90 to-[#AC71E0] bg-clip-text text-transparent">
              FEWSION <span className="text-xs px-2 py-0.5 rounded-full bg-[#735DD7]/20 text-[#AC71E0] font-mono border border-[#735DD7]/30">PREMIUM</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </nav>

          <button 
            onClick={onStartApp}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#735DD7] to-[#5047B5] text-white font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-[#735DD7]/20 cursor-pointer"
          >
            Launch Platform Simulation
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-36 px-6 max-w-7xl mx-auto">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#735DD7]/10 to-[#AC71E0]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Hero */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#AC71E0] font-medium font-mono">
              <Sparkles className="w-3.5 h-3.5" /> Google Gemini AI Influencer Matching Live
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none text-white">
              The Enterprise <br />
              <span className="bg-gradient-to-r from-[#735DD7] via-[#AC71E0] to-white bg-clip-text text-transparent">
                Influencer Engine
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-light">
              Automate discovery, campaign deployment, secure multi-party payments, and content moderation in one glassmorphic SaaS interface. Streamline collaborations using Google Gemini.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onStartApp}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#735DD7] via-[#5047B5] to-[#AC71E0] text-white font-bold text-base hover:shadow-[#735DD7]/30 hover:scale-[1.02] transition shadow-xl cursor-pointer flex items-center justify-center gap-2"
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </button>
              <a 
                href="#features"
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/15 text-white font-semibold text-base hover:bg-white/10 transition text-center flex items-center justify-center gap-2"
              >
                Explore Features
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4 text-left border-t border-white/10 max-w-lg">
              <div>
                <dt className="text-3xl font-extrabold text-[#AC71E0]">12M+</dt>
                <dd className="text-xs text-gray-400 mt-1 uppercase font-mono tracking-wider">Creators Index</dd>
              </div>
              <div>
                <dt className="text-3xl font-extrabold text-white">88%</dt>
                <dd className="text-xs text-gray-400 mt-1 uppercase font-mono tracking-wider">Match Accuracy</dd>
              </div>
              <div>
                <dt className="text-3xl font-extrabold text-white">$4.5M+</dt>
                <dd className="text-xs text-gray-400 mt-1 uppercase font-mono tracking-wider">Payments Sent</dd>
              </div>
            </div>
          </div>

          {/* Right Hero / Graphic Card */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#735DD7] to-[#AC71E0] opacity-30 blur-xl animate-pulse" />
            <div className="relative glass-panel rounded-2xl p-6 glow-purple border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-[10px] font-mono text-gray-500">campaign_discovery_node.tsx</span>
              </div>

              {/* Dynamic matching card preview */}
              <div className="rounded-xl bg-white/5 p-4 border border-white/5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#735DD7]/20 flex items-center justify-center text-lg">🤖</div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Gemini Match Engine</h4>
                    <span className="text-[10px] text-gray-400">Scanning Aria Thorne (@ariathorne)...</span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#735DD7] to-[#AC71E0] rounded-full w-[94%]" />
                </div>
                <div className="flex justify-between text-[11px] text-gray-400 font-mono">
                  <span>Match Probability Score:</span>
                  <span className="text-green-400 font-bold">98.4% Exceptional</span>
                </div>
              </div>

              {/* Influencer Profile snippet */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                    alt="Aria" 
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#735DD7]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">Aria Thorne</h4>
                    <span className="text-xs text-gray-400">@ariathorne · Lifestyle Tech</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-white">1.2M</div>
                  <div className="text-[10px] text-[#AC71E0]">Reach Growth</div>
                </div>
              </div>

              {/* Live metrics pill */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-left">
                  <div className="text-[10px] text-gray-500 font-mono uppercase">Campaign Escrow</div>
                  <div className="text-base font-bold text-emerald-400 mt-1">$8,500 FUNDED</div>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-left">
                  <div className="text-[10px] text-gray-500 font-mono uppercase">Deliverables Verification</div>
                  <div className="text-base font-bold text-amber-400 mt-1">PENDING EDITOR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="border-t border-b border-white/5 bg-white/[0.01] py-8 px-6 overflow-hidden">
        <p className="text-xs text-center text-gray-500 uppercase tracking-widest font-mono mb-6">Empowering elite campaigns globally</p>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {trustedBrands.map((brand) => (
            <span key={brand.name} className="text-gray-500 text-lg font-bold tracking-tight hover:text-gray-300 transition shrink-0 cursor-default">
              {brand.logo}
            </span>
          ))}
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto relative">
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#735DD7]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold font-mono text-[#AC71E0] uppercase tracking-widest">End-to-End Capabilities </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Everything required for modular campaigns</h2>
          <p className="text-gray-400">Streamline multi-person brand outreach, approval chains, and programmatic payment verifications with no code barriers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/10 transition group space-y-6">
            <div className="w-12 h-12 rounded-xl bg-[#735DD7]/10 border border-[#735DD7]/30 flex items-center justify-center text-white">
              <Compass className="w-6 h-6 text-[#AC71E0]" />
            </div>
            <h3 className="text-xl font-bold">1. AI Influencer Discovery</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Find targets instantly using demographic keys, reach ranges, engagement, and platforms. Connect with Google Gemini AI to ask natural language matches.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/10 transition group space-y-6">
            <div className="w-12 h-12 rounded-xl bg-[#735DD7]/10 border border-[#735DD7]/30 flex items-center justify-center text-white">
              <Users className="w-6 h-6 text-[#AC71E0]" />
            </div>
            <h3 className="text-xl font-bold">2. Role-Based Governance</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Switch easily between full dashboard mock roles: Brands deploy briefs, Influencers apply and submit content, Editors verify drafts, and Admins supervise commission splits.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/10 transition group space-y-6">
            <div className="w-12 h-12 rounded-xl bg-[#735DD7]/10 border border-[#735DD7]/30 flex items-center justify-center text-white">
              <BarChart3 className="w-6 h-6 text-[#AC71E0]" />
            </div>
            <h3 className="text-xl font-bold">3. Multi-Channel Analytics</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Analyze true ROI, overall brand expenditures, reach numbers, and individual platform engagement with dynamic interactive Recharts.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/10 transition group space-y-6">
            <div className="w-12 h-12 rounded-xl bg-[#735DD7]/10 border border-[#735DD7]/30 flex items-center justify-center text-white">
              <Lock className="w-6 h-6 text-[#AC71E0]" />
            </div>
            <h3 className="text-xl font-bold">4. Safe Token Escrow</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Guarantee payment security. Funds are secured via Stripe/Razorpay on campaign onset and programmed to pay once content undergoes validation.
            </p>
          </div>

          {/* Card 5 */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/10 transition group space-y-6">
            <div className="w-12 h-12 rounded-xl bg-[#735DD7]/10 border border-[#735DD7]/30 flex items-center justify-center text-white">
              <MessageSquare className="w-6 h-6 text-[#AC71E0]" />
            </div>
            <h3 className="text-xl font-bold">5. Real-Time Discussions</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discuss briefs, pricing, and timing in real-time. Share revision briefs, files, and contracts inside sandbox rooms.
            </p>
          </div>

          {/* Card 6 */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/10 transition group space-y-6">
            <div className="w-12 h-12 rounded-xl bg-[#735DD7]/10 border border-[#735DD7]/30 flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6 text-[#AC71E0]" />
            </div>
            <h3 className="text-xl font-bold">6. Editorial Review Flow</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Editor accounts supervise compliance metrics, review uploaded video frames, verify guidelines, and protect against brand identity damage.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Segment */}
      <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold font-mono text-[#AC71E0] uppercase tracking-widest">Simplifying Marketing</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Three steps to live activation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 text-left">
          <div className="glass-panel p-6 rounded-xl border border-white/5 relative">
            <div className="absolute top-4 right-4 text-5xl font-mono font-bold text-white/5">01</div>
            <h3 className="text-lg font-bold text-white mb-2">Configure & Secure</h3>
            <p className="text-sm text-gray-400">
              The Brand logs in, publishes a creative brief with guidelines, set categories, budgets, and pre-funds the escrow contract safely using our payment gateway simulation.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/5 relative">
            <div className="absolute top-4 right-4 text-5xl font-mono font-bold text-white/5">02</div>
            <h3 className="text-lg font-bold text-white mb-2">Gemini Match & Deploy</h3>
            <p className="text-sm text-gray-400">
              Use Gemini AI-driven discovery to pinpoint maximum engagement creators. Chat in-app, exchange resources, and finalize deliverables seamlessly.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/5 relative">
            <div className="absolute top-4 right-4 text-5xl font-mono font-bold text-white/5">03</div>
            <h3 className="text-lg font-bold text-white mb-2">Editor Review & Release</h3>
            <p className="text-sm text-gray-400">
              Influencers submit draft posts or video links. Independent editors evaluate deliverables against initial guidelines, authorize posts, and instantly release escrow payments.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 border-t border-white/5 relative">
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#AC71E0]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold font-mono text-[#AC71E0] uppercase tracking-widest">Enterprise Packaging</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Flexible SaaS Subscriptions</h2>
            <p className="text-gray-400">Choose the ideal level for your company. Change billing anytime.</p>
            
            {/* Billing Cycle Switch */}
            <div className="inline-flex items-center gap-1.5 p-1 bg-white/5 rounded-full border border-white/10 mt-6">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${billingCycle === 'monthly' ? 'bg-[#735DD7] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${billingCycle === 'yearly' ? 'bg-[#735DD7] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Yearly <span className="text-[9px] bg-emerald-400/20 text-emerald-400 px-1 py-0.5 rounded font-mono">SAVE 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
            {/* Plan 1 */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold font-mono text-gray-500 uppercase tracking-widest">Starter</span>
                <h3 className="text-2xl font-bold text-white">Emerging Brand</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Perfect for startups running local campaigns with emerging creators.</p>
                <div className="pt-4 flex items-baseline gap-1 text-white">
                  <span className="text-4xl font-extrabold font-mono">${billingCycle === 'monthly' ? '49' : '39'}</span>
                  <span className="text-xs text-gray-400 font-mono">/ month</span>
                </div>
                <div className="space-y-3 pt-6 border-t border-white/5 text-sm text-gray-300">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#AC71E0]" /> <span>Up to 3 active campaigns</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#AC71E0]" /> <span>Filter 15,000+ basic list</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#AC71E0]" /> <span>Standard local payment processing</span></div>
                  <div className="flex items-center gap-2 text-gray-500 line-through"><Check className="w-4 h-4" /> <span>Google Gemini AI recommendation</span></div>
                </div>
              </div>
              <button 
                onClick={onStartApp}
                className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition cursor-pointer"
              >
                Launch Simulation
              </button>
            </div>

            {/* Plan 2 */}
            <div className="glass-panel p-8 rounded-2xl border-2 border-[#735DD7] relative space-y-6 flex flex-col justify-between glow-purple">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#735DD7] to-[#AC71E0] text-[10px] uppercase font-mono tracking-widest font-extrabold px-3 py-1 rounded-full border border-white/20">
                Most Popular
              </div>
              <div className="space-y-4 pt-2">
                <span className="text-xs font-bold font-mono text-[#AC71E0] uppercase tracking-widest">Standard Suite</span>
                <h3 className="text-2xl font-bold text-white">Growth Agency</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Scale conversions with dynamic search tracking and automation workflows.</p>
                <div className="pt-4 flex items-baseline gap-1 text-white">
                  <span className="text-4xl font-extrabold font-mono">${billingCycle === 'monthly' ? '149' : '119'}</span>
                  <span className="text-xs text-gray-400 font-mono">/ month</span>
                </div>
                <div className="space-y-3 pt-6 border-t border-white/5 text-sm text-gray-300">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#AC71E0]" /> <span>Unlimited active campaigns</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#AC71E0]" /> <span>Advanced filters (Engagement/niche)</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#AC71E0]" /> <span>Stripe / Razorpay payments verify</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#AC71E0]" /> <span>Gemini AI influencer suggestions</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#AC71E0]" /> <span>In-app chat & Editor review loop</span></div>
                </div>
              </div>
              <button 
                onClick={onStartApp}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#735DD7] to-[#AC71E0] text-white font-bold text-sm hover:opacity-95 transition shadow-lg cursor-pointer"
              >
                Launch Simulation
              </button>
            </div>

            {/* Plan 3 */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold font-mono text-gray-500 uppercase tracking-widest">Corporation</span>
                <h3 className="text-2xl font-bold text-white">Global Enterprise</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Custom analytics, full API programmatic integrations and single-signon controls.</p>
                <div className="pt-4 flex items-baseline gap-1 text-white">
                  <span className="text-4xl font-extrabold font-mono">${billingCycle === 'monthly' ? '499' : '399'}</span>
                  <span className="text-xs text-gray-400 font-mono">/ month</span>
                </div>
                <div className="space-y-3 pt-6 border-t border-white/5 text-sm text-gray-300">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#AC71E0]" /> <span>Everything in Growth Plan</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#AC71E0]" /> <span>Dedicated content moderation audits</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#AC71E0]" /> <span>SLA guarantees & 24/7 Phone Help</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#AC71E0]" /> <span>Whiteload media kit hosting</span></div>
                </div>
              </div>
              <button 
                onClick={onStartApp}
                className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition cursor-pointer"
              >
                Launch Simulation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold font-mono text-[#AC71E0] uppercase tracking-widest">Self-service Center</span>
          <h2 className="text-3xl font-extrabold">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4 text-left">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-panel p-6 rounded-xl border border-white/5 space-y-2">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#AC71E0] shrink-0" /> {faq.q}
              </h4>
              <p className="text-sm text-gray-400 pl-6 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic SEO JSON-LD injection */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Fewsion Premium SaaS Platform",
          "operatingSystem": "All modern browsers",
          "applicationCategory": "Marketing Business Application",
          "offers": {
            "@type": "Offer",
            "price": "149.00",
            "priceCurrency": "USD"
          }
        })}
      </script>

      {/* Premium Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-black/60 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#735DD7] flex items-center justify-center font-bold">
                F
              </div>
              <span className="font-bold text-lg text-white">FEWSION</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Enterprise-grade influencer marketing workflows. Integrate search metrics, automate payment escrows, and moderate branding campaigns in one visual system.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 font-mono">Platform</h5>
            <ul className="text-xs text-gray-500 space-y-2">
              <li><a href="#features" className="hover:text-white transition">Product Capabilities</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Subscription pricing</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition">How it works info</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 font-mono">Governance & Dev</h5>
            <ul className="text-xs text-gray-500 space-y-2">
              <li><span className="text-gray-600 font-mono">POSTGRESQL / PRISMA</span></li>
              <li><span className="text-gray-600 font-mono">DOCKER COMPOSE READY</span></li>
              <li><span className="text-gray-600 font-mono">GOOGLE GEMINI 3.5</span></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 font-mono">Contact & SEO</h5>
            <div className="space-y-2 text-xs text-gray-500">
              <p>Email: enterprise@fewsion.io</p>
              <p>Host: Cloud Run sandbox</p>
              <div className="flex gap-4 mt-4 text-gray-600">
                <span className="hover:text-white transition cursor-pointer">Sitemap.xml</span>
                <span className="hover:text-white transition cursor-pointer">Robots.txt</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-600">
          <p>© 2026 FEWSION SaaS Platform Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <span className="hover:text-[#AC71E0] transition">Terms of Service</span>
            <span className="hover:text-[#AC71E0] transition">Privacy Ledger</span>
            <span className="hover:text-[#AC71E0] transition">API Swagger</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
