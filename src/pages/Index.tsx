import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SearchResults, Product } from "@/components/home/SearchResults";
import { searchProducts } from "@/services/productApi";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    try {
      // Fetch real products using the API
      const results = await searchProducts(query);
      setProducts(results);
      
      // Scroll to results section
      if (results.length > 0) {
        setTimeout(() => {
          document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Add padding-top to account for fixed header */}
      <main className="flex-grow pt-16">
        <HeroSection onSearch={handleSearch} />
        <SearchResults 
          products={products} 
          searchQuery={searchQuery}
          isLoading={isSearching}
        />
        <HowItWorks />
        
        {/* Scroll to top button */}
        {showScrollButton && (
          <Button 
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 rounded-full w-12 h-12 bg-pricepal-primary hover:bg-blue-700 shadow-lg p-0 animate-fade-in z-30"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
