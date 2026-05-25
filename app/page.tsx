'use client';

import React, { useState, useRef } from 'react';
import {
  Leaf, Bell, HelpCircle, Search, ShoppingCart, PlusCircle,
  History, Settings, Grid, ChevronRight, ArrowUpRight,
  CheckCircle, BookOpen, LogOut, Package, User, Star, Upload, Plus,
  Heart, MessageCircle, Send, X, ArrowLeft, Play, Bookmark, Menu, Calendar, Award, Newspaper, ShieldCheck, MapPin, School, GraduationCap
} from 'lucide-react';

// =========================================================================
// DATA INTERFACES
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

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

interface TutorialItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  likes: number;
  isLiked?: boolean;
  steps: string[];
  comments: Comment[];
}

export default function RecrafterWebsite() {
  // --- STATE NAVIGASI & LAYOUT ---
  const [activeTab, setActiveTab] = useState<'marketplace' | 'tutorial' | 'upload' | 'history' | 'profile' | 'notifications' | 'help' | 'cart' | 'upload-tutorial'>('marketplace');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedTutorialCategory, setSelectedTutorialCategory] = useState<string>('Semua');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // --- STATE POP-UP DETAIL MODAL ---
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState<boolean>(false);

  // --- STATE TUTORIAL AKTIF & KOMENTAR ---
  const [activeTutorial, setActiveTutorial] = useState<TutorialItem | null>(null);
  const [newCommentText, setNewCommentText] = useState<string>('');

  // --- FORM STATE UNTUK UPLOAD TUTORIAL BARU ---
  const [tutorialForm, setTutorialForm] = useState({
    title: '',
    category: 'Pot Estetik',
    description: '',
    step1: '',
    step2: '',
    step3: '',
    imageFileName: ''
  });

  // --- SWIPE / DRAG STATE UNTUK BROSUR BANNER ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const banners = [
    {
      tag: "Campaign Mei 2026",
      title: "Ubah Limbah Sekolah Jadi Cuan Melimpah!",
      desc: "Kumpulkan produk daur ulang kreatifmu sekarang. Dapatkan apresiasi pendanaan beasiswa, serta sertifikat resmi dari kurator lingkungan sekolah.",
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500"
    },
    {
      tag: "Special Weekend",
      title: "Rayakan Kreasi Hijau Aslimu 🍀",
      desc: "Apresiasi Tambahan Menanti Tiap Setoran Produk Daur Ulang Pertama Angkatanmu di Drop Point Utama!",
      img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500"
    },
    {
      tag: "Workshop Kreatif",
      title: "Eco-Creators Bootcamp Bersama OSIS",
      desc: "Ikuti kelas membuat aksesoris estetik dari limbah botol PET kosmetik hari Sabtu ini di Laboratorium RPL.",
      img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500"
    }
  ];

  // Logika swipe brosur
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) setCurrentSlide((prev) => (prev + 1) % banners.length);
    else if (distance < -50) setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    touchStartX.current = 0; touchEndX.current = 0;
  };
  const handleMouseDown = (e: React.MouseEvent) => { touchStartX.current = e.clientX; };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!touchStartX.current) return;
    touchEndX.current = e.clientX;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) setCurrentSlide((prev) => (prev + 1) % banners.length);
    else if (distance < -50) setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    touchStartX.current = 0;
  };

  // --- STATE DATA ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TRX-9821', date: '14 Mei 2026', productName: 'Eco Pastel Earrings', price: 12500, status: 'Selesai', image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=500' }
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Tas Totebag Karung Goni', price: 45000, seller: 'NgelCraft', material: 'Karung Bekas', category: 'Fashion', impact: '1.2kg emisi karbon dicegah', likes: 24, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500' },
    { id: '2', name: 'Premium Desk Organizer', price: 32000, seller: 'EcoStudio', material: 'Kardus Tebal', category: 'Dekorasi', impact: '0.8kg limbah diselamatkan', likes: 18, image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=500' },
    { id: '3', name: 'Pot Estetik Serat Kelapa', price: 15000, seller: 'GreenThumb', material: 'Sabut Kelapa', category: 'Organik', impact: 'Biodegradable alami', likes: 42, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500' },
    { id: '4', name: 'Lampu Tidur Kap Plastik', price: 65000, seller: 'ReCraftMalang', material: 'Gelas Plastik', category: 'Dekorasi', impact: '20 gelas plastik digunakan', likes: 15, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500' }
  ]);

  const [tutorials, setTutorials] = useState<TutorialItem[]>([
    {
      id: 't1',
      title: 'Pot Estetik dari Serat Handuk Bekas',
      description: 'Teknik pembentukan semen dan cetakan kain bekas untuk hasil pot bertekstur boho klasik.',
      category: 'Pot Estetik',
      likes: 142,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500',
      steps: [
        "Siapkan handuk bekas yang sudah tidak dipakai and adonan semen cair encer.",
        "Rendam seluruh bagian handuk ke dalam adonan semen hingga meresap sempurna.",
        "Balikkan ember bekas sebagai cetakan, lalu letakkan handuk basah semen di atasnya.",
        "Atur lipatan kain handuk di sekeliling ember agar membentuk rumbai estetik.",
        "Tunggu mengering selama 24-48 jam, lepas dari cetakan, lalu cat dengan warna pastel murni."
      ],
      comments: [
        { id: 'c1', user: 'Raraa_rpl', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', text: 'Keren pol! lgsung tak coba di rumah buat tugas projek', time: '2 jam yang lalu' },
        { id: 'c2', user: 'Dev_Moklet', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', text: 'Bahan semennya mending pake yang tipe apa ya kak?', time: '30 mnt yang lalu' }
      ]
    },
    {
      id: 't2',
      title: 'Gelang Manik Cantik dari Tali Plastik PET',
      description: 'Ubah serpihan botol plastik menjadi manik-manik mengkilap lewat pemanasan aman.',
      category: 'Gelang',
      likes: 89,
      image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500',
      steps: [
        "Gunting botol plastik PET bersih menjadi potongan pita panjang sekitar 1cm.",
        "Gulung pita plastik tersebut mengelilingi tusuk sate besi.",
        "Gunakan heat gun atau lilin (jarak aman) secara perlahan sampai plastik menyusut bulat.",
        "Potong manik-manik cetak tersebut menjadi butiran, lalu ronce menggunakan tali elastis.",
        "Tambahkan pengait estetik untuk sentuhan akhir gelang komersial."
      ],
      comments: [
        { id: 'c3', user: 'Salsa_Kreatif', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', text: 'Wah ga nyangka dr botol bekas bsa sekilat ini hasilnya ✨', time: '1 hari yang lalu' }
      ]
    },
    {
      id: 't3',
      title: 'Anting Macrame Minimalis Benang Katun Sisa',
      description: 'Anyaman simpul dasar menghasilkan anting etnik bernilai jual tinggi.',
      category: 'Anting',
      likes: 210,
      image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=500',
      steps: [
        "Potong benang katun sisa konveksi menjadi 6 helai ukuran 15cm.",
        "Pasangkan helai benang ke ring anting besi menggunakan simpul kepala burung (Larks Head Knot).",
        "Buat anyaman mendatar menggunakan simpul pipih (Square Knot) berjejer.",
        "Sisir sisa benang di bagian bawah hingga mengembang halus ala rumbai boho.",
        "Gunting rapi membentuk pola segitiga simetris."
      ],
      comments: []
    },
    {
      id: 't4',
      title: 'Pot Minimalis Gantung dari Botol Soda',
      description: 'Membuat sistem pengairan pot mandiri otomatis dengan estetika minimalis.',
      category: 'Pot Estetik',
      likes: 54,
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500',
      steps: [
        "Potong botol soda bekas menjadi dua bagian secara melintang.",
        "Lubangi tutup botol sebesar sumbu kompor atau kain flanel panjang.",
        "Masukkan kain flanel melewati lubang tutup botol sebagai resapan air.",
        "Isi bagian atas botol dengan tanah subur dan tanaman hias.",
        "Letakkan terbalik di atas potongan bawah botol yang sudah diisi air."
      ],
      comments: []
    }
  ]);

  const [uploadForm, setUploadForm] = useState({
    name: '', price: '', category: 'Dekorasi', material: 'Botol Plastik Bekas', impact: '', imageFileName: ''
  });

  const [userProfile] = useState({
    name: 'Graciella Zahra Angelia', role: 'Siswa / Kreator Muda', class: 'XI RPL', school: 'SMK Telkom Malang',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800'
  });

  // --- MARKETPLACE LOGIC ---
  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    else setCart([...cart, { product, quantity: 1 }]);
    alert(`${product.name} dimasukkan ke keranjang belanja! 🌱`);
  };

  const removeFromCart = (id: string) => { setCart(cart.filter(item => item.product.id !== id)); };
  const totalCartPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newTransactions: Transaction[] = cart.map(item => ({
      id: `TRX-${Math.floor(1000 + Math.random() * 9000)}`, date: 'Hari Ini', productName: item.product.name, price: item.product.price * item.quantity, status: 'Sedang Dikemas', image: item.product.image
    }));
    setTransactions([...newTransactions, ...transactions]); setCart([]);
    alert('Pembayaran Berhasil! 💳✨'); setActiveTab('history');
  };

  const handleUploadProduct = (e: React.FormEvent) => {
    e.preventDefault(); if (!uploadForm.name || !uploadForm.price) return;
    const createdProduct: Product = {
      id: `prod-${Date.now()}`, name: uploadForm.name, price: Number(uploadForm.price), seller: userProfile.name, material: uploadForm.material, category: uploadForm.category, impact: uploadForm.impact || 'Mengurangi sampah area sekolah', likes: 0, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500'
    };
    setProducts([createdProduct, ...products]);
    alert('Sukses! Produk Anda tayang di platform web! 🎉');
    setUploadForm({ name: '', price: '', category: 'Dekorasi', material: 'Botol Plastik Bekas', impact: '', imageFileName: '' });
    setActiveTab('marketplace');
  };

  // --- SUBMIT HANDLER UNTUK FORM TUTORIAL INTERAKTIF ---
  const handleUploadTutorialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorialForm.title || !tutorialForm.description) return;

    const parsedSteps = [
      tutorialForm.step1 || "Siapkan bahan dasar komponen daur ulang.",
      tutorialForm.step2 || "Bentuk pola rancangan sesuai panduan visual.",
      tutorialForm.step3 || "Finishing akhir dan bersihkan produk agar bernilai jual."
    ];

    const newTuto: TutorialItem = {
      id: `tuto-${Date.now()}`,
      title: tutorialForm.title,
      description: tutorialForm.description,
      category: tutorialForm.category,
      likes: 0,
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500",
      steps: parsedSteps,
      comments: []
    };

    setTutorials([newTuto, ...tutorials]);
    alert("Sukses mengunggah panduan tutorial baru ke sistem workspace! 🌱✨");
    setTutorialForm({ title: '', category: 'Pot Estetik', description: '', step1: '', step2: '', step3: '', imageFileName: '' });
    setActiveTab('tutorial');
  };

  // --- INTERAKSI LIKE & KOMEN ALA TIKTOK ---
  const handleLikeTutorial = (id: string) => {
    setTutorials(tutorials.map(t => {
      if (t.id === id) {
        const isLiked = !t.isLiked;
        const updatedTuto = { ...t, isLiked, likes: isLiked ? t.likes + 1 : t.likes - 1 };
        if (activeTutorial?.id === id) setActiveTutorial(updatedTuto);
        return updatedTuto;
      }
      return t;
    }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeTutorial) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`, user: 'Graciella_Zahra', avatar: userProfile.avatar, text: newCommentText, time: 'Baru saja'
    };

    setTutorials(tutorials.map(t => {
      if (t.id === activeTutorial.id) {
        const updatedTuto = { ...t, comments: [newComment, ...t.comments] };
        setActiveTutorial(updatedTuto);
        return updatedTuto;
      }
      return t;
    }));
    setNewCommentText('');
  };

  const filteredProducts = products.filter(p => {
    return (selectedCategory === 'Semua' || p.category === selectedCategory) &&
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.material.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const filteredTutorials = tutorials.filter(t => selectedTutorialCategory === 'Semua' || t.category === selectedTutorialCategory);

  const navigationItems = [
    { id: 'marketplace', label: 'Eco Marketplace', icon: <Grid size={16} /> },
    { id: 'tutorial', label: 'Tutorial Center', icon: <BookOpen size={16} /> },
    { id: 'upload', label: 'Buka Lapak Produk', icon: <PlusCircle size={16} /> },
    { id: 'history', label: 'Riwayat Transaksi', icon: <History size={16} /> },
  ];

  const supportItems = [
    { id: 'help', label: 'Pusat Bantuan', icon: <HelpCircle size={16} /> },
    { id: 'profile', label: 'Pengaturan Akun', icon: <Settings size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 flex flex-col md:flex-row font-sans select-none antialiased">

      {/* 1. SIDEBAR NAVIGASI */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#2D3B26] text-white flex flex-col justify-between p-6 shadow-xl z-50 transform transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl"><Leaf size={24} className="text-[#A0E670]" /></div>
              <div>
                <h1 className="text-xl font-black tracking-tight">rcyclehub</h1>
                <span className="text-[10px] text-[#BAC7AC] font-medium tracking-wider uppercase">Web Workspace</span>
              </div>
            </div>
            <button className="p-1 md:hidden text-white/70 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <nav className="space-y-1">
            <span className="text-[10px] text-[#BAC7AC]/50 font-black px-3 uppercase tracking-widest block mb-2">Menu Utama</span>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as any); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === item.id ? 'bg-[#A0E670] text-[#2D3B26] shadow-md' : 'hover:bg-white/5 text-[#BAC7AC]'}`}
              >
                {item.icon} <span>{item.label}</span>
              </button>
            ))}

            <span className="text-[10px] text-[#BAC7AC]/50 font-black px-3 uppercase tracking-widest block pt-6 mb-2">Dukungan</span>
            {supportItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as any); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === item.id ? 'bg-[#A0E670] text-[#2D3B26] shadow-md' : 'hover:bg-white/5 text-[#BAC7AC]'}`}
              >
                {item.icon} <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={userProfile.avatar} alt="User" className="w-9 h-9 rounded-full object-cover ring-2 ring-white/20" />
            <div className="max-w-[120px]">
              <h4 className="text-xs font-black truncate">{userProfile.name}</h4>
              <p className="text-[9px] text-[#BAC7AC] truncate">{userProfile.class}</p>
            </div>
          </div>
          <button onClick={() => alert('Log Out Berhasil!')} className="p-2 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"><LogOut size={16} /></button>
        </div>
      </aside>

      {/* CONTAINER UTAMA */}
      <div className="flex-1 flex flex-col min-w-0 w-full">

        {/* 2. TOPBAR */}
        <header className="bg-white border-b border-slate-100 h-16 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 w-full gap-4">
          <div className="flex items-center gap-3 flex-1 md:flex-initial">
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-xl md:hidden shrink-0" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="w-full md:w-80 lg:w-96 relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={15} />
              <input
                type="text"
                placeholder="Cari produk kreatif, nama siswa, atau bahan baku..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#2D3B26] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button onClick={() => setActiveTab('notifications')} className={`p-2 md:p-2.5 rounded-xl border relative ${activeTab === 'notifications' ? 'bg-[#2D3B26] text-white border-[#2D3B26]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
            </button>
            <button onClick={() => setActiveTab('cart')} className={`px-3 md:px-4 py-2 rounded-xl border flex items-center gap-2 text-xs font-black ${activeTab === 'cart' ? 'bg-[#2D3B26] text-white border-[#2D3B26]' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>
              <ShoppingCart size={15} />
              <span className="hidden sm:inline">Keranjang</span> <span>({totalCartItems})</span>
            </button>
          </div>
        </header>

        {/* 3. KONTEN UTAMA */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">

          {/* [TAB] ECO MARKETPLACE */}
          {activeTab === 'marketplace' && (
            <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
              {/* SLIDER BANNER */}
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                className="bg-gradient-to-r from-[#DCE7D3] to-[#B9CBB0] rounded-2xl md:rounded-3xl p-6 md:p-8 flex justify-between items-center relative overflow-hidden min-h-[160px] md:min-h-[190px] cursor-grab active:cursor-grabbing border border-[#2D3B26]/5 shadow-xs select-none"
              >
                <div className="space-y-2 max-w-xl z-10 pointer-events-none">
                  <span className="text-[9px] bg-[#2D3B26] text-white font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">{banners[currentSlide].tag}</span>
                  <h2 className="text-xl md:text-3xl font-black text-[#1A2E0F] leading-tight max-w-md">{banners[currentSlide].title}</h2>
                  <p className="text-[11px] md:text-xs font-semibold text-[#2D3B26]/80 leading-relaxed max-w-sm md:max-w-md">{banners[currentSlide].desc}</p>
                </div>
                <img src={banners[currentSlide].img} alt="Eco banner" className="absolute right-0 h-full w-[35%] lg:w-[30%] object-cover mix-blend-multiply opacity-80 hidden md:block pointer-events-none" />
                <div className="absolute bottom-3 left-6 md:left-8 flex gap-1.5 z-20">
                  {banners.map((_, index) => (
                    <div key={index} className={`h-1.5 rounded-full transition-all ${currentSlide === index ? 'w-4 bg-[#2D3B26]' : 'w-1.5 bg-[#2D3B26]/30'}`} />
                  ))}
                </div>
              </div>

              {/* SECTION WORKSHOP & INFO PAMERAN */}
              <div className="bg-gradient-to-br from-emerald-900 to-[#1F261B] text-white p-5 md:p-6 rounded-2xl shadow-md space-y-4 border border-emerald-800">
                <div className="flex items-center gap-2 text-[#A0E670]">
                  <Calendar size={18} />
                  <span className="text-xs font-black uppercase tracking-wider">Workshop & Info Pameran Esok Hari</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1.5">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-sm font-black text-white">Live Exhibition: Pameran Karya KIK (Kreativitas Inovasi & Kewirausahaan)</h4>
                      <span className="text-[9px] bg-amber-500 text-slate-900 font-black px-2 py-0.5 rounded-md uppercase shrink-0">BESOK!</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">Jangan lewatkan demonstrasi langsung seluruh produk daur ulang rcyclehub di aula utama sekolah besok pagi! Sesi kurasi live oleh dewan juri.</p>
                    <div className="text-[10px] text-[#A0E670] font-bold pt-1">📍 Lokasi: Lapangan Utama & Gedung KIK • ⏰ 08:00 - Selesai</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1.5">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-sm font-black text-white">Workshop: Kerajinan Komersial Komunitas Hijau</h4>
                      <span className="text-[9px] bg-emerald-500 text-white font-black px-2 py-0.5 rounded-md uppercase shrink-0">Mendatang</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">Kelas intensif penyusunan proposal bisnis kerajinan berbasis limbah industri kreatif rcyclehub bersama mentor expert lingkungan lokal.</p>
                    <div className="text-[10px] text-[#A0E670] font-bold pt-1">📍 Lokasi: Aula Rapat lt.2 • ⏰ Sabtu Ini, 09:00 WIB</div>
                  </div>
                </div>
              </div>

              {/* KATALOG UTAMA (GRID 2 BARIS/KOLOM PADA HP) */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Katalog Jualan Siswa</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {['Semua', 'Dekorasi', 'Fashion', 'Organik'].map((cat) => (
                      <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${selectedCategory === cat ? 'bg-[#2D3B26] text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}>{cat}</button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      onClick={() => { setSelectedProduct(product); setIsProductModalOpen(true); }}
                      className="bg-white border border-slate-100 rounded-xl md:rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="relative overflow-hidden h-32 sm:h-44 bg-slate-100">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                        <span className="absolute top-2 left-2 text-[8px] sm:text-[9px] bg-white/90 backdrop-blur-xs font-black text-[#2D3B26] px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg shadow-2xs border border-slate-100">{product.material}</span>
                      </div>
                      <div className="p-2.5 sm:p-4 space-y-1">
                        <span className="text-[8px] sm:text-[9px] text-emerald-700 font-black tracking-widest uppercase block">{product.category}</span>
                        <h4 className="font-black text-xs sm:text-sm text-slate-800 line-clamp-1 group-hover:text-emerald-800 transition-colors">{product.name}</h4>
                        <p className="text-[9px] sm:text-[11px] text-slate-400 font-bold">Oleh: {product.seller}</p>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center pt-1.5 sm:pt-2.5 border-t border-slate-100 mt-1.5 gap-0.5">
                          <span className="text-xs sm:text-sm font-black text-emerald-700">Rp{product.price.toLocaleString('id-ID')}</span>
                          <span className="text-[9px] sm:text-[11px] text-slate-400 font-medium sm:font-bold">❤️ {product.likes}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION BERITA & TREN */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 pb-2">
                  <Newspaper size={16} className="text-emerald-700" />
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Berita & Tren Daur Ulang Terkini</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 border border-slate-100 rounded-xl space-y-2 shadow-2xs">
                    <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">Breakthrough 2026</span>
                    <h5 className="text-xs font-black text-slate-800 leading-snug hover:text-[#2D3B26] cursor-pointer">Pasar Global Produk Upcycling Tembus Rekor Baru di Sektor Rumah Tangga</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Minat konsumen terhadap interior berbasis bahan daur ulang kain handuk semen & kardus melonjak drastis sepanjang awal tahun 2026 ini.</p>
                  </div>
                  <div className="bg-white p-4 border border-slate-100 rounded-xl space-y-2 shadow-2xs">
                    <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">Regulasi</span>
                    <h5 className="text-xs font-black text-slate-800 leading-snug hover:text-[#2D3B26] cursor-pointer">Sertifikasi Zero-Waste Sekolah Kini Menjadi Syarat Nilai Tambah KIK</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Kementerian Pendidikan menetapkan portofolio pengelolaan sampah plastik digital siswa menjadi instrumen apresiasi beasiswa prestasi.</p>
                  </div>
                  <div className="bg-white p-4 border border-slate-100 rounded-xl space-y-2 shadow-2xs">
                    <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">Inovasi Material</span>
                    <h5 className="text-xs font-black text-slate-800 leading-snug hover:text-[#2D3B26] cursor-pointer">Ilmuwan Temukan Teknik Penguat Komposit Serat Sabut Kelapa Alami</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Penggabungan limbah organik sabut kelapa dengan resin alami terbukti menghasilkan bahan baku pot yang 3x lebih awet dan anti jamur.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* [TAB] TUTORIAL CENTER LIST */}
          {activeTab === 'tutorial' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-slate-800">Video & Modul Daur Ulang</h2>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">Klik salah satu tutorial untuk membuka video player interaktif, langkah pembuatan, serta suka & komentar komunitas!</p>
                </div>
                <button onClick={() => setActiveTab('upload-tutorial')} className="flex items-center justify-center gap-2 bg-[#2D3B26] hover:bg-[#1E2819] text-white font-black text-xs px-4 py-3 rounded-xl transition-colors shadow-xs shrink-0">
                  <Plus size={14} /> <span>Upload Tutorial Baru</span>
                </button>
              </div>

              {/* KATEGORI SCROLLBAR */}
              <div className="relative w-full overflow-hidden">
                <div className="flex gap-2 overflow-x-auto pb-2 pt-1 scroll-smooth no-scrollbar snap-x">
                  {['Semua', 'Pot Estetik', 'Gelang', 'Anting', 'Dekorasi'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedTutorialCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap tracking-wide transition-all duration-150 snap-start border
                        ${selectedTutorialCategory === cat
                          ? 'bg-[#2D3B26] text-white border-[#2D3B26] shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* PERUBAHAN UTAMA TUTORIAL: grid-cols-2 untuk tampilan mobile agar seimbang 2 kolom */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 pt-2">
                {filteredTutorials.map((tuto) => (
                  <div
                    key={tuto.id}
                    onClick={() => { setActiveTutorial(tuto); setIsTutorialModalOpen(true); }}
                    className="bg-white border border-slate-100 rounded-xl md:rounded-2xl overflow-hidden shadow-xs hover:border-[#2D3B26] transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    {/* Tinggi thumbnail video disesuaikan (h-28 sm:h-48) */}
                    <div className="relative h-28 sm:h-48 bg-slate-100 overflow-hidden">
                      <img src={tuto.image} alt={tuto.title} className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="p-2 sm:p-3 bg-white/95 rounded-full text-[#2D3B26] shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200"><Play size={14} fill="#2D3B26" className="ml-0.5 sm:ml-1" /></div>
                      </div>
                      <span className="absolute top-2 right-2 text-[8px] sm:text-[10px] bg-[#2D3B26]/90 backdrop-blur-xs text-white font-black px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-white/10 shadow-2xs">{tuto.category}</span>
                    </div>

                    {/* Padding p-2.5 sm:p-5 agar teks tidak kebesaran di HP */}
                    <div className="p-2.5 sm:p-5 space-y-1 sm:space-y-2.5">
                      <h3 className="font-black text-xs sm:text-base text-slate-800 group-hover:text-emerald-800 transition-colors line-clamp-1">{tuto.title}</h3>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed hidden xs:block">{tuto.description}</p>

                      <div className="flex items-center justify-between pt-1.5 sm:pt-3 border-t border-slate-100 mt-1 sm:mt-2">
                        <div className="text-[9px] sm:text-[11px] font-black text-emerald-700 flex items-center gap-0.5">Mulai <span className="hidden sm:inline">Belajar</span> <ChevronRight size={10} /></div>
                        <div className="flex items-center gap-1.5 sm:gap-2.5 text-[8px] sm:text-[10px] text-slate-400 font-bold">
                          <span>❤️ {tuto.likes}</span>
                          <span>💬 {tuto.comments.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* [TAB] FORM UPLOAD TUTORIAL BARU */}
          {activeTab === 'upload-tutorial' && (
            <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <button onClick={() => setActiveTab('tutorial')} className="p-2 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors">
                  <ArrowLeft size={16} />
                </button>
                <div>
                  <h2 className="text-xl font-black text-slate-800">Bagikan Modul & Video Tutorial Baru</h2>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Unggah kreasi kreatif daur ulang buatanmu agar dipelajari oleh seluruh siswa.</p>
                </div>
              </div>

              <form onSubmit={handleUploadTutorialSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-600 block">Judul Tutorial Kreatif</label>
                  <input type="text" required placeholder="Contoh: Vas Bunga Nordik dari Pilinan Koran Bekas" value={tutorialForm.title} onChange={e => setTutorialForm({ ...tutorialForm, title: e.target.value })} className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-[#2D3B26]" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-600 block">Kategori Tutorial</label>
                  <select value={tutorialForm.category} onChange={e => setTutorialForm({ ...tutorialForm, category: e.target.value })} className="w-full border border-slate-200 bg-white px-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-[#2D3B26]">
                    <option>Pot Estetik</option>
                    <option>Gelang</option>
                    <option>Anting</option>
                    <option>Dekorasi</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-600 block">Deskripsi Singkat Proyek</label>
                  <textarea rows={2} required placeholder="Jelaskan secara ringkas hasil akhir produk..." value={tutorialForm.description} onChange={e => setTutorialForm({ ...tutorialForm, description: e.target.value })} className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-[#2D3B26] resize-none" />
                </div>

                <div className="space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs font-black text-slate-700 block">Panduan Langkah Kerja Tambahan (Step-by-Step)</span>
                  <div className="space-y-2">
                    <input type="text" placeholder="Langkah 1: Siapkan komponen bahan dasar..." value={tutorialForm.step1} onChange={e => setTutorialForm({ ...tutorialForm, step1: e.target.value })} className="w-full border border-slate-200 bg-white px-3 py-2 text-xs rounded-lg" />
                    <input type="text" placeholder="Langkah 2: Proses pemotongan kain/botol..." value={tutorialForm.step2} onChange={e => setTutorialForm({ ...tutorialForm, step2: e.target.value })} className="w-full border border-slate-200 bg-white px-3 py-2 text-xs rounded-lg" />
                    <input type="text" placeholder="Langkah 3: Pewarnaan pastel estetik..." value={tutorialForm.step3} onChange={e => setTutorialForm({ ...tutorialForm, step3: e.target.value })} className="w-full border border-slate-200 bg-white px-3 py-2 text-xs rounded-lg" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-600 block">File Rekaman Video Player / Thumbnail</label>
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 p-4 text-center">
                    <Play size={20} className="text-slate-400" />
                    <p className="text-xs font-bold text-slate-600 mt-2">{tutorialForm.imageFileName ? `Terpilih: ${tutorialForm.imageFileName}` : "Klik untuk Pilih File Video Simulasi (MP4/Thumbnail)"}</p>
                    <input type="file" accept="video/*,image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) setTutorialForm({ ...tutorialForm, imageFileName: e.target.files[0].name }); }} />
                  </label>
                </div>

                <button type="submit" className="w-full py-3.5 bg-[#2D3B26] hover:bg-[#1E2819] text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-md transition-colors">Publikasikan Modul Tutorial ✨</button>
              </form>
            </div>
          )}

          {/* [TAB] BUKA LAPAK PRODUK */}
          {activeTab === 'upload' && (
            <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-black text-slate-800">Buka Toko Produk Kreatif Online</h2>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Publikasikan produk kerajinan daur ulang terbaikmu langsung ke ekosistem internal marketplace.</p>
              </div>
              <form onSubmit={handleUploadProduct} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-600 block">Nama Produk Kreatif</label>
                  <input type="text" required placeholder="Contoh: Tas Laptop Rajut Serat Plastik" value={uploadForm.name} onChange={e => setUploadForm({ ...uploadForm, name: e.target.value })} className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-[#2D3B26]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-600 block">Harga Jual Jualan (Rp)</label>
                    <input type="number" required placeholder="35000" value={uploadForm.price} onChange={e => setUploadForm({ ...uploadForm, price: e.target.value })} className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-[#2D3B26]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-600 block">Kategori Utama</label>
                    <select value={uploadForm.category} onChange={e => setUploadForm({ ...uploadForm, category: e.target.value })} className="w-full border border-slate-200 bg-white px-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-[#2D3B26]">
                      <option>Dekorasi</option>
                      <option>Fashion</option>
                      <option>Organik</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-600 block">Eco-Impact (Deskripsi Dampak Lingkungan)</label>
                  <input type="text" placeholder="Contoh: Menyelamatkan 15 botol plastik PET kosmetik" value={uploadForm.impact} onChange={e => setUploadForm({ ...uploadForm, impact: e.target.value })} className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-[#2D3B26]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-600 block">Foto Gambar Produk</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 p-4 text-center">
                    <Upload size={22} className="text-slate-400" />
                    <p className="text-xs font-bold text-slate-600 mt-2">{uploadForm.imageFileName ? `Terpilih: ${uploadForm.imageFileName}` : "Klik untuk Pilih Gambar Produk"}</p>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) setUploadForm({ ...uploadForm, imageFileName: e.target.files[0].name }); }} />
                  </label>
                </div>
                <button type="submit" className="w-full py-3.5 bg-[#2D3B26] hover:bg-[#1E2819] text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-md mt-2">Terbitkan Produk Kreatif Online ✨</button>
              </form>
            </div>
          )}

          {/* [TAB] KERANJANG BELANJA */}
          {activeTab === 'cart' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-xl font-black text-slate-800 border-b border-slate-100 pb-2">Shopping Cart Toko Anda</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
                <div className="lg:col-span-2 space-y-3">
                  {cart.map(item => (
                    <div key={item.product.id} className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                      <div className="flex items-center gap-4">
                        <img src={item.product.image} alt="product" className="w-14 h-14 rounded-xl object-cover border" />
                        <div>
                          <h4 className="font-black text-sm text-slate-800">{item.product.name}</h4>
                          <p className="text-xs text-slate-400 font-bold mt-0.5">{item.quantity} Barang</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                        <span className="text-xs font-black text-slate-700 bg-slate-50 px-3 py-1 rounded-lg border">Rp{(item.product.price * item.quantity).toLocaleString('id-ID')}</span>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-rose-500 hover:bg-rose-50 p-2 rounded-xl text-xs transition-colors">Hapus</button>
                      </div>
                    </div>
                  ))}
                  {cart.length === 0 && <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center text-xs font-bold text-slate-400">Keranjang belanja kosong. Mampir ke menu workspace marketplace yuk!</div>}
                </div>

                <div className="bg-[#2D3B26] rounded-2xl md:rounded-3xl p-6 text-white space-y-4 shadow-lg w-full">
                  <h4 className="font-black text-sm border-b border-white/10 pb-2">Ringkasan Pembayaran</h4>
                  <div className="flex justify-between text-xs text-white/70"><span>Ongkos Kirim Internal</span><span>Rp25.500</span></div>
                  <div className="flex justify-between text-sm font-black pt-2 border-t border-white/10"><span>Total Tagihan</span><span>Rp{(totalCartPrice + 25500).toLocaleString('id-ID')}</span></div>
                  <button onClick={handleCheckout} className="w-full bg-white hover:bg-slate-50 text-[#2D3B26] font-black py-3.5 rounded-xl text-xs transition-colors shadow-md mt-2">Lanjut Bayar Via Gateway</button>
                </div>
              </div>
            </div>
          )}

          {/* [TAB] RIWAYAT TRANSAKSI */}
          {activeTab === 'history' && (
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-xl font-black text-slate-800 border-b border-slate-100 pb-2">Riwayat Transaksi Akun</h2>
              {transactions.map((t, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                  <div className="flex items-center gap-4">
                    <img src={t.image} alt="product" className="w-12 h-12 rounded-xl object-cover border" />
                    <div>
                      <h4 className="font-black text-sm text-slate-800">{t.productName}</h4>
                      <p className="text-[11px] text-slate-400 font-bold mt-0.5">{t.id} • Tanggal: {t.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                    <span className="text-xs font-black text-slate-700">Rp{t.price.toLocaleString('id-ID')}</span>
                    <span className="text-[10px] font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* [TAB] PROFILE */}
          {activeTab === 'profile' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm relative">

                {/* Banner Profil */}
                <div className="h-36 md:h-44 w-full relative bg-gradient-to-r from-emerald-800 to-slate-800">
                  <img src={userProfile.banner} alt="Banner" className="w-full h-full object-cover opacity-45 mix-blend-overlay" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20 text-white text-[10px] font-black tracking-wider uppercase">
                    ID: ID-202688
                  </div>
                </div>

                {/* Konten Utama Profil */}
                <div className="px-6 pb-6 relative flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-14 sm:-mt-16">
                  {/* Foto Avatar Bulat Premium */}
                  <img src={userProfile.avatar} alt="Profile" className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover ring-4 ring-white shadow-md bg-white shrink-0 z-10" />

                  {/* Teks Identitas */}
                  <div className="text-center sm:text-left space-y-1.5 pb-2 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="text-xl font-black text-slate-800 tracking-tight">{userProfile.name}</h3>
                      <span className="mx-auto sm:mx-0 flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[9px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wide shrink-0">
                        <ShieldCheck size={11} /> Verified Innovator
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-bold flex flex-wrap justify-center sm:justify-start items-center gap-x-3 gap-y-1">
                      <span className="text-emerald-700 font-black">{userProfile.role}</span>
                      <span className="hidden sm:inline text-slate-200">•</span>
                      <span className="flex items-center gap-1 text-slate-500"><MapPin size={12} /> Malang, Indonesia</span>
                    </p>
                  </div>
                </div>

                {/* Grid Detail Kartu Informasi Identitas */}
                <div className="p-6 border-t border-slate-50 bg-slate-50/50 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3.5 shadow-2xs">
                    <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl"><School size={18} /></div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-black block uppercase tracking-wider">Asal Sekolah</span>
                      <span className="text-xs font-black text-slate-700">{userProfile.school}</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3.5 shadow-2xs">
                    <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl"><GraduationCap size={18} /></div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-black block uppercase tracking-wider">Kelas / Jurusan</span>
                      <span className="text-xs font-black text-slate-700">{userProfile.class}</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3.5 shadow-2xs">
                    <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl"><Star size={18} /></div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-black block uppercase tracking-wider">Status Portofolio</span>
                      <span className="text-xs font-black text-emerald-800">Aktif & Terkurasi</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Box Info Tambahan Estetik */}
              <div className="bg-gradient-to-r from-[#2D3B26] to-[#1F291B] text-white p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-black tracking-tight">Butuh penyesuaian detail biodata rapor projek?</h4>
                  <p className="text-[11px] text-[#BAC7AC] leading-relaxed">Seluruh sinkronisasi data profil ditarik otomatis dari server pusat DAPODIK internal sekolah.</p>
                </div>
                <button onClick={() => alert('Fitur edit biodata resmi dinonaktifkan sementara.')} className="bg-white/10 hover:bg-white/15 text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-all whitespace-nowrap">
                  Ajukan Perubahan
                </button>
              </div>
            </div>
          )}

          {/* [TAB] NOTIFIKASI */}
          {activeTab === 'notifications' && (
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="text-xl font-black text-slate-800 border-b border-slate-100 pb-2">Pemberitahuan Sistem</h2>
              <div className="bg-white p-4 rounded-xl border border-slate-100 flex gap-4 shadow-2xs items-start">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl shrink-0 border border-emerald-100"><CheckCircle size={18} /></div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-800">Setoran Diterima! 🎉</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Kreasi kerajinan handuk semen milikmu sudah berhasil verifikasi masuk ke sistem galeri utama.</p>
                </div>
              </div>
            </div>
          )}

          {/* [TAB] PUSAT BANTUAN */}
          {activeTab === 'help' && (
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="text-xl font-black text-slate-800 border-b border-slate-100 pb-2">Pusat Bantuan & FAQ</h2>
              <div className="space-y-2">
                {['Cara Pemasaran Produk Kerajinan', 'Standar Kebersihan Bahan Baku Daur Ulang', 'Ketentuan Bagi Hasil Lapak Komersial'].map((q, i) => (
                  <div key={i} className="p-4 bg-white border border-slate-100 rounded-xl flex justify-between items-center text-xs font-black text-slate-700 cursor-pointer hover:border-[#2D3B26] hover:bg-slate-50/50 transition-all shadow-2xs group">
                    <span className="group-hover:text-slate-900 transition-colors">{q}</span>
                    <ArrowUpRight size={15} className="text-slate-400 group-hover:text-[#2D3B26] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* =========================================================================
          POP-UP MODAL OVERLAY (LANGSUNG MUNCUL DI TENGAH LAYAR TANPA SCROLL)
         ========================================================================= */}

      {/* 1. POP-UP DETAIL PRODUK MARKETPLACE */}
      {isProductModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col scale-in">
            <div className="relative h-56 bg-slate-100 shrink-0">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X size={16} />
              </button>
              <span className="absolute bottom-4 left-4 text-xs bg-white/95 backdrop-blur-xs font-black text-[#2D3B26] px-3 py-1 rounded-xl shadow-md border border-slate-100">
                {selectedProduct.material}
              </span>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1 no-scrollbar">
              <div>
                <span className="text-[10px] text-emerald-700 font-black tracking-widest uppercase block">{selectedProduct.category}</span>
                <h3 className="text-lg md:text-xl font-black text-slate-800 leading-snug mt-0.5">{selectedProduct.name}</h3>
                <p className="text-xs text-slate-400 font-bold mt-1">Kreator: {selectedProduct.seller}</p>
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-100 text-[#2D3B26] text-xs font-semibold leading-relaxed">
                <span className="font-black block mb-1 text-emerald-800">🌱 Eco Impact:</span>
                {selectedProduct.impact}
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 shrink-0 flex justify-between items-center gap-4">
              <div>
                <span className="text-[9px] text-slate-400 font-black block uppercase tracking-wider">Total Harga</span>
                <span className="text-lg font-black text-emerald-700">Rp{selectedProduct.price.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { addToCart(selectedProduct); setIsProductModalOpen(false); }}
                  className="bg-[#2D3B26] hover:bg-[#1E2819] text-white font-black text-xs px-5 py-3 rounded-xl transition-colors shadow-xs"
                >
                  Tambah Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. POP-UP DETAIL VIDEO & DISKUSI TUTORIAL CENTER */}
      {isTutorialModalOpen && activeTutorial && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col lg:grid lg:grid-cols-3 scale-in">

            {/* KOLOM KIRI & TENGAH (PROYEKSI VIDEO + STEP) */}
            <div className="lg:col-span-2 overflow-y-auto p-5 md:p-6 space-y-5 border-r border-slate-100 max-h-[50vh] lg:max-h-[90vh] no-scrollbar">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] bg-emerald-50 text-emerald-800 font-black px-2 py-0.5 rounded border border-emerald-100 uppercase">{activeTutorial.category}</span>
                  <h2 className="text-base md:text-lg font-black text-slate-800 mt-1 leading-snug">{activeTutorial.title}</h2>
                </div>
                <button
                  onClick={() => setIsTutorialModalOpen(false)}
                  className="p-2 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-xl lg:hidden transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* VIDEO LAYER SIMULASI */}
              <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-md group shrink-0">
                <img src={activeTutorial.image} alt="Video cover" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/30">
                  <button className="p-4 bg-[#A0E670] hover:scale-105 text-[#2D3B26] rounded-full shadow-lg transition-transform">
                    <Play size={22} fill="#2D3B26" className="ml-1" />
                  </button>
                  <span className="text-white text-xs font-black tracking-wide drop-shadow-sm">Putar Simulasi Video Tutorial (04:15)</span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[10px] text-white/80 font-bold bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg">
                  <span>Status: Streaming Mode</span>
                </div>
              </div>

              {/* LANGKAH KERJA */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Award size={15} className="text-emerald-700" />
                  <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">Langkah Pembuatan Modul</h3>
                </div>
                <div className="space-y-3.5">
                  {activeTutorial.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full bg-[#EAF2E6] text-[#2D3B26] font-black text-[11px] flex items-center justify-center border border-[#2D3B26]/10 shrink-0 mt-0.5">{idx + 1}</div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* KOLOM KANAN (LIKE + COMMENTS KOMUNITAS) */}
            <div className="bg-slate-50/70 p-5 md:p-6 flex flex-col justify-between max-h-[40vh] lg:max-h-[90vh] border-t lg:border-t-0 border-slate-100">
              <div className="space-y-4 flex-1 flex flex-col min-h-0">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3 shrink-0">
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleLikeTutorial(activeTutorial.id)} className="flex items-center gap-1.5 text-xs font-black text-slate-700 hover:text-rose-600 transition-colors">
                      <Heart size={16} className={activeTutorial.isLiked ? "fill-rose-500 text-rose-500" : ""} />
                      <span>{activeTutorial.likes} Suka</span>
                    </button>
                    <span className="text-xs font-bold text-slate-400">💬 {activeTutorial.comments.length} Diskusi</span>
                  </div>
                  <button
                    onClick={() => setIsTutorialModalOpen(false)}
                    className="p-1.5 bg-slate-200/60 hover:bg-slate-200 text-slate-600 rounded-lg hidden lg:block"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* DAFTAR COMMENTS */}
                <div className="space-y-3 overflow-y-auto flex-1 pr-1 no-scrollbar min-h-0">
                  {activeTutorial.comments.length > 0 ? (
                    activeTutorial.comments.map((comm) => (
                      <div key={comm.id} className="flex gap-2.5 items-start text-xs border-b border-slate-200/40 pb-2 last:border-0">
                        <img src={comm.avatar} alt="Avatar" className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200" />
                        <div className="space-y-0.5 flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-black text-slate-800 text-[11px]">{comm.user}</span>
                            <span className="text-[9px] text-slate-400 font-medium">{comm.time}</span>
                          </div>
                          <p className="text-slate-600 font-medium leading-relaxed text-[11px]">{comm.text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-[11px] text-slate-400 font-bold leading-relaxed">Belum ada diskusi di sini. Mulai obrolan yuk!</div>
                  )}
                </div>
              </div>

              {/* INPUT COMMENT FORM */}
              <form onSubmit={handleAddComment} className="flex gap-2 pt-3 border-t border-slate-200 shrink-0 mt-2">
                <input
                  type="text"
                  placeholder="Tulis opini kamu..."
                  value={newCommentText}
                  onChange={e => setNewCommentText(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#2D3B26] text-slate-700 shadow-2xs"
                />
                <button type="submit" className="p-2 bg-[#2D3B26] hover:bg-[#1E2819] text-white rounded-xl transition-colors shrink-0"><Send size={14} /></button>
              </form>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}