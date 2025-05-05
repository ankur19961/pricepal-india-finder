import { Product } from "@/components/home/SearchResults";
import { Suggestion } from "@/components/search/SearchSuggestions";

// API endpoints
const API_BASE_URL = "https://dummyjson.com";

// Interface for the API response
interface ProductApiResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}

interface ApiProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// Retailer logos (we'll keep these as they add visual interest)
const retailerLogos = {
  "Amazon": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
  "Flipkart": "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png",
  "Croma": "https://media.croma.com/image/upload/v1637759004/Croma%20Assets/CMS/CromaLogo_croh8w.png",
  "Myntra": "https://constant.myntassets.com/web/assets/img/logo_myntra.png",
  "Reliance Digital": "https://www.reliancedigital.in/wp-content/uploads/2019/11/Reliance_Digital_Logo.png",
  "Zepto": "https://cdn.zeptonow.com/web-static-assets-prod/artifacts/8.1.1/images/icons/zepto-logo.svg",
  "Blinkit": "https://blinkit.com/images/faviconChange/blinkit-favicon-120x120.png"
};

// Convert API product to our Product interface
const mapApiProductToProduct = (product: ApiProduct): Product => {
  // Randomly select a retailer for demonstration
  const retailers = Object.keys(retailerLogos);
  const randomRetailer = retailers[Math.floor(Math.random() * retailers.length)];
  
  return {
    id: product.id.toString(),
    title: product.title,
    image: product.thumbnail,
    price: Math.round(product.price),
    retailer: randomRetailer,
    retailerLogo: retailerLogos[randomRetailer as keyof typeof retailerLogos],
    url: "#",
    summary: product.description.substring(0, 100) + (product.description.length > 100 ? '...' : '')
  };
};

// Search for products using the API
export const searchProducts = async (query: string): Promise<Product[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    // Use the search endpoint
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      console.error("API error:", response.statusText);
      return [];
    }
    
    const data: ProductApiResponse = await response.json();
    
    // Map API products to our Product interface
    return data.products.map(mapApiProductToProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Get suggestions based on partial input
export const getSuggestions = async (query: string, popularOnly: boolean = false): Promise<Suggestion[]> => {
  const suggestions: Suggestion[] = [];
  
  // Return popular searches if requested or if query is empty
  if (popularOnly || !query.trim()) {
    return [
      { id: "pop1", text: "iPhone", category: "products", popular: true },
      { id: "pop2", text: "Samsung", category: "products", popular: true },
      { id: "pop3", text: "Laptop", category: "products", popular: true },
      { id: "pop4", text: "Smartphone", category: "products", popular: true },
      { id: "pop5", text: "Fragrances", category: "categories", popular: true },
    ];
  }
  
  try {
    // Fetch product suggestions
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=5`);
    
    if (!response.ok) {
      return suggestions;
    }
    
    const data: ProductApiResponse = await response.json();
    
    // Add product suggestions
    data.products.forEach((product, index) => {
      suggestions.push({
        id: `prod-${product.id}`,
        text: product.title,
        category: "products",
        thumbnail: product.thumbnail,
      });
    });
    
    // Since we're using a limited API, we'll add some brand suggestions based on the products
    const brands = [...new Set(data.products.map(p => p.brand))];
    brands.forEach((brand, index) => {
      suggestions.push({
        id: `brand-${index}`,
        text: brand,
        category: "brands"
      });
    });
    
    // Add some categories based on the products
    const categories = [...new Set(data.products.map(p => p.category))];
    categories.forEach((category, index) => {
      suggestions.push({
        id: `cat-${index}`,
        text: category,
        category: "categories"
      });
    });
    
    return suggestions;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return suggestions;
  }
};
