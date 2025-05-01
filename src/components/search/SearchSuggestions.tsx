
import React from "react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { getSuggestions } from "@/services/mockData";
import { Skeleton } from "@/components/ui/skeleton";

export type SuggestionCategory = "products" | "brands" | "categories";

export interface Suggestion {
  id: string;
  text: string;
  category: SuggestionCategory;
  thumbnail?: string;
  popular?: boolean;
}

interface SearchSuggestionsProps {
  query: string;
  isOpen: boolean;
  isLoading?: boolean;
  onSelect: (value: string) => void;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export const SearchSuggestions = ({
  query,
  isOpen,
  isLoading = false,
  onSelect,
  onOpenChange,
  className,
}: SearchSuggestionsProps) => {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const [selectedValue, setSelectedValue] = React.useState("");
  
  // Generate mock suggestions when query changes
  React.useEffect(() => {
    if (query.trim().length === 0) {
      // Show popular searches when empty
      const popularSearches = getSuggestions("", true);
      setSuggestions(popularSearches);
      return;
    }
    
    // Add a small delay to simulate API request
    const timer = setTimeout(() => {
      const results = getSuggestions(query);
      setSuggestions(results);
    }, 150);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  // Group suggestions by category
  const productSuggestions = suggestions.filter(s => s.category === "products");
  const brandSuggestions = suggestions.filter(s => s.category === "brands");
  const categorySuggestions = suggestions.filter(s => s.category === "categories");
  
  // Helper to highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    try {
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const parts = text.split(regex);
      
      return (
        <>
          {parts.map((part, i) => 
            regex.test(part) ? 
              <span key={i} className="bg-yellow-100 text-yellow-900">{part}</span> : 
              <span key={i}>{part}</span>
          )}
        </>
      );
    } catch (e) {
      return text;
    }
  };
  
  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    onOpenChange(false);
  };
  
  return (
    <div className={cn("relative w-full", className)}>
      <Command className={cn(
        "absolute w-full top-0 rounded-lg border shadow-md bg-white overflow-hidden transition-all duration-300 z-50",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      )}>
        <CommandList>
          {isLoading ? (
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
            <>
              <CommandEmpty className="py-6 text-center text-sm">
                No results found.
              </CommandEmpty>
              
              {query.trim().length === 0 && (
                <CommandGroup heading="Popular Searches">
                  {suggestions.filter(s => s.popular).map((suggestion) => (
                    <CommandItem
                      key={suggestion.id}
                      onSelect={() => handleSelect(suggestion.text)}
                      className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-blue-50 animate-fade-in"
                    >
                      <span className="text-sm">{suggestion.text}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {productSuggestions.length > 0 && (
                <CommandGroup heading="Products">
                  {productSuggestions.map((suggestion, index) => (
                    <CommandItem
                      key={suggestion.id}
                      onSelect={() => handleSelect(suggestion.text)}
                      className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-blue-50 animate-fade-in"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      {suggestion.thumbnail && (
                        <img 
                          src={suggestion.thumbnail} 
                          alt="" 
                          className="w-8 h-8 object-cover rounded-sm" 
                        />
                      )}
                      <span className="text-sm">{highlightMatch(suggestion.text, query)}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {brandSuggestions.length > 0 && (
                <CommandGroup heading="Brands">
                  {brandSuggestions.map((suggestion, index) => (
                    <CommandItem
                      key={suggestion.id}
                      onSelect={() => handleSelect(suggestion.text)}
                      className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 animate-fade-in"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <span className="text-sm">{highlightMatch(suggestion.text, query)}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {categorySuggestions.length > 0 && (
                <CommandGroup heading="Categories">
                  {categorySuggestions.map((suggestion, index) => (
                    <CommandItem
                      key={suggestion.id}
                      onSelect={() => handleSelect(suggestion.text)}
                      className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 animate-fade-in"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <span className="text-sm">{highlightMatch(suggestion.text, query)}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </Command>
    </div>
  );
};
