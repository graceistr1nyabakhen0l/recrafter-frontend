// app/constants/dataDummy.ts

export interface Step {
    step: number;
    text: string;
    image: string;
}

export interface Tutorial {
    id: string;
    title: string;
    description: string;
    materialsNeeded: string[];
    steps: Step[];
}

export interface Product {
    id: string;
    name: string;
    price: number;
    seller: string;
    material: string;
    image: string;
    impact: string;
}

export const dummyTutorials: Tutorial[] = [
    {
        id: "tut-1",
        title: "Strap Phone Estetik dari Botol Plastik",
        description: "Ubah bagian tengah botol plastik menjadi manik-manik jernih yang trendi.",
        materialsNeeded: ["1 Botol Plastik Bekas", "Gunting", "Tali Pengait", "Pewarna/Spidol"],
        steps: [
            { step: 1, text: "Bersihkan botol plastik dari label dan sisa lem.", image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500" },
            { step: 2, text: "Potong botol menjadi lembaran kecil berukuran 2x2 cm.", image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=500" },
            { step: 3, text: "Haluskan pinggiran plastik dan lubangi bagian tengahnya untuk jalur tali.", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500" },
            { step: 4, text: "Rangkai potongan plastik ke dalam tali strap phone bersama manik-manik pendukung.", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500" }
        ]
    }
];

export const dummyProducts: Product[] = [
    {
        id: "prod-1",
        name: "Ocean Breezephone Strap",
        price: 15000,
        seller: "Aris RPL 2",
        material: "Botol Plastik Sprite",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500",
        impact: "Menyelamatkan 1 botol plastik"
    },
    {
        id: "prod-2",
        name: "Aesthetic Clear Bracelet",
        price: 20000,
        seller: "Siti RPL 1",
        material: "Botol Aqua 1L",
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500",
        impact: "Menyelamatkan 2 botol plastik"
    },
    {
        id: "prod-3",
        name: "Neon Pastel Earrings",
        price: 12500,
        seller: "Grup 5 KIK",
        material: "Gelas Plastik Club",
        image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=500",
        impact: "Menyelamatkan 3 gelas plastik"
    }
];