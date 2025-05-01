
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  retailer: string;
  retailerLogo: string;
  url: string;
  summary?: string;
}

interface SearchResultsProps {
  products: Product[];
  searchQuery: string;
}

export const SearchResults = ({ products, searchQuery }: SearchResultsProps) => {
  if (!searchQuery) return null;

  if (products.length === 0) {
    return (
      <section className="py-12 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Search Results</h2>
          <div className="text-center py-16">
            <p className="text-gray-500">No products found for "{searchQuery}"</p>
          </div>
        </div>
      </section>
    );
  }

  const handleProductClick = (url: string) => {
    // In a real app, this is where you'd add affiliate code to the URL
    window.open(url, "_blank");
  };

  return (
    <section className="py-12 px-6 bg-gray-50" id="results">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Search Results for "{searchQuery}"</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-slide-in">
              <div className="aspect-square overflow-hidden bg-white flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2" title={product.title}>
                  {product.title}
                </h3>
                {product.summary && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.summary}</p>
                )}
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-pricepal-text">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <img 
                      src={product.retailerLogo} 
                      alt={product.retailer} 
                      className="w-6 h-6 object-contain mr-1"
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => handleProductClick(product.url)}
                  className="w-full flex items-center justify-center gap-2 bg-pricepal-primary hover:bg-blue-700"
                >
                  View on {product.retailer}
                  <ExternalLink size={14} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
