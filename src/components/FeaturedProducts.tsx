import { motion } from 'framer-motion';

interface Product {
  id: string;
  title: string;
  category: string;
  supplier: string;
  price: string;
  moq: string;
  rating: number;
  badge: string;
  image: string;
}

interface FeaturedProductsProps {
  products: Product[];
  isLoading: boolean;
  onInquiry: (product: Product) => void;
  selectedCategory: string;
  searchQuery: string;
}

const FeaturedProducts = ({ products, isLoading, onInquiry, selectedCategory, searchQuery }: FeaturedProductsProps) => {
  return (
    <section id="products" className="mt-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <span className="inline-flex rounded-full bg-slate-900/70 px-4 py-2 text-sm text-cyan-300/90">
            Featured deals & curated lead times
          </span>
          <div>
            <h2 className="text-4xl font-semibold text-white sm:text-5xl">Handpicked supplier products for premium businesses.</h2>
            <p className="max-w-2xl pt-4 text-slate-400">
              Filtered by your industry and interest: <span className="text-cyan-300">{selectedCategory}</span> — search matches for <span className="text-cyan-300">"{searchQuery}"</span>.
            </p>
          </div>
        </div>
        <button className="btn-outline-glow">View full inventory</button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
                <div className="h-52 animate-pulse rounded-3xl bg-slate-800" />
                <div className="mt-5 space-y-4">
                  <div className="h-4 w-3/5 animate-pulse rounded-full bg-slate-800" />
                  <div className="h-4 w-2/5 animate-pulse rounded-full bg-slate-800" />
                  <div className="grid gap-3">
                    <div className="h-12 animate-pulse rounded-3xl bg-slate-800" />
                    <div className="h-12 animate-pulse rounded-3xl bg-slate-800" />
                  </div>
                </div>
              </div>
            ))
          : products.map((product, index) => (
              <motion.article
                key={product.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group rounded-[32px] border border-white/10 bg-slate-950/90 p-5 shadow-glow backdrop-blur-xl"
              >
                <div className="relative overflow-hidden rounded-3xl border border-white/10">
                  <img src={product.image} alt={product.title} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-2 text-xs text-cyan-300 backdrop-blur-xl">
                    {product.badge}
                  </span>
                </div>
                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{product.category}</span>
                    <span className="text-sm text-slate-300">{product.rating} ★</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{product.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{product.supplier}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                      <span className="block text-slate-400">MOQ</span>
                      <span className="mt-2 block text-base font-semibold text-white">{product.moq}</span>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                      <span className="block text-slate-400">Price range</span>
                      <span className="mt-2 block text-base font-semibold text-white">{product.price}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onInquiry(product)}
                    className="btn-glow w-full justify-center"
                  >
                    Inquiry now
                  </button>
                </div>
              </motion.article>
            ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
