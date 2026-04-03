import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Activity } from 'lucide-react';
import api from '../../utils/axiosConfig';

const EmployeeDashboard = () => {
  const [activeCycles, setActiveCycles] = useState([]);
  const [recentGoals, setRecentGoals] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const cyclesRes = await api.get('/cycles');
        const currentCycles = cyclesRes.data.filter(c => c.isActive === true);
        setActiveCycles(currentCycles);

        const goalsRes = await api.get('/goals/my-goals');
        setRecentGoals(goalsRes.data.slice(0, 4)); 
      } catch (err) {
        console.error("Error fetching employee data", err);
      }
    };
    fetchEmployeeData();
  }, []);

  return (
    <div className="relative w-full pb-8">
      {/* Abstract Background Enhancements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob pointer-events-none -translate-y-1/3 translate-x-1/3"></div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full">
        
        {/* Premium Welcome Banner - Scaled Down */}
        <div className="relative w-full rounded-[2rem] overflow-hidden mb-8 shadow-xl">
          <div className="absolute inset-0 bg-gray-900 z-0">
             <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Abstract background" />
             <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/40 mix-blend-multiply"></div>
          </div>
          <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 h-full">
             <div className="text-white z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider uppercase mb-4 shadow-sm rounded-full">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 border border-emerald-200"></span>
                  Employee Portal
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-extrabold mb-2 leading-tight">
                  Welcome to <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">your growth.</span>
                </h1>
                <p className="text-indigo-100 text-sm max-w-sm font-medium leading-relaxed">
                  Track your objectives and finalize your evaluations from one streamlined hub.
                </p>
             </div>

             {/* Floating Stats Glass Box */}
             <div className="glass bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shrink-0 text-white w-full md:w-auto min-w-[160px] shadow-lg relative transform transition hover:-translate-y-1">
                <div className="flex -space-x-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-indigo-200 flex items-center justify-center font-bold text-xs">G</div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-purple-200 flex items-center justify-center font-bold text-xs">O</div>
                </div>
                <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-wider mb-0.5">Active Goals</p>
                <div className="text-3xl font-extrabold">{recentGoals.length}</div>
             </div>
          </div>
        </div>

        {/* Dynamic Cycles Section */}
        <div className="space-y-4 mb-8">
          {activeCycles.length > 0 ? (
            activeCycles.map((cycle, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                key={cycle._id} 
                className="relative overflow-hidden bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-100 to-purple-100 opacity-50 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-5">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 rounded-full text-emerald-700 border border-emerald-100 text-[10px] font-bold tracking-widest uppercase mb-3 shadow-sm relative">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Window Open
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">{cycle.name}</h2>
                    <p className="text-gray-500 text-sm max-w-md">Your organization is currently collecting self-evaluations. Log your achievements now.</p>
                  </div>
                  <Link to="/employee/self-evaluation" className="shrink-0">
                    <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-indigo-600 transition-all duration-300 w-full md:w-auto hover:-translate-y-0.5">
                      Begin Evaluation
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-gray-600 border border-white shadow-sm relative overflow-hidden flex flex-col items-center justify-center text-center group">
              <div className="w-12 h-12 bg-gray-100/80 rounded-xl flex items-center justify-center text-gray-400 mb-4 shadow-sm border border-white group-hover:-translate-y-1 transition-transform">
                <Target size={24} />
              </div>
              <h2 className="text-xl font-extrabold mb-1 text-gray-900 tracking-tight">No Active Cycle</h2>
              <p className="text-gray-500 text-sm max-w-sm">There is no performance evaluation cycle active right now.</p>
            </div>
          )}
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-sm border border-white border-b-gray-100 h-fit flex flex-col transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-extrabold text-xl text-gray-900 mb-0.5">Current Objectives</h3>
                <p className="text-xs font-medium text-gray-400">Your recent targets</p>
              </div>
              <Link to="/employee/goals" className="inline-flex items-center justify-center text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full hover:bg-indigo-100 transition-colors">
                View All
              </Link>
            </div>
            
            <ul className="space-y-3">
              {recentGoals.map((goal, index) => (
                <motion.li 
                  initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}
                  key={goal._id} 
                  className="flex justify-between items-center text-sm p-3.5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow hover:border-indigo-100 transition-all group"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-gray-900 font-bold block mb-0.5 text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">{goal.title}</span> 
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase font-bold tracking-widest text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
                      <Target size={8} /> {goal.cycleId?.name}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-lg font-bold text-[9px] sm:text-[10px] uppercase tracking-wider shrink-0 shadow-sm border ${
                    goal.status === 'Completed' ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : 
                    goal.status === 'In Progress' ? 'text-blue-700 bg-blue-50 border-blue-100' : 'text-amber-700 bg-amber-50 border-amber-100'
                  }`}>
                    {goal.status || 'Pending'}
                  </span>
                </motion.li>
              ))}
              {recentGoals.length === 0 && (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-2 border border-gray-100">
                    <Target className="text-gray-300" size={16} />
                  </div>
                  <span className="text-gray-500 text-sm font-medium">No objectives assigned yet.</span>
                </div>
              )}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeeDashboard;