import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="mt-24 rounded-[40px] bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-10 shadow-[0_50px_120px_rgba(15,23,42,0.5)]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
      >
        <div>
          <span className="inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">
            Join the future of B2B sourcing
          </span>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Join thousands of global buyers & suppliers on one premium platform.</h2>
          <p className="mt-5 max-w-2xl text-slate-400">
            Build trust with verified partners, unlock intelligent discovery, and showcase your product catalog to enterprise buyers worldwide.
          </p>
        </div>
        <div className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-slate-950/70 p-8">
          <div className="inline-flex rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200">Enterprise-ready features for B2B scale</div>
          <div className="space-y-3 text-slate-300">
            <p>• AI-driven supplier matching</p>
            <p>• Dynamic request-for-quote workflows</p>
            <p>• Global logistics and compliance scoring</p>
          </div>
          <button className="btn-glow w-full justify-center">Create your account</button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
