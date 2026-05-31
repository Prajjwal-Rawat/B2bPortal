import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageSquare } from 'lucide-react';

interface InquiryModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

const InquiryModal = ({ open, onClose, title = 'Send Inquiry', subtitle = 'Connect with the supplier directly' }: InquiryModalProps) => (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative z-10 w-full max-w-md rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl"
        >
          <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-1.5 hover:bg-slate-100" aria-label="Close">
            <X size={18} />
          </button>

          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <MessageSquare size={18} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
              <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
          </div>

          <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Company email</label>
              <input type="email" placeholder="name@company.com" className="input-field text-xs" required />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Quantity needed</label>
              <input type="text" placeholder="e.g. 5,000 units" className="input-field text-xs" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Message</label>
              <textarea
                rows={3}
                placeholder="Describe your requirements, timeline, and destination..."
                className="input-field resize-none text-xs"
              />
            </div>
            <button type="submit" className="btn-primary w-full text-xs">
              <Send size={14} /> Submit Inquiry
            </button>
          </form>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default InquiryModal;
