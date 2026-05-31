import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface TrustedCompaniesProps {
  companies: { name: string; abbr: string }[];
}

const TrustedCompanies = ({ companies }: TrustedCompaniesProps) => (
  <ScrollReveal className="py-10">
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
      <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
        Trusted by enterprise procurement teams
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
        {companies.map((company, i) => (
          <motion.div
            key={company.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.05, filter: 'grayscale(0%)' }}
            className="group flex cursor-default items-center gap-2 grayscale transition-all duration-300 hover:grayscale-0"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-400 transition group-hover:bg-brand-50 group-hover:text-brand-600">
              {company.abbr}
            </span>
            <span className="text-sm font-semibold text-slate-400 transition group-hover:text-slate-700">
              {company.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </ScrollReveal>
);

export default TrustedCompanies;
