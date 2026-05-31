import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  type: string;
  quote: string;
  avatar: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((c) => (c + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(interval);
  }, [testimonials.length]);

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-14">
      <ScrollReveal>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="section-label">Testimonials</p>
            <h2 className="section-title mt-1">Trusted by global trade leaders</h2>
          </div>
          <div className="hidden gap-1 sm:flex">
            <button
              onClick={() => setActiveIndex((c) => (c - 1 + testimonials.length) % testimonials.length)}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setActiveIndex((c) => (c + 1) % testimonials.length)}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="card overflow-hidden p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 lg:grid-cols-[1fr_auto]"
            >
              <div>
                <Quote size={24} className="mb-4 text-brand-200" />
                <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
                  "{current.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={current.avatar} alt={current.name} className="h-11 w-11 rounded-xl object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{current.name}</p>
                    <p className="text-xs text-slate-500">{current.role}, {current.company}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 lg:items-end">
                <span className="rounded-md bg-brand-50 px-2.5 py-1 text-[10px] font-semibold text-brand-700">
                  {current.type}
                </span>
                <div className="flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${activeIndex === i ? 'w-6 bg-brand-600' : 'w-1.5 bg-slate-200'}`}
                      aria-label={`Testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Testimonials;
