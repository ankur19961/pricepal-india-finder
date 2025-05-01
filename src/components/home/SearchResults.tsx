
import { ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  retailer: string;
  retailerLogo: string;
  url: string;
  summary?: string;
  discount?: number;
}

interface SearchResultsProps {
  products: Product[];
  searchQuery: string;
}

export const SearchResults = ({ products, searchQuery }: SearchResultsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  // Simulate loading state and staggered display of results
  useEffect(() => {
    if (!searchQuery) return;
    
    setIsLoading(true);
    setVisibleProducts([]);
    
    if (products.length > 0) {
      // First show loading
      setTimeout(() => {
        setIsLoading(false);
        
        // Then show products with staggered animation
        products.forEach((product, index) => {
          setTimeout(() => {
            setVisibleProducts(prev => [...prev, product]);
          }, index * 150);
        });
      }, 1000);
    } else {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [products, searchQuery]);

  if (!searchQuery) return null;

  const handleProductClick = (url: string) => {
    // In a real app, this is where you'd add affiliate code to the URL
    window.open(url, "_blank");
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(4).fill(0).map((_, index) => (
        <Card key={index} className="overflow-hidden animate-pulse">
          <div className="aspect-square bg-gray-200"></div>
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
  
  const NoResultsFound = () => (
    <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Search className="text-gray-400" size={24} />
      </div>
      <p className="text-gray-500 mb-2">No products found for "{searchQuery}"</p>
      <p className="text-sm text-gray-400">Try a different search term or check the spelling</p>
    </div>
  );

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white" id="results">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-8 flex items-center">
          <span>Search Results for "{searchQuery}"</span>
          {visibleProducts.length > 0 && (
            <Badge variant="outline" className="ml-3 px-2 py-0 text-xs">
              {visibleProducts.length} items found
            </Badge>
          )}
        </h2>
        
        {isLoading ? (
          <LoadingSkeleton />
        ) : products.length === 0 ? (
          <NoResultsFound />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleProducts.map((product, index) => {
              // Determine if this is the best deal
              const isBestDeal = visibleProducts.length > 1 && 
                visibleProducts.every(p => p.id === product.id || p.price >= product.price);
              
              return (
                <Card 
                  key={product.id} 
                  className={`overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-in relative ${
                    isBestDeal ? 'border-2 border-pricepal-highlight' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {isBestDeal && (
                    <div className="absolute top-0 right-0 bg-pricepal-highlight text-pricepal-text font-semibold px-3 py-1 text-xs rounded-bl-lg z-10 flex items-center">
                      <Sparkles size={12} className="mr-1" /> Best Deal
                    </div>
                  )}
                  
                  <div className="aspect-square overflow-hidden bg-white flex items-center justify-center p-4 relative">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-contain p-4 hover:scale-110 transition-transform duration-300"
                    />
                    {product.discount && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        {product.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 hover:text-pricepal-primary transition-colors" title={product.title}>
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
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center cursor-help">
                              <img 
                                src={product.retailerLogo} 
                                alt={product.retailer} 
                                className="w-6 h-6 object-contain hover:scale-110 transition-transform"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Available on {product.retailer}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <Button 
                      onClick={() => handleProductClick(product.url)}
                      className="w-full flex items-center justify-center gap-2 bg-pricepal-primary hover:bg-blue-700 hover:translate-y-[-2px] transition-all"
                    >
                      View on {product.retailer}
                      <ExternalLink size={14} />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

// Helper component for the NoResultsFound
const Search = ({ className, size }: { className?: string; size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
);
