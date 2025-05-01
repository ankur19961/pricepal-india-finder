
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PricePal</h3>
            <p className="text-sm text-gray-600 mb-4">
              One Search. All Prices. Smarter Shopping Starts Here.
            </p>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-pricepal-primary" />
              <Link to="/contact" className="text-sm text-pricepal-primary hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-gray-600 hover:text-pricepal-primary flex items-center gap-1">
                <ArrowRight size={14} /> Home
              </Link>
              <Link to="/#how-it-works" className="text-sm text-gray-600 hover:text-pricepal-primary flex items-center gap-1">
                <ArrowRight size={14} /> How It Works
              </Link>
              <Link to="/privacy-policy" className="text-sm text-gray-600 hover:text-pricepal-primary flex items-center gap-1">
                <ArrowRight size={14} /> Privacy Policy
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Affiliate Disclaimer</h3>
            <p className="text-sm text-gray-600">
              As an affiliate, we may earn a small commission when you buy through our links—at no extra cost to you.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} PricePal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
