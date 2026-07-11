/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Users,
  Wallet,
  Calendar,
  Award,
  BookOpen,
  Vote,
  TrendingUp,
  Activity,
  Layers,
  Check,
  X,
  Plus,
  QrCode,
  Sliders,
  Send,
  Download,
  Shield,
  FileCheck,
  HelpCircle,
  Clock,
  Briefcase,
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
  User,
  PartnerInquiry,
  HelpdeskTicket,
  ActivityLog
} from '../types';
import { TranslationSet } from '../translations';

interface AdminProps {
  t: TranslationSet;
  lang: string;
  themeStyle: any;
  themeMode?: 'light' | 'dark';
  members: Member[];
  invoices: Invoice[];
  events: Event[];
  registrations: EventRegistration[];
  certificates: Certificate[];
  documents: Document[];
  polls: Poll[];
  inquiries: PartnerInquiry[];
  tickets: HelpdeskTicket[];
  logs: ActivityLog[];
  adminProfile: any;
  onUpdateAdminProfile: (updatedFields: any) => void;
  onApproveMember: (memberId: string) => void;
  onRejectMember: (memberId: string) => void;
  onApprovePayment: (invoiceId: string) => void;
  onAddEvent: (newEvent: Partial<Event>) => void;
  onAddDocument: (newDoc: Partial<Document>) => void;
  onCheckInTicket: (ticketNumber: string) => string;
  onUpdateInquiryStatus: (inquiryId: string, status: any) => void;
  onAddPoll: (newPoll: Partial<Poll>) => void;
  onSolveTicket: (ticketId: string) => void;
  onLogOut: () => void;
}

export default function AdminDashboard({
  t,
  lang,
  themeStyle,
  themeMode = 'light',
  members,
  invoices,
  events,
  registrations,
  certificates,
  documents,
  polls,
  inquiries,
  tickets,
  logs,
  adminProfile,
  onUpdateAdminProfile,
  onApproveMember,
  onRejectMember,
  onApprovePayment,
  onAddEvent,
  onAddDocument,
  onCheckInTicket,
  onUpdateInquiryStatus,
  onAddPoll,
  onSolveTicket,
  onLogOut
}: AdminProps) {
  const [adminMenu, setAdminMenu] = useState<'overview' | 'members' | 'finance' | 'events' | 'certificates' | 'documents' | 'crm' | 'voting' | 'logs' | 'profile'>('overview');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleBulkIssue = () => {
    alert('Memulai Inkubator Masal CPD: Memproses sertifikasi untuk seluruh peserta aktif...');
    console.log('Bulk issue initiated');
  };

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
      badge: themeBadgeMap[name] || 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
    };
  };

  const colorTheme = getColorTheme(themeStyle?.accent);

  // Member verification modal/detail support
  const [selectedVerifMember, setSelectedVerifMember] = useState<Member | null>(null);

  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'Conference' as any,
    format: 'Hybrid' as any,
    location: '',
    description: '',
    startDatetime: '2026-09-01T09:00',
    memberPrice: 0,
    publicPrice: 0,
    quota: 150,
    cpdPoints: 4
  });
  const [eventSuccess, setEventSuccess] = useState(false);

  // QR simulator manual check-in barcode string
  const [checkInBarcode, setCheckInBarcode] = useState('');
  const [checkInResult, setCheckInResult] = useState('');

  // New Voting form state
  const [newPoll, setNewPoll] = useState({
    title: '',
    description: '',
    type: 'poll' as any,
    eligibility: 'all_members',
    isAnonymous: true,
    option1: '',
    option2: '',
    option3: ''
  });
  const [pollSuccess, setPollSuccess] = useState(false);

  // New document form state
  const [newDoc, setNewDoc] = useState({
    title: '',
    category: 'Legal' as any,
    accessLevel: 'members_only' as any,
    version: '1.0',
    tagsString: ''
  });
  const [docSuccess, setDocSuccess] = useState(false);

  // Statistics
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((acc, current) => acc + current.total, 0);
  const outstandingInvoicesCount = invoices.filter(i => i.status === 'unpaid').length;
  const pendingMembersCount = members.filter(m => m.status === 'pending' || m.status === 'under_review').length;
  const verifiedMembersCount = members.filter(m => m.status === 'active' || m.status === 'lifetime').length;

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.location) {
      alert('Tolong lengkapi Judul Event dan Lokasi Acara.');
      return;
    }
    onAddEvent({
      ...newEvent,
      slug: newEvent.title.toLowerCase().replace(/ /g, '-'),
      status: 'open_registration',
      registeredCount: 0
    });
    setEventSuccess(true);
    setTimeout(() => {
      setEventSuccess(false);
      setNewEvent({
        title: '',
        category: 'Conference',
        format: 'Hybrid',
        location: '',
        description: '',
        startDatetime: '2026-09-01T09:00',
        memberPrice: 0,
        publicPrice: 0,
        quota: 150,
        cpdPoints: 4
      });
    }, 3000);
  };

  const handleCheckInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resultMsg = onCheckInTicket(checkInBarcode.trim());
    setCheckInResult(resultMsg);
    setCheckInBarcode('');
  };

  const handleCreatePoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPoll.title || !newPoll.option1 || !newPoll.option2) {
      alert('Tolong lengkapi judul voting dan setidaknya 2 pilihan jawaban.');
      return;
    }
    const opts = [
      { id: 'opt_' + Math.random(), label: newPoll.option1, votes: 0 },
      { id: 'opt_' + Math.random(), label: newPoll.option2, votes: 0 }
    ];
    if (newPoll.option3) {
      opts.push({ id: 'opt_' + Math.random(), label: newPoll.option3, votes: 0 });
    }
    onAddPoll({
      title: newPoll.title,
      description: newPoll.description,
      type: newPoll.type,
      eligibility: newPoll.eligibility,
      isAnonymous: newPoll.isAnonymous,
      status: 'active',
      options: opts,
      votedEmails: [],
      createdAt: new Date().toISOString().split('T')[0]
    });
    setPollSuccess(true);
    setTimeout(() => {
      setPollSuccess(false);
      setNewPoll({
        title: '',
        description: '',
        type: 'poll',
        eligibility: 'all_members',
        isAnonymous: true,
        option1: '',
        option2: '',
        option3: ''
      });
    }, 3000);
  };

  const handleCreateDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.title) return;
    onAddDocument({
      title: newDoc.title,
      category: newDoc.category,
      accessLevel: newDoc.accessLevel,
      version: newDoc.version,
      tags: newDoc.tagsString.split(',').map(t => t.trim()),
      downloadCount: 0
    });
    setDocSuccess(true);
    setTimeout(() => {
      setDocSuccess(false);
      setNewDoc({
        title: '',
        category: 'Legal',
        accessLevel: 'members_only',
        version: '1.0',
        tagsString: ''
      });
    }, 3000);
  };

  const menuItems = [
    { id: 'overview', label: 'Ringkasan Statistik', icon: (sl: string) => <Activity className={sl} /> },
    { id: 'members', label: 'Verifikasi Anggota & CRM', icon: (sl: string) => <Users className={sl} /> },
    { id: 'finance', label: 'Konfirmasi Keuangan / VA', icon: (sl: string) => <Wallet className={sl} /> },
    { id: 'events', label: 'Kegiatan & QR Scan', icon: (sl: string) => <Calendar className={sl} /> },
    { id: 'certificates', label: 'E-Sertifikat Kontrol', icon: (sl: string) => <Award className={sl} /> },
    { id: 'documents', label: 'Berkas SOP / AD-ART', icon: (sl: string) => <BookOpen className={sl} /> },
    { id: 'crm', label: 'Pipeline Mitra Sponsor', icon: (sl: string) => <Sliders className={sl} /> },
    { id: 'voting', label: 'Kelola Voting Demokrasi', icon: (sl: string) => <Vote className={sl} /> },
    { id: 'logs', label: 'Audit Rails / Log', icon: (sl: string) => <Shield className={sl} /> },
    { id: 'profile', label: 'Profil Admin', icon: (sl: string) => <Sliders className={sl} /> }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      {/* Sidebar for Desktop / Tablet */}
      <aside className="hidden md:block w-full md:w-64 shrink-0 rounded-2xl border p-4 space-y-4 bg-slate-800 dark:bg-[#0c1222]/80 border-slate-700/50 dark:border-slate-800/80 shadow-md">
        <div className="px-2 pb-2 border-b border-slate-700/50 dark:border-slate-800/80">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Navigasi Admin</h3>
          <p className="text-[10px] text-slate-300 font-bold mt-0.5">Asosiasi Profesional Nusantara</p>
        </div>
        <nav className="space-y-1">
          {menuItems.map(it => (
            <button
              key={it.id}
              onClick={() => {
                setAdminMenu(it.id as any);
                setSelectedVerifMember(null);
              }}
              className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer text-left font-bold text-xs ${
                adminMenu === it.id
                  ? `${colorTheme.bg} text-white font-extrabold shadow-sm`
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-900/60'
              }`}
            >
              {it.icon("w-4 h-4 shrink-0")}
              <span className="truncate">{it.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Navigation Selector */}
      <div className="md:hidden w-full relative">
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="w-full p-3.5 rounded-2xl border font-black text-xs uppercase tracking-wide flex items-center justify-between transition-all bg-slate-800 dark:bg-[#0c1222]/80 border-slate-700/50 dark:border-slate-800/80 text-white shadow-xs"
        >
          <span className="flex items-center gap-2">
            {menuItems.find(it => it.id === adminMenu)?.icon("w-4 h-4 text-slate-300")}
            {menuItems.find(it => it.id === adminMenu)?.label}
          </span>
          <span className="text-[10px] text-slate-300 flex items-center gap-1 bg-slate-700 dark:bg-slate-900 px-2.5 py-1 rounded-lg">
            {isMobileNavOpen ? 'TUTUP' : 'MENU'} ▾
          </span>
        </button>
        
        {isMobileNavOpen && (
          <div className="mt-2 border rounded-2xl p-2.5 space-y-1 shadow-md absolute z-20 left-0 right-0 bg-slate-800 border-slate-700 dark:bg-slate-900 dark:border-slate-800">
            {menuItems.map(it => (
              <button
                key={it.id}
                onClick={() => {
                  setAdminMenu(it.id as any);
                  setSelectedVerifMember(null);
                  setIsMobileNavOpen(false);
                }}
                className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer text-left font-bold text-xs ${
                  adminMenu === it.id
                    ? `${colorTheme.bg} text-white font-extrabold`
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-800/40'
                }`}
              >
                {it.icon("w-4 h-4 shrink-0")}
                <span>{it.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full space-y-6">

      {/* DASHBOARD OVERVIEW PANELS */}
      {adminMenu === 'overview' && (
        <div className="space-y-6">
          {/* Top statistical grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`border rounded-2xl p-6 shadow-xs ${
              themeMode === 'light'
                ? 'bg-white border-slate-200/80'
                : 'bg-[#0c1222]/60 border-slate-800'
            }`}>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Verified Members</span>
              <span className={`text-2xl font-black mt-1 block ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>{verifiedMembersCount} Anggota</span>
              <p className="text-[10px] text-green-600 dark:text-green-400 font-extrabold mt-2">✔ Direktori Publik Terindeks</p>
            </div>

            <div className={`border rounded-2xl p-6 shadow-xs ${
              themeMode === 'light'
                ? 'bg-white border-slate-200/80'
                : 'bg-[#0c1222]/60 border-slate-800'
            }`}>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Total Penerimaan (Revenue)</span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">Rp {totalRevenue.toLocaleString('id-ID')}</span>
              <p className={`text-[10px] mt-2 ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>Dukungan Iuran & Penjualan Tiket</p>
            </div>

            <div className={`border rounded-2xl p-6 shadow-xs ${
              themeMode === 'light'
                ? 'bg-white border-slate-200/80'
                : 'bg-[#0c1222]/60 border-slate-800'
            }`}>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Permohonan Menunggu Verifikasi</span>
              <span className={`text-2xl font-black mt-1 block ${colorTheme.text}`}>{pendingMembersCount} Pendaftar</span>
              <p className={`text-[10px] font-extrabold mt-2 ${colorTheme.text}`}>⏳ Antrean Pengurus Sekretariat</p>
            </div>

            <div className={`border rounded-2xl p-6 shadow-xs ${
              themeMode === 'light'
                ? 'bg-white border-slate-200/80'
                : 'bg-[#0c1222]/60 border-slate-800'
            }`}>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Kemitraan Pipeline Aktif</span>
              <span className="text-2xl font-black text-indigo-500 dark:text-indigo-400 mt-1 block">{inquiries.length} Lead Kasus</span>
              <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-extrabold mt-2">Kadin & Industri Aliansi</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent audit trails block */}
            <div className={`border rounded-2xl p-6 space-y-4 ${
              themeMode === 'light'
                ? 'bg-white border-slate-200/80 shadow-xs'
                : 'bg-slate-900 border-slate-800'
            }`}>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Activity className={`w-4 h-4 ${colorTheme.text}`} /> Histori Audit Pengurus Teranyar
              </h3>
              <div className="space-y-3.5 text-xs">
                {logs.slice(0, 4).map(lg => (
                  <div key={lg.id} className="flex justify-between items-start border-b border-dashed border-slate-100 dark:border-slate-800 pb-2 font-semibold">
                    <div>
                      <p className={`${themeMode === 'light' ? 'text-slate-950' : 'text-white'} font-extrabold`}>{lg.action}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Modul: {lg.module} / IP Address: {lg.ipAddress}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">{lg.createdAt.split('T')[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Pending Tickets summary in Admin CRM */}
            <div className={`border rounded-2xl p-6 space-y-4 ${
              themeMode === 'light'
                ? 'bg-white border-slate-200/80 shadow-xs'
                : 'bg-slate-900 border-slate-800'
            }`}>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <HelpCircle className="w-4 h-4 text-indigo-500" /> Tiket Penduan Member Terbuka
              </h3>
              <div className="space-y-3 font-semibold text-xs">
                {tickets.filter(tk => tk.status === 'open').map(tk => (
                  <div key={tk.id} className={`flex justify-between items-center p-3 rounded-lg border ${
                    themeMode === 'light' 
                      ? 'bg-slate-50 border-slate-100'
                      : 'bg-slate-950 border-slate-800'
                  }`}>
                    <div>
                      <p className={`font-bold ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>{tk.subject}</p>
                      <p className="text-[10px] text-slate-500 mt-1">Oleh: {tk.userEmail} · Prioritas: {tk.priority}</p>
                    </div>
                    <button
                      onClick={() => onSolveTicket(tk.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-1.5 rounded text-[10px]"
                    >
                      RESOLVE
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MEMBER APPLICATIONS MANAGEMENT TABLE (SECRETARIAT CRM) */}
      {adminMenu === 'members' && (
        <div className="space-y-6">
          <div className="pb-2 border-b border-slate-200">
            <h2 className={`text-xl font-black ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>Ulasan Pengajuan Anggota Baru</h2>
            <p className="text-xs text-slate-500">Periksa integritas dokumen identitas pendaftar, klik setujui untuk generasikan draf invoice iuran.</p>
          </div>

          <div className={`border rounded-xl overflow-hidden text-xs ${
            themeMode === 'light' ? 'bg-white border-slate-200/80 shadow-xs' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="overflow-x-auto"><table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className={`font-bold border-b text-[10px] uppercase ${
                  themeMode === 'light'
                    ? 'bg-slate-50 border-slate-100 text-slate-500'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}>
                  <th className="p-4">Tanggal Daftar</th>
                  <th className="p-4">Nama Lengkap</th>
                  <th className="p-4">Organisasi / Profesi</th>
                  <th className="p-4">Pilihan Membership</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className={`divide-y font-semibold ${
                themeMode === 'light' ? 'divide-slate-100' : 'divide-slate-800'
              }`}>
                {members
                  .filter(m => m.status === 'pending' || m.status === 'under_review')
                  .map(m => (
                    <tr key={m.id} className={`hover:${themeMode === 'light' ? 'bg-slate-50/80' : 'bg-slate-950/20'}`}>
                      <td className="p-4 text-slate-400 font-mono text-[10.5px]">{m.joinDate}</td>
                      <td className="p-4">
                        <p className={`font-bold ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>{m.name}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{m.email} · {m.phone}</p>
                      </td>
                      <td className="p-4">
                        <p className={`${themeMode === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>{m.organizationName}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{m.profession} · {m.industry}</p>
                      </td>
                      <td className={`p-4 ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>{m.membershipTypeId.replace('-', ' ').toUpperCase()}</td>
                      <td className="p-4 text-center">
                        <span className={`font-extrabold px-2.5 py-0.5 rounded text-[9px] uppercase ${colorTheme.badge}`}>
                          {m.status}
                        </span>
                      </td>
                      <td className="p-4 text-right flex gap-1 justify-end">
                        <button
                          onClick={() => onApproveMember(m.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2 py-1.5 rounded-md text-[10px] flex items-center gap-0.5"
                        >
                          <Check className="w-3.5 h-3.5" /> APPROVE
                        </button>
                        <button
                          onClick={() => onRejectMember(m.id)}
                          className="bg-red-50 text-red-600 hover:bg-red-100 font-bold px-2 py-1.5 rounded-md text-[10px] flex items-center gap-0.5"
                        >
                          <X className="w-3.5 h-3.5" /> REJECT
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table></div>
          </div>
        </div>
      )}

      {/* FINANCE PAYMENT VERIFICATION MODULE */}
      {adminMenu === 'finance' && (
        <div className="space-y-6">
          <div className="pb-2 border-b border-slate-200">
            <h2 className={`text-xl font-black ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>Verifikasi Slip Transfer & Iuran Anggota</h2>
            <p className="text-xs text-slate-500">Konfirmasikan pembayaran iuran masuk guna otomatisasi penerbitan nomor induk ID sah.</p>
          </div>

          <div className={`border rounded-xl overflow-hidden text-xs ${
            themeMode === 'light' ? 'bg-white border-slate-200/80 shadow-xs' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="overflow-x-auto"><table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className={`font-bold border-b text-[10px] uppercase ${
                  themeMode === 'light'
                    ? 'bg-slate-50 border-slate-100 text-slate-500'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}>
                  <th className="p-4">Invoice No</th>
                  <th className="p-4">Pembayar (Email)</th>
                  <th className="p-4">Metode Bayar</th>
                  <th className="p-4 text-right">Nominal Selesai</th>
                  <th className="p-4 text-center">Status Keuangan</th>
                  <th className="p-4 text-right">Aksi Verifikator</th>
                </tr>
              </thead>
              <tbody className={`divide-y font-semibold ${
                themeMode === 'light' ? 'divide-slate-100' : 'divide-slate-800'
              }`}>
                {invoices
                  .filter(inv => inv.status === 'pending_confirmation')
                  .map(inv => (
                    <tr key={inv.id} className={`hover:${themeMode === 'light' ? 'bg-slate-50/80' : 'bg-slate-950/20'}`}>
                      <td className={`p-4 font-mono font-bold ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>{inv.invoiceNumber}</td>
                      <td className="p-4">
                        <p className={`font-extrabold ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>{inv.userEmail}</p>
                        <p className={`text-[10px] ${colorTheme.textDark} mt-1 uppercase`}>Tipe: {inv.type.replace('_', ' ')}</p>
                      </td>
                      <td className="p-4">
                        <span className="text-slate-500">{inv.paymentMethod}</span>
                        {inv.proofUrl && (
                          <button
                            onClick={() => alert(`Membuka popup peninjau slip transfer bank: ${inv.proofUrl}`)}
                            className={`text-[9.5px] ${colorTheme.text} block underline font-bold mt-1 cursor-pointer`}
                          >
                            Tinjau Lampiran Bukti
                          </button>
                        )}
                      </td>
                      <td className={`p-4 text-right font-bold ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>Rp {inv.total.toLocaleString('id-ID')}</td>
                      <td className="p-4 text-center">
                        <span className={`font-extrabold px-2 py-0.5 rounded text-[9px] uppercase ${colorTheme.badge}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => onApprovePayment(inv.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-md text-[10px]"
                        >
                          ✔ KONFIRMASI LUNAS
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table></div>
          </div>
        </div>
      )}

      {/* EVENT MAANGEMENT & CHECK-IN EMULATOR */}
      {adminMenu === 'events' && (
        <div className="space-y-8">
          <div className="pb-2 border-b border-slate-200">
            <h2 className={`text-xl font-black ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>Kegiatan Asosiasi & Simulator QR check-in</h2>
            <p className="text-xs text-slate-500">Mencakup instrumen penambahan event, sekaligus emulasi checkin tiket saat tamu tiba di gedung konvensi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Create new seminar / workshop form */}
            <div className={`border rounded-2xl p-6 shadow-xs text-xs font-semibold ${themeMode === 'light' ? 'bg-white border-slate-200/80' : 'bg-slate-900 border-slate-800'}`}>
              <h4 className="font-extrabold text-[#0369a1] text-xs uppercase tracking-wider mb-4">Tambahkan Proposal Kegiatan Baru</h4>
              {eventSuccess && (
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl font-bold mb-4">
                  ✔ Event Baru Berhasil Dipublikasikan di portal utama!
                </div>
              )}
              <form onSubmit={handleCreateEvent} className="space-y-3 font-semibold text-xs">
                <div className="space-y-1">
                  <label className="text-slate-500">JUDUL KEGIATAN *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pemeringkatan SKP Dokter & Notaris Jilid II"
                    value={newEvent.title}
                    onChange={e => setNewEvent(p => ({ ...p, title: e.target.value }))}
                    className={`w-full p-2.5 rounded border font-bold ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-500">PILIHAN KATEGORI</label>
                    <select
                      value={newEvent.category}
                      onChange={e => setNewEvent(p => ({ ...p, category: e.target.value as any }))}
                      className={`w-full p-2.5 rounded border font-bold ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'}`}
                    >
                      <option value="Conference">Seminar / Conference</option>
                      <option value="Training">Workshop Sertifikasi / Training</option>
                      <option value="Webinar">Webinar Pembekalan Umum</option>
                      <option value="Musyawarah">Musyawarah Tahunan Daerah</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-500">FORMAT ACARA</label>
                    <select
                      value={newEvent.format}
                      onChange={e => setNewEvent(p => ({ ...p, format: e.target.value as any }))}
                      className={`w-full p-2.5 rounded border font-bold ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'}`}
                    >
                      <option value="Hybrid">Hybrid (Offline + Zoom)</option>
                      <option value="Offline">Tatap Muka di Lokasi (Offline)</option>
                      <option value="Online">Online Penuh</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-500">BIAYA MEMBER SAH (RP)</label>
                    <input
                      type="number"
                      value={newEvent.memberPrice}
                      onChange={e => setNewEvent(p => ({ ...p, memberPrice: parseInt(e.target.value) || 0 }))}
                      className={`w-full p-2.5 rounded border font-bold ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-500">BOBOT NILAI CPD / SKP</label>
                    <input
                      type="number"
                      value={newEvent.cpdPoints}
                      onChange={e => setNewEvent(p => ({ ...p, cpdPoints: parseInt(e.target.value) || 0 }))}
                      className={`w-full p-2.5 rounded border font-bold ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'}`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500">LOKASI GEDUNG PERTEMUAN / ZOOM LINK *</label>
                  <input
                    type="text"
                    required
                    placeholder="Grand Ballroom Hotel Ritz, Jakarta"
                    value={newEvent.location}
                    onChange={e => setNewEvent(p => ({ ...p, location: e.target.value }))}
                    className={`w-full p-2.5 rounded border ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500">SILABUS PEMBELAJARAN ACARA</label>
                  <textarea
                    rows={2}
                    value={newEvent.description}
                    onChange={e => setNewEvent(p => ({ ...p, description: e.target.value }))}
                    className={`w-full p-2.5 rounded border font-semibold ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'}`}
                  ></textarea>
                </div>

                <button type="submit" className={`w-full ${colorTheme.bg} ${colorTheme.bgHover} text-white font-black py-2.5 rounded-lg text-xs uppercase transition-all duration-150 cursor-pointer`}>
                  Publikasikan Event & Buka Registrasi
                </button>
              </form>
            </div>

            {/* QR Scanner simulator check-In */}
            <div className={`${
              themeMode === 'light'
                ? 'bg-white text-slate-800 border-slate-200 shadow-xs'
                : 'bg-slate-900 text-white border-slate-800 shadow-md'
            } p-6 rounded-3xl border space-y-6 shrink-0 h-fit`}>
              <div className={`flex items-center gap-2 border-b ${themeMode === 'light' ? 'border-slate-100' : 'border-slate-800'} pb-3`}>
                <QrCode className={`w-6 h-6 ${colorTheme.text} shrink-0`} />
                <div>
                  <h4 className="font-extrabold text-sm uppercase">QR Ticket Check-In Simulator</h4>
                  <p className={`text-[10px] ${themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'} capitalize`}>Emulasi checkin kehadiran tiket cetak peserta.</p>
                </div>
              </div>

              <div className={`p-4 ${
                themeMode === 'light' ? 'bg-slate-50 border-slate-100 text-slate-700' : 'bg-slate-950 border-slate-800 text-slate-200'
              } rounded-xl space-y-2 border text-xs`}>
                <p className={`font-bold ${colorTheme.text} tracking-wider`}>CONTOH KODE TIKET UNTUK TESTING:</p>
                <div className={`font-mono text-[10.5px] ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-300'} select-all space-y-1 font-semibold leading-relaxed`}>
                  <div>🎟️ CLARA TAN TICKET: <span className="font-black underline text-indigo-600 dark:text-indigo-400">TICKET-APN-2026-000003</span></div>
                  <div>🎟️ ADITYA TICKET: <span className="font-black underline text-indigo-600 dark:text-indigo-400">TICKET-APN-2026-000001</span></div>
                </div>
              </div>

              <form onSubmit={handleCheckInSubmit} className="space-y-3.5 text-xs font-semibold">
                <div className="space-y-1">
                  <label className="text-slate-400">MASUKKAN TIKET NUMBER BARCODE / MANUAL ENTRY *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ketik No Tiket di atas..."
                    value={checkInBarcode}
                    onChange={e => setCheckInBarcode(e.target.value)}
                    className={`w-full p-3 rounded-lg text-xs font-mono font-bold uppercase border ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-100'}`}
                  />
                </div>
                <button type="submit" className={`w-full ${colorTheme.bg} ${colorTheme.bgHover} text-white font-black py-2.5 rounded-lg uppercase text-xs cursor-pointer`}>
                  Scan & Konfirmasi Kehadiran
                </button>
              </form>

              {checkInResult && (
                <div className="bg-emerald-950/40 text-emerald-300 font-bold text-xs p-4 rounded-xl border border-emerald-900/40">
                  📢 STATUS LAPORAN EMULATOR: <br />
                  <p className="mt-1 font-semibold uppercase font-mono text-[11px] text-slate-200">{checkInResult}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* E-CERTIFICATES BATCH TEMPLATES PANEL */}
      {adminMenu === 'certificates' && (
        <div className="space-y-6">
          <div className="pb-2 border-b border-slate-200">
            <h2 className={`text-xl font-black ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>Penerbitan & Kontrol Seri E-Sertifikat</h2>
            <p className="text-xs text-slate-500">Mencakup pengesahan nomor seri sertifikat yang tervalidasi CPD secara masal kepada peserta terverifikasi hadir.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-semibold">
            {/* Template specs */}
            <div className={`border rounded-2xl p-6 shadow-xs space-y-4 ${themeMode === 'light' ? 'bg-white border-slate-200/80' : 'bg-slate-900 border-slate-800'}`}>
              <h4 className={`font-extrabold ${colorTheme.text} text-xs uppercase tracking-wider flex items-center gap-1`}>
                <Award className="w-4 h-4" /> Spesifikasi Template Utama
              </h4>
              <div className={`space-y-3 pt-2 text-[11.5px] font-semibold leading-relaxed border-t ${themeMode === 'light' ? 'text-slate-800 border-slate-200' : 'text-slate-300 border-slate-700'}`}>
                <p>💎 **DESAIN PRESET UTAMA**: Sertifikat Kompetensi Digital APN Berstandar Amandemen.</p>
                <p>🎨 **BACKGROUND WARNA**: Emas Kehormatan (Gold Accent Border with Premium Watermark Logo).</p>
                <p>✅ **PROTEKSI MANDATORI**: Enkripsi Tautan QR Code yang mengarah ke `/certificates/verify/ID-BARCODE`.</p>
              </div>
              <button
                onClick={handleBulkIssue}
                className={`w-full ${colorTheme.bg} ${colorTheme.bgHover} text-white font-black py-2.5 rounded-lg uppercase mt-4 text-xs transition-all duration-150 cursor-pointer`}
              >
                Picu Inkubator Masal CPD (Run Bulk-Issue)
              </button>
            </div>

            {/* Issued history table summary */}
            <div className={`border rounded-2xl p-6 shadow-xs max-h-96 overflow-y-auto space-y-3 ${themeMode === 'light' ? 'bg-white border-slate-200/80' : 'bg-slate-900 border-slate-800'}`}>
              <h4 className={`font-extrabold ${themeMode === 'light' ? 'text-slate-950' : 'text-white'} text-xs uppercase tracking-wider`}>Histori Cetak Seri Validasi</h4>
              <div className="divide-y divide-slate-100 font-semibold text-xs pt-1">
                {certificates.slice(0, 5).map(cf => (
                  <div key={cf.id} className="py-2.5 flex justify-between items-center">
                    <div>
                      <p className={`font-bold ${themeMode === 'light' ? 'text-slate-950' : 'text-slate-100'} font-mono text-[10.5px]`}>{cf.certificateNumber}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{cf.memberEmail}</p>
                    </div>
                    <span className="text-[10px] text-indigo-500">+{cf.cpdPoints} CPD Points</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT LIBRARY CMS */}
      {adminMenu === 'documents' && (
        <div className="space-y-6">
          <div className="pb-2 border-b border-slate-200">
            <h2 className={`text-xl font-black ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>CMS Pengunggahan SOP & AD/ART</h2>
            <p className="text-xs text-slate-500">Tentukan tingkat batas aksesibilitas pengunduhan berkas legal dari level publik hingga pengurus inti.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-semibold">
            {/* New Doc Upload Form */}
            <div className={`border rounded-xl p-5 h-fit space-y-4 ${themeMode === 'light' ? 'bg-white border-slate-200/80 shadow-xs' : 'bg-slate-900 border-slate-800'}`}>
              <h4 className="font-extrabold text-[#0369a1] text-xs uppercase">Daftarkan Berkas Hukum</h4>
              {docSuccess && (
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded font-bold">
                  ✔ Dokumen berhasil dipublish!
                </div>
              )}
              <form onSubmit={handleCreateDoc} className="space-y-3 font-semibold">
                <div className="space-y-1">
                  <label className="text-slate-400">JUDUL FILE *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Lampiran Keputusan Pleno II..."
                    value={newDoc.title}
                    onChange={e => setNewDoc(p => ({ ...p, title: e.target.value }))}
                    className={`w-full p-2 text-xs rounded border font-bold ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">KATETORI</label>
                  <select
                    value={newDoc.category}
                    onChange={e => setNewDoc(p => ({ ...p, category: e.target.value as any }))}
                    className={`w-full p-2 rounded border font-bold ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'}`}
                  >
                    <option value="Legal">Legal / AD-ART</option>
                    <option value="Annual Report">Annual Audit Report</option>
                    <option value="SOP">SOP Kepengurusan Cabang</option>
                    <option value="Media Kit">Media Kit Kemitraan</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">BATAS IZIN AKSES DOWNLOAD</label>
                  <select
                    value={newDoc.accessLevel}
                    onChange={e => setNewDoc(p => ({ ...p, accessLevel: e.target.value as any }))}
                    className={`w-full p-2 rounded border font-bold ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'}`}
                  >
                    <option value="public">Publik Bebas Unduh</option>
                    <option value="members_only">Khusus Anggota Terverifikasi</option>
                    <option value="admin_only">Internal Pengurus Pusat</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">KATA KUNCI TAGS (SEPARASI KOMA)</label>
                  <input
                    type="text"
                    placeholder="SOP, Regional, Regulasi"
                    value={newDoc.tagsString}
                    onChange={e => setNewDoc(p => ({ ...p, tagsString: e.target.value }))}
                    className={`w-full p-2 rounded border font-bold text-xs ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>
                <button type="submit" className={`w-full ${colorTheme.bg} ${colorTheme.bgHover} text-white p-2 rounded font-black uppercase transition-all duration-150 cursor-pointer`}>Upload Dokumen</button>
              </form>
            </div>

            {/* List and Downloads Audit */}
            <div className={`md:col-span-2 border p-5 rounded-xl space-y-4 max-h-[500px] overflow-y-auto ${themeMode === 'light' ? 'bg-white border-slate-200/80 shadow-xs' : 'bg-slate-900 border-slate-800'}`}>
              <h4 className={`font-extrabold uppercase tracking-wider ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>Index Berkas & Audit Unduhan</h4>
              <div className="divide-y divide-slate-100 text-xs">
                {documents.map(d => (
                  <div key={d.id} className="py-2.5 flex justify-between items-center font-semibold">
                    <div>
                      <p className={`font-bold ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>{d.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Category: {d.category} · Akses: {d.accessLevel.toUpperCase()}</p>
                    </div>
                    <span className={`text-[10px] ${colorTheme.textDark} font-mono italic shrink-0`}>{d.downloadCount} kali diunduh</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEAD INQUIRIES CONTROL AND PIPELINE CRM */}
      {adminMenu === 'crm' && (
        <div className="space-y-6">
          <div className="pb-2 border-b border-slate-200">
            <h2 className={`text-xl font-black ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>Pipeline Kemitraan Kadin & Swasta</h2>
            <p className="text-xs text-slate-500">Kawal usulan penandatangan MoU dari korporasi, tingkatkan konvensi lead hingga berstatus deal won.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-semibold">
            {['New', 'Contacted', 'Proposal Sent'].map((columnStatus) => (
              <div key={columnStatus} className={`border p-4 rounded-2xl space-y-4 ${themeMode === 'light' ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'}`}>
                <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                  <span className="font-extrabold text-slate-500 uppercase tracking-widest text-[10px]">🏢 Kategori: {columnStatus}</span>
                  <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] ${themeMode === 'light' ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-200'}`}>
                    {inquiries.filter(i => i.status === columnStatus).length} Lead
                  </span>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {inquiries
                    .filter(i => i.status === columnStatus)
                    .map(iq => (
                      <div key={iq.id} className={`border p-4 rounded-xl space-y-3 absolute-parent ${themeMode === 'light' ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'}`}>
                        <div>
                          <p className="font-extrabold text-[#0369a1] text-xs leading-snug">{iq.companyName}</p>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Kontak: {iq.contactName} ({iq.phone})</p>
                          <p className={`text-[11px] leading-relaxed mt-2 italic p-2.5 rounded-lg ${themeMode === 'light' ? 'bg-slate-50 text-slate-600' : 'bg-slate-950 text-slate-400'}`}>
                            "{iq.message}"
                          </p>
                        </div>
                        <div className="flex justify-between items-end pt-2 border-t border-slate-100 dark:border-slate-800/60">
                          <span className={`text-[10px] ${colorTheme.text} font-bold`}>{iq.interestType.split(' ')[0]}</span>
                          <div className="flex gap-1">
                            {columnStatus === 'New' && (
                              <button
                                onClick={() => onUpdateInquiryStatus(iq.id, 'Contacted')}
                                className={`bg-slate-900 hover:bg-slate-800 ${colorTheme.bg} ${colorTheme.bgHover} text-white px-2 py-1 rounded text-[9px] uppercase font-black cursor-pointer`}
                              >
                                Kontak
                              </button>
                            )}
                            {columnStatus === 'Contacted' && (
                              <button
                                onClick={() => onUpdateInquiryStatus(iq.id, 'Proposal Sent')}
                                className={`bg-slate-900 hover:bg-slate-800 ${colorTheme.bg} ${colorTheme.bgHover} text-white px-2 py-1 rounded text-[9px] uppercase font-black cursor-pointer`}
                              >
                                Kirim Proposal
                              </button>
                            )}
                            {columnStatus === 'Proposal Sent' && (
                              <button
                                onClick={() => onUpdateInquiryStatus(iq.id, 'Deal Won')}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded text-[9px] uppercase font-black flex items-center"
                              >
                                ✔ DEAL WON
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VOTING ELECTION CREATOR MODULE */}
      {adminMenu === 'voting' && (
        <div className="space-y-6">
          <div className="pb-2 border-b border-slate-200">
            <h2 className={`text-xl font-black ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>Kelola Voting AD/ART & Amandemen Suara</h2>
            <p className="text-xs text-slate-500">Rancang masa berlaku bilik pencoblosan pemilihan pengurus cabang regional.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-semibold">
            {/* Create form */}
            <div className={`border p-6 rounded-2xl shadow-xs space-y-4 ${themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <h4 className="font-extrabold text-[#0369a1] text-xs uppercase tracking-wider">Inisiasi Pemilihan Baru</h4>
              {pollSuccess && (
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded font-bold">
                  ✔ Bilik e-voting baru resmi dibuka untuk seluruh anggota.
                </div>
              )}
              <form onSubmit={handleCreatePoll} className="space-y-3 font-semibold">
                <div className="space-y-1">
                  <label className="text-slate-500">JUDUL TOPIK / ELEKSI BANER *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pemilihan Formatur Dewan Penasihat"
                    value={newPoll.title}
                    onChange={e => setNewPoll(p => ({ ...p, title: e.target.value }))}
                    className={`w-full p-2 text-xs rounded border font-bold ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500">ATURAN BATAS AKSES (HAK SUARA)</label>
                  <select
                    value={newPoll.eligibility}
                    onChange={e => setNewPoll(p => ({ ...p, eligibility: e.target.value }))}
                    className={`w-full p-2 rounded border font-bold ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'}`}
                  >
                    <option value="all_members">Satu Suara Per Seluruh Kader Anggota</option>
                    <option value="active_members_only">Khusus Anggota Status Aktif Sah</option>
                    <option value="board_only">Khusus Rapat Pleno Inti Dewan</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Pilihan 1 *"
                    value={newPoll.option1}
                    onChange={e => setNewPoll(p => ({ ...p, option1: e.target.value }))}
                    className={`w-full p-2 text-xs rounded border font-bold ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                  <input
                    type="text"
                    required
                    placeholder="Pilihan 2 *"
                    value={newPoll.option2}
                    onChange={e => setNewPoll(p => ({ ...p, option2: e.target.value }))}
                    className={`w-full p-2 text-xs rounded border font-bold ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                  <input
                    type="text"
                    placeholder="Opsi 3 (Opsional)"
                    value={newPoll.option3}
                    onChange={e => setNewPoll(p => ({ ...p, option3: e.target.value }))}
                    className={`w-full p-2 text-xs rounded border font-bold ${themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>
                <button type="submit" className={`w-full ${colorTheme.bg} ${colorTheme.bgHover} text-white p-2.5 rounded font-black uppercase transition-all duration-150 cursor-pointer`}>Buka Bilik Suara</button>
              </form>
            </div>

            {/* List and Results */}
            <div className={`border p-6 rounded-2xl shadow-xs space-y-4 overflow-y-auto ${themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <h4 className={`font-extrabold text-xs uppercase tracking-wider border-b pb-2 ${themeMode === 'light' ? 'text-slate-950 border-slate-100' : 'text-white border-slate-800'}`}>Active Elections Panel</h4>
              {polls.map((pl, idx) => (
                <div key={idx} className={`p-3 rounded-xl space-y-2 ${themeMode === 'light' ? 'bg-slate-50' : 'bg-slate-950/40'}`}>
                  <p className={`font-bold ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>{pl.title}</p>
                  <div className="font-mono text-[9.5px] text-slate-500 space-y-0.5">
                    {pl.options.map(o => <div key={o.id}>🔘 {o.label}: {o.votes} suara</div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FULL SYSTEM AUDIT LOG PANEL */}
      {adminMenu === 'logs' && (
        <div className="space-y-6">
          <div className="pb-2 border-b border-slate-200">
            <h2 className={`text-xl font-black ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>Audit Trail Pengurus & Keamanan Sistem</h2>
            <p className="text-xs text-slate-500">Mencatat pelacakan tindakan perubahan setting, approval iuran, maupun pengesahan e-sertifikat kompetensi.</p>
          </div>

          <div className={`border rounded-xl overflow-hidden text-xs ${themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            <div className="overflow-x-auto"><table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className={`font-bold border-b text-[10px] uppercase ${themeMode === 'light' ? 'bg-slate-50 border-slate-100 text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Nama Aktor</th>
                  <th className="p-4">Modul</th>
                  <th className="p-4">Tindakan Log</th>
                  <th className="p-4 text-center">IP Address</th>
                </tr>
              </thead>
              <tbody className={`divide-y font-semibold ${themeMode === 'light' ? 'divide-slate-200 text-slate-600' : 'divide-slate-800 text-slate-300'}`}>
                {logs.map(lg => (
                  <tr key={lg.id} className="hover:bg-slate-50/20">
                    <td className="p-4 font-mono text-slate-400 select-all">{lg.createdAt}</td>
                    <td className={`p-4 font-bold ${themeMode === 'light' ? 'text-slate-900' : 'text-white'}`}>{lg.userName}</td>
                    <td className="p-4"><span className={`px-2 py-0.5 rounded font-black text-[9.5px] ${themeMode === 'light' ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-300'}`}>{lg.module.toUpperCase()}</span></td>
                    <td className={`p-4 ${themeMode === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>{lg.action}</td>
                    <td className="p-4 text-center font-mono text-slate-400">{lg.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table></div>
          </div>
        </div>
      )}

      {/* ADMIN PROFILE MODULE */}
      {adminMenu === 'profile' && (
        <div className="space-y-6">
          <div className="pb-2 border-b border-slate-200">
            <h2 className={`text-xl font-black ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>Pengaturan Profil Admin</h2>
            <p className="text-xs text-slate-500">Kelola kredensial login, foto avatar, nama lengkap, dan setelan kata sandi pengurus utama.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-semibold text-xs">
            {/* Left side: Avatar Preview Card */}
            <div className={`border p-6 rounded-2xl shadow-xs text-center flex flex-col items-center justify-center space-y-4 ${
              themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="relative">
                <img
                  src={adminProfile.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 rounded-full border-4 border-amber-500/30 object-cover shadow-md"
                />
                <span className="absolute bottom-1 right-1 bg-amber-500 text-slate-950 p-1.5 rounded-full text-[10px] font-bold">✓</span>
              </div>
              <div className="space-y-1">
                <p className={`font-black text-sm ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>{adminProfile.name}</p>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">{adminProfile.email}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${colorTheme.badge}`}>
                Pengurus Utama (Super Admin)
              </span>
            </div>

            {/* Right side: Edit Profile Form */}
            <div className={`md:col-span-2 border p-6 rounded-2xl shadow-xs ${
              themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              <h3 className={`font-black text-sm mb-4 border-b pb-2 uppercase ${themeMode === 'light' ? 'text-slate-950 border-slate-100' : 'text-white border-slate-800'}`}>Formulir Perbaharui Kredensial</h3>
              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.target as any;
                  onUpdateAdminProfile({
                    name: target.adminName.value,
                    avatarUrl: target.adminAvatar.value,
                    email: target.adminEmail.value,
                    password: target.adminPass.value
                  });
                  alert('Profil admin berhasil diperbaharui!');
                }}
                className="space-y-4 font-semibold"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-500 uppercase tracking-wide text-[10px] font-black">Nama Lengkap Admin *</label>
                    <input
                      type="text"
                      name="adminName"
                      required
                      defaultValue={adminProfile.name}
                      className={`w-full p-2.5 text-xs font-bold rounded-xl border focus:outline-none transition-all ${
                        themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-500 uppercase tracking-wide text-[10px] font-black">Alamat Email Login *</label>
                    <input
                      type="email"
                      name="adminEmail"
                      required
                      defaultValue={adminProfile.email}
                      className={`w-full p-2.5 text-xs font-bold rounded-xl border focus:outline-none transition-all ${
                        themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 uppercase tracking-wide text-[10px] font-black">URL Foto Profil / Avatar</label>
                  <input
                    type="url"
                    name="adminAvatar"
                    placeholder="https://images.unsplash.com/... atau tautan gambar lainnya"
                    defaultValue={adminProfile.avatarUrl}
                    className={`w-full p-2.5 text-xs font-bold rounded-xl border focus:outline-none transition-all ${
                      themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                  />
                  <p className="text-[10px] text-slate-400 font-medium">Tempelkan tautan gambar Unsplash atau lainnya untuk mengganti foto profil Anda.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 uppercase tracking-wide text-[10px] font-black">Kata Sandi Baru *</label>
                  <input
                    type="text"
                    name="adminPass"
                    required
                    defaultValue={adminProfile.password || 'password123'}
                    className={`w-full p-2.5 text-xs font-bold rounded-xl border focus:outline-none transition-all ${
                      themeMode === 'light' ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                  />
                  <p className="text-[10px] text-slate-400 font-medium">Kata sandi baru ini akan digunakan untuk login admin berikutnya di portal otentikasi.</p>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl font-black uppercase text-xs text-white cursor-pointer shadow-md transition-all duration-150 ${colorTheme.bg} ${colorTheme.bgHover}`}
                >
                  SIMPAN PERUBAHAN PROFIL
                </button>
              </form>

              <div className={`mt-8 pt-6 border-t ${themeMode === 'light' ? 'border-slate-200' : 'border-slate-800'} text-center space-y-3`}>
                <div className="flex flex-col items-center gap-1">
                  <h4 className={`text-[11px] font-black uppercase tracking-wider ${themeMode === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>Sesi Administrasi</h4>
                  <p className="text-[10px] text-slate-400 font-semibold">Anda dapat keluar dari sesi administrator Anda saat ini di bawah ini.</p>
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
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
