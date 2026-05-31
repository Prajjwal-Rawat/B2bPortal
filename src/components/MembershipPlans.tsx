import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Plan {
  id: string;
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight: boolean;
}

interface MembershipPlansProps {
  plans: Plan[];
}

const MembershipPlans = ({ plans }: MembershipPlansProps) => (
  <section id="membership" className="py-14">
    <ScrollReveal>
      <div className="mb-8 text-center">
        <p className="section-label">Membership Plans</p>
        <h2 className="section-title mt-1">Scale your sourcing operation</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
          Enterprise-grade plans with RFQ management, AI matching, and dedicated support
        </p>
      </div>
    </ScrollReveal>

    <div className="grid gap-4 lg:grid-cols-3">
      {plans.map((plan, i) => (
        <ScrollReveal key={plan.id} delay={i * 0.08}>
          <motion.div
            whileHover={{ y: -4 }}
            className={`relative flex h-full flex-col rounded-2xl border p-6 transition ${
              plan.highlight
                ? 'border-brand-300 bg-white shadow-glow-lg ring-1 ring-brand-200/50'
                : 'border-slate-200 bg-white shadow-card'
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-[10px] font-semibold text-white shadow-sm">
                <Sparkles size={10} /> Most Popular
              </span>
            )}

            <h3 className="text-sm font-semibold text-slate-900">{plan.title}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-semibold text-slate-900">{plan.price}</span>
              <span className="text-xs text-slate-500">{plan.period}</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">{plan.description}</p>

            <ul className="mt-5 flex-1 space-y-2.5 border-t border-slate-100 pt-5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-xs text-slate-700">
                  <Check size={14} className="mt-0.5 shrink-0 text-brand-600" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`mt-6 w-full rounded-xl py-2.5 text-xs font-semibold transition ${
                plan.highlight
                  ? 'bg-brand-600 text-white shadow-sm hover:bg-brand-700'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              Choose {plan.title}
            </button>
          </motion.div>
        </ScrollReveal>
      ))}
    </div>

    {/* Feature comparison row */}
    <ScrollReveal delay={0.2}>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[600px] text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Feature</th>
              {plans.map((p) => (
                <th key={p.id} className={`px-4 py-3 text-center font-semibold ${p.highlight ? 'text-brand-600' : 'text-slate-600'}`}>
                  {p.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Supplier access', '250k+', '500k+', 'Unlimited'],
              ['AI matching', '—', '✓', '✓'],
              ['API access', '—', '—', '✓'],
              ['Dedicated advisor', '—', '—', '✓'],
              ['Support', 'Email', 'Live chat', 'Priority'],
            ].map(([feature, ...values]) => (
              <tr key={feature} className="border-b border-slate-50">
                <td className="px-4 py-2.5 font-medium text-slate-700">{feature}</td>
                {values.map((val, i) => (
                  <td key={i} className="px-4 py-2.5 text-center text-slate-600">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollReveal>
  </section>
);

export default MembershipPlans;
