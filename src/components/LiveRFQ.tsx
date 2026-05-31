import { motion } from 'framer-motion';
import { Clock, MapPin, Package, MessageSquare, Zap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import type { RFQ } from '../data/content';

interface LiveRFQProps {
  rfqs: RFQ[];
  onInquire?: (rfq: RFQ) => void;
}

const urgencyStyles = {
  High: 'badge-urgent',
  Medium: 'badge-medium',
  Low: 'badge-low',
} as const;

const LiveRFQ = ({ rfqs, onInquire }: LiveRFQProps) => (
  <section id="rfqs" className="py-14">
    <ScrollReveal>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-label">Latest Buyer Requirements</p>
          <h2 className="section-title mt-1">Live RFQ feed</h2>
          <p className="mt-1 text-sm text-slate-500">Real-time procurement requests from global buyers</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
          {rfqs.length} active requests
        </span>
      </div>
    </ScrollReveal>

    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {rfqs.map((rfq, i) => (
        <ScrollReveal key={rfq.id} delay={i * 0.05}>
          <motion.div whileHover={{ y: -3 }} className="card-interactive flex h-full flex-col p-4">
            <div className="mb-3 flex items-start justify-between gap-2">
              <span className={urgencyStyles[rfq.urgency]}>
                <Zap size={10} /> {rfq.urgency}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-slate-400">
                <Clock size={10} /> {rfq.time}
              </span>
            </div>

            <h3 className="text-sm font-semibold leading-snug text-slate-900">{rfq.title}</h3>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-600">
                <MapPin size={10} /> {rfq.country}
              </span>
              <span className="flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-600">
                <Package size={10} /> {rfq.quantity}
              </span>
            </div>

            <p className="mt-2 text-[10px] font-medium text-brand-600">{rfq.category}</p>

            <button
              type="button"
              onClick={() => onInquire?.(rfq)}
              className="btn-primary mt-auto pt-4 text-xs py-2 w-full"
            >
              <MessageSquare size={13} /> Submit Inquiry
            </button>
          </motion.div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default LiveRFQ;
