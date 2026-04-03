import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Check, User, CheckSquare } from 'lucide-react';
import api from '../../utils/axiosConfig';

const ReviewEvaluations = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [selectedEval, setSelectedEval] = useState(null);
  const [rating, setRating] = useState(0);
  const [managerFeedback, setManagerFeedback] = useState('');
  const [message, setMessage] = useState('');

  const fetchEvaluations = async () => {
    try {
      const res = await api.get('/evaluations/manager-evaluations');
      setEvaluations(res.data.filter(e => e.status === 'Submitted by Employee'));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchEvaluations(); }, []);

  const handleApprove = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please provide a rating before approving.");
      return;
    }

    try {
      await api.put(`/evaluations/${selectedEval._id}/review`, { rating, managerFeedback });
      setMessage("Evaluation Approved Successfully!");
      setTimeout(() => setMessage(''), 4000);
      setSelectedEval(null);
      setRating(0);
      setManagerFeedback('');
      fetchEvaluations();
    } catch (err) {
      alert("Error approving evaluation.");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mb-10">
        <h1 className="text-4xl font-heading font-extrabold text-gray-900 mb-2">Review Evaluations</h1>
        <p className="text-lg text-gray-500">Provide feedback and ratings for your team members.</p>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="mb-8 bg-emerald-50 text-emerald-700 p-5 rounded-2xl font-bold border border-emerald-100 flex items-center gap-3 shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Check size={16} />
            </div>
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white/60 min-h-[400px]">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">Pending Reviews</h2>
          <div className="space-y-4">
            {evaluations.map(ev => (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={ev._id} 
                onClick={() => setSelectedEval(ev)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedEval?._id === ev._id 
                    ? 'bg-emerald-50 border-emerald-400 shadow-md shadow-emerald-100/50' 
                    : 'bg-white border-transparent hover:border-gray-100 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${selectedEval?._id === ev._id ? 'bg-emerald-200 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                    {ev.employeeId?.name.charAt(0)}
                  </div>
                  <span className={`font-bold text-sm ${selectedEval?._id === ev._id ? 'text-emerald-900' : 'text-gray-800'}`}>{ev.employeeId?.name}</span>
                </div>
                <p className="text-xs font-medium text-gray-500 ml-11">{ev.cycleId?.name}</p>
              </motion.div>
            ))}
            {evaluations.length === 0 && (
              <div className="text-center py-10">
                <Check className="mx-auto text-gray-300 mb-3" size={40} />
                <p className="text-sm font-bold text-gray-500">All caught up!</p>
                <p className="text-xs text-gray-400 mt-1">No pending evaluations.</p>
              </div>
            )}
          </div>
        </div>

        {selectedEval ? (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/60"
          >
            <div className="border-b border-gray-100 pb-6 mb-8 flex items-center gap-5">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center text-emerald-600 shadow-inner">
                <User size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{selectedEval.employeeId?.name}</h2>
                <p className="text-sm font-bold text-emerald-600 mt-1 uppercase tracking-wider">{selectedEval.employeeId?.role}</p>
              </div>
            </div>

            <div className="mb-10 bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100/80 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-400"></div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                Employee's Self-Evaluation
              </h3>
              <p className="text-gray-700 text-base leading-relaxed italic font-medium">"{selectedEval.selfEvaluation}"</p>
            </div>

            <form className="space-y-8" onSubmit={handleApprove}>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <Star size={18} className="text-amber-500" /> Performance Rating
                </label>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      key={num} type="button" onClick={() => setRating(num)}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-extrabold transition-all shadow-sm border-2 ${
                        rating >= num 
                          ? 'bg-gradient-to-tr from-amber-400 to-orange-400 text-white border-transparent shadow-amber-200 shadow-lg' 
                          : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-amber-300 hover:text-amber-500'
                      }`}
                    >{num}</motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <MessageSquare size={18} className="text-emerald-500" /> Constructive Feedback
                </label>
                <textarea 
                  rows="5" required placeholder="Outline areas of excellence and opportunities for growth..." 
                  className="w-full p-5 rounded-2xl border border-gray-200 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none shadow-sm text-gray-700 bg-white/50 backdrop-blur-sm"
                  value={managerFeedback} onChange={(e) => setManagerFeedback(e.target.value)}
                ></textarea>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button type="submit" className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl hover:shadow-gray-900/20 hover:-translate-y-1 flex items-center gap-3">
                  <Check size={20} /> Approve & Finalize Review
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <div className="lg:col-span-2 bg-white/40 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-16 text-gray-400 min-h-[400px]">
            <CheckSquare className="mb-4 text-gray-300" size={64} strokeWidth={1} />
            <p className="text-xl font-bold text-gray-500">Select an assessment to review</p>
            <p className="text-sm mt-2 font-medium">Choose an evaluation from the pending list on the left.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ReviewEvaluations;