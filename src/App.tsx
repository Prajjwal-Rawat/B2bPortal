import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedCompanies from './components/TrustedCompanies';
import ProductMarketplace from './components/ProductMarketplace';
import TrendingProducts from './components/TrendingProducts';
import LiveRFQ from './components/LiveRFQ';
import SupplierShowcase from './components/SupplierShowcase';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import MembershipPlans from './components/MembershipPlans';
import AIRecommendation from './components/AIRecommendation';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import SupplierModal from './components/SupplierModal';
import InquiryModal from './components/InquiryModal';
import StickySearchBar from './components/StickySearchBar';
import {
  categories,
  products,
  suppliers,
  membershipPlans,
  rfqs,
  recommendations,
  trustedCompanies,
  testimonials,
  type Product,
  type Supplier,
  type RFQ,
} from './data/content';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeSupplier, setActiveSupplier] = useState<Supplier | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryContext, setInquiryContext] = useState({ title: 'Send Inquiry', subtitle: 'Connect with the supplier directly' });
  const [isLoading, setIsLoading] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [stickySearchVisible, setStickySearchVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 1200);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const onScroll = () => setStickySearchVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleOpenProduct = (product: Product) => {
    setActiveProduct(product);
    setRecentlyViewed((current) => [product, ...current.filter((item) => item.id !== product.id)].slice(0, 4));
  };

  const openInquiry = (title: string, subtitle: string) => {
    setInquiryContext({ title, subtitle });
    setInquiryOpen(true);
  };

  const handleRFQInquire = (rfq: RFQ) => {
    openInquiry('Respond to RFQ', rfq.title);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <StickySearchBar
        visible={stickySearchVisible}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <TrustedCompanies companies={trustedCompanies} />

        <ProductMarketplace
          products={products}
          categories={categories}
          onOpenProduct={handleOpenProduct}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isLoading={isLoading}
        />

        <TrendingProducts
          products={products}
          recentlyViewed={recentlyViewed}
          onOpenProduct={handleOpenProduct}
        />

        <LiveRFQ rfqs={rfqs} onInquire={handleRFQInquire} />

        <SupplierShowcase suppliers={suppliers} onOpenSupplier={setActiveSupplier} />

        <AnalyticsDashboard />

        <MembershipPlans plans={membershipPlans} />

        <AIRecommendation recommendations={recommendations} />

        <Testimonials testimonials={testimonials} />
      </main>

      <Footer />

      <AnimatePresence>
        {activeProduct && (
          <ProductModal
            product={activeProduct}
            open={Boolean(activeProduct)}
            onClose={() => setActiveProduct(null)}
            onInquire={() => {
              openInquiry('Product Inquiry', `Inquire about ${activeProduct.title}`);
              setActiveProduct(null);
            }}
          />
        )}
        {activeSupplier && (
          <SupplierModal
            supplier={activeSupplier}
            open={Boolean(activeSupplier)}
            onClose={() => setActiveSupplier(null)}
            onInquire={() => {
              openInquiry('Supplier Inquiry', `Connect with ${activeSupplier.name}`);
              setActiveSupplier(null);
            }}
          />
        )}
      </AnimatePresence>

      <InquiryModal
        open={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        title={inquiryContext.title}
        subtitle={inquiryContext.subtitle}
      />

      <div className="fixed bottom-5 right-5 z-50">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="mb-3 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-card-hover"
            >
              <p className="text-sm font-semibold text-slate-900">Support Chat</p>
              <p className="mt-1 text-xs text-slate-500">Our team typically responds within 2 hours.</p>
              <input placeholder="Type a message..." className="input-field mt-3 text-xs py-2" />
              <button onClick={() => setChatOpen(false)} className="btn-primary mt-2 w-full text-xs py-2">
                Send Message
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="flex items-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700"
        >
          <MessageCircle size={18} />
          <span className="hidden sm:inline">Support</span>
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-emerald-400" />
        </button>
      </div>
    </div>
  );
}

export default App;
