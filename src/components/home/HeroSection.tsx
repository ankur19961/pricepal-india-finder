
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <section className="bg-white pt-16 pb-24 px-6">
      <div className="container mx-auto max-w-3xl text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pricepal-text mb-4 animate-fade-in">
          One Search. All Prices. <span className="text-pricepal-primary">Smarter Shopping</span> Starts Here.
        </h1>
        <p className="text-lg text-gray-600 mb-8 animate-fade-in">
          Instantly compare prices from Flipkart, Amazon, Croma, Zepto, Blinkit, and more—find the best deal before you buy.
        </p>
        
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto animate-fade-in">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search for a product (e.g. iPhone 15, Samsung TV, Dettol Soap…)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-12 py-6 text-base md:text-lg w-full bg-gray-50 border border-gray-200 rounded-lg"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <Button 
              type="submit" 
              size="lg"
              className="bg-pricepal-primary hover:bg-blue-700 text-white px-8 py-6 text-base md:text-lg"
            >
              Compare Prices
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
