import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axiosConfig';

const GoalRegistry = () => {
  const [assignedGoals, setAssignedGoals] = useState([]);
  const navigate = useNavigate();

  const fetchGoals = async () => {
    try {
      const goalsRes = await api.get('/goals/assigned');
      setAssignedGoals(goalsRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleEdit = (goal) => {
    // Navigate to Set Goals page with the goal data in state to trigger edit mode
    navigate('/manager/goals', { state: { editGoal: goal } });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this goal?")) {
      try {
        await api.delete(`/goals/${id}`);
        fetchGoals(); 
      } catch (err) {
        alert('Failed to delete goal.');
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-extrabold text-gray-900 mb-1 tracking-tight">Current Goals Registry</h1>
        <p className="text-sm text-gray-500">Monitor and manage all objectives assigned to your team.</p>
      </div>

      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100">
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">Goal Objective</th>
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">Assigned To</th>
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">Evaluation Cycle</th>
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">Progress</th>
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedGoals.map((goal) => (
                <tr key={goal._id} className="border-b border-gray-50/50 hover:bg-white transition-colors group">
                  <td className="p-4 text-sm font-bold text-gray-900">{goal.title}</td>
                  <td className="p-4 text-xs font-medium text-gray-600">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-md bg-gray-100 text-gray-500 flex items-center justify-center text-[10px] font-bold">{goal.employeeId?.name?.charAt(0) || '?'}</div>
                       {goal.employeeId?.name || 'Unknown'}
                    </div>
                  </td>
                  <td className="p-4 text-xs font-medium text-gray-500">
                    <span className="bg-gray-100/80 px-2.5 py-1 rounded-lg border border-gray-200/50">
                      {goal.cycleId?.name || 'N/A'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shadow-sm border ${
                      goal.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                      goal.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}>
                      {goal.status || 'Pending'}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(goal)} className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-500 transition-colors tooltip" title="Edit Goal">
                      <Edit size={16} strokeWidth={2.5} />
                    </button>
                    <button onClick={() => handleDelete(goal._id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors tooltip" title="Delete Goal">
                      <Trash2 size={16} strokeWidth={2.5} />
                    </button>
                  </td>
                </tr>
              ))}
              {assignedGoals.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-12 text-gray-400 font-medium text-sm">
                    <Target className="mx-auto mb-3 opacity-30" size={32} />
                    No active goals established yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default GoalRegistry;
