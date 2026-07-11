/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle,
  Building,
  Award,
  BookOpen,
  Send,
  Calendar,
  Layers,
  FileText,
  UserCheck,
  Briefcase,
  TrendingUp,
  MapPin,
  Clock,
  ChevronRight,
  Download,
  Info,
  Phone,
  Mail,
  Check,
  X,
  Menu,
  AlertCircle,
  ShieldCheck,
  Users,
  Lightbulb,
  AlertTriangle,
  ChevronDown,
  Globe,
  Moon,
  Sun,
  Star,
  Play,
  Pause,
  RotateCcw,
  Laptop,
  Smartphone
} from 'lucide-react';
import {
  Member,
  Event,
  MembershipType,
  Document,
  JobOpportunity,
  Sponsor,
  Certificate,
  UserRole
} from '../types';
import { TranslationSet, translateText } from '../translations';

interface PublicProps {
  t: TranslationSet;
  lang: string;
  setLang: (lang: any) => void;
  themeStyle: any;
  themeMode?: 'light' | 'dark';
  setThemeMode: (mode: 'light' | 'dark') => void;
  members: Member[];
  events: Event[];
  membershipTypes: MembershipType[];
  documents: Document[];
  jobs: JobOpportunity[];
  sponsors: Sponsor[];
  certificates: Certificate[];
  onRegisterMember: (newMember: Partial<Member>) => void;
  onRegisterEvent: (eventId: string, email: string) => void;
  onSendPartnerInquiry: (inquiry: any) => void;
  currentRole: UserRole;
  navSection: 'public' | 'portal' | 'admin';
  setNavSection: (section: 'public' | 'portal' | 'admin') => void;
  onOpenAuthModal: () => void;
  loggedInMember: Member | null;
  onLogout: () => void;
}

const sponsorLogos: Record<string, string> = {
  sp1: '/src/assets/images/bank_nusantara_logo_1783654908120.jpg',
  sp2: '/src/assets/images/danarta_logo_1783654919954.jpg',
  sp3: '/src/assets/images/solusi_hr_logo_1783654931194.jpg',
  sp4: '/src/assets/images/media_indonesia_logo_1783654944992.jpg'
};

export default function PublicWebsite({
  t,
  lang,
  setLang,
  themeStyle,
  themeMode = 'light',
  setThemeMode,
  members,
  events,
  membershipTypes,
  documents,
  jobs,
  sponsors,
  certificates,
  onRegisterMember,
  onRegisterEvent,
  onSendPartnerInquiry,
  currentRole,
  navSection,
  setNavSection,
  onOpenAuthModal,
  loggedInMember,
  onLogout
}: PublicProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'membership' | 'directory' | 'events' | 'news' | 'documents' | 'opportunities' | 'partners' | 'certificates' | 'contact'>('home');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // States for Video Demo Simulation
  const [activeDemoTab, setActiveDemoTab] = useState<'desktop' | 'mobile'>('desktop');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentLogMessage, setCurrentLogMessage] = useState(t.demoStartMessage);

  React.useEffect(() => {
    let timer: any;
    if (isPlayingVideo) {
      timer = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            setIsPlayingVideo(false);
            setCurrentLogMessage(t.demoEndMessage);
            return 100;
          }
          const next = prev + 5;
          if (next < 20) {
            setCurrentLogMessage(t.demoLog1);
          } else if (next < 40) {
            setCurrentLogMessage(t.demoLog2);
          } else if (next < 60) {
            setCurrentLogMessage(t.demoLog3);
          } else if (next < 80) {
            setCurrentLogMessage(t.demoLog4);
          } else if (next < 95) {
            setCurrentLogMessage(t.demoLog5);
          } else {
            setCurrentLogMessage(t.demoLog6);
          }
          return next;
        });
      }, 250);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPlayingVideo, t]);

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

    const themeHoverBorderMap: Record<string, string> = {
      amber: 'hover:border-amber-500/80',
      emerald: 'hover:border-emerald-500/80',
      orange: 'hover:border-orange-500/80',
      pink: 'hover:border-pink-500/80',
      sky: 'hover:border-sky-500/80',
      yellow: 'hover:border-yellow-500/80',
      red: 'hover:border-red-500/80',
      blue: 'hover:border-blue-500/80',
      indigo: 'hover:border-indigo-500/80'
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

    const themeSelectedBorderLightMap: Record<string, string> = {
      amber: 'border-amber-300',
      emerald: 'border-emerald-300',
      orange: 'border-orange-300',
      pink: 'border-pink-300',
      sky: 'border-sky-300',
      yellow: 'border-yellow-300',
      red: 'border-red-300',
      blue: 'border-blue-300',
      indigo: 'border-indigo-300'
    };

    const themeSelectedRingLightMap: Record<string, string> = {
      amber: 'ring-amber-500/15',
      emerald: 'ring-emerald-500/15',
      orange: 'ring-orange-500/15',
      pink: 'ring-pink-500/15',
      sky: 'ring-sky-500/15',
      yellow: 'ring-yellow-500/15',
      red: 'ring-red-500/15',
      blue: 'ring-blue-500/15',
      indigo: 'ring-indigo-500/15'
    };

    const themeSelectedBorderDarkMap: Record<string, string> = {
      amber: 'border-amber-800/80',
      emerald: 'border-emerald-800/80',
      orange: 'border-orange-800/80',
      pink: 'border-pink-800/80',
      sky: 'border-sky-800/80',
      yellow: 'border-yellow-800/80',
      red: 'border-red-800/80',
      blue: 'border-blue-800/80',
      indigo: 'border-indigo-800/80'
    };

    const themeSelectedRingDarkMap: Record<string, string> = {
      amber: 'ring-amber-500/20',
      emerald: 'ring-emerald-500/20',
      orange: 'ring-orange-500/20',
      pink: 'ring-pink-500/20',
      sky: 'ring-sky-500/20',
      yellow: 'ring-yellow-500/20',
      red: 'ring-red-500/20',
      blue: 'ring-blue-500/20',
      indigo: 'ring-indigo-500/20'
    };

    const themeHoverBorderLightMap: Record<string, string> = {
      amber: 'hover:border-amber-300',
      emerald: 'hover:border-emerald-300',
      orange: 'hover:border-orange-300',
      pink: 'hover:border-pink-300',
      sky: 'hover:border-sky-300',
      yellow: 'hover:border-yellow-300',
      red: 'hover:border-red-300',
      blue: 'hover:border-blue-300',
      indigo: 'hover:border-indigo-300'
    };

    const themeHoverBorderDarkMap: Record<string, string> = {
      amber: 'dark:hover:border-amber-700/80',
      emerald: 'dark:hover:border-emerald-700/80',
      orange: 'dark:hover:border-orange-700/80',
      pink: 'dark:hover:border-pink-700/80',
      sky: 'dark:hover:border-sky-700/80',
      yellow: 'dark:hover:border-yellow-700/80',
      red: 'dark:hover:border-red-700/80',
      blue: 'dark:hover:border-blue-700/80',
      indigo: 'dark:hover:border-indigo-700/80'
    };

    return {
      name,
      bg: themeBgMap[name] || 'bg-amber-500',
      bgHover: themeBgHoverMap[name] || 'hover:bg-amber-600',
      text: themeTextMap[name] || 'text-amber-500',
      textDark: themeTextDarkMap[name] || 'text-amber-700 dark:text-amber-400',
      textHover: themeTextHoverMap[name] || 'hover:text-amber-600',
      border: themeBorderMap[name] || 'border-amber-500',
      hoverBorder: themeHoverBorderMap[name] || 'hover:border-amber-500/80',
      borderFocus: themeFocusBorderMap[name] || 'focus:border-amber-500 focus:ring-amber-500/20',
      lightBg: themeLightBgMap[name] || 'bg-amber-500/10',
      badge: themeBadgeMap[name] || 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
      selectedBorderLight: themeSelectedBorderLightMap[name] || 'border-amber-300',
      selectedRingLight: themeSelectedRingLightMap[name] || 'ring-amber-500/15',
      selectedBorderDark: themeSelectedBorderDarkMap[name] || 'border-amber-800/80',
      selectedRingDark: themeSelectedRingDarkMap[name] || 'ring-amber-500/20',
      hoverBorderLight: themeHoverBorderLightMap[name] || 'hover:border-amber-300',
      hoverBorderDark: themeHoverBorderDarkMap[name] || 'dark:hover:border-amber-700/80',
      groupHoverText: (themeTextHoverMap[name] || 'hover:text-amber-600').replace('hover:', 'group-hover:')
    };
  };

  const colorTheme = getColorTheme(themeStyle?.accent);
  
  // States for search and filter
  const [dirSearch, setDirSearch] = useState('');
  const [dirIndustry, setDirIndustry] = useState('All');
  const [dirLocation, setDirLocation] = useState('All');
  const [docSearch, setDocSearch] = useState('');
  const [docCategory, setDocCategory] = useState('All');
  const [oppCategory, setOppCategory] = useState('All');
  
  // Form states
  const [assocRegisterForm, setAssocRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    membershipTypeId: 'professional-member',
    organizationName: '',
    profession: '',
    industry: '',
    city: '',
    province: '',
    bio: ''
  });
  const [regSuccess, setRegSuccess] = useState(false);
  const [regTicketSuccess, setRegTicketSuccess] = useState(false);
  const [regEventEmail, setRegEventEmail] = useState('');

  // Partner inquiry form state
  const [partnerForm, setPartnerForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    interestType: 'Corporate Partnership',
    message: ''
  });
  const [partnerSuccess, setPartnerSuccess] = useState(false);

  // Certificate verify state
  const [verifyCertNo, setVerifyCertNo] = useState('');
  const [verifiedCertResult, setVerifiedCertResult] = useState<Certificate | null | undefined>(undefined);

  // Scroll to section function
  const scrollToSection = (id: string) => {
    setActiveTab(id as any);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Track scroll position to update active navbar link
  React.useEffect(() => {
    let isScrolling = false;
    const handleScroll = () => {
      if (isScrolling) return;
      isScrolling = true;
      requestAnimationFrame(() => {
        const sections = [
          'home',
          'about',
          'membership',
          'directory',
          'events',
          'news',
          'documents',
          'opportunities',
          'partners',
          'certificates',
          'contact'
        ];
        
        // Offset for sticky navbar + some breathing room
        const scrollPosition = window.scrollY + 140;

        for (let i = sections.length - 1; i >= 0; i--) {
          const id = sections[i];
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            if (scrollPosition >= top) {
              setActiveTab(id as any);
              break;
            }
          }
        }
        isScrolling = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter lists
  const industries = ['All', ...new Set(members.filter(m => m.status === 'active' || m.status === 'lifetime').map(m => m.industry))];
  const locations = ['All', ...new Set(members.filter(m => m.status === 'active' || m.status === 'lifetime').map(m => m.city))];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assocRegisterForm.name || !assocRegisterForm.email || !assocRegisterForm.phone) {
      alert('Tolong isi nama lengkap, email, dan telepon seluler.');
      return;
    }
    onRegisterMember(assocRegisterForm);
    setRegSuccess(true);
    setTimeout(() => {
      setAssocRegisterForm({
        name: '',
        email: '',
        phone: '',
        membershipTypeId: 'professional-member',
        organizationName: '',
        profession: '',
        industry: '',
        city: '',
        province: '',
        bio: ''
      });
      setRegSuccess(false);
      setActiveTab('home');
    }, 4000);
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.companyName || !partnerForm.contactName || !partnerForm.email) {
      alert('Tolong isi Nama Perusahaan, Kontak Person, dan Alamat Email.');
      return;
    }
    onSendPartnerInquiry(partnerForm);
    setPartnerSuccess(true);
    setTimeout(() => {
      setPartnerForm({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        interestType: 'Corporate Partnership',
        message: ''
      });
      setPartnerSuccess(false);
    }, 4500);
  };

  const handleVerifyCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNo = verifyCertNo.trim().toUpperCase();
    const found = certificates.find(c => c.certificateNumber.toUpperCase() === cleanNo);
    setVerifiedCertResult(found || null);
  };

  const handleRegisterEventAction = (eventId: string) => {
    if (!regEventEmail) {
      alert('Tolong masukkan email Anda.');
      return;
    }
    onRegisterEvent(eventId, regEventEmail);
    setRegTicketSuccess(true);
    setTimeout(() => {
      setRegTicketSuccess(false);
      setRegEventEmail('');
    }, 3500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* SINGLE UNIFIED PREMIUM NAVBAR */}
      <header className={`sticky top-0 z-50 transition-colors duration-300 ${
        themeMode === 'light'
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 text-black shadow-md'
          : `${themeStyle.navbar}/95 backdrop-blur-md border-b border-slate-800/60 shadow-md`
      } py-3 px-4 sm:px-6 select-none`}>
        <div className="max-w-7xl mx-auto">
          {/* DESKTOP HEADER (lg and above) */}
          <div className="hidden lg:flex items-center justify-between gap-4">
            {/* Logo & Brand */}
            <div className="flex items-center gap-2.5 shrink-0 select-none cursor-pointer" onClick={() => { scrollToSection('home'); setSelectedEvent(null); }}>
              <svg viewBox="0 0 100 100" className="w-9 h-9 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer circular swooshes */}
                <path d="M 50,5 A 45,45 0 0,0 15,75" stroke="#0284c7" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                <path d="M 85,30 A 45,45 0 0,1 50,95 A 45,45 0 0,1 35,92" stroke="#d97706" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                
                {/* Stylized 'A' shape */}
                <path d="M 50,15 L 18,80 L 32,80 L 50,44 L 68,80 L 82,80 Z" fill={themeMode === 'light' ? '#000000' : '#f8fafc'} />
                
                {/* People figures inside */}
                <circle cx="39" cy="55" r="5" fill="#d97706" />
                <path d="M 34,65 C 34,60 44,60 44,65 L 44,78 L 34,78 Z" fill="#d97706" />
                
                <circle cx="50" cy="51" r="5.5" fill="#0284c7" />
                <path d="M 44.5,62 C 44.5,56.5 55.5,56.5 55.5,62 L 55.5,78 L 44.5,78 Z" fill="#0284c7" />
                
                <circle cx="61" cy="55" r="5" fill="#d97706" />
                <path d="M 56,65 C 56,60 66,60 66,65 L 66,78 L 56,78 Z" fill="#d97706" />
              </svg>
              <div>
                <span className={`font-black text-xs sm:text-[13px] uppercase tracking-tight block ${colorTheme.textDark}`}>{t.appName}</span>
                <span className={`text-[8.5px] font-extrabold uppercase tracking-widest ${themeMode === 'light' ? 'text-black' : 'text-slate-400'}`}>{themeStyle.name || 'APN'}</span>
              </div>
            </div>

            {/* Nav Tabs */}
            <div className="flex flex-row items-center gap-2">
              {/* Scrollable Area */}
              <div className="flex flex-row items-center gap-1 py-1">
                {[
                  { id: 'home', label: t.home },
                  { id: 'about', label: t.aboutUs },
                  { id: 'membership', label: t.membershipBenefit },
                  { id: 'events', label: t.upcomingEvents },
                  { id: 'news', label: t.newsAndArticles },
                  { id: 'contact', label: t.contactUs }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setSelectedEvent(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all font-black text-[11px] cursor-pointer shrink-0 ${
                      activeTab === item.id
                        ? themeMode === 'light'
                          ? 'bg-slate-200/80 text-black border border-slate-300 shadow-xs'
                          : `${colorTheme.bg} text-white shadow-xs`
                        : 'text-black dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/55'
                    }`}
                    style={themeMode === 'light' ? { color: '#000000' } : undefined}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Dropdown for Lainnya */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`px-3 py-1.5 rounded-lg transition-all font-black text-[11px] cursor-pointer inline-flex items-center gap-1 shrink-0 ${
                    ['directory', 'documents', 'opportunities', 'partners', 'certificates'].includes(activeTab)
                      ? themeMode === 'light'
                        ? 'bg-slate-200/80 text-black border border-slate-300 shadow-xs'
                        : `${colorTheme.bg} text-white shadow-xs`
                      : 'text-black dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/55'
                  }`}
                  style={themeMode === 'light' ? { color: '#000000' } : undefined}
                >
                  {t.others} <ChevronDown className="w-3 h-3" style={themeMode === 'light' ? { color: '#000000' } : undefined} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-48 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-lg py-1 z-50 animate-fade-in">
                    {[
                      { id: 'directory', label: t.memberDirectory },
                      { id: 'documents', label: t.documentLibrary },
                      { id: 'opportunities', label: t.opportunities },
                      { id: 'partners', label: t.sponsorsAndPartners },
                      { id: 'certificates', label: t.eCertVerify }
                    ].map(subItem => (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          scrollToSection(subItem.id);
                          setSelectedEvent(null);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-black transition-all cursor-pointer block ${
                          activeTab === subItem.id
                            ? `${themeMode === 'light' ? 'text-black font-black' : colorTheme.text} bg-slate-50 dark:bg-slate-900`
                            : 'text-black dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-black dark:hover:text-white'
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Controls Right */}
            <div className="flex items-center gap-3">
              {/* Grouped Language & Theme */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Language Selector */}
                <div className={`flex items-center gap-1.5 p-1.5 px-2.5 rounded-xl border text-[11px] font-black shadow-xs transition-all ${
                  themeMode === 'light'
                    ? 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-black'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/60 text-slate-200'
                }`}>
                  <Globe className={`w-3.5 h-3.5 ${themeMode === 'light' ? 'text-black' : 'text-slate-400'}`} />
                  <select
                    value={lang}
                    onChange={e => setLang(e.target.value as any)}
                    className={`bg-transparent focus:outline-none font-black pr-1 border-none cursor-pointer uppercase text-[10.5px] ${
                      themeMode === 'light' ? 'text-black' : 'text-slate-200'
                    }`}
                  >
                    <option value="id" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white">ID</option>
                    <option value="en" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white">EN</option>
                    <option value="ar" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white">AR</option>
                    <option value="zh" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white">ZH</option>
                    <option value="ja" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white">JA</option>
                  </select>
                </div>

                {/* Light/Dark Toggle */}
                <button
                  onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
                  className={`p-1.5 px-2.5 rounded-xl border cursor-pointer shadow-xs transition-all ${
                    themeMode === 'light'
                      ? 'bg-slate-50 hover:bg-slate-100 text-black border-slate-300'
                      : 'bg-slate-900 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800/50'
                  }`}
                >
                  {themeMode === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Portal Action / Guest Buttons */}
              {loggedInMember ? (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-slate-500 max-w-[80px] truncate">
                    {loggedInMember.name}
                  </span>
                  <button
                    onClick={() => setNavSection('portal')}
                    className={`font-extrabold px-3.5 py-1.5 rounded-lg shadow-xs text-[10.5px] cursor-pointer tracking-wide uppercase shrink-0 transition-all ${
                      themeMode === 'light'
                        ? 'bg-slate-100 hover:bg-slate-200 text-black border border-slate-300'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {t.myPortal}
                  </button>
                  <button
                    onClick={onLogout}
                    className="font-extrabold px-3 py-1.5 rounded-lg text-[10.5px] cursor-pointer uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white transition-all"
                  >
                    Keluar
                  </button>
                </div>
              ) : currentRole === 'super_admin' ? (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-amber-500">Admin</span>
                  <button
                    onClick={() => setNavSection('admin')}
                    className={`font-extrabold px-3.5 py-1.5 rounded-lg shadow-xs text-[10.5px] cursor-pointer tracking-wide uppercase shrink-0 transition-all ${
                      themeMode === 'light'
                        ? 'bg-slate-100 hover:bg-slate-200 text-black border border-slate-300'
                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                    }`}
                  >
                    {t.mgmtDashboard}
                  </button>
                  <button
                    onClick={onLogout}
                    className="font-extrabold px-3 py-1.5 rounded-lg text-[10.5px] cursor-pointer uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white transition-all"
                  >
                    Keluar
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {/* MOBILE HEADER (below lg) */}
          <div className="flex lg:hidden items-center justify-between">
            {/* Logo & Brand Left */}
            <div className="flex items-center gap-2 select-none" onClick={() => { scrollToSection('home'); setSelectedEvent(null); setIsMobileMenuOpen(false); }}>
              <svg viewBox="0 0 100 100" className="w-8 h-8 drop-shadow-sm shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer circular swooshes */}
                <path d="M 50,5 A 45,45 0 0,0 15,75" stroke="#0284c7" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                <path d="M 85,30 A 45,45 0 0,1 50,95 A 45,45 0 0,1 35,92" stroke="#d97706" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                
                {/* Stylized 'A' shape */}
                <path d="M 50,15 L 18,80 L 32,80 L 50,44 L 68,80 L 82,80 Z" fill={themeMode === 'light' ? '#000000' : '#f8fafc'} />
                
                {/* People figures inside */}
                <circle cx="39" cy="55" r="5" fill="#d97706" />
                <path d="M 34,65 C 34,60 44,60 44,65 L 44,78 L 34,78 Z" fill="#d97706" />
                
                <circle cx="50" cy="51" r="5.5" fill="#0284c7" />
                <path d="M 44.5,62 C 44.5,56.5 55.5,56.5 55.5,62 L 55.5,78 L 44.5,78 Z" fill="#0284c7" />
                
                <circle cx="61" cy="55" r="5" fill="#d97706" />
                <path d="M 56,65 C 56,60 66,60 66,65 L 66,78 L 56,78 Z" fill="#d97706" />
              </svg>
              <div>
                <span className={`font-black text-[11px] uppercase tracking-tight block ${colorTheme.textDark}`}>{t.appName}</span>
                <span className={`text-[8px] font-extrabold uppercase tracking-widest ${themeMode === 'light' ? 'text-black/80' : 'text-slate-400'}`}>{themeStyle.name || 'APN'}</span>
              </div>
            </div>

            {/* Quick Actions Right (Theme and Hamburger) */}
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className={`flex items-center gap-1 p-2 px-2.5 rounded-xl border text-xs font-black shadow-xs transition-all shrink-0 ${
                themeMode === 'light'
                  ? 'bg-slate-50 border-slate-200 text-black'
                  : 'bg-slate-900 border-slate-800 text-slate-200'
              }`}>
                <Globe className={`w-3.5 h-3.5 shrink-0 ${themeMode === 'light' ? 'text-black' : 'text-slate-400'}`} />
                <select
                  value={lang}
                  onChange={e => setLang(e.target.value as any)}
                  className={`bg-transparent focus:outline-none font-black pr-0.5 border-none cursor-pointer uppercase text-[11px] ${
                    themeMode === 'light' ? 'text-black' : 'text-slate-200'
                  }`}
                >
                  <option value="id" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white">ID</option>
                  <option value="en" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white">EN</option>
                  <option value="ar" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white">AR</option>
                  <option value="zh" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white">ZH</option>
                  <option value="ja" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white">JA</option>
                </select>
              </div>

              {/* Theme Selector */}
              <button
                onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
                className={`p-2.5 rounded-xl border cursor-pointer shadow-xs transition-all shrink-0 ${
                  themeMode === 'light'
                    ? 'bg-slate-50 border-slate-200 text-black active:bg-slate-100'
                    : 'bg-slate-900 border-slate-800 text-slate-400 active:bg-slate-800'
                }`}
                aria-label="Toggle Theme"
              >
                {themeMode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>

              {/* Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2.5 rounded-xl border cursor-pointer shadow-xs transition-all shrink-0 ${
                  isMobileMenuOpen
                    ? themeMode === 'light'
                      ? 'bg-amber-500/10 border-amber-300 text-amber-600'
                      : 'bg-amber-500/20 border-amber-800/80 text-amber-400'
                    : themeMode === 'light'
                    ? 'bg-slate-50 border-slate-200 text-black active:bg-slate-100'
                    : 'bg-slate-900 border-slate-800 text-slate-200 active:bg-slate-800'
                }`}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* MOBILE DROPDOWN DRAWER */}
          {isMobileMenuOpen && (
            <div className={`lg:hidden mt-3 pt-3 border-t overflow-hidden transition-all duration-300 ease-in-out ${
              themeMode === 'light' ? 'border-slate-100' : 'border-slate-800/60'
            }`}>
              {/* Navigation Items list with icons */}
              <div className="flex flex-col gap-1 mb-4">
                {[
                  { id: 'home', label: t.home, icon: '🏠' },
                  { id: 'about', label: t.aboutUs, icon: '💡' },
                  { id: 'membership', label: t.membershipBenefit, icon: '⭐' },
                  { id: 'events', label: t.upcomingEvents, icon: '📅' },
                  { id: 'news', label: t.newsAndArticles, icon: '📰' },
                  { id: 'directory', label: t.memberDirectory, icon: '👥' },
                  { id: 'documents', label: t.documentLibrary, icon: '📁' },
                  { id: 'opportunities', label: t.opportunities, icon: '💼' },
                  { id: 'partners', label: t.sponsorsAndPartners, icon: '🤝' },
                  { id: 'certificates', label: t.eCertVerify, icon: '🛡️' },
                  { id: 'contact', label: t.contactUs, icon: '📞' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setSelectedEvent(null);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-3 rounded-xl transition-all font-black text-xs flex items-center justify-between cursor-pointer ${
                      activeTab === item.id
                        ? themeMode === 'light'
                          ? 'bg-amber-500/10 text-amber-700 font-bold border border-amber-200 shadow-xs'
                          : `${colorTheme.lightBg} ${colorTheme.text} border border-amber-500/20 shadow-xs`
                        : themeMode === 'light'
                        ? 'text-slate-800 hover:bg-slate-50'
                        : 'text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-sm">{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
                    {activeTab === item.id && (
                      <span className={`w-1.5 h-1.5 rounded-full ${colorTheme.bg}`}></span>
                    )}
                  </button>
                ))}
              </div>

              {/* Portal / Admin Actions for Mobile */}
              {loggedInMember ? (
                <div className="space-y-2 mt-2">
                  <div className={`p-3 rounded-xl border text-center font-bold text-xs ${
                    themeMode === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-200'
                  }`}>
                    👤 {loggedInMember.name} (Anggota)
                  </div>
                  <button
                    onClick={() => {
                      setNavSection('portal');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wide cursor-pointer text-center shadow-xs transition-all bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                  >
                    👤 {t.myPortal}
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wide cursor-pointer text-center shadow-xs transition-all bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
                  >
                    🚪 Keluar / Logout
                  </button>
                </div>
              ) : currentRole === 'super_admin' ? (
                <div className="space-y-2 mt-2">
                  <div className={`p-3 rounded-xl border text-center font-bold text-xs ${
                    themeMode === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-200'
                  }`}>
                    💼 Super Admin
                  </div>
                  <button
                    onClick={() => {
                      setNavSection('admin');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wide cursor-pointer text-center shadow-xs transition-all bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2"
                  >
                    💼 {t.mgmtDashboard}
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wide cursor-pointer text-center shadow-xs transition-all bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
                  >
                    🚪 Keluar / Logout
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </header>

      {/* Primary Landing Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-24">
        {/* HOME SECTION */}
        <section id="home" className="scroll-mt-24 space-y-12">
            {/* HERO SECTION */}
            <div className={`relative rounded-2xl overflow-hidden ${
              themeMode === 'light'
                ? 'bg-white text-slate-800 border border-slate-200 shadow-xs'
                : 'bg-slate-950 text-white'
            } py-16 px-6 sm:px-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-10`}>
              <div className={`absolute inset-0 ${
                themeMode === 'light'
                  ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-slate-50/80 to-slate-50/20 opacity-65'
                  : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-slate-950 to-slate-950 opacity-90'
              } z-0`}></div>
              <img
                src="/src/assets/images/hero_association_1783654893139.jpg"
                alt="Ecosystem Background"
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-500 ${
                  themeMode === 'light' ? 'opacity-[0.12] grayscale' : 'opacity-[0.15]'
                } mix-blend-overlay`}
              />
              <div className="relative z-10 max-w-2xl space-y-6">
                <span className={`${colorTheme.badge} px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase inline-block`}>
                  ⭐ {t.organizationName}
                </span>
                <h1 className={`text-3.5xl sm:text-5xl font-black tracking-tight leading-tight ${
                  themeMode === 'light' ? 'text-slate-950' : 'text-white'
                }`}>
                  {t.organizationName}
                </h1>
                <p className={`${themeMode === 'light' ? 'text-slate-600 font-semibold' : 'text-slate-300'} text-sm sm:text-base leading-relaxed max-w-xl`}>
                  {t.heroSubTitle}
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
                  <button
                    onClick={() => scrollToSection('membership')}
                    className={`${colorTheme.bg} ${colorTheme.bgHover} text-white px-6 py-3 rounded-xl font-extrabold shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wide cursor-pointer w-full sm:w-auto`}
                  >
                    {t.joinMembership} <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollToSection('about')}
                    className={`${
                      themeMode === 'light'
                        ? 'bg-slate-100 hover:bg-amber-50 text-slate-800 border border-slate-200 hover:border-amber-300'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/30'
                    } px-6 py-3 rounded-xl font-bold transition-all text-xs uppercase tracking-wide cursor-pointer w-full sm:w-auto text-center flex items-center justify-center`}
                  >
                    {t.aboutUs}
                  </button>
                </div>
              </div>
              <div className={`relative z-10 w-full md:w-auto flex flex-col gap-4 ${
                themeMode === 'light'
                  ? 'bg-slate-50 text-slate-800 border-slate-200 shadow-xs'
                  : 'bg-[#0c1222]/90 backdrop-blur-md border-slate-800'
              } p-6 rounded-2xl border shadow-xl max-w-sm shrink-0`}>
                <div className={`flex items-center gap-3 border-b ${themeMode === 'light' ? 'border-slate-200' : 'border-slate-800'} pb-3`}>
                  <Award className={`w-5 h-5 ${colorTheme.text} shrink-0`} />
                  <span className={`font-extrabold text-xs ${themeMode === 'light' ? 'text-slate-800' : 'text-slate-200'} tracking-wider`}>{t.latestAnnouncements}</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className={`p-3 rounded-xl ${
                    themeMode === 'light'
                      ? 'bg-white hover:bg-slate-100/60 border-slate-200/80 text-slate-800'
                      : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800/40'
                  } transition-all border`}>
                    <p className={`font-bold ${colorTheme.text} mb-1`}>{t.apnNationalAssembly}</p>
                    <p className={`${themeMode === 'light' ? 'text-slate-600 font-medium' : 'text-slate-400'} leading-relaxed text-[11px]`}>{t.assemblyRegistrationInfo}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${
                    themeMode === 'light'
                      ? 'bg-white hover:bg-slate-100/60 border-slate-200/80 text-slate-800'
                      : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800/40'
                  } transition-all border`}>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">{t.competencyCertification}</p>
                    <p className={`${themeMode === 'light' ? 'text-slate-600 font-medium' : 'text-slate-400'} leading-relaxed text-[11px]`}>{t.workshopInfo}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* IMPACT STATISTICS */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {[
                { label: t.statsActiveMembers, value: '4,280+' },
                { label: t.statsEventsHeld, value: '186' },
                { label: t.statsCertificatesIssued, value: '12,450+' },
                { label: t.statsStrategicPartners, value: '72' },
                { label: t.statsRegionalChapters, value: '18' },
                { label: t.statsBusinessOppShared, value: '640+' }
              ].map((stat, idx) => (
                <div key={idx} className={`${
                  themeMode === 'light'
                    ? 'bg-white border-slate-200/80 shadow-xs'
                    : 'bg-[#0c1222]/60 border-slate-800'
                } p-5 rounded-2xl border text-center transition-transform hover:-translate-y-0.5 duration-250`}>
                  <div className={`text-2.5xl sm:text-3xl font-black ${colorTheme.text}`}>{stat.value}</div>
                  <div className={`text-[10px] sm:text-xs font-bold mt-1 uppercase tracking-wider ${
                    themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* UPCOMING EXHIBITS BRIEF */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className={`flex justify-between items-center pb-2 border-b ${
                  themeMode === 'light' ? 'border-slate-200' : 'border-slate-800'
                }`}>
                  <h2 className={`text-xl font-black tracking-tight flex items-center gap-2 ${
                    themeMode === 'light' ? 'text-slate-900' : 'text-white'
                  }`}>
                    <Calendar className={`w-5.5 h-5.5 ${colorTheme.text}`} /> {t.upcomingAssociationEvents}
                  </h2>
                  <button onClick={() => scrollToSection('events')} className={`text-xs font-extrabold ${colorTheme.text} flex items-center gap-1 hover:underline cursor-pointer`}>
                    {t.allEvents} <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {events.slice(0, 2).map((evt) => (
                    <div key={evt.id} className={`border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between ${
                      themeMode === 'light'
                        ? 'bg-white border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700/60'
                    }`}>
                      <div>
                        <span className={`inline-block text-[10px] uppercase font-black tracking-wider px-3.5 py-1.5 rounded-full mb-4 border border-indigo-100/20 ${
                          evt.category === 'Conference' || evt.category === 'Training'
                            ? (themeMode === 'light'
                                ? 'bg-purple-100 text-purple-600'
                                : 'bg-purple-950/40 text-purple-400'
                              )
                            : (themeMode === 'light'
                                ? 'bg-indigo-100/70 text-indigo-600'
                                : 'bg-indigo-950/40 text-indigo-400'
                              )
                        }`}>
                          {evt.category}
                        </span>
                        <h3 className={`font-black text-lg sm:text-[19px] tracking-tight leading-snug transition-colors cursor-pointer ${
                          themeMode === 'light' ? 'text-black' : 'text-white'
                        } ${colorTheme.textHover}`}
                          onClick={() => { setSelectedEvent(evt); scrollToSection('events'); }}
                        >
                          {lang !== 'id' && evt.id === 'e1' ? t.summitTitle : lang !== 'id' && evt.id === 'e2' ? t.trainingTitle : evt.title}
                        </h3>
                        <p className={`text-xs sm:text-[13px] mt-3 leading-relaxed font-semibold ${
                          themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          {lang !== 'id' && evt.id === 'e1' ? t.summitDesc : lang !== 'id' && evt.id === 'e2' ? t.trainingDesc : evt.description}
                        </p>
                      </div>
                      <div className={`mt-6 pt-5 border-t ${
                        themeMode === 'light' ? 'border-slate-100' : 'border-slate-800'
                      } flex items-center justify-between text-xs gap-2`}>
                        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-bold truncate max-w-[65%]" title={evt.location}>
                          <MapPin className="w-4 h-4 text-slate-400 shrink-0" /> {lang !== 'id' && evt.id === 'e1' ? t.summitVenue : lang !== 'id' && evt.id === 'e2' ? t.trainingVenue : evt.location}
                        </span>
                        <button
                          onClick={() => { setSelectedEvent(evt); scrollToSection('events'); }}
                          className="px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer bg-[#ff9800] hover:bg-[#f57c00] active:scale-95 text-white shadow-xs hover:scale-105 shrink-0"
                        >
                          {t.register}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WHY JOIN US BRIEF CARD */}
              <div className={`rounded-2xl p-6 border flex flex-col justify-between ${
                themeMode === 'light'
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-[#0c1222]/60 border-slate-800 shadow-sm'
              }`}>
                <div className="space-y-4">
                  <h3 className={`text-base font-black tracking-tight uppercase border-b pb-2 flex items-center gap-2 ${
                    themeMode === 'light' ? 'border-slate-100 text-slate-950' : 'border-slate-800 text-white'
                  }`}>
                    <CheckCircle className={`w-4.5 h-4.5 ${colorTheme.text} shrink-0`} /> {t.whyJoinUs}
                  </h3>
                  <div className={`space-y-3.5 text-xs font-semibold leading-relaxed ${
                    themeMode === 'light' ? 'text-slate-700 font-medium' : 'text-slate-300'
                  }`}>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className={`w-4.5 h-4.5 ${colorTheme.text} shrink-0 mt-0.5`} />
                      <span>{t.memberVerificationInfo}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className={`w-4.5 h-4.5 ${colorTheme.text} shrink-0 mt-0.5`} />
                      <span>{t.antiCounterfeitCertInfo}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className={`w-4.5 h-4.5 ${colorTheme.text} shrink-0 mt-0.5`} />
                      <span>{t.internalDocAccessInfo}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className={`w-4.5 h-4.5 ${colorTheme.text} shrink-0 mt-0.5`} />
                      <span>{t.priorityJobInfo}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => scrollToSection('membership')}
                  className={`w-full py-3 rounded-xl font-extrabold text-xs mt-6 transition-all uppercase tracking-wider cursor-pointer ${colorTheme.bg} ${colorTheme.bgHover} text-white`}
                >
                  {t.viewPlansAndDues}
                </button>
              </div>
            </div>

            {/* PREVIEW OF SPONSORS */}
            <div className={`pt-8 border-t ${
              themeMode === 'light' ? 'border-slate-200' : 'border-slate-800'
            } text-center`}>
              <p className={`text-[10px] font-black uppercase tracking-wider md:tracking-widest mb-6 px-4 max-w-2xl mx-auto leading-relaxed ${
                themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {t.developedWithPartners}
              </p>
              <div className="flex flex-row flex-nowrap overflow-x-auto scrollbar-none items-center justify-start md:justify-center gap-4 sm:gap-6 opacity-95 select-none pb-3 px-4">
                {sponsors.map(sp => {
                  const logoUrl = sponsorLogos[sp.id];
                  return (
                    <div
                      key={sp.id}
                      className={`flex flex-col items-center p-3.5 px-6 rounded-2xl border shrink-0 hover:scale-105 transition-all duration-300 shadow-xs cursor-default ${
                        themeMode === 'light'
                          ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
                          : 'bg-slate-900/40 hover:bg-slate-800 border-slate-800/80'
                      }`}
                    >
                      {logoUrl && (
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200/60 dark:border-slate-750 bg-white p-0.5 mb-2.5 flex items-center justify-center shrink-0 shadow-xs">
                          <img
                            src={logoUrl}
                            alt={`${sp.name} Logo`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain rounded-full"
                          />
                        </div>
                      )}
                      <span className={`text-xs font-black tracking-wide uppercase flex items-center gap-1.5 ${
                        themeMode === 'light' ? 'text-slate-800' : 'text-slate-200'
                      }`}>
                        {!logoUrl && <span className="text-amber-500 text-[10px]">💎</span>} {sp.name}
                      </span>
                      <span className={`text-[9px] font-black ${colorTheme.text} uppercase mt-1 tracking-wider`}>
                        {sp.packageType}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

        {/* SECTION MASALAH & SOLUSI */}
        <section id="masalah-solusi" className="scroll-mt-24 pt-16 border-t border-slate-200/60 dark:border-slate-800/80 space-y-12">
          <div className="text-center space-y-4">
            <span className="inline-block bg-red-500/10 text-red-600 dark:text-red-400 px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase border border-red-500/20">
              TANTANGAN & TRANSFORMASI
            </span>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>
              {t.classicIssuesSolutionsTitle || "Masalah Klasik Asosiasi & Solusi Modern Kami"}
            </h2>
            <p className={`max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-semibold ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
              {t.classicIssuesSolutionsDesc || "Mengapa sistem pengelolaan konvensional menghambat laju perkembangan organisasi, dan bagaimana platform kami menyelesaikannya secara instan."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* MASALAH - STYLE MERAH */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 shadow-md flex flex-col justify-between ${
              themeMode === 'light'
                ? 'bg-red-50/50 border-red-100 text-slate-800'
                : 'bg-red-950/10 border-red-900/30 text-slate-200'
            }`}>
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-red-200/40 dark:border-red-900/25">
                  <div className="p-2.5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-red-700 dark:text-red-400">{t.mainIssuesTitle}</h3>
                    <p className="text-[11px] text-red-600/80 dark:text-red-400/60 font-semibold">{t.mainIssuesDesc}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      title: t.issueTitle1,
                      desc: t.issueDesc1
                    },
                    {
                      title: t.issueTitle2,
                      desc: t.issueDesc2
                    },
                    {
                      title: t.issueTitle3,
                      desc: t.issueDesc3
                    },
                    {
                      title: t.issueTitle4,
                      desc: t.issueDesc4
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3.5 items-start">
                      <div className="p-1 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 mt-1 shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-red-800 dark:text-red-300 uppercase tracking-wide">{item.title}</h4>
                        <p className={`text-xs mt-1 leading-relaxed ${themeMode === 'light' ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-red-200/40 dark:border-red-900/25 flex items-center gap-2 text-xs text-red-600 dark:text-red-400 font-bold">
                <span className="animate-pulse">●</span> {t.manualSystemImpact}
              </div>
            </div>

            {/* SOLUSI - STYLE HIJAU */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 shadow-md flex flex-col justify-between ${
              themeMode === 'light'
                ? 'bg-emerald-50/50 border-emerald-100 text-slate-800'
                : 'bg-emerald-950/10 border-emerald-900/30 text-slate-200'
            }`}>
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-emerald-200/40 dark:border-emerald-900/25">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-emerald-700 dark:text-emerald-400">{t.solutionPortalTitle}</h3>
                    <p className="text-[11px] text-emerald-600/80 dark:text-emerald-400/60 font-semibold">{t.solutionPortalDesc}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      title: t.solutionTitle1,
                      desc: t.solutionDesc1
                    },
                    {
                      title: t.solutionTitle2,
                      desc: t.solutionDesc2
                    },
                    {
                      title: t.solutionTitle3,
                      desc: t.solutionDesc3
                    },
                    {
                      title: t.solutionTitle4,
                      desc: t.solutionDesc4
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3.5 items-start">
                      <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mt-1 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">{item.title}</h4>
                        <p className={`text-xs mt-1 leading-relaxed ${themeMode === 'light' ? 'text-slate-700 font-medium' : 'text-slate-350'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-emerald-200/40 dark:border-emerald-900/25 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                <span>✔</span> {t.automationEfficiency}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION VIDEO DEMO */}
        <section id="video-demo" className="scroll-mt-24 pt-16 border-t border-slate-200/60 dark:border-slate-800/80 space-y-12">
          <div className="text-center space-y-4">
            <span className="inline-block bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase border border-amber-500/20">
              EXPLORE THE PORTAL
            </span>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>
              {t.videoDemoTitle}
            </h2>
            <p className={`max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-semibold ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
              {t.videoDemoDesc}
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => { setActiveDemoTab('desktop'); setIsPlayingVideo(false); setVideoProgress(0); }}
              className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wide flex items-center gap-2 border cursor-pointer transition-all ${
                activeDemoTab === 'desktop'
                  ? 'bg-slate-950 text-white border-transparent shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800'
              }`}
            >
              <Laptop className="w-4 h-4" /> {t.desktopView}
            </button>
            <button
              onClick={() => { setActiveDemoTab('mobile'); setIsPlayingVideo(false); setVideoProgress(0); }}
              className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wide flex items-center gap-2 border cursor-pointer transition-all ${
                activeDemoTab === 'mobile'
                  ? 'bg-slate-950 text-white border-transparent shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800'
              }`}
            >
              <Smartphone className="w-4 h-4" /> {t.mobileView}
            </button>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col items-center w-full">
            {activeDemoTab === 'desktop' ? (
              /* DESKTOP FRAME */
              <div className={`relative w-full rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden bg-slate-950 ${
                themeMode === 'light' ? 'bg-white' : 'bg-slate-950'
              }`}>
                {/* Browser bar */}
                <div className="bg-slate-100 dark:bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                  </div>
                  <div className="bg-white dark:bg-slate-950 rounded-md border border-slate-200 dark:border-slate-850 text-[10px] px-8 py-1 text-slate-500 font-mono tracking-wide truncate max-w-xs sm:max-w-md select-all">
                    https://portal.apn.or.id/admin/dashboard
                  </div>
                  <div className="w-12"></div>
                </div>

                {/* Screenshot Frame */}
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                  <img
                    src="/src/assets/images/desktop_dashboard_mockup_1783737016711.jpg"
                    alt="Desktop Dashboard Screenshot"
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isPlayingVideo ? 'brightness-50 blur-xs scale-102' : 'hover:scale-101'
                    }`}
                  />

                  {/* Play Button or Player Simulation */}
                  {!isPlayingVideo ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 hover:bg-black/40 transition-all">
                      <button
                        onClick={() => { setIsPlayingVideo(true); setVideoProgress(0); }}
                        className="p-5 rounded-full bg-[#ff9800] hover:bg-[#f57c00] text-white shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all animate-pulse"
                      >
                        <Play className="w-8 h-8 fill-current" />
                      </button>
                      <span className="mt-4 text-xs font-black text-white uppercase tracking-widest drop-shadow-md">
                        Putar Video Demo (2:45)
                      </span>
                    </div>
                  ) : (
                    /* SIMULATED VIDEO PLAYER OVERLAY */
                    <div className="absolute inset-0 flex flex-col justify-between p-6 bg-slate-950/80 text-white animate-fade-in font-semibold">
                      <div className="flex justify-between items-center">
                        <span className="bg-red-600 text-white px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider animate-pulse flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white"></span> LIVE DEMO SIMULATION
                        </span>
                        <button
                          onClick={() => setIsPlayingVideo(false)}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-center space-y-3">
                        <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-spin">
                          <RotateCcw className="w-8 h-8" />
                        </div>
                        <p className="font-extrabold text-sm tracking-wide text-emerald-400">{currentLogMessage}</p>
                        <p className="text-[11px] text-slate-400 font-mono font-medium">Progress: {videoProgress}%</p>
                      </div>

                      <div className="space-y-3">
                        {/* Progress Bar */}
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#ff9800] h-full transition-all duration-300"
                            style={{ width: `${videoProgress}%` }}
                          ></div>
                        </div>

                        {/* Player Controls */}
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setIsPlayingVideo(false)}
                              className="p-1.5 hover:text-white transition-all cursor-pointer"
                            >
                              <Pause className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => { setVideoProgress(0); setIsPlayingVideo(true); }}
                              className="p-1.5 hover:text-white transition-all cursor-pointer"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          </div>
                          <span>0:{videoProgress < 10 ? `0${Math.floor(videoProgress/10)}` : Math.floor(videoProgress/2)} / 2:45</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* MOBILE FRAME */
              <div className="relative max-w-sm w-full rounded-3xl border-8 border-slate-900 shadow-2xl overflow-hidden bg-slate-950 aspect-[3/4]">
                {/* Speaker/Notch area */}
                <div className="absolute top-0 inset-x-0 h-4 bg-slate-900 z-30 flex justify-center items-center">
                  <div className="w-16 h-3 bg-black rounded-b-md"></div>
                </div>

                {/* Screenshot Image */}
                <div className="relative w-full h-full bg-slate-900 pt-4 overflow-hidden">
                  <img
                    src="/src/assets/images/mobile_app_mockup_1783737031977.jpg"
                    alt="Mobile App Screenshot"
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isPlayingVideo ? 'brightness-50 blur-xs scale-102' : 'hover:scale-101'
                    }`}
                  />

                  {/* Play Button or Player Simulation */}
                  {!isPlayingVideo ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 hover:bg-black/45 transition-all">
                      <button
                        onClick={() => { setIsPlayingVideo(true); setVideoProgress(0); }}
                        className="p-4.5 rounded-full bg-[#ff9800] hover:bg-[#f57c00] text-white shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all animate-pulse"
                      >
                        <Play className="w-7 h-7 fill-current" />
                      </button>
                      <span className="mt-3 text-[11px] font-black text-white uppercase tracking-widest drop-shadow-md text-center px-4">
                        Putar Demo Mobile (1:30)
                      </span>
                    </div>
                  ) : (
                    /* SIMULATED VIDEO PLAYER OVERLAY */
                    <div className="absolute inset-0 flex flex-col justify-between p-5 bg-slate-950/85 text-white animate-fade-in font-semibold pt-8">
                      <div className="flex justify-between items-center">
                        <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider animate-pulse">
                          MOBILE SIMULATION
                        </span>
                        <button
                          onClick={() => setIsPlayingVideo(false)}
                          className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-center space-y-2">
                        <div className="inline-flex p-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-spin">
                          <RotateCcw className="w-6 h-6" />
                        </div>
                        <p className="font-extrabold text-xs tracking-wide text-emerald-400 px-2">{currentLogMessage}</p>
                        <p className="text-[10px] text-slate-400 font-mono font-medium">Progress: {videoProgress}%</p>
                      </div>

                      <div className="space-y-2">
                        {/* Progress Bar */}
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#ff9800] h-full transition-all duration-300"
                            style={{ width: `${videoProgress}%` }}
                          ></div>
                        </div>

                        {/* Player Controls */}
                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setIsPlayingVideo(false)}
                              className="p-1 hover:text-white transition-all cursor-pointer"
                            >
                              <Pause className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => { setVideoProgress(0); setIsPlayingVideo(true); }}
                              className="p-1 hover:text-white transition-all cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span>0:{videoProgress < 10 ? `0${Math.floor(videoProgress/10)}` : Math.floor(videoProgress/2)} / 1:30</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ABOUT US DETAIL */}
        <section id="about" className="scroll-mt-24 pt-16 border-t border-slate-200/60 dark:border-slate-800/80 space-y-12 max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <span className="inline-block mb-6 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase border border-amber-500/20">
                {t.organizationalProfile}
              </span>
              <h1 
                className="text-3xl sm:text-4xl font-black tracking-tight"
                style={{ color: themeMode === 'dark' ? '#ffffff' : '#0f172a' }}
              >
                {t.aboutAssociation}
              </h1>
              <p 
                className="max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-semibold"
                style={{ color: themeMode === 'dark' ? '#94a3b8' : '#334155' }}
              >
                {t.aboutAssociationDesc}
              </p>
            </div>

            {/* Visi & Misi Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className={`group relative overflow-hidden space-y-3 p-5 sm:p-6 rounded-2xl border shadow-xs transition-all duration-300 hover:shadow-md ${
                themeMode === 'light'
                  ? 'bg-white border-slate-200/80 hover:border-slate-300'
                  : 'bg-[#0c1222]/60 border-slate-800/80 dark:hover:border-slate-750'
              }`}>
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500"></div>
                <div className="inline-flex p-2.5 bg-amber-500/10 rounded-xl text-amber-600 dark:text-amber-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 
                  className="font-black text-base tracking-tight"
                  style={{ color: themeMode === 'dark' ? '#ffffff' : '#0f172a' }}
                >
                  {t.vision}
                </h3>
                <p 
                  className="leading-relaxed text-xs font-semibold"
                  style={{ color: themeMode === 'dark' ? '#cbd5e1' : '#475569' }}
                >
                  {t.visionDesc}
                </p>
              </div>

              <div className={`group relative overflow-hidden space-y-3 p-5 sm:p-6 rounded-2xl border shadow-xs transition-all duration-300 hover:shadow-md ${
                themeMode === 'light'
                  ? 'bg-white border-slate-200/80 hover:border-slate-300'
                  : 'bg-[#0c1222]/60 border-slate-800/80 dark:hover:border-slate-750'
              }`}>
                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                <div className="inline-flex p-2.5 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400">
                  <Award className="w-5 h-5" />
                </div>
                <h3 
                  className="font-black text-base tracking-tight"
                  style={{ color: themeMode === 'dark' ? '#ffffff' : '#0f172a' }}
                >
                  {t.mission}
                </h3>
                <ul 
                  className="space-y-2 text-xs font-semibold"
                  style={{ color: themeMode === 'dark' ? '#cbd5e1' : '#475569' }}
                >
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    <span>{t.missionDesc1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    <span>{t.missionDesc2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    <span>{t.missionDesc3}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Core Values Section */}
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h3 
                  className="font-black text-sm sm:text-base tracking-widest uppercase"
                  style={{ color: themeMode === 'dark' ? '#94a3b8' : '#000000' }}
                >
                  {t.coreValues}
                </h3>
                <p 
                  className="text-xs sm:text-sm font-semibold"
                  style={{ color: themeMode === 'dark' ? '#94a3b8' : '#334155' }}
                >
                  {t.coreValuesDesc}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { title: t.integrity, desc: t.integrityDesc, icon: ShieldCheck, color: 'text-amber-500 bg-amber-500/10' },
                  { title: t.collaboration, desc: t.collaborationDesc, icon: Users, color: 'text-blue-500 bg-blue-500/10' },
                  { title: t.professional, desc: t.professionalDesc, icon: Briefcase, color: 'text-emerald-500 bg-emerald-500/10' },
                  { title: t.innovation, desc: t.innovationDesc, icon: Lightbulb, color: 'text-purple-500 bg-purple-500/10' }
                ].map((val, idx) => {
                  const IconComponent = val.icon;
                  return (
                    <div 
                      key={idx} 
                      className={`p-5 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2.5 shadow-xs transition-colors duration-300 ${
                        themeMode === 'light'
                          ? 'bg-white hover:bg-slate-50 border-slate-200/80'
                          : 'bg-white dark:bg-[#0c1222]/60 border-slate-800'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${val.color} shrink-0`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 
                          className="font-black text-sm"
                          style={{ color: themeMode === 'dark' ? '#ffffff' : '#0f172a' }}
                        >
                          {val.title}
                        </h4>
                        <p 
                          className="text-[10px] font-semibold leading-normal"
                          style={{ color: themeMode === 'dark' ? '#94a3b8' : '#475569' }}
                        >
                          {val.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TIMELINE PROGRESS */}
            <div className={`p-8 rounded-3xl border space-y-8 shadow-xs ${
              themeMode === 'light'
                ? 'bg-white border-slate-200'
                : 'bg-[#0c1222]/60 border-slate-800'
            }`}>
              <div className="text-center space-y-1">
                <h3 
                  className="font-black text-sm sm:text-base tracking-widest uppercase"
                  style={{ color: themeMode === 'dark' ? '#94a3b8' : '#000000' }}
                >
                  {t.roadmap}
                </h3>
                <p 
                  className="text-xs sm:text-sm font-semibold"
                  style={{ color: themeMode === 'dark' ? '#cbd5e1' : '#334155' }}
                >
                  {t.roadmapDesc}
                </p>
              </div>

              <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-6 space-y-8 text-xs max-w-2xl mx-auto">
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 bg-amber-500 w-4 h-4 rounded-full ring-4 ring-amber-100 dark:ring-amber-950/85 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <p 
                    className="font-black text-sm"
                    style={{ color: themeMode === 'dark' ? '#fbbf24' : '#b45309' }}
                  >
                    {t.founded}
                  </p>
                  <p 
                    className="mt-1.5 leading-relaxed text-[11px] font-semibold"
                    style={{ color: themeMode === 'dark' ? '#cbd5e1' : '#334155' }}
                  >
                    {t.foundedDesc}
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 bg-blue-500 w-4 h-4 rounded-full ring-4 ring-blue-100 dark:ring-blue-950/85 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <p 
                    className="font-black text-sm"
                    style={{ color: themeMode === 'dark' ? '#60a5fa' : '#1d4ed8' }}
                  >
                    {t.expansion}
                  </p>
                  <p 
                    className="mt-1.5 leading-relaxed text-[11px] font-semibold"
                    style={{ color: themeMode === 'dark' ? '#cbd5e1' : '#334155' }}
                  >
                    {t.expansionDesc}
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-1 bg-emerald-500 w-4 h-4 rounded-full ring-4 ring-emerald-100 dark:ring-emerald-950/85 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <p 
                    className="font-black text-sm"
                    style={{ color: themeMode === 'dark' ? '#34d399' : '#047857' }}
                  >
                    {t.digitalization}
                  </p>
                  <p 
                    className="mt-1.5 leading-relaxed text-[11px] font-semibold"
                    style={{ color: themeMode === 'dark' ? '#cbd5e1' : '#334155' }}
                  >
                    {t.digitalizationDesc}
                  </p>
                </div>
              </div>
            </div>
          </section>

        {/* MEMBERSHIP LEVELS & FORM */}
        <section id="membership" className="scroll-mt-24 pt-16 border-t border-slate-200/60 dark:border-slate-800/80 space-y-12">
            <div className="text-center space-y-3">
              <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase border ${colorTheme.badge}`}>{t.openRegistration}</span>
              <h2 className={`text-3xl font-black tracking-tight mt-5 ${themeMode === 'light' ? 'text-slate-900' : 'text-white'}`}>
                {t.membershipTiers}
              </h2>
              <p className={`text-xs max-w-lg mx-auto leading-relaxed font-semibold ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                {t.membershipDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {membershipTypes.map((tier) => {
                const isSelected = assocRegisterForm.membershipTypeId === tier.id;

                return (
                  <div 
                    key={tier.id} 
                    className={`border-t-4 ${colorTheme.border} border-x border-b rounded-2xl p-6 transition-all flex flex-col justify-between ${
                      isSelected 
                        ? `${themeMode === 'light' 
                            ? `bg-white ${colorTheme.selectedBorderLight} ring-4 ${colorTheme.selectedRingLight} shadow-lg scale-[1.02] -translate-y-0.5` 
                            : `bg-slate-900/40 dark:bg-[#0c1222]/90 ${colorTheme.selectedBorderDark} ring-2 ${colorTheme.selectedRingDark} shadow-md scale-[1.01]`}` 
                        : `${themeMode === 'light'
                            ? `bg-white border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300`
                            : `bg-slate-50 dark:bg-[#0c1222]/60 border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md ${colorTheme.hoverBorderLight} ${colorTheme.hoverBorderDark}`}`
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`font-black text-lg ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>{translateText(tier.name, lang as any)}</h3>
                        {isSelected && (
                          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md ${colorTheme.badge}`}>
                            {t.selected}
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className={`text-2xl font-black ${themeMode === 'light' ? colorTheme.textDark : 'text-white'}`}>Rp {(tier.price).toLocaleString('id-ID')}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 select-none font-semibold">/ {tier.billingCycle === 'yearly' ? (lang === 'en' ? 'year' : 'tahun') : (lang === 'en' ? 'lifetime' : 'seumur hidup')}</span>
                      </div>
                      <p className={`text-xs mb-6 leading-relaxed p-3 rounded-xl border font-semibold ${
                        themeMode === 'light'
                          ? 'bg-slate-50/70 border-slate-200/40 text-slate-600'
                          : 'bg-slate-950/40 border-slate-800/40 text-slate-300'
                      }`}>
                        {translateText(tier.description, lang as any)}
                      </p>
                      <ul className={`space-y-2.5 text-xs font-semibold ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                        {tier.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className={`w-4 h-4 shrink-0 ${themeMode === 'light' ? colorTheme.text : 'text-emerald-500'}`} /> <span>{translateText(benefit, lang as any)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => {
                        setAssocRegisterForm(prev => ({ ...prev, membershipTypeId: tier.id }));
                        const formEl = document.getElementById('register-membership-form');
                        if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full font-extrabold py-2.5 rounded-xl text-xs mt-8 transition-all uppercase tracking-wider cursor-pointer shadow-xs ${
                        isSelected 
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                          : `${colorTheme.bg} ${colorTheme.bgHover} text-white`
                      }`}
                    >
                      {isSelected ? `✓ ${t.selected}` : `${t.selectTier} ${translateText(tier.name, lang as any)}`}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* REGISTER APPLICATION FORM */}
            <div 
              id="register-membership-form" 
              className={`border-t-4 ${colorTheme.border} border-x border-b rounded-2xl p-6 sm:p-10 shadow-xl max-w-2xl mx-auto space-y-6 transition-all ${
                themeMode === 'light'
                  ? 'bg-white border-slate-200/95 shadow-lg shadow-slate-100/80 text-slate-900'
                  : 'bg-[#0c1222]/60 border-slate-800 text-slate-100'
              }`}
            >
              <div className={`border-b pb-4 ${themeMode === 'light' ? 'border-slate-200/60' : 'border-slate-800'}`}>
                <h3 className={`text-xl font-black flex items-center gap-2 tracking-tight ${
                  themeMode === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  <UserCheck className={`w-5.5 h-5.5 ${colorTheme.text}`} /> {t.registrationFormTitle}
                </h3>
                <p className={`text-xs mt-1 font-semibold ${
                  themeMode === 'light' ? 'text-slate-700' : 'text-slate-400'
                }`}>{t.registrationFormDesc}</p>
              </div>

              {regSuccess ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400 p-6 rounded-xl text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                  <p className="font-extrabold text-base">{t.regSuccessTitle}</p>
                  <p className="text-xs">{t.regSuccessDesc}</p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs font-semibold">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                        themeMode === 'light' ? 'text-slate-800' : 'text-slate-300'
                      }`}>{t.registrationFormNameLabel}</label>
                      <input
                        type="text"
                        required
                        placeholder={t.registrationFormNamePlaceholder}
                        value={assocRegisterForm.name}
                        onChange={e => setAssocRegisterForm(p => ({ ...p, name: e.target.value }))}
                        className={`w-full p-3 rounded-lg border focus:outline-none transition-all font-semibold ${
                          themeMode === 'light'
                            ? `bg-white hover:bg-slate-50 text-slate-900 placeholder-slate-500 border-slate-300 ${colorTheme.borderFocus} shadow-xs`
                            : `bg-slate-950 text-white placeholder-slate-550 border-slate-800 ${colorTheme.borderFocus}`
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                        themeMode === 'light' ? 'text-slate-800' : 'text-slate-300'
                      }`}>{t.registrationFormEmailLabel}</label>
                      <input
                        type="email"
                        required
                        placeholder={lang === 'id' ? "nama@perusahaan.com" : "name@company.com"}
                        value={assocRegisterForm.email}
                        onChange={e => setAssocRegisterForm(p => ({ ...p, email: e.target.value }))}
                        className={`w-full p-3 rounded-lg border focus:outline-none transition-all font-semibold ${
                          themeMode === 'light'
                            ? `bg-white hover:bg-slate-50 text-slate-900 placeholder-slate-500 border-slate-300 ${colorTheme.borderFocus} shadow-xs`
                            : `bg-slate-950 text-white placeholder-slate-550 border-slate-800 ${colorTheme.borderFocus}`
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                        themeMode === 'light' ? 'text-slate-800' : 'text-slate-300'
                      }`}>{t.registrationFormPhoneLabel}</label>
                      <input
                        type="tel"
                        required
                        placeholder={lang === 'id' ? "+62 812-XXXX-XXXX" : "+1 555-XXXX-XXXX"}
                        value={assocRegisterForm.phone}
                        onChange={e => setAssocRegisterForm(p => ({ ...p, phone: e.target.value }))}
                        className={`w-full p-3 rounded-lg border focus:outline-none transition-all font-semibold ${
                          themeMode === 'light'
                            ? `bg-white hover:bg-slate-50 text-slate-900 placeholder-slate-500 border-slate-300 ${colorTheme.borderFocus} shadow-xs`
                            : `bg-slate-950 text-white placeholder-slate-550 border-slate-800 ${colorTheme.borderFocus}`
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                        themeMode === 'light' ? 'text-slate-800' : 'text-slate-300'
                      }`}>{t.registrationFormMembershipLabel}</label>
                      <select
                        value={assocRegisterForm.membershipTypeId}
                        onChange={e => setAssocRegisterForm(p => ({ ...p, membershipTypeId: e.target.value }))}
                        className={`w-full p-3 rounded-lg border focus:outline-none transition-all font-semibold cursor-pointer ${
                          themeMode === 'light'
                            ? `bg-white hover:bg-slate-50 text-slate-900 border-slate-300 ${colorTheme.borderFocus} shadow-xs`
                            : `bg-slate-950 text-white border-slate-800 ${colorTheme.borderFocus}`
                        }`}
                      >
                        {membershipTypes.map(t => (
                          <option key={t.id} value={t.id} className="text-slate-900 bg-white font-semibold">{t.name} (Rp {t.price.toLocaleString('id-ID')} / {t.billingCycle})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                        themeMode === 'light' ? 'text-slate-800' : 'text-slate-300'
                      }`}>{t.registrationFormCompanyLabel}</label>
                      <input
                        type="text"
                        placeholder={t.registrationFormCompanyPlaceholder}
                        value={assocRegisterForm.organizationName}
                        onChange={e => setAssocRegisterForm(p => ({ ...p, organizationName: e.target.value }))}
                        className={`w-full p-3 rounded-lg border focus:outline-none transition-all font-semibold ${
                          themeMode === 'light'
                            ? `bg-white hover:bg-slate-50 text-slate-900 placeholder-slate-500 border-slate-300 ${colorTheme.borderFocus} shadow-xs`
                            : `bg-slate-950 text-white placeholder-slate-550 border-slate-800 ${colorTheme.borderFocus}`
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                        themeMode === 'light' ? 'text-slate-800' : 'text-slate-300'
                      }`}>{t.registrationFormPositionLabel}</label>
                      <input
                        type="text"
                        placeholder={t.registrationFormPositionPlaceholder}
                        value={assocRegisterForm.profession}
                        onChange={e => setAssocRegisterForm(p => ({ ...p, profession: e.target.value }))}
                        className={`w-full p-3 rounded-lg border focus:outline-none transition-all font-semibold ${
                          themeMode === 'light'
                            ? `bg-white hover:bg-slate-50 text-slate-900 placeholder-slate-500 border-slate-300 ${colorTheme.borderFocus} shadow-xs`
                            : `bg-slate-950 text-white placeholder-slate-550 border-slate-800 ${colorTheme.borderFocus}`
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                        themeMode === 'light' ? 'text-slate-800' : 'text-slate-300'
                      }`}>{t.registrationFormSectorLabel}</label>
                      <input
                        type="text"
                        placeholder={lang === 'id' ? "Management Consulting" : "Information Technology"}
                        value={assocRegisterForm.industry}
                        onChange={e => setAssocRegisterForm(p => ({ ...p, industry: e.target.value }))}
                        className={`w-full p-3 rounded-lg border focus:outline-none transition-all font-semibold ${
                          themeMode === 'light'
                            ? `bg-white hover:bg-slate-50 text-slate-900 placeholder-slate-500 border-slate-300 ${colorTheme.borderFocus} shadow-xs`
                            : `bg-slate-950 text-white placeholder-slate-550 border-slate-800 ${colorTheme.borderFocus}`
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                        themeMode === 'light' ? 'text-slate-800' : 'text-slate-300'
                      }`}>{t.registrationFormCityLabel}</label>
                      <input
                        type="text"
                        placeholder={lang === 'id' ? "Jakarta Selatan" : "New York City"}
                        value={assocRegisterForm.city}
                        onChange={e => setAssocRegisterForm(p => ({ ...p, city: e.target.value }))}
                        className={`w-full p-3 rounded-lg border focus:outline-none transition-all font-semibold ${
                          themeMode === 'light'
                            ? `bg-white hover:bg-slate-50 text-slate-900 placeholder-slate-500 border-slate-300 ${colorTheme.borderFocus} shadow-xs`
                            : `bg-slate-950 text-white placeholder-slate-550 border-slate-800 ${colorTheme.borderFocus}`
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                        themeMode === 'light' ? 'text-slate-800' : 'text-slate-300'
                      }`}>{t.registrationFormProvinceLabel}</label>
                      <input
                        type="text"
                        placeholder={lang === 'id' ? "DKI Jakarta" : "New York"}
                        value={assocRegisterForm.province}
                        onChange={e => setAssocRegisterForm(p => ({ ...p, province: e.target.value }))}
                        className={`w-full p-3 rounded-lg border focus:outline-none transition-all font-semibold ${
                          themeMode === 'light'
                            ? `bg-white hover:bg-slate-50 text-slate-900 placeholder-slate-500 border-slate-300 ${colorTheme.borderFocus} shadow-xs`
                            : `bg-slate-950 text-white placeholder-slate-550 border-slate-800 ${colorTheme.borderFocus}`
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                      themeMode === 'light' ? 'text-slate-800' : 'text-slate-300'
                    }`}>{t.registrationFormBioLabel}</label>
                    <textarea
                      rows={3}
                      placeholder={t.registrationFormBioPlaceholder}
                      value={assocRegisterForm.bio}
                      onChange={e => setAssocRegisterForm(p => ({ ...p, bio: e.target.value }))}
                      className={`w-full p-3 rounded-lg border focus:outline-none transition-all font-semibold ${
                        themeMode === 'light'
                          ? `bg-white hover:bg-slate-50 text-slate-900 placeholder-slate-500 border-slate-300 ${colorTheme.borderFocus} shadow-xs`
                          : `bg-slate-950 text-white placeholder-slate-550 border-slate-800 ${colorTheme.borderFocus}`
                      }`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`w-full ${colorTheme.bg} ${colorTheme.bgHover} text-white font-extrabold py-3 rounded-xl shadow-sm hover:shadow transition-all text-xs uppercase tracking-wider mt-4 cursor-pointer`}
                  >
                    {t.registrationFormSubmitButton}
                  </button>
                </form>
              )}
            </div>
          </section>

        {/* MEMBER DIRECTORY */}
        <section id="directory" className="scroll-mt-24 pt-16 border-t border-slate-200/60 dark:border-slate-800/80 space-y-6">
            <div className="pb-4 border-b border-slate-200/60 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black" style={{ color: themeMode === 'light' ? '#000000' : '#ffffff' }}>{t.memberDirectory}</h2>
                <p className="text-xs mt-1" style={{ color: themeMode === 'light' ? '#000000' : '#ffffff' }}>{t.memberDirectoryDesc}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative w-full sm:w-auto">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Search className={`w-4 h-4 ${themeMode === 'light' ? colorTheme.textDark : colorTheme.text}`} />
                  </div>
                  <input
                    type="text"
                    placeholder={t.searchNameCompany || "Cari nama, perusahaan..."}
                    value={dirSearch}
                    onChange={e => setDirSearch(e.target.value)}
                    className={`w-full sm:w-64 pl-9 pr-3 py-2 rounded-xl text-xs font-bold focus:outline-none transition-all shadow-[0_4px_20px_rgba(0,0,0,0.01)] border ${
                      themeMode === 'light'
                        ? `bg-white hover:bg-slate-50/50 text-slate-900 placeholder-slate-400 border-slate-200 ${colorTheme.borderFocus}`
                        : `bg-slate-900/50 text-slate-100 placeholder-slate-500 border-slate-800 ${colorTheme.borderFocus}`
                    }`}
                  />
                </div>
                <select
                  value={dirIndustry}
                  onChange={e => setDirIndustry(e.target.value)}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold focus:outline-none cursor-pointer transition-all shadow-[0_4px_20px_rgba(0,0,0,0.01)] border ${
                    themeMode === 'light'
                      ? `bg-white hover:bg-slate-50/50 text-slate-900 border-slate-200 ${colorTheme.borderFocus}`
                      : `bg-slate-900/50 text-slate-100 border-slate-800 ${colorTheme.borderFocus}`
                  }`}
                >
                  <option value="All" className="text-slate-900 dark:text-slate-100 font-bold bg-white dark:bg-slate-950">{t.allIndustries || "Semua Industri"}</option>
                  {industries.filter(i => i !== 'All').map(ind => <option key={ind} value={ind} className="text-slate-900 dark:text-slate-100 font-bold bg-white dark:bg-slate-950">{ind}</option>)}
                </select>
                <select
                  value={dirLocation}
                  onChange={e => setDirLocation(e.target.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold focus:outline-none cursor-pointer transition-all shadow-[0_4px_20px_rgba(0,0,0,0.01)] border ${
                    themeMode === 'light'
                      ? `bg-white hover:bg-slate-50/50 text-slate-900 border-slate-200 ${colorTheme.borderFocus}`
                      : `bg-slate-900/50 text-slate-100 border-slate-800 ${colorTheme.borderFocus}`
                  }`}
                >
                  <option value="All" className="text-slate-900 dark:text-slate-100 font-bold bg-white dark:bg-slate-950">{t.allRegions || "Semua Wilayah"}</option>
                  {locations.filter(l => l !== 'All').map(loc => <option key={loc} value={loc} className="text-slate-900 dark:text-slate-100 font-bold bg-white dark:bg-slate-950">{loc}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {members
                .filter(m => m.status === 'active' || m.status === 'lifetime')
                .filter(m => {
                  const matchSearch = m.name.toLowerCase().includes(dirSearch.toLowerCase()) || m.organizationName.toLowerCase().includes(dirSearch.toLowerCase());
                  const matchInd = dirIndustry === 'All' || m.industry === dirIndustry;
                  const matchLoc = dirLocation === 'All' || m.city === dirLocation;
                  return matchSearch && matchInd && matchLoc;
                })
                .map(m => {
                  const premiumMembers = ['Aditya Wirawan', 'Nabila Putri', 'Rizky Maulana', 'Hendra Saputra', 'Clara Tan'];
                  const isPremium = premiumMembers.includes(m.name);
                  
                  if (isPremium && themeMode === 'light') {
                    return (
                      <div key={m.id} className="bg-white border border-slate-100 rounded-[28px] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                        <div>
                          {/* Top Badge bar with previous green/emerald verified badge */}
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-black px-2.5 py-1 rounded-full uppercase flex items-center gap-1.5 border border-emerald-500/20">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> {t.verifiedLabel}
                            </span>
                            <span className="text-[9px] bg-slate-100 px-2 py-1 rounded-md text-slate-500 font-bold uppercase tracking-tighter">
                              {m.memberNumber}
                            </span>
                          </div>

                          {/* Big title matching reference image style */}
                          <h4 className={`font-black text-slate-950 text-lg sm:text-[19px] tracking-tight leading-snug ${colorTheme.groupHoverText} transition-colors mt-2`}>
                            {m.name}
                          </h4>
                          <p className={`text-[11px] font-black ${colorTheme.textDark} mt-1.5 uppercase tracking-wide`}>
                            {m.profession}
                          </p>
                          
                          {/* Elegant vertical metadata details list with icons */}
                          <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-xs font-bold text-slate-700">
                            <div className="flex items-center gap-2">
                              <Building className="w-4 h-4 text-slate-400 shrink-0" /> <span className="text-slate-900">{m.organizationName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Layers className="w-4 h-4 text-slate-400 shrink-0" /> <span className="text-slate-800">{m.industry}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-slate-400 shrink-0" /> <span className="text-slate-600">{m.city}, {m.province}</span>
                            </div>
                          </div>

                          {m.bio && (
                            <p className="mt-5 text-[11px] text-slate-500 border-t border-dashed border-slate-200 pt-3 line-clamp-2 italic leading-relaxed">
                              "{m.bio}"
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  }

                  const cardClass = 'bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-2xl hover:border-emerald-500/30 dark:hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between absolute-parent shadow-sm group';

                  return (
                    <div key={m.id} className={cardClass}>
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-4">
                          <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-black px-2.5 py-1 rounded-full uppercase flex items-center gap-1.5 border border-emerald-500/20">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {t.verifiedLabel}
                          </span>
                          <span className="text-[9px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-300 font-bold uppercase tracking-tighter">{m.memberNumber}</span>
                        </div>
                        <h4 className={`font-black text-slate-950 dark:text-white text-base ${colorTheme.groupHoverText} transition-colors`}>{m.name}</h4>
                        <p className={`text-[11px] font-black ${colorTheme.textDark} mt-1.5 uppercase tracking-wide`}>{m.profession}</p>
                        
                        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-slate-400 shrink-0" /> <span className="text-slate-900 dark:text-slate-200">{m.organizationName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-slate-400 shrink-0" /> <span className="text-slate-800 dark:text-slate-300">{m.industry}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" /> <span className="text-slate-800 dark:text-slate-300">{m.city}, {m.province}</span>
                          </div>
                        </div>
                      </div>
                      {m.bio && (
                        <p className="mt-5 text-[11px] text-slate-500 dark:text-slate-400 border-t border-dashed border-slate-200 dark:border-slate-800 pt-3 line-clamp-2 italic leading-relaxed">
                          "{m.bio}"
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          </section>

        {/* EVENTS BOARD */}
        <section id="events" className="scroll-mt-24 pt-16 border-t border-slate-200/60 dark:border-slate-800/80 space-y-6">
            <div className="pb-4 border-b border-slate-200/65 dark:border-slate-800">
              <h2 className="text-2xl font-black" style={{ color: themeMode === 'light' ? '#000000' : '#ffffff' }}>{t.eventsCertificationBoard}</h2>
              <p className="text-xs mt-1" style={{ color: themeMode === 'light' ? '#000000' : '#ffffff' }}>{t.eventsCertificationBoardDesc}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Event Listings */}
              <div className="lg:col-span-2 space-y-4">
                {events.map((evt) => {
                  const getEventTitle = (e: Event) => {
                    if (lang !== 'id') {
                      if (e.id === 'e1') return t.summitTitle;
                      if (e.id === 'e2') return t.trainingTitle;
                    }
                    return e.title;
                  };
                  const getEventDesc = (e: Event) => {
                    if (lang !== 'id') {
                      if (e.id === 'e1') return t.summitDesc;
                      if (e.id === 'e2') return t.trainingDesc;
                    }
                    return e.description;
                  };
                  const getEventLocation = (e: Event) => {
                    if (lang !== 'id') {
                      if (e.id === 'e1') return t.summitVenue;
                      if (e.id === 'e2') return t.trainingVenue;
                    }
                    return e.location;
                  };
                  return (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    className={`border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      selectedEvent?.id === evt.id 
                        ? (themeMode === 'light' 
                            ? 'bg-white border-amber-500 ring-2 ring-amber-100'
                            : 'bg-slate-900 border-amber-500 ring-2 ring-amber-950'
                          )
                        : (themeMode === 'light' 
                            ? 'bg-white border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700/60'
                          )
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          evt.category === 'Conference' || evt.category === 'Training'
                            ? (themeMode === 'light'
                                ? 'bg-purple-100 text-purple-600'
                                : 'bg-purple-950/30 text-purple-400'
                              )
                            : (themeMode === 'light'
                                ? 'bg-slate-100 text-slate-700'
                                : 'bg-slate-800 text-slate-300'
                              )
                        }`}>
                          {evt.category}
                        </span>
                        {evt.cpdPoints > 0 ? (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${themeMode === 'light' ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-900/40 text-emerald-300'}`}>
                            +{evt.cpdPoints} CPD Points
                          </span>
                        ) : (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${themeMode === 'light' ? 'bg-slate-100 text-slate-500' : 'bg-slate-800 text-slate-400'}`}>
                            Non-CPD
                          </span>
                        )}
                        <span className={`text-[10px] font-bold ${colorTheme.text}`}>
                          {evt.format}
                        </span>
                      </div>
                      <h3 className={`font-extrabold text-sm sm:text-base leading-snug ${themeMode === 'light' ? 'text-black' : 'text-white'}`}>{getEventTitle(evt)}</h3>
                      <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {getEventLocation(evt)}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {new Date(evt.startDatetime).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
                      </div>
                    </div>
                    <div className="shrink-0 text-left sm:text-right space-y-1.5 self-stretch sm:self-center flex sm:flex-col justify-between sm:justify-start items-center sm:items-end">
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{t.memberFeeLabel}</p>
                      <p className={`font-black text-base ${themeMode === 'light' ? 'text-black' : 'text-white'}`}>
                        {evt.memberPrice === 0 ? t.freeLabel : (lang === 'id' ? `Rp ${evt.memberPrice.toLocaleString('id-ID')}` : `$${(evt.memberPrice / 15000).toFixed(2)}`)}
                      </p>
                      <span className={`text-[10px] ${colorTheme.text} font-bold underline sm:mt-1`}>{t.eventRegisterLabel}</span>
                    </div>
                  </div>
                  );
                })}
              </div>

              {/* Event Checkout / Detail sidebar */}
              <div className={`rounded-2xl p-6 h-fit space-y-6 shadow-md transition-all border ${
                themeMode === 'light'
                  ? 'bg-white border-slate-200'
                  : 'bg-[#0c1222]/50 border-slate-800'
              }`}>
                {selectedEvent ? (
                  <div className="space-y-6">
                    <div className={`space-y-1.5 pb-3 border-b ${
                      themeMode === 'light' ? 'border-slate-200/80' : 'border-slate-800'
                    }`}>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                        selectedEvent.category === 'Conference' || selectedEvent.category === 'Training'
                          ? (themeMode === 'light'
                              ? 'bg-purple-100 text-purple-600 border border-purple-200/30'
                              : 'bg-purple-950/40 text-purple-400 border border-purple-800/20'
                            )
                          : `${colorTheme.badge}`
                      }`}>{selectedEvent.category}</span>
                      <h3 className={`text-base font-black ${themeMode === 'light' ? 'text-slate-900' : 'text-white'} pt-1`}>
                        {lang !== 'id' && selectedEvent.id === 'e1' ? t.summitTitle : lang !== 'id' && selectedEvent.id === 'e2' ? t.trainingTitle : selectedEvent.title}
                      </h3>
                    </div>

                    <div className="space-y-3 text-xs font-semibold">
                      <p className={`leading-relaxed italic border-l-2 pl-3 ${
                        themeMode === 'light'
                          ? 'text-slate-700 border-slate-300'
                          : 'text-slate-300 border-slate-700'
                      }`}>
                        "{lang !== 'id' && selectedEvent.id === 'e1' ? t.summitDesc : lang !== 'id' && selectedEvent.id === 'e2' ? t.trainingDesc : selectedEvent.description}"
                      </p>
                      
                      <div className={`pt-2 text-[11px] space-y-2 uppercase ${
                        themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        <div>⏰ {t.startTimeLabel}: <span className={`font-bold ${themeMode === 'light' ? 'text-slate-900' : 'text-slate-250'}`}>{new Date(selectedEvent.startDatetime).toLocaleString(lang === 'id' ? 'id-ID' : 'en-US')} {lang === 'id' ? 'WIB' : 'GMT+7'}</span></div>
                        <div>📍 {t.locationLabel}: <span className={`font-bold ${themeMode === 'light' ? 'text-slate-900' : 'text-slate-250'}`}>{lang !== 'id' && selectedEvent.id === 'e1' ? t.summitVenue : lang !== 'id' && selectedEvent.id === 'e2' ? t.trainingVenue : selectedEvent.location}</span></div>
                        <div>🎟️ {t.mandatoryNominalLabel}: <span className={`font-bold ${themeMode === 'light' ? 'text-emerald-600' : 'text-emerald-400'}`}>{selectedEvent.publicPrice !== null && selectedEvent.publicPrice !== undefined ? (lang === 'id' ? `Rp ${selectedEvent.publicPrice.toLocaleString('id-ID')}` : `$${(selectedEvent.publicPrice / 15000).toFixed(2)}`) : t.internalOnlyLabel} ({t.publicPriceLabel})</span></div>
                        <div>🎯 {t.cpdCreditsLabel}: <span className={`font-bold ${themeMode === 'light' ? 'text-indigo-600' : 'text-indigo-400'}`}>{selectedEvent.cpdPoints > 0 ? `${selectedEvent.cpdPoints} ${t.weightLabel}` : t.noneLabel}</span></div>
                      </div>
                    </div>

                    {/* Quick Register Ticket Form */}
                    <div className={`p-4 rounded-xl border space-y-3 ${
                      themeMode === 'light'
                        ? 'bg-slate-50 border-slate-200/80'
                        : 'bg-slate-950 border-slate-800'
                    }`}>
                      <p className={`text-xs font-bold uppercase tracking-wider ${
                        themeMode === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>{t.instantTicketRegLabel}</p>
                      {regTicketSuccess ? (
                        <div className={`border text-xs font-bold p-3 rounded-md text-center flex items-center gap-1.5 ${
                          themeMode === 'light'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-150'
                            : 'bg-emerald-950/30 text-emerald-400 border-emerald-900/30'
                        }`}>
                          <CheckCircle className={`w-4 h-4 ${themeMode === 'light' ? 'text-emerald-600' : 'text-emerald-400'}`} /> {t.ticketRegSuccess}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <input
                            type="email"
                            required
                            placeholder={t.registeredEmailPlaceholder}
                            value={regEventEmail}
                            onChange={e => setRegEventEmail(e.target.value)}
                            className={`w-full p-2 text-xs rounded font-bold focus:outline-none border ${
                              themeMode === 'light'
                                ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                                : 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                            }`}
                          />
                          <button
                            onClick={() => handleRegisterEventAction(selectedEvent.id)}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded text-xs uppercase cursor-pointer transition-colors"
                          >
                            {t.getTicketButton}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={`py-12 text-center text-xs space-y-2 ${
                    themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <Info className={`w-8 h-8 mx-auto ${themeMode === 'light' ? 'text-slate-400' : 'text-slate-500'}`} />
                    <p className={`font-bold uppercase tracking-wider ${
                      themeMode === 'light' ? 'text-slate-800' : 'text-slate-300'
                    }`}>{t.noEventSelectedTitle}</p>
                    <p className={themeMode === 'light' ? 'text-slate-500' : 'text-slate-450'}>{t.noEventSelectedDesc}</p>
                  </div>
                )}
              </div>
            </div>
          </section>

        {/* ORGANIZATIONAL NEWS & BLOG */}
        <section id="news" className="scroll-mt-24 pt-16 border-t border-slate-200/60 dark:border-slate-800/80 space-y-6">
            <div className="pb-4 border-b border-slate-200/60 dark:border-slate-800">
              <h2 className="text-2xl font-black" style={{ color: themeMode === 'light' ? '#000000' : '#ffffff' }}>{t.newsSectionTitle}</h2>
              <p className="text-xs mt-1" style={{ color: themeMode === 'light' ? '#000000' : '#ffffff' }}>{t.newsSectionDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Presiden APN Resmi Memandatkan Digitalisasi Anggota',
                  excerpt: 'Menuju inklusivitas industri 4.0, sekretariat draf nasional meluncurkan skema iuran VA digital penuh serta validasi e-sertifikat terenkripsi qr.',
                  category: 'Press Release',
                  date: '02 June 2026',
                  author: 'Sekretariat Utama'
                },
                {
                  title: 'Menyikapi UU PDP: Kesiapan Data Privasi Pada Direktori Publik',
                  excerpt: 'Tinjauan hukum dari dewan penasihat komite advokasi mengenai jaminan hak proteksi privasi handphone anggota di portal publik APN.',
                  category: 'Insight',
                  date: '28 May 2026',
                  author: 'Siti Rahmawati, S.H.'
                },
                {
                  title: 'Rekomendasi Rencana Program Kerja Nasional Batch II',
                  excerpt: 'Munas mendapati rekor 4 perwakilan dewan regional baru di area maluku dan papua guna meningkatkan jejaring perdagangan logistik laut.',
                  category: 'Berita Internal',
                  date: '15 May 2026',
                  author: 'Dr. Arif Pradana'
                }
              ].map((post, idx) => (
                <div
                  key={idx}
                  className={`border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between ${
                    themeMode === 'light'
                      ? 'bg-white border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700/60'
                  }`}
                >
                  <div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase inline-block mb-3.5 ${colorTheme.badge}`}>
                      {idx === 0 ? t.newsCategoryPress : idx === 1 ? t.newsCategoryInsight : idx === 2 ? t.newsCategoryInternal : post.category}
                    </span>
                  <h3 className={`font-extrabold text-sm sm:text-base cursor-pointer ${
                    themeMode === 'light' ? 'text-slate-950 hover:text-amber-600' : `text-white ${colorTheme.textHover}`
                  }`}>{idx === 0 ? t.newsTitle1 : idx === 1 ? t.newsTitle2 : idx === 2 ? t.newsTitle3 : post.title}</h3>
                  <p className={`text-xs mt-2.5 line-clamp-3 leading-relaxed font-semibold ${
                    themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>{idx === 0 ? t.newsExcerpt1 : idx === 1 ? t.newsExcerpt2 : idx === 2 ? t.newsExcerpt3 : post.excerpt}</p>
                  </div>
                  <div className={`mt-4 pt-4 border-t flex justify-between items-center text-[10px] font-bold uppercase ${
                    themeMode === 'light'
                      ? 'border-slate-100 text-slate-500'
                      : 'border-slate-800/60 text-slate-400'
                  }`}>
                    <span>{post.date}</span>
                    <span className={themeMode === 'light' ? 'text-slate-700' : colorTheme.textDark}>{t.byAuthorLabel} {idx === 0 ? t.newsAuthor1 : idx === 1 ? t.newsAuthor2 : idx === 2 ? t.newsAuthor3 : post.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        {/* DOCUMENTS INDEX */}
        <section id="documents" className="scroll-mt-24 pt-16 border-t border-slate-200/60 dark:border-slate-800/80 space-y-6">
            <div className="pb-4 border-b border-slate-200/65 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
              <h2 className="text-2xl font-black" style={{ color: themeMode === 'light' ? '#000000' : '#ffffff' }}>{t.docLibraryTitle}</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-semibold">{t.docLibraryDesc}</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Cari berkas dokumen..."
                  value={docSearch}
                  onChange={e => setDocSearch(e.target.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold focus:outline-none transition-all border ${
                    themeMode === 'light'
                      ? `bg-white hover:bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-200 ${colorTheme.borderFocus}`
                      : `bg-slate-900 text-white placeholder-slate-500 border-slate-800 ${colorTheme.borderFocus}`
                  }`}
                />
                <select
                  value={docCategory}
                  onChange={e => setDocCategory(e.target.value)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-black cursor-pointer focus:outline-none transition-all border ${
                    themeMode === 'light'
                      ? `bg-white hover:bg-slate-50 text-slate-900 border-slate-200 ${colorTheme.borderFocus}`
                      : `bg-slate-900 text-white border-slate-800 ${colorTheme.borderFocus}`
                  }`}
                >
                  <option value="All" className="text-slate-900 bg-white font-bold">{t.allCategories}</option>
                  <option value="Legal" className="text-slate-900 bg-white font-bold">Legal</option>
                  <option value="Annual Report" className="text-slate-900 bg-white font-bold">Annual Report</option>
                  <option value="SOP" className="text-slate-900 bg-white font-bold">SOP</option>
                  <option value="Media Kit" className="text-slate-900 bg-white font-bold">Media Kit</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents
                .filter(d => {
                  const matchSearch = d.title.toLowerCase().includes(docSearch.toLowerCase());
                  const matchCat = docCategory === 'All' || d.category === docCategory;
                  return matchSearch && matchCat;
                })
                .map(d => (
                  <div
                    key={d.id}
                    className={`border rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between h-full ${
                      themeMode === 'light'
                        ? 'bg-white border-slate-200/85 shadow-sm hover:border-slate-300'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700/60 shadow-md'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex justify-between items-start gap-2 mb-4">
                        <div className={`p-2.5 rounded-xl ${
                          themeMode === 'light'
                            ? 'bg-sky-50 text-sky-600'
                            : 'bg-slate-800/80 text-sky-400'
                        }`}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-md border ${
                          d.accessLevel === 'public'
                            ? 'bg-emerald-600 text-white border-transparent dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/25'
                            : `${colorTheme.badge}`
                        }`}>
                          {d.accessLevel === 'public' ? t.publicLabel : `🔒 ${t.verifiedMemberOnly}`}
                        </span>
                      </div>

                      {/* Title & Category */}
                      <span className={`text-[9px] uppercase font-black tracking-widest px-2 py-0.5 rounded ${
                        themeMode === 'light' ? 'bg-slate-100 text-slate-600' : 'bg-slate-800/70 text-slate-400'
                      }`}>
                        {d.category}
                      </span>
                      <h3 className={`font-black text-sm sm:text-base tracking-tight leading-snug mt-3 mb-2 transition-colors ${
                        themeMode === 'light' ? 'text-slate-900 hover:text-sky-600' : 'text-white'
                      }`}>
                        {translateText(d.title, lang as any)}
                      </h3>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {d.tags.map((tg, i) => (
                          <span
                            key={i}
                            className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                              themeMode === 'light'
                                ? 'bg-slate-50 text-slate-500 border border-slate-100'
                                : 'bg-slate-950 text-slate-400 border border-slate-850/60'
                            }`}
                          >
                            #{tg}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Info & Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-850/30 space-y-3.5">
                      <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Download className="w-3.5 h-3.5" />
                          <span>{d.downloadCount} {t.downloadCountLabel}</span>
                        </span>
                        <span className="font-mono">v{d.version}</span>
                      </div>

                      {d.accessLevel === 'public' ? (
                        <button
                          onClick={() => alert(`Memulai download berkas: ${d.title}`)}
                          className={`w-full text-center font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all duration-200 cursor-pointer text-white ${colorTheme.bg} ${colorTheme.bgHover}`}
                        >
                          <Download className="w-4 h-4" />
                          <span>{t.downloadFileButton}</span>
                        </button>
                      ) : (
                        <div className="w-full text-center font-black py-2.5 px-4 rounded-xl text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25 flex items-center justify-center gap-2 select-none">
                          🔒 {t.verifiedMemberOnly}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </section>

        {/* OPPORTUNITY BOARD */}
        <section id="opportunities" className="scroll-mt-24 pt-16 border-t border-slate-200/60 dark:border-slate-800/80 space-y-6">
            <div className="pb-4 border-b border-slate-200/65 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black" style={{ color: themeMode === 'light' ? '#000000' : '#ffffff' }}>{t.oppSectionTitle}</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-semibold">{t.oppSectionDesc}</p>
              </div>
              <div className="flex gap-2">
                    {['All', 'Job Vacancy', 'Tender'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setOppCategory(cat)}
                        className={`px-3.5 py-2 text-xs font-black rounded-lg cursor-pointer transition-all border ${
                          oppCategory === cat 
                            ? themeMode === 'light'
                              ? cat === 'All'
                                ? `${colorTheme.bg} text-white border-transparent shadow-md`
                                : cat === 'Job Vacancy'
                                  ? 'bg-sky-600 text-white border-transparent shadow-md hover:bg-sky-700'
                                  : 'bg-amber-500 text-white border-transparent shadow-md hover:bg-amber-600'
                              : `${colorTheme.bg} text-white border-transparent shadow-xs`
                            : themeMode === 'light'
                              ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-xs'
                              : 'bg-slate-800 text-slate-300 border-transparent hover:bg-slate-700'
                        }`}
                      >
                        {cat === 'All' ? t.allTypes : cat === 'Job Vacancy' ? t.typeJob : t.typeTender}
                      </button>
                    ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs
                .filter(jb => oppCategory === 'All' || jb.type === oppCategory)
                .map(jb => (
                  <div
                    key={jb.id}
                    className={`border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      themeMode === 'light'
                        ? 'bg-white border-slate-200/85 shadow-sm hover:border-slate-300'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700/60 shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3.5">
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                          jb.type === 'Tender' 
                            ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' 
                            : 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20'
                        }`}>
                          {jb.type === 'Tender' ? t.typeTender : t.typeJob}
                        </span>
                        <span className={`text-[9px] uppercase font-black tracking-widest px-2 py-0.5 rounded ${
                          themeMode === 'light' ? 'bg-slate-100 text-slate-600' : 'bg-slate-800/70 text-slate-400'
                        }`}>
                          {jb.category}
                        </span>
                      </div>
                      <h3 className={`font-black text-sm sm:text-base tracking-tight leading-snug ${
                        themeMode === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        {translateText(jb.title, lang as any)}
                      </h3>
                      <p className={`text-xs font-bold ${colorTheme.text} mt-1.5`}>{jb.companyName} · {translateText(jb.location, lang as any)}</p>
                      <p className={`text-xs mt-3.5 line-clamp-3 leading-relaxed font-semibold ${
                        themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        {translateText(jb.description, lang as any)}
                      </p>
                      
                      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-850/30 space-y-2 text-[11px]">
                        <p className={`font-black tracking-wider ${
                          themeMode === 'light' ? 'text-slate-800' : 'text-slate-400'
                        }`}>{t.reqWajibLabel}</p>
                        <ul className={`list-disc list-inside space-y-1 font-semibold ${
                          themeMode === 'light' ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          {jb.requirements.map((req, rId) => <li key={rId}>{translateText(req, lang as any)}</li>)}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850/30 flex justify-between items-center">
                      <span className={`text-[10px] px-2.5 py-0.5 rounded border font-extrabold ${
                        jb.accessLevel === 'public' 
                          ? 'bg-emerald-600 text-white border-transparent dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/20' 
                          : `${colorTheme.badge}`
                      }`}>
                        {jb.accessLevel === 'public' ? t.publicLabel : `🔒 ${t.verifiedMemberOnly}`}
                      </span>
                      {jb.accessLevel === 'public' ? (
                        <a
                          href={`mailto:${jb.contactEmail}?subject=Permohonan ${jb.title}`}
                          className={`text-white font-black px-4.5 py-2 rounded-xl text-xs shadow-xs transition-all duration-150 cursor-pointer ${colorTheme.bg} ${colorTheme.bgHover}`}
                        >
                          {t.contactPosterButton}
                        </a>
                      ) : (
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold italic">
                          {t.loginToApplyLabel}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </section>

         {/* PARTNER / SPONSORS SUBMISSION */}
        <section id="partners" className="scroll-mt-24 pt-16 border-t border-slate-200/60 dark:border-slate-800/80 space-y-12 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <span className="inline-block bg-sky-500/10 text-sky-600 dark:text-sky-400 px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase border border-sky-500/20">
                {t.partnerSectionBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: themeMode === 'light' ? '#000000' : '#ffffff' }}>{t.partnerSectionTitle}</h2>
              <p className="text-xs text-slate-700 dark:text-slate-400 max-w-lg mx-auto leading-relaxed font-semibold">
                {t.partnerSectionDesc}
              </p>
            </div>

            {/* Partners List */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              {[
                { name: t.packBronze, target: t.packBronzeDesc, icon: '🥉' },
                { name: t.packSilver, target: t.packSilverDesc, icon: '🥈' },
                { name: t.packGold, target: t.packGoldDesc, icon: '🥇' },
                { name: t.packPlatinum, target: t.packPlatinumDesc, icon: '👑' }
              ].map((pack, idx) => (
                <div
                  key={idx}
                  className={`border p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                    themeMode === 'light'
                      ? 'bg-white border-slate-200/85 shadow-xs hover:border-slate-300 hover:shadow-md'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-md'
                  }`}
                >
                  <span className="text-3.5xl block mb-2">{pack.icon}</span>
                  <h4 className={`font-black text-sm tracking-tight ${
                    themeMode === 'light' ? 'text-slate-900' : 'text-white'
                  }`}>{pack.name}</h4>
                  <p className={`text-[10px] mt-1.5 leading-relaxed font-semibold ${
                    themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>{pack.target}</p>
                </div>
              ))}
            </div>

            {/* Submission Form */}
            <div className={`border rounded-2xl p-6 sm:p-10 shadow-lg max-w-xl mx-auto space-y-6 ${
              themeMode === 'light'
                ? 'bg-white border-slate-200/85'
                : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="border-b border-slate-100 dark:border-slate-850/30 pb-4">
                <h4 className="font-extrabold text-[#0369a1] dark:text-sky-400 text-sm tracking-wider uppercase text-center">{t.partnerFormTitle}</h4>
                <p className={`text-[11px] mt-1 text-center font-semibold ${
                  themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                }`}>{t.partnerFormDesc}</p>
              </div>
              
              {partnerSuccess ? (
                <div className={`border p-6 rounded-2xl text-center space-y-2 font-semibold ${
                  themeMode === 'light'
                    ? 'bg-sky-50 text-sky-900 border-sky-100'
                    : 'bg-sky-950/20 text-sky-400 border-sky-900/30'
                }`}>
                  <CheckCircle className="w-10 h-10 text-sky-500 mx-auto animate-bounce" />
                  <p className="font-extrabold text-sm">{t.partnerFormSuccessTitle}</p>
                  <p className="text-xs leading-relaxed">{t.partnerFormSuccessDesc}</p>
                </div>
              ) : (
                <form onSubmit={handlePartnerSubmit} className="space-y-4 text-xs font-semibold">
                  <div className="space-y-1">
                    <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                      themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                    }`}>{t.partnerFormCompanyName}</label>
                    <input
                      type="text"
                      required
                      placeholder={t.partnerFormCompanyPlaceholder}
                      value={partnerForm.companyName}
                      onChange={e => setPartnerForm(p => ({ ...p, companyName: e.target.value }))}
                      className={`w-full p-3 rounded-lg border focus:outline-none transition-all font-semibold ${
                        themeMode === 'light'
                          ? `bg-slate-50 hover:bg-slate-100/50 text-slate-900 placeholder-slate-400 border-slate-200 focus:bg-white ${colorTheme.borderFocus}`
                          : `bg-slate-950 text-white placeholder-slate-500 border-slate-800 focus:bg-slate-900 ${colorTheme.borderFocus}`
                      }`}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                        themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                      }`}>{t.partnerFormContactPerson}</label>
                      <input
                        type="text"
                        required
                        placeholder={t.partnerFormContactPlaceholder}
                        value={partnerForm.contactName}
                        onChange={e => setPartnerForm(p => ({ ...p, contactName: e.target.value }))}
                        className={`w-full p-3 rounded-lg border focus:outline-none transition-all font-semibold ${
                          themeMode === 'light'
                            ? `bg-slate-50 hover:bg-slate-100/50 text-slate-900 placeholder-slate-400 border-slate-200 focus:bg-white ${colorTheme.borderFocus}`
                            : `bg-slate-950 text-white placeholder-slate-500 border-slate-800 focus:bg-slate-900 ${colorTheme.borderFocus}`
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                        themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                      }`}>{t.partnerFormEmail}</label>
                      <input
                        type="email"
                        required
                        placeholder="corsec@sinerginusantara.com"
                        value={partnerForm.email}
                        onChange={e => setPartnerForm(p => ({ ...p, email: e.target.value }))}
                        className={`w-full p-3 rounded-lg border focus:outline-none transition-all font-semibold ${
                          themeMode === 'light'
                            ? `bg-slate-50 hover:bg-slate-100/50 text-slate-900 placeholder-slate-400 border-slate-200 focus:bg-white ${colorTheme.borderFocus}`
                            : `bg-slate-950 text-white placeholder-slate-500 border-slate-800 focus:bg-slate-900 ${colorTheme.borderFocus}`
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                      themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                    }`}>{t.partnerFormInterestType}</label>
                    <select
                      value={partnerForm.interestType}
                      onChange={e => setPartnerForm(p => ({ ...p, interestType: e.target.value }))}
                      className={`w-full p-3 rounded-lg border focus:outline-none transition-all font-black cursor-pointer ${
                        themeMode === 'light'
                          ? `bg-slate-50 hover:bg-slate-100/50 text-slate-900 border-slate-200 focus:bg-white ${colorTheme.borderFocus}`
                          : `bg-slate-950 text-white border-slate-800 focus:bg-slate-900 ${colorTheme.borderFocus}`
                      }`}
                    >
                      <option value="Corporate Partnership" className="text-slate-950 bg-white font-semibold">{t.partnerFormInterest1}</option>
                      <option value="Strategic Partnership" className="text-slate-950 bg-white font-semibold">{t.partnerFormInterest2}</option>
                      <option value="Platinum Sponsor" className="text-slate-950 bg-white font-semibold">{t.partnerFormInterest3}</option>
                      <option value="Event Partner" className="text-slate-950 bg-white font-semibold">{t.partnerFormInterest4}</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                      themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                    }`}>{t.partnerFormMessage}</label>
                    <textarea
                      rows={3}
                      placeholder={t.partnerFormMessagePlaceholder}
                      value={partnerForm.message}
                      onChange={e => setPartnerForm(p => ({ ...p, message: e.target.value }))}
                      className={`w-full p-3 rounded-lg border focus:outline-none transition-all font-semibold ${
                        themeMode === 'light'
                          ? `bg-slate-50 hover:bg-slate-100/50 text-slate-900 placeholder-slate-400 border-slate-200 ${colorTheme.borderFocus}`
                          : `bg-slate-950 text-white placeholder-slate-500 border-slate-800 ${colorTheme.borderFocus}`
                      }`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`w-full font-extrabold py-3 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer transition-all ${colorTheme.bg} ${colorTheme.bgHover} text-white shadow-sm hover:shadow`}
                  >
                    <Send className="w-4 h-4" /> {t.partnerFormSubmit}
                  </button>
                </form>
              )}
            </div>
          </section>

        {/* E-CERTIFICATES VALIDATION */}
        <section id="certificates" className="scroll-mt-24 pt-16 border-t border-slate-200/60 dark:border-slate-800/80 space-y-8 max-w-2xl mx-auto text-xs font-semibold">
            <div className="text-center space-y-3">
              <span className="inline-block bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase border border-emerald-500/20">
                {t.certSectionBadge}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: themeMode === 'light' ? '#000000' : '#ffffff' }}>{t.certSectionTitle}</h1>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed font-semibold">
                {t.certSectionDesc}
              </p>
              <div className={`p-4 rounded-xl space-y-1.5 max-w-sm mx-auto border ${
                themeMode === 'light'
                  ? 'bg-slate-50 border-slate-200/80 text-slate-850'
                  : 'bg-slate-950/40 border-slate-800 text-slate-300'
              }`}>
                <span className={`font-extrabold uppercase text-[9px] block tracking-wider ${
                  themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                }`}>{t.certExampleLabel}</span>
                <div className={`font-mono text-[11px] flex flex-col gap-1 select-all font-bold ${
                  themeMode === 'light' ? 'text-slate-800' : 'text-slate-300'
                }`}>
                  <div>📜 CERT-APN-2026-000001</div>
                  <div>📜 CERT-APN-2026-000002</div>
                </div>
              </div>
            </div>

            <div className={`border p-6 rounded-2xl shadow-sm ${
              themeMode === 'light' ? 'bg-white border-slate-200/85' : 'bg-slate-900 border-slate-800'
            }`}>
              <form onSubmit={handleVerifyCertificate} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  required
                  placeholder={t.certInputPlaceholder}
                  value={verifyCertNo}
                  onChange={e => setVerifyCertNo(e.target.value)}
                  className={`text-xs font-bold p-3 rounded-lg border flex-1 uppercase focus:outline-none transition-all ${
                    themeMode === 'light'
                      ? `bg-slate-50 hover:bg-slate-100/50 text-slate-950 placeholder-slate-400 border-slate-200 focus:bg-white ${colorTheme.borderFocus}`
                      : `bg-slate-950 text-white placeholder-slate-500 border-slate-800 focus:bg-slate-900 ${colorTheme.borderFocus}`
                  }`}
                />
                <button
                  type="submit"
                  className={`w-full sm:w-auto shrink-0 whitespace-nowrap px-6 py-3 rounded-lg uppercase text-xs font-black text-white cursor-pointer transition-all ${colorTheme.bg} ${colorTheme.bgHover}`}
                >
                  {t.certCheckButton}
                </button>
              </form>
            </div>

            {/* Results Display */}
            {verifiedCertResult !== undefined && (
              <div className={`border p-6 rounded-2xl shadow-md transition-all ${
                themeMode === 'light' ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'
              }`}>
                {verifiedCertResult ? (
                  <div className="space-y-4">
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 p-4 rounded-xl flex items-center gap-3 border border-emerald-200/50 dark:border-emerald-900/30 font-semibold">
                      <CheckCircle className="w-10 h-10 text-emerald-500 shrink-0" />
                      <div>
                        <p className="font-black text-sm">{t.certValidTitle}</p>
                        <p className="text-[10px]">{t.certValidDesc}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 uppercase text-[9px] font-extrabold tracking-wider">{t.certOwnerLabel}</p>
                        <p className="font-extrabold text-slate-900 dark:text-white mt-0.5">{verifiedCertResult.memberEmail}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 uppercase text-[9px] font-extrabold tracking-wider">{t.certSerialLabel}</p>
                        <p className={`font-mono font-black ${colorTheme.textDark} mt-0.5`}>{verifiedCertResult.certificateNumber}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 uppercase text-[9px] font-extrabold tracking-wider">{t.certEventLabel}</p>
                        <p className="font-extrabold text-slate-900 dark:text-white mt-0.5">{verifiedCertResult.eventTitle}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 uppercase text-[9px] font-extrabold tracking-wider">{t.certQualLabel}</p>
                        <p className="font-extrabold text-slate-900 dark:text-white mt-0.5">{verifiedCertResult.title}</p>
                      </div>
                      <div className="col-span-1 sm:col-span-2 grid grid-cols-2 gap-4 border-t border-dashed border-slate-100 dark:border-slate-800/70 pt-3">
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 uppercase text-[9px] font-extrabold tracking-wider">{t.certDateLabel}</p>
                          <p className="font-bold text-slate-650 dark:text-slate-350 mt-0.5">{verifiedCertResult.issuedDate}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 uppercase text-[9px] font-extrabold tracking-wider">{t.certCpdWeightLabel}</p>
                          <p className="font-black text-indigo-600 dark:text-indigo-400 mt-0.5">+{verifiedCertResult.cpdPoints} CPD Bobot</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-400 p-5 rounded-xl flex items-center gap-3 border border-red-200/50 dark:border-red-900/30">
                    <AlertCircle className="w-9 h-9 text-red-500 shrink-0 animate-pulse" />
                    <div className="font-semibold">
                      <p className="font-black">{t.certNotFoundTitle}</p>
                      <p className="text-[10px] mt-0.5 text-red-650/90 dark:text-red-400/90">{t.certNotFoundDesc}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

        {/* SECTION TESTIMONI (4 CARDS) */}
        <section id="testimonials" className="scroll-mt-24 pt-16 border-t border-slate-200/60 dark:border-slate-800/80 space-y-12">
          <div className="text-center space-y-4">
            <span className="inline-block bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase border border-indigo-500/20">
              {t.testiSectionBadge}
            </span>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${themeMode === 'light' ? 'text-slate-950' : 'text-white'}`}>
              {t.testiSectionTitle}
            </h2>
            <p className={`max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-semibold ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
              {t.testiSectionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: t.testi1Name,
                role: t.testi1Role,
                avatar: "AS",
                color: "bg-amber-500",
                text: t.testi1Text
              },
              {
                name: t.testi2Name,
                role: t.testi2Role,
                avatar: "SM",
                color: "bg-indigo-500",
                text: t.testi2Text
              },
              {
                name: t.testi3Name,
                role: t.testi3Role,
                avatar: "BP",
                color: "bg-emerald-500",
                text: t.testi3Text
              },
              {
                name: t.testi4Name,
                role: t.testi4Role,
                avatar: "AW",
                color: "bg-rose-500",
                text: t.testi4Text
              }
            ].map((tItem, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col justify-between space-y-4 ${
                  themeMode === 'light'
                    ? 'bg-white border-slate-200/80 text-slate-800'
                    : 'bg-slate-900/60 border-slate-850/80 text-slate-200'
                }`}
              >
                <div className="space-y-3">
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-current" />
                    ))}
                  </div>
                  <p className={`text-xs leading-relaxed italic font-semibold ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    "{tItem.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs text-white uppercase shadow-sm ${tItem.color}`}>
                    {tItem.avatar}
                  </div>
                  <div>
                    <h4 className={`text-xs font-black ${themeMode === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      {tItem.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{tItem.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT US DETAILS */}
        <section id="contact" className="scroll-mt-24 pt-16 border-t border-slate-200/60 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-xs font-semibold">
            {/* Address cards */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black" style={{ color: themeMode === 'light' ? '#000000' : '#ffffff' }}>{t.contactSectionTitle}</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1 font-semibold">{t.contactSectionDesc}</p>
              </div>

              <div className={`border rounded-2xl p-5 space-y-4 shadow-sm ${
                themeMode === 'light' ? 'bg-white border-slate-200/85' : 'bg-slate-900 border-slate-800'
              }`}>
                <div className="flex gap-3">
                  <MapPin className={`w-5 h-5 ${colorTheme.text} shrink-0 mt-0.5`} />
                  <div>
                    <p className={`font-black ${themeMode === 'light' ? 'text-slate-900' : 'text-white'}`}>{t.contactAddressLabel}</p>
                    <p className={`mt-1 select-all font-semibold leading-relaxed ${
                      themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                    }`}>{t.contactAddressValue}</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                  <Phone className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className={`font-black ${themeMode === 'light' ? 'text-slate-900' : 'text-white'}`}>{t.contactPhoneLabel}</p>
                    <p className={`mt-1 select-all font-mono font-semibold ${
                      themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                    }`}>+62 812-1000-2026</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                  <Mail className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <p className={`font-black ${themeMode === 'light' ? 'text-slate-900' : 'text-white'}`}>{t.contactEmailLabel}</p>
                    <p className={`mt-1 select-all font-mono font-semibold ${
                      themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                    }`}>sekretariat@apn.or.id</p>
                  </div>
                </div>
              </div>

              {/* Fake Map Embed Placeholder */}
              <div className={`rounded-2xl p-8 border text-center flex flex-col justify-center items-center gap-2 select-none h-48 shadow-inner ${
                themeMode === 'light'
                  ? 'bg-slate-50 border-slate-200/80 text-slate-700'
                  : 'bg-slate-950 border-slate-900 text-slate-400'
              }`}>
                <MapPin className="w-8 h-8 text-slate-500 dark:text-slate-400 animate-bounce" />
                <p className={`font-black uppercase tracking-wider text-[11px] ${
                  themeMode === 'light' ? 'text-slate-800' : 'text-slate-300'
                }`}>{t.contactMapLabel}</p>
                <p className="text-[10px] font-semibold">{translateText("6.2088° S, 106.8456° E (Jakarta, Indonesia)", lang as any)}</p>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className={`border p-6 rounded-2xl shadow-md h-fit space-y-4 ${
              themeMode === 'light' ? 'bg-white border-slate-200/85' : 'bg-slate-900 border-slate-800'
            }`}>
              <h3 className={`font-extrabold mb-2 tracking-tight ${
                themeMode === 'light' ? 'text-slate-900' : 'text-white'
              }`}>{t.contactFormTitle}</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                    themeMode === 'light' ? 'text-slate-700' : 'text-slate-400'
                  }`}>{t.contactFormNameLabel}</label>
                  <input
                    type="text"
                    placeholder={t.contactFormNamePlaceholder}
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none transition-all font-semibold ${
                      themeMode === 'light'
                        ? `bg-slate-50 hover:bg-slate-100/50 text-slate-900 placeholder-slate-400 border-slate-200 focus:bg-white ${colorTheme.borderFocus}`
                        : `bg-slate-950 text-white placeholder-slate-500 border-slate-800 focus:bg-slate-900 ${colorTheme.borderFocus}`
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                    themeMode === 'light' ? 'text-slate-700' : 'text-slate-400'
                  }`}>{t.contactFormEmailLabel}</label>
                  <input
                    type="email"
                    placeholder={t.contactFormEmailPlaceholder}
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none transition-all font-semibold ${
                      themeMode === 'light'
                        ? `bg-slate-50 hover:bg-slate-100/50 text-slate-900 placeholder-slate-400 border-slate-200 focus:bg-white ${colorTheme.borderFocus}`
                        : `bg-slate-950 text-white placeholder-slate-500 border-slate-800 focus:bg-slate-900 ${colorTheme.borderFocus}`
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`font-extrabold uppercase tracking-wider text-[10px] ${
                    themeMode === 'light' ? 'text-slate-700' : 'text-slate-400'
                  }`}>{t.contactFormMessageLabel}</label>
                  <textarea
                    rows={3}
                    placeholder={t.contactFormMessagePlaceholder}
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none transition-all font-semibold ${
                      themeMode === 'light'
                        ? `bg-slate-50 hover:bg-slate-100/50 text-slate-900 placeholder-slate-400 border-slate-200 focus:bg-white ${colorTheme.borderFocus}`
                        : `bg-slate-950 text-white placeholder-slate-500 border-slate-800 focus:bg-slate-900 ${colorTheme.borderFocus}`
                    }`}
                  ></textarea>
                </div>
                <button
                  onClick={() => { alert(t.contactFormSuccess); }}
                  className={`w-full ${colorTheme.bg} ${colorTheme.bgHover} text-white font-black py-2.5 rounded-lg text-xs tracking-wide uppercase transition-all duration-150 cursor-pointer`}
                >
                  {t.contactFormSubmit}
                </button>
              </div>
            </div>
          </section>

        {/* SECTION CALL TO ACTION (CTA) */}
        <section id="cta-bottom" className="scroll-mt-24 pt-8">
          <div className="w-full bg-gradient-to-r from-slate-900 via-[#0e1726] to-slate-900 text-white p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-6">
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="inline-block bg-amber-500/10 text-[#ff9800] px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase border border-amber-500/20">
                {t.ctaSectionBadge}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                {t.ctaSectionTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
                {t.ctaSectionDesc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setActiveTab('membership');
                  setTimeout(() => {
                    document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }}
                className="w-full sm:w-auto bg-[#ff9800] hover:bg-[#f57c00] text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:shadow-[#ff9800]/15 transition-all cursor-pointer"
              >
                {t.ctaButtonReg}
              </button>
              <button
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/60 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                {t.ctaButtonConsult}
              </button>
            </div>
            
            <div className="pt-4 flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <span>{t.ctaFooter1}</span>
              <span>•</span>
              <span>{t.ctaFooter2}</span>
              <span>•</span>
              <span>{t.ctaFooter3}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
