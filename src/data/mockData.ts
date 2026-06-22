import { InfluencerProfile, Campaign, Application, Message, PaymentRecord, NotificationItem, AuditLog, BrandProfile } from '../types';

export const INITIAL_INFLUENCERS: InfluencerProfile[] = [
  {
    id: 'inf_1',
    name: 'Aria Thorne',
    handle: '@ariathorne',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    niche: 'Tech & Lifestyle',
    location: 'San Francisco, USA',
    followers: 1250000,
    engagementRate: 4.6,
    reach: 850000,
    earnings: 24500,
    bio: 'Tech enthusiast and lifestyle vlogger. Bridging the gap between cutting-edge consumer gadgets and premium day-to-day living. Reviewed Google Pixel, Apple, and Sony devices.',
    platforms: ['instagram', 'youtube', 'x'],
    rating: 4.8,
    mediaKitUrl: '#',
    portfolio: [
      { id: 'p_1', title: 'Smart Home Desk Tour', imageUrl: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=300&q=80', views: 89000, likes: 12400 },
      { id: 'p_2', title: 'Vlog: A Day in Silicon Valley', imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=300&q=80', views: 120000, likes: 21000 }
    ]
  },
  {
    id: 'inf_2',
    name: 'Marcus Chen',
    handle: '@marcus.fitness',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    niche: 'Fitness & Wellness',
    location: 'New York, USA',
    followers: 430000,
    engagementRate: 5.8,
    reach: 310000,
    earnings: 11200,
    bio: 'Certified personal trainer and nutritionist sharing realistic fitness habits, high-protein recipes, and positive daily mindset practices.',
    platforms: ['instagram', 'youtube', 'facebook'],
    rating: 4.9,
    mediaKitUrl: '#',
    portfolio: [
      { id: 'p_3', title: '15-Min Kettlebell Workout', imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=300&q=80', views: 45000, likes: 6200 },
      { id: 'p_4', title: 'My 5 AM Mindset Routine', imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=300&q=80', views: 72000, likes: 11500 }
    ]
  },
  {
    id: 'inf_3',
    name: 'Elena Rostova',
    handle: '@elena.travels',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    niche: 'Travel & Photography',
    location: 'Paris, France',
    followers: 890000,
    engagementRate: 3.9,
    reach: 600000,
    earnings: 18900,
    bio: 'Documenting the world\'s most breathtaking destinations. Focusing on sustainable tourism and fine art travel photography, helping brands capture global audiences.',
    platforms: ['instagram', 'youtube', 'linkedin'],
    rating: 4.7,
    mediaKitUrl: '#',
    portfolio: [
      { id: 'p_5', title: 'Hidden Gems of Amalfi Coast', imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=300&q=80', views: 115000, likes: 18400 },
      { id: 'p_6', title: 'Sustainable Travel Tips', imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=300&q=80', views: 56000, likes: 9100 }
    ]
  },
  {
    id: 'inf_4',
    name: 'David Kumar',
    handle: '@tech_david',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    niche: 'Tech & Hardware',
    location: 'Bangalore, India',
    followers: 2100000,
    engagementRate: 6.2,
    reach: 1650000,
    earnings: 41000,
    bio: 'Unboxing the future. Detailed, unbiased reviews on consumer hardware, smart phones, computing rigs, and cloud solutions.',
    platforms: ['youtube', 'x', 'linkedin'],
    rating: 4.95,
    mediaKitUrl: '#',
    portfolio: [
      { id: 'p_7', title: 'The Ultimate Workspace Rig', imageUrl: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=300&q=80', views: 420000, likes: 58000 }
    ]
  },
  {
    id: 'inf_5',
    name: 'Chloe Bennett',
    handle: '@chloe_b_beauty',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    niche: 'Beauty & Fashion',
    location: 'London, UK',
    followers: 610000,
    engagementRate: 7.2,
    reach: 480000,
    earnings: 15400,
    bio: 'Professional makeup artist and clean beauty advocate. Sharing tutorial reels, organic product comparisons, and cruelty-free fashion drops.',
    platforms: ['instagram', 'youtube'],
    rating: 4.65,
    mediaKitUrl: '#',
    portfolio: [
      { id: 'p_8', title: '5-Minute No-Makeup Makeup Look', imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80', views: 98000, likes: 14500 }
    ]
  }
];

export const INITIAL_BRANDS: BrandProfile[] = [
  {
    id: 'brand_1',
    name: 'Logix Audio',
    industry: 'Consumer Electronics',
    avatar: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?auto=format&fit=crop&w=150&q=80',
    verified: true,
    website: 'https://logix-audio.com',
    budgetSpent: 45000,
    campaignsCount: 6
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp_1',
    name: 'Pro Wireless ANC Headphone Launch',
    description: 'Promote our upcoming next-gen wireless active noise canceling headphones. Highlight the 60-hour battery life, carbon-composite acoustic drivers, and spatial audio support. Seeking tech-savvy creators for YouTube integration or high-production Instagram Reels.',
    category: 'Consumer Electronics',
    budget: 8500,
    duration: '30 Days',
    deliverables: '1 YouTube video (integration) OR 1 Dedicated Instagram Reel & Story set.',
    requirements: 'Followers > 300K, tech/gaming/lifestyle niche, North American or European audience.',
    status: 'active',
    brandId: 'brand_1',
    brandName: 'Logix Audio',
    createdAt: '2026-06-01'
  },
  {
    id: 'camp_2',
    name: 'Summer Wellness Capsule Drop',
    description: 'Generate brand awareness for our organic botanical supplements. Showcasing daily integration of the energizing powder in morning shakes or wellness drinks. Focus on active lifestyles and mindful routines.',
    category: 'Fitness & Wellness',
    budget: 4000,
    duration: '15 Days',
    deliverables: '2 Instagram Carousel Posts, 1 TikTok video with product placement.',
    requirements: 'Engagement rate > 4%, fitness, cooking, or healthy lifestyle niche. Eco-friendly aesthetic.',
    status: 'active',
    brandId: 'brand_1',
    brandName: 'Natura Bio',
    createdAt: '2026-06-12'
  },
  {
    id: 'camp_3',
    name: 'Urban Eco-Backpack Promo',
    description: 'Showcase our flagship smart eco-backpack made from 100% recycled luxury oceanic plastics. Highlight weatherproofing, TSA-approved laptop protection, and the sleek minimalist design.',
    category: 'Fashion & Lifestyle',
    budget: 3500,
    duration: '21 Days',
    deliverables: '1 Instagram Story Sequence + link, 1 Portfolio static image with custom promo code.',
    requirements: 'Based in major metro areas (NY, London, Tokyo, SF, Paris), travel or product photography background preferred.',
    status: 'paused',
    brandId: 'brand_1',
    brandName: 'EcoSling Co.',
    createdAt: '2026-05-20'
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app_1',
    campaignId: 'camp_1',
    campaignName: 'Pro Wireless ANC Headphone Launch',
    influencerId: 'inf_1',
    influencerName: 'Aria Thorne',
    influencerHandle: '@ariathorne',
    influencerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    proposal: 'I would love to integrate the wireless headphones in my upcoming "What\'s on my tech desk?" video, highlighting the sleek carbon design that matches desk aesthetics perfectly, plus showing a real microphone call sample in noise.',
    status: 'editor_review',
    contentUrl: 'https://assets.mixkit.co/videos/preview/mixkit-headphones-lying-on-a-table-34138-large.mp4',
    submittedAt: '2026-06-18T10:30:00Z',
    updatedAt: '2026-06-20T14:22:00Z'
  },
  {
    id: 'app_2',
    campaignId: 'camp_1',
    campaignName: 'Pro Wireless ANC Headphone Launch',
    influencerId: 'inf_4',
    influencerName: 'David Kumar',
    influencerHandle: '@tech_david',
    influencerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    proposal: 'I will create a 5-minute dedicated high-fidelity video unboxing and audio test contrasting this with premium competitors. My audience is extremely active in audio hardware.',
    status: 'pending',
    submittedAt: '2026-06-21T09:12:00Z',
    updatedAt: '2026-06-21T09:12:00Z'
  },
  {
    id: 'app_3',
    campaignId: 'camp_2',
    campaignName: 'Summer Wellness Capsule Drop',
    influencerId: 'inf_2',
    influencerName: 'Marcus Chen',
    influencerHandle: '@marcus.fitness',
    influencerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    proposal: 'Ready to showcase these supplements in my morning breakfast ritual reels. Perfect fit for my daily lifestyle routines.',
    status: 'approved',
    submittedAt: '2026-06-15T11:00:00Z',
    updatedAt: '2026-06-16T15:30:00Z'
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm_1',
    campaignId: 'camp_1',
    senderId: 'brand_1',
    senderName: 'Logix Audio',
    senderRole: 'brand',
    text: 'Hello Aria! We absolute love your high-production desk setups. We\'d love for you to review our premium carbon-composite headphones.',
    timestamp: '2026-06-16T14:05:00Z'
  },
  {
    id: 'm_2',
    campaignId: 'camp_1',
    senderId: 'inf_1',
    senderName: 'Aria Thorne',
    senderRole: 'influencer',
    text: 'Hi Logix! I\'m highly interested! This fits my upcoming smart workdesk redesign perfectly. Can we finalize a sample unit delivery?',
    timestamp: '2026-06-16T15:20:00Z'
  },
  {
    id: 'm_3',
    campaignId: 'camp_1',
    senderId: 'brand_1',
    senderName: 'Logix Audio',
    senderRole: 'brand',
    text: 'Absolutely, I\'ve triggered the courier. The tracking detail is sent to your dashboard. We can coordinate the video script once you review it.',
    timestamp: '2026-06-17T09:00:00Z'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay_1',
    amount: 8500,
    type: 'escrow',
    status: 'success',
    gateway: 'stripe',
    senderName: 'Logix Audio',
    receiverName: 'SaaS Escrow Contract',
    description: 'Escrow funding for Campaign "Pro Wireless ANC Headphone Launch"',
    date: '2026-06-02',
    invoiceId: 'INV-2026-0041'
  },
  {
    id: 'pay_2',
    amount: 1500,
    type: 'payout',
    status: 'success',
    gateway: 'razorpay',
    senderName: 'SaaS Platform Wallet',
    receiverName: 'Aria Thorne',
    description: 'Sponsor payout for completed Instagram Reels promo series',
    date: '2026-06-10',
    invoiceId: 'INV-2026-0038'
  },
  {
    id: 'pay_3',
    amount: 199,
    type: 'subscription',
    status: 'success',
    gateway: 'stripe',
    senderName: 'Logix Audio',
    receiverName: 'Platform Subscriptions',
    description: 'Enterprise Growth Monthly SaaS Plan',
    date: '2026-06-01',
    invoiceId: 'SUB-2026-0012'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n_1',
    title: 'New Campaign Application',
    description: 'David Kumar (@tech_david) applied to "Pro Wireless ANC Headphone Launch".',
    timestamp: '2026-06-21T09:12:00Z',
    read: false,
    type: 'info'
  },
  {
    id: 'n_2',
    title: 'Draft Approved by Editor',
    description: 'Summer Wellness draft submission by Marcus Chen has been verified and published.',
    timestamp: '2026-06-18T16:00:00Z',
    read: true,
    type: 'success'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_1',
    user: 'System Bot',
    role: 'admin',
    action: 'OAuth Sync Integration',
    details: 'Synced social metadata for influencer Aria Thorne with Instagram Graph API.',
    timestamp: '2026-06-22T04:10:00Z'
  },
  {
    id: 'log_2',
    user: 'Editor Alex',
    role: 'editor',
    action: 'Content Moderation',
    details: 'Transitioned Marcus Chen supplement draft post status to "approved".',
    timestamp: '2026-06-18T15:58:00Z'
  },
  {
    id: 'log_3',
    user: 'Super Admin Sarah',
    role: 'admin',
    action: 'Commission Rate Adjusted',
    details: 'Adjusted general agency platform commission rate to 12.5%.',
    timestamp: '2026-06-15T11:40:00Z'
  }
];
