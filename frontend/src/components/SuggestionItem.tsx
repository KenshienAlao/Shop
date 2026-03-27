import React from "react";
import { SearchIcon } from "lucide-react";
import { Product } from "@/services/productService";

interface SuggestionItemProps {
  item: Product;
  onClick: (title: string) => void;
}

const SuggestionItem = ({
  item,
  onClick
}: SuggestionItemProps) => (
  <button
    onClick={() => onClick(item.title)}
    className="flex items-center gap-3 w-full p-4 text-start hover:bg-gray-50 rounded-lg transition-all border-b border-gray-50 last:border-0"
  >
    <SearchIcon size={16} className="text-gray-400 shrink-0" />
    <span className="text-gray-800 font-medium truncate">{item.title}</span>
  </button>
);

export default SuggestionItem;
