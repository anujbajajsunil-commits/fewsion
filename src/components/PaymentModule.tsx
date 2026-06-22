import React, { useState } from 'react';
import { 
  DollarSign, CreditCard, ArrowUpRight, ArrowDownLeft, ShieldCheck, 
  HelpCircle, Receipt, Download, FileText, Sparkles, Check, CheckCircle2, RefreshCw 
} from 'lucide-react';
import { PaymentRecord, UserRole } from '../types';

interface PaymentModuleProps {
  role: UserRole;
  payments: PaymentRecord[];
  influencerEarnings: number;
  onTriggerWithdrawal: (amount: number) => void;
}

export default function PaymentModule({ 
  role, 
  payments, 
  influencerEarnings, 
  onTriggerWithdrawal 
}: PaymentModuleProps) {
  const [withdrawAmount, setWithdrawAmount] = useState<number>(1500);
  const [payoutRequested, setPayoutRequested] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<'stripe' | 'razorpay'>('stripe');
  const [selectedInvoice, setSelectedInvoice] = useState<PaymentRecord | null>(null);

  // Stripe card variables
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [gatewayStatus, setGatewayStatus] = useState<string | null>(null);
  const [verifyingPayment, setVerifyingPayment] = useState(false);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0 || withdrawAmount > influencerEarnings) return;

    onTriggerWithdrawal(withdrawAmount);
    setPayoutRequested(true);
    setTimeout(() => {
      setPayoutRequested(false);
    }, 4000);
  };

  const handleSimulatePaymentSignature = async () => {
    setVerifyingPayment(true);
    setGatewayStatus('Contacting settlement terminal...');

    try {
      const res = await fetch('/api/payments/verify-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId: `PAY-${Math.floor(Math.random() * 100000)}`,
          gateway: selectedGateway,
          signature: 'sha256_mock_signature_hex_code'
        })
      });

      const data = await res.json();
      setTimeout(() => {
        setGatewayStatus(`[SECURITY VERIFIED] Signature verified! Webhook authorization recorded. Ledger ID: ${data.transactionDetails.ledgerAuditId}`);
        setVerifyingPayment(false);
      }, 1500);

    } catch (e: any) {
      setGatewayStatus('Communication error. Safe offline routing validated.');
      setVerifyingPayment(false);
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Top Banner */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Financial Billing Ledger</h2>
        <p className="text-sm text-gray-400 mt-1">
          Review secure platform escrow ledgers, verify automated webhook signatures, download invoices, or trigger instant earnings payouts.
        </p>
      </div>

      {/* Primary Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Role specifics (Payout for influencer, Billing for Brand) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* INFLUENCER: WALLET AND CASH OUT */}
          {role === 'influencer' && (
            <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-6 relative overflow-hidden glow-purple">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#735DD7]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#AC71E0]" />
                <h3 className="text-base font-bold text-white">Earnings Wallet</h3>
              </div>

              <div className="space-y-1">
                <span className="text-gray-500 font-mono text-[10px] uppercase font-bold tracking-wider">Withdrawable Balance</span>
                <div className="text-4xl font-black text-white font-mono">${influencerEarnings.toLocaleString()}</div>
                <div className="text-[10px] text-emerald-400 font-mono">▲ 100% Tax compliant & cleared for withdrawal</div>
              </div>

              {/* Cash out form */}
              <form onSubmit={handleWithdraw} className="space-y-4 pt-4 border-t border-white/5">
                <div className="space-y-1.5 text-xs">
                  <label className="text-gray-400 block font-medium">Specify Payout Sum (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="number" 
                      min="50"
                      max={influencerEarnings}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                      className="w-full pl-9 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={influencerEarnings <= 0 || withdrawAmount > influencerEarnings}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-[#735DD7] hover:opacity-90 transition rounded-lg text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <ArrowUpRight className="w-4 h-4" /> Trigger Payout (Razorpay/Stripe)
                </button>
              </form>

              {/* Payout feedback banner */}
              {payoutRequested && (
                <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/20 rounded-lg text-emerald-300 text-xs font-mono animate-bounce mt-4">
                  <span className="font-bold">SUCCESS:</span> Withdrawal requested successfully. Escrow verification logged. Funds should clear within 20 mins.
                </div>
              )}
            </div>
          )}

          {/* BRAND: SECURE PREFUNDING SYSTEM */}
          {(role === 'brand' || role === 'admin') && (
            <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-6 relative overflow-hidden glow-purple">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#735DD7]/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#AC71E0]" />
                <h3 className="text-base font-bold text-white">Payment Infrastructure Mocks</h3>
              </div>

              {/* Gateway Switching */}
              <div className="space-y-2 text-xs">
                <label className="text-gray-400 block font-medium">Select Gateway Endpoint</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setSelectedGateway('stripe')}
                    className={`p-3 rounded-lg border text-left flex justify-between items-center transition cursor-pointer ${selectedGateway === 'stripe' ? 'bg-[#735DD7]/15 border-[#735DD7]/40 text-white' : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'}`}
                  >
                    <div>
                      <span className="font-extrabold block">Stripe Gateway</span>
                      <span className="text-[10px] text-gray-500">Global credit escrows</span>
                    </div>
                    {selectedGateway === 'stripe' && <Check className="w-4 h-4 text-[#AC71E0]" />}
                  </button>

                  <button 
                    onClick={() => setSelectedGateway('razorpay')}
                    className={`p-3 rounded-lg border text-left flex justify-between items-center transition cursor-pointer ${selectedGateway === 'razorpay' ? 'bg-[#735DD7]/15 border-[#735DD7]/40 text-white' : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'}`}
                  >
                    <div>
                      <span className="font-extrabold block">Razorpay Core</span>
                      <span className="text-[10px] text-gray-500">APIs & native links</span>
                    </div>
                    {selectedGateway === 'razorpay' && <Check className="w-4 h-4 text-[#AC71E0]" />}
                  </button>
                </div>
              </div>

              {/* Simulated webhook verifications */}
              <div className="space-y-4 pt-4 border-t border-white/5 text-xs">
                <div>
                  <span className="text-gray-500 block uppercase font-mono tracking-wider font-bold text-[9px] mb-2">Simulated Signature Authorization</span>
                  <div className="p-3 bg-black/40 border border-white/5 rounded-lg flex items-center justify-between text-xs font-mono mb-3">
                    <span className="text-gray-400">Card details:</span>
                    <span>{cardNumber}</span>
                  </div>
                  <button 
                    onClick={handleSimulatePaymentSignature}
                    disabled={verifyingPayment}
                    className="w-full py-2 bg-gradient-to-r from-[#735DD7] via-[#5047b5] to-[#ac71e0] font-bold text-white text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${verifyingPayment ? 'animate-spin' : ''}`} />
                    <span>Run SECURE Webhook Verification</span>
                  </button>
                </div>

                {gatewayStatus && (
                  <div className="p-3.5 bg-black/60 border border-[#735DD7]/30 rounded-lg text-gray-300 font-mono text-[10px] whitespace-pre-wrap leading-relaxed">
                    {gatewayStatus}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* GENERAL INFOBOX */}
          <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase font-mono tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#AC71E0]" /> Escrow Protection Rules
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              We operate an optimized double-handshake fund locking scheme which guarantees influencer completion before payouts are disbursed and verifies brand funding prior to deliverables startup.
            </p>
          </div>
        </div>

        {/* Right column: General Transaction History List */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-xl border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Receipt className="w-5 h-5 text-[#AC71E0]" /> Platform Ledger Statements
            </h3>
            <span className="text-[10px] font-mono text-gray-500">Real-time synchronizing</span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {payments.map((pay) => (
              <div 
                key={pay.id} 
                className="p-3.5 bg-black/40 border border-white/5 rounded-xl hover:border-white/10 transition flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  {/* Payout vs Escrow graphic badge */}
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs shrink-0 ${pay.type === 'payout' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#735DD7]/10 text-[#AC71E0]'}`}>
                    {pay.type === 'payout' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>

                  <div>
                    <h4 className="font-extrabold text-white text-xs">{pay.description}</h4>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500 font-mono">
                      <span>Gateway: <span className="uppercase text-gray-300 font-semibold">{pay.gateway}</span></span>
                      <span>·</span>
                      <span>ID: <span>{pay.invoiceId}</span></span>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-1 shrink-0">
                  <div className="font-extrabold text-white font-mono">${pay.amount.toLocaleString()}</div>
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <button 
                      onClick={() => setSelectedInvoice(pay)}
                      className="text-[#AC71E0] hover:underline font-bold text-[10px]"
                    >
                      Audit Invoice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- INVOICE VIEW DETAIL POPUP SHEET --- */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] rounded-2xl border border-white/10 max-w-lg w-full overflow-hidden text-left shadow-2xl relative glow-purple">
            
            {/* Header branding */}
            <div className="p-6 border-b border-white/5 bg-black/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-[#735DD7] flex items-center justify-center font-black text-xs text-white">F</div>
                <span className="font-extrabold text-sm tracking-tight text-white">FEWSION PLATFORM STATEMENT</span>
              </div>
              <button 
                onClick={() => setSelectedInvoice(null)}
                className="p-1 px-2.5 rounded bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white transition"
              >
                Close Statement
              </button>
            </div>

            {/* Statement details body */}
            <div className="p-6 space-y-6 text-xs">
              
              {/* Box status */}
              <div className="p-4 bg-emerald-400/5 border border-emerald-400/10 rounded-xl flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-gray-500 text-[9px] font-mono uppercase font-bold block">Status flag</span>
                  <span className="text-emerald-400 font-extrabold font-mono text-sm leading-none flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> SETTLED VERIFIED
                  </span>
                </div>
                <div className="text-right space-y-1">
                  <span className="text-gray-500 text-[9px] font-mono uppercase font-bold block">Invoice Date</span>
                  <span className="text-white font-semibold font-mono">{selectedInvoice.date}</span>
                </div>
              </div>

              {/* Transactions particulars */}
              <div className="space-y-3 font-mono">
                <div className="flex justify-between border-b border-white/5 pb-2 text-[10px] text-gray-500">
                  <span>Ledger Particulars</span>
                  <span>Amount</span>
                </div>
                
                <div className="flex justify-between font-semibold text-white">
                  <span>{selectedInvoice.description}</span>
                  <span>${selectedInvoice.amount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between border-b border-white/5 pb-2 text-gray-400 text-[11px]">
                  <span>Sender Account:</span>
                  <span>{selectedInvoice.senderName}</span>
                </div>

                <div className="flex justify-between text-gray-400 text-[11px]">
                  <span>Receiver Settlement:</span>
                  <span>{selectedInvoice.receiverName}</span>
                </div>

                <div className="flex justify-between border-t border-dashed border-white/10 pt-3 text-sm font-bold text-white">
                  <span>Total Settled Outlay</span>
                  <span className="text-emerald-400">${selectedInvoice.amount.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Security signature audit details */}
              <div className="p-3 bg-black/60 border border-white/5 rounded-lg space-y-1 font-mono text-[9px] text-gray-500 leading-relaxed text-left">
                <p><span className="text-gray-400 font-semibold uppercase">Security ID:</span> {selectedInvoice.id}</p>
                <p><span className="text-gray-400 font-semibold uppercase">Gateway Node:</span> {selectedInvoice.gateway} / TLS_1.3_Ver</p>
                <p className="truncate"><span className="text-gray-400 font-semibold uppercase">Hash:</span> sha256_mock_hash_{selectedInvoice.invoiceId}_10bf781xcc</p>
              </div>

            </div>

            {/* Footer with fake downloads */}
            <div className="p-4 bg-black/40 border-t border-white/5 flex gap-2">
              <button 
                onClick={() => window.print()}
                className="flex-1 py-2 bg-white/5 border border-white/10 text-white rounded-lg font-semibold hover:bg-white/10 transition flex items-center justify-center gap-1.5 cursor-pointer text-xs"
              >
                <Download className="w-3.5 h-3.5" /> Print PDF statement
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
