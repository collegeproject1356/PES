import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Edit, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../utils/axiosConfig';

const SetGoals = () => {
  const [employees, setEmployees] = useState([]);
  const [activeCycles, setActiveCycles] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeId: '', cycleId: '', title: '', description: '', status: 'Pending'
  });

  const fetchData = async () => {
    try {
      const usersRes = await api.get('/users');
      setEmployees(usersRes.data.filter(u => u.role.toLowerCase() === 'employee'));
    } catch (err) { console.error(err); }

    try {
      const cyclesRes = await api.get('/cycles');
      const currentCycles = cyclesRes.data.filter(c => c.isActive === true);
      setActiveCycles(currentCycles);
      if (currentCycles.length > 0 && !location.state?.editGoal) {
        setFormData(prev => ({ ...prev, cycleId: currentCycles[0]._id }));
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => { 
    fetchData(); 
    
    // Check if we came from Registry edit click
    if (location.state && location.state.editGoal) {
      const goal = location.state.editGoal;
      setFormData({ 
          employeeId: goal.employeeId?._id || goal.employeeId, 
          cycleId: goal.cycleId?._id || goal.cycleId,
          title: goal.title, 
          description: goal.description,
          status: goal.status || 'Pending'
      });
      setEditId(goal._id);
      
      // Clear state so refresh doesn't keep it in edit mode
      window.history.replaceState({}, document.title)
    }
  }, [location.state]);

  const handleAssignGoal = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!formData.employeeId) return setMessage({ type: 'error', text: 'Select an employee first.' });
    if (!formData.cycleId) return setMessage({ type: 'error', text: 'Select an evaluation cycle.' });

    try {
      if (editId) {
        await api.put(`/goals/${editId}`, formData);
        setMessage({ type: 'success', text: 'Goal updated successfully!' });
        setTimeout(() => {
          navigate('/manager/registry'); // Send them back to registry on successful edit
        }, 1500);
      } else {
        await api.post('/goals', formData);
        setMessage({ type: 'success', text: 'Goal assigned successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 4000);
        setFormData({ ...formData, employeeId: '', title: '', description: '', status: 'Pending' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to process request.' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-extrabold text-gray-900 mb-1 tracking-tight">{editId ? 'Modify Associated Goal' : 'Assign Goal'}</h1>
        <p className="text-sm text-gray-500">{editId ? 'Updating an existing goal target' : 'Create and assign a new measurable objective to a team member.'}</p>
      </div>

      {activeCycles.length === 0 && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl font-bold mb-6 border border-red-100 flex items-center gap-3 shadow-sm text-sm">
          <AlertTriangle size={20} /> 
          <div>
            <p className="uppercase tracking-wider text-[10px] opacity-70 mb-0.5">Warning</p>
            <p>There are no active evaluation cycles. Contact Admin.</p>
          </div>
        </div>
      )}

      <div className="bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-sm border border-white/60">
        <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center text-emerald-600 shadow-inner">
            {editId ? <Edit size={16} /> : <Target size={16} />}
          </div>
          {editId ? 'Edit Performance Parameter' : 'New Performance Parameter'}
        </h2>
        
        <form className="space-y-5" onSubmit={handleAssignGoal}>
          <AnimatePresence>
            {message.text && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}
              >
                {message.type === 'error' ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Assign To</label>
              <select required className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 bg-white shadow-sm transition-all text-sm text-gray-700" value={formData.employeeId} onChange={(e) => setFormData({...formData, employeeId: e.target.value})}>
                <option value="">-- Choose Team Member --</option>
                {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Target Cycle</label>
              <select required disabled={editId} className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 bg-white shadow-sm transition-all text-sm text-gray-700 disabled:bg-gray-50 disabled:opacity-70" value={formData.cycleId} onChange={(e) => setFormData({...formData, cycleId: e.target.value})}>
                <option value="">-- Select Cycle --</option>
                {activeCycles.map(cycle => <option key={cycle._id} value={cycle._id}>{cycle.name}</option>)}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Goal Title</label>
            <input type="text" required placeholder="e.g. Master React framework" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-sm transition-all text-sm" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Expected Output / Description</label>
            <textarea rows="4" required placeholder="Outline the expected outcomes and KPIs..." className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-sm transition-all resize-none text-sm text-gray-700" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
          </div>

          {editId && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Current Status</label>
              <select className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 bg-white shadow-sm transition-all text-sm text-gray-700" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            {editId && <button type="button" onClick={() => navigate('/manager/registry')} className="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all text-center">Cancel</button>}
            <button type="submit" disabled={activeCycles.length === 0} className={`text-white px-8 py-2.5 rounded-xl font-bold text-sm transition-all shadow border border-transparent flex items-center justify-center gap-2 ${activeCycles.length > 0 ? 'bg-gray-900 hover:bg-gray-800 hover:-translate-y-0.5' : 'bg-gray-300 cursor-not-allowed shadow-none'}`}>
              {editId ? 'Commit Changes' : 'Assign to Protocol'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SetGoals;