'use client';

import React, { useState, useRef } from 'react';
import {
  Leaf, Bell, HelpCircle, Search, ShoppingCart, PlusCircle,
  History, Settings, Grid, ChevronRight, ArrowUpRight,
  CheckCircle, BookOpen, LogOut, Package, User, Star, Upload, Plus,
  Heart, MessageCircle, Send, X, ArrowLeft, Play, Bookmark
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
  points: number;
  likes: number;
  isLiked?: boolean;
  steps: string[];
  comments: Comment[];
}

export default function RecrafterWebsite() {
  // --- STATE NAVIGASI & LAYOUT ---
  const [activeTab, setActiveTab] = useState<'marketplace' | 'tutorial' | 'upload' | 'history' | 'profile' | 'notifications' | 'help' | 'cart' | 'detail' | 'tutorial-detail'>('tutorial');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedTutorialCategory, setSelectedTutorialCategory] = useState<string>('Semua');

  // --- STATE TUTORIAL AKTIF & KOMENTAR ---
  const [activeTutorial, setActiveTutorial] = useState<TutorialItem | null>(null);
  const [newCommentText, setNewCommentText] = useState<string>('');

  // --- SWIPE / DRAG STATE UNTUK BROSUR BANNER ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const banners = [
    {
      tag: "Campaign Mei 2026",
      title: "Ubah Limbah Sekolah Jadi Cuan Melimpah!",
      desc: "Kumpulkan produk daur ulang kreatifmu sekarang. Dapatkan apresiasi poin pendanaan beasiswa, serta sertifikat resmi dari kurator lingkungan sekolah.",
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500"
    },
    {
      tag: "Special Weekend",
      title: "Rayakan Kreasi Hijau Aslimu 🍀",
      desc: "Kado Tambahan +50 Pts Menanti Tiap Setoran Produk Daur Ulang Pertama Angkatanmu di Drop Point Utama!",
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
  const [ecoPoints, setEcoPoints] = useState<number>(350);
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
      points: 15,
      likes: 142,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500',
      steps: [
        "Siapkan handuk bekas yang sudah tidak dipakai dan adonan semen cair encer.",
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
      points: 20,
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
      points: 20,
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
      points: 15,
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
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
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
    setProducts([createdProduct, ...products]); setEcoPoints(prev => prev + 50);
    alert('Sukses! Produk Anda tayang di platform web! +50 EcoPoints 🎉');
    setUploadForm({ name: '', price: '', category: 'Dekorasi', material: 'Botol Plastik Bekas', impact: '', imageFileName: '' });
    setActiveTab('marketplace');
  };

  const handleCreateNewTutorial = () => {
    const title = prompt("Masukkan Judul Tutorial Baru:"); if (!title) return;
    const categoryInput = prompt("Masukkan Kategori:", "Gelang");

    const newTuto: TutorialItem = {
      id: `tuto-${Date.now()}`, title: title, description: "Modul panduan langkah demi langkah kreasi daur ulang baru.", category: categoryInput || 'Gelang', points: 25, likes: 0,
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500",
      steps: ["Langkah 1: Siapkan bahan baku.", "Langkah 2: Potong pola.", "Langkah 3: Rangkai kembali."], comments: []
    };
    setTutorials([newTuto, ...tutorials]);
    alert("Sukses mengunggah panduan tutorial baru! 📚✨");
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

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D3B26] flex font-sans select-none">

      {/* 1. SIDEBAR NAVIGASI */}
      <aside className="w-64 bg-[#2D3B26] text-white flex flex-col justify-between p-6 shadow-xl sticky top-0 h-screen z-40">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="p-2 bg-white/10 rounded-xl"><Leaf size={24} className="text-[#A0E670]" /></div>
            <div>
              <h1 className="text-xl font-black tracking-tight">Recrafter</h1>
              <span className="text-[10px] text-[#BAC7AC] font-medium tracking-wider uppercase">Web Workspace</span>
            </div>
          </div>
          <nav className="space-y-1">
            <span className="text-[10px] text-[#BAC7AC]/50 font-black px-3 uppercase tracking-widest block mb-2">Menu Utama</span>
            <button onClick={() => setActiveTab('marketplace')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'marketplace' || activeTab === 'detail' ? 'bg-[#A0E670] text-[#2D3B26]' : 'hover:bg-white/5 text-[#BAC7AC]'}`}>
              <Grid size={16} /> <span>Eco Marketplace</span>
            </button>
            <button onClick={() => setActiveTab('tutorial')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'tutorial' || activeTab === 'tutorial-detail' ? 'bg-[#A0E670] text-[#2D3B26]' : 'hover:bg-white/5 text-[#BAC7AC]'}`}>
              <BookOpen size={16} /> <span>Tutorial Center</span>
            </button>
            <button onClick={() => setActiveTab('upload')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'upload' ? 'bg-[#A0E670] text-[#2D3B26]' : 'hover:bg-white/5 text-[#BAC7AC]'}`}>
              <PlusCircle size={16} /> <span>Buka Lapak Produk</span>
            </button>
            <button onClick={() => setActiveTab('history')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'history' ? 'bg-[#A0E670] text-[#2D3B26]' : 'hover:bg-white/5 text-[#BAC7AC]'}`}>
              <History size={16} /> <span>Riwayat Transaksi</span>
            </button>
            <span className="text-[10px] text-[#BAC7AC]/50 font-black px-3 uppercase tracking-widest block pt-4 mb-2">Dukungan</span>
            <button onClick={() => setActiveTab('help')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'help' ? 'bg-[#A0E670] text-[#2D3B26]' : 'hover:bg-white/5 text-[#BAC7AC]'}`}>
              <HelpCircle size={16} /> <span>Pusat Bantuan</span>
            </button>
            <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'profile' ? 'bg-[#A0E670] text-[#2D3B26]' : 'hover:bg-white/5 text-[#BAC7AC]'}`}>
              <Settings size={16} /> <span>Pengaturan Akun</span>
            </button>
          </nav>
        </div>
        <div className="border-t border-white/10 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={userProfile.avatar} alt="User" className="w-9 h-9 rounded-full object-cover ring-2 ring-white/20" />
            <div className="max-w-[120px]">
              <h4 className="text-xs font-black truncate">{userProfile.name}</h4>
              <p className="text-[9px] text-[#BAC7AC] truncate">{userProfile.class}</p>
            </div>
          </div>
          <button onClick={() => alert('Log Out Berhasil!')} className="p-1.5 hover:bg-red-500/20 text-red-400 rounded-lg"><LogOut size={16} /></button>
        </div>
      </aside>

      {/* REKANAN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 2. TOPBAR UTAMA */}
        <header className="bg-white border-b border-gray-100 h-16 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="w-96 relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input type="text" placeholder="Cari produk kreatif, nama siswa, atau bahan baku..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#2D3B26]" />
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#EAF2E6] px-4 py-2 rounded-xl border border-[#2D3B26]/10"><span className="text-xs font-black text-[#2D3B26]">🌱 {ecoPoints} EcoPoints</span></div>
            <button onClick={() => setActiveTab('notifications')} className={`p-2.5 rounded-xl border relative ${activeTab === 'notifications' ? 'bg-[#2D3B26] text-white border-[#2D3B26]' : 'bg-white text-slate-600 border-gray-200 hover:bg-slate-50'}`}><Bell size={16} /><span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span></button>
            <button onClick={() => setActiveTab('cart')} className={`px-4 py-2 rounded-xl border flex items-center gap-2 text-xs font-black ${activeTab === 'cart' ? 'bg-[#2D3B26] text-white border-[#2D3B26]' : 'bg-white text-slate-700 border-gray-200 hover:bg-slate-50'}`}><ShoppingCart size={16} /><span>Keranjang ({totalCartItems})</span></button>
          </div>
        </header>

        {/* 3. KONTEN UTAMA DARI TAB AKTIF */}
        <main className="flex-1 p-8 overflow-y-auto">

          {/* [TAB] ECO MARKETPLACE */}
          {(activeTab === 'marketplace' || activeTab === 'detail') && (
            <div className="space-y-8">
              {/* SLIDER BANNER BROSUR */}
              <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className="bg-gradient-to-r from-[#DCE7D3] to-[#B9CBB0] rounded-3xl p-8 flex justify-between items-center relative overflow-hidden min-h-[190px] cursor-grab active:cursor-grabbing border border-[#2D3B26]/5">
                <div className="space-y-2 max-w-lg z-10 pointer-events-none">
                  <span className="text-[10px] bg-[#2D3B26] text-white font-black px-3 py-1 rounded-full uppercase tracking-wider">{banners[currentSlide].tag}</span>
                  <h2 className="text-3xl font-black text-[#1A2E0F] leading-tight">{banners[currentSlide].title}</h2>
                  <p className="text-xs font-medium text-[#2D3B26]/80">{banners[currentSlide].desc}</p>
                </div>
                <img src={banners[currentSlide].img} alt="Eco banner" className="absolute right-0 h-full w-[35%] object-cover mix-blend-multiply opacity-90 hidden md:block pointer-events-none" />
                <div className="absolute bottom-3 left-8 flex gap-1.5 z-20">
                  {banners.map((_, index) => (<div key={index} className={`h-2 rounded-full transition-all ${currentSlide === index ? 'w-5 bg-[#2D3B26]' : 'w-2 bg-[#2D3B26]/30'}`} />))}
                </div>
              </div>

              {/* DAFTAR KATALOG */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black uppercase text-gray-400 tracking-wider">Katalog Jualan Siswa</h3>
                    <div className="flex gap-2">
                      {['Semua', 'Dekorasi', 'Fashion', 'Organik'].map((cat) => (
                        <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${selectedCategory === cat ? 'bg-[#2D3B26] text-white' : 'bg-white border border-gray-200 text-gray-500'}`}>{cat}</button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredProducts.map(product => (
                      <div key={product.id} onClick={() => { setSelectedProduct(product); setActiveTab('detail'); }} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-[#2D3B26] transition-all cursor-pointer flex flex-col justify-between group">
                        <div className="relative overflow-hidden h-40 bg-slate-100">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <span className="absolute top-3 left-3 text-[9px] bg-white/90 font-black text-[#2D3B26] px-2 py-0.5 rounded-md">{product.material}</span>
                        </div>
                        <div className="p-4 space-y-2">
                          <span className="text-[9px] text-[#4A7055] font-black tracking-widest uppercase">{product.category}</span>
                          <h4 className="font-black text-sm text-[#2D3B26] line-clamp-1">{product.name}</h4>
                          <p className="text-[11px] text-gray-400 font-medium">Oleh: {product.seller}</p>
                          <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                            <span className="text-sm font-black text-emerald-700">Rp{product.price.toLocaleString('id-ID')}</span>
                            <span className="text-xs text-gray-400">❤️ {product.likes} Likes</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* PREVIEW PANEL KANAN */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-2xs h-fit sticky top-24">
                  {activeTab === 'detail' && selectedProduct ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center"><span className="text-xs font-black uppercase text-gray-400">Detail Preview</span><button onClick={() => setActiveTab('marketplace')} className="text-xs text-blue-600 font-bold">Tutup ×</button></div>
                      <img src={selectedProduct.image} alt="Detail" className="w-full h-44 object-cover rounded-xl" />
                      <div><h3 className="text-base font-black">{selectedProduct.name}</h3><p className="text-xs text-gray-400 font-semibold mt-0.5">Kreator: {selectedProduct.seller}</p></div>
                      <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-800 text-xs font-medium"><span className="font-bold block mb-0.5">🌱 Eco Impact:</span>{selectedProduct.impact}</div>
                      <div className="pt-2 border-t flex justify-between items-center">
                        <div><span className="text-[10px] text-gray-400 font-bold block">Total Harga</span><span className="text-base font-black text-emerald-700">Rp{selectedProduct.price.toLocaleString('id-ID')}</span></div>
                        <button onClick={() => addToCart(selectedProduct)} className="bg-[#2D3B26] text-white font-black text-xs px-4 py-2.5 rounded-xl">Tambah Keranjang</button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-400 space-y-2"><div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-300"><Package size={24} /></div><p className="text-xs font-bold">Pilih salah satu produk di kiri untuk melihat visual detail & dampak ekologi.</p></div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* [TAB] TUTORIAL CENTER LIST */}
          {activeTab === 'tutorial' && (
            <div className="max-w-5xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-black">Video & Modul Daur Ulang</h2>
                  <p className="text-xs text-gray-400">Klik salah satu tutorial untuk membuka video player interaktif, langkah pembuatan, serta suka & komentar komunitas!</p>
                </div>
                <button onClick={handleCreateNewTutorial} className="flex items-center justify-center gap-2 bg-[#2D3B26] text-white font-black text-xs px-4 py-2.5 rounded-xl"><Plus size={14} /><span>Upload Tutorial Baru</span></button>
              </div>

              {/* =========================================================================
                  MODIFIKASI BARU: KATEGORI HORIZONTAL SCROLLBAR-FREE ALA NETFLIX GENRE
                  ========================================================================= */}
              <div className="relative w-full">
                <div className="flex gap-3 overflow-x-auto pb-3 pt-1 scroll-smooth no-scrollbar snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]">
                  {['Semua', 'Pot Estetik', 'Gelang', 'Anting', 'Dekorasi', 'Kerajinan Kayu', 'Eco Fashion', 'Gantungan Kunci', 'Kardus Box'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedTutorialCategory(cat)}
                      className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap tracking-wide transition-all duration-200 snap-start active:scale-95
                        ${selectedTutorialCategory === cat
                          ? 'bg-[#2D3B26] text-white shadow-sm'
                          : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                {/* Gradasi Hint Kanan */}
                <div className="absolute right-0 top-0 bottom-3 w-12 bg-gradient-to-l from-[#FDFBF7] to-transparent pointer-events-none" />
              </div>

              {/* GRID DAFTAR TUTORIAL WORKSPACE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {filteredTutorials.map((tuto) => (
                  <div
                    key={tuto.id}
                    onClick={() => { setActiveTutorial(tuto); setActiveTab('tutorial-detail'); }}
                    className="bg-white border rounded-2xl overflow-hidden shadow-2xs hover:border-[#2D3B26] transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                      <img src={tuto.image} alt={tuto.title} className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="p-3 bg-white/90 rounded-full text-[#2D3B26] shadow-md"><Play size={20} fill="#2D3B26" /></div>
                      </div>
                      <span className="absolute top-3 right-3 text-[10px] bg-[#2D3B26] text-white font-black px-2 py-0.5 rounded-md">{tuto.category}</span>
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="font-black text-sm text-[#2D3B26] group-hover:text-emerald-800 transition-colors">{tuto.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{tuto.description}</p>

                      {/* Informasi Like & Reward Poin */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                        <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">Buka Video & Modul <ChevronRight size={12} /></div>
                        <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold">
                          <span>❤️ {tuto.likes} Likes</span>
                          <span>💬 {tuto.comments.length} Komen</span>
                          <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">+{tuto.points} Pts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* [TAB] DETAIL PLAYER TUTORIAL INTERAKTIF ALA TIKTOK */}
          {activeTab === 'tutorial-detail' && activeTutorial && (
            <div className="max-w-5xl bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row h-[calc(100vh-140px)] animate-fadeIn">

              {/* SISI KIRI: SIMULASI PEMUTAR VIDEO (FORMAT VERTIKAL TIKTOK) */}
              <div className="w-full md:w-[420px] bg-black relative flex flex-col justify-center items-center group shrink-0">
                <img src={activeTutorial.image} alt="Video cover" className="w-full h-full object-cover opacity-80" />

                {/* Tombol Back Kembali */}
                <button onClick={() => setActiveTab('tutorial')} className="absolute top-4 left-4 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 backdrop-blur-xs transition-colors z-20">
                  <ArrowLeft size={18} />
                </button>

                {/* Overlay Putar Video Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40 group-hover:scale-110 transition-transform shadow-lg">
                    <Play size={28} fill="white" className="ml-1" />
                  </div>
                  <span className="text-white text-[10px] font-black mt-3 tracking-wider bg-black/50 px-3 py-1 rounded-full backdrop-blur-xs">SIMULASI VIDEO PLAYER</span>
                </div>

                {/* Deskripsi Teks Kiri Bawah */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white space-y-1.5 pointer-events-none">
                  <span className="text-[9px] bg-[#A0E670] text-[#2D3B26] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">{activeTutorial.category}</span>
                  <h3 className="font-black text-base leading-snug">{activeTutorial.title}</h3>
                  <p className="text-xs text-gray-300 font-medium line-clamp-2">{activeTutorial.description}</p>
                </div>

                {/* ACTION BAR LAYOUT FLOTASI DI KANAN VIDEO (ALA REELS/TIKTOK INTERACTION) */}
                <div className="absolute bottom-20 right-4 flex flex-col gap-4 items-center z-10">
                  {/* Tombol Like Hati */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleLikeTutorial(activeTutorial.id)}
                      className={`p-3 rounded-full shadow-lg border transition-transform active:scale-95 ${activeTutorial.isLiked ? 'bg-rose-500 text-white border-rose-500' : 'bg-black/40 text-white border-white/20 hover:bg-black/60'}`}
                    >
                      <Heart size={20} fill={activeTutorial.isLiked ? "white" : "none"} />
                    </button>
                    <span className="text-[10px] text-white font-black mt-1 drop-shadow-md">{activeTutorial.likes}</span>
                  </div>

                  {/* Indikator Jumlah Komen */}
                  <div className="flex flex-col items-center">
                    <div className="p-3 rounded-full bg-black/40 text-white border border-white/20 shadow-lg">
                      <MessageCircle size={20} />
                    </div>
                    <span className="text-[10px] text-white font-black mt-1 drop-shadow-md">{activeTutorial.comments.length}</span>
                  </div>

                  {/* Poin Tag Badge */}
                  <div className="flex flex-col items-center">
                    <div className="p-3 rounded-full bg-emerald-600 text-white border border-emerald-400 shadow-lg text-[10px] font-black">
                      +{activeTutorial.points}
                    </div>
                    <span className="text-[9px] text-emerald-300 font-bold mt-1 drop-shadow-md">Pts</span>
                  </div>
                </div>
              </div>

              {/* SISI KANAN: DETAIL MODUL LANGKAH & AREA FEED KOMENTAR REALTIME */}
              <div className="flex-1 flex flex-col h-full bg-[#FDFBF7] min-w-0">

                {/* Bagian Atas: Langkah Kerja Pembuatan */}
                <div className="p-6 border-b overflow-y-auto max-h-[50%] space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-black text-emerald-700 tracking-wider">Buku Panduan Digital</span>
                      <h3 className="text-base font-black text-[#2D3B26]">Langkah Pembuatan (Step-by-Step)</h3>
                    </div>
                    <button
                      onClick={() => { setEcoPoints(p => p + activeTutorial.points); alert(`Sukses! Akun Anda mendapatkan tambahan +${activeTutorial.points} Pts! 🌱`); }}
                      className="bg-[#2D3B26] hover:bg-emerald-950 text-white font-black text-xs px-4 py-2 rounded-xl shrink-0 transition-colors shadow-xs"
                    >
                      Selesai Praktek & Klaim
                    </button>
                  </div>

                  <div className="space-y-3">
                    {activeTutorial.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                        <div className="w-5 h-5 rounded-full bg-[#EAF2E6] text-[#2D3B26] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-xs font-semibold text-[#2D3B26]/90 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bagian Bawah: Feed Komentar Komunitas Real-time */}
                <div className="flex-1 p-6 flex flex-col bg-slate-50 min-h-0">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Diskusi Komunitas ({activeTutorial.comments.length})</h4>

                  {/* List Komentar */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4 no-scrollbar">
                    {activeTutorial.comments.length > 0 ? (
                      activeTutorial.comments.map(c => (
                        <div key={c.id} className="flex gap-2.5 items-start bg-white p-3 rounded-xl border border-slate-100 shadow-2xs text-xs animate-fadeIn">
                          <img src={c.avatar} alt="avatar" className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5" />
                          <div className="space-y-0.5 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-black text-[#2D3B26]">@{c.user}</span>
                              <span className="text-[10px] text-gray-400">{c.time}</span>
                            </div>
                            <p className="text-[#2D3B26]/80 font-medium leading-normal">{c.text}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-400 text-xs font-bold">Belum ada komentar. Yuk, berikan pertanyaan atau apresiasi pertamamu! 💬</div>
                    )}
                  </div>

                  {/* Form Input Kirim Komentar */}
                  <form onSubmit={handleAddComment} className="flex gap-2 bg-white p-2 border rounded-xl shadow-xs">
                    <input
                      type="text"
                      placeholder="Tulis tanggapan atau pertanyaan kreatifmu..."
                      value={newCommentText}
                      onChange={e => setNewCommentText(e.target.value)}
                      className="flex-1 bg-transparent px-3 text-xs focus:outline-none text-[#2D3B26]"
                    />
                    <button type="submit" className="p-2 bg-[#2D3B26] hover:bg-[#1F261B] text-white rounded-lg transition-colors">
                      <Send size={14} />
                    </button>
                  </form>
                </div>

              </div>
            </div>
          )}

          {/* [TAB] BUKA LAPAK PRODUK */}
          {activeTab === 'upload' && (
            <div className="max-w-2xl bg-white border border-gray-100 rounded-3xl p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-black">Buka Toko Produk Kreatif Online</h2>
                <p className="text-xs text-gray-400 mt-0.5">Publikasikan produk kerajinan daur ulang terbaikmu langsung ke ekosistem internal marketplace.</p>
              </div>
              <form onSubmit={handleUploadProduct} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-600">Nama Produk Kreatif</label>
                  <input type="text" required placeholder="Contoh: Tas Laptop Rajut Serat Plastik" value={uploadForm.name} onChange={e => setUploadForm({ ...uploadForm, name: e.target.value })} className="w-full border px-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-[#2D3B26]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-600">Harga Jual Jualan (Rp)</label>
                    <input type="number" required placeholder="35000" value={uploadForm.price} onChange={e => setUploadForm({ ...uploadForm, price: e.target.value })} className="w-full border px-4 py-2.5 text-xs rounded-xl focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-600">Kategori Utama</label>
                    <select value={uploadForm.category} onChange={e => setUploadForm({ ...uploadForm, category: e.target.value })} className="w-full border px-4 py-2.5 text-xs rounded-xl bg-white focus:outline-none">
                      <option>Dekorasi</option>
                      <option>Fashion</option>
                      <option>Organik</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-600">Eco-Impact (Deskripsi Dampak Lingkungan)</label>
                  <input type="text" placeholder="Contoh: Menyelamatkan 15 botol plastik PET kosmetik" value={uploadForm.impact} onChange={e => setUploadForm({ ...uploadForm, impact: e.target.value })} className="w-full border px-4 py-2.5 text-xs rounded-xl focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-600 block">Foto Gambar Produk</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-slate-50 p-4">
                    <Upload size={24} className="text-gray-400" />
                    <p className="text-xs font-bold text-slate-600 mt-1">{uploadForm.imageFileName ? `Terpilih: ${uploadForm.imageFileName}` : "Klik untuk Pilih Gambar Produk"}</p>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) setUploadForm({ ...uploadForm, imageFileName: e.target.files[0].name }); }} />
                  </label>
                </div>
                <button type="submit" className="w-full py-3 bg-[#2D3B26] text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-md">Terbitkan Produk Kreatif Online ✨</button>
              </form>
            </div>
          )}

          {/* [TAB] KERANJANG BELANJA */}
          {activeTab === 'cart' && (
            <div className="max-w-4xl space-y-6">
              <h2 className="text-xl font-black">Shopping Cart Toko Anda</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-3">
                  {cart.map(item => (
                    <div key={item.product.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
                      <div className="flex items-center gap-4">
                        <img src={item.product.image} alt="p" className="w-14 h-14 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-black text-sm text-[#2D3B26]">{item.product.name}</h4>
                          <p className="text-xs text-gray-400 font-bold">{item.quantity} Barang</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-black text-slate-700 bg-slate-50 px-3 py-1 rounded-lg">Rp{(item.product.price * item.quantity).toLocaleString('id-ID')}</span>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full">🗑️</button>
                      </div>
                    </div>
                  ))}
                  {cart.length === 0 && <div className="bg-white border rounded-2xl p-12 text-center text-xs font-bold text-gray-400">Keranjang belanja kosong.</div>}
                </div>
                <div className="bg-[#2D3B26] rounded-3xl p-6 text-white space-y-4 h-fit shadow-lg">
                  <h4 className="font-black text-sm border-b border-white/10 pb-2">Ringkasan Pembayaran</h4>
                  <div className="flex justify-between text-xs text-white/70"><span>Ongkos Kirim Internal</span><span>Rp25.500</span></div>
                  <div className="flex justify-between text-sm font-black pt-2 border-t border-white/10"><span>Total Tagihan</span><span>Rp{(totalCartPrice + 25500).toLocaleString('id-ID')}</span></div>
                  <button onClick={handleCheckout} className="w-full bg-white text-[#2D3B26] font-black py-3 rounded-xl text-xs">Lanjut Bayar Via Gateway</button>
                </div>
              </div>
            </div>
          )}

          {/* [TAB] RIWAYAT TRANSAKSI */}
          {activeTab === 'history' && (
            <div className="max-w-3xl space-y-4">
              <h2 className="text-xl font-black">Riwayat Transaksi Akun</h2>
              {transactions.map((t, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-4">
                    <img src={t.image} alt="p" className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-black text-sm">{t.productName}</h4>
                      <p className="text-[11px] text-gray-400 font-bold">{t.id} • Tanggal: {t.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black text-slate-700">Rp{t.price.toLocaleString('id-ID')}</span>
                    <span className="text-[10px] font-black px-3 py-1 rounded-full bg-[#2D3B26]/5 text-[#2D3B26]">{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* [TAB] PROFILE */}
          {activeTab === 'profile' && (
            <div className="max-w-xl bg-white border border-gray-100 rounded-3xl p-6 shadow-xs text-center space-y-4">
              <img src={userProfile.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-[#2D3B26]/10" />
              <div>
                <h3 className="text-lg font-black">{userProfile.name}</h3>
                <p className="text-xs text-[#4A7055] font-bold mt-0.5">{userProfile.role} • {userProfile.class}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-left text-xs space-y-1 text-slate-600">
                <div>🏢 <strong>Sekolah:</strong> {userProfile.school}</div>
                <div>🛡️ <strong>Merchant Status:</strong> Verified Green Innovator</div>
              </div>
            </div>
          )}

          {/* [TAB] NOTIFIKASI */}
          {activeTab === 'notifications' && (
            <div className="max-w-2xl space-y-3">
              <h2 className="text-xl font-black">Pemberitahuan Sistem</h2>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-4 shadow-2xs">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl h-fit"><CheckCircle size={20} /></div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black">Setoran Poin Disetujui! 🎉</h4>
                  <p className="text-xs text-gray-500">Poin dari kreasi kerajinan handuk semen milikmu sudah berhasil masuk ke saldo workspace.</p>
                </div>
              </div>
            </div>
          )}

          {/* [TAB] PUSAT BANTUAN */}
          {activeTab === 'help' && (
            <div className="max-w-2xl space-y-4">
              <h2 className="text-xl font-black">Pusat Bantuan & FAQ</h2>
              {['Cara Menukarkan EcoPoints', 'Standar Kebersihan Bahan Baku Daur Ulang', 'Ketentuan Bagi Hasil Lapak Komersial'].map((q, i) => (
                <div key={i} className="p-4 bg-white border border-gray-100 rounded-xl flex justify-between items-center text-xs font-black cursor-pointer hover:border-gray-400">
                  <span>{q}</span><ArrowUpRight size={16} className="text-gray-400" />
                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}