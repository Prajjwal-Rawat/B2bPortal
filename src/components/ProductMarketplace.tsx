import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Filter, Search, ShieldCheck, MapPin, Clock, MessageSquare, X } from 'lucide-react';
import FilterSidebar, { FilterState } from './FilterSidebar';
import ScrollReveal from './ScrollReveal';
import type { Product } from '../data/content';

interface ProductMarketplaceProps {
  products: Product[];
  categories: { id: string; name: string }[];
  onOpenProduct: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  isLoading: boolean;
}

const defaultFilters: FilterState = {
  category: 'all',
  country: 'all',
  moqMax: 10000,
  priceMax: 50000,
  verifiedOnly: false,
  exportOnly: false,
  minResponseRate: 80,
  certification: 'all',
};

const parsePriceMax = (priceLabel: string) => {
  const match = priceLabel.match(/\$?\s*([\d,]+)(?:\s*-\s*\$?\s*([\d,]+))?/);
  if (!match) return 0;
  return Number((match[2] || match[1]).replace(/,/g, ''));
};

const parseResponseRate = (rate: string) => parseInt(rate, 10);

const ProductSkeleton = () => (
  <div className="card overflow-hidden">
    <div className="skeleton-shimmer h-44 w-full" />
    <div className="space-y-3 p-4">
      <div className="skeleton h-3 w-1/3" />
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-3 w-1/2" />
      <div className="grid grid-cols-2 gap-2">
        <div className="skeleton h-12" />
        <div className="skeleton h-12" />
      </div>
      <div className="skeleton h-9 w-full rounded-xl" />
    </div>
  </div>
);

const ProductMarketplace = ({
  products,
  categories,
  onOpenProduct,
  searchQuery,
  setSearchQuery,
  isLoading,
}: ProductMarketplaceProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const countries = useMemo(() => Array.from(new Set(products.map((p) => p.country))), [products]);
  const certifications = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.certifications))),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const categoryName = categories.find((c) => c.id === filters.category)?.name;
    return products.filter((item) => {
      const matchesQuery = [item.title, item.supplier, item.category, item.country]
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory = filters.category === 'all' || item.category === categoryName;
      const matchesMOQ = item.moq <= filters.moqMax;
      const matchesPrice = parsePriceMax(item.price) <= filters.priceMax;
      const matchesVerified = filters.verifiedOnly ? item.verified : true;
      const matchesExport = filters.exportOnly ? item.exportReady : true;
      const matchesCountry = filters.country === 'all' || item.country === filters.country;
      const matchesResponse = parseResponseRate(item.responseRate) >= filters.minResponseRate;
      const matchesCert =
        filters.certification === 'all' || item.certifications.includes(filters.certification);
      return (
        matchesQuery &&
        matchesCategory &&
        matchesMOQ &&
        matchesPrice &&
        matchesVerified &&
        matchesExport &&
        matchesCountry &&
        matchesResponse &&
        matchesCert
      );
    });
  }, [products, categories, searchQuery, filters]);

  return (
    <section id="products" className="py-14">
      <ScrollReveal>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label">Product Marketplace</p>
            <h2 className="section-title mt-1">Browse verified B2B inventory</h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredProducts.length} products · Real MOQ, pricing & lead times
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="btn-secondary text-xs xl:hidden"
          >
            <Filter size={14} /> Filters
          </button>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden xl:block">
          <div className="card sticky top-20 p-5">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              categories={categories}
              countries={countries}
              certifications={certifications}
            />
          </div>
        </aside>

        {/* Product grid */}
        <div>
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
            <Search size={16} className="shrink-0 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search within marketplace..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
              : filteredProducts.map((product, i) => (
                  <ScrollReveal key={product.id} delay={i * 0.04}>
                    <motion.article
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="card-interactive group overflow-hidden"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {product.verified && (
                          <span className="badge-verified absolute left-3 top-3">
                            <ShieldCheck size={11} /> Verified
                          </span>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-600">
                            {product.category}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400">
                            {product.responseRate} response
                          </span>
                        </div>

                        <h3 className="text-sm font-semibold leading-snug text-slate-900 line-clamp-2">
                          {product.title}
                        </h3>

                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          <MapPin size={11} />
                          {product.supplier} · {product.country}
                        </p>

                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div className="rounded-lg bg-slate-50 px-2.5 py-2">
                            <p className="text-[10px] text-slate-400">MOQ</p>
                            <p className="text-xs font-semibold text-slate-800">{product.moq.toLocaleString()}</p>
                          </div>
                          <div className="rounded-lg bg-slate-50 px-2.5 py-2">
                            <p className="text-[10px] text-slate-400">Lead time</p>
                            <p className="text-xs font-semibold text-slate-800">{product.leadTime}</p>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-900">{product.price}</p>
                          {product.exportReady && (
                            <span className="text-[10px] font-medium text-emerald-600">Export ready</span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => onOpenProduct(product)}
                          className="btn-primary mt-3 w-full text-xs py-2"
                        >
                          <MessageSquare size={13} /> Request RFQ
                        </button>
                      </div>
                    </motion.article>
                  </ScrollReveal>
                ))}
          </div>

          {!isLoading && filteredProducts.length === 0 && (
            <div className="card py-16 text-center">
              <p className="text-sm font-medium text-slate-600">No products match your filters.</p>
              <button type="button" onClick={() => setFilters(defaultFilters)} className="btn-secondary mt-4 text-xs">
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm xl:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-sm overflow-y-auto bg-white p-6 shadow-2xl xl:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Filter Products</h3>
                <button type="button" onClick={() => setDrawerOpen(false)} className="rounded-lg p-1.5 hover:bg-slate-100">
                  <X size={18} />
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                categories={categories}
                countries={countries}
                certifications={certifications}
              />
              <button type="button" onClick={() => setDrawerOpen(false)} className="btn-primary mt-6 w-full text-xs">
                Show {filteredProducts.length} results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductMarketplace;
