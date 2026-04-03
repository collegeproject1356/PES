import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FileSignature, AlertCircle } from 'lucide-react';
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

const ManagerDashboard = () => {
  const [stats, setStats] = useState({ teamSize: 0, pending: 0, completed: 0 });

  useEffect(() => {
    const fetchManagerStats = async () => {
      let teamCount = 0;
      let pendingReviews = 0;
      let approvedReviews = 0;

      try {
        const usersRes = await api.get('/users');
        teamCount = usersRes.data.filter(u => u.role === 'Employee' || u.role === 'employee').length;
      } catch (err) {
        console.error(err);
      }

      try {
        const evalsRes = await api.get('/evaluations/manager-evaluations');
        pendingReviews = evalsRes.data.filter(e => e.status === 'Submitted by Employee').length;
        approvedReviews = evalsRes.data.filter(e => e.status === 'Approved').length;
      } catch (err) {
        console.error(err);
      }

      setStats({ teamSize: teamCount, pending: pendingReviews, completed: approvedReviews });
    };

    fetchManagerStats();
  }, []);

  return (
    <div className="relative w-full">
      {/* Abstract Background Enhancements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000 pointer-events-none translate-y-1/2 -translate-x-1/4"></div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10">
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-extrabold text-gray-900 mb-1">Team Overview</h1>
          <p className="text-sm text-gray-500">Track your team's goals and pending evaluations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Team Size" 
            value={stats.teamSize} 
            icon={<Users size={28} />} 
            gradient="from-blue-500 to-indigo-600"
            shadow="hover:shadow-blue-100"
          />
          <StatCard 
            title="Action Needed" 
            value={stats.pending} 
            icon={<AlertCircle size={28} />} 
            gradient="from-amber-400 to-orange-500"
            shadow="hover:shadow-orange-100"
          />
          <StatCard 
            title="Approved" 
            value={stats.completed} 
            icon={<FileSignature size={28} />} 
            gradient="from-emerald-400 to-teal-500"
            shadow="hover:shadow-emerald-100"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ManagerDashboard;