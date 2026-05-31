import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface WhyChooseUsProps {
  features: Feature[];
}

const WhyChooseUs = ({ features }: WhyChooseUsProps) => {
  return (
    <section id="about" className="mt-24">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-slate-900/70 px-4 py-2 text-sm text-cyan-300/90">
            Built for B2B partners and enterprise workflows
          </span>
          <h2 className="text-4xl font-semibold text-white sm:text-5xl">Why modern teams choose Nova for supplier sourcing.</h2>
          <p className="max-w-xl text-slate-400">
            Our curated marketplace combines trust, intelligent discovery, and a premium interface designed to help procurement teams move faster and close better deals.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="card-frost"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-slate-950 shadow-glow">
                  <Icon size={24} />
                </div>
                <div className="mt-5 space-y-2">
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm leading-6 text-slate-400">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
