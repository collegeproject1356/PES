import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Calendar, Edit, Trash2, X, RefreshCw } from 'lucide-react';
import api from '../../utils/axiosConfig';

const ManageCycles = () => {
  const [cycles, setCycles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: ''
  });

  const fetchCycles = async () => {
    try {
      const res = await api.get('/cycles');
      setCycles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCycles();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/cycles/${editId}`, formData);
      } else {
        await api.post('/cycles', formData);
      }
      
      setShowForm(false);
      setEditId(null);
      setFormData({ name: '', startDate: '', endDate: '' });
      fetchCycles();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving cycle');
    }
  };

  const handleEdit = (cycle) => {
    setFormData({
      name: cycle.name,
      startDate: formatDate(cycle.startDate),
      endDate: formatDate(cycle.endDate)
    });
    setEditId(cycle._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this evaluation cycle?')) {
      try {
        await api.delete(`/cycles/${id}`);
        fetchCycles();
      } catch (err) {
        alert('Error deleting cycle');
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 pb-4 border-b border-gray-100/80 gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-gray-900 mb-1 tracking-tight">Evaluation Cycles</h1>
          <p className="text-sm text-gray-500">Manage review periods for your organization.</p>
        </div>
        <button 
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            if(showForm) setFormData({ name: '', startDate: '', endDate: '' });
          }}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow hover:-translate-y-0.5 w-full sm:w-auto justify-center ${showForm ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-none' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
        >
          {showForm ? <><X size={16}/> Cancel</> : <><PlusCircle size={16} className="text-indigo-400" /> New Cycle</>}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form 
            initial={{ opacity: 0, height: 0, y: -20 }} 
            animate={{ opacity: 1, height: 'auto', y: 0 }} 
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/60 mb-8 overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-400 to-purple-500"></div>
            <h2 className="text-xl font-extrabold mb-6 text-gray-900 flex items-center gap-2">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                {editId ? <Edit size={18}/> : <Calendar size={18} />}
              </div>
              {editId ? 'Edit Evaluation Cycle' : 'Create Evaluation Cycle'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Cycle Name</label>
                <input type="text" required placeholder="e.g. Q2 Appraisal 2026" 
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm transition-all text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Start Date</label>
                <input type="date" required 
                  value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm transition-all text-sm text-gray-700" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">End Date</label>
                <input type="date" required 
                  value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm transition-all text-sm text-gray-700" />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button type="submit" className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-md hover:shadow-indigo-600/30 hover:-translate-y-0.5 w-full sm:w-auto flex justify-center items-center gap-2">
                {editId ? <><RefreshCw size={16}/> Update Cycle</> : <><PlusCircle size={16}/> Save Cycle</>}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 overflow-hidden">
        <div className="p-6 border-b border-gray-100/80 flex items-center gap-3 bg-gradient-to-r from-gray-50/50 to-transparent">
           <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100/50">
             <Calendar size={18} />
           </div>
           <h2 className="text-xl font-extrabold text-gray-900">Configured Cycles</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/50 border-b border-gray-100">
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">Cycle Name</th>
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">Timeline</th>
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">Status</th>
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cycles.map((cycle) => (
                <tr key={cycle._id} className="border-b border-gray-50/50 hover:bg-white transition-colors group">
                  <td className="p-4 font-extrabold text-sm text-gray-900">{cycle.name}</td>
                  <td className="p-4 text-gray-600 font-medium whitespace-nowrap text-xs">
                    <div className="flex items-center gap-2 bg-gray-50 w-fit px-2.5 py-1 rounded-lg border border-gray-100">
                      <Calendar size={12} className="text-gray-400" /> {formatDate(cycle.startDate)} <span className="text-gray-300 mx-1">→</span> {formatDate(cycle.endDate)}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shadow-sm inline-block ${cycle.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                      {cycle.isActive ? 'Active' : 'Completed'}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(cycle)} className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-500 transition-colors tooltip" title="Edit Cycle"><Edit size={16} strokeWidth={2.5}/></button>
                    <button onClick={() => handleDelete(cycle._id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors tooltip" title="Delete Cycle"><Trash2 size={16} strokeWidth={2.5}/></button>
                  </td>
                </tr>
              ))}
              {cycles.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-gray-400 font-medium text-sm">
                    <Calendar className="mx-auto mb-3 opacity-30" size={32} />
                    No evaluation cycles found. Create one.
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

export default ManageCycles;