/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CreditCard,
  User,
  Zap,
  Bookmark,
  CalendarCheck,
  Award,
  BookOpen,
  PieChart,
  Settings,
  ShieldCheck,
  CheckCircle,
  Clock,
  HelpCircle,
  Download,
  AlertTriangle,
  ChevronRight,
  QrCode,
  FileText,
  Vote,
  ExternalLink,
  MessageSquare,
  LogOut
} from 'lucide-react';
import {
  Member,
  Invoice,
  Event,
  EventRegistration,
  Certificate,
  Document,
  Poll,
  HelpdeskTicket
} from '../types';
import { TranslationSet } from '../translations';

interface MemberPortalProps {
  t: TranslationSet;
  lang: string;
  themeStyle: any;
  themeMode?: 'light' | 'dark';
  currentMember: Member;
  invoices: Invoice[];
  events: Event[];
  registrations: EventRegistration[];
  certificates: Certificate[];
  documents: Document[];
  polls: Poll[];
  tickets: HelpdeskTicket[];
  onUpdateMember: (updatedMemberFields: Partial<Member>) => void;
  onPayInvoice: (invoiceId: string, method: string, proofUrl?: string) => void;
  onApprovePayment: (invoiceId: string) => void;
  onVote: (pollId: string, optionId: string) => void;
  onSubmitTicket: (subject: string, message: string, category: string) => void;
  onTriggerEventReview: (registrationId: string) => void;
  onLogOut: () => void;
}

export default function MemberPortal({
  t,
  lang,
  themeStyle,
  themeMode = 'light',
  currentMember,
  invoices,
  events,
  registrations,
  certificates,
  documents,
  polls,
  tickets,
  onUpdateMember,
  onPayInvoice,
  onApprovePayment,
  onVote,
  onSubmitTicket,
  onTriggerEventReview,
  onLogOut
}: MemberPortalProps) {
  const [activeMenu, setActiveMenu] = useState<'dashboard' | 'card' | 'invoices' | 'events' | 'certificates' | 'documents' | 'voting' | 'helpdesk' | 'profile'>('dashboard');

  // Dynamic accent helper to extract correct tailwind colors
  const getColorTheme = (accentClass: string) => {
    const lowercase = (accentClass || '').toLowerCase();
    let name = 'amber';
    if (lowercase.includes('emerald')) name = 'emerald';
    else if (lowercase.includes('orange')) name = 'orange';
    else if (lowercase.includes('pink')) name = 'pink';
    else if (lowercase.includes('sky')) name = 'sky';
    else if (lowercase.includes('yellow')) name = 'yellow';
    else if (lowercase.includes('green') || lowercase.includes('22c55e')) name = 'emerald';
    else if (lowercase.includes('red') || lowercase.includes('7f1d1d')) name = 'red';
    else if (lowercase.includes('blue') || lowercase.includes('0369a1')) name = 'blue';
    else if (lowercase.includes('indigo')) name = 'indigo';

    const themeBgMap: Record<string, string> = {
      amber: 'bg-amber-500',
      emerald: 'bg-emerald-500',
      orange: 'bg-orange-500',
      pink: 'bg-pink-500',
      sky: 'bg-sky-500',
      yellow: 'bg-yellow-500',
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      indigo: 'bg-indigo-500'
    };
    
    const themeBgHoverMap: Record<string, string> = {
      amber: 'hover:bg-amber-600',
      emerald: 'hover:bg-emerald-600',
      orange: 'hover:bg-orange-600',
      pink: 'hover:bg-pink-600',
      sky: 'hover:bg-sky-600',
      yellow: 'hover:bg-yellow-600',
      red: 'hover:bg-red-600',
      blue: 'hover:bg-blue-600',
      indigo: 'hover:bg-indigo-600'
    };

    const themeTextMap: Record<string, string> = {
      amber: 'text-amber-500',
      emerald: 'text-emerald-500',
      orange: 'text-orange-500',
      pink: 'text-pink-500',
      sky: 'text-sky-500',
      yellow: 'text-yellow-500',
      red: 'text-red-500',
      blue: 'text-blue-500',
      indigo: 'text-indigo-500'
    };

    const themeTextHoverMap: Record<string, string> = {
      amber: 'hover:text-amber-600',
      emerald: 'hover:text-emerald-600',
      orange: 'hover:text-orange-600',
      pink: 'hover:text-pink-600',
      sky: 'hover:text-sky-600',
      yellow: 'hover:text-yellow-600',
      red: 'hover:text-red-600',
      blue: 'hover:text-blue-600',
      indigo: 'hover:text-indigo-600'
    };

    const themeBorderMap: Record<string, string> = {
      amber: 'border-amber-500',
      emerald: 'border-emerald-500',
      orange: 'border-orange-500',
      pink: 'border-pink-500',
      sky: 'border-sky-500',
      yellow: 'border-yellow-500',
      red: 'border-red-500',
      blue: 'border-blue-500',
      indigo: 'border-indigo-500'
    };

    const themeFocusBorderMap: Record<string, string> = {
      amber: 'focus:border-amber-500 focus:ring-amber-500/20',
      emerald: 'focus:border-emerald-500 focus:ring-emerald-500/20',
      orange: 'focus:border-orange-500 focus:ring-orange-500/20',
      pink: 'focus:border-pink-500 focus:ring-pink-500/20',
      sky: 'focus:border-sky-500 focus:ring-sky-500/20',
      yellow: 'focus:border-yellow-500 focus:ring-yellow-500/20',
      red: 'focus:border-red-500 focus:ring-red-500/20',
      blue: 'focus:border-blue-500 focus:ring-blue-500/20',
      indigo: 'focus:border-indigo-500 focus:ring-indigo-500/20'
    };

    const themeBadgeMap: Record<string, string> = {
      amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
      emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
      orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20',
      pink: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20',
      sky: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20',
      yellow: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20',
      red: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
      blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
      indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
    };

    const themeTextDarkMap: Record<string, string> = {
      amber: 'text-amber-700 dark:text-amber-400',
      emerald: 'text-emerald-700 dark:text-emerald-400',
      orange: 'text-orange-700 dark:text-orange-400',
      pink: 'text-pink-700 dark:text-pink-400',
      sky: 'text-sky-700 dark:text-sky-400',
      yellow: 'text-yellow-700 dark:text-yellow-400',
      red: 'text-red-700 dark:text-red-400',
      blue: 'text-blue-700 dark:text-blue-400',
      indigo: 'text-indigo-700 dark:text-indigo-400'
    };

    const themeLightBgMap: Record<string, string> = {
      amber: 'bg-amber-500/10',
      emerald: 'bg-emerald-500/10',
      orange: 'bg-orange-500/10',
      pink: 'bg-pink-500/10',
      sky: 'bg-sky-500/10',
      yellow: 'bg-yellow-500/10',
      red: 'bg-red-500/10',
      blue: 'bg-blue-500/10',
      indigo: 'bg-indigo-500/10'
    };

    const themeCardBorderMap: Record<string, string> = {
      amber: 'border-amber-500/25',
      emerald: 'border-emerald-500/25',
      orange: 'border-orange-500/25',
      pink: 'border-pink-500/25',
      sky: 'border-sky-500/25',
      yellow: 'border-yellow-500/25',
      red: 'border-red-500/25',
      blue: 'border-blue-500/25',
      indigo: 'border-indigo-500/25'
    };

    const themeCardBgBlurMap: Record<string, string> = {
      amber: 'bg-amber-500/5',
      emerald: 'bg-emerald-500/5',
      orange: 'bg-orange-500/5',
      pink: 'bg-pink-500/5',
      sky: 'bg-sky-500/5',
      yellow: 'bg-yellow-500/5',
      red: 'bg-red-500/5',
      blue: 'bg-blue-500/5',
      indigo: 'bg-indigo-500/5'
    };

    const themeCardTextMap: Record<string, string> = {
      amber: 'text-amber-500',
      emerald: 'text-emerald-500',
      orange: 'text-orange-500',
      pink: 'text-pink-500',
      sky: 'text-sky-500',
      yellow: 'text-yellow-500',
      red: 'text-red-500',
      blue: 'text-blue-500',
      indigo: 'text-indigo-500'
    };

    const themeCardTextLightMap: Record<string, string> = {
      amber: 'text-amber-300',
      emerald: 'text-emerald-300',
      orange: 'text-orange-300',
      pink: 'text-pink-300',
      sky: 'text-sky-300',
      yellow: 'text-yellow-300',
      red: 'text-red-300',
      blue: 'text-blue-300',
      indigo: 'text-indigo-300'
    };

    const themeCardTextLightestMap: Record<string, string> = {
      amber: 'text-amber-100',
      emerald: 'text-emerald-100',
      orange: 'text-orange-100',
      pink: 'text-pink-100',
      sky: 'text-sky-100',
      yellow: 'text-yellow-100',
      red: 'text-red-100',
      blue: 'text-blue-100',
      indigo: 'text-indigo-100'
    };

    const themeAccentMap: Record<string, string> = {
      amber: 'accent-amber-500',
      emerald: 'accent-emerald-500',
      orange: 'accent-orange-500',
      pink: 'accent-pink-500',
      sky: 'accent-sky-500',
      yellow: 'accent-yellow-500',
      red: 'accent-red-500',
      blue: 'accent-blue-500',
      indigo: 'accent-indigo-500'
    };

    const themeCardLightBgGradientMap: Record<string, string> = {
      amber: 'bg-gradient-to-br from-amber-50/90 via-orange-50/65 to-amber-100/50 text-slate-900 border-amber-300 shadow-md',
      emerald: 'bg-gradient-to-br from-emerald-50/90 via-teal-50/65 to-emerald-100/50 text-slate-900 border-emerald-300 shadow-md',
      orange: 'bg-gradient-to-br from-orange-50/90 via-amber-50/65 to-orange-100/50 text-slate-900 border-orange-300 shadow-md',
      pink: 'bg-gradient-to-br from-pink-50/90 via-rose-50/65 to-pink-100/50 text-slate-900 border-pink-300 shadow-md',
      sky: 'bg-gradient-to-br from-sky-50/90 via-cyan-50/65 to-sky-100/50 text-slate-900 border-sky-300 shadow-md',
      yellow: 'bg-gradient-to-br from-yellow-50/90 via-amber-50/65 to-yellow-100/50 text-slate-900 border-yellow-300 shadow-md',
      red: 'bg-gradient-to-br from-red-50/90 via-orange-50/65 to-red-100/50 text-slate-900 border-red-300 shadow-md',
      blue: 'bg-gradient-to-br from-blue-50/90 via-sky-50/65 to-blue-100/50 text-slate-900 border-blue-300 shadow-md',
      indigo: 'bg-gradient-to-br from-indigo-50/90 via-blue-50/65 to-indigo-100/50 text-slate-900 border-indigo-300 shadow-md'
    };

    return {
      name,
      bg: themeBgMap[name] || 'bg-amber-500',
      bgHover: themeBgHoverMap[name] || 'hover:bg-amber-600',
      text: themeTextMap[name] || 'text-amber-500',
      textDark: themeTextDarkMap[name] || 'text-amber-700 dark:text-amber-400',
      textHover: themeTextHoverMap[name] || 'hover:text-amber-600',
      border: themeBorderMap[name] || 'border-amber-500',
      borderFocus: themeFocusBorderMap[name] || 'focus:border-amber-500 focus:ring-amber-500/20',
      lightBg: themeLightBgMap[name] || 'bg-amber-500/10',
      badge: themeBadgeMap[name] || 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
      cardBorder: themeCardBorderMap[name] || 'border-amber-500/25',
      cardBgBlur: themeCardBgBlurMap[name] || 'bg-amber-500/5',
      cardText: themeCardTextMap[name] || 'text-amber-500',
      cardTextLight: themeCardTextLightMap[name] || 'text-amber-300',
      cardTextLightest: themeCardTextLightestMap[name] || 'text-amber-100',
      accent: themeAccentMap[name] || 'accent-amber-500',
      cardLightBgGradient: themeCardLightBgGradientMap[name] || themeCardLightBgGradientMap.amber
    };
  };

  const colorTheme = getColorTheme(themeStyle?.accent);
  
  // Profile edit fields state
  const [profileForm, setProfileForm] = useState({
    name: currentMember.name || '',
    email: currentMember.email || '',
    phone: currentMember.phone || '',
    avatarUrl: currentMember.avatarUrl || '',
    password: currentMember.password || '',
    profession: currentMember.profession || '',
    organizationName: currentMember.organizationName || '',
    city: currentMember.city || '',
    bio: currentMember.bio || '',
    website: currentMember.website || '',
    linkedinUrl: currentMember.linkedinUrl || '',
    showEmail: currentMember.showEmail,
    showPhone: currentMember.showPhone
  });

  React.useEffect(() => {
    setProfileForm({
      name: currentMember.name || '',
      email: currentMember.email || '',
      phone: currentMember.phone || '',
      avatarUrl: currentMember.avatarUrl || '',
      password: currentMember.password || '',
      profession: currentMember.profession || '',
      organizationName: currentMember.organizationName || '',
      city: currentMember.city || '',
      bio: currentMember.bio || '',
      website: currentMember.website || '',
      linkedinUrl: currentMember.linkedinUrl || '',
      showEmail: currentMember.showEmail,
      showPhone: currentMember.showPhone
    });
  }, [currentMember]);

  const [profileSuccess, setProfileSuccess] = useState(false);

  // Invoice payment fields
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('Virtual Account BCA');
  const [proofFileMock, setProofFileMock] = useState('bukti_transfer_APN_INV.png');
  const [paymentDoneMsg, setPaymentDoneMsg] = useState(false);
  const [copied, setCopied] = useState(false);

  // Feedback states
  const [activeFeedbackRegId, setActiveFeedbackRegId] = useState<string | null>(null);
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState<string>('');

  // Helpdesk fields
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Sertifikat');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState(false);

  // Local state for polling votes
  const [selectedVotes, setSelectedVotes] = useState<Record<string, string>>({});

  // Calculations
  const memberInvoices = invoices.filter(inv => inv.userEmail === currentMember.email);
  const unpaidInvoices = memberInvoices.filter(inv => inv.status === 'unpaid' || inv.status === 'overdue');
  const finishedInvoices = memberInvoices.filter(inv => inv.status === 'paid');
  const memberRegs = registrations.filter(reg => reg.userEmail === currentMember.email);
  const memberCerts = certificates.filter(cert => cert.memberEmail === currentMember.email);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateMember(profileForm);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handlePayActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;
    onPayInvoice(selectedInvoice.id, paymentMethod, paymentMethod === 'Bank Transfer Manual' ? `https://images.unsplash.com/photo-1554415707-6e8cfc93fe23` : undefined);
    setPaymentDoneMsg(true);
    setTimeout(() => {
      setPaymentDoneMsg(false);
      setSelectedInvoice(null);
    }, 3500);
  };

  const handleHelpdeskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) {
      alert('Tolong lengkapi subjek dan pesan aduan Anda.');
      return;
    }
    onSubmitTicket(ticketSubject, ticketMessage, ticketCategory);
    setTicketSuccess(true);
    setTicketSubject('');
    setTicketMessage('');
    setTimeout(() => setTicketSuccess(false), 3500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1 space-y-6">
        <div className={`${
          themeMode === 'light'
            ? 'bg-white text-slate-800 border-slate-200/80 shadow-xs'
            : 'bg-slate-900 text-white border-slate-800 shadow-md'
        } rounded-2xl p-6 text-center space-y-4 border`}>
          <div className="relative inline-block">
            <div className={`w-16 h-16 rounded-full ${colorTheme.lightBg} ${colorTheme.text} border border-${colorTheme.name}-500/30 flex items-center justify-center text-2xl font-black mx-auto overflow-hidden`}>
              {currentMember.name.split(' ').map(n=>n[0]).join('')}
            </div>
            {currentMember.status === 'active' || currentMember.status === 'lifetime' ? (
              <span className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 px-1.5 rounded-full text-[8px] font-black border border-slate-950">
                ACTIVE
              </span>
            ) : null}
          </div>

          <div>
            <h3 className={`font-extrabold text-sm ${themeMode === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>{currentMember.name}</h3>
            <p className={`text-[10px] font-bold ${colorTheme.text} font-mono tracking-wider mt-1`}>{currentMember.memberNumber}</p>
            <p className={`text-[10px] ${themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'} font-semibold mt-0.5`}>{currentMember.profession} · {currentMember.organizationName}</p>
          </div>

          <div className={`space-y-1 pt-3 border-t ${
            themeMode === 'light' ? 'border-slate-100 text-slate-500' : 'border-slate-800/80 text-slate-400'
          } text-[10px] font-semibold text-left`}>
            <div>📍 DOMISILI: <span className={themeMode === 'light' ? 'text-slate-700' : 'text-slate-200'}>{currentMember.city}, Indonesia</span></div>
            <div>💼 LINGKUP: <span className={themeMode === 'light' ? 'text-slate-700' : 'text-slate-200'}>{currentMember.industry}</span></div>
            <div>⭐ LENCANA: <span className={`${colorTheme.text} uppercase font-black`}>{currentMember.badge || 'Professional Member'}</span></div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className={`border rounded-2xl p-4 flex flex-col gap-1 shadow-sm text-xs font-bold transition-colors duration-200 ${
          themeMode === 'light'
            ? 'bg-white text-slate-800 border-slate-200'
            : 'bg-[#0c1222]/60 border-slate-800 text-slate-200'
        }`}>
          {[
            { id: 'dashboard', label: 'Ringkasan Portal', icon: PieChart },
            { id: 'card', label: 'Digital Member Card', icon: CreditCard },
            { id: 'invoices', label: 'Status Iuran & Invoice', icon: QrCode },
            { id: 'events', label: 'Riwayat Event Saya', icon: CalendarCheck },
            { id: 'certificates', label: 'Sertifikat Kompetensi', icon: Award },
            { id: 'documents', label: 'Library SOP & AD/ART', icon: BookOpen },
            { id: 'voting', label: 'Voting & Election', icon: Vote },
            { id: 'helpdesk', label: 'Helpdesk Support', icon: HelpCircle },
            { id: 'profile', label: 'Sunting Setelan Profil', icon: Settings }
          ].map(btn => {
            const Icon = btn.icon;
            return (
              <button
                key={btn.id}
                onClick={() => {
                  setActiveMenu(btn.id as any);
                  setSelectedInvoice(null);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                  activeMenu === btn.id
                    ? `${colorTheme.bg} text-white font-extrabold`
                    : themeMode === 'light'
                    ? 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    : 'text-slate-300 hover:bg-slate-900/50 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="w-4.5 h-4.5 shrink-0" /> {btn.label}
                </span>
                <ChevronRight className="w-3.5 h-3.5 opacity-64" />
              </button>
            );
          })}
          
          <button
            onClick={onLogOut}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xl mt-4 border transition-all cursor-pointer font-black text-xs ${
              themeMode === 'light'
                ? 'bg-red-50/80 hover:bg-red-100/90 text-red-700 border-red-200/60 shadow-xs'
                : 'bg-red-950/20 hover:bg-red-950/40 text-red-400 border-red-900/30'
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
            <span>Keluar Layanan Portal</span>
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="lg:col-span-3 space-y-6">
        {activeMenu === 'dashboard' && (
          <div className="space-y-6">
            {/* INCOMPLETE WARNING CARD */}
            {currentMember.status === 'expired' && (
              <div className="bg-red-50 text-red-800 p-5 rounded-2xl border border-red-200 flex items-start gap-3 text-xs font-semibold">
                <AlertTriangle className="w-8 h-8 text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-extrabold text-[13px]">MASA KEANGGOTAAN SEBELUMNYA TELAH EXPIRED</p>
                  <p className="text-red-600 font-medium">Batas pendaftaran ulang Anda telah terlewati. Mohon selesaikan pelunasan draf iuran tahunan di menu iuran guna mempertahankan verified badge direktori nasional.</p>
                  <button onClick={() => setActiveMenu('invoices')} className="text-red-800 underline font-black uppercase mt-1 inline-block">Bayar Iuran Sekarang</button>
                </div>
              </div>
            )}

            {/* IMPACT STATISTICS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className={`border p-5 rounded-2xl shadow-sm transition-all duration-300 ${
                themeMode === 'light'
                  ? 'bg-gradient-to-br from-slate-50 to-white border-slate-200/80 text-slate-800'
                  : 'bg-slate-900 border-slate-800 text-white'
              }`}>
                <p className={`text-[10px] font-extrabold uppercase tracking-wider ${
                  themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                }`}>Tipe Membership</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Zap className={`w-5 h-5 ${themeMode === 'light' ? colorTheme.textDark : colorTheme.text}`} />
                  <p className={`text-base font-black uppercase tracking-tight ${
                    themeMode === 'light' ? 'text-slate-900' : 'text-white'
                  }`}>{currentMember.membershipTypeId.replace('-', ' ')}</p>
                </div>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Masa Aktif: Terproteksi
                </p>
              </div>

              <div className={`border p-5 rounded-2xl shadow-sm transition-all duration-300 ${
                themeMode === 'light'
                  ? 'bg-gradient-to-br from-slate-50 to-white border-slate-200/80 text-slate-800'
                  : 'bg-slate-900 border-slate-800 text-white'
              }`}>
                <p className={`text-[10px] font-extrabold uppercase tracking-wider ${
                  themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                }`}>Gated SOP Diunduh</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <FileText className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                  <p className={`text-base font-black uppercase tracking-tight ${
                    themeMode === 'light' ? 'text-slate-900' : 'text-white'
                  }`}>{(documents.length / 2).toFixed(0)} Berkas</p>
                </div>
                <p className={`text-[10px] font-extrabold mt-2 ${
                  themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                }`}>Izin Level: Complete Access</p>
              </div>

              <div className={`border p-5 rounded-2xl shadow-sm transition-all duration-300 ${
                themeMode === 'light'
                  ? 'bg-gradient-to-br from-slate-50 to-white border-slate-200/80 text-slate-800'
                  : 'bg-slate-900 border-slate-800 text-white'
              }`}>
                <p className={`text-[10px] font-extrabold uppercase tracking-wider ${
                  themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                }`}>Sertifikasi & CPD Points</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Award className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                  <p className={`text-base font-black uppercase tracking-tight ${
                    themeMode === 'light' ? 'text-slate-900' : 'text-white'
                  }`}>
                    {memberCerts.reduce((acc, c) => acc + c.cpdPoints, 0)} Poin
                  </p>
                </div>
                <p className={`text-[10px] font-extrabold mt-2 ${
                  themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                }`}>{memberCerts.length} Dokumen valid</p>
              </div>
            </div>

            {/* UPCOMING REGISTERED EVENT OR INVOICE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Saya Ringkas */}
              <div className={`border rounded-2xl p-6 space-y-4 shadow-sm transition-all duration-300 ${
                themeMode === 'light'
                  ? 'bg-white border-slate-200/80 text-slate-800'
                  : 'bg-slate-900 border-slate-800 text-white'
              }`}>
                <div className={`flex justify-between items-center pb-2 border-b ${
                  themeMode === 'light' ? 'border-slate-100' : 'border-slate-800'
                }`}>
                  <h4 className={`font-extrabold text-sm flex items-center gap-1.5 ${
                    themeMode === 'light' ? 'text-slate-900' : 'text-white'
                  }`}>
                    <CalendarCheck className={`w-4.5 h-4.5 ${themeMode === 'light' ? colorTheme.textDark : colorTheme.text}`} /> Agenda Terdaftar Saya
                  </h4>
                  <button onClick={() => setActiveMenu('events')} className={`text-[10px] ${themeMode === 'light' ? colorTheme.textDark : colorTheme.text} font-black uppercase cursor-pointer hover:underline`}>Lihat Riwayat</button>
                </div>
                {memberRegs.length > 0 ? (
                  <div className="space-y-3">
                    {memberRegs.slice(0, 2).map(reg => {
                      const ev = events.find(e => e.id === reg.eventId);
                      if (!ev) return null;
                      return (
                        <div key={reg.id} className={`p-3.5 rounded-xl border space-y-1.5 transition-all duration-300 ${
                          themeMode === 'light'
                            ? 'bg-slate-50/50 border-slate-200/60 shadow-xs hover:shadow-sm hover:border-slate-300 hover:bg-slate-50'
                            : 'bg-slate-950/40 border-slate-800'
                        }`}>
                          <p className={`font-extrabold text-xs line-clamp-1 ${
                            themeMode === 'light' ? 'text-black' : 'text-white'
                          }`}>{ev.title}</p>
                          <div className={`flex gap-3 text-[10.5px] uppercase font-bold ${
                            themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                          }`}>
                            <span>🎫 No Tiket: {reg.ticketNumber}</span>
                            <span className={reg.attended ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>
                              {reg.attended ? 'Hadir ✔' : 'Belum Hadir'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-3 text-center">Belum ada pendaftaran seminar mendatang.</p>
                )}
              </div>

              {/* Tagihan Billing Ringkas */}
              <div className={`border rounded-2xl p-6 space-y-4 shadow-sm transition-all duration-300 ${
                themeMode === 'light'
                  ? 'bg-white border-slate-200/80 text-slate-800'
                  : 'bg-slate-900 border-slate-800 text-white'
              }`}>
                <div className={`flex justify-between items-center pb-2 border-b ${
                  themeMode === 'light' ? 'border-slate-100' : 'border-slate-800'
                }`}>
                  <h4 className={`font-extrabold text-sm flex items-center gap-1.5 ${
                    themeMode === 'light' ? 'text-slate-900' : 'text-white'
                  }`}>
                    <CreditCard className="w-4.5 h-4.5 text-indigo-500 dark:text-indigo-400" /> Tagihan Belum Dibayar
                  </h4>
                  <button onClick={() => setActiveMenu('invoices')} className="text-[10px] text-indigo-500 dark:text-indigo-400 font-black uppercase cursor-pointer hover:underline">Semua Invoice</button>
                </div>
                {unpaidInvoices.length > 0 ? (
                  <div className="space-y-3">
                    {unpaidInvoices.map(inv => (
                      <div key={inv.id} className={`flex justify-between items-center p-3 rounded-xl border ${
                        themeMode === 'light'
                          ? 'bg-red-50/50 border-red-200/60'
                          : 'bg-red-950/10 border-red-900/30'
                      }`}>
                        <div className="text-xs font-semibold">
                          <p className={`font-black font-mono text-[10.5px] ${
                            themeMode === 'light' ? 'text-slate-900' : 'text-slate-100'
                          }`}>{inv.invoiceNumber}</p>
                          <p className={`text-[10.5px] font-bold mt-0.5 ${
                            themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                          }`}>Iuran: Rp {inv.total.toLocaleString('id-ID')}</p>
                        </div>
                        <button
                          onClick={() => { setSelectedInvoice(inv); setActiveMenu('invoices'); }}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all duration-200 cursor-pointer ${
                            themeMode === 'light'
                              ? 'bg-slate-900 text-white hover:bg-black hover:shadow-xs'
                              : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                          }`}
                        >
                          Bayar
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`text-xs font-bold p-4 rounded-xl text-center border flex items-center gap-2 justify-center ${
                    themeMode === 'light'
                      ? 'bg-emerald-50 text-emerald-850 border-emerald-200/70'
                      : 'bg-emerald-950/10 text-emerald-400 border-emerald-900/20'
                  }`}>
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                    <span>Seluruh iuran tahunan lunas tuntas!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* DIGITAL MEMBER CARD */}
        {activeMenu === 'card' && (
          <div className="space-y-6">
            <div className="pb-2 border-b border-slate-200">
              <h2 className={`text-xl font-black ${themeMode === 'light' ? 'text-black' : 'text-white'}`}>Kartu Karakter Anggota Digital (E-Card)</h2>
              <p className="text-xs text-slate-500">Gunakan kartu ber-QR code ini untuk diskon hotel, coworking space, dan check-in event.</p>
            </div>

            {/* PRESTIGE DESIGN E-CARD Layout with absolute style pairings */}
            <div className={`relative max-w-md mx-auto aspect-[1.586/1] w-full rounded-2xl border ${
              themeMode === 'light'
                ? colorTheme.cardLightBgGradient
                : `bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 ${colorTheme.cardTextLightest} ${colorTheme.cardBorder} shadow-xl`
            } p-6 overflow-hidden flex flex-col justify-between`}>
              <div className={`absolute top-0 right-0 w-32 h-32 ${
                themeMode === 'light' ? colorTheme.lightBg : colorTheme.cardBgBlur
              } rounded-full blur-2xl z-0`}></div>
              
              {/* Header card */}
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <p className={`text-[9px] font-black uppercase tracking-widest ${
                    themeMode === 'light' ? colorTheme.textDark : colorTheme.cardText
                  }`}>KARTU ANGGOTA SAH</p>
                  <h4 className={`text-[11px] font-extrabold tracking-wide ${
                    themeMode === 'light' ? 'text-slate-900' : 'text-slate-200'
                  }`}>Asosiasi Profesional Nusantara</h4>
                </div>
                <span className="text-lg">⭐</span>
              </div>

              {/* Middle with numbers */}
              <div className="relative z-10 py-2">
                <p className={`font-mono text-base tracking-widest select-all font-black ${
                  themeMode === 'light' ? colorTheme.textDark : colorTheme.cardTextLight
                }`}>{currentMember.memberNumber}</p>
                <p className={`text-[13px] font-bold uppercase tracking-tight mt-1 ${
                  themeMode === 'light' ? 'text-slate-950' : 'text-slate-100'
                }`}>{currentMember.name}</p>
              </div>

              {/* Bottom bar */}
              <div className={`relative z-10 flex justify-between items-end border-t ${
                themeMode === 'light' ? 'border-slate-300/80 pt-3' : 'border-slate-800/80 pt-3'
              }`}>
                <div className={`text-[8px] font-semibold space-y-0.5 ${
                  themeMode === 'light' ? 'text-slate-750' : 'text-slate-400'
                }`}>
                  <div>LENCANA: <span className={`font-bold ${
                    themeMode === 'light' ? 'text-slate-900' : 'text-slate-200'
                  }`}>{currentMember.badge || 'Professional'}</span></div>
                  <div>GABUNG: <span className={`font-mono ${
                    themeMode === 'light' ? 'text-slate-900' : 'text-slate-200'
                  }`}>{currentMember.joinDate}</span></div>
                  <div>MASA BERLAKU: <span className="font-bold text-emerald-750 dark:text-emerald-400">{currentMember.expiryDate || 'LIFETIME'}</span></div>
                </div>
                
                {/* Simulated QR block */}
                <div className={`bg-white p-1 rounded-sm border ${
                  themeMode === 'light' ? 'border-slate-300 shadow-xs' : 'border-slate-800'
                } w-12 h-12 flex items-center justify-center select-none shadow-sm`}>
                  <QrCode className="w-10 h-10 text-slate-950" />
                </div>
              </div>
            </div>

            {/* Instruction cards */}
            <div className={`p-5 rounded-xl border text-xs leading-relaxed font-semibold transition-all duration-300 ${
              themeMode === 'light'
                ? 'bg-slate-50 border-slate-200 text-slate-700 shadow-xs'
                : 'bg-slate-900/40 border-slate-800 text-slate-300'
            }`}>
              <p className={`font-black uppercase text-[10.5px] mb-2.5 tracking-wider ${
                themeMode === 'light' ? 'text-slate-800' : 'text-slate-100'
              }`}>CARA PENGGUNAAN:</p>
              <ol className={`list-decimal list-inside space-y-1.5 ${
                themeMode === 'light' ? 'text-slate-650' : 'text-slate-400'
              }`}>
                <li>Tunjukkan kartu digital saat registrasi ulang di lokasi event untuk check-in QR cepat.</li>
                <li>Gunakan nomor ID anggota di atas sebagai kupon verifikasi kemitraan diskon swasta.</li>
                <li>Izin privasi direktori Anda bisa diatur fleksibel di panel setelan profil.</li>
              </ol>
            </div>
          </div>
        )}

        {/* FINANCIALS & BILLINGS */}
        {activeMenu === 'invoices' && (
          <div className="space-y-6">
            <div className="pb-2 border-b border-slate-200">
              <h2 className={`text-xl font-black ${themeMode === 'light' ? 'text-black' : 'text-white'}`}>Status Iuran & Riwayat Invoice</h2>
              <p className="text-xs text-slate-500">Kelola pelunasan tagihan keanggotaan berkala maupun pendaftaran workshop.</p>
            </div>

            {selectedInvoice ? (
              <div className={`border p-6 rounded-2xl shadow-md space-y-6 transition-all duration-300 ${
                themeMode === 'light'
                  ? 'bg-white border-slate-200 text-slate-800'
                  : 'bg-slate-900 border-slate-800 text-white'
              }`}>
                <div className={`flex justify-between items-start border-b pb-4 ${
                  themeMode === 'light' ? 'border-slate-100' : 'border-slate-800'
                }`}>
                  <div>
                    <h3 className={`font-black text-sm ${
                      themeMode === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>Pembayaran Tagihan {selectedInvoice.invoiceNumber}</h3>
                    <p className={`text-xs mt-1 uppercase font-bold ${
                      themeMode === 'light' ? 'text-slate-550' : 'text-slate-400'
                    }`}>Tipe Tagihan: {selectedInvoice.type.replace('_', ' ')}</p>
                  </div>
                  <button onClick={() => setSelectedInvoice(null)} className={`font-black hover:scale-105 transition-all text-xs ${
                    themeMode === 'light' ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-white'
                  }`}>✕ Kembali</button>
                </div>

                {paymentDoneMsg ? (
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 text-xs font-bold p-6 rounded-xl text-center space-y-3 border border-emerald-200">
                    <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                    <p className="font-extrabold text-sm uppercase tracking-wide">Pelunasan Tagihan Berhasil Terkonfirmasi!</p>
                    {paymentMethod === 'Bank Transfer Manual' ? (
                      <p>Sistem merekam bukti transfer Anda. Admin keuangan kami akan memverifikasi dalam durasi 1-2 jam ke depan.</p>
                    ) : (
                      <p>Payment Gateway mendeteksi pelunasan sukses via saldo escrow Anda. Status keanggotaan/sertifikat diperbarui secara instan.</p>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handlePayActionSubmit} className="space-y-5 text-xs font-semibold">
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1 text-center border border-slate-200 dark:border-slate-800">
                      <p className="text-slate-400 uppercase font-extrabold text-[10px]">TOTAL NOMINAL MANDATORI</p>
                      <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">Rp {selectedInvoice.total.toLocaleString('id-ID')}</p>
                    </div>

                    <div className="space-y-1.5">
                      <label className={`uppercase tracking-wide text-[10px] font-black ${
                        themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                      }`}>PILIH METODE PEMBAYARAN</label>
                      <select
                        value={paymentMethod}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className={`w-full p-3 rounded-lg border font-black transition-all ${
                          themeMode === 'light'
                            ? 'bg-slate-50 text-slate-900 border-slate-200'
                            : 'bg-slate-950 text-white border-slate-800'
                        }`}
                      >
                        <option value="Virtual Account BCA">Virtual Account BCA (Konfirmasi Otomatis)</option>
                        <option value="Virtual Account Mandiri">Virtual Account Mandiri (Konfirmasi Otomatis)</option>
                        <option value="QRIS">Instan Scan QRIS (Dukungan E-wallet)</option>
                        <option value="Bank Transfer Manual">Transfer Bank Manual (Butuh Upload Bukti)</option>
                      </select>
                    </div>

                    {/* QRIS Interactive Simulation */}
                    {paymentMethod === 'QRIS' && (
                      <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-3">
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col items-center shadow-xs">
                          <div className="text-slate-950 text-[10.5px] font-black uppercase tracking-wider flex items-center gap-1 border-b border-red-500 pb-1.5 mb-2 w-full justify-center">
                            <span className="text-red-600 font-extrabold font-sans">QRIS</span>
                            <span className="text-slate-400 font-normal">| GPN</span>
                          </div>
                          {/* CSS QR code mock */}
                          <div className="w-40 h-40 bg-slate-100 rounded-lg p-3 flex flex-col justify-between border border-slate-200 relative overflow-hidden">
                            <div className="grid grid-cols-4 gap-1 w-full h-full opacity-85">
                              {/* Left-top marker */}
                              <div className="border-[5px] border-slate-950 w-8 h-8 rounded-xs bg-white"></div>
                              <div className="bg-slate-950 h-2 rounded-full mt-3"></div>
                              <div className="bg-slate-950 h-3 rounded-full mt-1 col-span-2"></div>
                              
                              {/* Left-bottom marker */}
                              <div className="border-[5px] border-slate-950 w-8 h-8 rounded-xs bg-white mt-4"></div>
                              <div className="bg-slate-950 h-2 rounded-full mt-7"></div>
                              <div className="bg-slate-950 h-2 rounded-full mt-5"></div>
                              <div className="bg-slate-950 h-3 rounded-full mt-6"></div>

                              {/* Right-top marker */}
                              <div className="border-[5px] border-slate-950 w-8 h-8 rounded-xs bg-white absolute top-3 right-3"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-red-600 text-white px-1 py-0.5 rounded font-black text-[9px] uppercase tracking-tighter">APN PAY</div>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-500 font-mono mt-2">NMID: ID202611930221</p>
                        </div>
                        <p className="text-center text-slate-500 text-[11px] max-w-xs leading-relaxed font-medium">
                          Scan menggunakan e-wallet GoPay, OVO, Dana, LinkAja, atau aplikasi m-Banking kesayangan Anda.
                        </p>
                      </div>
                    )}

                    {/* VA Interactive Simulation */}
                    {(paymentMethod === 'Virtual Account BCA' || paymentMethod === 'Virtual Account Mandiri') && (
                      <div className={`p-4 rounded-xl border space-y-3 ${
                        themeMode === 'light'
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-slate-950 border-slate-800'
                      }`}>
                        <div className={`flex justify-between items-center p-3.5 rounded-xl border ${
                          themeMode === 'light'
                            ? 'bg-white border-slate-200/80'
                            : 'bg-slate-900 border-slate-800'
                        }`}>
                          <div>
                            <p className={`text-[10px] uppercase tracking-widest font-black ${
                              themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                            }`}>{paymentMethod}</p>
                            <p className={`text-base font-mono font-black select-all mt-1 ${
                              themeMode === 'light' ? 'text-slate-900' : 'text-white'
                            }`}>
                              {paymentMethod === 'Virtual Account BCA' 
                                ? `8026${currentMember.phone?.replace(/[^0-9]/g, '') || '081211110001'}`
                                : `8035${currentMember.phone?.replace(/[^0-9]/g, '') || '081211110001'}`
                              }
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const num = paymentMethod === 'Virtual Account BCA' 
                                ? `8026${currentMember.phone?.replace(/[^0-9]/g, '') || '081211110001'}`
                                : `8035${currentMember.phone?.replace(/[^0-9]/g, '') || '081211110001'}`;
                              navigator.clipboard.writeText(num);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all duration-150 active:scale-95 shrink-0 ${
                              themeMode === 'light'
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                            }`}
                          >
                            {copied ? '✔ Tersalin' : '📋 Salin VA'}
                          </button>
                        </div>
                        <div className={`text-[11px] leading-relaxed space-y-1.5 font-medium ${
                          themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          <p className={`font-black uppercase text-[9px] tracking-wider mb-1 ${
                            themeMode === 'light' ? 'text-slate-550' : 'text-slate-450'
                          }`}>Langkah Pembayaran:</p>
                          <p>1. Salin nomor Virtual Account di atas.</p>
                          <p>2. Buka aplikasi m-Banking / ATM transfer ke menu Virtual Account.</p>
                          <p>3. Masukkan nominal tagihan dan konfirmasi pembayaran.</p>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'Bank Transfer Manual' && (
                      <div className={`p-4 rounded-xl space-y-3 border ${
                        themeMode === 'light'
                          ? 'bg-amber-50/50 border-amber-200 text-slate-850'
                          : `${colorTheme.lightBg} ${colorTheme.textDark} border-${colorTheme.border}/20`
                      }`}>
                        <p className="font-semibold select-text leading-relaxed">
                          Silakan transfer bank manual ke rekening: <br />
                          🏦 BANK MANDIRI : <span className="font-black underline">124-001-2026-000</span> <br />
                          Atas Nama: <span className={`font-black uppercase ${
                            themeMode === 'light' ? 'text-slate-900' : 'text-slate-200'
                          }`}>Asosiasi Profesional Nusantara</span>
                        </p>
                        <div className="space-y-1">
                          <label className={`text-[9px] uppercase font-black ${
                            themeMode === 'light' ? 'text-slate-500' : 'text-slate-450'
                          }`}>Tulis Nama Berkas Bukti Transfer:</label>
                          <input
                            type="text"
                            required
                            value={proofFileMock}
                            onChange={e => setProofFileMock(e.target.value)}
                            className={`p-2.5 text-xs rounded font-bold w-full border ${
                              themeMode === 'light'
                                ? 'bg-white border-slate-200 text-slate-900'
                                : 'bg-slate-900 border-slate-800 text-white'
                            }`}
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod !== 'Bank Transfer Manual' ? (
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() => {
                            // Direct instant payment approval!
                            onApprovePayment(selectedInvoice.id);
                            setPaymentDoneMsg(true);
                            setTimeout(() => {
                              setPaymentDoneMsg(false);
                              setSelectedInvoice(null);
                            }, 3500);
                          }}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md transition-all duration-150 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Zap className="w-4 h-4 fill-white" /> Simulasikan Bayar Sukses (Instant Gateway)
                        </button>
                        <p className="text-[10px] text-slate-400 dark:text-slate-550 italic text-center leading-relaxed font-medium">
                          * Klik tombol di atas untuk menyimulasikan respon instan dari Payment Gateway tanpa perlu persetujuan admin manual!
                        </p>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md"
                      >
                        Konfirmasi Kirim Bukti Transfer
                      </button>
                    )}
                  </form>
                )}
              </div>
            ) : (
              <div className={`border rounded-xl overflow-hidden text-xs transition-all duration-300 ${
                themeMode === 'light'
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-slate-900 border-slate-800'
              }`}>
                <div className="overflow-x-auto"><table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className={`text-[10px] uppercase font-black tracking-wider border-b ${
                      themeMode === 'light'
                        ? 'bg-slate-50 text-slate-600 border-slate-200'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}>
                      <th className="p-4">Invoice No</th>
                      <th className="p-4">Tipe Biaya</th>
                      <th className="p-4 text-center">Batas Tempo</th>
                      <th className="p-4 text-right">Biaya Pokok</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y font-semibold ${
                    themeMode === 'light' ? 'divide-slate-200/60' : 'divide-slate-800'
                  }`}>
                    {memberInvoices.map(inv => (
                      <tr key={inv.id} className={
                        themeMode === 'light' 
                          ? 'hover:bg-slate-50/70 text-slate-850' 
                          : 'hover:bg-slate-950/20 text-slate-200'
                      }>
                        <td className={`p-4 font-mono font-black ${
                          themeMode === 'light' ? 'text-slate-900' : 'text-slate-100'
                        }`}>{inv.invoiceNumber}</td>
                        <td className={`p-4 uppercase text-[10px] ${
                          themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                        }`}>{inv.type.replace('_', ' ')}</td>
                        <td className={`p-4 text-center ${
                          themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                        }`}>{inv.dueDate}</td>
                        <td className={`p-4 text-right font-black ${
                          themeMode === 'light' ? 'text-slate-900' : 'text-white'
                        }`}>Rp {inv.total.toLocaleString('id-ID')}</td>
                        <td className="p-4 text-center">
                          <span className={`inline-block text-[9.5px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            inv.status === 'paid' 
                              ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' 
                              : 'bg-rose-100 text-rose-600 dark:bg-red-950/30 dark:text-red-400'
                          }`}>
                            {inv.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          {inv.status !== 'paid' ? (
                            <button
                              onClick={() => setSelectedInvoice(inv)}
                              className={`${themeMode === 'light' ? colorTheme.textDark : colorTheme.text} ${colorTheme.textHover} font-black uppercase text-[10px] cursor-pointer hover:underline`}
                            >
                              Bayar Tagihan
                            </button>
                          ) : (
                            <span className="text-emerald-600 dark:text-emerald-400 text-[10.5px] font-black">✔ Lunas</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table></div>
              </div>
            )}
          </div>
        )}

        {/* REGISTERED EVENTS HISTORY & FEEDBACK */}
        {activeMenu === 'events' && (
          <div className="space-y-6">
            <div className="pb-2 border-b border-slate-200">
              <h2 className={`text-xl font-black ${themeMode === 'light' ? 'text-black' : 'text-white'}`}>Daftar Keikutsertaan Seminar & Rapat</h2>
              <p className="text-xs text-slate-500">Lihat sertifikat pasca-event, silabus lengkap, serta status check-in kehadiran Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {memberRegs.map(reg => {
                const ev = events.find(e => e.id === reg.eventId);
                if (!ev) return null;
                return (
                  <div
                    key={reg.id}
                    className={`border rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-0.5 ${
                      themeMode === 'light'
                        ? 'bg-white border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300/80'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700/60'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
                        <span className={`px-2 py-0.5 rounded text-[9.5px] font-black ${
                          ev.category === 'Conference' || ev.category === 'Training'
                            ? (themeMode === 'light'
                                ? 'bg-purple-100 text-purple-600'
                                : 'bg-purple-950/30 text-purple-400'
                              )
                            : (themeMode === 'light'
                                ? 'bg-slate-100 text-slate-600'
                                : 'bg-slate-800/60 text-slate-400'
                              )
                        }`}>
                          🏷️ {ev.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[9.5px] font-black ${
                          reg.attended 
                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' 
                            : `${colorTheme.lightBg} ${colorTheme.textDark}`
                        }`}>
                          {reg.attended ? 'KEHADIRAN TERVERIFIKASI' : 'BELUM HADIR'}
                        </span>
                      </div>
                      <h3 className={`font-extrabold text-sm ${themeMode === 'light' ? 'text-black' : 'text-white'} leading-snug`}>{ev.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold">📍 Tempat: {ev.location}</p>
                    </div>

                    {/* Expandable Feedback Survey Form */}
                    {activeFeedbackRegId === reg.id && (
                      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs font-semibold">
                        <p className="font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider text-[10px] flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" /> Survei Ulasan & Kepuasan Acara
                        </p>
                        
                        <div className="space-y-1">
                          <label className="text-slate-400 block uppercase text-[9px] tracking-wider font-extrabold">Rating Acara (1-5 Bintang):</label>
                          <div className="flex gap-1.5 text-xl">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setFeedbackRating(star)}
                                className={`transition-all duration-100 cursor-pointer ${
                                  feedbackRating >= star ? 'text-amber-400 scale-110' : 'text-slate-300 dark:text-slate-800'
                                }`}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-slate-400 block uppercase text-[9px] tracking-wider font-extrabold">Komentar / Saran Konstruktif:</label>
                          <textarea
                            rows={2}
                            required
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder="Tulis kritik, saran, atau pujian untuk pembicara dan panitia..."
                            className="w-full bg-white dark:bg-slate-900 p-2.5 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white font-bold"
                          />
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              onTriggerEventReview(reg.id);
                              setActiveFeedbackRegId(null);
                              setFeedbackText('');
                              setFeedbackRating(5);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-3 py-2 rounded-lg text-[10px] uppercase flex-1 cursor-pointer transition-all active:scale-95"
                          >
                            Kirim & Terbitkan Sertifikat
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveFeedbackRegId(null)}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-extrabold px-3 py-2 rounded-lg text-[10px] uppercase cursor-pointer"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold">
                      <span className="font-mono text-slate-400 text-[10px]">{reg.ticketNumber}</span>
                      
                      {reg.attended ? (
                        reg.certificateGenerated ? (
                          <button
                            onClick={() => { setActiveMenu('certificates'); }}
                            className="text-[#22c55e] hover:underline flex items-center gap-1"
                          >
                            <Award className="w-4 h-4" /> Ambil E-Certificate
                          </button>
                        ) : activeFeedbackRegId !== reg.id ? (
                          <button
                            onClick={() => {
                              setActiveFeedbackRegId(reg.id);
                              setFeedbackRating(5);
                              setFeedbackText('');
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded text-[10px] uppercase font-extrabold flex items-center gap-1 cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> Beri Feedback
                          </button>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-550 text-[10px] italic">Mengisi Survei...</span>
                        )
                      ) : (
                        <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                          <Clock className="w-3.5 h-3.5" /> Belum Mulai check-in
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECURE CERTIPICATES CABINET */}
        {activeMenu === 'certificates' && (
          <div className="space-y-6">
            <div className="pb-2 border-b border-slate-200">
              <h2 className={`text-xl font-black ${themeMode === 'light' ? 'text-black' : 'text-white'}`}>Koleksi E-Sertifikat & Kredit CPD</h2>
              <p className="text-xs text-slate-500">Mencakup sertifikasi yang tervalidasi secara publik lewat database keaslian nasional.</p>
            </div>

            {memberCerts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {memberCerts.map(cert => (
                  <div key={cert.id} className={`border rounded-2xl p-5 space-y-4 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md ${
                    themeMode === 'light'
                      ? 'bg-white border-slate-200/80 text-slate-800'
                      : 'bg-slate-900 border-slate-800 text-white'
                  }`}>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
                        <span>🎫 NO SERI: {cert.certificateNumber}</span>
                        <span className="text-emerald-650 dark:text-emerald-400 flex items-center gap-1 font-black">✔ VALID</span>
                      </div>
                      <h3 className={`font-black text-sm leading-snug ${
                        themeMode === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>{cert.title}</h3>
                      <p className={`text-xs font-bold italic ${
                        themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}>Acara: {cert.eventTitle}</p>
                    </div>

                    <div className={`pt-3 border-t flex items-center justify-between text-xs font-bold text-slate-400 uppercase ${
                      themeMode === 'light' ? 'border-slate-100' : 'border-slate-800/60'
                    }`}>
                      <span>CPD: <span className="text-indigo-600 dark:text-indigo-400 font-black">+{cert.cpdPoints} Bobot</span></span>
                      <button
                        onClick={() => alert(`Memulai download PDF berkas e-sertifikat: ${cert.certificateNumber}`)}
                        className={`${themeMode === 'light' ? colorTheme.textDark : colorTheme.text} ${colorTheme.textHover} flex items-center gap-1 cursor-pointer font-black`}
                      >
                        <Download className="w-4 h-4" /> Unduh Dokumen (PDF)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-900/10 p-12 text-center text-xs text-slate-400 font-bold uppercase space-y-2">
                <Award className="w-10 h-10 text-slate-400 mx-auto" />
                <p>Belum Ada E-Sertifikat Terbit</p>
                <p className="text-[10px] text-slate-400 font-medium lowercase">Sertifikat terbit otomatis setelah admin mengonfirmasi kehadiran Anda di salah satu workshop berbayar APN.</p>
              </div>
            )}
          </div>
        )}

        {/* SOP AND DOCUMENT LIBRARY */}
        {activeMenu === 'documents' && (
          <div className="space-y-6">
            <div className="pb-2 border-b border-slate-200">
              <h2 className={`text-xl font-black ${themeMode === 'light' ? 'text-black' : 'text-white'}`}>Pustaka SOP Internal & Amandemen Organisasi</h2>
              <p className="text-xs text-slate-500">Mencakup berkas legalitas AD/ART yang eksklusif hanya untuk pemegang membership sah.</p>
            </div>

            <div className={`border rounded-xl overflow-hidden text-xs transition-all duration-300 ${
              themeMode === 'light'
                ? 'bg-white border-slate-200 shadow-sm'
                : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="overflow-x-auto"><table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className={`text-[10px] uppercase font-black tracking-wider border-b ${
                    themeMode === 'light'
                      ? 'bg-slate-50 text-slate-600 border-slate-200'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}>
                    <th className="p-4">Nama Berkas AD/ART</th>
                    <th className="p-4 text-center">Version</th>
                    <th className="p-4 text-center">Hak Akses</th>
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className={`divide-y font-semibold ${
                  themeMode === 'light' ? 'divide-slate-200/60' : 'divide-slate-800'
                }`}>
                  {documents
                    .filter(d => d.accessLevel === 'public' || d.accessLevel === 'members_only')
                    .map(d => (
                      <tr key={d.id} className={
                        themeMode === 'light' 
                          ? 'hover:bg-slate-50/70 text-slate-850' 
                          : 'hover:bg-slate-950/20 text-slate-200'
                      }>
                        <td className="p-4 flex items-center gap-3">
                          <FileText className={`w-4.5 h-4.5 shrink-0 ${themeMode === 'light' ? colorTheme.textDark : colorTheme.text}`} />
                          <div>
                            <p className={`font-extrabold text-xs ${
                              themeMode === 'light' ? 'text-slate-900' : 'text-slate-100'
                            }`}>{d.title}</p>
                            <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 uppercase font-bold tracking-wider">🏷️ Kategori: {d.category}</p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-mono text-slate-400 dark:text-slate-550">v{d.version}</td>
                        <td className="p-4 text-center">
                          <span className={`inline-block text-[9.5px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            d.accessLevel === 'public' 
                              ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' 
                              : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400'
                          }`}>
                            {d.accessLevel === 'public' ? 'PUBLIK' : 'INTERNAL SAH'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => alert(`Mengunduh berkas internal: ${d.title}`)}
                            className={`${themeMode === 'light' ? colorTheme.textDark : colorTheme.text} ${colorTheme.textHover} font-black uppercase text-[10px] cursor-pointer hover:underline`}
                          >
                            Unduh Dokumen
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table></div>
            </div>
          </div>
        )}

        {/* DEMOCRACY VOTING AND ELECTIONS */}
        {activeMenu === 'voting' && (
          <div className="space-y-6">
            <div className="pb-2 border-b border-slate-200">
              <h2 className={`text-xl font-black ${themeMode === 'light' ? 'text-black' : 'text-white'}`}>Ekosistem Demokrasi Anggota (E-Voting)</h2>
              <p className="text-xs text-slate-500">Berikan suara Anda pada pemilihan pimpinan komite maupun usulan amandemen anggaran AD/ART.</p>
            </div>

            <div className="space-y-6">
              {polls.map(pl => {
                const hasVoted = pl.votedEmails.includes(currentMember.email);
                const localSelect = selectedVotes[pl.id];
                return (
                  <div key={pl.id} className={`border rounded-2xl p-6 space-y-4 transition-all duration-300 shadow-sm ${
                    themeMode === 'light'
                      ? 'bg-white border-slate-200/80 text-slate-800'
                      : 'bg-slate-900 border-slate-800 text-white'
                  }`}>
                    <div className={`flex justify-between items-center text-[10px] uppercase font-black tracking-wider border-b pb-2 ${
                      themeMode === 'light' ? 'border-slate-100 text-slate-500' : 'border-slate-800 text-slate-400'
                    }`}>
                      <span>🗳️ KETENTUAN HAK SUARA: {pl.eligibility.replace('_', ' ')}</span>
                      <span className={`px-2.5 py-0.5 rounded-full ${
                        hasVoted 
                          ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400' 
                          : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                      }`}>
                        {hasVoted ? '✔ SUARA SECURE' : 'BELUM MEMILIH'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className={`font-black text-sm sm:text-base leading-snug ${
                        themeMode === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>{pl.title}</h3>
                      <p className={`text-xs font-bold leading-relaxed ${
                        themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}>{pl.description}</p>
                    </div>

                    {hasVoted ? (
                      <div className={`p-4 rounded-xl border space-y-3 ${
                        themeMode === 'light'
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-slate-950/40 border-slate-800'
                      }`}>
                        <p className={`text-[10px] uppercase font-black ${
                          themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                        }`}>HASIL SEMENTARA ELEKTRONIK REAL-TIME:</p>
                        <div className="space-y-2 text-xs">
                          {pl.options.map(opt => {
                            const totalVotesVal = pl.options.reduce((acc,o)=>acc+o.votes, 0);
                            const percent = totalVotesVal === 0 ? 0 : ((opt.votes / totalVotesVal) * 100);
                            return (
                              <div key={opt.id} className="space-y-1">
                                <div className={`flex justify-between font-bold ${
                                  themeMode === 'light' ? 'text-slate-750' : 'text-slate-300'
                                }`}>
                                  <span>{opt.label}</span>
                                  <span>{opt.votes} Suara ({percent.toFixed(1)}%)</span>
                                </div>
                                <div className={`w-full h-2 rounded-full overflow-hidden ${
                                  themeMode === 'light' ? 'bg-slate-200' : 'bg-slate-800'
                                }`}>
                                  <div className={`${colorTheme.bg} h-full rounded-full`} style={{ width: `${percent}%` }}></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 font-semibold text-xs">
                        <p className="text-slate-400 uppercase text-[9px]">PILIHAN PILIHAN SUARA:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {pl.options.map(opt => (
                            <button
                              key={opt.id}
                              onClick={() => setSelectedVotes(prev => ({ ...prev, [pl.id]: opt.id }))}
                              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                                localSelect === opt.id
                                  ? themeMode === 'light'
                                    ? `${colorTheme.border} ${colorTheme.lightBg} ${colorTheme.textDark} font-extrabold`
                                    : `${colorTheme.border} ${colorTheme.lightBg} text-white font-extrabold`
                                  : themeMode === 'light'
                                    ? 'border-slate-200 text-slate-700 hover:bg-slate-50'
                                    : 'border-slate-800 text-slate-400 hover:bg-slate-950 shadow-xs'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                        {localSelect && (
                          <button
                            onClick={() => onVote(pl.id, localSelect)}
                            className={`${colorTheme.bg} ${colorTheme.bgHover} text-white font-black px-6 py-2.5 rounded-lg text-xs cursor-pointer shadow-md active:scale-97 transition-all`}
                          >
                            Kirim Suara Sah Anda
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* HELPDESK SECURIATAT PIPELINE */}
        {activeMenu === 'helpdesk' && (
          <div className="space-y-6">
            <div className="pb-2 border-b border-slate-200">
              <h2 className={`text-xl font-black ${themeMode === 'light' ? 'text-black' : 'text-white'}`}>Helpdesk Pengurus & Korespondensi Segera</h2>
              <p className="text-xs text-slate-500">Ajukan pengaduan rincian sertifikat maupun usul kerja sama cabang daerah.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Submission panel */}
              <div className={`md:col-span-1 border rounded-2xl p-5 h-fit text-xs space-y-4 transition-all duration-300 shadow-sm ${
                themeMode === 'light'
                  ? 'bg-white border-slate-200 text-slate-850'
                  : 'bg-slate-900 border-slate-800 text-white'
              }`}>
                <h4 className={`font-black text-xs uppercase tracking-wider ${
                  themeMode === 'light' ? 'text-sky-700' : 'text-sky-400'
                }`}>Tiket Layanan Baru</h4>
                {ticketSuccess ? (
                  <div className="bg-emerald-50 text-emerald-850 font-black p-4 rounded-xl flex items-center gap-1.5 border border-emerald-150">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500" /> Tiket Terkirim!
                  </div>
                ) : (
                  <form onSubmit={handleHelpdeskSubmit} className="space-y-3.5 font-bold">
                    <div className="space-y-1">
                      <label className={`block uppercase text-[9px] tracking-wider font-extrabold ${
                        themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                      }`}>SUBJEK MASALAH *</label>
                      <input
                        type="text"
                        required
                        placeholder="NIK typo, error download..."
                        value={ticketSubject}
                        onChange={e => setTicketSubject(e.target.value)}
                        className={`w-full p-2.5 text-xs rounded-lg border font-semibold ${
                          themeMode === 'light'
                            ? 'bg-slate-50 text-slate-900 border-slate-200 focus:border-sky-500 focus:bg-white'
                            : 'bg-slate-950 text-white border-slate-800 focus:border-sky-400'
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={`block uppercase text-[9px] tracking-wider font-extrabold ${
                        themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                      }`}>KUMPULAN KATEGORI</label>
                      <select
                        value={ticketCategory}
                        onChange={e => setTicketCategory(e.target.value)}
                        className={`w-full p-2.5 rounded-lg border font-black ${
                          themeMode === 'light'
                            ? 'bg-slate-50 text-slate-900 border-slate-200'
                            : 'bg-slate-950 text-white border-slate-800'
                        }`}
                      >
                        <option value="Sertifikat">Masalah E-Sertifikat</option>
                        <option value="Sistem Profil">Sistem Profil Direktori</option>
                        <option value="Iuran Keanggotaan">Masalah VA & Pembayaran</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className={`block uppercase text-[9px] tracking-wider font-extrabold ${
                        themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                      }`}>MESSAGE DETAIL *</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Jabarkan kendala navigasi Anda..."
                        value={ticketMessage}
                        onChange={e => setTicketMessage(e.target.value)}
                        className={`w-full p-2.5 text-xs rounded-lg border font-semibold ${
                          themeMode === 'light'
                            ? 'bg-slate-50 text-slate-900 border-slate-200 focus:border-sky-500 focus:bg-white'
                            : 'bg-slate-950 text-white border-slate-800 focus:border-sky-400'
                        }`}
                      ></textarea>
                    </div>
                    <button type="submit" className={`w-full py-2.5 rounded-lg font-extrabold uppercase transition-all duration-250 cursor-pointer active:scale-97 text-xs ${
                      themeMode === 'light'
                        ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
                        : 'bg-sky-500 hover:bg-sky-650 text-slate-950'
                    }`}>Kirim Tiket</button>
                  </form>
                )}
              </div>

              {/* Tickets List */}
              <div className="md:col-span-2 space-y-4">
                <h4 className="font-extrabold text-slate-950 dark:text-white text-xs uppercase tracking-wider">Arsip Korespondensi Saya</h4>
                {tickets.filter(t => t.userEmail === currentMember.email).map(tk => (
                  <div key={tk.id} className={`border rounded-2xl p-4 space-y-3 transition-all duration-300 shadow-xs ${
                    themeMode === 'light'
                      ? 'bg-white border-slate-200 text-slate-800'
                      : 'bg-slate-900 border-slate-800 text-white'
                  }`}>
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
                      <span>Kategori: {tk.category}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black ${
                        tk.status === 'open' 
                          ? 'bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400' 
                          : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                      }`}>
                        {tk.status === 'open' ? 'SEKRETARIAT REVIEW' : 'RESOLVED'}
                      </span>
                    </div>
                    <p className={`font-black text-xs ${
                      themeMode === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>{tk.subject}</p>
                    <p className={`italic text-[11px] font-bold ${
                      themeMode === 'light' ? 'text-slate-600' : 'text-slate-450'
                    }`}>"{tk.message}"</p>
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">Dibuat tanggal: {tk.createdAt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS / PROFILE EDITING PANEL */}
        {activeMenu === 'profile' && (
          <div className={`border rounded-2xl p-6 sm:p-10 shadow-md space-y-6 text-xs font-semibold transition-all duration-300 ${
            themeMode === 'light'
              ? 'bg-white border-slate-200 text-slate-850'
              : 'bg-slate-900 border-slate-800 text-white'
          }`}>
            <div>
              <h3 className={`font-black text-base ${
                themeMode === 'light' ? 'text-slate-900' : 'text-white'
              }`}>Profil Keanggotaan & Kebijakan Privasi</h3>
              <p className={`mt-1 font-bold ${
                themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
              }`}>Kelola data profesional Anda yang tayang langsung pada papan pencarian direktori publik.</p>
            </div>

            {profileSuccess && (
              <div className="bg-emerald-50 text-emerald-850 font-black p-4 rounded-xl text-center border border-emerald-150">
                ✔ Perubahan setelan data diri berhasil disimpan!
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-5">
              {/* PRIMARY CREDENTIALS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`block uppercase text-[9px] tracking-wider font-extrabold ${
                    themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                  }`}>Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))}
                    className={`w-full p-3 rounded-lg border font-bold transition-all ${
                      themeMode === 'light'
                        ? 'bg-slate-50 text-slate-900 border-slate-200 focus:bg-white focus:border-indigo-500'
                        : 'bg-slate-950 text-white border-slate-800 focus:border-indigo-400'
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`block uppercase text-[9px] tracking-wider font-extrabold ${
                    themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                  }`}>Alamat Email *</label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={e => setProfileForm(p => ({ ...p, email: e.target.value }))}
                    className={`w-full p-3 rounded-lg border font-bold transition-all ${
                      themeMode === 'light'
                        ? 'bg-slate-50 text-slate-900 border-slate-200 focus:bg-white focus:border-indigo-500'
                        : 'bg-slate-950 text-white border-slate-800 focus:border-indigo-400'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`block uppercase text-[9px] tracking-wider font-extrabold ${
                    themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                  }`}>Nomor HP / WA *</label>
                  <input
                    type="text"
                    required
                    value={profileForm.phone}
                    onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                    className={`w-full p-3 rounded-lg border font-bold transition-all ${
                      themeMode === 'light'
                        ? 'bg-slate-50 text-slate-900 border-slate-200 focus:bg-white focus:border-indigo-500'
                        : 'bg-slate-950 text-white border-slate-800 focus:border-indigo-400'
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`block uppercase text-[9px] tracking-wider font-extrabold ${
                    themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                  }`}>Foto Profil (URL)</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={profileForm.avatarUrl}
                    onChange={e => setProfileForm(p => ({ ...p, avatarUrl: e.target.value }))}
                    className={`w-full p-3 rounded-lg border font-bold transition-all ${
                      themeMode === 'light'
                        ? 'bg-slate-50 text-slate-900 border-slate-200 focus:bg-white focus:border-indigo-500'
                        : 'bg-slate-950 text-white border-slate-800 focus:border-indigo-400'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={`block uppercase text-[9px] tracking-wider font-extrabold ${
                  themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                }`}>Kata Sandi Login (Password)</label>
                <input
                  type="password"
                  placeholder="Isi untuk mengubah password login Anda"
                  value={profileForm.password}
                  onChange={e => setProfileForm(p => ({ ...p, password: e.target.value }))}
                  className={`w-full p-3 rounded-lg border font-bold transition-all ${
                    themeMode === 'light'
                      ? 'bg-slate-50 text-slate-900 border-slate-200 focus:bg-white focus:border-indigo-500'
                      : 'bg-slate-950 text-white border-slate-800 focus:border-indigo-400'
                  }`}
                />
              </div>

              <hr className="border-slate-200 dark:border-slate-800 my-4" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`block uppercase text-[9px] tracking-wider font-extrabold ${
                    themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                  }`}>Jabatan / Profesi</label>
                  <input
                    type="text"
                    value={profileForm.profession}
                    onChange={e => setProfileForm(p => ({ ...p, profession: e.target.value }))}
                    className={`w-full p-3 rounded-lg border font-bold transition-all ${
                      themeMode === 'light'
                        ? 'bg-slate-50 text-slate-900 border-slate-200 focus:bg-white focus:border-indigo-500'
                        : 'bg-slate-950 text-white border-slate-800 focus:border-indigo-400'
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`block uppercase text-[9px] tracking-wider font-extrabold ${
                    themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                  }`}>Perusahaan / Kantor</label>
                  <input
                    type="text"
                    value={profileForm.organizationName}
                    onChange={e => setProfileForm(p => ({ ...p, organizationName: e.target.value }))}
                    className={`w-full p-3 rounded-lg border font-bold transition-all ${
                      themeMode === 'light'
                        ? 'bg-slate-50 text-slate-900 border-slate-200 focus:bg-white focus:border-indigo-500'
                        : 'bg-slate-950 text-white border-slate-800 focus:border-indigo-400'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 sm:col-span-1">
                  <label className={`block uppercase text-[9px] tracking-wider font-extrabold ${
                    themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                  }`}>Kota Domisili</label>
                  <input
                    type="text"
                    value={profileForm.city}
                    onChange={e => setProfileForm(p => ({ ...p, city: e.target.value }))}
                    className={`w-full p-3 rounded-lg border font-bold transition-all ${
                      themeMode === 'light'
                        ? 'bg-slate-50 text-slate-900 border-slate-200 focus:bg-white focus:border-indigo-500'
                        : 'bg-slate-950 text-white border-slate-800 focus:border-indigo-400'
                    }`}
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className={`block uppercase text-[9px] tracking-wider font-extrabold ${
                    themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                  }`}>Alamat LinkedIn (URL)</label>
                  <input
                    type="text"
                    placeholder="https://linkedin.com/in/username"
                    value={profileForm.linkedinUrl}
                    onChange={e => setProfileForm(p => ({ ...p, linkedinUrl: e.target.value }))}
                    className={`w-full p-3 rounded-lg border font-bold transition-all ${
                      themeMode === 'light'
                        ? 'bg-slate-50 text-slate-900 border-slate-200 focus:bg-white focus:border-indigo-500'
                        : 'bg-slate-950 text-white border-slate-800 focus:border-indigo-400'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={`block uppercase text-[9px] tracking-wider font-extrabold ${
                  themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                }`}>Biografi Singkat</label>
                <textarea
                  rows={2}
                  value={profileForm.bio}
                  onChange={e => setProfileForm(p => ({ ...p, bio: e.target.value }))}
                  className={`w-full p-3 rounded-lg border font-semibold transition-all ${
                    themeMode === 'light'
                      ? 'bg-slate-50 text-slate-900 border-slate-200 focus:bg-white focus:border-indigo-500'
                      : 'bg-slate-950 text-white border-slate-800 focus:border-indigo-400'
                  }`}
                ></textarea>
              </div>

              {/* PRIVACY CHECKBOX CONTROLS */}
              <div className={`p-4 rounded-xl space-y-3 border transition-all ${
                themeMode === 'light'
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-950/60 border-slate-800'
              }`}>
                <p className={`font-black uppercase tracking-wider text-[10px] ${
                  themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                }`}>PROTEKSI PRIVASI INFORMASI DIREKTORI</p>
                <div className={`space-y-2 text-xs font-bold ${
                  themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={profileForm.showEmail}
                      onChange={e => setProfileForm(p => ({ ...p, showEmail: e.target.checked }))}
                      className={`w-4 h-4 rounded ${colorTheme.accent}`}
                    />
                    <span>Tampilkan Alamat Email Secara Publik di Direktori</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={profileForm.showPhone}
                      onChange={e => setProfileForm(p => ({ ...p, showPhone: e.target.checked }))}
                      className={`w-4 h-4 rounded ${colorTheme.accent}`}
                    />
                    <span>Tampilkan Nomor Handphone ke Pengunjung Publik</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full ${colorTheme.bg} ${colorTheme.bgHover} text-white font-extrabold py-3.5 rounded-xl uppercase text-xs cursor-pointer transition-all duration-150 active:scale-97 shadow-md`}
              >
                Simpan Profil & Kebijakan
              </button>
            </form>

            <div className={`mt-8 pt-6 border-t ${themeMode === 'light' ? 'border-slate-200' : 'border-slate-800'} text-center space-y-3`}>
              <div className="flex flex-col items-center gap-1">
                <h4 className={`text-[11px] font-black uppercase tracking-wider ${themeMode === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>Tindakan Sesi Keanggotaan</h4>
                <p className="text-[10px] text-slate-400 font-semibold">Anda dapat keluar dari sesi akun terverifikasi Anda saat ini di bawah.</p>
              </div>
              <button
                onClick={onLogOut}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-xs uppercase cursor-pointer text-white bg-red-600 hover:bg-red-700 transition-all duration-150 shadow-md active:scale-97"
              >
                <LogOut className="w-4 h-4" />
                <span>KELUAR SEKARANG (LOGOUT)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
