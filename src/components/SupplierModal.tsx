import { motion } from 'framer-motion';
import { X, ShieldCheck, Globe, Clock, Award, MessageSquare } from 'lucide-react';
import type { Supplier } from '../data/content';

interface SupplierModalProps {
  supplier: Supplier | null;
  open: boolean;
  onClose: () => void;
  onInquire: () => void;
}

const SupplierModal = ({ supplier, open, onClose, onInquire }: SupplierModalProps) => {
  if (!open || !supplier) return null;

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

        <div className="bg-gradient-to-br from-brand-600 to-brand-700 px-6 py-8 text-white">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-sm font-bold backdrop-blur">
              {supplier.logo}
            </div>
            <div>
              <span className="rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-semibold">{supplier.badge}</span>
              <h2 className="mt-1 text-xl font-semibold">{supplier.name}</h2>
              <p className="text-sm text-brand-100">{supplier.productSpecialization}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Trust Score', value: `${supplier.trust}%`, icon: ShieldCheck },
              { label: 'Response', value: supplier.response, icon: Clock },
              { label: 'Experience', value: supplier.years, icon: Award },
              { label: 'Export', value: supplier.countries, icon: Globe },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-xl bg-slate-50 p-3 text-center">
                <Icon size={14} className="mx-auto text-slate-400" />
                <p className="mt-1 text-[10px] text-slate-400">{label}</p>
                <p className="text-xs font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold text-slate-900">Certifications</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {supplier.certifications.map((cert) => (
                <span key={cert} className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-700">
                  <Award size={12} className="text-emerald-500" /> {cert}
                  <span className="text-[10px] text-emerald-600">Verified</span>
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <button onClick={onInquire} className="btn-primary flex-1 text-xs">
              <MessageSquare size={14} /> Connect with Supplier
            </button>
            <button onClick={onClose} className="btn-secondary text-xs">Close</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SupplierModal;
