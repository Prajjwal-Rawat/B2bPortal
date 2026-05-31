import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowRight, TrendingUp, Eye } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import ProductImage from './ProductImage';
import type { Product } from '../data/content';
import 'swiper/css';

interface TrendingProductsProps {
  products: Product[];
  recentlyViewed: Product[];
  onOpenProduct: (product: Product) => void;
}

const TrendingProducts = ({ products, recentlyViewed, onOpenProduct }: TrendingProductsProps) => {
  const trending = useMemo(() => products.slice(0, 6), [products]);

  return (
    <section id="trending" className="py-14">
      <ScrollReveal>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="section-label">Trending Products</p>
            <h2 className="section-title mt-1">High-demand B2B inventory</h2>
          </div>
          <a href="#products" className="btn-secondary hidden text-xs sm:inline-flex">
            View all <ArrowRight size={13} />
          </a>
        </div>
      </ScrollReveal>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        {/* <ScrollReveal delay={0.05}> */}
          <div className="trending-swiper overflow-hidden">
            <Swiper
              spaceBetween={12}
              slidesPerView={1.15}
              breakpoints={{
                480: { slidesPerView: 1.5 },
                640: { slidesPerView: 2.2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {trending.map((product, index) => (
                <SwiperSlide key={product.id}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    role="button"
                    tabIndex={0}
                    onClick={() => onOpenProduct(product)}
                    onKeyDown={(e) => e.key === 'Enter' && onOpenProduct(product)}
                    className="card cursor-pointer overflow-hidden text-left transition hover:shadow-card-hover"
                  >
                    <ProductImage
                      src={product.image}
                      alt={product.title}
                      className="h-36 w-full"
                      eager={index < 3}
                    />
                    <div className="p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-600">
                        {product.category}
                      </p>
                      <h3 className="mt-1 text-xs font-semibold text-slate-900 line-clamp-1">
                        {product.title}
                      </h3>
                      <div className="mt-2 flex items-center justify-between text-[10px]">
                        <span className="font-semibold text-slate-800">{product.price}</span>
                        <span className="text-slate-400">MOQ {product.moq.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        {/* </ScrollReveal> */}

        <ScrollReveal delay={0.1}>
          <div className="card h-full p-4">
            <div className="mb-3 flex items-center gap-2">
              <Eye size={14} className="text-brand-600" />
              <p className="text-xs font-semibold text-slate-900">Recently Viewed</p>
            </div>
            <div className="space-y-2">
              {recentlyViewed.length === 0 ? (
                <p className="text-xs text-slate-400">Browse products to see history</p>
              ) : (
                recentlyViewed.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => onOpenProduct(product)}
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-2.5 text-left transition hover:border-brand-200 hover:bg-brand-50/50"
                  >
                    <ProductImage src={product.image} alt={product.title} className="h-10 w-10 shrink-0 rounded-lg" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-slate-800">{product.title}</p>
                      <p className="text-[10px] text-slate-400">{product.supplier}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
            <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-2">
              <TrendingUp size={12} className="text-emerald-600" />
              <p className="text-[10px] font-medium text-emerald-700">+18% inquiry growth this week</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrendingProducts;
