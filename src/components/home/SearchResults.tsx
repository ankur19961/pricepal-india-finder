
import { Skeleton } from "@/components/ui/skeleton";

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  retailer: string;
  retailerLogo: string;
  url: string;
  summary: string;
}

interface SearchResultsProps {
  products: Product[];
  searchQuery: string;
  isLoading?: boolean;
}

export const SearchResults = ({ products, searchQuery, isLoading = false }: SearchResultsProps) => {
  // If there's no search query, don't show anything
  if (!searchQuery.trim() && products.length === 0) {
    return null;
  }
  
  // Loading skeleton UI
  if (isLoading) {
    return (
      <section id="results" className="py-12 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-6">
            <Skeleton className="h-8 w-1/3 mb-2" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Skeleton className="w-full h-48" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-10 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <div className="flex items-center justify-between mt-4">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If there are no results after searching
  if (searchQuery.trim() && products.length === 0) {
    return (
      <section id="results" className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">No results found for "{searchQuery}"</h2>
          <p className="text-gray-500 mb-8">Try searching for something else or check spelling.</p>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
              <h3 className="text-lg font-medium mb-4">Popular searches</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {["iPhone", "Samsung TV", "Laptop", "Headphones", "Nike"].map((term) => (
                  <button 
                    key={term}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm transition-colors"
                    onClick={() => {
                      const resultsSection = document.getElementById("results");
                      if (resultsSection) {
                        resultsSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show results
  return (
    <section id="results" className="py-12 px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Comparing prices for "{searchQuery}"</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow animate-fade-in"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="relative">
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Best Deal
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                <div className="flex items-center space-x-1 mb-3">
                  <span className="text-2xl font-bold text-pricepal-primary">₹{product.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 line-through">₹{Math.round(product.price * 1.2).toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{product.summary}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <img src={product.retailerLogo} alt={product.retailer} className="h-6 mr-2" />
                    <span className="text-xs text-gray-500">{product.retailer}</span>
                  </div>
                  <a 
                    href={product.url} 
                    className="bg-pricepal-primary text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Deal
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
