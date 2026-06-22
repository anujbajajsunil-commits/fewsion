import { useState } from 'react';
import { UserRole, InfluencerProfile, Campaign, Application, Message, PaymentRecord, NotificationItem, AuditLog } from './types';
import { 
  INITIAL_INFLUENCERS, INITIAL_CAMPAIGNS, INITIAL_APPLICATIONS, 
  INITIAL_MESSAGES, INITIAL_PAYMENTS, INITIAL_NOTIFICATIONS, INITIAL_AUDIT_LOGS 
} from './data/mockData';
import LandingPage from './components/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import InfluenceDiscovery from './components/InfluenceDiscovery';
import CampaignManager from './components/CampaignManager';
import AnalyticsPanel from './components/AnalyticsPanel';
import MessagingSys from './components/MessagingSys';
import PaymentModule from './components/PaymentModule';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole>('brand');
  const [activeTab, setActiveTab] = useState('discovery');
  
  // Master Sandbox States representing Database Table instances
  const [influencers, setInfluencers] = useState<InfluencerProfile[]>(INITIAL_INFLUENCERS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Influencer specific wallet dynamics
  const [influencerEarnings, setInfluencerEarnings] = useState<number>(12500);

  const currentUserId = role === 'brand' ? 'brand_1' : 'inf_1';
  const currentUserName = role === 'brand' ? 'Logix Audio' : role === 'admin' ? 'Sarah Admin' : role === 'editor' ? 'Editor Alex' : 'Aria Thorne';

  // --- ACTIONS ---

  // Create Campaign
  const handleAddCampaign = (newCamp: Omit<Campaign, 'id' | 'createdAt'>) => {
    const id = `camp_${campaigns.length + 1}`;
    const date = new Date().toISOString().split('T')[0];
    const created: Campaign = {
      ...newCamp,
      id,
      brandName: 'Logix Audio',
      createdAt: date
    };

    setCampaigns([created, ...campaigns]);

    // Push Notification
    pushNotification(
      'Campaign Brief Deployed',
      `New campaign brief "${created.name}" deployed successfully. Budget escrow funded: $${created.budget.toLocaleString()}.`,
      'success'
    );

    // Push Audit Log
    pushAuditLog(
      'Campaign Brief Created',
      `Deployed creative campaign program "${created.name}" with escrow funding of $${created.budget.toLocaleString()}.`
    );

    // Push Simulated Stripe payment in ledger
    const payId = `pay_${payments.length + 1}`;
    const newPayment: PaymentRecord = {
      id: payId,
      amount: created.budget,
      type: 'escrow',
      status: 'success',
      gateway: 'stripe',
      senderName: 'Logix Audio',
      receiverName: 'SaaS Escrow Custody',
      description: `Escrow prefunding for "${created.name}"`,
      date,
      invoiceId: `INV-2026-00${100 + payments.length}`
    };
    setPayments([newPayment, ...payments]);
  };

  // Modify campaign brief status
  const handleUpdateCampaignStatus = (id: string, status: Campaign['status']) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, status } : c));
    const camp = campaigns.find(c => c.id === id);
    if (!camp) return;

    pushAuditLog(
      'Campaign Status Updated',
      `Adjusted creative program brief "${camp.name}" visibility to: "${status}".`
    );
  };

  // Apply to campaign
  const handleApplyToCampaign = (campaignId: string, proposal: string) => {
    const camp = campaigns.find(c => c.id === campaignId);
    if (!camp) return;

    const id = `app_${applications.length + 1}`;
    const newApp: Application = {
      id,
      campaignId,
      campaignName: camp.name,
      influencerId: 'inf_1',
      influencerName: 'Aria Thorne',
      influencerHandle: '@ariathorne',
      influencerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      proposal,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setApplications([newApp, ...applications]);

    pushNotification(
      'New Sponsorship Pitch Received',
      `Influencer Aria Thorne (@ariathorne) submitted a pitch for "${camp.name}".`,
      'info'
    );

    pushAuditLog(
      'Sponsorship Application Registered',
      `Creator Aria Thorne applied to Campaign "${camp.name}" with proposal pitch.`
    );
  };

  // Content verification approvals chain (Double-Handshake Escrows and payouts system!)
  const handleUpdateApplicationStatus = (id: string, status: Application['status'], feedback?: string) => {
    setApplications(applications.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status,
          feedback: feedback || app.feedback,
          updatedAt: new Date().toISOString()
        };
      }
      return app;
    }));

    const app = applications.find(a => a.id === id);
    if (!app) return;

    pushAuditLog(
      'Approval State Altered',
      `Campaign integration delivery status of "${app.influencerName}" moved to: "${status}".`
    );

    // If editor has approved delivery and marked completed, trigger the payout!
    if (status === 'completed') {
      const targetCamp = campaigns.find(c => c.id === app.campaignId);
      const budget = targetCamp ? targetCamp.budget : 1500;
      const date = new Date().toISOString().split('T')[0];

      // Credit wallet
      setInfluencerEarnings(prev => prev + budget);

      // Create Payment Ledger Record
      const payId = `pay_${payments.length + 1}`;
      const newPayout: PaymentRecord = {
        id: payId,
        amount: budget,
        type: 'payout',
        status: 'success',
        gateway: 'razorpay',
        senderName: 'SaaS Platform Wallet',
        receiverName: app.influencerName,
        description: `Disbursed platform sponsor payout for completed Campaign "${app.campaignName}"`,
        date,
        invoiceId: `INV-2026-00${100 + payments.length}`
      };
      setPayments([newPayout, ...payments]);

      // Fire push notifications
      pushNotification(
        'Content Approved! Payout Released',
        `Sponsor deliverable draft from ${app.influencerName} has been verified as compliant. Payout of $${budget} released to wallet!`,
        'success'
      );

      pushAuditLog(
        'Ledger Custody Disbursed',
        `Released escrow funds block of $${budget.toLocaleString()} to wallet balance of creator ${app.influencerName}.`
      );
    } else if (status === 'revision_requested') {
      pushNotification(
        'Draft Revision Directed',
        `A revision for Campaign "${app.campaignName}" has been directed back to creator ${app.influencerName}.`,
        'warning'
      );
    }
  };

  // Real-time conversation scripts responder timeout simulation
  const handleSendMessage = (text: string, attachmentUrl?: string, attachmentName?: string) => {
    const id = `m_${messages.length + 1}`;
    const timestamp = new Date().toISOString();
    const newMsg: Message = {
      id,
      campaignId: 'camp_1', // default room
      senderId: currentUserId,
      senderName: currentUserName,
      senderRole: role,
      text,
      timestamp,
      attachmentUrl,
      attachmentName
    };

    setMessages([...messages, newMsg]);

    // Push simulated responsive replies to feel immersive
    if (role === 'brand') {
      setTimeout(() => {
        const replyId = `m_${Date.now()}`;
        const autoReply: Message = {
          id: replyId,
          campaignId: 'camp_1',
          senderId: 'inf_1',
          senderName: 'Aria Thorne',
          senderRole: 'influencer',
          text: 'Hi Logix! That scripts adjust and timing constraints look completely fine. I am drafting the Reels storyboard and will upload the video draft soon!',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, autoReply]);
        pushNotification('New Chat Message from Creator', 'Aria Thorne responded: "I am drafting the storyboard..."', 'info');
      }, 1500);
    } else if (role === 'influencer') {
      setTimeout(() => {
        const replyId = `m_${Date.now()}`;
        const autoReply: Message = {
          id: replyId,
          campaignId: 'camp_1',
          senderId: 'brand_1',
          senderName: 'Logix Audio',
          senderRole: 'brand',
          text: 'Great update! We reviewed your unboxing storyboards and they look excellent. Once the video file draft is uploaded, Alex our platform Editor will run check-offs and clear the holding escrow payout.',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, autoReply]);
        pushNotification('New Chat Message from Brand', 'Logix Audio responded: "We reviewed your unboxing storyboards..."', 'info');
      }, 1500);
    }
  };

  // Withdraw requests from wallet holdings
  const handleTriggerWithdrawal = (amount: number) => {
    if (amount <= 0 || amount > influencerEarnings) return;

    setInfluencerEarnings(prev => prev - amount);
    
    // Push checkout log to platform statements
    const payId = `pay_${payments.length + 1}`;
    const date = new Date().toISOString().split('T')[0];
    const newPayout: PaymentRecord = {
      id: payId,
      amount,
      type: 'payout',
      status: 'success',
      gateway: 'stripe',
      senderName: 'Aria Thorne',
      receiverName: 'Personal Bank Account Network',
      description: `Withdrew earnings wallet holdings block to external ledger bank accounts`,
      date,
      invoiceId: `INV-2026-00${100 + payments.length}`
    };

    setPayments([newPayout, ...payments]);

    pushAuditLog(
      'Wallet holdings Cash-Out Authorized',
      `Creator Aria Thorne cashed out earnings wallet funds totaling $${amount.toLocaleString()}.`
    );
  };

  // Mark alerts as read
  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Clear system logs (Admin feature)
  const handleClearLogs = () => {
    setAuditLogs([]);
  };

  // Helper utils
  const pushNotification = (title: string, description: string, type: NotificationItem['type'] = 'info') => {
    const fresh: NotificationItem = {
      id: `n_${Date.now()}`,
      title,
      description,
      timestamp: new Date().toISOString(),
      read: false,
      type
    };
    setNotifications(prev => [fresh, ...prev]);
  };

  const pushAuditLog = (action: string, details: string) => {
    const freshLog: AuditLog = {
      id: `log_${Date.now()}`,
      user: currentUserName,
      role,
      action,
      details,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [freshLog, ...prev]);
  };

  const inviteInfluencerToCampaign = (influencerId: string, campaignId: string) => {
    const inf = influencers.find(i => i.id === influencerId);
    const camp = campaigns.find(c => c.id === campaignId);
    if (!inf || !camp) return;

    // Simulate sending brief invitation
    pushNotification(
      'Campaign Invitation Sent',
      `Brand Logix Audio invited ${inf.name} (${inf.handle}) to collaborate on brief: "${camp.name}".`,
      'success'
    );

    pushAuditLog(
      'Outreach Invitation Issued',
      `Sent invitations campaign brief "${camp.name}" directly to creator ${inf.name}.`
    );
  };

  // Portal routing
  if (!isLoggedIn) {
    return <LandingPage onStartApp={() => setIsLoggedIn(true)} />;
  }

  // Active modular screens layout toggler
  const renderTabContent = () => {
    // Force Editors only access to the workspace briefly
    if (role === 'editor') {
      return (
        <CampaignManager 
          role={role}
          currentUserId={currentUserId}
          campaigns={campaigns}
          applications={applications}
          onAddCampaign={handleAddCampaign}
          onUpdateCampaignStatus={handleUpdateCampaignStatus}
          onApplyToCampaign={handleApplyToCampaign}
          onUpdateApplicationStatus={handleUpdateApplicationStatus}
        />
      );
    }

    switch (activeTab) {
      case 'campaigns':
        return (
          <CampaignManager 
            role={role}
            currentUserId={currentUserId}
            campaigns={campaigns}
            applications={applications}
            onAddCampaign={handleAddCampaign}
            onUpdateCampaignStatus={handleUpdateCampaignStatus}
            onApplyToCampaign={handleApplyToCampaign}
            onUpdateApplicationStatus={handleUpdateApplicationStatus}
          />
        );
      case 'analytics':
        return <AnalyticsPanel role={role} />;
      case 'messaging':
        return (
          <MessagingSys 
            role={role}
            currentUserId={currentUserId}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        );
      case 'payments':
        return (
          <PaymentModule 
            role={role}
            payments={payments}
            influencerEarnings={influencerEarnings}
            onTriggerWithdrawal={handleTriggerWithdrawal}
          />
        );
      default:
        return (
          <InfluenceDiscovery 
            influencers={influencers}
            campaigns={campaigns}
            onInviteInfluencer={inviteInfluencerToCampaign}
          />
        );
    }
  };

  return (
    <DashboardLayout
      role={role}
      onRoleChange={(newRole) => {
        setRole(newRole);
        pushAuditLog('Workspace Changed', `Simulation context shifted perspective to: "${newRole}".`);
        // If editors switch, force workspace view
        if (newRole === 'editor') {
          setActiveTab('campaigns');
        }
      }}
      onLogout={() => {
        setIsLoggedIn(false);
        setRole('brand');
        setActiveTab('discovery');
      }}
      notifications={notifications}
      onMarkNotificationAsRead={handleMarkNotificationAsRead}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      auditLogs={auditLogs}
      onClearLogs={handleClearLogs}
    >
      <div className="animate-fade-in duration-300">
        {renderTabContent()}
      </div>
    </DashboardLayout>
  );
}
