import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollReveal from '../components/shared/ScrollReveal';
import { Target, TrendingUp, Users, ShieldCheck, ArrowRight, CheckCircle2, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const features = [
    { 
      icon: <Target size={28} className="text-white" />, 
      title: "Goal Tracking", 
      desc: "Set, monitor, and achieve employee goals with structured cycles.",
      bgClass: "bg-gradient-to-br from-indigo-500 to-indigo-700"
    },
    { 
      icon: <TrendingUp size={28} className="text-emerald-700" />, 
      title: "Performance Scoring", 
      desc: "Data-driven appraisal ratings to ensure accurate and fair evaluations year-round.",
      bgClass: "bg-emerald-50"
    },
    { 
      icon: <Users size={28} className="text-pink-700" />, 
      title: "360° Feedback", 
      desc: "Seamless communication between employees, managers, and admins.",
      bgClass: "bg-pink-50"
    },
    { 
      icon: <ShieldCheck size={28} className="text-gray-900" />, 
      title: "Secure Records", 
      desc: "Maintain historical appraisal records safely and accessibly.",
      bgClass: "bg-gray-100"
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden font-sans selection:bg-indigo-200">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow pt-24 lg:pt-32 relative z-10 w-full">
        <ScrollReveal duration={1} yOffset={20}>
          <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Content */}
            <div className="flex-1 text-left pt-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-700 font-bold text-xs tracking-wide uppercase mb-6 shadow-sm">
                <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                The Future of HR
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-heading font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
                Elevate your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500">
                  team's growth.
                </span>
              </h1>
              
              <p className="mt-4 text-lg md:text-xl text-gray-500 max-w-xl mb-10 leading-relaxed font-medium">
                PerformX replaces outdated spreadsheets with a visually stunning, dynamic platform for continuous goals, feedback, and appraisals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:justify-start">
                <Link to="/register" className="group flex justify-center items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-2xl font-bold text-base hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 w-full sm:w-auto">
                  Start for free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#demo" className="group flex justify-center items-center gap-3 bg-white text-gray-900 border border-gray-200 px-8 py-3.5 rounded-2xl font-bold text-base hover:bg-gray-50 transition-all shadow-sm w-full sm:w-auto">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors"><Play size={10} fill="currentColor"/></span>
                  Watch demo
                </a>
              </div>
            </div>

            {/* Right Image/Showcase */}
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-teal-50 rounded-[3rem] transform rotate-3 scale-105 opacity-50 blur-3xl -z-10"></div>
              <div className="relative group perspective">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2940&auto=format&fit=crop" 
                  alt="Team collaboration" 
                  className="rounded-[2.5rem] shadow-2xl object-cover h-[400px] md:h-[500px] w-full border-[6px] border-white/60 bg-white"
                />
                
                {/* Floating UI Elements */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-6 -left-6 md:-left-12 glass bg-white/90 p-5 rounded-3xl shadow-xl border border-white/50 backdrop-blur-xl flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-2xl font-extrabold text-lg">98%</div>
                  <div>
                     <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Rating Score</p>
                     <p className="font-extrabold text-gray-900">Exceptional</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="absolute top-10 -right-6 md:-right-10 glass bg-white/90 p-4 rounded-2xl shadow-xl border border-white/50 backdrop-blur-xl flex items-center gap-3"
                >
                  <CheckCircle2 size={24} className="text-indigo-600" />
                  <p className="font-bold text-sm text-gray-800">Goal achieved</p>
                </motion.div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Clients/Logos Section (Dummy) */}
        <section className="border-y border-gray-100 bg-gray-50/50 py-10 mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-sm font-bold text-gray-400 uppercase tracking-widest flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 opacity-60 grayscale">
            <span>Microsoft</span>
            <span>Innovate Corp</span>
            <span>TechFlow</span>
            <span>Global Industries</span>
            <span>Startup AI</span>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 relative bg-gray-50 border-t border-gray-100 overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-indigo-100 rounded-full mix-blend-multiply opacity-50 transform translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <ScrollReveal className="flex-1 w-full order-2 lg:order-1" yOffset={30}>
                <div className="relative group perspective">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200 to-indigo-200 rounded-[3rem] transform -rotate-3 scale-105 opacity-50 blur-2xl -z-10 transition-transform group-hover:rotate-0"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop" 
                    alt="Our workspace" 
                    className="rounded-[2.5rem] shadow-2xl object-cover h-[450px] w-full border-[6px] border-white bg-white group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 max-w-[200px] animate-bounce" style={{animationDuration: '3s'}}>
                    <div className="flex -space-x-4 mb-3">
                       <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="User 1" />
                       <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="User 2" />
                       <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=3" alt="User 3" />
                       <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">+1k</div>
                    </div>
                    <p className="text-sm font-bold text-gray-800">HR Leaders trust us globally.</p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal className="flex-1 space-y-8 order-1 lg:order-2" delay={0.2}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-xs tracking-wide uppercase shadow-sm">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                  About PerformX
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-900 leading-[1.15]">
                  Revolutionizing how <br className="hidden lg:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-600">people grow.</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  We built PerformX because we were tired of losing track of goals in fragmented spreadsheets and enduring stressful, biased end-of-year appraisals. 
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                  <div>
                    <h4 className="text-4xl font-extrabold text-indigo-600 mb-1">100%</h4>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Cloud Based</p>
                  </div>
                  <div>
                    <h4 className="text-4xl font-extrabold text-emerald-600 mb-1">24/7</h4>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Goal Tracking</p>
                  </div>
                </div>
                <div className="pt-4">
                  <Link to="/register" className="inline-flex justify-center items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5">
                    Start Your Journey
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <ScrollReveal className="text-center mb-16" yOffset={20}>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-gray-900 tracking-tight">Everything you need</h2>
              <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">Powerful evaluation tools wrapped in a beautiful, intuitive interface.</p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <ScrollReveal 
                  key={index} 
                  delay={index * 0.1}
                  className={`${feature.bgClass} p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start gap-4 border ${feature.bgClass.includes('from-') ? 'border-transparent' : 'border-gray-100'} group`}
                >
                  <div className={`p-3 rounded-2xl ${feature.bgClass.includes('from-') ? 'bg-white/20' : 'bg-white'} shadow-sm`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold mb-2 ${feature.bgClass.includes('from-') ? 'text-white' : 'text-gray-900'}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${feature.bgClass.includes('from-') ? 'text-white/80' : 'text-gray-600'}`}>
                      {feature.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Deep Dive Section */}
        <section className="py-24 bg-gray-900 text-white rounded-t-[3rem] md:rounded-t-[5rem] overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop')] opacity-[0.03] bg-cover bg-center mix-blend-overlay"></div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <ScrollReveal className="flex-1 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-gray-300 font-bold text-xs tracking-wider uppercase mb-2 border border-white/5">
                  Seamless Workflows
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold leading-tight text-white">
                  Built for modern <br className="hidden lg:block"/> HR leadership.
                </h2>
                <ul className="space-y-5 text-gray-400 text-lg mx-auto lg:mx-0 max-w-md">
                  {[
                    'Admins orchestrate evaluation cycles.', 
                    'Managers effortlessly track and review goals.', 
                    'Employees gain clarity with active goal insights.'
                  ].map((text, i) => (
                    <li key={i} className="flex gap-4 items-center text-left">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="inline-flex bg-white text-gray-900 px-8 py-3.5 rounded-2xl font-bold hover:bg-gray-100 transition-colors">
                  Join PerformX Today
                </Link>
              </ScrollReveal>

              <ScrollReveal className="flex-1 w-full" yOffset={40} delay={0.2}>
                <div className="glass bg-white/5 p-6 md:p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative">
                  {/* Decorative dots */}
                  <div className="absolute top-4 left-6 flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                     <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <div className="h-12 bg-white/5 rounded-xl w-3/4"></div>
                    <div className="h-32 bg-white/10 rounded-2xl border border-white/10 p-5 flex flex-col justify-end">
                      <div className="h-4 bg-white/20 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-white/10 rounded w-1/3"></div>
                    </div>
                    <div className="flex gap-4">
                       <div className="h-20 bg-indigo-500/20 rounded-2xl border border-indigo-500/30 flex-1"></div>
                       <div className="h-20 bg-emerald-500/20 rounded-2xl border border-emerald-500/30 flex-1"></div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;