import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Counter from './Counter';
import ScrollReveal from './ScrollReveal';
import { analyticsData } from '../data/content';

const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff', '#eef2ff'];

const AnalyticsDashboard = () => (
  <section id="analytics" className="py-14">
    <ScrollReveal>
      <div className="mb-6">
        <p className="section-label">Platform Analytics</p>
        <h2 className="section-title mt-1">Enterprise intelligence dashboard</h2>
        <p className="mt-1 text-sm text-slate-500">Real-time sourcing metrics and market trends</p>
      </div>
    </ScrollReveal>

    {/* Metric cards */}
    <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {analyticsData.metrics.map((metric, i) => (
        <ScrollReveal key={metric.label} delay={i * 0.05}>
          <div className="card p-4">
            <p className="text-xs font-medium text-slate-500">{metric.label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
              {metric.isDecimal ? (
                <Counter end={metric.value} decimals={1} suffix={metric.suffix} />
              ) : (
                <Counter end={metric.value} suffix={metric.suffix} />
              )}
            </p>
            <p className="mt-1 text-xs font-medium text-emerald-600">{metric.change} vs last month</p>
          </div>
        </ScrollReveal>
      ))}
    </div>

    <div className="grid gap-4 lg:grid-cols-3">
      {/* Inquiry chart */}
      <ScrollReveal className="lg:col-span-2" delay={0.1}>
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-900">Weekly Inquiry Volume</h3>
          <p className="text-xs text-slate-500">RFQ submissions across all categories</p>
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.inquiryChart}>
                <defs>
                  <linearGradient id="inquiryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                />
                <Area type="monotone" dataKey="inquiries" stroke="#6366f1" fill="url(#inquiryGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ScrollReveal>

      {/* Top categories pie */}
      <ScrollReveal delay={0.15}>
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-900">Top Categories</h3>
          <p className="text-xs text-slate-500">By inquiry share</p>
          <div className="mt-2 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.topCategories}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                >
                  {analyticsData.topCategories.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1">
            {analyticsData.topCategories.map((cat, i) => (
              <div key={cat.name} className="flex items-center gap-1.5 text-[10px] text-slate-600">
                <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />
                {cat.name} ({cat.value}%)
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Supplier growth */}
      <ScrollReveal className="lg:col-span-2" delay={0.2}>
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-900">Supplier Growth</h3>
          <p className="text-xs text-slate-500">New verified suppliers onboarded monthly</p>
          <div className="mt-4 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.supplierGrowth} barSize={24}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Bar dataKey="suppliers" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ScrollReveal>

      {/* Export analytics */}
      <ScrollReveal delay={0.25}>
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-900">Export Analytics</h3>
          <p className="text-xs text-slate-500">Regional trade volume share</p>
          <div className="mt-4 space-y-4">
            {[
              { region: 'EMEA', share: 68 },
              { region: 'APAC', share: 52 },
              { region: 'Americas', share: 41 },
            ].map((item) => (
              <div key={item.region}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-medium text-slate-700">{item.region}</span>
                  <span className="text-slate-500">{item.share}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.share}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-brand-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default AnalyticsDashboard;
