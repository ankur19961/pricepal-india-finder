
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SearchResults, Product } from "@/components/home/SearchResults";
import { searchProducts } from "@/services/mockData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = searchProducts(query);
    setProducts(results);
    
    // Scroll to results section
    if (results.length > 0) {
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection onSearch={handleSearch} />
        <SearchResults products={products} searchQuery={searchQuery} />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
