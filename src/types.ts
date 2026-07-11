/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  status: 'active' | 'pending' | 'suspended' | 'expired';
  lastLoginAt?: string;
  createdAt: string;
}

export type UserRole =
  | 'super_admin'
  | 'board'
  | 'secretariat'
  | 'finance_admin'
  | 'event_admin'
  | 'content_editor'
  | 'membership_admin'
  | 'sponsor_admin'
  | 'auditor'
  | 'regional_admin'
  | 'member'
  | 'public';

export interface MembershipType {
  id: string;
  name: string;
  slug: string;
  price: number;
  billingCycle: 'yearly' | 'lifetime' | 'none';
  description: string;
  benefits: string[];
}

export interface Member {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  memberNumber: string;
  membershipTypeId: string;
  organizationName: string;
  profession: string;
  industry: string;
  city: string;
  province: string;
  country: string;
  bio?: string;
  website?: string;
  linkedinUrl?: string;
  joinDate: string;
  expiryDate?: string;
  status: 'pending' | 'under_review' | 'approved' | 'active' | 'expired' | 'suspended' | 'rejected' | 'revision_required' | 'lifetime';
  profileCompletion: number;
  showEmail: boolean;
  showPhone: boolean;
  isVerified: boolean;
  badge?: string;
  password?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface CorporateMember {
  id: string;
  companyName: string;
  memberNumber: string;
  industry: string;
  city: string;
  province: string;
  website: string;
  contactPerson: string;
  status: 'active' | 'pending' | 'expired';
  teamSlots: number;
  usedSlots: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  userEmail: string;
  type: 'membership_renewal' | 'event_registration' | 'corporate_membership' | 'executive_membership';
  subtotal: number;
  discount: number;
  penalty: number;
  total: number;
  status: 'draft' | 'issued' | 'unpaid' | 'paid' | 'pending_confirmation' | 'overdue' | 'cancelled' | 'expired' | 'refunded';
  paymentMethod?: string;
  proofUrl?: string;
  dueDate: string;
  paidAt?: string;
  eventId?: string;
  registrationId?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  category: 'Conference' | 'Training' | 'Networking Dinner' | 'Webinar' | 'Musyawarah';
  format: 'Hybrid' | 'Offline' | 'Online';
  location: string;
  onlineUrl?: string;
  description: string;
  startDatetime: string;
  endDatetime: string;
  memberPrice: number;
  publicPrice: number | null;
  quota: number;
  status: 'draft' | 'published' | 'open_registration' | 'full' | 'ongoing' | 'completed' | 'cancelled';
  cpdPoints: number;
  registeredCount: number;
}

export interface Speaker {
  id: string;
  eventId: string;
  name: string;
  title: string;
  organization: string;
  bio: string;
}

export interface EventAgenda {
  id: string;
  eventId: string;
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userEmail: string;
  ticketNumber: string;
  registrationStatus: 'confirmed' | 'pending' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid' | 'free';
  attended: boolean;
  checkedInAt?: string;
  feedbackSubmitted: boolean;
  certificateGenerated: boolean;
  createdAt: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  memberEmail: string;
  eventTitle: string;
  title: string;
  issuedDate: string;
  cpdPoints: number;
  status: 'valid' | 'revoked';
  verificationUrl: string;
}

export interface Document {
  id: string;
  title: string;
  category: 'Legal' | 'Annual Report' | 'Template' | 'Training Material' | 'Media Kit' | 'SOP';
  accessLevel: 'public' | 'members_only' | 'admin_only' | 'event_participants' | 'gated_public';
  version: string;
  tags: string[];
  downloadCount: number;
  createdAt: string;
}

export interface Sponsor {
  id: string;
  name: string;
  packageType: 'Bronze Sponsor' | 'Silver Sponsor' | 'Gold Sponsor' | 'Platinum Sponsor' | 'Strategic Partner' | 'Event Partner' | 'Media Partner';
  website: string;
  description?: string;
  status: 'active' | 'inactive';
}

export interface PartnerInquiry {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  interestType: string;
  message: string;
  status: 'New' | 'Contacted' | 'Proposal Sent' | 'Deal Won' | 'Deal Lost';
  createdAt: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  companyName: string;
  type: 'Job Vacancy' | 'Tender' | 'Business Collaboration' | 'Internship';
  category: string;
  location: string;
  description: string;
  requirements: string[];
  contactEmail: string;
  accessLevel: 'public' | 'members_only';
  status: 'approved' | 'pending' | 'expired';
  createdAt: string;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  type: 'proposal_vote' | 'poll' | 'election';
  eligibility: string;
  isAnonymous: boolean;
  status: 'active' | 'scheduled' | 'closed';
  options: { id: string; label: string; votes: number }[];
  votedEmails: string[];
  createdAt: string;
}

export interface HelpdeskTicket {
  id: string;
  userEmail: string;
  subject: string;
  message: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userName: string;
  action: string;
  module: string;
  ipAddress: string;
  createdAt: string;
}
