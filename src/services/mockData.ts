
import { Product } from "@/components/home/SearchResults";

// Product image placeholders
const productImages = [
  "https://images.unsplash.com/photo-1585060544812-6b45742d762f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
];

// Retailer logos
const retailerLogos = {
  "Amazon": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
  "Flipkart": "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png",
  "Croma": "https://media.croma.com/image/upload/v1637759004/Croma%20Assets/CMS/CromaLogo_croh8w.png",
  "Myntra": "https://constant.myntassets.com/web/assets/img/logo_myntra.png",
  "Reliance Digital": "https://www.reliancedigital.in/wp-content/uploads/2019/11/Reliance_Digital_Logo.png",
  "Zepto": "https://cdn.zeptonow.com/web-static-assets-prod/artifacts/8.1.1/images/icons/zepto-logo.svg",
  "Blinkit": "https://blinkit.com/images/faviconChange/blinkit-favicon-120x120.png"
};

// Generate mock search results based on the search query
export const searchProducts = (query: string): Product[] => {
  // If the query is empty, return an empty array
  if (!query.trim()) {
    return [];
  }
  
  // Mock products based on common search categories
  const queryLower = query.toLowerCase();
  
  // Smartphone related results
  if (queryLower.includes("iphone") || queryLower.includes("phone") || queryLower.includes("mobile")) {
    return generateSmartphoneResults(query);
  }
  
  // TV related results
  if (queryLower.includes("tv") || queryLower.includes("television")) {
    return generateTVResults(query);
  }
  
  // Laptop related results
  if (queryLower.includes("laptop") || queryLower.includes("macbook")) {
    return generateLaptopResults(query);
  }
  
  // For any other query, generate generic products
  return generateGenericResults(query);
};

// Helper function to generate smartphone results
const generateSmartphoneResults = (query: string): Product[] => {
  const brands = ["Apple", "Samsung", "OnePlus", "Xiaomi", "Vivo"];
  const models = ["15", "14 Pro", "S23 Ultra", "11T Pro", "Nord 3"];
  const storage = ["128GB", "256GB", "512GB"];
  const colors = ["Black", "Blue", "White", "Green"];
  
  const retailers = ["Amazon", "Flipkart", "Croma", "Reliance Digital"];
  
  return Array(8).fill(null).map((_, index) => {
    const brand = brands[index % brands.length];
    const model = models[index % models.length];
    const storageOption = storage[index % storage.length];
    const color = colors[index % colors.length];
    const retailer = retailers[index % retailers.length];
    
    // Create price variations between retailers
    const basePrice = brand === "Apple" ? 79999 : (brand === "Samsung" ? 74999 : 49999);
    const priceVariation = Math.floor(Math.random() * 5000);
    const discountFactor = 0.9 + (Math.random() * 0.15); // 10-25% discount
    
    return {
      id: `phone-${index}`,
      title: `${brand} ${query.includes(brand) ? "" : query.includes("phone") ? "Phone " : ""}${model} (${storageOption}, ${color})`,
      image: productImages[index % productImages.length],
      price: Math.floor((basePrice + priceVariation) * discountFactor),
      retailer,
      retailerLogo: retailerLogos[retailer as keyof typeof retailerLogos],
      url: "#",
      summary: `${storageOption} Storage, ${Math.floor(Math.random() * 8) + 4}GB RAM, AI Features`
    };
  });
};

// Helper function to generate TV results
const generateTVResults = (query: string): Product[] => {
  const brands = ["Samsung", "LG", "Sony", "OnePlus", "Mi"];
  const sizes = ["43-inch", "50-inch", "55-inch", "65-inch", "75-inch"];
  const features = ["4K UHD", "QLED", "OLED", "Smart TV", "LED"];
  
  const retailers = ["Amazon", "Flipkart", "Croma", "Reliance Digital"];
  
  return Array(6).fill(null).map((_, index) => {
    const brand = brands[index % brands.length];
    const size = sizes[index % sizes.length];
    const feature = features[index % features.length];
    const retailer = retailers[index % retailers.length];
    
    // Create price variations between retailers
    const basePrice = parseInt(size) * 1000; // Size-based pricing
    const priceVariation = Math.floor(Math.random() * 10000);
    const discountFactor = 0.85 + (Math.random() * 0.1); // 15-25% discount
    
    return {
      id: `tv-${index}`,
      title: `${brand} ${size} ${feature} ${query.includes("Smart") ? "" : "Smart "}TV`,
      image: productImages[(index + 2) % productImages.length],
      price: Math.floor((basePrice + priceVariation) * discountFactor),
      retailer,
      retailerLogo: retailerLogos[retailer as keyof typeof retailerLogos],
      url: "#",
      summary: `${feature}, HDR Support, Android/WebOS, Built-in WiFi`
    };
  });
};

// Helper function to generate laptop results
const generateLaptopResults = (query: string): Product[] => {
  const brands = ["Apple", "Dell", "HP", "Lenovo", "Asus"];
  const series = ["MacBook Air", "XPS", "Pavilion", "ThinkPad", "VivoBook"];
  const processors = ["Intel i5", "Intel i7", "AMD Ryzen 5", "M2 Chip", "Intel i9"];
  
  const retailers = ["Amazon", "Flipkart", "Croma", "Reliance Digital"];
  
  return Array(7).fill(null).map((_, index) => {
    const brand = brands[index % brands.length];
    const model = series[index % series.length];
    const processor = processors[index % processors.length];
    const retailer = retailers[index % retailers.length];
    
    // Create price variations between retailers
    const basePrice = brand === "Apple" ? 99999 : 65999;
    const priceVariation = Math.floor(Math.random() * 15000);
    const discountFactor = 0.9 + (Math.random() * 0.1); // 10-20% discount
    
    return {
      id: `laptop-${index}`,
      title: `${brand} ${model} ${query.includes(brand) ? "" : "Laptop"} with ${processor}`,
      image: productImages[(index + 1) % productImages.length],
      price: Math.floor((basePrice + priceVariation) * discountFactor),
      retailer,
      retailerLogo: retailerLogos[retailer as keyof typeof retailerLogos],
      url: "#",
      summary: `16GB RAM, 512GB SSD, Backlit Keyboard, FHD Display`
    };
  });
};

// Helper function to generate generic results
const generateGenericResults = (query: string): Product[] => {
  const items = [
    "Bluetooth Speaker",
    "Wireless Earbuds",
    "Fitness Tracker",
    "Smart Watch",
    "Power Bank",
    "Coffee Maker",
    "Air Fryer",
    "Hair Dryer"
  ];
  
  const brands = ["Boat", "Sony", "Philips", "Samsung", "Mi", "JBL", "Prestige"];
  const retailers = ["Amazon", "Flipkart", "Croma", "Myntra", "Zepto", "Blinkit"];
  
  return Array(6).fill(null).map((_, index) => {
    const item = query || items[index % items.length];
    const brand = brands[index % brands.length];
    const retailer = retailers[index % retailers.length];
    
    // Create price variations between retailers
    const basePrice = 2999;
    const priceVariation = Math.floor(Math.random() * 2000);
    const discountFactor = 0.8 + (Math.random() * 0.15); // 20-35% discount
    
    return {
      id: `generic-${index}`,
      title: `${brand} ${item} - Premium Edition`,
      image: productImages[index % productImages.length],
      price: Math.floor((basePrice + priceVariation) * discountFactor),
      retailer,
      retailerLogo: retailerLogos[retailer as keyof typeof retailerLogos],
      url: "#",
      summary: `Best seller, High quality, Fast delivery`
    };
  });
};
