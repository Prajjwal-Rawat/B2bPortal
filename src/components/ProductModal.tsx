import { motion } from 'framer-motion';
import { X, ShieldCheck, MapPin, Clock, Package, MessageSquare } from 'lucide-react';
import type { Product } from '../data/content';

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onInquire: () => void;
}

const ProductModal = ({ product, open, onClose, onInquire }: ProductModalProps) => {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-lg bg-white/90 p-1.5 text-slate-600 shadow-sm hover:bg-slate-100"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <img src={product.image} alt={product.title} className="h-48 w-full object-cover sm:h-56" />

        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-600">{product.category}</span>
            {product.verified && (
              <span className="badge-verified"><ShieldCheck size={10} /> Verified Supplier</span>
            )}
          </div>

          <h2 className="mt-2 text-xl font-semibold text-slate-900">{product.title}</h2>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <MapPin size={13} /> {product.supplier} · {product.country}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <Package size={14} className="mx-auto text-slate-400" />
              <p className="mt-1 text-[10px] text-slate-400">MOQ</p>
              <p className="text-sm font-semibold">{product.moq.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <Clock size={14} className="mx-auto text-slate-400" />
              <p className="mt-1 text-[10px] text-slate-400">Lead Time</p>
              <p className="text-sm font-semibold">{product.leadTime}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="mt-1 text-[10px] text-slate-400">Response</p>
              <p className="text-sm font-semibold text-emerald-600">{product.responseRate}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            <span className="text-sm text-slate-500">Price range</span>
            <span className="text-lg font-semibold text-slate-900">{product.price}</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.certifications.map((cert) => (
              <span key={cert} className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">{cert}</span>
            ))}
          </div>

          <div className="mt-5 flex gap-3">
            <button onClick={onInquire} className="btn-primary flex-1 text-xs">
              <MessageSquare size={14} /> Send Inquiry
            </button>
            <button onClick={onClose} className="btn-secondary text-xs">Close</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
