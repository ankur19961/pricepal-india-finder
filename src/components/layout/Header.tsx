
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="py-4 px-6 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBag size={24} className="text-pricepal-primary" />
          <span className="text-xl font-bold text-pricepal-text">PricePal</span>
        </Link>
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
