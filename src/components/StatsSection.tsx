import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Stat {
  label: string;
  value: number;
  suffix: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

const StatsSection = ({ stats }: StatsSectionProps) => {
  const [displayValues, setDisplayValues] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    const targetValues = stats.map((item) => item.value);
    const durations = targetValues.map((value) => 900 + Math.round(value / 1000));
    const steps = targetValues.map((value) => Math.max(30, Math.round(value / 30)));

    const intervalIds: number[] = [];

    targetValues.forEach((target, index) => {
      let current = 0;
      const intervalId = window.setInterval(() => {
        current += Math.ceil(target / steps[index]);
        if (current >= target) {
          current = target;
          window.clearInterval(intervalId);
        }
        setDisplayValues((values) => values.map((val, idx) => (idx === index ? current : val)));
      }, durations[index] / steps[index]);
      intervalIds.push(intervalId);
    });

    return () => intervalIds.forEach((id) => window.clearInterval(id));
  }, [stats]);

  return (
    <section className="mt-24 rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-glow backdrop-blur-xl">
      <div className="grid gap-8 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="rounded-3xl bg-white/5 p-6"
          >
            <p className="text-4xl font-semibold text-white">{displayValues[index].toLocaleString()}{stat.suffix}</p>
            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
