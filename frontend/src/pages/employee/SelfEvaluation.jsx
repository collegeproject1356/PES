import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, FileText, Send, AlertTriangle, Target } from 'lucide-react';
import api from '../../utils/axiosConfig';

const SelfEvaluation = () => {
  const [feedback, setFeedback] = useState('');
  const [myGoals, setMyGoals] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  
  const [activeCycles, setActiveCycles] = useState([]);
  const [selectedCycleId, setSelectedCycleId] = useState('');
  
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchData = async () => {
      let fetchedGoals = [];
      try {
        const goalsRes = await api.get('/goals/my-goals');
        fetchedGoals = goalsRes.data;
        setMyGoals(fetchedGoals);
      } catch (err) { console.error(err); }
      
      try {
        const cyclesRes = await api.get('/cycles');
        const currentCycles = cyclesRes.data.filter(c => c.isActive === true);
        setActiveCycles(currentCycles);
        
        if (currentCycles.length > 0) {
          const firstCycleId = currentCycles[0]._id;
          setSelectedCycleId(firstCycleId);
          setFilteredGoals(fetchedGoals.filter(g => g.cycleId?._id === firstCycleId || g.cycleId === firstCycleId));
        }
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, []);

  const handleCycleChange = (e) => {
    const newCycleId = e.target.value;
    setSelectedCycleId(newCycleId);
    setFilteredGoals(myGoals.filter(g => g.cycleId?._id === newCycleId || g.cycleId === newCycleId));
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!selectedCycleId) return setMessage({ type: 'error', text: 'Please select an evaluation cycle.' });
    if (filteredGoals.length === 0) return setMessage({ type: 'error', text: 'You have no goals assigned for this cycle.' });

    try {
      await api.post('/evaluations/self-eval', {
        selfEvaluation: feedback,
        cycleId: selectedCycleId, 
        managerId: filteredGoals[0].managerId 
      });
      setMessage({ type: 'success', text: 'Self-evaluation submitted successfully!' });
      setFeedback('');
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to submit evaluation.' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-gray-100/80 gap-6">
        <div>
          <h1 className="text-4xl font-heading font-extrabold text-gray-900 mb-2 tracking-tight">Self Evaluation</h1>
          <p className="text-lg text-gray-500">Reflect on your achievements and submit your appraisal.</p>
        </div>
        
        {activeCycles.length > 0 && (
          <div className="w-full md:w-72 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Target size={20} />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest pl-1 mb-0.5">Active Cycle</label>
              <select 
                className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm font-bold text-gray-800 cursor-pointer appearance-none"
                value={selectedCycleId} 
                onChange={handleCycleChange}
              >
                {activeCycles.map(cycle => <option key={cycle._id} value={cycle._id}>{cycle.name}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {activeCycles.length === 0 && (
        <div className="bg-red-50 text-red-600 p-5 rounded-2xl font-bold mb-8 border border-red-100 flex items-center gap-3 shadow-sm">
          <AlertTriangle size={24} /> 
          <div>
            <p className="uppercase tracking-wider text-xs opacity-70 mb-0.5">Warning</p>
            <p>There are no active evaluation cycles right now.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/50 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <CheckCircle size={20} /> 
            </div>
            Cycle Goals
          </h2>
          <div className="space-y-4">
            {filteredGoals.map((goal, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                key={goal._id} 
                className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-1.5 h-full ${
                  goal.status === 'Completed' ? 'bg-emerald-400' : 
                  goal.status === 'In Progress' ? 'bg-blue-400' : 'bg-gray-300'
                }`}></div>
                <h3 className="font-bold text-gray-800 text-base mb-3 group-hover:text-indigo-600 transition-colors pl-2 pr-6 leading-snug">{goal.title}</h3>
                <span className={`text-[11px] uppercase tracking-widest font-extrabold ml-2 inline-block px-3 py-1.5 rounded-lg shadow-sm ${
                  goal.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 
                  goal.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-gray-50 text-gray-500 border border-gray-200'
                }`}>
                  {goal.status || 'Pending'}
                </span>
              </motion.div>
            ))}
            {filteredGoals.length === 0 && selectedCycleId && (
              <div className="text-center py-8">
                <Target className="mx-auto text-gray-300 mb-3" size={40} />
                <p className="text-sm font-bold text-gray-500">No Goals Found</p>
                <p className="text-xs text-gray-400 mt-1">Wait for your manager to assign goals.</p>
              </div>
            )}
          </div>
        </div>

        <div className="xl:col-span-2 bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-sm border border-white/60">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 shadow-inner">
              <FileText size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">Evaluation Form</h2>
              <p className="text-sm font-bold text-indigo-600 tracking-wide">SUBMIT YOUR REVIEW</p>
            </div>
          </div>
          
          <form className="space-y-8" onSubmit={handleSubmit}>
            <AnimatePresence>
              {message.text && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className={`p-5 rounded-2xl text-sm font-bold border flex items-center gap-3 ${message.type === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}
                >
                  {message.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
                  {message.text}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
              <div className="p-4 bg-gray-50/50 rounded-xl mb-2">
                <label className="block text-sm font-extrabold text-gray-800 tracking-wide uppercase">Highlight your key achievements:</label>
                <p className="text-xs text-gray-500 mt-1">Provide specific examples of how you met your goals.</p>
              </div>
              <textarea 
                rows="8" required
                placeholder="I successfully managed..." 
                className="w-full p-5 bg-transparent outline-none focus:ring-0 transition resize-none text-gray-700 font-medium placeholder-gray-400"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                disabled={!selectedCycleId || filteredGoals.length === 0}
              ></textarea>
            </div>

            <div className="flex justify-end relative z-20">
              <button 
                type="submit" 
                disabled={!selectedCycleId || filteredGoals.length === 0} 
                className={`px-10 py-4 rounded-2xl font-bold transition-all shadow-xl flex items-center gap-3 w-full sm:w-auto justify-center ${
                  selectedCycleId && filteredGoals.length > 0 
                  ? 'bg-gray-900 text-white hover:bg-gray-800 hover:-translate-y-1 hover:shadow-gray-900/20 cursor-pointer' 
                  : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none'
                }`}
              >
                <Send size={20} className={selectedCycleId && filteredGoals.length > 0 ? "text-indigo-400" : ""} /> 
                Submit Evaluation
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default SelfEvaluation;