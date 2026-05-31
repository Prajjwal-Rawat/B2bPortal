import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { categories } from '../data/content';

const Footer = () => (
  <footer className="mt-8 border-t border-slate-200 bg-white pt-12 pb-8">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">G2</span>
            <span className="text-sm font-semibold text-slate-900">
              Global<span className="text-brand-600">B2B</span>Mart
            </span>
          </div>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-slate-500">
            Premium global B2B marketplace connecting verified suppliers with enterprise buyers. Source, quote, and trade with confidence.
          </p>
          <div className="mt-4 flex gap-2">
            {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
              <button key={i} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-brand-200 hover:text-brand-600">
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">Platform</h4>
          <ul className="mt-3 space-y-2">
            {['Home', 'Products', 'Suppliers', 'RFQs', 'Membership'].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="text-xs text-slate-500 transition hover:text-brand-600">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">Categories</h4>
          <ul className="mt-3 space-y-2">
            {categories.slice(1, 7).map((cat) => (
              <li key={cat.id}>
                <a href="#products" className="text-xs text-slate-500 transition hover:text-brand-600">{cat.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Newsletter */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">Contact</h4>
          <ul className="mt-3 space-y-2 text-xs text-slate-500">
            <li className="flex items-center gap-2"><Mail size={12} /> hello@globalb2bmart.com</li>
            <li className="flex items-center gap-2"><Phone size={12} /> +1 (800) 555-0199</li>
            <li className="flex items-center gap-2"><MapPin size={12} /> Singapore · Dubai · Mumbai</li>
          </ul>

          <div className="mt-5">
            <p className="text-xs font-semibold text-slate-900">Newsletter</p>
            <div className="mt-2 flex gap-2">
              <input type="email" placeholder="Your email" className="input-field flex-1 text-xs py-2" />
              <button className="btn-primary shrink-0 px-3 py-2 text-xs">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 sm:flex-row">
        <p className="text-[10px] text-slate-400">© 2026 GlobalB2BMart. All rights reserved.</p>
        <div className="flex gap-4 text-[10px] text-slate-400">
          <a href="#" className="hover:text-slate-600">Privacy</a>
          <a href="#" className="hover:text-slate-600">Terms</a>
          <a href="#" className="hover:text-slate-600">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
