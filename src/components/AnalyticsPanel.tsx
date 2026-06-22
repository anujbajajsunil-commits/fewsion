import { useState } from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { 
  BarChart3, TrendingUp, Users, DollarSign, Target, Award, Eye, Flame 
} from 'lucide-react';
import { UserRole } from '../types';

interface AnalyticsPanelProps {
  role: UserRole;
}

// Mock Time-series data
const MONTHLY_DATA = [
  { name: 'Jan', reach: 450000, impressions: 580000, engagement: 4.8, roi: 180, expenditure: 25000 },
  { name: 'Feb', reach: 520000, impressions: 640000, engagement: 5.1, roi: 200, expenditure: 28000 },
  { name: 'Mar', reach: 690000, impressions: 850000, engagement: 5.4, roi: 215, expenditure: 32000 },
  { name: 'Apr', reach: 810000, impressions: 1050000, engagement: 5.2, roi: 230, expenditure: 40000 },
  { name: 'May', reach: 980000, impressions: 1250000, engagement: 5.8, roi: 245, expenditure: 45000 },
  { name: 'Jun', reach: 1250000, impressions: 1620000, engagement: 6.1, roi: 280, expenditure: 54000 }
];

const WEEKLY_DATA = [
  { name: 'Wk 1', reach: 180000, impressions: 220000, engagement: 5.2, roi: 195, expenditure: 12000 },
  { name: 'Wk 2', reach: 195000, impressions: 245000, engagement: 5.5, roi: 210, expenditure: 12500 },
  { name: 'Wk 3', reach: 210000, impressions: 270000, engagement: 5.7, roi: 225, expenditure: 15400 },
  { name: 'Wk 4', reach: 250000, impressions: 310000, engagement: 6.0, roi: 240, expenditure: 18200 }
];

const DAILY_DATA = [
  { name: 'Mon', reach: 28000, impressions: 38000, engagement: 5.8, roi: 210, expenditure: 2100 },
  { name: 'Tue', reach: 31000, impressions: 42000, engagement: 6.0, roi: 215, expenditure: 2200 },
  { name: 'Wed', reach: 35000, impressions: 48000, engagement: 6.2, roi: 220, expenditure: 2500 },
  { name: 'Thu', reach: 34000, impressions: 45000, engagement: 5.9, roi: 218, expenditure: 2400 },
  { name: 'Fri', reach: 41000, impressions: 55000, engagement: 6.3, roi: 245, expenditure: 3100 },
  { name: 'Sat', reach: 48000, impressions: 64000, engagement: 6.8, roi: 260, expenditure: 3800 },
  { name: 'Sun', reach: 45000, impressions: 60000, engagement: 6.6, roi: 250, expenditure: 3200 }
];

export default function AnalyticsPanel({ role }: AnalyticsPanelProps) {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  const getData = () => {
    switch (timeframe) {
      case 'daily': return DAILY_DATA;
      case 'weekly': return WEEKLY_DATA;
      default: return MONTHLY_DATA;
    }
  };

  // Safe visual numeric indicators based on Role
  const renderKPIs = () => {
    if (role === 'influencer') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">Total Followers</span>
              <Users className="w-4 h-4 text-[#AC71E0]" />
            </div>
            <div className="text-2xl font-black text-white font-mono">1.25M</div>
            <div className="text-[10px] text-emerald-400 font-mono">▲ +8.2% reach expansion</div>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">Total Reach</span>
              <Eye className="w-4 h-4 text-[#AC71E0]" />
            </div>
            <div className="text-2xl font-black text-white font-mono">850.4K</div>
            <div className="text-[10px] text-emerald-400 font-mono">▲ +24K this week</div>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">Engagement %</span>
              <Flame className="w-4 h-4 text-[#AC71E0]" />
            </div>
            <div className="text-2xl font-black text-white font-mono">6.12%</div>
            <div className="text-[10px] text-emerald-400 font-mono">▲ High conversion rating</div>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">Wallet Income</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">$24,500</div>
            <div className="text-[10px] text-gray-500 font-mono">Verified taxable earnings</div>
          </div>
        </div>
      );
    }

    // Default Brand / Admin KPIs
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2 col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">Ad Spend Ledger</span>
            <DollarSign className="w-4 h-4 text-[#AC71E0]" />
          </div>
          <div className="text-2xl font-black text-white font-mono">$45,000</div>
          <div className="text-[10px] text-gray-400 font-mono">Stripe validated escrows</div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2 col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">Campaign ROI %</span>
            <Target className="w-4 h-4 text-[#AC71E0]" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">280%</div>
          <div className="text-[10px] text-emerald-400 font-mono">▲ +15% above benchmarks</div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2 col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">Cost/Engagement</span>
            <Flame className="w-4 h-4 text-[#AC71E0]" />
          </div>
          <div className="text-2xl font-black text-white font-mono">$0.45</div>
          <div className="text-[10px] text-emerald-400 font-mono">▼ -12% cost optimizations</div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2 col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">Total Impressions</span>
            <Eye className="w-4 h-4 text-[#AC71E0]" />
          </div>
          <div className="text-2xl font-black text-white font-mono">1.62M</div>
          <div className="text-[10px] text-emerald-400 font-mono">▲ +85,000 organic tracking</div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Analytics Dashboard</h2>
          <p className="text-sm text-gray-400 mt-1">
            Real-time visual tracking of reach, impressions, audience engagement rates, and detailed campaign budget efficiency metrics.
          </p>
        </div>

        {/* Timeframe Selector Button Row */}
        <div className="inline-flex items-center p-1 bg-white/5 rounded-lg border border-white/10 text-xs self-start sm:self-center font-semibold">
          <button 
            onClick={() => setTimeframe('daily')}
            className={`px-3.5 py-1.5 rounded-md ${timeframe === 'daily' ? 'bg-[#735DD7] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Daily
          </button>
          <button 
            onClick={() => setTimeframe('weekly')}
            className={`px-3.5 py-1.5 rounded-md ${timeframe === 'weekly' ? 'bg-[#735DD7] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setTimeframe('monthly')}
            className={`px-3.5 py-1.5 rounded-md ${timeframe === 'monthly' ? 'bg-[#735DD7] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      {renderKPIs()}

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
        
        {/* Large Chart: Reach and Impressions AreaChart */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-xl border border-white/5 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#AC71E0]" />
            <h3 className="text-base font-bold text-white">Social Impressions & Reach Expansion</h3>
          </div>
          
          <div className="h-[280px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#735DD7" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#735DD7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#AC71E0" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#AC71E0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,15,15,0.9)', borderColor: 'rgba(115,93,215,0.3)', color: '#fff', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" name="Cert. Reach" dataKey="reach" stroke="#735DD7" strokeWidth={2} fillOpacity={1} fill="url(#colorReach)" />
                <Area type="monotone" name="Raw Impressions" dataKey="impressions" stroke="#AC71E0" strokeWidth={2} fillOpacity={1} fill="url(#colorImp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Chart: Engagement / ROI breakdown */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-xl border border-white/5 space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#AC71E0]" />
            <h3 className="text-base font-bold text-white">Interactive Engagement Rate %</h3>
          </div>

          <div className="h-[280px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getData()} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,15,15,0.9)', borderColor: 'rgba(115,93,215,0.3)', color: '#fff', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" name="Engagement Rate %" dataKey="engagement" stroke="#AC71E0" strokeWidth={3} dot={{ fill: '#735DD7' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ledger Bottom Flow: Expenditure vs ROI Bar Chart */}
        <div className="lg:col-span-12 glass-panel p-6 rounded-xl border border-white/5 space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#AC71E0]" />
            <h3 className="text-base font-bold text-white">Campaign Sponsoring Expenses & Growth ROI</h3>
          </div>

          <div className="h-[240px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,15,15,0.9)', borderColor: 'rgba(115,93,215,0.3)', color: '#fff', borderRadius: '8px' }}
                />
                <Legend />
                <Bar name="Platform Outlay ($)" dataKey="expenditure" fill="rgba(115, 93, 215, 0.7)" radius={[4, 4, 0, 0]} />
                <Bar name="Calculated ROI (%)" dataKey="roi" fill="rgba(172, 113, 224, 0.7)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
