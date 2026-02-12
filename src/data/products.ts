import type { Product } from '@/lib/types';

const packageImages = [
  "/IMG_3781.HEIC", "/IMG_3784.HEIC", "/IMG_3785.HEIC", "/IMG_3786.HEIC", "/IMG_3787.HEIC",
  "/IMG_3788.HEIC", "/IMG_3789.HEIC", "/IMG_3790.HEIC", "/IMG_3792.HEIC", "/IMG_3793.HEIC",
  "/IMG_3795.HEIC", "/IMG_3796.HEIC", "/IMG_3797.HEIC", "/IMG_3798.HEIC", "/IMG_3799.HEIC",
  "/IMG_3800.HEIC", "/IMG_3801.HEIC", "/IMG_3802.HEIC", "/IMG_3804.HEIC", "/IMG_3805.HEIC",
  "/IMG_3806.HEIC", "/IMG_3807.HEIC", "/IMG_3808.HEIC", "/IMG_3809.HEIC", "/IMG_3810.HEIC",
  "/IMG_3811.HEIC", "/IMG_3812.HEIC", "/IMG_3813.HEIC", "/IMG_3814.HEIC", "/IMG_3815.HEIC",
  "/IMG_3816.HEIC", "/IMG_3817.HEIC", "/IMG_3818.HEIC", "/IMG_3819.HEIC", "/IMG_3820.HEIC",
  "/IMG_3821.HEIC", "/IMG_3822.HEIC", "/IMG_3823.HEIC", "/IMG_3824.HEIC"
];

const getGalleryImages = (mainImage: string, allImages: string[], count: number) => {
  const gallery = [mainImage];
  let currentIndex = allImages.indexOf(mainImage);
  for (let i = 0; i < count - 1; i++) {
    currentIndex = (currentIndex + 1) % allImages.length;
    gallery.push(allImages[currentIndex]);
  }
  return gallery;
}

const productNames = [
  "Cupid's Glow Kit", "Velvet Kiss Collection", "Rose Petal Radiance", "Sweetheart's Sparkle",
  "Love Struck Luxury", "Enchanted Romance Set", "Blushing Beauty Box", "Passionfruit Pamper",
  "Seraphic Skin", "Divine Duo", "First Kiss Fragrance", "Eternal Elegance",
  "Honey & Heart", "Cherub's Charm", "Venus Vitality", "Adore Me Amour",
  "Secret Garden Set", "True Love Trio", "Forever Yours Face", "Moonlit Magic",
  "Starlight Shimmer", "Goddess Glow", "Aphrodite's Allure", "Sweet Nothings",
  "Angel's Touch", "Be Mine Beauty", "XOXO Essentials", "Perfect Pair",
  "Love Potion No. 9", "Cloud Nine Care", "Dreamy Date Night", "Heart's Desire",
  "Crimson Crush", "Pure Passion Pack", "Valentine's Vixen", "Satin & Soul",
  "Whispers of Love", "Darling Deluxe", "My Valentine"
];

const descriptions = [
  "Illuminate your love story with this radiant skincare set, perfect for a Valentine's glow.",
  "A collection of our most luxurious lipsticks for kisses as soft as velvet.",
  "Experience the delicate touch of rose petals for a refreshed and radiant complexion.",
  "Everything you need to sparkle and shine for your special someone this Valentine's.",
  "Indulge in pure luxury with this curated set of our most premium products.",
  "A romantic collection to enchant the senses and beautify the skin.",
  "Achieve the perfect Valentine's blush with this all-in-one beauty box.",
  "Pamper yourself or a loved one with the exotic scent of passionfruit.",
  "For skin so soft and pure, it's like a seraph's touch.",
  "The perfect pair of products for a divine skincare routine.",
  "A captivating fragrance that evokes the memory of a first kiss.",
  "Timeless beauty products for an eternally elegant look.",
  "A sweet and heartwarming collection of honey-infused skincare.",
  "Add a touch of angelic charm to your beauty routine.",
  "Revitalize your skin with the power of our Venus-inspired set.",
  "A lovely set that says 'Adore Me' in the most beautiful way.",
  "Unlock the secrets of a beautiful garden with this floral-scented set.",
  "Three of our best-sellers, because true love comes in threes.",
  "Everything you need for a flawless face, forever and always.",
  "Create a magical, moonlit look for your romantic evening.",
  "Shine bright like the stars with this shimmering makeup kit.",
  "Unleash your inner goddess with this divine glow-enhancing set.",
  "A captivating collection designed to enhance your natural allure.",
  "Whisper sweet nothings with this subtle and romantic beauty set.",
  "Soft, gentle, and pure - a touch of an angel for your skin.",
  "The perfect way to ask, 'Be Mine?' this Valentine's Day.",
  "Hugs, kisses, and all your beauty essentials in one box.",
  "Two products that are simply better together, just like you and your valentine.",
  "A magical concoction of products to make anyone fall in love.",
  "Float on cloud nine with this relaxing and dreamy skincare set.",
  "Get ready for your dreamy date night with this complete beauty kit.",
  "Everything your heart desires for a beautiful Valentine's look.",
  "A bold and passionate collection for a stunning crimson look.",
  "A pack of our purest products for a passionate expression of love.",
  "Unleash your inner vixen with this daring and beautiful set.",
  "For skin as smooth as satin and a soul that feels cherished.",
  "A subtle and intimate collection that whispers words of love.",
  "A deluxe set for your darling, because they deserve the best.",
  "The one and only package you need to say 'Be My Valentine'."
];

const contentsList = [
  ["Glow Serum", "Rosewater Toner", "Shimmering Body Oil"],
  ["Velvet Matte Lipstick", "Satin Finish Lipstick", "Lip Liner"],
  ["Rose Petal Cleanser", "Rosehip Oil", "Petal-Infused Moisturizer"],
  ["Diamond Highlighter", "Glitter Eyeshadow", "Sparkling Lip Gloss"],
  ["24k Gold Serum", "Caviar-Infused Cream", "Silk Body Lotion"],
  ["Jasmine Body Wash", "Lavender Face Mist", "Enchanted Perfume"],
  ["Cream Blush", "Powder Blush", "Blush Brush"],
  ["Passionfruit Scrub", "Passionfruit Body Butter", "Exotic Perfume Oil"],
  ["Gentle Milk Cleanser", "Soothing Aloe Vera Gel", "Cloud-like Moisturizer"],
  ["Vitamin C Serum", "Hyaluronic Acid Booster"],
  ["Eau de Parfum", "Rollerball Perfume"],
  ["Classic Red Lipstick", "Timeless Foundation", "Blackest-Black Mascara"],
  ["Honey & Almond Scrub", "Manuka Honey Mask", "Propolis Balm"],
  ["Angelic Highlighter", "Feather-light Powder", "Cherub-Cheek Tint"],
  ["Sea Salt Scrub", "Mineral-Rich Mud Mask", "Oceanic Face Mist"],
  ["Amour Perfume", "Seductive Body Lotion", "Adore Me Lip Tint"],
  ["Floral Body Wash", "Botanical Face Oil", "Gardenia Perfume"],
  ["Cleanser", "Serum", "Moisturizer"],
  ["Primer", "Foundation", "Setting Spray"],
  ["Silver Eyeshadow Palette", "Luminous Primer", "Moonlit Perfume"],
  ["Liquid Shimmer", "Pressed Glitter Palette", "Starlight Lip Topper"],
  ["Golden Body Oil", "Bronze Highlighter", "Goddess Perfume"],
  ["Pheromone-Infused Perfume", "Alluring Body Mist", "Silk Robe"],
  ["Nude Lipstick Palette", "Subtle Highlighter", "Whisper-light Perfume"],
  ["Gentle Foaming Cleanser", "Cotton-Puff Moisturizer", "Baby-soft Lip Balm"],
  ["Heart-shaped Lipstick", "Be Mine Eyeshadow Palette", "Love Note Perfume"],
  ["Lip & Cheek Tint", "Travel-size Mascara", "Mini Perfume"],
  ["Day Cream", "Night Cream"],
  ["Exotic Perfume", "Sensual Massage Oil", "Love-dusted Powder"],
  ["Dreamy Pillow Mist", "Calming Night Cream", "Relaxing Bath Bomb"],
  ["Smokey Eye Palette", "Long-lasting Lipstick", "Setting Spray"],
  ["Customizable Palette", "Signature Perfume", "Jewelry Box"],
  ["Crimson Lipstick", "Red Nail Polish", "Black Eyeliner"],
  ["Organic Cleanser", "Pure Argan Oil", "Natural Deodorant"],
  ["Bold Eyeshadow Palette", "Vixen Red Lipstick", "Contour Kit"],
  ["Satin Pillowcase", "Silk Eye Mask", "Soothing Body Cream"],
  ["Romantic Perfume", "Love Letter Stationery", "Engraved Lipstick Case"],
  ["Deluxe Skincare Set", "Premium Makeup Brushes", "Vanity Case"],
  ["The Ultimate Valentine's Package", "Includes everything for a perfect day"]
];


export const products: Product[] = packageImages.map((image, index) => ({
  id: (index + 1).toString(),
  name: productNames[index],
  price: Math.floor(Math.random() * (250000 - 50000 + 1) + 50000),
  currency: 'UGX',
  shortDescription: descriptions[index].substring(0, 70) + '...',
  description: descriptions[index],
  contents: contentsList[index],
  images: getGalleryImages(image, packageImages, 3).map(img => img.replace('/IMG_', '').replace('.HEIC', '')),
  stock: Math.floor(Math.random() * 50) + 1,
}));
