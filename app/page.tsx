// app/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Leaf, Bell, HelpCircle, ArrowRight, ArrowLeft, Mail, Lock, User,
  Search, ShoppingCart, PlusCircle, History, Settings, Grid,
  ChevronRight, ArrowUpRight, CheckCircle, Heart, BookOpen, LogOut
} from 'lucide-react';

// =========================================================================
// DATA INTERFACE
// =========================================================================
interface Product {
  id: string;
  name: string;
  price: number;
  seller: string;
  material: string;
  category: string;
  impact: string;
  likes: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Transaction {
  id: string;
  date: string;
  productName: string;
  price: number;
  status: 'Sedang Dikemas' | 'Dalam Perjalanan' | 'Selesai';
  image: string;
}

export default function RecrafterAppUltimate() {
  // --- 1. STATE NAVIGASI UTAMA MOBILE (Tipe Data Lengkap & Bebas Eror TS) ---
  const [view, setView] = useState<'cover' | 'signin' | 'signup' | 'verify' | 'dashboard'>('cover');
  const [dashboardTab, setDashboardTab] = useState<'tutorial' | 'marketplace' | 'upload' | 'history' | 'profile' | 'notifications' | 'help' | 'cart' | 'detail'>('marketplace'); const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // --- 2. STATE LOGIKA INTERNAL APP ---
  const [ecoPoints, setEcoPoints] = useState<number>(350);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [detailQuantity, setDetailQuantity] = useState<number>(1);
  const [activeSlide, setActiveSlide] = useState<number>(0); 

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TRX-9821',
      date: '14 Mei 2026',
      productName: 'Eco Pastel Earrings',
      price: 12500,
      status: 'Selesai',
      image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=500'
    }
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Tas Totebag Karung Goni', price: 45000, seller: 'NgelCraft', material: 'Karung Bekas', category: 'Fashion', impact: '1.2kg emisi karbon dicegah', likes: 24, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500' },
    { id: '2', name: 'Premium Desk Organizer', price: 32000, seller: 'EcoStudio', material: 'Kardus Tebal', category: 'Dekorasi', impact: '0.8kg limbah diselamatkan', likes: 18, image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=500' },
    { id: '3', name: 'Pot Estetik Serat Kelapa', price: 15000, seller: 'GreenThumb', material: 'Sabut Kelapa', category: 'Organik', impact: 'Biodegradable alami', likes: 42, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500' },
    { id: '4', name: 'Lampu Tidur Kap Plastik', price: 65000, seller: 'ReCraftMalang', material: 'Gelas Plastik', category: 'Dekorasi', impact: '20 gelas plastik digunakan', likes: 15, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500' }
  ]);

  const [uploadForm, setUploadForm] = useState({
    name: '',
    price: '',
    category: 'Dekorasi',
    material: 'Botol Plastik Bekas',
    impact: ''
  });

  const [userProfile] = useState({
    name: 'Graciella Zahra Angelia',
    role: 'Siswa / Kreator Muda',
    class: 'XI RPL',
    school: 'SMK Telkom Malang',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  });

  // --- 3. FUNGSI LOGIKA SISTEM ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    alert(`${product.name} dimasukkan ke keranjang! 🌱`);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.product.id !== id));
  };

  const totalCartPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newTransactions: Transaction[] = cart.map(item => ({
      id: `TRX-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Hari Ini',
      productName: item.product.name,
      price: item.product.price * item.quantity,
      status: 'Sedang Dikemas',
      image: item.product.image
    }));
    setTransactions([...newTransactions, ...transactions]);
    setCart([]);
    alert('Payment Success! 🌱');
    setDashboardTab('history');
  };

  const handleUploadProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.name || !uploadForm.price) return;

    const createdProduct: Product = {
      id: `prod-${Date.now()}`,
      name: uploadForm.name,
      price: Number(uploadForm.price),
      seller: userProfile.name,
      material: uploadForm.material,
      category: uploadForm.category,
      impact: uploadForm.impact || 'Mengurangi akumulasi sampah lokal',
      likes: 0,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500'
    };

    setProducts([createdProduct, ...products]);
    setEcoPoints(prev => prev + 50);
    alert('Lapak karya daur ulangmu berhasil terbit! +50 EcoPoints! 🎉');
    setUploadForm({ name: '', price: '', category: 'Dekorasi', material: 'Botol Plastik Bekas', impact: '' });
    setDashboardTab('marketplace');
  };

  const filteredProducts = products.filter(p => {
    const matchCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.material.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#1F261B] flex items-center justify-center p-4 antialiased font-sans tracking-tight">

      {/* PHONE FRAME LAYOUT MOCKUP (Persis Coffee Craft Style) */}
      <div className="relative w-[375px] h-[812px] bg-[#FDFBF7] rounded-[45px] shadow-2xl border-[10px] border-[#2D3B26] overflow-hidden flex flex-col">

        {/* HARDWARE NOTCH STATUS BAR */}
        <div className="absolute top-0 inset-x-0 h-6 bg-transparent z-50 flex justify-between items-center px-8 text-[11px] font-bold">
          <span className={view !== 'dashboard' ? 'text-[#FDFBF7]' : 'text-[#2D3B26]'}>9:41</span>
          <div className="w-24 h-4 bg-[#2D3B26] rounded-b-xl absolute left-1/2 -translate-x-1/2"></div>
          <div className={`flex items-center gap-1 text-[10px] ${view !== 'dashboard' ? 'text-[#FDFBF7]' : 'text-[#2D3B26]'}`}>
            <span>LTE</span>
            <div className="w-4 h-2.5 border border-current rounded-sm p-px flex items-center"><div className="h-full w-3 bg-current rounded-2xs"></div></div>
          </div>
        </div>

        {/* =========================================================================
            SCREEN 1, 2, 3: ALUR AUTHENTICATION (Clean Minimalist Apple & Coffee Style)
            ========================================================================= */}
        {view !== 'dashboard' && (
          <div className="flex-1 flex flex-col justify-between h-full p-8 text-white relative">

            {/* VIEW: COVER PAGE */}
            {view === 'cover' && (
              <div className="flex flex-col justify-between h-full w-full absolute inset-0 p-8 bg-[#2D3B26] rounded-b-[60px] pb-12 animate-fadeIn z-10">
                <div className="pt-20 flex flex-col items-center gap-4">
                  <div className="p-4 bg-[#FDFBF7]/10 backdrop-blur-md rounded-3xl border border-white/10 shadow-inner">
                    <Leaf size={44} className="text-[#FDFBF7]" />
                  </div>
                  <h1 className="text-4xl font-black text-[#FDFBF7] tracking-tight mt-2">Recrafter</h1>
                  <p className="text-[#BAC7AC] text-xs max-w-[240px] text-center leading-relaxed">
                    Ubah limbah sekolahmu menjadi karya estetik komersial bernilai tinggi.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-center gap-1.5 pb-2">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                  </div>
                  <button onClick={() => setView('signin')} className="w-full bg-[#FDFBF7] text-[#2D3B26] font-black py-4 rounded-2xl text-xs uppercase tracking-wider shadow-lg hover:opacity-90 transition-all">
                    Mulai Sekarang →
                  </button>
                </div>
              </div>
            )}

            {/* --- B. VIEW: SIGN IN / LOGIN PAGE (Persis Layar Tengah) --- */}
            {view === 'signin' && (
              <div className="flex flex-col h-full w-full absolute inset-0 bg-white animate-fadeIn z-10 overflow-hidden">
                {/* Setengah Layar Atas: Gambar Daun Melengkung Organik */}
                <div className="w-full h-[32%] bg-[#2D3B26] rounded-b-[3.5rem] relative overflow-hidden flex items-start p-6 pt-8">
                  <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500" alt="leaves" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                  <button onClick={() => setView('cover')} className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-[#2D3B26] shadow-sm z-20 hover:scale-105 transition-transform">
                    <ArrowLeft size={14} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Setengah Layar Bawah: Content Fields */}
                <div className="flex-1 flex flex-col justify-between p-8 pt-6 relative">
                  {/* Hiasan Daun Mengambang Kanan Atas Judul */}
                  <div className="absolute right-8 top-4 text-emerald-700/30 font-bold text-2xl select-none">🍃</div>

                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-[#2D3B26] tracking-tight">Welcom Back</h2>
                    <p className="text-slate-400 text-[11px] font-medium">Login to your account</p>
                  </div>

                  {/* Inputs Form */}
                  <form onSubmit={(e) => { e.preventDefault(); setView('dashboard'); }} className="space-y-3.5 mt-4">
                    <div className="relative flex items-center">
                      <User size={14} className="absolute left-4 text-slate-500 opacity-60" />
                      <input type="text" required placeholder="Full Name" className="w-full pl-10 pr-4 py-3 bg-[#EAF2E6]/60 border-none rounded-xl text-xs font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4A7055]" />
                    </div>
                    <div className="relative flex items-center">
                      <Lock size={14} className="absolute left-4 text-slate-500 opacity-60" />
                      <input type="password" required placeholder="••••••••" className="w-full pl-10 pr-10 py-3 bg-[#EAF2E6]/60 border-none rounded-xl text-xs font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4A7055]" />
                      <span className="absolute right-4 text-slate-400 text-xs cursor-pointer">👁</span>
                    </div>

                    {/* Checkbox Remember Me & Forgot Link */}
                    <div className="flex justify-between items-center px-1 text-[10px] text-slate-400 font-bold">
                      <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" className="accent-[#4A7055] rounded" /> Remember Me</label>
                      <span className="hover:underline cursor-pointer">Forgot Password?</span>
                    </div>

                    <button type="submit" className="w-full bg-[#4A7055] hover:bg-[#3D5C46] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all mt-4">
                      Login
                    </button>
                  </form>

                  <div className="text-center text-xs text-slate-400 font-semibold pt-4">
                    Don't have account? <button onClick={() => setView('signup')} className="font-black text-[#4A7055] hover:underline pl-0.5">Sign up</button>
                  </div>
                </div>
              </div>
            )}

            {/* --- C. VIEW: SIGN UP / CREATE ACCOUNT PAGE (Persis Layar Kanan) --- */}
            {view === 'signup' && (
              <div className="flex flex-col h-full w-full absolute inset-0 bg-white p-8 pt-12 justify-between animate-fadeIn z-10">
                <div>
                  <button onClick={() => setView('signin')} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                    <ArrowLeft size={14} />
                  </button>

                  {/* Title Section With Floating Leaf Graphic Icon */}
                  <div className="mt-6 relative">
                    <div className="absolute right-4 -top-2 text-emerald-700/40 text-3xl">🍃</div>
                    <h2 className="text-2xl font-bold text-[#2D3B26] tracking-tight">Register</h2>
                    <p className="text-slate-400 text-[11px] font-medium mt-0.5">Create your new account</p>
                  </div>

                  {/* Form Minimalist Inputs */}
                  <form onSubmit={(e) => { e.preventDefault(); setView('verify'); }} className="space-y-3.5 mt-6">
                    <div className="relative flex items-center">
                      <User size={14} className="absolute left-4 text-slate-500 opacity-60" />
                      <input type="text" name="name" required placeholder="Full Name" value={formData.name} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-[#EAF2E6]/60 border-none rounded-xl text-xs font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4A7055]" />
                    </div>
                    <div className="relative flex items-center">
                      <Mail size={14} className="absolute left-4 text-slate-500 opacity-60" />
                      <input type="email" required placeholder="user@mail.com" className="w-full pl-10 pr-10 py-3 bg-[#EAF2E6]/60 border-none rounded-xl text-xs font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4A7055]" />
                      <span className="absolute right-4 text-emerald-600 text-xs font-bold">✓</span>
                    </div>
                    <div className="relative flex items-center">
                      <Lock size={14} className="absolute left-4 text-slate-500 opacity-60" />
                      <input type="password" required placeholder="Password" className="w-full pl-10 pr-10 py-3 bg-[#EAF2E6]/60 border-none rounded-xl text-xs font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4A7055]" />
                      <span className="absolute right-4 text-slate-400 text-xs">👁</span>
                    </div>

                    <div className="flex justify-between items-center px-1 text-[10px] text-slate-400 font-bold pt-0.5">
                      <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" defaultChecked className="accent-[#4A7055] rounded" /> Remember Me</label>
                      <span className="hover:underline cursor-pointer">Forgot Password?</span>
                    </div>

                    <button type="submit" className="w-full bg-[#4A7055] hover:bg-[#3D5C46] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all mt-3">
                      Login
                    </button>
                  </form>

                  {/* Or Continue With Separator */}
                  <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-slate-100"></div>
                    <span className="flex-shrink mx-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Or continue with</span>
                    <div className="flex-grow border-t border-slate-100"></div>
                  </div>

                  {/* Social Buttons Bulat Khas Referensi */}
                  <div className="flex justify-center gap-4">
                    <button className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-xs font-bold shadow-2xs hover:bg-slate-50 text-blue-600">f</button>
                    <button className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-xs font-bold shadow-2xs hover:bg-slate-50 text-red-500">G</button>
                    <button className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-xs font-bold shadow-2xs hover:bg-slate-50 text-black"></button>
                  </div>
                </div>

                <div className="text-center text-xs text-slate-400 font-semibold">
                  Already have an account? <button onClick={() => setView('signin')} className="font-black text-[#4A7055] hover:underline pl-0.5">Sign up</button>
                </div>
              </div>
            )}

            {/* --- D. VIEW: OTP VERIFY PAGE --- */}
            {view === 'verify' && (
              <div className="flex flex-col justify-between h-full w-full absolute inset-0 p-8 bg-[#FDFBF7] text-[#2D3B26] animate-fadeIn z-10">
                <div className="text-center space-y-6 mt-16">
                  <div className="w-16 h-16 bg-[#2D3B26]/10 rounded-full flex items-center justify-center mx-auto text-[#2D3B26]"><Mail size={32} /></div>
                  <h2 className="text-2xl font-black">Verify your account</h2>
                  <p className="text-xs text-gray-500 max-w-[220px] mx-auto">Masukkan 5-digit kode konfirmasi yang dikirim ke email.</p>
                  <div className="flex justify-center gap-2 pt-2 text-current">
                    {['2', '8', '0', '5', ''].map((num, i) => (
                      <div key={i} className={`w-11 h-13 rounded-xl border-2 flex items-center justify-center text-base font-black ${num ? 'border-[#2D3B26] bg-[#2D3B26]/5' : 'border-gray-200'}`}>{num}</div>
                    ))}
                  </div>
                  <button onClick={() => setView('dashboard')} className="w-full bg-[#2D3B26] text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-widest">Verify Code</button>
                </div>
                <div className="text-center text-xs text-gray-400">Tidak menerima email? <span className="text-[#2D3B26] font-bold underline cursor-pointer">Kirim ulang</span></div>
              </div>
            )}

          </div>
        )}

        {/* =========================================================================
            SCREEN 4: SYSTEM DASHBOARD (Otentik Tema RecycleHub & Sirkular Ekonomi KIK)
            ========================================================================= */}
        {view === 'dashboard' && (
          <div className="flex-1 flex flex-col h-full bg-[#FDFBF7]">

            {/* APP TOP PROFILE HEADER STATUS BAR */}
            <div className="px-5 pt-8 pb-4 flex justify-between items-center border-b border-[#2D3B26]/5 bg-[#FDFBF7] z-10">
              <div className="flex items-center gap-2.5">
                <img src={userProfile.avatar} alt="Avatar" className="w-9 h-9 rounded-full object-cover ring-2 ring-[#2D3B26]/20" />
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Eco Creator</h4>
                  <h3 className="text-xs font-black text-[#2D3B26]">{userProfile.name.split(' ').slice(0, 2).join(' ')}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black bg-[#2D3B26]/5 text-[#2D3B26] px-2.5 py-1.5 rounded-xl">🌱 {ecoPoints} Pts</span>
                <button onClick={() => setDashboardTab('notifications')} className={`p-2 rounded-xl relative transition-all ${dashboardTab === 'notifications' ? 'bg-[#2D3B26] text-[#FDFBF7]' : 'bg-[#2D3B26]/5 text-[#2D3B26]'}`}><Bell size={15} /><span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span></button>
              </div>
            </div>

            {/* DYNAMIC SCROLL CONTAINER CONTENT WORKSPACE */}
            <div className="flex-grow overflow-y-auto px-5 py-4 space-y-4 scrollbar-none">

              {/* [TAB 1]: INTERACTIVE TUTORIAL HUB */}
              {dashboardTab === 'tutorial' && (
                <div className="space-y-4 animate-fadeIn">

                  {/* ECO-URGENCY INDONESIA BANNER */}
                  <div className="bg-[#EAF2E6] border border-[#2D3B26]/10 rounded-2xl p-4 space-y-1.5 shadow-xs">
                    <div className="flex items-center gap-1.5 text-[#2D3B26] font-black text-xs">
                      <span>🚨</span><h4>Fakta Lingkungan Indonesia</h4>
                    </div>
                    <p className="text-[11px] font-medium text-[#4A5D3E] leading-relaxed">
                      Di Indonesia, sampah plastik terus melonjak hingga **jutaan ton per tahun**. Sebagian besar mencemari laut kita. <span className="font-black text-[#2D3B26]">Yuk ubah limbah sekolahmu jadi karya cuan estetik! 🌍</span>
                    </p>
                  </div>

                  {/* CAROUSEL TUTORIAL STEP GUIDE */}
                  <div className="bg-[#2D3B26] text-[#FDFBF7] p-5 rounded-[2.5rem] space-y-4 relative overflow-hidden shadow-md">
                    <span className="text-[9px] bg-white/20 text-white px-2.5 py-1 rounded-full font-bold uppercase tracking-widest">Interactive Hub</span>
                    <h3 className="text-lg font-black leading-tight text-white">Ubah Botol Gelas Plastik Menjadi Pot Estetik</h3>

                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[9px] text-[#FDFBF7]/60 font-bold"><span>Tahap Pengerjaan</span><span>Step 3 dari 4</span></div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="w-3/4 h-full bg-[#A0E670] rounded-full"></div></div>
                    </div>

                    <div className="bg-[#FDFBF7] text-[#2D3B26] p-4 rounded-xl text-xs font-medium border border-white/10 shadow-inner">
                      <p className="leading-relaxed text-slate-700 font-bold">Haluskan pinggiran plastik yang sudah dipotong, lalu lubangi bagian tengah bawah untuk jalur resapan air tanaman.</p>
                    </div>

                    <div className="flex gap-2.5 pt-1 text-current">
                      <button onClick={() => setDashboardTab('marketplace')} className="flex-1 bg-white/10 text-white font-bold py-2.5 rounded-xl text-xs">Back</button>
                      <button onClick={() => { setEcoPoints(p => p + 10); alert('Maju ke tahap selanjutnya! +10 Pts 🌱'); }} className="flex-1 bg-[#FDFBF7] text-[#2D3B26] font-black py-2.5 rounded-xl text-xs shadow-sm">Lanjut 🔥</button>
                    </div>
                  </div>

                  {/* MINI MODUL CARD GRID */}
                  <div className="space-y-2 pt-1">
                    <h4 className="text-[11px] font-black uppercase text-gray-400 pl-1">Kurikulum Keterampilan Ekologis</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-xs flex flex-col justify-between h-24 cursor-pointer hover:border-[#2D3B26] transition-all">
                        <BookOpen size={16} className="text-[#2D3B26]" />
                        <span className="text-xs font-black text-[#2D3B26]">Kardus Bekas Paket</span>
                      </div>
                      <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-xs flex flex-col justify-between h-24 cursor-pointer hover:border-[#2D3B26] transition-all">
                        <Leaf size={16} className="text-[#2D3B26]" />
                        <span className="text-xs font-black text-[#2D3B26]">Pupuk Kompos Organik</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* [TAB 2]: ECO MARKETPLACE (Restrukturisasi Konten Murni Tema RecycleHub) */}
              {dashboardTab === 'marketplace' && (
                <div className="space-y-4 animate-fadeIn text-[#2D3B26]">

                  {/* SEARCH BAR BARU */}
                  <div className="relative">
                    <Search className="absolute left-4 top-3 text-gray-400" size={14} />
                    <input type="text" placeholder="Cari karya / bahan daur ulang..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-white border border-gray-200 pl-10 pr-4 py-2 text-xs rounded-xl focus:outline-none" />
                  </div>

                  {/* 1. HERO BANNER CAROUSEL (Tema Setor Sampah Sekolah & Tambahan Poin) */}
                  <div className="w-full h-44 bg-gradient-to-r from-[#DCE7D3] to-[#B9CBB0] relative flex items-center p-5 overflow-hidden shadow-xs rounded-2xl">
                    <div className="space-y-1 z-10 max-w-[170px]">
                      <span className="text-[8px] text-[#2D3B26] font-black uppercase tracking-widest block opacity-70">RecycleHub Special Event</span>
                      <h2 className="text-base font-serif font-black text-[#1A2E0F] leading-tight">Rayakan Kreasi Hijau Aslimu 🍀</h2>
                      <p className="text-[9px] text-[#2D3B26]/80 font-bold">Kado Tambahan +50 Pts Menanti Tiap Setoran Botol Pertamamu!</p>
                      <div className="pt-2"><span className="text-[8px] font-black bg-[#2D3B26] text-[#FDFBF7] px-2.5 py-1 rounded-md uppercase">Free Points Voucher</span></div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400" alt="banner eco" className="absolute right-0 bottom-0 h-full w-[45%] object-cover mix-blend-multiply opacity-80" />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                      <div className="w-1.5 h-1.5 bg-[#2D3B26] rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-[#2D3B26]/30 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-[#2D3B26]/30 rounded-full"></div>
                    </div>
                  </div>

                  {/* 2. GREETING & QUICK ACTION GRID (Pusat Kendali Mitra Kreator) */}
                  <div className="p-4 bg-gradient-to-br from-[#2D3B26] to-[#1F261B] text-white rounded-2xl shadow-sm space-y-3.5">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-[#BAC7AC] font-bold block">Selamat Pagi,</span>
                      <h3 className="text-sm font-black tracking-wide text-[#FDFBF7]">{userProfile.name}</h3>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-center border-t border-white/10 pt-3">
                      <div className="space-y-1 cursor-pointer">
                        <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center mx-auto"><Leaf size={15} className="text-[#A0E670]" /></div>
                        <span className="text-[10px] font-bold text-[#BAC7AC] block truncate">{ecoPoints} Pts</span>
                      </div>
                      <div onClick={() => setDashboardTab('upload')} className="space-y-1 cursor-pointer">
                        <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center mx-auto"><PlusCircle size={15} className="text-white" /></div>
                        <span className="text-[10px] font-bold text-[#BAC7AC] block truncate">Setor Karya</span>
                      </div>
                      <div onClick={() => setDashboardTab('help')} className="space-y-1 cursor-pointer">
                        <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center mx-auto"><HelpCircle size={15} className="text-white" /></div>
                        <span className="text-[10px] font-bold text-[#BAC7AC] block truncate">Bantuan</span>
                      </div>
                      <div onClick={() => setDashboardTab('history')} className="space-y-1 cursor-pointer">
                        <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center mx-auto"><History size={15} className="text-white" /></div>
                        <span className="text-[10px] font-bold text-[#BAC7AC] block truncate">Riwayat</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. SECTION 1: KARYA TERLARIS (Katalog Produk Hasil Upcycling Pelajar) */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center"><h4 className="font-serif font-black text-sm text-[#2D3B26]">Karya Terlaris</h4><span className="text-[11px] text-gray-400 font-bold cursor-pointer">Lihat Semua</span></div>

                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {['Semua', 'Dekorasi', 'Fashion', 'Organik'].map(cat => (
                        <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${selectedCategory === cat ? 'bg-[#2D3B26] text-white' : 'bg-gray-100 text-gray-400'}`}>{cat}</button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      {filteredProducts.map(p => (
                        <div key={p.id} onClick={() => { setSelectedProduct(p); setDetailQuantity(1); setDashboardTab('detail'); }} className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col justify-between h-[255px] shadow-2xs relative cursor-pointer">
                          <button onClick={(e) => { e.stopPropagation(); alert('Disukai! ❤️'); }} className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full text-gray-300 hover:text-red-500 z-10"><Heart size={13} fill="currentColor" /></button>
                          <div className="w-full h-28 rounded-lg overflow-hidden bg-gray-50"><img src={p.image} alt="p" className="w-full h-full object-cover" /></div>
                          <div className="pt-2 space-y-0.5">
                            <span className="text-[9px] text-gray-400 font-bold block uppercase">{p.material}</span>
                            <h5 className="text-xs font-black text-[#2D3B26] truncate">{p.name}</h5>
                            <div className="flex items-center gap-0.5 text-amber-500 text-[10px] font-black">{'★★★★★'} <span className="text-gray-400 font-bold text-[9px] pl-1">5/5</span></div>
                            <div className="flex justify-between items-center pt-1">
                              <span className="text-xs font-black text-[#2D3B26]">Rp {p.price.toLocaleString('id-ID')}</span>
                              <span className="text-[8px] text-gray-400 font-medium">{p.likes} Disukai</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. SECTION 2: NEW ECO PROGRAM */}
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-center"><h4 className="font-serif font-black text-sm text-[#2D3B26]">Workshop Terbaru 🌱</h4><span className="text-[11px] text-gray-400 font-bold">Lihat Semua</span></div>
                    <div onClick={() => setDashboardTab('tutorial')} className="bg-white border border-gray-100 rounded-xl p-3 flex items-center gap-3 shadow-2xs cursor-pointer">
                      <div className="w-20 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0"><img src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500" alt="workshop" className="w-full h-full object-cover" /></div>
                      <div className="space-y-0.5 flex-1">
                        <h5 className="text-xs font-black text-emerald-700 uppercase flex items-center gap-1">Edukasi Pilah Sampah Mandiri <span className="text-[10px]">✔</span></h5>
                        <p className="text-[10px] text-gray-400 font-medium line-clamp-2 leading-tight">Prosedur pengerjaan pengolahan plastik PET dan HDPE kantin menjadi komoditas sirkular sekolah.</p>
                      </div>
                    </div>
                  </div>

                  {/* 5. SECTION 3: ARTIKEL & EDUKASI LINGKUNGAN */}
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-center"><h4 className="font-serif font-black text-sm text-[#2D3B26]">Artikel & Informasi</h4><span className="text-[11px] text-gray-400 font-bold">Lihat Semua</span></div>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                      {[
                        { title: 'Apakah Tumpukan Sampah Kantin Sekolah Menyebabkan Kerusakan?', desc: 'Analisis mengenai bahaya timbulan plastik pembungkus makanan ringan dan sedotan...' },
                        { title: 'The Best Way To Recycling Your Bottle Caps!', desc: 'Tips praktis mengolah kepingan tutup botol minuman keras bekas menjadi produk bernilai jual...' }
                      ].map((art, idx) => (
                        <div key={idx} className="bg-white border border-gray-100 rounded-xl p-3 min-w-[240px] max-w-[240px] space-y-2 shadow-2xs">
                          <div className="h-24 rounded-lg bg-slate-100 overflow-hidden"><img src={idx === 0 ? "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500" : "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500"} alt="art" className="w-full h-full object-cover" /></div>
                          <span className="text-[9px] bg-[#C2A379]/20 text-[#A68658] font-bold px-2 py-0.5 rounded-md uppercase">Moklet Berdampak</span>
                          <h5 className="text-xs font-black text-[#2D3B26] line-clamp-2 leading-tight">{art.title}</h5>
                          <p className="text-[10px] text-gray-400 line-clamp-2 leading-tight font-medium">{art.desc}</p>
                          <button onClick={() => setDashboardTab('help')} className="w-full bg-[#C2A379]/40 hover:bg-[#C2A379]/60 text-[#2D3B26] text-[10px] font-black py-1.5 rounded-lg transition-colors">Read Article</button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* [TAB 2.5]: SCREEN VIEW DETAIL PRODUCT */}
              {dashboardTab === 'detail' && selectedProduct && (
                <div className="space-y-5 animate-fadeIn text-[#2D3B26]">
                  <div className="flex justify-between items-center">
                    <button onClick={() => setDashboardTab('marketplace')} className="p-2.5 bg-white border border-gray-200 rounded-xl font-bold text-xs">← Back</button>
                    <span className="text-xs font-black uppercase tracking-wider text-gray-400">Detail Produk</span>
                    <div className="w-8 h-8"></div>
                  </div>
                  <div className="bg-white border border-gray-100 p-4 rounded-[2.5rem] shadow-sm space-y-4 text-center">
                    <img src={selectedProduct.image} alt="detail" className="w-48 h-48 rounded-2xl object-cover mx-auto" />
                    <span className="text-[10px] font-black bg-[#2D3B26]/5 text-[#2D3B26] px-3 py-1 rounded-full uppercase tracking-wider">{selectedProduct.material}</span>
                    <h3 className="text-xl font-black">{selectedProduct.name}</h3>
                    <p className="text-xs text-gray-500 font-medium px-4 leading-relaxed">Karya seni daur ulang sirkular eksklusif, dibuat dengan ketelitian tinggi demi menjaga keasrian lingkungan hidup.</p>
                  </div>
                  <div className="bg-[#2D3B26] rounded-3xl p-4 flex justify-between items-center text-white shadow-md">
                    <div className="flex items-center gap-4 pl-2">
                      <button onClick={() => setDetailQuantity(p => Math.max(1, p - 1))} className="text-lg font-black bg-white/10 w-7 h-7 rounded-full flex items-center justify-center">-</button>
                      <span className="font-black text-sm">{detailQuantity}</span>
                      <button onClick={() => setDetailQuantity(p => p + 1)} className="text-lg font-black bg-white/10 w-7 h-7 rounded-full flex items-center justify-center">+</button>
                    </div>
                    <button
                      onClick={() => {
                        for (let i = 0; i < detailQuantity; i++) { addToCart(selectedProduct); }
                        setDashboardTab('cart');
                      }}
                      className="bg-[#FDFBF7] text-[#2D3B26] font-black px-5 py-2.5 rounded-xl text-xs"
                    >
                      Beli • Rp {(selectedProduct.price * detailQuantity).toLocaleString('id-ID')}
                    </button>
                  </div>
                </div>
              )}

              {/* [TAB 3]: CART KERANJANG SCREEN */}
              {dashboardTab === 'cart' && (
                <div className="space-y-4 animate-fadeIn text-[#2D3B26]">
                  <h2 className="text-xl font-black">Cart</h2>
                  <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1 scrollbar-none">
                    {cart.map(item => (
                      <div key={item.product.id} className="bg-white border border-gray-100 rounded-2xl p-2.5 flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-3">
                          <img src={item.product.image} alt="p" className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <h4 className="font-black text-[#2D3B26] text-xs truncate max-w-[120px]">{item.product.name}</h4>
                            <p className="text-[10px] text-gray-400 font-bold">{item.quantity} piece</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-700 bg-[#edf2ea] px-2.5 py-0.5 rounded-lg">Rp{(item.product.price * item.quantity).toLocaleString('id-ID')}</span>
                          <button onClick={() => removeFromCart(item.product.id)} className="text-rose-500 p-1.5 hover:bg-rose-50 rounded-full">🗑</button>
                        </div>
                      </div>
                    ))}
                    {cart.length === 0 && <div className="text-center text-xs text-gray-400 py-12 font-bold">Keranjang belanjamu kosong.</div>}
                  </div>

                  <div className="bg-[#2D3B26] rounded-[2.2rem] p-5 space-y-3 text-white shadow-xl border border-white/5">
                    <div className="flex justify-between text-[11px] text-white/70 font-semibold border-b border-white/10 pb-2"><span>Delivery Amount</span><span>Rp25.500</span></div>
                    <div className="flex justify-between text-xs font-black"><span>Total Amount</span><span>Rp{(totalCartPrice + 25500).toLocaleString('id-ID')}</span></div>
                    <button onClick={handleCheckout} className="w-full bg-white text-[#2d3a22] rounded-xl py-3 px-4 flex justify-between items-center font-black text-xs mt-1 shadow-md">
                      <span>Make Payment</span><div className="bg-[#2d3a22] text-white px-2 py-1 rounded-lg text-[9px] font-black">&gt;&gt;&gt;</div>
                    </button>
                  </div>
                </div>
              )}

              {/* [TAB 4]: OPEN SHOP UPLOAD LAPAK BARU */}
              {dashboardTab === 'upload' && (
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4 animate-fadeIn text-[#2D3B26]">
                  <h3 className="font-black text-sm">Buka Lapak Kreatif Baru</h3>
                  <form onSubmit={handleUploadProduct} className="space-y-3">
                    <input type="text" required placeholder="Nama Produk Daur Ulang" value={uploadForm.name} onChange={e => setUploadForm({ ...uploadForm, name: e.target.value })} className="w-full border border-gray-200 px-3.5 py-2.5 text-xs rounded-xl focus:outline-none focus:border-[#2D3B26]" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="number" required placeholder="Harga Jual (Rp)" value={uploadForm.price} onChange={e => setUploadForm({ ...uploadForm, price: e.target.value })} className="w-full border border-gray-200 px-3.5 py-2.5 text-xs rounded-xl focus:outline-none" />
                      <select value={uploadForm.category} onChange={e => setUploadForm({ ...uploadForm, category: e.target.value })} className="w-full border border-gray-200 px-3 py-2.5 text-xs rounded-xl bg-white focus:outline-none"><option>Dekorasi</option><option>Fashion</option><option>Organik</option></select>
                    </div>
                    <input type="text" placeholder="Dampak Ekologis (Eco-Impact)" value={uploadForm.impact} onChange={e => setUploadForm({ ...uploadForm, impact: e.target.value })} className="w-full border border-gray-200 px-3.5 py-2.5 text-xs rounded-xl focus:outline-none" />
                    <button type="submit" className="w-full py-3 bg-[#2D3B26] text-white font-black rounded-xl text-xs tracking-wider uppercase">Terbitkan Karya ✨</button>
                  </form>
                </div>
              )}

              {/* [TAB 5]: TRANSACTION HISTORY ACTIVITIES */}
              {dashboardTab === 'history' && (
                <div className="space-y-3 animate-fadeIn text-[#2D3B26]">
                  <h3 className="text-sm font-black uppercase text-gray-400 pl-1">Riwayat Aktivitas</h3>
                  {transactions.map((t, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-3">
                        <img src={t.image} alt="p" className="w-11 h-11 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-extrabold text-xs text-[#2D3B26] truncate max-w-[150px]">{t.productName}</h4>
                          <p className="text-[9px] text-gray-400 font-bold mt-0.5">{t.id} • {t.date}</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-black px-2.5 py-1 rounded-full bg-[#2D3B26]/5 text-[#2D3B26]">{t.status}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* [TAB 6]: PROFILE ACCOUNT USER */}
              {dashboardTab === 'profile' && (
                <div className="space-y-4 animate-fadeIn text-[#2D3B26]">
                  <div className="bg-[#2D3B26] text-[#FDFBF7] p-5 rounded-[2rem] text-center space-y-2 shadow-md">
                    <img src={userProfile.avatar} alt="Profile" className="w-16 h-16 rounded-full object-cover mx-auto ring-4 ring-white/10" />
                    <h3 className="text-base font-black text-white">{userProfile.name}</h3>
                    <span className="text-[9px] bg-white/20 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">{userProfile.class} • {userProfile.role}</span>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs text-xs font-bold text-[#2D3B26] divide-y divide-gray-50">
                    <div onClick={() => setDashboardTab('help')} className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"><span>Help & Support Center</span><ChevronRight size={14} /></div>
                    <div onClick={() => { setView('cover'); setCart([]); }} className="p-4 flex justify-between items-center text-red-600 cursor-pointer hover:bg-red-50/50"><span>Keluar / Log Out</span></div>
                  </div>
                </div>
              )}

              {/* [TAB 7]: NOTIFIKASI SYSTEM */}
              {dashboardTab === 'notifications' && (
                <div className="space-y-3 animate-fadeIn text-[#2D3B26]">
                  <h3 className="text-sm font-black">Notifikasi Masuk</h3>
                  <div className="bg-white p-3.5 rounded-2xl border border-gray-100 flex gap-3 shadow-xs">
                    <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600 h-fit"><CheckCircle size={16} /></div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-black">Klaim Poin Sukses! 🎉</h4>
                      <p className="text-[11px] text-gray-500 leading-normal">Selamat! Setoran kerajinan daur ulang dari custgrace disetujui kurator sekolah.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* [TAB 8]: HELP & SUPPORT SERVICE */}
              {dashboardTab === 'help' && (
                <div className="space-y-4 animate-fadeIn text-[#2D3B26]">
                  <h3 className="text-sm font-black">Help & Support Center</h3>
                  <div className="bg-[#2D3B26]/5 p-4 rounded-xl text-xs leading-relaxed font-medium">Punya kendala teknis dalam menghitung rasio berat plastik ke **EcoPoints**? Kontak tim dukungan admin kami via internal sekolah.</div>
                  {['Sistem Konversi Bobot Plastik', 'Aturan Kebersihan Botol Wadah', 'Pencairan Finansial Merchant'].map((q, i) => (
                    <div key={i} className="p-3.5 bg-white border border-gray-100 rounded-xl flex justify-between items-center shadow-xs cursor-pointer hover:border-[#2D3B26] text-xs font-bold"><span>{q}</span><ArrowUpRight size={14} className="text-gray-400" /></div>
                  ))}
                </div>
              )}

            </div>

            {/* PREMIUM 5-ICONS FLAT DOCK BOTTOM BAR MENU */}
            <div className="mt-auto bg-white border-t border-gray-100 px-2 py-2 flex justify-between items-center z-40 shadow-xl">
              <button onClick={() => setDashboardTab('marketplace')} className={`flex-1 py-1 flex flex-col items-center gap-0.5 transition-all ${dashboardTab === 'marketplace' || dashboardTab === 'detail' ? 'text-[#2D3B26] font-black scale-105' : 'text-gray-400'}`}><Grid size={18} /><span className="text-[9px] font-bold">Beranda</span></button>
              <button onClick={() => setDashboardTab('tutorial')} className={`flex-1 py-1 flex flex-col items-center gap-0.5 transition-all ${dashboardTab === 'tutorial' ? 'text-[#2D3B26] font-black scale-105' : 'text-gray-400'}`}><BookOpen size={18} /><span className="text-[9px] font-bold">Tutorial</span></button>
              <button onClick={() => setDashboardTab('upload')} className={`flex-1 py-1 flex flex-col items-center gap-0.5 transition-all ${dashboardTab === 'upload' ? 'text-[#2D3B26] font-black scale-105' : 'text-gray-400'}`}><PlusCircle size={18} /><span className="text-[9px] font-bold">Upload</span></button>
              <button onClick={() => setDashboardTab('cart')} className={`flex-1 py-1 flex flex-col items-center gap-0.5 transition-all ${dashboardTab === 'cart' ? 'text-[#2D3B26] font-black scale-105' : 'text-gray-400'}`}><ShoppingCart size={18} /><span className="text-[9px] font-bold">Cart</span></button>
              <button onClick={() => setDashboardTab('profile')} className={`flex-1 py-1 flex flex-col items-center gap-0.5 transition-all ${dashboardTab === 'profile' || dashboardTab === 'help' ? 'text-[#2D3B26] font-black scale-105' : 'text-gray-400'}`}><Settings size={18} /><span className="text-[9px] font-bold">Profile</span></button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}