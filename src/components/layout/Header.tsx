
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`py-4 px-6 bg-white fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "shadow-md" : "shadow-sm"}`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <ShoppingBag size={24} className="text-pricepal-primary group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold text-pricepal-text">PricePal</span>
        </Link>
        
        {isScrolled && (
          <div className="hidden md:flex items-center max-w-md w-full mx-4 animate-fade-in">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Quick search..."
                className="pl-4 pr-10 py-2 text-sm w-full bg-gray-50"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <Button size="sm" className="ml-2 bg-pricepal-primary hover:bg-blue-700">
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
