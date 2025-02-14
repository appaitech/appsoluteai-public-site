import { Filter } from 'lucide-react';

interface BlogFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const categories = [
  'All',
  'Artificial Intelligence',
  'Development',
  'Security',
  'No-Code',
  'Design',
  'Technology'
];

export function BlogFilter({ selectedCategory, onSelectCategory }: BlogFilterProps) {
  return (
    <div className="flex items-center space-x-4 overflow-x-auto pb-2">
      <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category === 'All' ? null : category)}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap
                     ${selectedCategory === (category === 'All' ? null : category)
                       ? 'bg-emerald-500 text-white'
                       : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
} 