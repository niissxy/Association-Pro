/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  MembershipType,
  Member,
  CorporateMember,
  Invoice,
  Event,
  Speaker,
  EventAgenda,
  EventRegistration,
  Certificate,
  Document,
  Sponsor,
  JobOpportunity,
  Poll,
  User,
  PartnerInquiry,
  HelpdeskTicket,
  ActivityLog
} from './types';

export const presetStyles = [
  {
    id: 'professional',
    name: 'Professional Association',
    tag: 'Dokter, Lawyer, Akuntan, Arsitek',
    themeClass: {
      primary: 'bg-slate-900 text-white',
      accent: 'text-amber-500 border-amber-500',
      canvas: 'bg-white',
      navbar: 'bg-slate-900 border-b border-slate-800 text-slate-100',
      card: 'bg-white border border-slate-100 shadow-sm'
    }
  },
  {
    id: 'business',
    name: 'Business Chamber',
    tag: 'Pengusaha, Kadin, HIPMI, Komunitas Bisnis',
    themeClass: {
      primary: 'bg-blue-950 text-white',
      accent: 'text-emerald-500 border-emerald-500',
      canvas: 'bg-slate-50',
      navbar: 'bg-blue-950 border-b border-blue-900 text-slate-100',
      card: 'bg-white border border-blue-100 shadow-sm'
    }
  },
  {
    id: 'industry',
    name: 'Industry Alliance',
    tag: 'Manufaktur, Properti, Konstruksi, Logistik',
    themeClass: {
      primary: 'bg-[#0f172a] text-white',
      accent: 'text-orange-500 border-orange-500',
      canvas: 'bg-[#f8fafc]',
      navbar: 'bg-[#0f172a] text-slate-100',
      card: 'bg-white border border-slate-200'
    }
  },
  {
    id: 'alumni',
    name: 'Alumni Network',
    tag: 'Alumni Kampus, Sekolah, Pesantren',
    themeClass: {
      primary: 'bg-[#7f1d1d] text-white',
      accent: 'text-[#fef08a] border-[#eab308]',
      canvas: 'bg-orange-50/10',
      navbar: 'bg-[#7f1d1d] text-white',
      card: 'bg-white border border-red-100 shadow-xs'
    }
  },
  {
    id: 'creative',
    name: 'Creative Community',
    tag: 'Desainer, Startup, Kreator, Media',
    themeClass: {
      primary: 'bg-indigo-950 text-white',
      accent: 'text-pink-500 border-pink-500',
      canvas: 'bg-[#fafafa]',
      navbar: 'bg-indigo-950 text-white',
      card: 'bg-white border border-pink-100'
    }
  },
  {
    id: 'certification',
    name: 'Certification Body',
    tag: 'Lembaga Sertifikasi / Profesi',
    themeClass: {
      primary: 'bg-[#0369a1] text-white',
      accent: 'text-[#22c55e] border-[#22c55e]',
      canvas: 'bg-[#f0f9ff]/30',
      navbar: 'bg-[#0369a1] text-white',
      card: 'bg-white border border-sky-100'
    }
  },
  {
    id: 'executive',
    name: 'Executive Club',
    tag: 'Founder Club, Investor Club, Executive Club',
    themeClass: {
      primary: 'bg-[#020617] text-amber-100',
      accent: 'text-[#d97706] border-[#d97706]',
      canvas: 'bg-slate-950 text-slate-100',
      navbar: 'bg-[#020617] text-white border-b border-amber-900/50',
      card: 'bg-[#0b1329] border border-amber-900/30 text-slate-100'
    }
  }
];

export const seedMembershipTypes: MembershipType[] = [
  {
    id: 'student-member',
    name: 'Student Member',
    slug: 'student-member',
    price: 250000,
    billingCycle: 'yearly',
    description: 'Keanggotaan untuk mahasiswa atau pelajar tingkat akhir yang ingin membangun jaringan profesional sejak dini.',
    benefits: [
      'Akses event komunitas',
      'Harga khusus pelatihan',
      'Akses dokumen publik',
      'Profil anggota student',
      'Newsletter bulanan'
    ]
  },
  {
    id: 'professional-member',
    name: 'Professional Member',
    slug: 'professional-member',
    price: 750000,
    billingCycle: 'yearly',
    description: 'Keanggotaan utama untuk profesional aktif dari berbagai industri.',
    benefits: [
      'Direktori anggota profesional',
      'Harga khusus event',
      'Akses dokumen anggota',
      'E-certificate',
      'Job board',
      'Voting anggota',
      'Newsletter eksklusif'
    ]
  },
  {
    id: 'corporate-member',
    name: 'Corporate Member',
    slug: 'corporate-member',
    price: 5000000,
    billingCycle: 'yearly',
    description: 'Keanggotaan untuk perusahaan yang ingin terhubung dengan jaringan profesional dan bisnis nasional.',
    benefits: [
      'Profil perusahaan di direktori',
      '5 akun anggota tim',
      'Akses business matching',
      'Prioritas sponsorship',
      'Corporate billing',
      'Logo di halaman member corporate',
      'Akses event premium'
    ]
  },
  {
    id: 'executive-member',
    name: 'Executive Member',
    slug: 'executive-member',
    price: 15000000,
    billingCycle: 'yearly',
    description: 'Keanggotaan premium untuk founder, C-level, investor, dan pemimpin organisasi.',
    benefits: [
      'Executive forum',
      'Private networking dinner',
      'Prioritas business matching',
      'Executive badge',
      'Akses laporan industri',
      'Undangan event tertutup',
      'Concierge sekretariat'
    ]
  },
  {
    id: 'lifetime-member',
    name: 'Lifetime Member',
    slug: 'lifetime-member',
    price: 25000000,
    billingCycle: 'lifetime',
    description: 'Keanggotaan seumur hidup untuk tokoh, profesional senior, dan kontributor utama asosiasi.',
    benefits: [
      'Masa aktif seumur hidup',
      'Lifetime badge',
      'Akses semua dokumen anggota',
      'Prioritas event',
      'Hak voting permanen',
      'Profil eksklusif di direktori'
    ]
  },
  {
    id: 'honorary-member',
    name: 'Honorary Member',
    slug: 'honorary-member',
    price: 0,
    billingCycle: 'none',
    description: 'Keanggotaan kehormatan untuk tokoh, penasihat, atau kontributor strategis.',
    benefits: [
      'Honorary badge',
      'Profil khusus',
      'Undangan acara resmi',
      'Akses laporan tertentu'
    ]
  }
];

export const seedMembers: Member[] = [
  {
    id: 'm1',
    name: 'Aditya Wirawan',
    email: 'aditya.wirawan@example.com',
    phone: '+62 812-1111-0001',
    memberNumber: 'APN-2026-000001',
    membershipTypeId: 'professional-member',
    profession: 'Business Consultant',
    industry: 'Management Consulting',
    organizationName: 'Wirawan Advisory',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    country: 'Indonesia',
    bio: 'Professional business advisor specializing in structural expansion and finance.',
    website: 'https://wirawanadvisory.com',
    linkedinUrl: 'https://linkedin.com/in/aditya-wirawan',
    joinDate: '2019-04-12',
    expiryDate: '2027-04-12',
    status: 'active',
    badge: 'Verified Professional',
    profileCompletion: 92,
    showEmail: true,
    showPhone: false,
    isVerified: true,
    createdAt: '2019-04-12'
  },
  {
    id: 'm2',
    name: 'Nabila Putri',
    email: 'nabila.putri@example.com',
    phone: '+62 812-1111-0002',
    memberNumber: 'APN-2026-000002',
    membershipTypeId: 'executive-member',
    profession: 'Founder & CEO',
    industry: 'Technology',
    organizationName: 'NusaTech Labs',
    city: 'Bandung',
    province: 'Jawa Barat',
    country: 'Indonesia',
    bio: 'Tech investor and digital advocate with passion for smart automation.',
    website: 'https://nusatech.example.com',
    linkedinUrl: 'https://linkedin.com/in/nabila-putri',
    joinDate: '2020-08-15',
    expiryDate: '2026-08-15',
    status: 'active',
    badge: 'Executive Council',
    profileCompletion: 100,
    showEmail: false,
    showPhone: false,
    isVerified: true,
    createdAt: '2020-08-15'
  },
  {
    id: 'm3',
    name: 'Rizky Maulana',
    email: 'rizky.maulana@example.com',
    phone: '+62 812-1111-0003',
    memberNumber: 'APN-2026-000003',
    membershipTypeId: 'student-member',
    profession: 'Final Year Student',
    industry: 'Education',
    organizationName: 'Universitas Indonesia',
    city: 'Depok',
    province: 'Jawa Barat',
    country: 'Indonesia',
    bio: 'Aspiring business analyst learning the ropes of Indonesian corporate ecosystem.',
    website: 'https://ui.ac.id',
    linkedinUrl: 'https://linkedin.com/in/rizky-maulana',
    joinDate: '2025-01-10',
    expiryDate: '2026-01-10',
    status: 'active',
    badge: 'Student Ambassador',
    profileCompletion: 76,
    showEmail: true,
    showPhone: false,
    isVerified: true,
    createdAt: '2025-01-10'
  },
  {
    id: 'm4',
    name: 'Siti Rahmawati',
    email: 'siti.rahmawati@example.com',
    phone: '+62 812-1111-0004',
    memberNumber: 'APN-2026-000004',
    membershipTypeId: 'professional-member',
    profession: 'Legal Advisor',
    industry: 'Legal Services',
    organizationName: 'Rahmawati Law Office',
    city: 'Surabaya',
    province: 'Jawa Timur',
    country: 'Indonesia',
    bio: 'Corporate counsel specializing in IP law and startup compliance.',
    website: 'https://rahmawatilaw.com',
    linkedinUrl: 'https://linkedin.com/in/siti-rahmawati',
    joinDate: '2018-11-20',
    expiryDate: '2025-11-20', // Expired
    status: 'expired',
    badge: 'Professional Member',
    profileCompletion: 88,
    showEmail: true,
    showPhone: true,
    isVerified: true,
    createdAt: '2018-11-20'
  },
  {
    id: 'm5',
    name: 'Hendra Saputra',
    email: 'hendra.saputra@example.com',
    phone: '+62 812-1111-0005',
    memberNumber: 'APN-2026-000005',
    membershipTypeId: 'corporate-member',
    profession: 'Managing Director',
    industry: 'Logistics',
    organizationName: 'Saputra Logistik Indonesia',
    city: 'Semarang',
    province: 'Jawa Tengah',
    country: 'Indonesia',
    website: 'https://saputralogistik.example.com',
    joinDate: '2021-05-18',
    expiryDate: '2027-05-18',
    status: 'active',
    badge: 'Corporate Verified',
    profileCompletion: 96,
    showEmail: false,
    showPhone: false,
    isVerified: true,
    createdAt: '2021-05-18'
  },
  {
    id: 'm6',
    name: 'Clara Tan',
    email: 'clara.tan@example.com',
    phone: '+62 812-1111-0006',
    memberNumber: 'APN-2026-000006',
    membershipTypeId: 'lifetime-member',
    profession: 'Senior Capital Advisor',
    industry: 'Finance',
    organizationName: 'Tan Capital Advisory',
    city: 'Jakarta Pusat',
    province: 'DKI Jakarta',
    country: 'Indonesia',
    bio: 'Senior investment officer focused on venture funding and public market strategies.',
    website: 'https://tancapital.com',
    linkedinUrl: 'https://linkedin.com/in/clara-tan',
    joinDate: '2018-09-05',
    status: 'lifetime',
    badge: 'Honorary Lifetime Member',
    profileCompletion: 100,
    showEmail: false,
    showPhone: false,
    isVerified: true,
    createdAt: '2018-09-05'
  },
  {
    id: 'm7',
    name: 'Farhan Akbar',
    email: 'farhan.akbar@example.com',
    phone: '+62 812-1111-0007',
    memberNumber: 'APN-2026-000007',
    membershipTypeId: 'professional-member',
    profession: 'Senior Architect',
    industry: 'Architecture & Design',
    organizationName: 'Akbar Studio',
    city: 'Yogyakarta',
    province: 'DI Yogyakarta',
    country: 'Indonesia',
    bio: 'Eco-conscious architect incorporating modern traditional Indonesian geometries.',
    website: 'https://akbarstudio.com',
    joinDate: '2026-05-10',
    expiryDate: '2027-05-10',
    status: 'pending',
    badge: 'Pending Verification',
    profileCompletion: 63,
    showEmail: false,
    showPhone: false,
    isVerified: false,
    createdAt: '2026-05-10'
  }
];

export const seedCorporateMembers: CorporateMember[] = [
  {
    id: 'c1',
    companyName: 'NusaTech Labs',
    memberNumber: 'APN-CORP-2026-0001',
    industry: 'Technology & AI',
    city: 'Bandung',
    province: 'Jawa Barat',
    website: 'https://nusatech.example.com',
    contactPerson: 'Nabila Putri',
    status: 'active',
    teamSlots: 5,
    usedSlots: 4
  },
  {
    id: 'c2',
    companyName: 'Saputra Logistik Indonesia',
    memberNumber: 'APN-CORP-2026-0002',
    industry: 'Logistics & Shipping',
    city: 'Semarang',
    province: 'Jawa Tengah',
    website: 'https://saputralogistik.example.com',
    contactPerson: 'Hendra Saputra',
    status: 'active',
    teamSlots: 5,
    usedSlots: 3
  },
  {
    id: 'c3',
    companyName: 'Ruang Properti Nusantara',
    memberNumber: 'APN-CORP-2026-0003',
    industry: 'Real Estate Developer',
    city: 'Jakarta Pusat',
    province: 'DKI Jakarta',
    website: 'https://ruangproperti.example.com',
    contactPerson: 'Dewi Anindya',
    status: 'pending',
    teamSlots: 5,
    usedSlots: 0
  }
];

export const seedInvoices: Invoice[] = [
  {
    id: 'inv1',
    invoiceNumber: 'INV-APN-2026-000001',
    userEmail: 'aditya.wirawan@example.com',
    type: 'membership_renewal',
    subtotal: 750000,
    discount: 0,
    penalty: 0,
    total: 750000,
    status: 'paid',
    paymentMethod: 'QRIS',
    dueDate: '2026-04-12',
    paidAt: '2026-04-10',
    createdAt: '2026-04-01'
  },
  {
    id: 'inv2',
    invoiceNumber: 'INV-APN-2026-000002',
    userEmail: 'siti.rahmawati@example.com',
    type: 'membership_renewal',
    subtotal: 750000,
    discount: 0,
    penalty: 50000,
    total: 800000,
    status: 'overdue',
    dueDate: '2025-11-20',
    createdAt: '2025-11-01'
  },
  {
    id: 'inv3',
    invoiceNumber: 'INV-APN-2026-000003',
    userEmail: 'nabila.putri@example.com',
    type: 'event_registration',
    subtotal: 1250000,
    discount: 250000,
    penalty: 0,
    total: 1000000,
    status: 'paid',
    paymentMethod: 'Virtual Account BCA',
    dueDate: '2026-07-20',
    paidAt: '2026-07-15',
    createdAt: '2026-07-10'
  },
  {
    id: 'inv4',
    invoiceNumber: 'INV-APN-2026-000004',
    userEmail: 'hendra.saputra@example.com',
    type: 'corporate_membership',
    subtotal: 5000000,
    discount: 0,
    penalty: 0,
    total: 5000000,
    status: 'pending_confirmation',
    paymentMethod: 'Bank Transfer Manual',
    proofUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23',
    dueDate: '2026-05-30',
    createdAt: '2026-05-18'
  },
  {
    id: 'inv5',
    invoiceNumber: 'INV-APN-2026-000005',
    userEmail: 'mei.lestari@example.com',
    type: 'executive_membership',
    subtotal: 15000000,
    discount: 1500000,
    penalty: 0,
    total: 13500000,
    status: 'paid',
    paymentMethod: 'Virtual Account Mandiri',
    dueDate: '2026-06-15',
    paidAt: '2026-06-10',
    createdAt: '2026-06-01'
  }
];

export const seedEvents: Event[] = [
  {
    id: 'e1',
    title: 'APN National Professional Summit 2026',
    slug: 'apn-national-professional-summit-2026',
    category: 'Conference',
    format: 'Hybrid',
    location: 'Jakarta Convention Center (JCC) & Zoom',
    onlineUrl: 'https://meet.example.com/apn-summit-2026',
    description: 'Konferensi nasional tahunan yang mempertemukan profesional, pengusaha, dan pemimpin industri untuk membahas tren kompetensi nasional, kolaborasi lintas batas, dan akselerasi transformasi bisnis berbasis kecerdasan buatan.',
    startDatetime: '2026-08-15T09:00:00',
    endDatetime: '2026-08-15T17:00:00',
    memberPrice: 1000000,
    publicPrice: 1500000,
    quota: 500,
    status: 'open_registration',
    cpdPoints: 8,
    registeredCount: 342
  },
  {
    id: 'e2',
    title: 'Workshop Sertifikasi Digital Leadership',
    slug: 'workshop-sertifikasi-digital-leadership',
    category: 'Training',
    format: 'Offline',
    location: 'APN Training Authority, Menara Batavia, Jakarta',
    description: 'Pelatihan intensif dua hari terakreditasi untuk meningkatkan kemampuan manajerial, kepemimpinan digital, pemahaman data governance, serta integrasi teknologi hibrida dalam pengelolaan tim.',
    startDatetime: '2026-07-10T09:00:00',
    endDatetime: '2026-07-11T16:00:00',
    memberPrice: 1750000,
    publicPrice: 2500000,
    quota: 80,
    status: 'open_registration',
    cpdPoints: 12,
    registeredCount: 56
  },
  {
    id: 'e3',
    title: 'Executive Networking Dinner',
    slug: 'executive-networking-dinner',
    category: 'Networking Dinner',
    format: 'Offline',
    location: 'The Dharmawangsa Hotel, Jakarta Selatan',
    description: 'Makan malam networking eksklusif berpakaian formal hitam untuk Dewan Penasihat, Executive Members, Platinum Sponsors, serta perwakilan Kadin untuk menjajaki merger, pendanaan ventura, dan aliansi dagang strategis.',
    startDatetime: '2026-09-05T18:30:00',
    endDatetime: '2026-09-05T21:30:00',
    memberPrice: 3000000,
    publicPrice: 5000000,
    quota: 100,
    status: 'published',
    cpdPoints: 0,
    registeredCount: 22
  },
  {
    id: 'e4',
    title: 'Webinar Peluang Bisnis dan Tender BUMN 2026',
    slug: 'webinar-peluang-bisnis-dan-tender-2026',
    category: 'Webinar',
    format: 'Online',
    location: 'Google Meet',
    onlineUrl: 'https://zoom.example.com/apn-webinar-tender',
    description: 'Webinar khusus kurasi penawaran e-procurement, tender terbuka BUMN, serta panduan pendaftaran vendor kemitraan UKM nasional dengan standar kepatuhan tinggi.',
    startDatetime: '2026-06-25T14:00:00',
    endDatetime: '2026-06-25T16:00:00',
    memberPrice: 0,
    publicPrice: 250000,
    quota: 300,
    status: 'open_registration',
    cpdPoints: 2,
    registeredCount: 189
  },
  {
    id: 'e5',
    title: 'Musyawarah Anggota Tahunan APN 2026',
    slug: 'musyawarah-anggota-tahunan-apn-2026',
    category: 'Musyawarah',
    format: 'Hybrid',
    location: 'Kempinski Grand Ballroom & Live Broadcast',
    onlineUrl: 'https://meet.example.com/musyawarah-apn-2026',
    description: 'Sidang tahunan wajib konstitusi asosiasi untuk pengesahan kepengurusan baru, pertanggungjawaban pimpinan lama, pemungutan suara atas amandemen anggaran dasar (AD/ART), serta perancangan target organisasi masa depan.',
    startDatetime: '2026-12-12T09:00:00',
    endDatetime: '2026-12-12T15:00:00',
    memberPrice: 0,
    publicPrice: null,
    quota: 1000,
    status: 'published',
    cpdPoints: 0,
    registeredCount: 450
  }
];

export const seedSpeakers: Speaker[] = [
  {
    id: 's1',
    eventId: 'e1',
    name: 'Dr. Arif Pradana',
    title: 'Sec-Gen / Presiden',
    organization: 'Asosiasi Profesional Nusantara',
    bio: 'Pakar tata kelola korporat dengan 25 tahun pengalaman konsultasi bisnis di Asia Pasifik.'
  },
  {
    id: 's2',
    eventId: 'e1',
    name: 'Nabila Putri',
    title: 'Founder & CEO',
    organization: 'NusaTech Labs',
    bio: 'Technopreneur inspiratif, pengembang solusi web 3.0 dan model deep learning asal Bandung.'
  },
  {
    id: 's3',
    eventId: 'e2',
    name: 'Clara Tan',
    title: 'Senior Managing Partner',
    organization: 'Tan Capital Advisory',
    bio: 'Eks-bankir investasi papan atas, penasihat restrukturisasi utang instansi multinasional.'
  },
  {
    id: 's4',
    eventId: 'e4',
    name: 'Hendra Saputra',
    title: 'Director of Logistics',
    organization: 'Saputra Logistik Indonesia',
    bio: 'Ahli rantai pasok maritim dengan fokus e-fulfillment nasional.'
  }
];

export const seedAgendas: EventAgenda[] = [
  {
    id: 'ag1',
    eventId: 'e1',
    timeStart: '09:00',
    timeEnd: '09:30',
    title: 'Upacara Pembukaan & Lagu Kebangsaan',
    description: 'Sambutan pembuka dari Ketua Umum APN dan jajaran Kementerian terkait.'
  },
  {
    id: 'ag2',
    eventId: 'e1',
    timeStart: '09:30',
    timeEnd: '10:30',
    title: 'Sesi Keynote: Kebijakan Kompetensi Indonesia 2030',
    description: 'Strategi negara dalam mempersiapkan SDM berdaya saing tinggi di pasar ekspor.'
  },
  {
    id: 'ag3',
    eventId: 'e1',
    timeStart: '10:45',
    timeEnd: '12:00',
    title: 'Debat Panel: Pemanfaatan AI Tanpa Menghilangkan Lapangan Kerja',
    description: 'Diskusi bersama pimpinan serikat, regulator hukum, dan CEO kancah tekno.'
  },
  {
    id: 'ag4',
    eventId: 'e2',
    timeStart: '09:00',
    timeEnd: '12:00',
    title: 'Modul I: Kepercayaan Digital & Keamanan Data Organisasi',
    description: 'Memahami ancaman siber kontemporer, UU perlindungan data pribadi (UU PDP).'
  }
];

export const seedRegistrations: EventRegistration[] = [
  {
    id: 'er1',
    eventId: 'e1',
    userEmail: 'aditya.wirawan@example.com',
    ticketNumber: 'TICKET-APN-2026-000001',
    registrationStatus: 'confirmed',
    paymentStatus: 'paid',
    attended: false,
    feedbackSubmitted: false,
    certificateGenerated: false,
    createdAt: '2026-05-12'
  },
  {
    id: 'er2',
    eventId: 'e1',
    userEmail: 'nabila.putri@example.com',
    ticketNumber: 'TICKET-APN-2026-000002',
    registrationStatus: 'confirmed',
    paymentStatus: 'paid',
    attended: false,
    feedbackSubmitted: false,
    certificateGenerated: false,
    createdAt: '2026-05-15'
  },
  {
    id: 'er3',
    eventId: 'e2',
    userEmail: 'clara.tan@example.com',
    ticketNumber: 'TICKET-APN-2026-000003',
    registrationStatus: 'confirmed',
    paymentStatus: 'paid',
    attended: true,
    checkedInAt: '2026-07-10T08:45:00',
    feedbackSubmitted: true,
    certificateGenerated: true,
    createdAt: '2026-06-03'
  },
  {
    id: 'er4',
    eventId: 'e4',
    userEmail: 'hendra.saputra@example.com',
    ticketNumber: 'TICKET-APN-2026-000004',
    registrationStatus: 'confirmed',
    paymentStatus: 'free',
    attended: false,
    feedbackSubmitted: false,
    certificateGenerated: false,
    createdAt: '2026-06-03'
  }
];

export const seedCertificates: Certificate[] = [
  {
    id: 'cert1',
    certificateNumber: 'CERT-APN-2026-000001',
    memberEmail: 'clara.tan@example.com',
    eventTitle: 'Workshop Sertifikasi Digital Leadership',
    title: 'Certificate of Professional Completion - Digital Leadership Masterclass',
    issuedDate: '2026-07-11',
    cpdPoints: 12,
    status: 'valid',
    verificationUrl: '/certificates/verify/CERT-APN-2026-000001'
  },
  {
    id: 'cert2',
    certificateNumber: 'CERT-APN-2026-000002',
    memberEmail: 'aditya.wirawan@example.com',
    eventTitle: 'Seminar Transformasi Big Data BUMN 2025',
    title: 'Certificate of High Active Participation',
    issuedDate: '2025-11-20',
    cpdPoints: 4,
    status: 'valid',
    verificationUrl: '/certificates/verify/CERT-APN-2026-000002'
  },
  {
    id: 'cert3',
    certificateNumber: 'CERT-APN-2026-000003',
    memberEmail: 'nabila.putri@example.com',
    eventTitle: 'Indonesian VC Executive Forum 2025',
    title: 'Certificate of Distinguished Speaker Guest',
    issuedDate: '2025-10-05',
    cpdPoints: 3,
    status: 'valid',
    verificationUrl: '/certificates/verify/CERT-APN-2026-000003'
  }
];

export const seedDocuments: Document[] = [
  {
    id: 'd1',
    title: 'AD/ART Asosiasi Profesional Nusantara 2026',
    category: 'Legal',
    accessLevel: 'members_only',
    version: '2.1',
    tags: ['AD ART', 'Legalitas', 'Ketetapan Musyawarah'],
    downloadCount: 342,
    createdAt: '2026-01-10'
  },
  {
    id: 'd2',
    title: 'Laporan Audit Kinerja & Anggaran APN 2025',
    category: 'Annual Report',
    accessLevel: 'public',
    version: '1.0',
    tags: ['Keuangan', 'Pemeriksaan', 'Transparansi'],
    downloadCount: 1259,
    createdAt: '2026-02-15'
  },
  {
    id: 'd3',
    title: 'Panduan Praktis Pengajuan SKP dan Sertifikasi CPD',
    category: 'SOP',
    accessLevel: 'members_only',
    version: '1.4',
    tags: ['Panduan', 'CPD', 'SKP', 'Sertifikasi'],
    downloadCount: 512,
    createdAt: '2025-12-05'
  },
  {
    id: 'd4',
    title: 'Venture Sponsorship Pitch Deck APN Summit 2026',
    category: 'Media Kit',
    accessLevel: 'gated_public',
    version: '3.0',
    tags: ['Sponsorship', 'Marketing', 'Summit'],
    downloadCount: 450,
    createdAt: '2026-04-18'
  },
  {
    id: 'd5',
    title: 'Template Formulir Pengusulan Agenda Daerah / Cabang',
    category: 'Template',
    accessLevel: 'admin_only',
    version: '1.1',
    tags: ['Formulir', 'Administrasi', 'SOP'],
    downloadCount: 68,
    createdAt: '2026-05-20'
  }
];

export const seedSponsors: Sponsor[] = [
  {
    id: 'sp1',
    name: 'Bank Nusantara Digital',
    packageType: 'Platinum Sponsor',
    website: 'https://banknusantara.example.com',
    description: 'Lembaga keuangan digital terkemuka yang menyediakan program kredit korporasi dan fasilitasi iuran massal anggota.',
    status: 'active'
  },
  {
    id: 'sp2',
    name: 'Danarta Telco Group',
    packageType: 'Gold Sponsor',
    website: 'https://danartatelco.example.com',
    description: 'Penyedia infrastruktur internet serat optik, pendukung utama digitalisasi sekretariat regional APN.',
    status: 'active'
  },
  {
    id: 'sp3',
    name: 'Solusi HR Nusantara',
    packageType: 'Silver Sponsor',
    website: 'https://solusihr.example.com',
    description: 'Agensi pemenuhan talent berkeahlian tinggi, partner resmi portal lowongan/job board APN.',
    status: 'active'
  },
  {
    id: 'sp4',
    name: 'Media Indonesia Group',
    packageType: 'Media Partner',
    website: 'https://mediaindonesia.example.com',
    description: 'Konglomerasi media cetak dan digital nasional, peliput utama pergelaran tahunan National Summit.',
    status: 'active'
  }
];

export const seedJobs: JobOpportunity[] = [
  {
    id: 'job1',
    title: 'Senior Venture Capital Analyst',
    companyName: 'Tan Capital Advisory',
    type: 'Job Vacancy',
    category: 'Finance / Investment',
    location: 'Jakarta Center (Hybrid)',
    description: 'Mencari analis senior dengan rekam jejak minimum 3 tahun di ekosistem VC global. Tugas meliputi sourcing deal, uji kelayakan finansial, dan audit model proyeksi.',
    requirements: ['S1 Akuntansi/Keuangan', 'Paham pemodelan finansial DCF', 'Sertifikasi CFA diutamakan'],
    contactEmail: 'careers@tancapital.example.com',
    accessLevel: 'members_only',
    status: 'approved',
    createdAt: '2026-05-28'
  },
  {
    id: 'job2',
    title: 'Peluang Tender: Pengadaan Armada Fleet Delivery',
    companyName: 'Saputra Logistik Indonesia',
    type: 'Tender',
    category: 'Logistics / Supply Chain',
    location: 'Jawa Tengah & Jawa Timur',
    description: 'Tender korporasi untuk outsourcing penyewaan 25 truk kargo box bersuhu pendingin (reefer box) dengan durasi kontrak 2 tahun penuh.',
    requirements: ['Badan usaha berbadan hukum PT', 'Memiliki izin logistik ALFI/ILFA', 'Armada di bawah 5 tahun operasional'],
    contactEmail: 'tender.procurement@saputralogis.example.com',
    accessLevel: 'public',
    status: 'approved',
    createdAt: '2026-06-01'
  },
  {
    id: 'job3',
    title: 'Lead Software Architect - AI Platform',
    companyName: 'NusaTech Labs',
    type: 'Job Vacancy',
    category: 'Technology / Software',
    location: 'Bandung (Remote OK)',
    description: 'Memimpin tim engineering mutakhir dalam memigrasikan monolitik arsitektur ke sistem microservices cerdas berbasis event.',
    requirements: ['Pengalaman 5+ tahun', 'Menguasai Go, Python, dan Rust', 'Pernah merancang LLM inference server'],
    contactEmail: 'jobs@nusatech.example.com',
    accessLevel: 'members_only',
    status: 'approved',
    createdAt: '2026-06-02'
  }
];

export const seedPolls: Poll[] = [
  {
    id: 'p1',
    title: 'Voting Persetujuan Program Kerja APN 2026',
    description: 'Sesuai dengan rapat pleno, mohon berikan suara Anda mengenai draf program kerja nasional meliputi pembukaan 5 kantor perwakilan cabang baru.',
    type: 'proposal_vote',
    eligibility: 'active_members_only',
    isAnonymous: false,
    status: 'active',
    options: [
      { id: 'opt1', label: 'Setuju Sepenuhnya', votes: 142 },
      { id: 'opt2', label: 'Setuju Dengan Amandemen Anggaran', votes: 23 },
      { id: 'opt3', label: 'Tidak Setuju / Menolak', votes: 5 }
    ],
    votedEmails: ['clara.tan@example.com', 'nabila.putri@example.com'],
    createdAt: '2026-05-15'
  },
  {
    id: 'p2',
    title: 'Polling Topik Masterclass Kuartal III 2026',
    description: 'Pilihlah salah satu topik yang paling mendesak untuk menunjang kompetensi karir profesional Anda saat ini.',
    type: 'poll',
    eligibility: 'all_members',
    isAnonymous: true,
    status: 'active',
    options: [
      { id: 'popt1', label: 'AI untuk Produktivitas Profesional Sehari-hari', votes: 289 },
      { id: 'popt2', label: 'Strategi Negosiasi & Manajemen Konflik Korporasi', votes: 104 },
      { id: 'popt3', label: 'Hukum Kepatuhan & Kewajiban Pajak Badan Terbaru', votes: 88 },
      { id: 'popt4', label: 'Personal Branding & Penulisan Opini Media Massa', votes: 111 }
    ],
    votedEmails: ['rizky.maulana@example.com'],
    createdAt: '2026-05-20'
  },
  {
    id: 'p3',
    title: 'Pemilihan Ketua Komite Pengembangan Digital APN 2026-2028',
    description: 'Suara Anda menentukan arah inisiatif inkubator teknologi dan pameran tech-innovation APN dua tahun ke depan.',
    type: 'election',
    eligibility: 'active_professional_and_executive_members',
    isAnonymous: true,
    status: 'scheduled',
    options: [
      { id: 'cand1', label: 'Nabila Putri (NusaTech CEO)', votes: 0 },
      { id: 'cand2', label: 'Aditya Wirawan (Consultant Founder)', votes: 0 }
    ],
    votedEmails: [],
    createdAt: '2026-05-30'
  }
];

export const seedUsers: User[] = [
  {
    id: 'u1',
    name: 'Admin Utama APN',
    email: 'admin@apn.or.id',
    role: 'super_admin',
    status: 'active',
    createdAt: '2018-01-01'
  },
  {
    id: 'u2',
    name: 'Rania Salsabila',
    email: 'sekretariat@apn.or.id',
    role: 'secretariat',
    status: 'active',
    createdAt: '2020-01-01'
  },
  {
    id: 'u3',
    name: 'Bima Hartanto',
    email: 'finance@apn.or.id',
    role: 'finance_admin',
    status: 'active',
    createdAt: '2020-01-01'
  },
  {
    id: 'u4',
    name: 'Laras Paramitha',
    email: 'event@apn.or.id',
    role: 'event_admin',
    status: 'active',
    createdAt: '2020-01-01'
  },
  {
    id: 'u5',
    name: 'Dion Prasetyo',
    email: 'content@apn.or.id',
    role: 'content_editor',
    status: 'active',
    createdAt: '2020-01-01'
  },
  {
    id: 'u6',
    name: 'Maya Kurnia',
    email: 'membership@apn.or.id',
    role: 'membership_admin',
    status: 'active',
    createdAt: '2020-01-01'
  }
];

export const seedPartnerInquiries: PartnerInquiry[] = [
  {
    id: 'pi1',
    companyName: 'Ruang Properti Nusantara',
    contactName: 'Dewi Anindya',
    email: 'dewi@ruangproperti.example.com',
    phone: '+62 812-9900-8811',
    interestType: 'Corporate Partnership & Office Facility Discount',
    message: 'Kami ingin menawarkan kerja sama ruang kerja sewa (coworking space) diskon khusus 25% bagi seluruh pemegang kartu digital APN.',
    status: 'New',
    createdAt: '2026-06-02'
  },
  {
    id: 'pi2',
    companyName: 'Inovasi Cloud Indonesia',
    contactName: 'Rian Pratama',
    email: 'rian@inovasicloud.example.com',
    phone: '+62 813-8877-6655',
    interestType: 'Strategic Partnership',
    message: 'Pengajuan kemitraan program inkubator startup. Kami bersedia menyuplai cloud credit gratis total $10,000 bagi member terpilih APN.',
    status: 'Contacted',
    createdAt: '2026-05-30'
  }
];

export const seedHelpdeskTickets: HelpdeskTicket[] = [
  {
    id: 'ht1',
    userEmail: 'siti.rahmawati@example.com',
    subject: 'Gagal Download Sertifikat Digital Leadership',
    message: 'Saya telah menyelesaikan feedback dan menghadiri seluruh sesi penting workshop tetapi tombol download loading terus.',
    category: 'Sertifikat',
    priority: 'medium',
    status: 'open',
    createdAt: '2026-06-02'
  },
  {
    id: 'ht2',
    userEmail: 'aditya.wirawan@example.com',
    subject: 'Koreksi NIK Pada Kartu Digital Anggota',
    message: 'Terdapat typo di angka terakhir penulisan NIK saya pada detail verifikasi data. Tolong dibantu koreksi admin.',
    category: 'Sistem Profil',
    priority: 'low',
    status: 'resolved',
    createdAt: '2026-05-28'
  }
];

export const seedActivityLogs: ActivityLog[] = [
  {
    id: 'al1',
    userName: 'Rania Salsabila',
    action: 'Verifikasi Profil Anggota Baru: Aditya Wirawan',
    module: 'Membership',
    ipAddress: '112.215.11.89',
    createdAt: '2026-06-03T04:10:00Z'
  },
  {
    id: 'al2',
    userName: 'Bima Hartanto',
    action: 'Konfirmasi Pembayaran Invoice INV-APN-2026-000001',
    module: 'Finance',
    ipAddress: '112.215.11.90',
    createdAt: '2026-06-03T03:45:00Z'
  },
  {
    id: 'al3',
    userName: 'Admin Utama APN',
    action: 'Mengubah Setelan Batas Pengajuan Dokumen Anggota',
    module: 'Settings',
    ipAddress: '180.252.32.14',
    createdAt: '2026-06-03T02:15:00Z'
  }
];
