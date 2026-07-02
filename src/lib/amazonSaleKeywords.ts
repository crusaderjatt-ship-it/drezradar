// Top 100+ trending Amazon India keywords for fashion, beauty, and electronics sales
// These keywords trigger affiliate links when mentioned in articles

export const AMAZON_SALE_KEYWORDS = {
  fashion: [
    'dresses', 'sarees', 'kurtis', 'jeans', 'shirts', 'top', 'lehenga', 'blazer',
    'trousers', 'skirts', 'ethnic wear', 'casual wear', 'formal wear', 'western wear',
    'traditional dress', 'indo western', 'salwar kameez', 'anarkali', 'palazzo',
    'crop top', 'cardigan', 'jacket', 'coat', 'sweatshirt', 'hoodie', 'sweater'
  ],
  footwear: [
    'heels', 'sneakers', 'shoes', 'boots', 'sandals', 'flip flops', 'loafers', 'flats',
    'pumps', 'stilettos', 'casual shoes', 'sports shoes', 'running shoes', 'canvas shoes',
    'slip ons', 'oxfords', 'brogues', 'ballet flats', 'ankle boots', 'knee high boots'
  ],
  accessories: [
    'handbag', 'clutch', 'backpack', 'wallet', 'belt', 'scarf', 'shawl', 'dupatta',
    'jewelry', 'earrings', 'necklace', 'bracelet', 'ring', 'bangle', 'sunglasses',
    'watch', 'cap', 'hat', 'beanie', 'hair accessories', 'brooch', 'pendant'
  ],
  beauty: [
    'lipstick', 'foundation', 'concealer', 'powder', 'blush', 'eyeshadow', 'mascara',
    'eyeliner', 'skincare', 'moisturizer', 'cleanser', 'serum', 'face mask', 'sunscreen',
    'shampoo', 'conditioner', 'hair oil', 'perfume', 'cologne', 'deodorant', 'nail polish',
    'makeup kit', 'primer', 'setting spray', 'face wash', 'toner', 'body lotion'
  ],
  electronics: [
    'phone', 'smartphone', 'mobile', 'headphones', 'earbuds', 'speaker', 'charger',
    'power bank', 'tablet', 'smartwatch', 'fitness band', 'camera', 'laptop', 'keyboard',
    'mouse', 'monitor', 'webcam', 'microphone', 'portable speaker', 'cables', 'adapter'
  ],
  homeware: [
    'bedsheet', 'pillow', 'quilt', 'mattress', 'blanket', 'towel', 'curtains', 'sofa',
    'cushion', 'rug', 'carpet', 'lighting', 'lamps', 'decor', 'wall art', 'storage',
    'organizer', 'furniture', 'chair', 'table', 'shelves', 'mirror', 'clock'
  ],
  kitchen: [
    'cookware', 'non stick pan', 'pressure cooker', 'mixer grinder', 'microwave', 'oven',
    'kettle', 'coffee maker', 'blender', 'juicer', 'utensils', 'cutlery', 'dishes',
    'containers', 'storage boxes', 'knives', 'cutting board', 'vacuum container'
  ],
  sports: [
    'yoga mat', 'dumbbell', 'resistance band', 'jump rope', 'running shoes', 'sports bra',
    'gym equipment', 'treadmill', 'bicycle', 'skateboard', 'roller skates', 'sports watch',
    'water bottle', 'gym bag', 'cricket bat', 'badminton racket', 'tennis racket'
  ],
  personal_care: [
    'razor', 'shaving cream', 'aftershave', 'trimmer', 'hair dryer', 'straightener',
    'curler', 'toothbrush', 'toothpaste', 'mouthwash', 'soap', 'hand wash', 'sanitizer',
    'bath salts', 'shower gel', 'body wash', 'massage oil'
  ],
  sale_keywords: [
    'deal', 'discount', 'offer', 'sale', 'coupon', 'special price', 'limited offer',
    'flash sale', 'mega sale', 'clearance', 'bargain', 'budget friendly', 'affordable',
    'best price', 'lowest price', 'huge discount', 'today offer'
  ]
};

// Flatten all keywords for easier search
export const ALL_AMAZON_KEYWORDS = Object.values(AMAZON_SALE_KEYWORDS).flat();

// Create a unified keyword map with commission tier hints
export const KEYWORD_TO_CATEGORY = {
  // High commission items (cosmetics, fashion typically have 3-10% commission)
  ...Object.fromEntries(AMAZON_SALE_KEYWORDS.beauty.map(k => [k.toLowerCase(), { category: 'beauty', commission: 'high' }])),
  ...Object.fromEntries(AMAZON_SALE_KEYWORDS.fashion.map(k => [k.toLowerCase(), { category: 'fashion', commission: 'medium' }])),
  ...Object.fromEntries(AMAZON_SALE_KEYWORDS.accessories.map(k => [k.toLowerCase(), { category: 'accessories', commission: 'medium' }])),
  ...Object.fromEntries(AMAZON_SALE_KEYWORDS.footwear.map(k => [k.toLowerCase(), { category: 'footwear', commission: 'medium' }])),

  // Medium commission items
  ...Object.fromEntries(AMAZON_SALE_KEYWORDS.homeware.map(k => [k.toLowerCase(), { category: 'homeware', commission: 'medium' }])),
  ...Object.fromEntries(AMAZON_SALE_KEYWORDS.kitchen.map(k => [k.toLowerCase(), { category: 'kitchen', commission: 'medium' }])),

  // Lower commission but high volume
  ...Object.fromEntries(AMAZON_SALE_KEYWORDS.electronics.map(k => [k.toLowerCase(), { category: 'electronics', commission: 'low' }])),
  ...Object.fromEntries(AMAZON_SALE_KEYWORDS.sports.map(k => [k.toLowerCase(), { category: 'sports', commission: 'low' }])),
};
