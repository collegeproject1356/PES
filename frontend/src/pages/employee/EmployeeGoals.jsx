import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle, Clock } from 'lucide-react';
import api from '../../utils/axiosConfig';

const EmployeeGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyGoals = async () => {
      try {
        const res = await api.get('/goals/my-goals');
        setGoals(res.data);
      } catch (err) {
        console.error("Error fetching goals", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyGoals();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">My Assigned Goals</h1>
      <p className="text-gray-500 mb-8">View the goals assigned to you by your manager.</p>

      {loading ? (
        <p className="text-indigo-600 font-medium">Loading goals...</p>
      ) : goals.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <Target className="mx-auto text-gray-300 mb-3" size={40} />
          <p className="text-gray-500">No goals have been assigned to you yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <div key={goal._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-indigo-50 p-3 rounded-xl"><Target className="text-indigo-600" size={24}/></div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  goal.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                  goal.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {goal.status || 'Pending'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{goal.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{goal.description}</p>
              <div className="text-xs text-gray-400 border-t border-gray-50 pt-3 flex items-center gap-1">
                <Clock size={14} /> Assigned on: {new Date(goal.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default EmployeeGoals;