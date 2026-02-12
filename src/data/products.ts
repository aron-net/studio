import type { Product } from "@/lib/types";

const packageImages = [
  "/static/images/valentine-package-1.jpeg",
  "/static/images/valentine-package-2.jpeg",
  "/static/images/valentine-package-3.jpeg",
  "/static/images/valentine-package-4.jpeg",
  "/static/images/valentine-package-5.jpeg",
  "/static/images/valentine-package-6.jpeg",
  "/static/images/valentine-package-7.jpeg",
  "/static/images/valentine-package-8.jpeg",
  "/static/images/valentine-package-9.jpeg",
  "/static/images/valentine-package-10.jpeg",
  "/static/images/valentine-package-11.jpeg",
  "/static/images/valentine-package-12.jpeg",
  "/static/images/valentine-package-13.jpeg",
  "/static/images/valentine-package-14.jpeg",
  "/static/images/valentine-package-15.jpeg",
  "/static/images/valentine-package-16.jpeg",
  "/static/images/valentine-package-17.jpeg",
  "/static/images/valentine-package-18.jpeg",
  "/static/images/valentine-package-19.jpeg",
  "/static/images/valentine-package-20.jpeg",
  "/static/images/valentine-package-21.jpeg",
  "/static/images/valentine-package-22.jpeg",
  "/static/images/valentine-package-23.jpeg",
  "/static/images/valentine-package-24.jpeg",
  "/static/images/valentine-package-25.jpeg",
  "/static/images/valentine-package-26.jpeg",
  "/static/images/valentine-package-27.jpeg",
  "/static/images/valentine-package-28.jpeg",
  "/static/images/valentine-package-29.jpeg",
  "/static/images/valentine-package-30.jpeg",
  "/static/images/valentine-package-31.jpeg",
  "/static/images/valentine-package-32.jpeg",
  "/static/images/valentine-package-33.jpeg",
  "/static/images/valentine-package-34.jpeg",
  "/static/images/valentine-package-35.jpeg",
  "/static/images/valentine-package-36.jpeg",
  "/static/images/valentine-package-37.jpeg",
  "/static/images/valentine-package-38.jpeg",
  "/static/images/valentine-package-39.jpeg",
];

const getGalleryImages = (
  startIndex: number,
  totalProducts: number,
  count: number,
) => {
  const gallery: string[] = [];
  for (let i = 0; i < count; i++) {
    const imageIndex = (startIndex + i) % totalProducts;
    gallery.push((imageIndex + 1).toString());
  }
  return gallery;
};

const productNames = [
  "Dove Love Glow Package",
  "Luxury Femme Valentine",
  "Sweetheart Bundle",
  "Dove Restore Glow Kit",
  "Love and Light Package",
  "Soft Tender Love Pack",
  "Sweet Frost Romance Set",
  "Aromantic Exotic Pack",
  "Sensational Passion Duo",
  "Cool and Confident Set",
  "Sweetheart Strawberry",
  "Curl and Shine Glam Essentials",
  "Divine Elegance Set",
  "Gentleman Heat Set ",
  "Midnight Charm",
  "Sweet Ride Glow Set",
  "Invictus Alpha Male Collection",
  "Queen of Hearts Set",
  "A Lover Girl's Kit",
  "Romantic Escape Package",
  "Cupid Glow Set",
  "Sensual Oud Romance",
  "Morning Glory Set",
  "Sweet  Serenade Kit",
  "Deep Passion Ritual",
  "Mystic Beauty Package",
  "Infinite Love Collection",
  "Midnight Desire Glow Set",
  "Genz Baddie Glam Package",
  "After Dark Radiance Sey",
  "Whispers of the Heart Collection",
  "Forever Yours Package Set",
  "Crimson Bloom Love Set",
  "Good Girl 3-Piece Set for Women",
  "Enchanted Elixir Package",
  "Tropical Romance Bundle",
  "Sweetheart Luxe Trio",
  "Lover's Brightening Set",
  "Afro-Exotic Glow Set",
];
const prices = [
  57000, 32000, 65000, 50000, 50000, 52000, 72000, 70000, 50000, 72000, 69400,
  56000, 60000, 59000, 39000, 39000, 65000, 57000, 58000, 55000, 70000, 65000,
  65000, 65000, 57000, 66000, 55000, 39000, 63000, 52000, 62000, 39000, 59400,
  65000, 55000, 62000, 60900, 65400, 65000,
];

const contentsList = [
  ["Dove Lotion", "Dove Shower Gel", "Dove Cream Soap", "Dove Roll-On"],
  [
    "Cosmo",
    "Vaseline",
    "Active Woman",
    "Estirra Passion - Vanilla",
    "Smart Collection",
  ],
  ["Black Opium Perfume", "Shower Gel", "Body Lotion"],
  ["Dove Lotion", "Dove Exfoliating Body Wash"],
  ["Dove Lotion", "Dove Exfoliating Body Wash"],
  ["Dove Lotion", "Dove Exfoliating Body Wash", "Beauty Pencil"],
  ["Frost", "Nivea Lotion", "Roll-On Deodorant"],
  ["Aromatherapy Body Cleanser", "Dove Lotion", "Dove Exfoliating Body Wash"],
  ["Dove Lotion", "Dove Exfoliating Body Wash"],
  ["Frost", "Nivea Men Body Lotion", "Nivea Men Dry Impact Roll-on"],
  [
    "Jenny Bloom Strawberry Gel",
    "Duru Shower Gel",
    "Dove Lotion",
    "Dove Roll-On",
  ],

  [
    "Olive Oil Radiant Sheen Spray",
    "Eco Styling Gel",
    "Movit Hair Gel",
    "lip balm",
    "Dove Lotion",
  ],

  [
    "Dove Relieving Body Wash",
    "Aromatherapy Body Cleansing",
    "Yara Perfume",
    "Lip Balm",
    "Eyebrow Pencil",
  ],
  [
    "Aromatherapy Body Cleansing",
    "Nivea Lotion",
    "Nivea Vaseline",
    "Nice Perfume",
  ],
  ["Dove Exfoliating Body Wash", "Dove Lotion", "Dove Roll-On"],
  ["Dove Exfoliating Body Wash", "Dove Lotion", "Dove Roll-On"],

  [
    "Invictus Eau de Toilette (Main Bottle)",
    "Invictus Body Spray",
    "Invictus Travel Size Perfume",
  ],
  [
    "Dove Body Love Lotion",
    "Dove Shower Gel",
    "Dove Cream Soap",
    "Dove Roll-On",
  ],

  [
    "Dove Intense Care Body Lotion",
    "Dove Exfoliating Body Polish ",
    "My Way Perfume",
  ],
  [
    "Aromatherapy Body Cleanser ",
    "Vaseline  Body Lotion",
    "Scandal Perfume ",
    "Active Woman Perfume",
  ],

  [
    "Aromatherapy Body Cleanser",
    "Dove  Body Lotion ",
    "Dove Exfoliating Body Polish ",
  ],
  [
    "Dadeea Al Oud Perfume",
    "Dadeea Al Oud  Body Lotion ",
    "Dadeea Al Oud Mini Spray",
  ],

  ["Black Opium Perfume", "Black Opium Shower Gel", "Black Opium Body Lotion"],
  ["Mrs Way Perfume", "Mrs Way Body Lotion ", "Mrs Way Mini Spray"],

  [
    "Dove Deeply Nourishing Body Wash",
    "Dove Body Love Essential Care Lotion",
    "Dove Go Fresh Pomegranate Roll-on",
    "Dove Pink Beauty Bar Soap",
  ],
  [
    "Cosmo Facial Peel-Off Mask (Sandalwood)",
    "Miss Beauty Aloe Vera Super Glow Gel",
    "Naked Make Up Fix Spray",
    "Vaseline Blue Seal Petroleum Jelly",
    "Beauty Blender & Eyeliner Pencil",
  ],
  [
    "Dove Body Love Light Care Lotion",
    "Duru Red Fruits & Pink Grapefruit Body Wash",
    "Smart Collection Luxury Perfume",
    "Beyond Beauty Fragrance Spray",
  ],

  // ["Velvet Matte Lipstick", "Satin Finish Lipstick", "Lip Liner"],
  // ["Glow Serum", "Rosewater Toner", "Shimmering Body Oil"],
  // ["Velvet Matte Lipstick", "Satin Finish Lipstick", "Lip Liner"],
  // ["Glow Serum", "Rosewater Toner", "Shimmering Body Oil"],

  [
    "Dove Relaxing Body Wash ",
    "Dove Beauty Cream Bar",
    "Dove Go Fresh Deodorant",
  ],
  [
    "Glow Serum",
    "Rosewater Toner",
    "Shimmering Body Oil",
    "Mascara",
    "Lip Gloss",
    "Compact Powder",
    "Makeup Wipes",
  ],

  [
    "Olivia Perfume",
    "Dr. Rashel Black Mask",
    "Dove Body Love Light Care Lotion",
  ],
  [
    "Duru Body Wash (Watermelon & Aloe Vera)",
    "Vaseline Advanced Repair Lotion",
    "Vaseline Blue Seal Petroleum Jelly",
    "Duru Natural Olive Bar Soap",
    "Dreamz Perfumed Body Spray",
  ],
  [
    "Dove Glowing Body Wash (Lotus Flower & Rice Water)",
    "Dove Go Fresh Roll-on Deodorant",
    "Dove Pink Beauty Bar Soap",
  ],
  [
    "Dove Cucumber & Green Tea Body Wash",
    "Dove Exfoliating Body Wash",
    "Smart Collection Fragrance",
    "Lip Shine",
  ],
  [
    "Good Girl Perfume",
    "Good Girl Fragrance Mist",
    "Good Girl Roller/Travel Perfume",
  ],
  [
    "Dove Pampering Care Body Lotion",
    "Happy Weekend Fragrance Box",
    "Dove Original Deodorant Roll-on",
    "Clear Lip Gloss",
  ],
  [
    "Jenny Bloom Papaya Whitening Body Wash",
    "Vaseline Intensive Care Aloe Soothe Lotion",
    "Vaseline Blue Seal Petroleum Jelly",
    "Aura Perfumed Body Spray",
  ],
  [
    " Baccarat Rouge 540 Smart Collection Perfume",
    "Dove Exfoliating Body Scrub",
    "Dove Nourishing Body Lotion",
  ],
  ["Vaseline Lotion", "Lip Gloss", "Vaseline Gluta-Hya"],

  [
    "Vaseline Gluta + Lotion",
    "Beauty Pencil",
    "Facial/Makeup Wipes",
    "Rubee Hand & Body Lotion",
  ],
];

export const products: Product[] = packageImages.map((image, index) => ({
  id: (index + 1).toString(),
  name: productNames[index],
  price: prices[index],
  currency: "UGX",
  // shortDescription: descriptions[index].substring(0, 70) + "...",
  // description: descriptions[index],
  contents: contentsList[index],
  images: getGalleryImages(index, packageImages.length, 3),
  stock: Math.floor(Math.random() * 50) + 1,
}));
