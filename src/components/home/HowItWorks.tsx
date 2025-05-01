
import { Search, ShoppingBag, Banknote, ExternalLink } from "lucide-react";
import { useState } from "react";

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      icon: <Search size={28} />,
      title: "Search",
      description: "Enter any product name in the search bar",
      color: "bg-blue-500"
    },
    {
      icon: <ShoppingBag size={28} />,
      title: "Compare",
      description: "We search all major Indian shopping sites instantly",
      color: "bg-green-500"
    },
    {
      icon: <Banknote size={28} />,
      title: "Save",
      description: "You compare prices side-by-side",
      color: "bg-yellow-500"
    },
    {
      icon: <ExternalLink size={28} />,
      title: "Shop",
      description: "Click and shop directly via our affiliate links",
      color: "bg-purple-500"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50" id="how-it-works">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 relative inline-block">
            How It Works
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pricepal-primary to-transparent"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            PricePal lets you compare prices across top Indian e-commerce platforms in seconds.
          </p>
        </div>

        {/* Steps with progress bar */}
        <div className="relative max-w-5xl mx-auto mb-12">
          {/* Progress bar */}
          <div className="hidden md:block absolute top-16 left-0 w-full h-1 bg-gray-200 z-0">
            <div 
              className="h-full bg-pricepal-primary transition-all duration-500" 
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`text-center relative z-10 transition-all duration-300 ${
                  activeStep === index ? 'scale-105' : 'opacity-70'
                }`}
                onMouseEnter={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
              >
                <div 
                  className={`${step.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform shadow-md hover:shadow-lg ${
                    activeStep === index ? 'scale-110 shadow-lg' : ''
                  }`}
                >
                  {step.icon}
                </div>
                <div className={`hidden md:block absolute top-16 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${
                  index <= activeStep ? step.color : 'bg-gray-200'
                } border-4 border-white`}></div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 bg-white/80 backdrop-blur-sm p-8 rounded-lg max-w-2xl mx-auto border border-gray-100 shadow-sm hover:shadow-md transition-shadow transform hover:-translate-y-1">
          <p className="text-lg font-medium text-pricepal-text">
            It's fast, simple, and always free!
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {['Flipkart', 'Amazon', 'Myntra', 'Zepto', 'Blinkit'].map(retailer => (
              <span key={retailer} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                {retailer}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
