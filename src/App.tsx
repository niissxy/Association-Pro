/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Globe,
  Palette,
  ShieldAlert,
  User,
  Settings,
  Flame,
  Layout,
  ExternalLink,
  Laptop,
  CheckCircle,
  HelpCircle,
  Clock,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';
import {
  Member,
  Invoice,
  Event,
  EventRegistration,
  Certificate,
  Document,
  Poll,
  PartnerInquiry,
  HelpdeskTicket,
  ActivityLog,
  UserRole
} from './types';
import { translations, LanguageCode, translateText } from './translations';
import {
  presetStyles,
  seedMembershipTypes,
  seedMembers,
  seedInvoices,
  seedEvents,
  seedRegistrations,
  seedCertificates,
  seedDocuments,
  seedPolls,
  seedPartnerInquiries,
  seedHelpdeskTickets,
  seedActivityLogs,
  seedSponsors,
  seedJobs
} from './seedData';
import PublicWebsite from './components/PublicWebsite';
import MemberPortal from './components/MemberPortal';
import AdminDashboard from './components/AdminDashboard';
import { BilingualProvider } from './components/BilingualProvider';
import AuthModal from './components/AuthModal';

export default function App() {
  // Locale State
  const [lang, setLang] = useState<LanguageCode>('id');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [activePreset, setActivePreset] = useState<string>('professional');

  // Interactive Roles for Demo Swapping
  const [currentRole, setCurrentRole] = useState<UserRole>('public');
  const [navSection, setNavSectionState] = useState<'public' | 'portal' | 'admin'>('public');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Authentication & Profile States
  const [loggedInMember, setLoggedInMember] = useState<Member | null>(() => {
    const saved = localStorage.getItem('apn_logged_in_member');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return null;
  });

  const [adminProfile, setAdminProfile] = useState(() => {
    const saved = localStorage.getItem('apn_admin_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return {
      name: 'Rania Sekretariat',
      email: 'admin@example.com',
      phone: '+62 812-3456-7890',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      password: 'password123'
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const setNavSection = (section: 'public' | 'portal' | 'admin') => {
    setNavSectionState(section);
    try {
      if (section === 'admin') {
        window.history.pushState(null, '', '/admin');
      } else if (section === 'portal') {
        window.history.pushState(null, '', '/portal');
      } else {
        window.history.pushState(null, '', '/');
      }
    } catch (e) {
      console.warn('HTML5 history push failed:', e);
    }
  };

  // Simple custom routing
  useEffect(() => {
    const handleLocationChange = () => {
      try {
        const path = window.location.pathname;
        const hash = window.location.hash;
        
        const savedMemberStr = localStorage.getItem('apn_logged_in_member');
        let currentSavedMember: Member | null = null;
        if (savedMemberStr) {
          try { currentSavedMember = JSON.parse(savedMemberStr); } catch (e) {}
        }
        
        const isAdmin = currentSavedMember && currentSavedMember.email === adminProfile.email;
        const isMember = currentSavedMember && currentSavedMember.email !== adminProfile.email;

        if (path === '/admin' || hash === '#/admin') {
          if (isAdmin) {
            setCurrentRole('super_admin');
            setNavSectionState('admin');
          } else {
            // Not logged in as admin - redirect to public and open login modal
            setNavSectionState('public');
            setIsAuthModalOpen(true);
            try {
              window.history.replaceState(null, '', '/');
            } catch (e) {}
          }
        } else if (path === '/portal' || hash === '#/portal') {
          if (isMember) {
            setCurrentRole('member');
            setNavSectionState('portal');
          } else {
            setNavSectionState('public');
            setIsAuthModalOpen(true);
            try {
              window.history.replaceState(null, '', '/');
            } catch (e) {}
          }
        } else {
          setNavSectionState('public');
        }
      } catch (e) {
        console.warn('Routing error:', e);
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [adminProfile.email]);

  // Core Data State (with local-storage hydrate)
  const [members, setMembers] = useState<Member[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [inquiries, setInquiries] = useState<PartnerInquiry[]>([]);
  const [tickets, setTickets] = useState<HelpdeskTicket[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  // Hydrate states with fallback to seeds
  useEffect(() => {
    const fetchStorageOrSeed = <T,>(key: string, seed: T): T => {
      const stored = localStorage.getItem(`apn_${key}`);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return seed;
        }
      }
      return seed;
    };

    setMembers(fetchStorageOrSeed('members', seedMembers));
    setInvoices(fetchStorageOrSeed('invoices', seedInvoices));
    setEvents(fetchStorageOrSeed('events', seedEvents));
    setRegistrations(fetchStorageOrSeed('registrations', seedRegistrations));
    setCertificates(fetchStorageOrSeed('certificates', seedCertificates));
    setDocuments(fetchStorageOrSeed('documents', seedDocuments));
    setPolls(fetchStorageOrSeed('polls', seedPolls));
    setInquiries(fetchStorageOrSeed('inquiries', seedPartnerInquiries));
    setTickets(fetchStorageOrSeed('tickets', seedHelpdeskTickets));
    setLogs(fetchStorageOrSeed('logs', seedActivityLogs));
  }, []);

  // Sync to localStorage
  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(`apn_${key}`, JSON.stringify(data));
  };

  const addLog = (userName: string, action: string, module: string) => {
    const newLog: ActivityLog = {
      id: 'al_' + Date.now(),
      userName,
      action,
      module,
      ipAddress: '112.215.11.' + Math.floor(Math.random() * 255),
      createdAt: new Date().toISOString()
    };
    const updated = [newLog, ...logs];
    setLogs(updated);
    saveToStorage('logs', updated);
  };

  const handleUpdateAdminProfile = (updatedFields: any) => {
    const updated = { ...adminProfile, ...updatedFields };
    setAdminProfile(updated);
    localStorage.setItem('apn_admin_profile', JSON.stringify(updated));
    addLog(updated.name, 'Memperbaharui setelan profil & kredensial admin', 'Management');
  };

  // Helper selectors for active member profiles
  const activeMember = loggedInMember || members.find(m => m.email === 'aditya.wirawan@example.com') || members[0];

  // Role changes update active navigations
  const handleRoleSwap = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'public') {
      setNavSection('public');
      setLoggedInMember(null);
      localStorage.removeItem('apn_logged_in_member');
    } else if (role === 'member') {
      setNavSection('portal');
      const aditya = members.find(m => m.email === 'aditya.wirawan@example.com') || members[0];
      if (aditya) {
        setLoggedInMember(aditya);
        localStorage.setItem('apn_logged_in_member', JSON.stringify(aditya));
      }
    } else {
      setNavSection('admin');
      setLoggedInMember(null);
      localStorage.removeItem('apn_logged_in_member');
    }
    const actorName = role === 'public' ? 'Guest' : role === 'member' ? (loggedInMember?.name || 'Aditya Wirawan') : adminProfile.name;
    addLog(actorName, `Berganti peran ke status: ${role}`, 'Authentication');
  };

  // Workflow Action 1: New Member Registration
  const handleRegisterMember = (form: Partial<Member>) => {
    const newM: Member = {
      id: 'm_' + Date.now(),
      name: form.name || 'Pendaftar Baru',
      email: form.email || 'email@example.com',
      phone: form.phone || '+62',
      memberNumber: 'PENDING_VERIF',
      membershipTypeId: form.membershipTypeId || 'professional-member',
      organizationName: form.organizationName || 'Instansi Mandiri',
      profession: form.profession || 'Pekerja',
      industry: form.industry || 'Umum',
      city: form.city || 'Jakarta',
      province: form.province || 'DKI Jakarta',
      country: 'Indonesia',
      bio: form.bio,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      profileCompletion: 60,
      showEmail: true,
      showPhone: false,
      isVerified: false,
      createdAt: new Date().toISOString()
    };
    const updated = [newM, ...members];
    setMembers(updated);
    saveToStorage('members', updated);
    addLog(newM.name, 'Mengirimkan formulir pendaftaran anggota baru', 'Membership');
  };

  // Workflow Action 2: Secretariat approval (Creates invoice of the membership level!)
  const handleApproveMember = (memberId: string) => {
    const target = members.find(m => m.id === memberId);
    if (!target) return;

    // 1. Get price for the membershipType
    const mType = seedMembershipTypes.find(t => t.id === target.membershipTypeId);
    const fee = mType ? mType.price : 750000;

    // 2. Generate invoice
    const newInvoice: Invoice = {
      id: 'inv_' + Date.now(),
      invoiceNumber: 'INV-APN-2026-00' + Math.floor(1000 + Math.random() * 9000),
      userEmail: target.email,
      type: 'membership_renewal',
      subtotal: fee,
      discount: 0,
      penalty: 0,
      total: fee,
      status: 'unpaid',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedInvoices = [newInvoice, ...invoices];
    setInvoices(updatedInvoices);
    saveToStorage('invoices', updatedInvoices);

    // 3. Update member status to approved
    const updatedMembers = members.map(m => {
      if (m.id === memberId) {
        return { ...m, status: 'approved' as const };
      }
      return m;
    });
    setMembers(updatedMembers);
    saveToStorage('members', updatedMembers);

    addLog('Sekretariat Rania', `Menyetujui pendaftaran ${target.name} & menerbitkan Invoice ${newInvoice.invoiceNumber}`, 'Membership');
  };

  const handleRejectMember = (memberId: string) => {
    const updated = members.map(m => m.id === memberId ? { ...m, status: 'rejected' as const } : m);
    setMembers(updated);
    saveToStorage('members', updated);
    addLog('Sekretariat Rania', 'Menolak berkas keanggotaan pendaftar', 'Membership');
  };

  // Workflow Action 3: Payment Confirmation by Admin Finance (Converts status to ACTIVE and issues automatic Member Number!)
  const handleApprovePayment = (invoiceId: string) => {
    const inv = invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    // 1. Update invoice status to PAID
    const updatedInvs = invoices.map(i => i.id === invoiceId ? { ...i, status: 'paid' as const, paidAt: new Date().toISOString() } : i);
    setInvoices(updatedInvs);
    saveToStorage('invoices', updatedInvs);

    if (inv.type === 'event_registration') {
      // Find and update corresponding Event Registration paymentStatus to 'paid'
      const updatedRegs = registrations.map(r => {
        // Match by registrationId if saved on invoice, otherwise fallback to matching userEmail & eventId
        const isMatch = inv.registrationId 
          ? r.id === inv.registrationId 
          : (r.userEmail === inv.userEmail && r.eventId === inv.eventId && r.paymentStatus === 'unpaid');
        if (isMatch) {
          return { ...r, paymentStatus: 'paid' as const };
        }
        return r;
      });
      setRegistrations(updatedRegs);
      saveToStorage('registrations', updatedRegs);

      const ev = events.find(e => e.id === inv.eventId);
      addLog('Finance Bima', `Memverifikasi sukses bayar invoice ${inv.invoiceNumber} untuk Pendaftaran Acara ${ev ? `"${ev.title}"` : ''}`, 'Finance');
    } else {
      // 2. Locate corresponding member and change to active + generate official Member Number format APP-2026-XXXXXX / APN-2026-XXXXXX
      const cleanEmail = inv.userEmail;
      const serialSuffix = Math.floor(100000 + Math.random() * 900000);
      const updatedMems = members.map(m => {
        if (m.email === cleanEmail) {
          return {
            ...m,
            status: 'active' as const,
            memberNumber: `APN-2026-${serialSuffix}`,
            badge: 'Verified Member',
            isVerified: true
          };
        }
        return m;
      });
      setMembers(updatedMems);
      saveToStorage('members', updatedMems);

      addLog('Finance Bima', `Memverifikasi sukses bayar invoice ${inv.invoiceNumber} -> Mengeluarkan ID Anggota Baru`, 'Finance');
    }
  };

  // Workflow Action 4: Register to Event (Inserts invoice event)
  const handleRegisterEvent = (eventId: string, email: string) => {
    // Prevent duplicate registrations
    const alreadyRegistered = registrations.some(r => r.eventId === eventId && r.userEmail === email);
    if (alreadyRegistered) {
      addLog(email, `Mencoba mendaftar ganda untuk acara kompetensi`, 'Events');
      return;
    }

    const mType = members.find(m => m.email === email);
    const ev = events.find(e => e.id === eventId);
    if (!ev) return;

    // Determine pricing
    const price = mType ? ev.memberPrice : (ev.publicPrice || 1500000);

    const matchRegId = 'er_' + Date.now();
    const newReg: EventRegistration = {
      id: matchRegId,
      eventId,
      userEmail: email,
      ticketNumber: 'TICKET-APN-2026-' + Math.floor(10000 + Math.random() * 90000),
      registrationStatus: 'confirmed',
      paymentStatus: price === 0 ? 'free' : 'unpaid',
      attended: false,
      feedbackSubmitted: false,
      certificateGenerated: false,
      createdAt: new Date().toISOString()
    };

    const updatedRegs = [newReg, ...registrations];
    setRegistrations(updatedRegs);
    saveToStorage('registrations', updatedRegs);

    // Increment registeredCount for the event
    const updatedEvents = events.map(e => e.id === eventId ? { ...e, registeredCount: (e.registeredCount || 0) + 1 } : e);
    setEvents(updatedEvents);
    saveToStorage('events', updatedEvents);

    if (price > 0) {
      const newInv: Invoice = {
        id: 'inv_ev_' + Date.now(),
        invoiceNumber: 'INV-APN-2026-' + Math.floor(100000 + Math.random() * 900000),
        userEmail: email,
        type: 'event_registration',
        subtotal: price,
        discount: 0,
        penalty: 0,
        total: price,
        status: 'unpaid',
        dueDate: new Date().toISOString().split('T')[0],
        eventId: eventId,
        registrationId: matchRegId,
        createdAt: new Date().toISOString()
      };
      const updatedInvs = [newInv, ...invoices];
      setInvoices(updatedInvs);
      saveToStorage('invoices', updatedInvs);
    }

    addLog(email, `Mendaftar acara kompetensi: ${ev.title}`, 'Events');
  };

  // Workflow Action 5: Emulate QR scan & manual check-in of a Ticket
  const handleCheckInTicket = (ticketNo: string): string => {
    const reg = registrations.find(r => r.ticketNumber.toUpperCase() === ticketNo.toUpperCase());
    if (!reg) return '❌ ERROR: Tiket number tidak terdaftar di basis data.';

    const ev = events.find(e => e.id === reg.eventId);
    if (!ev) return '❌ ERROR: Identifikasi event korup.';

    const updated = registrations.map(r => r.id === reg.id ? { ...r, attended: true, checkedInAt: new Date().toISOString() } : r);
    setRegistrations(updated);
    saveToStorage('registrations', updated);

    addLog('Event Admin Laras', `Berhasil melakukan scan QR check-in tiket: ${ticketNo}`, 'Events');
    return `✔ SUCCESS: Selamat Datang ${reg.userEmail}! Check-in untuk "${ev.title}" dikonfirmasi.`;
  };

  // Workflow Action 6: Member completes Event Feedback Survey -> auto-generates QR verified certificate!
  const handleTriggerEventReview = (registrationId: string) => {
    const reg = registrations.find(r => r.id === registrationId);
    if (!reg) return;

    const ev = events.find(e => e.id === reg.eventId);
    if (!ev) return;

    const serialStr = Math.floor(100000 + Math.random() * 900000);
    const newCert: Certificate = {
      id: 'cert_' + Date.now(),
      certificateNumber: `CERT-APN-2026-${serialStr}`,
      memberEmail: reg.userEmail,
      eventTitle: ev.title,
      title: `Certificate of Active Attainment - ${ev.category} Class`,
      issuedDate: new Date().toISOString().split('T')[0],
      cpdPoints: ev.cpdPoints,
      status: 'valid',
      verificationUrl: `/certificates/verify/CERT-APN-2026-${serialStr}`
    };

    // Update registration state
    const updatedRegs = registrations.map(r => r.id === registrationId ? { ...r, feedbackSubmitted: true, certificateGenerated: true } : r);
    setRegistrations(updatedRegs);
    saveToStorage('registrations', updatedRegs);

    const updatedCerts = [newCert, ...certificates];
    setCertificates(updatedCerts);
    saveToStorage('certificates', updatedCerts);

    addLog(reg.userEmail, `Menyelesaikan survei ulasan -> Menerbitkan dokumen Sertifikat Seri ${newCert.certificateNumber}`, 'Certificates');
  };

  // Invoice manual transfer settlement
  const handlePayInvoice = (invoiceId: string, method: string, proofUrl?: string) => {
    const updated = invoices.map(i => {
      if (i.id === invoiceId) {
        return {
          ...i,
          status: 'pending_confirmation' as const,
          paymentMethod: method,
          proofUrl: proofUrl || 'simulated_proof.png'
        };
      }
      return i;
    });
    setInvoices(updated);
    saveToStorage('invoices', updated);
    addLog(activeMember.name, `Mengirimkan konfirmasi bayar iuran via ${method}`, 'Finance');
  };

  // Democracy Vote cast
  const handleVote = (pollId: string, optionId: string) => {
    const updatedPolls = polls.map(p => {
      if (p.id === pollId) {
        const updatedOpts = p.options.map(o => o.id === optionId ? { ...o, votes: o.votes + 1 } : o);
        return {
          ...p,
          options: updatedOpts,
          votedEmails: [...p.votedEmails, activeMember.email]
        };
      }
      return p;
    });
    setPolls(updatedPolls);
    saveToStorage('polls', updatedPolls);
    addLog(activeMember.name, 'Menyalurkan pilihan voting kepenasihatan komite', 'Voting');
  };

  // Submission partners inquiry
  const handleSendPartnerInquiry = (inq: any) => {
    const newI: PartnerInquiry = {
      id: 'pi_' + Date.now(),
      companyName: inq.companyName,
      contactName: inq.contactName,
      email: inq.email,
      phone: inq.phone || '+62',
      interestType: inq.interestType,
      message: inq.message,
      status: 'New',
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newI, ...inquiries];
    setInquiries(updated);
    saveToStorage('inquiries', updated);
    addLog(inq.companyName, 'Mengajukan proposal sponsorship kemitraan strategis', 'CRM Pipeline');
  };

  // Submission Helpdesk Tickets
  const handleSubmitTicket = (subj: string, msg: string, cat: string) => {
    const newT: HelpdeskTicket = {
      id: 'tkt_' + Date.now(),
      userEmail: activeMember.email,
      subject: subj,
      message: msg,
      category: cat,
      priority: 'medium',
      status: 'open',
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newT, ...tickets];
    setTickets(updated);
    saveToStorage('tickets', updated);
    addLog(activeMember.name, `Membentuk tiket aduan masalah: ${subj}`, 'Helpdesk');
  };

  const handleSolveTicket = (ticketId: string) => {
    const updated = tickets.map(t => t.id === ticketId ? { ...t, status: 'resolved' as const } : t);
    setTickets(updated);
    saveToStorage('tickets', updated);
    addLog('Staf Sekretariat', 'Menandai penyelesaian keluhan member', 'Helpdesk');
  };

  const handleAddEvent = (evt: Partial<Event>) => {
    const matchId = 'e_' + Date.now();
    const newE: Event = {
      id: matchId,
      title: evt.title || 'Seminar Standardisasi',
      slug: evt.slug || 'seminar_slug',
      category: evt.category || 'Conference',
      format: evt.format || 'Hybrid',
      location: evt.location || 'Zoom',
      description: evt.description || 'Pemberian kredit CPD penting.',
      startDatetime: evt.startDatetime || '2026-09-01T09:00:00',
      endDatetime: evt.startDatetime || '2026-09-01T17:00:00',
      memberPrice: evt.memberPrice || 0,
      publicPrice: evt.publicPrice || 1000000,
      quota: evt.quota || 100,
      status: 'open_registration',
      cpdPoints: evt.cpdPoints || 4,
      registeredCount: 0
    };
    const updated = [newE, ...events];
    setEvents(updated);
    saveToStorage('events', updated);
    addLog('Event coordinator Laras', `Menerbitkan pengumuman seminar baru: ${newE.title}`, 'Events');
  };

  const handleAddDocument = (dObj: Partial<Document>) => {
    const newD: Document = {
      id: 'doc_' + Date.now(),
      title: dObj.title || 'Berkas Baru',
      category: dObj.category || 'Legal',
      accessLevel: dObj.accessLevel || 'members_only',
      version: dObj.version || '1.0',
      tags: dObj.tags || ['AD-ART'],
      downloadCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newD, ...documents];
    setDocuments(updated);
    saveToStorage('documents', updated);
    addLog('Content Editor Dion', `Mengunggah lembar peraturan baru: ${newD.title}`, 'Documents');
  };

  const handleAddPoll = (pObj: Partial<Poll>) => {
    const newP: Poll = {
      id: 'pl_' + Date.now(),
      title: pObj.title || 'Proposal Baru',
      description: pObj.description || '',
      type: pObj.type || 'poll',
      eligibility: pObj.eligibility || 'all_members',
      isAnonymous: pObj.isAnonymous !== undefined ? pObj.isAnonymous : true,
      status: 'active',
      options: pObj.options || [],
      votedEmails: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newP, ...polls];
    setPolls(updated);
    saveToStorage('polls', updated);
    addLog('Admin Utama', `Membuka agenda bilik e-voting legislatif: ${newP.title}`, 'Voting');
  };

  const handleUpdateInquiryStatus = (inqId: string, status: any) => {
    const updated = inquiries.map(i => i.id === inqId ? { ...i, status } : i);
    setInquiries(updated);
    saveToStorage('inquiries', updated);
    addLog('Sponsor Advisor', 'Mengubah status kemitraan sponsor', 'CRM Pipeline');
  };

  // Grab selected preset classes
  const colorThemeMap: Record<string, {
    accentBg: string;
    accentBgHover: string;
    accentText: string;
    accentBorder: string;
    accentRing: string;
    accentLightBg: string;
    accentBadge: string;
    accentTextHover: string;
  }> = {
    professional: {
      accentBg: 'bg-amber-500',
      accentBgHover: 'hover:bg-amber-600',
      accentText: 'text-amber-500',
      accentTextHover: 'hover:text-amber-600',
      accentBorder: 'border-amber-500',
      accentRing: 'ring-amber-100',
      accentLightBg: 'bg-amber-500/10',
      accentBadge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
    },
    business: {
      accentBg: 'bg-emerald-500',
      accentBgHover: 'hover:bg-emerald-600',
      accentText: 'text-emerald-500',
      accentTextHover: 'hover:text-emerald-600',
      accentBorder: 'border-emerald-500',
      accentRing: 'ring-emerald-100',
      accentLightBg: 'bg-emerald-500/10',
      accentBadge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
    },
    industry: {
      accentBg: 'bg-orange-500',
      accentBgHover: 'hover:bg-orange-600',
      accentText: 'text-orange-500',
      accentTextHover: 'hover:text-orange-600',
      accentBorder: 'border-orange-500',
      accentRing: 'ring-orange-100',
      accentLightBg: 'bg-orange-500/10',
      accentBadge: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20'
    },
    alumni: {
      accentBg: 'bg-yellow-500',
      accentBgHover: 'hover:bg-yellow-600',
      accentText: 'text-yellow-500',
      accentTextHover: 'hover:text-yellow-600',
      accentBorder: 'border-yellow-500',
      accentRing: 'ring-yellow-100',
      accentLightBg: 'bg-yellow-500/10',
      accentBadge: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20'
    },
    creative: {
      accentBg: 'bg-pink-500',
      accentBgHover: 'hover:bg-pink-600',
      accentText: 'text-pink-500',
      accentTextHover: 'hover:text-pink-600',
      accentBorder: 'border-pink-500',
      accentRing: 'ring-pink-100',
      accentLightBg: 'bg-pink-500/10',
      accentBadge: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20'
    },
    certification: {
      accentBg: 'bg-sky-500',
      accentBgHover: 'hover:bg-sky-600',
      accentText: 'text-sky-500',
      accentTextHover: 'hover:text-sky-600',
      accentBorder: 'border-sky-500',
      accentRing: 'ring-sky-100',
      accentLightBg: 'bg-sky-500/10',
      accentBadge: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20'
    },
    executive: {
      accentBg: 'bg-amber-600',
      accentBgHover: 'hover:bg-amber-700',
      accentText: 'text-amber-500',
      accentTextHover: 'hover:text-amber-600',
      accentBorder: 'border-amber-600',
      accentRing: 'ring-amber-200',
      accentLightBg: 'bg-amber-600/10',
      accentBadge: 'bg-amber-600/10 text-amber-600 dark:text-amber-400 border border-amber-600/20'
    }
  };

  const styleConfig = presetStyles.find(p => p.id === activePreset) || presetStyles[0];
  const t = translations[lang];
  const activeColor = colorThemeMap[activePreset] || colorThemeMap.professional;

  return (
    <BilingualProvider lang={lang}>
      <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        themeMode === 'dark' ? 'bg-[#090d16] text-slate-100 dark' : 'bg-[#f8fafc] text-slate-800'
      }`}>


      {/* SINGLE COMPACT PREMIUM HEADER */}
      {navSection !== 'public' && (
        <header className={`${
          themeMode === 'light'
            ? 'bg-white/95 backdrop-blur-md text-black border-b border-slate-200'
            : `${styleConfig.themeClass.navbar}/95 backdrop-blur-md border-b border-slate-800/60`
        } transition-all shadow-sm sticky top-0 z-50`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            {/* DESKTOP HEADER */}
            <div className="hidden lg:flex items-center justify-between gap-6">
              {/* Logo & Brand */}
              <div className="flex items-center gap-2.5 shrink-0 select-none cursor-pointer" onClick={() => { setNavSection('public'); setIsMobileMenuOpen(false); }}>
                <svg viewBox="0 0 100 100" className="w-9 h-9 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer circular swooshes */}
                  <path d="M 50,5 A 45,45 0 0,0 15,75" stroke="#0284c7" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                  <path d="M 85,30 A 45,45 0 0,1 50,95 A 45,45 0 0,1 35,92" stroke="#d97706" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                  
                  {/* Stylized 'A' shape */}
                  <path d="M 50,15 L 18,80 L 32,80 L 50,44 L 68,80 L 82,80 Z" fill={themeMode === 'light' ? '#0f172a' : '#f8fafc'} />
                  
                  {/* People figures inside (as the crossbar) */}
                  {/* Left person (Gold) */}
                  <circle cx="39" cy="55" r="5" fill="#d97706" />
                  <path d="M 34,65 C 34,60 44,60 44,65 L 44,78 L 34,78 Z" fill="#d97706" />
                  
                  {/* Center person (Blue) */}
                  <circle cx="50" cy="51" r="5.5" fill="#0284c7" />
                  <path d="M 44.5,62 C 44.5,56.5 55.5,56.5 55.5,62 L 55.5,78 L 44.5,78 Z" fill="#0284c7" />
                  
                  {/* Right person (Gold) */}
                  <circle cx="61" cy="55" r="5" fill="#d97706" />
                  <path d="M 56,65 C 56,60 66,60 66,65 L 66,78 L 56,78 Z" fill="#d97706" />
                </svg>
                <div>
                  <span className={`font-black text-xs sm:text-[13px] uppercase tracking-tight block ${activeColor.accentText}`}>{t.appName}</span>
                  <span className={`text-[8.5px] font-extrabold uppercase tracking-widest ${themeMode === 'light' ? 'text-black' : 'text-slate-400'}`}>{styleConfig.name}</span>
                </div>
              </div>

              {/* Nav Tabs */}
              <div className="flex items-center gap-4 text-xs font-black">
                <button
                  onClick={() => setNavSection('public')}
                  className={`uppercase tracking-wider pb-1 transition-all cursor-pointer ${
                    navSection === 'public'
                      ? `${activeColor.accentText} border-b-2 ${activeColor.accentBorder}`
                      : themeMode === 'light'
                      ? 'text-black hover:text-black/70'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  Web Publik
                </button>
                
                {currentRole === 'member' && (
                  <button
                    onClick={() => setNavSection('portal')}
                    className={`uppercase tracking-wider pb-1 transition-all cursor-pointer ${
                      navSection === 'portal'
                        ? `${activeColor.accentText} border-b-2 ${activeColor.accentBorder}`
                        : themeMode === 'light'
                        ? 'text-black hover:text-black/70'
                        : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    Portal Saya
                  </button>
                )}

                {currentRole !== 'public' && currentRole !== 'member' && (
                  <button
                    onClick={() => setNavSection('admin')}
                    className={`uppercase tracking-wider pb-1 transition-all cursor-pointer ${
                      navSection === 'admin'
                        ? `${activeColor.accentText} border-b-2 ${activeColor.accentBorder}`
                        : themeMode === 'light'
                        ? 'text-black hover:text-black/70'
                        : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    Dasbor Manajemen
                  </button>
                )}
              </div>

              {/* Settings & Testing Controls combined on the right */}
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
                      onChange={e => setLang(e.target.value as LanguageCode)}
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
              </div>
            </div>

            {/* MOBILE HEADER */}
            <div className="flex lg:hidden items-center justify-between">
              {/* Logo & Brand Left */}
              <div className="flex items-center gap-2 select-none cursor-pointer" onClick={() => { setNavSection('public'); setIsMobileMenuOpen(false); }}>
                <svg viewBox="0 0 100 100" className="w-8 h-8 drop-shadow-sm shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 50,5 A 45,45 0 0,0 15,75" stroke="#0284c7" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                  <path d="M 85,30 A 45,45 0 0,1 50,95 A 45,45 0 0,1 35,92" stroke="#d97706" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                  <path d="M 50,15 L 18,80 L 32,80 L 50,44 L 68,80 L 82,80 Z" fill={themeMode === 'light' ? '#0f172a' : '#f8fafc'} />
                  <circle cx="39" cy="55" r="5" fill="#d97706" />
                  <path d="M 34,65 C 34,60 44,60 44,65 L 44,78 L 34,78 Z" fill="#d97706" />
                  <circle cx="50" cy="51" r="5.5" fill="#0284c7" />
                  <path d="M 44.5,62 C 44.5,56.5 55.5,56.5 55.5,62 L 55.5,78 L 44.5,78 Z" fill="#0284c7" />
                  <circle cx="61" cy="55" r="5" fill="#d97706" />
                  <path d="M 56,65 C 56,60 66,60 66,65 L 66,78 L 56,78 Z" fill="#d97706" />
                </svg>
                <div>
                  <span className={`font-black text-[11px] uppercase tracking-tight block ${activeColor.accentText}`}>{t.appName}</span>
                  <span className={`text-[8px] font-extrabold uppercase tracking-widest ${themeMode === 'light' ? 'text-black/80' : 'text-slate-400'}`}>{styleConfig.name}</span>
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
                    onChange={e => setLang(e.target.value as LanguageCode)}
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
                {/* Navigation Items list */}
                <div className="flex flex-col gap-1 mb-4">
                  <button
                    onClick={() => {
                      setNavSection('public');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-3 rounded-xl transition-all font-black text-xs flex items-center justify-between cursor-pointer ${
                      navSection === 'public'
                        ? themeMode === 'light'
                          ? 'bg-amber-500/10 text-amber-700 font-bold border border-amber-200 shadow-xs'
                          : 'bg-amber-500/20 text-amber-400 font-bold border border-amber-500/20 shadow-xs'
                        : themeMode === 'light'
                        ? 'text-slate-800 hover:bg-slate-50'
                        : 'text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-sm">🌐</span>
                      <span>Web Publik</span>
                    </span>
                  </button>

                  {currentRole === 'member' && (
                    <button
                      onClick={() => {
                        setNavSection('portal');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-3 rounded-xl transition-all font-black text-xs flex items-center justify-between cursor-pointer ${
                        navSection === 'portal'
                          ? themeMode === 'light'
                            ? 'bg-blue-500/10 text-blue-700 font-bold border border-blue-200 shadow-xs'
                            : 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/20 shadow-xs'
                          : themeMode === 'light'
                          ? 'text-slate-800 hover:bg-slate-50'
                          : 'text-slate-200 hover:bg-slate-900/60'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-sm">👤</span>
                        <span>Portal Saya</span>
                      </span>
                    </button>
                  )}

                  {currentRole !== 'public' && currentRole !== 'member' && (
                    <button
                      onClick={() => {
                        setNavSection('admin');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-3 rounded-xl transition-all font-black text-xs flex items-center justify-between cursor-pointer ${
                        navSection === 'admin'
                          ? themeMode === 'light'
                            ? 'bg-amber-500/10 text-amber-700 font-bold border border-amber-200 shadow-xs'
                            : 'bg-amber-500/20 text-amber-400 font-bold border border-amber-500/20 shadow-xs'
                          : themeMode === 'light'
                          ? 'text-slate-800 hover:bg-slate-50'
                          : 'text-slate-200 hover:bg-slate-900/60'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-sm">💼</span>
                        <span>Dasbor Manajemen</span>
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>
      )}

      {/* PRIMARY ACTIVE CONTENT DISPLAY SYSTEM */}
      <div className="flex-1">
        {navSection === 'public' && (
          <PublicWebsite
            t={t}
            lang={lang}
            setLang={setLang}
            themeStyle={styleConfig.themeClass}
            themeMode={themeMode}
            setThemeMode={setThemeMode}
            members={members}
            events={events}
            membershipTypes={seedMembershipTypes}
            documents={documents}
            jobs={seedJobs}
            sponsors={seedSponsors}
            certificates={certificates}
            onRegisterMember={handleRegisterMember}
            onRegisterEvent={handleRegisterEvent}
            onSendPartnerInquiry={handleSendPartnerInquiry}
            currentRole={currentRole}
            navSection={navSection}
            setNavSection={setNavSection}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            loggedInMember={loggedInMember}
            onLogout={() => handleRoleSwap('public')}
          />
        )}

        {navSection === 'portal' && (
          <div className="max-w-7xl mx-auto p-4 sm:p-8">
            <MemberPortal
              t={t}
              lang={lang}
              themeStyle={styleConfig.themeClass}
              themeMode={themeMode}
              currentMember={activeMember}
              invoices={invoices}
              events={events}
              registrations={registrations}
              certificates={certificates}
              documents={documents}
              polls={polls}
              tickets={tickets}
              onUpdateMember={(fields) => {
                const updated = members.map(m => m.id === activeMember.id ? { ...m, ...fields } : m);
                setMembers(updated);
                saveToStorage('members', updated);
                
                // Keep the loggedInMember state synchronized too!
                if (loggedInMember && loggedInMember.id === activeMember.id) {
                  const updatedMember = { ...loggedInMember, ...fields };
                  setLoggedInMember(updatedMember);
                  localStorage.setItem('apn_logged_in_member', JSON.stringify(updatedMember));
                }
                
                addLog(activeMember.name, 'Memperbaharui setelan privasi dan biodata instansi', 'Membership');
              }}
              onPayInvoice={handlePayInvoice}
              onApprovePayment={handleApprovePayment}
              onVote={handleVote}
              onSubmitTicket={handleSubmitTicket}
              onTriggerEventReview={handleTriggerEventReview}
              onLogOut={() => handleRoleSwap('public')}
            />
          </div>
        )}

        {navSection === 'admin' && (
          <div className="max-w-7xl mx-auto p-4 sm:p-8">
            <div className={`${
              themeMode === 'light'
                ? 'bg-white text-slate-800 border-slate-200/80 shadow-xs'
                : 'bg-[#0f172a] text-white border-slate-800 shadow-sm'
            } rounded-2xl p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 border`}>
              <div className="space-y-1">
                <span className={`${
                  themeMode === 'light'
                    ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                    : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/25'
                } border px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider`}>
                  Hak Akses: Staf Kepengurusan APN
                </span>
                <h3 className="text-xl font-black mt-2 tracking-tight">Pusat Administrasi & Database Nasional</h3>
                <p className={`text-xs ${themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Gunakan bilah di bawah untuk beralih periksa tagihan VA, scan QR registrasi fisik, atau moderasi legal AD/ART.</p>
              </div>
              <div className={`text-xs font-semibold ${themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'} shrink-0`}>
                Waktu Sinkron: <span className={`font-mono ${activeColor.accentText}`}>2026-06-03 UTC</span>
              </div>
            </div>

            <AdminDashboard
              t={t}
              lang={lang}
              themeStyle={styleConfig.themeClass}
              themeMode={themeMode}
              members={members}
              invoices={invoices}
              events={events}
              registrations={registrations}
              certificates={certificates}
              documents={documents}
              polls={polls}
              inquiries={inquiries}
              tickets={tickets}
              logs={logs}
              onApproveMember={handleApproveMember}
              onRejectMember={handleRejectMember}
              onApprovePayment={handleApprovePayment}
              onAddEvent={handleAddEvent}
              onAddDocument={handleAddDocument}
              onCheckInTicket={handleCheckInTicket}
              onUpdateInquiryStatus={handleUpdateInquiryStatus}
              onAddPoll={handleAddPoll}
              onSolveTicket={handleSolveTicket}
              adminProfile={adminProfile}
              onUpdateAdminProfile={handleUpdateAdminProfile}
              onLogOut={() => handleRoleSwap('public')}
            />
          </div>
        )}
      </div>

      {/* FOOTER SECTION */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-10 px-4 sm:px-8 border-t border-slate-900/40 text-center select-none mt-16 transition-colors">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="font-bold text-slate-200 flex items-center justify-center gap-2">🛡️ {t.organizationName} (APN)</p>
          <p className="text-[11px] leading-relaxed max-w-xl mx-auto text-slate-500 font-medium">
            {translateText("Badan pengesahan akreditasi keanggotaan profesi nasional yang diakui resmi di bawah nomor Akta AHU RI No. AHU-0012345.AH.01.07.TAHUN.2018. Segala bentuk pelanggaran penyalinan sertifikat tervalidasi dipidana hukum.", lang as any)}
          </p>
          <p className="text-[10px] text-slate-600 font-mono italic flex flex-wrap items-center justify-center gap-1.5">
            <span>© 2018-2026 Archipelago Professionals Authority. {t.allRightsReserved}</span>
            <span className="text-slate-700 font-sans font-bold">|</span>
            <span>{translateText("Dibuat oleh", lang as any)} <a href="https://contech.id" target="_blank" rel="noopener noreferrer" className="text-amber-500/80 hover:text-amber-500 underline transition-all font-sans font-bold">Contech ID</a></span>
          </p>
        </div>
      </footer>

      {/* AUTHENTICATION MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        members={members}
        onRegister={(name, email, phone, pass) => {
          handleRegisterMember({
            name,
            email,
            phone,
            password: pass,
            status: 'active' // Immediately active for seamless demo experience
          });
        }}
        onLoginSuccess={(member, role) => {
          setLoggedInMember(member);
          localStorage.setItem('apn_logged_in_member', JSON.stringify(member));
          if (role === 'super_admin') {
            setCurrentRole('super_admin');
            setNavSection('admin');
          } else {
            setCurrentRole('member');
            setNavSection('portal');
          }
        }}
        themeMode={themeMode}
        adminEmail={adminProfile.email}
        adminPass={adminProfile.password}
      />
      </div>
    </BilingualProvider>
  );
}
