import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Cpu, Sun, Moon, ArrowRight, Zap, Shield, GitBranch, Activity,
  Copy, Check, ChevronDown, Terminal, Circle, Layers, Route, DollarSign,
} from "lucide-react";
  
/* ══════════════════ ═════════════════════════════════════════════════ 
   ANIMATION VARIANTS      
 


  
   ═══════════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED AI BACKGROUND
   ═══════════════════════════════════════════════════════════════════ */

function AnimatedBackground() {
  const nodes = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: 10 + (i % 6) * 16 + Math.random() * 8,
    y: 10 + Math.floor(i / 6) * 28 + Math.random() * 10,
  }));

  const connections = [
    [0, 1], [1, 2], [2, 3], [6, 7], [7, 8], [8, 9],
    [0, 6], [1, 7], [2, 8], [3, 9], [12, 13], [13, 14],
    [6, 12], [7, 13], [8, 14], [9, 15],
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Radial core glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px]">
        <motion.div
          className="absolute inset-0 rounded-full bg-indigo-500/[0.04] dark:bg-indigo-500/[0.06]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-[15%] rounded-full bg-indigo-400/[0.03] dark:bg-indigo-400/[0.05]"
          animate={{ scale: [1.05, 1, 1.05], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute inset-[35%] rounded-full border border-indigo-500/[0.06] dark:border-indigo-500/[0.1]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[25%] rounded-full border border-emerald-500/[0.04] dark:border-emerald-500/[0.07]"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Neural nodes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map(([a, b], i) => (
          <motion.line
            key={`c-${i}`}
            x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`}
            x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
            className="stroke-indigo-500/[0.06] dark:stroke-indigo-400/[0.08]"
            strokeWidth="0.1"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute w-1 h-1 rounded-full bg-indigo-400/20 dark:bg-indigo-400/30"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{ duration: 3 + node.id * 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Travelling data particles */}
      {[0, 1, 2].map((i) => {
        const conn = connections[i * 3];
        const n1 = nodes[conn[0]];
        const n2 = nodes[conn[1]];
        return (
          <motion.div
            key={`p-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/40 dark:bg-emerald-400/50"
            animate={{
              left: [`${n1.x}%`, `${n2.x}%`, `${n1.x}%`],
              top: [`${n1.y}%`, `${n2.y}%`, `${n1.y}%`],
              opacity: [0, 0.8, 0],
            }}
            transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
          />
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════════ */

function Navbar({ darkMode, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl rounded-2xl border transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-700/80 shadow-lg shadow-slate-900/5 dark:shadow-black/20 backdrop-blur-xl"
          : "bg-white/50 dark:bg-slate-950/50 border-slate-200/50 dark:border-slate-800/50 backdrop-blur-lg"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <span className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
            <span className="hidden sm:inline">Acdyon AI Engine</span>
            <span className="sm:hidden">Acdyon</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollTo("features")} className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Product</button>
          <button onClick={() => scrollTo("architecture")} className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Architecture</button>
          <button onClick={() => scrollTo("integration")} className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Docs</button>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {darkMode ? (
                <motion.div key="moon" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }} transition={{ duration: 0.2 }}>
                  <Moon className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div key="sun" initial={{ rotate: 90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -90, scale: 0 }} transition={{ duration: 0.2 }}>
                  <Sun className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("playground")}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors shadow-md shadow-indigo-500/20"
          >
            Get API Key
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO ORCHESTRATION VISUAL
   ═══════════════════════════════════════════════════════════════════ */

function OrchestrationVisual() {
  const nodeStyle = "relative flex items-center justify-center rounded-xl border text-xs font-mono";
  const lineStyle = "w-px bg-gradient-to-b from-indigo-500/40 to-indigo-500/10 dark:from-indigo-400/40 dark:to-indigo-400/10";

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-xs mx-auto lg:max-w-sm"
    >
      <div className="flex flex-col items-center gap-0">
        {/* Request node */}
        <motion.div
          className={`${nodeStyle} px-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300`}
          animate={{ borderColor: ["rgba(99,102,241,0.2)", "rgba(99,102,241,0.5)", "rgba(99,102,241,0.2)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="flex items-center gap-2"><Terminal className="w-3.5 h-3.5 text-indigo-500" /> REQUEST</span>
        </motion.div>

        <div className={`${lineStyle} h-6`} />

        {/* Router */}
        <motion.div
          className={`${nodeStyle} px-5 py-3 bg-indigo-600/10 dark:bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-semibold`}
          animate={{ boxShadow: ["0 0 0px rgba(99,102,241,0)", "0 0 20px rgba(99,102,241,0.15)", "0 0 0px rgba(99,102,241,0)"] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <span className="flex items-center gap-2"><Cpu className="w-4 h-4" /> ACDYON ROUTER</span>
        </motion.div>

        <div className={`${lineStyle} h-4`} />

        {/* Model branches */}
        <div className="flex items-start gap-3 sm:gap-4 w-full justify-center">
          {["Model A", "Model B", "Model C"].map((label, i) => (
            <div key={label} className="flex flex-col items-center gap-0">
              <div className={`${lineStyle} h-4`} />
              <motion.div
                className={`${nodeStyle} px-3 py-2 bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px]`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.15 }}
              >
                {label}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Travelling particles */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-500/60"
          animate={{ y: [0, 40, 80, 40, 0], opacity: [0, 1, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400/60"
          animate={{ y: [0, 40, 80, 40, 0], opacity: [0, 0.8, 0.8, 0.8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-xl">
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                v1.0 Developer Preview
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6"
            >
              LLM Orchestration{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-400 bg-clip-text text-transparent">
                with Zero
              </span>{" "}
              Runtime Overhead
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-lg"
            >
              Route requests across models, control inference costs, and build resilient AI pipelines with a developer-first orchestration layer engineered for sub-150ms routing decisions.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("playground")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-500/25"
              >
                Start Integrating
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("playground")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                Explore Pipeline
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right — orchestration visual */}
          <div className="hidden lg:flex justify-center">
            <OrchestrationVisual />
          </div>
        </div>

        {/* Mobile orchestration visual */}
        <div className="lg:hidden mt-12">
          <OrchestrationVisual />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FEATURE STRIP
   ═══════════════════════════════════════════════════════════════════ */

const features = [
  { icon: Route, title: "Model Routing", desc: "Route requests according to workload, latency, and policy." },
  { icon: DollarSign, title: "Cost Controls", desc: "Estimate and monitor inference cost before execution." },
  { icon: GitBranch, title: "Fallback Chains", desc: "Design resilient model pipelines with configurable fallback paths." },
  { icon: Activity, title: "Execution Metrics", desc: "Observe latency, region, cost, and execution state." },
];

function FeatureStrip() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/50 backdrop-blur-sm hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-indigo-500/0 to-indigo-500/[0.02] dark:to-indigo-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity" />
              <f.icon className="w-5 h-5 text-indigo-500 mb-4 group-hover:text-indigo-400 transition-colors relative z-10" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 relative z-10">{f.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed relative z-10">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED METRIC
   ═══════════════════════════════════════════════════════════════════ */

function AnimatedMetric({ value, suffix = "", prefix = "" }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="inline-block"
      >
        {prefix}{value}{suffix}
      </motion.span>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PLAYGROUND — EXECUTION TIMELINE
   ═══════════════════════════════════════════════════════════════════ */

const pipelineSteps = ["Request", "Policy Check", "Model Routing", "Primary Model", "Fallback", "Response"];

function ExecutionTimeline({ status, activeStep }) {
  return (
    <div className="space-y-1">
      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500 mb-3">Pipeline</h4>
      {pipelineSteps.map((step, i) => {
        let state = "idle";
        if (status === "running" && i < activeStep) state = "complete";
        else if (status === "running" && i === activeStep) state = "running";
        else if (status === "complete") state = "complete";

        return (
          <motion.div
            key={step}
            className="flex items-center gap-2.5 py-1"
            initial={false}
            animate={{ opacity: state === "idle" ? 0.4 : 1 }}
          >
            <motion.div
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                state === "complete" ? "bg-emerald-400" :
                state === "running" ? "bg-indigo-500" :
                "bg-slate-400 dark:bg-slate-600"
              }`}
              animate={state === "running" ? { scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] } : {}}
              transition={state === "running" ? { duration: 0.8, repeat: Infinity } : {}}
            />
            <span className={`text-xs font-mono ${
              state === "complete" ? "text-emerald-500 dark:text-emerald-400" :
              state === "running" ? "text-indigo-500 dark:text-indigo-400" :
              "text-slate-400 dark:text-slate-500"
            }`}>
              {step}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PLAYGROUND
   ═══════════════════════════════════════════════════════════════════ */

const defaultPrompt = `You are an orchestration controller.
Route requests based on latency,
cost, and model availability.
Prefer the lowest-cost capable model.
Fallback when the primary provider
becomes unavailable.`;

const regions = ["us-east · simulated", "eu-west · simulated", "ap-south · simulated"];

function Playground() {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [status, setStatus] = useState("idle");     // idle | running | complete
  const [activeStep, setActiveStep] = useState(-1);
  const [metrics, setMetrics] = useState({
    latency: 128,
    cost: "0.0042",
    fallbacks: 1,
    region: "us-east · simulated",
  });
  const timerRef = useRef(null);

  const simulate = useCallback(() => {
    if (status === "running") return;
    setStatus("running");
    setActiveStep(0);

    let step = 0;
    timerRef.current = setInterval(() => {
      step++;
      if (step < pipelineSteps.length) {
        setActiveStep(step);
      } else {
        clearInterval(timerRef.current);
        setMetrics({
          latency: Math.floor(85 + Math.random() * 60),
          cost: (0.0021 + Math.random() * 0.0068).toFixed(4),
          fallbacks: Math.floor(Math.random() * 3),
          region: regions[Math.floor(Math.random() * regions.length)],
        });
        setStatus("complete");
        setActiveStep(pipelineSteps.length);
      }
    }, 450);
  }, [status]);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <section id="playground" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 font-mono">
              playground.acdyon.internal
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              Simulate an orchestration pipeline before shipping it.
            </p>
          </motion.div>

          {/* Terminal window */}
          <motion.div
            variants={scaleIn}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 backdrop-blur-sm shadow-2xl shadow-slate-900/5 dark:shadow-black/20 overflow-hidden"
          >
            {/* Window header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono ml-2 hidden sm:inline">playground.acdyon.internal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${status === "running" ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
                <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                  {status === "idle" ? "Ready" : status === "running" ? "Running" : "Complete"}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
              {/* Left — prompt editor & timeline */}
              <div className="lg:col-span-2 p-4 sm:p-6 space-y-5">
                <div>
                  <label htmlFor="system-prompt" className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500 block mb-2">System Prompt</label>
                  <textarea
                    id="system-prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-36 sm:h-40 p-3 rounded-xl text-xs font-mono leading-relaxed bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all"
                    aria-label="System prompt input"
                  />
                  <div className="text-right mt-1">
                    <span className="text-[10px] text-slate-400 dark:text-slate-600 font-mono">{prompt.length} chars</span>
                  </div>
                </div>

                {/* Simulate button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={simulate}
                  disabled={status === "running"}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    status === "running"
                      ? "bg-indigo-500/20 text-indigo-400 cursor-wait"
                      : status === "complete"
                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20"
                      : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
                  }`}
                >
                  {status === "idle" && <><Zap className="w-4 h-4" /> Simulate Pipeline Execution</>}
                  {status === "running" && <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Activity className="w-4 h-4" /></motion.div> Executing pipeline...</>}
                  {status === "complete" && <><Check className="w-4 h-4" /> Simulation Complete — Run Again</>}
                </motion.button>

                {/* Pipeline timeline */}
                <ExecutionTimeline status={status} activeStep={activeStep} />
              </div>

              {/* Right — live metrics */}
              <div className="lg:col-span-3 p-4 sm:p-6">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500 mb-4">Live Execution</h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Latency */}
                  <motion.div
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50"
                    animate={status === "complete" ? { borderColor: ["rgba(16,185,129,0.3)", "rgba(16,185,129,0)"] } : {}}
                    transition={{ duration: 1 }}
                  >
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 font-medium">Latency</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
                      <AnimatedMetric value={metrics.latency} suffix=" ms" />
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-600 mt-1">Simulated routing latency</div>
                  </motion.div>

                  {/* Estimated cost */}
                  <motion.div
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50"
                    animate={status === "complete" ? { borderColor: ["rgba(16,185,129,0.3)", "rgba(16,185,129,0)"] } : {}}
                    transition={{ duration: 1, delay: 0.1 }}
                  >
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 font-medium">Estimated Cost</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
                      <AnimatedMetric value={metrics.cost} prefix="$" />
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-600 mt-1">Per-request estimate</div>
                  </motion.div>

                  {/* Active fallbacks */}
                  <motion.div
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50"
                    animate={status === "complete" ? { borderColor: ["rgba(16,185,129,0.3)", "rgba(16,185,129,0)"] } : {}}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 font-medium">Active Fallbacks</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
                      <AnimatedMetric value={metrics.fallbacks} />
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-600 mt-1">Configured fallback models</div>
                  </motion.div>

                  {/* Region */}
                  <motion.div
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50"
                    animate={status === "complete" ? { borderColor: ["rgba(16,185,129,0.3)", "rgba(16,185,129,0)"] } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 font-medium">Region</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                      <AnimatedMetric value={metrics.region} />
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-600 mt-1">Simulated execution region</div>
                  </motion.div>
                </div>

                {/* Execution log */}
                <div className="mt-5 p-3 rounded-xl bg-slate-950 dark:bg-black/40 border border-slate-800 font-mono text-[11px] text-slate-400 space-y-1 overflow-hidden">
                  <div className="text-slate-500">// execution log</div>
                  <AnimatePresence>
                    {status === "idle" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} className="text-slate-600">
                        {">"} awaiting pipeline execution...
                      </motion.div>
                    )}
                    {status === "running" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-indigo-400">
                        {">"} pipeline.execute({"{"} policy: &quot;balanced&quot; {"}"})
                      </motion.div>
                    )}
                    {status === "complete" && (
                      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
                        <div className="text-emerald-400">{">"} pipeline.status() → healthy</div>
                        <div className="text-slate-500">{">"} latency: {metrics.latency}ms | cost: ${metrics.cost} | fallbacks: {metrics.fallbacks}</div>
                        <div className="text-slate-600">{">"} region: {metrics.region}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ARCHITECTURE VISUALIZATION
   ═══════════════════════════════════════════════════════════════════ */

const archNodes = [
  { label: "Application", icon: Terminal, level: 0 },
  { label: "Acdyon AI Engine", icon: Cpu, level: 1, highlight: true },
  { label: "Policy Engine", icon: Shield, level: 2 },
  { label: "Model Router", icon: Route, level: 3 },
];

const archModels = ["Model A", "Model B", "Model C"];

function Architecture() {
  return (
    <section id="architecture" className="relative py-20 sm:py-28">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.05] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              One orchestration layer.{" "}
              <span className="text-indigo-500">Multiple execution paths.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              A unified pipeline from your application to model inference and back.
            </p>
          </motion.div>

          {/* Architecture flow */}
          <motion.div variants={fadeUp} className="max-w-md mx-auto">
            <div className="flex flex-col items-center gap-0">
              {archNodes.map((node, i) => (
                <div key={node.label} className="flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border font-mono text-sm ${
                      node.highlight
                        ? "bg-indigo-600/10 dark:bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <node.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="min-w-0 break-words">{node.label}</span>
                  </motion.div>
                  {i < archNodes.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + 0.06 }}
                      className="w-px h-6 bg-gradient-to-b from-indigo-500/30 to-indigo-500/10 origin-top"
                    />
                  )}
                </div>
              ))}

              {/* Branch to models */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="w-px h-4 bg-indigo-500/20 origin-top"
              />

              <div className="flex gap-3 sm:gap-5">
                {archModels.map((m, i) => (
                  <motion.div
                    key={m}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.55 + i * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-px h-4 bg-emerald-500/20" />
                    <div className="px-3 py-2 rounded-lg bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
                      {m}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Fallback / Metrics */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="w-px h-5 bg-slate-300/30 dark:bg-slate-700/30 origin-top mt-2"
              />
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.85 }}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 text-slate-500 dark:text-slate-400 text-xs font-mono"
              >
                Fallback / Metrics
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CODE INTEGRATION PREVIEW
   ═══════════════════════════════════════════════════════════════════ */

const codeLines = [
  { num: 1, content: 'import { Acdyon } from "@acdyon/engine";', tokens: [
    { text: 'import', cls: 'text-indigo-400' },
    { text: ' { Acdyon } ', cls: 'text-slate-300' },
    { text: 'from', cls: 'text-indigo-400' },
    { text: ' "@acdyon/engine"', cls: 'text-emerald-400' },
    { text: ';', cls: 'text-slate-500' },
  ]},
  { num: 2, content: 'const engine = new Acdyon({ apiKey: process.env.ACDYON_API_KEY });', tokens: [
    { text: 'const', cls: 'text-indigo-400' },
    { text: ' engine = ', cls: 'text-slate-300' },
    { text: 'new', cls: 'text-indigo-400' },
    { text: ' Acdyon', cls: 'text-amber-300' },
    { text: '({ ', cls: 'text-slate-400' },
    { text: 'apiKey', cls: 'text-slate-200' },
    { text: ': process.env.', cls: 'text-slate-400' },
    { text: 'ACDYON_API_KEY', cls: 'text-slate-200' },
    { text: ' });', cls: 'text-slate-500' },
  ]},
  { num: 3, content: 'const result = await engine.route({ prompt, policy: "balanced" });', tokens: [
    { text: 'const', cls: 'text-indigo-400' },
    { text: ' result = ', cls: 'text-slate-300' },
    { text: 'await', cls: 'text-indigo-400' },
    { text: ' engine.', cls: 'text-slate-300' },
    { text: 'route', cls: 'text-amber-300' },
    { text: '({ prompt, ', cls: 'text-slate-400' },
    { text: 'policy', cls: 'text-slate-200' },
    { text: ': ', cls: 'text-slate-400' },
    { text: '"balanced"', cls: 'text-emerald-400' },
    { text: ' });', cls: 'text-slate-500' },
  ]},
];

function IntegrationPreview() {
  const [copied, setCopied] = useState(false);

  const copyCode = useCallback(() => {
    const code = codeLines.map(l => l.content).join("\n");
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <section id="integration" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Integrate in <span className="text-indigo-500">minutes.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Three lines. One orchestration layer. Zero runtime overhead.
            </p>
          </motion.div>

          {/* Code terminal */}
          <motion.div
            variants={scaleIn}
            className="max-w-2xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-2xl shadow-slate-900/10 dark:shadow-black/30"
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/80">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                </div>
                <span className="text-[11px] text-slate-500 font-mono ml-2">engine.config.js</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyCode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                aria-label="Copy integration code"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </motion.div>
                  ) : (
                    <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1">
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Code body */}
            <div className="p-4 sm:p-6 overflow-x-auto">
              <pre className="text-sm leading-7 font-mono">
                {codeLines.map((line) => (
                  <div key={line.num} className="flex">
                    <span className="select-none w-8 text-right mr-4 text-slate-600 text-xs leading-7">{line.num}</span>
                    <code className="min-w-0">
                      {line.tokens.map((t, ti) => (
                        <span key={ti} className={t.cls}>{t.text}</span>
                      ))}
                    </code>
                  </div>
                ))}
              </pre>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════════════════════════ */

function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Build it like you{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-emerald-400 bg-clip-text text-transparent">
              mean it.
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            Orchestrate your AI infrastructure with confidence. Developer preview now available.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("playground")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-500/25"
            >
              Start Building
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("integration")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
              View SDK
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════ */

function Footer() {
  const [hovered, setHovered] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-500" />
              <span className="font-semibold text-slate-900 dark:text-white text-sm">Acdyon AI Engine</span>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500">Developer Preview</span>
          </div>

          <nav className="flex gap-6" aria-label="Footer navigation">
            <button onClick={() => scrollTo("features")} className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Product</button>
            <button onClick={() => scrollTo("architecture")} className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Architecture</button>
            <button onClick={() => scrollTo("integration")} className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Integration</button>
          </nav>
        </div>

        {/* Easter egg */}
        <div className="mt-8 text-center">
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="text-xs text-slate-400 dark:text-slate-600 font-mono transition-colors hover:text-indigo-400 dark:hover:text-indigo-400 cursor-default"
          >
            <AnimatePresence mode="wait">
              {hovered ? (
                <motion.span key="cmd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {">"} pipeline.status() → healthy
                </motion.span>
              ) : (
                <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  © 2026 Acdyon AI Engine
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════════ */

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("acdyon-theme");
    if (stored === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else if (stored === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
      if (!prefersDark) document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("acdyon-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("acdyon-theme", "light");
      }
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-sans transition-colors duration-300 overflow-x-hidden">
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/[0.04] dark:bg-indigo-500/[0.07] rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-emerald-500/[0.03] dark:bg-emerald-500/[0.05] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/[0.02] dark:bg-indigo-500/[0.04] rounded-full blur-3xl" />
      </div>

      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <FeatureStrip />
        <Playground />
        <Architecture />
        <IntegrationPreview />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
