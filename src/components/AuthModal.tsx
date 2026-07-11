import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { Member } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
  onRegister: (name: string, email: string, phone: string, pass: string) => void;
  onLoginSuccess: (member: Member, role: string) => void;
  themeMode?: 'light' | 'dark';
  adminEmail: string;
  adminPass: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  members,
  onRegister,
  onLoginSuccess,
  themeMode = 'light',
  adminEmail,
  adminPass
}: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    setTimeout(() => {
      // Check Admin Login first
      if (loginEmail.trim().toLowerCase() === adminEmail.toLowerCase() && loginPassword === adminPass) {
        const mockAdminMember: Member = {
          id: 'admin_user',
          name: 'Admin Utama',
          email: adminEmail,
          phone: '+62 812-3456-7890',
          memberNumber: 'ADMIN-APN',
          membershipTypeId: 'executive-member',
          organizationName: 'APN Sekretariat',
          profession: 'System Administrator',
          industry: 'Management',
          city: 'Jakarta',
          province: 'DKI Jakarta',
          country: 'Indonesia',
          joinDate: '2020-01-01',
          status: 'active',
          profileCompletion: 100,
          showEmail: true,
          showPhone: true,
          isVerified: true,
          createdAt: '2020-01-01'
        };
        onLoginSuccess(mockAdminMember, 'super_admin');
        setSuccess('Login Admin Berhasil! Mengalihkan ke Dashboard Manajemen...');
        setTimeout(() => {
          setSuccess('');
          setLoading(false);
          onClose();
        }, 1500);
        return;
      }

      // Check standard member login
      const found = members.find(
        m => m.email.trim().toLowerCase() === loginEmail.trim().toLowerCase()
      );

      if (!found) {
        setError('Email tidak terdaftar!');
        setLoading(false);
        return;
      }

      // Check password (fallback if no password is set for seeded members, let them use password123)
      const expectedPassword = found.password || 'password123';
      if (loginPassword !== expectedPassword) {
        setError('Kata sandi salah!');
        setLoading(false);
        return;
      }

      // Successful login
      onLoginSuccess(found, 'member');
      setSuccess(`Selamat datang kembali, ${found.name}! Mengalihkan ke Portal...`);
      setTimeout(() => {
        setSuccess('');
        setLoading(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!regName || !regEmail || !regPhone || !regPassword) {
      setError('Harap isi semua kolom!');
      return;
    }

    if (regPassword.length < 6) {
      setError('Kata sandi harus minimal 6 karakter!');
      return;
    }

    // Check if email already registered
    const exists = members.some(
      m => m.email.trim().toLowerCase() === regEmail.trim().toLowerCase()
    );
    if (exists || regEmail.toLowerCase() === adminEmail.toLowerCase()) {
      setError('Email sudah digunakan!');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onRegister(regName, regEmail, regPhone, regPassword);
      setSuccess('Pendaftaran berhasil! Akun Anda telah aktif, silakan masuk.');
      
      // Clear registration form and switch to login tab
      setRegName('');
      setRegEmail('');
      setRegPhone('');
      setRegPassword('');
      
      setTimeout(() => {
        setSuccess('');
        setTab('login');
        setLoginEmail(regEmail);
        setLoading(false);
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fade-in">
      <div 
        className={`w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 ${
          themeMode === 'light'
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-[#0f172a] border-slate-800 text-slate-100'
        }`}
      >
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡️</span>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wide">Autentikasi Portal</h3>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold">Archipelago Professionals Network</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" />
          </button>
        </div>

        {/* Tab triggers */}
        <div className="flex border-b border-slate-100 dark:border-slate-800/60 text-xs font-black">
          <button
            onClick={() => { setTab('login'); setError(''); setSuccess(''); }}
            className={`flex-1 py-3 text-center uppercase tracking-wider cursor-pointer border-b-2 transition-all ${
              tab === 'login'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-500/5'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Masuk / Login
          </button>
          <button
            onClick={() => { setTab('register'); setError(''); setSuccess(''); }}
            className={`flex-1 py-3 text-center uppercase tracking-wider cursor-pointer border-b-2 transition-all ${
              tab === 'register'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-500/5'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Daftar / Register
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl border border-red-200 bg-red-50 text-red-700 dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-xl border border-green-200 bg-green-50 text-green-700 dark:bg-green-950/20 dark:border-green-900/30 dark:text-green-400 text-xs font-semibold flex items-center gap-2 animate-pulse">
              <CheckCircle className="w-4 h-4 shrink-0 text-green-500" />
              <span>{success}</span>
            </div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Alamat Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    disabled={loading}
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="email@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 text-xs font-semibold rounded-xl border focus:outline-none transition-all ${
                      themeMode === 'light'
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15'
                        : 'bg-slate-900 border-slate-800 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Kata Sandi</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    disabled={loading}
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="Masukkan kata sandi Anda"
                    className={`w-full pl-10 pr-10 py-2.5 text-xs font-semibold rounded-xl border focus:outline-none transition-all ${
                      themeMode === 'light'
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15'
                        : 'bg-slate-900 border-slate-800 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase py-3 rounded-xl tracking-wider cursor-pointer shadow-md transition-all duration-150 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  'MASUK SEKARANG'
                )}
              </button>
              
              <p className="text-[10px] text-center font-semibold text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Tip Demo: Gunakan akun <span className="font-mono text-amber-500 dark:text-amber-400">aditya.wirawan@example.com</span> sandi <span className="font-mono text-amber-500 dark:text-amber-400">password123</span> atau masuk sebagai pengurus dengan email <span className="font-mono text-amber-500 dark:text-amber-400">{adminEmail}</span> sandi <span className="font-mono text-amber-500 dark:text-amber-400">{adminPass}</span>.
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    disabled={loading}
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="Contoh: Aditya Wirawan"
                    className={`w-full pl-10 pr-4 py-2 text-xs font-semibold rounded-xl border focus:outline-none transition-all ${
                      themeMode === 'light'
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15'
                        : 'bg-slate-900 border-slate-800 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Alamat Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    disabled={loading}
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="email@example.com"
                    className={`w-full pl-10 pr-4 py-2 text-xs font-semibold rounded-xl border focus:outline-none transition-all ${
                      themeMode === 'light'
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15'
                        : 'bg-slate-900 border-slate-800 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">No. Handphone (WhatsApp)</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    disabled={loading}
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                    placeholder="Contoh: +628123456789"
                    className={`w-full pl-10 pr-4 py-2 text-xs font-semibold rounded-xl border focus:outline-none transition-all ${
                      themeMode === 'light'
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15'
                        : 'bg-slate-900 border-slate-800 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Kata Sandi Baru</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    disabled={loading}
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className={`w-full pl-10 pr-10 py-2 text-xs font-semibold rounded-xl border focus:outline-none transition-all ${
                      themeMode === 'light'
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15'
                        : 'bg-slate-900 border-slate-800 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase py-3 rounded-xl tracking-wider cursor-pointer shadow-md transition-all duration-150 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  'DAFTAR ANGGOTA BARU'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
