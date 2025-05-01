
import { Search, ShoppingBag, Banknote, ExternalLink } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Search size={28} />,
      title: "Search",
      description: "Enter any product name in the search bar"
    },
    {
      icon: <ShoppingBag size={28} />,
      title: "Compare",
      description: "We search all major Indian shopping sites instantly"
    },
    {
      icon: <Banknote size={28} />,
      title: "Save",
      description: "You compare prices side-by-side"
    },
    {
      icon: <ExternalLink size={28} />,
      title: "Shop",
      description: "Click and shop directly via our affiliate links"
    }
  ];

  return (
    <section className="py-16 px-6" id="how-it-works">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            PricePal lets you compare prices across top Indian e-commerce platforms in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-pricepal-primary">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 bg-gray-50 p-6 rounded-lg max-w-2xl mx-auto">
          <p className="text-lg font-medium text-pricepal-text">
            It's fast, simple, and always free!
          </p>
        </div>
      </div>
    </section>
  );
};
