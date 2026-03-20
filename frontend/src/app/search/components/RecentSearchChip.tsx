import React from "react";
import { Trash2 } from "lucide-react";

interface RecentSearchChipProps {
  item: string;
  onSearch: (q: string) => void;
  onRemove: (q: string) => void;
}

const RecentSearchChip = ({ 
  item, 
  onSearch, 
  onRemove 
}: RecentSearchChipProps) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-transparent hover:border-accent group transition-all duration-200">
    <button
      className="text-sm font-medium text-gray-700"
      onClick={() => onSearch(item)}
    >
      {item}
    </button>
    <button
      onClick={() => onRemove(item)}
      className="text-gray-300 hover:text-red-500 transition-colors"
      aria-label={`Remove ${item} from history`}
    >
      <Trash2 size={16} />
    </button>
  </div>
);

export default RecentSearchChip;
