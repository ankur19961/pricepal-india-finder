import { ShoppingBag, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";
import { useDebounce } from "@/hooks/useDebounce";
import { getSuggestions } from "@/services/productApi";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchQuery, 300);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    if (debouncedSearchTerm !== searchQuery) {
      setIsLoading(true);
    } else {
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [debouncedSearchTerm, searchQuery]);
  
  const handleSuggestionSelect = (value: string) => {
    setSearchQuery(value);
    // Scroll to results section and handle search
    const results = document.getElementById("results");
    if (results) {
      setTimeout(() => {
        results.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };
  
  const handleQuickSearch = () => {
    if (searchQuery.trim()) {
      // Scroll to results section and handle search
      const results = document.getElementById("results");
      if (results) {
        setTimeout(() => {
          results.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsSuggestionsOpen(false);
    } else if (e.key === "Enter") {
      handleQuickSearch();
      setIsSuggestionsOpen(false);
    }
  };

  return (
    <header className={`py-4 px-6 bg-white fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "shadow-md" : "shadow-sm"}`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <ShoppingBag size={24} className="text-pricepal-primary group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold text-pricepal-text">PricePal</span>
        </Link>
        
        {isScrolled && (
          <div className="hidden md:flex items-center max-w-md w-full mx-4 animate-fade-in relative">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Quick search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSuggestionsOpen(true)}
                onKeyDown={handleKeyDown}
                className="pl-4 pr-10 py-2 text-sm w-full bg-gray-50"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              
              {/* Search suggestions in header */}
              <SearchSuggestions
                query={searchQuery}
                isOpen={isSuggestionsOpen}
                isLoading={isLoading}
                onSelect={handleSuggestionSelect}
                onOpenChange={setIsSuggestionsOpen}
                className="mt-1"
              />
            </div>
            <Button 
              size="sm" 
              className="ml-2 bg-pricepal-primary hover:bg-blue-700"
              onClick={handleQuickSearch}
            >
              Search
            </Button>
          </div>
        )}

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-pricepal-text hover:text-pricepal-primary transition-colors">
            Home
          </Link>
          <Link to="/#how-it-works" className="text-sm text-pricepal-text hover:text-pricepal-primary transition-colors">
            How It Works
          </Link>
          <Link to="/contact" className="text-sm text-pricepal-text hover:text-pricepal-primary transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};
