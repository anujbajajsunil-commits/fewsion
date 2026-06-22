export type UserRole = 'influencer' | 'brand' | 'editor' | 'admin';

export interface InfluencerProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  niche: string;
  location: string;
  followers: number;
  engagementRate: number;
  reach: number;
  earnings: number;
  bio: string;
  platforms: ('instagram' | 'youtube' | 'facebook' | 'linkedin' | 'x')[];
  rating: number;
  mediaKitUrl?: string;
  portfolio: PortfolioItem[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  views: number;
  likes: number;
}

export interface BrandProfile {
  id: string;
  name: string;
  industry: string;
  avatar: string;
  verified: boolean;
  website: string;
  budgetSpent: number;
  campaignsCount: number;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  category: string;
  budget: number;
  duration: string;
  deliverables: string;
  requirements: string;
  status: 'draft' | 'active' | 'paused' | 'closed';
  brandId: string;
  brandName?: string;
  createdAt: string;
}

export interface Application {
  id: string;
  campaignId: string;
  campaignName: string;
  influencerId: string;
  influencerName: string;
  influencerHandle: string;
  influencerAvatar: string;
  proposal: string;
  status: 'pending' | 'editor_review' | 'revision_requested' | 'approved' | 'rejected' | 'completed';
  contentUrl?: string; // URL of submitted draft post
  feedback?: string;
  submittedAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  campaignId?: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  attachmentUrl?: string;
  attachmentName?: string;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  type: 'escrow' | 'payout' | 'subscription';
  status: 'pending' | 'success' | 'failed';
  gateway: 'stripe' | 'razorpay';
  senderName: string;
  receiverName: string;
  description: string;
  date: string;
  invoiceId: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
  actionUrl?: string;
}

export interface AuditLog {
  id: string;
  user: string;
  role: UserRole;
  action: string;
  details: string;
  timestamp: string;
}
