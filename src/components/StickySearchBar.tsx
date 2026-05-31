import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import { categories } from '../data/content';

interface StickySearchBarProps {
  visible: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategorySelect: (value: string) => void;
}

const StickySearchBar = ({
  visible,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
}: StickySearchBarProps) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed top-[57px] z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2 sm:px-6 lg:px-8">
          <div className="relative flex flex-1 items-center rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <Search size={14} className="shrink-0 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products, suppliers..."
              className="w-full bg-transparent pl-2 text-xs outline-none placeholder:text-slate-400"
            />
          </div>
          <div className="relative hidden sm:block">
            <select
              value={selectedCategory}
              onChange={(e) => onCategorySelect(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-medium text-slate-700 outline-none"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default StickySearchBar;
