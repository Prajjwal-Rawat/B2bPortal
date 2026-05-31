import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Search, TrendingUp, Users, FileText, Activity } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Counter from './Counter';
import { categories, heroStats, recentActivity, analyticsData } from '../data/content';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategorySelect: (value: string) => void;
}

const Hero = ({ searchQuery, onSearchChange, selectedCategory, onCategorySelect }: HeroProps) => {
  const miniInquiries = analyticsData.inquiryChart.slice(0, 5);

  return (
    <section id="home" className="relative pt-8 pb-12 sm:pt-10 sm:pb-14">
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200/60 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand-500" />
            52,000+ verified suppliers across 124 countries
          </div>

          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Source globally.{' '}
            <span className="text-brand-600">Trade confidently.</span>
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-slate-600">
            Enterprise B2B marketplace connecting buyers with verified manufacturers, exporters, and distributors worldwide.
          </p>

          {/* Search */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex flex-1 items-center rounded-xl border border-slate-200 bg-white shadow-sm">
              <Search size={16} className="ml-3.5 shrink-0 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products, suppliers, or categories..."
                className="w-full bg-transparent py-3 pl-2.5 pr-3 text-sm outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => onCategorySelect(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none sm:w-48"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a href="#products" className="btn-primary">
              Explore Marketplace <ArrowRight size={15} />
            </a>
            <a href="#rfqs" className="btn-secondary">Post an RFQ</a>
          </div>

          {/* Quick stats row */}
          <div className="flex flex-wrap gap-6 pt-2 text-sm text-slate-500">
            <span><strong className="text-slate-900">1.1M+</strong> products</span>
            <span><strong className="text-slate-900">62k</strong> RFQs/month</span>
            <span><strong className="text-slate-900">96%</strong> response rate</span>
          </div>
        </motion.div>

        {/* Right — Live Dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative"
        >
          <div className="card overflow-hidden p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="section-label text-[10px]">Live Marketplace</p>
                <p className="text-sm font-semibold text-slate-900">Platform Activity</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200/60">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
                Live
              </span>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {[
                { icon: Users, label: 'Active Suppliers', value: heroStats.activeSuppliers, color: 'text-brand-600 bg-brand-50' },
                { icon: FileText, label: 'RFQs Today', value: heroStats.rfqsToday, color: 'text-blue-600 bg-blue-50' },
                { icon: TrendingUp, label: 'Response Rate', value: heroStats.avgResponseRate, suffix: '%', color: 'text-emerald-600 bg-emerald-50' },
                { icon: Activity, label: 'Export Ready', value: heroStats.exportReady, suffix: '%', color: 'text-violet-600 bg-violet-50' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="rounded-xl border border-slate-100 bg-slate-50/80 p-3"
                >
                  <div className={`mb-2 inline-flex rounded-lg p-1.5 ${stat.color}`}>
                    <stat.icon size={14} />
                  </div>
                  <p className="text-lg font-semibold tabular-nums text-slate-900">
                    <Counter end={stat.value} suffix={stat.suffix || ''} duration={1800} />
                  </p>
                  <p className="text-[10px] font-medium text-slate-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts row */}
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Inquiry Volume</p>
                <div className="h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={miniInquiries} barSize={8}>
                      <Bar dataKey="inquiries" fill="#6366f1" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Supplier Growth</p>
                <div className="h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData.supplierGrowth.slice(-5)}>
                      <Area type="monotone" dataKey="suppliers" stroke="#4f46e5" fill="#eef2ff" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent activity */}
            <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Recent Buyer Activity</p>
              <div className="space-y-2">
                {recentActivity.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${item.online ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span className="truncate font-medium text-slate-700">{item.buyer}</span>
                    </div>
                    <span className="shrink-0 text-slate-400">{item.country}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating accent card */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-3 -left-3 hidden rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-card sm:block"
          >
            <p className="text-[10px] text-slate-500">Avg. deal closure</p>
            <p className="text-sm font-semibold text-brand-600">14 days</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
