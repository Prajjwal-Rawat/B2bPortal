import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  accent: string;
}

interface CategoryGridProps {
  categories: Category[];
  selected: string;
  onSelect: (value: string) => void;
}

const CategoryGrid = ({ categories, selected, onSelect }: CategoryGridProps) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category, index) => {
        const Icon = category.icon;
        return (
          <motion.button
            key={category.id}
            whileHover={{ y: -6 }}
            onClick={() => onSelect(category.id)}
            className={`relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/80 p-6 text-left transition ${
              selected === category.id ? 'shadow-glow ring-1 ring-cyan-400/30' : 'hover:border-cyan-400/25 hover:bg-slate-900/80'
            }`}
          >
            <span className={`absolute left-0 top-0 h-1/2 w-full bg-gradient-to-r ${category.accent} opacity-10`} />
            <div className="relative z-10 flex items-center gap-4">
              <span className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-white/5 text-slate-100`}>
                <Icon size={24} />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                <p className="mt-2 text-sm text-slate-400">Premium sourcing for your growing supply chain.</p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryGrid;
