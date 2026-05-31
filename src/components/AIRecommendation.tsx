import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Truck, TrendingUp, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Recommendation {
  id: string;
  title: string;
  supplier: string;
  trustScore: number;
  shipping: string;
  badge: string;
  price: string;
  responseProb: string;
  exportReady: boolean;
  matchScore: number;
}

interface AIRecommendationProps {
  recommendations: Recommendation[];
}

const AIRecommendation = ({ recommendations }: AIRecommendationProps) => (
  <section id="ai-match" className="py-14">
    <ScrollReveal>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-label flex items-center gap-1.5">
            <Sparkles size={12} /> AI Supplier Matching
          </p>
          <h2 className="section-title mt-1">Intelligent supplier recommendations</h2>
          <p className="mt-1 text-sm text-slate-500">ML-powered matching based on your sourcing requirements</p>
        </div>
      </div>
    </ScrollReveal>

    <div className="grid gap-4 lg:grid-cols-3">
      {recommendations.map((item, i) => (
        <ScrollReveal key={item.id} delay={i * 0.08}>
          <motion.div
            whileHover={{ y: -4 }}
            className="card relative overflow-hidden p-5"
          >
            {/* AI badge glow */}
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-100/40 blur-2xl" />

            <div className="relative">
              <div className="mb-3 flex items-start justify-between gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700 ring-1 ring-brand-200/60">
                  <Sparkles size={10} /> {item.badge}
                </span>
                <span className="text-[10px] font-medium text-slate-400">Match {item.matchScore}%</span>
              </div>

              <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{item.supplier}</p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <ShieldCheck size={10} /> Trust score
                  </div>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{item.trustScore}%</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Truck size={10} /> Shipping
                  </div>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{item.shipping}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-slate-500">
                  <TrendingUp size={11} /> Response prob.
                </span>
                <span className="font-semibold text-emerald-600">{item.responseProb}</span>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500">Price range</span>
                <span className="font-semibold text-slate-900">{item.price}</span>
              </div>

              <button className="btn-primary mt-4 w-full text-xs py-2">
                View Match <ArrowRight size={13} />
              </button>
            </div>
          </motion.div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default AIRecommendation;
