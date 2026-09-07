import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Code2,
  Layers3,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";

const stats = [
  { value: "120+", label: "expert-led lessons" },
  { value: "24/7", label: "AI guided support" },
  { value: "98%", label: "learner satisfaction" },
];

const features = [
  {
    icon: BrainCircuit,
    title: "Adaptive AI coaching",
    desc: "Smart lesson paths that respond to skill level, pace, and goals in real time.",
  },
  {
    icon: Code2,
    title: "Project-first learning",
    desc: "Build polished apps, portfolios, and prototypes instead of only reading theory.",
  },
  {
    icon: BarChart3,
    title: "Progress you can feel",
    desc: "Clear milestones, streaks, and confidence signals keep momentum visible.",
  },
];

const courses = [
  {
    title: "Full Stack Web Dev",
    level: "Beginner-friendly",
    tag: "Launch apps fast",
    accent: "from-cyan-400/20 via-sky-500/10 to-blue-500/20",
  },
  {
    title: "AI & Machine Learning",
    level: "Growth track",
    tag: "Train smart systems",
    accent: "from-violet-400/20 via-fuchsia-500/10 to-pink-500/20",
  },
  {
    title: "DSA & Problem Solving",
    level: "Advanced track",
    tag: "Think faster",
    accent: "from-emerald-400/20 via-teal-500/10 to-cyan-500/20",
  },
];

const steps = [
  "Choose your track",
  "Learn with AI feedback",
  "Ship real projects",
  "Track your growth",
];

const testimonials = [
  {
    quote:
      "The UI makes studying feel premium. It is calm, focused, and actually motivates me to come back every day.",
    name: "Aria Mehta",
    role: "Frontend Developer",
  },
  {
    quote:
      "The learning flow feels personalized instead of generic. I knew exactly what to do next at every step.",
    name: "David Kumar",
    role: "Data Analyst",
  },
  {
    quote:
      "The project cards and roadmap helped me build confidence before interviews. It feels like a real product.",
    name: "Sneha R.",
    role: "CS Student",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/profile");
  };

  return (
    <div
      className="home-shell h-screen overflow-y-auto w-full text-white font-sans"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.28),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.28),_transparent_28%),linear-gradient(180deg,_#06111c_0%,_#071725_45%,_#030712_100%)]" />
        <div className="absolute inset-0 noise-overlay opacity-45" />
        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-16">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-xl glass-panel animate-rise-in">
              <Sparkles className="h-4 w-4 text-emerald-300" />
              AI-guided learning platform for future builders
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl animate-rise-in delay-1">
                Learn faster with a beautiful, intelligent study experience.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg animate-rise-in delay-2">
                Explore immersive courses, adaptive coaching, and a focused workspace designed to keep momentum high from the first lesson to the final project.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row animate-rise-in delay-3">
              <button
                onClick={handleGetStarted}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_18px_45px_rgba(255,255,255,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-50"
              >
                Get started now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-xl transition duration-300 hover:border-white/25 hover:bg-white/10">
                Explore learning paths
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 animate-rise-in delay-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-panel rounded-3xl p-4 text-left shadow-lg shadow-black/10">
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg animate-float-y">
            <div className="absolute -left-6 top-12 h-24 w-24 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="absolute -right-4 bottom-10 h-28 w-28 rounded-full bg-sky-400/20 blur-3xl" />

            <div className="glass-panel relative overflow-hidden rounded-[2rem] border border-white/15 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_30%,transparent_70%,rgba(255,255,255,0.08))]" />
              <div className="relative space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Smart dashboard</p>
                    <h2 className="text-2xl font-semibold text-white">Your learning momentum</h2>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-xl">
                    <Rocket className="h-5 w-5 text-emerald-300" />
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Weekly streak</span>
                    <span>86%</span>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 progress-bar" />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                    <div className="rounded-2xl bg-white/5 p-3">
                      <p className="text-white font-semibold">12</p>
                      <p className="text-slate-400">Lessons</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-3">
                      <p className="text-white font-semibold">8</p>
                      <p className="text-slate-400">Projects</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-3">
                      <p className="text-white font-semibold">4.9</p>
                      <p className="text-slate-400">Rating</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "Live AI help", value: "On" },
                    { label: "Goal progress", value: "78%" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-slate-400">{item.label}</p>
                      <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-300">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Next milestone</p>
                      <p className="text-white font-medium">Complete your first project review</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 bg-slate-950/85 px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl">
              <BookOpen className="h-4 w-4 text-cyan-300" />
              Why learners stay engaged
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">A learning flow that feels calm, premium, and useful.</h2>
            <p className="mx-auto max-w-2xl text-slate-300">
              Every section is built to reduce friction, create clarity, and keep the page responsive across phones, tablets, and desktops.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="glass-panel rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-xl">
                    <Icon className="h-5 w-5 text-emerald-300" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#020617_0%,#07111f_100%)] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl">
              <Layers3 className="h-4 w-4 text-sky-300" />
              Popular paths
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Courses that look as polished as they feel.</h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {courses.map((course, index) => (
              <article
                key={course.title}
                className={`glass-panel group relative overflow-hidden rounded-[1.75rem] border border-white/10 p-6 course-card bg-gradient-to-br ${course.accent}`}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_30%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col justify-between gap-8">
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-white/10 p-3 text-white backdrop-blur-xl">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-100 backdrop-blur-xl">
                      {course.tag}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-200/80">{course.level}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{course.title}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="glass-panel rounded-[2rem] p-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl">
              <Zap className="h-4 w-4 text-amber-300" />
              Learning roadmap
            </p>
            <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">A simple path from first lesson to finished portfolio.</h2>
            <p className="mt-4 max-w-xl text-slate-300">
              The layout is tuned for clarity on small screens and spacious rhythm on larger displays, so nothing feels cramped or cluttered.
            </p>

            <div className="mt-8 space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 font-semibold text-white backdrop-blur-xl">
                    {index + 1}
                  </div>
                  <p className="font-medium text-white">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {testimonials.map((item, index) => (
              <figure
                key={item.name}
                className="glass-panel rounded-[1.75rem] p-6"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="flex items-center gap-1 text-amber-300">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <span key={starIndex}>★</span>
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-6 text-slate-300">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-slate-400">{item.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="glass-panel overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(135deg,rgba(16,185,129,0.18),rgba(59,130,246,0.14),rgba(15,23,42,0.88))] px-6 py-10 text-center sm:px-10">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-200/80">Ready when you are</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">Start learning with a cleaner, calmer interface.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-200/80">
              Sign in, choose your path, and move through courses with a UI built to feel modern and premium on every screen size.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5"
              >
                Sign up now
                <ArrowRight className="h-4 w-4" />
              </button>
              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3.5 text-sm text-white/90 backdrop-blur-xl">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Personalized learning from day one
              </div>
            </div>
          </div>

          <footer className="py-8 text-center text-sm text-slate-400">
            © {new Date().getFullYear()} SmartLearn. Built for future developers.
          </footer>
        </div>
      </section>
    </div>
  );
}
