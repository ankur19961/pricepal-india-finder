
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Popular searches for demonstration
  const popularSearches = ["iPhone 15", "Samsung TV", "Nike Shoes", "Dettol Soap"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handlePopularSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <section className="relative pt-20 pb-32 px-6 overflow-hidden">
      {/* Background gradient with animated shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 -z-10">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-yellow-200 opacity-30 blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
      </div>

      <div className="container mx-auto max-w-3xl text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pricepal-text mb-4">
            One Search. All Prices. <span className="text-pricepal-primary">Smarter Shopping</span> Starts Here.
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Instantly compare prices from Flipkart, Amazon, Croma, Zepto, Blinkit, and more—find the best deal before you buy.
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto animate-fade-in" style={{animationDelay: "0.2s"}}>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search for a product (e.g. iPhone 15, Samsung TV, Dettol Soap…)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-12 py-6 text-base md:text-lg w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <Button 
              type="submit" 
              size="lg"
              className="bg-pricepal-primary hover:bg-blue-700 text-white px-8 py-6 text-base md:text-lg shadow-sm hover:shadow-md transition-all hover:translate-y-[-2px]"
            >
              Compare Prices
            </Button>
          </div>
        </form>

        {/* Popular searches */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 animate-fade-in" style={{animationDelay: "0.4s"}}>
          <span className="text-sm text-gray-500">Popular:</span>
          {popularSearches.map((term) => (
            <HoverCard key={term}>
              <HoverCardTrigger asChild>
                <button
                  onClick={() => handlePopularSearch(term)}
                  className="text-sm text-pricepal-primary hover:text-blue-800 underline underline-offset-2 transition-colors"
                >
                  {term}
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-auto">
                <p className="text-xs text-gray-600">Click to search for {term}</p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
};
