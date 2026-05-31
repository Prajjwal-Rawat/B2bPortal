import { Globe, ChevronRight, Clock, Award } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import type { Supplier } from '../data/content';

interface SupplierShowcaseProps {
  suppliers: Supplier[];
  onOpenSupplier: (supplier: Supplier) => void;
}

const SupplierCard = ({ supplier, onOpen }: { supplier: Supplier; onOpen: () => void }) => (
  <div className="card w-[280px] shrink-0 p-4 transition hover:shadow-card-hover">
    <div className="flex items-start justify-between">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-xs font-bold text-white">
        {supplier.logo}
      </div>
      <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
        {supplier.badge}
      </span>
    </div>

    <h3 className="mt-3 text-sm font-semibold text-slate-900">{supplier.name}</h3>
    <p className="mt-0.5 text-xs text-slate-500">{supplier.productSpecialization}</p>

    <div className="mt-3 grid grid-cols-2 gap-2">
      <div className="rounded-lg bg-slate-50 px-2.5 py-2">
        <p className="text-[10px] text-slate-400">Trust score</p>
        <p className="text-sm font-semibold text-slate-900">{supplier.trust}%</p>
      </div>
      <div className="rounded-lg bg-slate-50 px-2.5 py-2">
        <p className="text-[10px] text-slate-400">Response</p>
        <p className="text-sm font-semibold text-slate-900">{supplier.response}</p>
      </div>
    </div>

    <div className="mt-3 flex flex-wrap gap-1.5">
      <span className="flex items-center gap-1 text-[10px] text-slate-500">
        <Globe size={10} /> {supplier.countries}
      </span>
      <span className="flex items-center gap-1 text-[10px] text-slate-500">
        <Clock size={10} /> {supplier.years}
      </span>
    </div>

    <div className="mt-2 flex flex-wrap gap-1">
      {supplier.certifications.slice(0, 2).map((cert) => (
        <span key={cert} className="flex items-center gap-0.5 rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700">
          <Award size={8} /> {cert}
        </span>
      ))}
    </div>

    <button
      type="button"
      onClick={onOpen}
      className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
    >
      View Profile <ChevronRight size={12} />
    </button>
  </div>
);

const SupplierShowcase = ({ suppliers, onOpenSupplier }: SupplierShowcaseProps) => (
  <section id="suppliers" className="py-14">
    <ScrollReveal>
      <div className="mb-6">
        <p className="section-label">Supplier Showcase</p>
        <h2 className="section-title mt-1">Verified global manufacturers</h2>
        <p className="mt-1 text-sm text-slate-500">Premium supplier profiles with trust scores and export capabilities</p>
      </div>
    </ScrollReveal>

    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-50 to-transparent" />
      <div className="flex animate-scroll gap-4 py-2">
        {suppliers.concat(suppliers).map((supplier, i) => (
          <SupplierCard
            key={`${supplier.id}-${i}`}
            supplier={supplier}
            onOpen={() => onOpenSupplier(supplier)}
          />
        ))}
      </div>
    </div>
  </section>
);

export default SupplierShowcase;
