import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Activity } from 'lucide-react';
import api from '../../utils/axiosConfig';

const StatCard = ({ title, value, icon, gradient, shadow }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }} 
    className={`p-5 rounded-2xl shadow-sm border border-white/60 flex items-center gap-4 relative overflow-hidden backdrop-blur-md bg-white/70 ${shadow}`}
  >
    <div className={`absolute -right-6 -bottom-6 opacity-20 transform rotate-12 scale-[2] text-white`}>
      {icon}
    </div>
    <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md relative z-10`}>
      {icon}
    </div>
    <div className="relative z-10">
      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">{title}</p>
      <h3 className="text-3xl font-extrabold text-gray-900">{value}</h3>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ employees: 0, totalEvals: 0, pendingEvals: 0 });
  const [activeCycles, setActiveCycles] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const usersRes = await api.get('/users');
        const empCount = usersRes.data.filter(u => u.role.toLowerCase() === 'employee').length;

        const evalsRes = await api.get('/evaluations/all');
        const pendingCount = evalsRes.data.filter(e => e.status !== 'Approved').length;

        const cyclesRes = await api.get('/cycles');
        const currentCycles = cyclesRes.data.filter(c => c.isActive === true); 

        setStats({ employees: empCount, totalEvals: evalsRes.data.length, pendingEvals: pendingCount });
        setActiveCycles(currentCycles);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div className="relative w-full">
      {/* Abstract Background Enhancements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob pointer-events-none -translate-y-1/2 -translate-x-1/4"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000 pointer-events-none translate-y-1/2 translate-x-1/4"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-extrabold text-gray-900 mb-1">Platform Overview</h1>
          <p className="text-sm text-gray-500">Monitor employee engagement and evaluation cycles at a glance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <StatCard 
            title="Total Employees" 
            value={stats.employees} 
            icon={<Users size={28} />} 
            gradient="from-blue-500 to-indigo-600"
            shadow="hover:shadow-indigo-100"
          />
          <StatCard 
            title="Total Evaluations" 
            value={stats.totalEvals} 
            icon={<FileText size={28} />} 
            gradient="from-emerald-400 to-teal-500"
            shadow="hover:shadow-emerald-100"
          />
          <StatCard 
            title="Pending Reviews" 
            value={stats.pendingEvals} 
            icon={<Activity size={28} />} 
            gradient="from-amber-400 to-orange-500"
            shadow="hover:shadow-orange-100"
          />
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/60">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Active Evaluation Cycles</h2>
            {activeCycles.length > 0 && (
              <div className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            {activeCycles.length > 0 ? (
              activeCycles.map((cycle, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={cycle._id} 
                  className="bg-gradient-to-r from-indigo-50/50 to-white border border-indigo-100/60 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:shadow-sm transition-shadow"
                >
                  <div>
                    <h3 className="font-extrabold text-indigo-950 text-lg tracking-tight mb-0.5 group-hover:text-indigo-600 transition-colors">{cycle.name}</h3>
                    <p className="text-indigo-600/80 text-sm font-medium">
                      {new Date(cycle.startDate).toLocaleDateString(undefined, { dateStyle: 'medium' })} &nbsp;&mdash;&nbsp; {new Date(cycle.endDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </p>
                  </div>
                  <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-md shadow-indigo-200 inline-flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Currently Active
                  </span>
                </motion.div>
              ))
            ) : (
              <div className="bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center flex flex-col items-center justify-center">
                <Activity className="text-gray-300 mb-3" size={32} />
                <p className="text-sm font-bold text-gray-600">No active cycles found.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;