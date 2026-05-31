import { Filter, ShieldCheck, Globe } from 'lucide-react';

export interface FilterState {
  category: string;
  country: string;
  moqMax: number;
  priceMax: number;
  verifiedOnly: boolean;
  exportOnly: boolean;
  minResponseRate: number;
  certification: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  categories: { id: string; name: string }[];
  countries: string[];
  certifications: string[];
}

const FilterSidebar = ({ filters, onChange, categories, countries, certifications }: FilterSidebarProps) => {
  const update = (partial: Partial<FilterState>) => onChange({ ...filters, ...partial });

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Filter size={16} className="text-brand-600" />
        <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-xs font-medium text-slate-500">Category</label>
        <select
          value={filters.category}
          onChange={(e) => update({ category: e.target.value })}
          className="input-field text-xs"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Country */}
      <div>
        <label className="mb-2 block text-xs font-medium text-slate-500">Country</label>
        <select
          value={filters.country}
          onChange={(e) => update({ country: e.target.value })}
          className="input-field text-xs"
        >
          <option value="all">All countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* MOQ */}
      <div>
        <label className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
          <span>Max MOQ</span>
          <span className="font-semibold text-slate-700">{filters.moqMax.toLocaleString()}</span>
        </label>
        <input
          type="range"
          min={10}
          max={10000}
          step={10}
          value={filters.moqMax}
          onChange={(e) => update({ moqMax: Number(e.target.value) })}
          className="w-full accent-brand-600"
        />
      </div>

      {/* Price */}
      <div>
        <label className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
          <span>Max Price ($)</span>
          <span className="font-semibold text-slate-700">${filters.priceMax.toLocaleString()}</span>
        </label>
        <input
          type="range"
          min={100}
          max={50000}
          step={100}
          value={filters.priceMax}
          onChange={(e) => update({ priceMax: Number(e.target.value) })}
          className="w-full accent-brand-600"
        />
      </div>

      {/* Response rate */}
      <div>
        <label className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
          <span>Min Response Rate</span>
          <span className="font-semibold text-slate-700">{filters.minResponseRate}%</span>
        </label>
        <input
          type="range"
          min={80}
          max={100}
          value={filters.minResponseRate}
          onChange={(e) => update({ minResponseRate: Number(e.target.value) })}
          className="w-full accent-brand-600"
        />
      </div>

      {/* Certification */}
      <div>
        <label className="mb-2 block text-xs font-medium text-slate-500">Certification</label>
        <select
          value={filters.certification}
          onChange={(e) => update({ certification: e.target.value })}
          className="input-field text-xs"
        >
          <option value="all">Any certification</option>
          {certifications.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        {[
          { key: 'verifiedOnly' as const, label: 'Verified suppliers', icon: ShieldCheck },
          { key: 'exportOnly' as const, label: 'Export capability', icon: Globe },
        ].map(({ key, label, icon: Icon }) => (
          <label key={key} className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5">
            <span className="flex items-center gap-2 text-xs font-medium text-slate-700">
              <Icon size={14} className="text-slate-400" />
              {label}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={filters[key]}
              onClick={() => update({ [key]: !filters[key] })}
              className={`relative h-5 w-9 rounded-full transition ${filters[key] ? 'bg-brand-600' : 'bg-slate-300'}`}
            >
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${filters[key] ? 'left-4' : 'left-0.5'}`} />
            </button>
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          onChange({
            category: 'all',
            country: 'all',
            moqMax: 10000,
            priceMax: 50000,
            verifiedOnly: false,
            exportOnly: false,
            minResponseRate: 80,
            certification: 'all',
          })
        }
        className="w-full rounded-xl border border-slate-200 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
      >
        Reset filters
      </button>
    </div>
  );
};

export default FilterSidebar;
