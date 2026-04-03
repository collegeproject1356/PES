import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Award, Star } from 'lucide-react';
import api from '../../utils/axiosConfig';

const EmployeeFeedback = () => {
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    const fetchMyEvals = async () => {
      try {
        const res = await api.get('/evaluations/my-evaluations');
        setEvaluations(res.data.filter(e => e.status === 'Approved'));
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyEvals();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mb-10">
        <h1 className="text-4xl font-heading font-extrabold text-gray-900 mb-2">Performance Feedback</h1>
        <p className="text-lg text-gray-500">Review the feedback and ratings provided by your manager.</p>
      </div>

      <div className="space-y-6">
        {evaluations.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md p-10 rounded-3xl shadow-sm border border-white/50 text-center">
            <MessageSquare className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-lg font-bold text-gray-600">No feedback available yet.</p>
            <p className="text-gray-400 mt-2">Your manager's approved evaluations will appear here.</p>
          </div>
        ) : (
          evaluations.map((ev, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={ev._id} 
              className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/60 group hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-100/80 pb-6 mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200 text-white">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-xl tracking-tight">{ev.cycleId?.name || 'Evaluation Cycle'}</h3>
                    <p className="text-sm font-medium text-gray-500">Completed Review</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-3 rounded-2xl border border-amber-100/50 shadow-sm">
                  <Star className="text-amber-500 fill-amber-500" size={20} />
                  <span className="font-extrabold text-amber-700 text-lg">{ev.rating} <span className="text-sm text-amber-600/70">/ 5</span></span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 p-6 rounded-2xl border border-indigo-100/50">
                <h4 className="text-sm font-bold text-indigo-900 mb-3 flex items-center gap-2 uppercase tracking-wider">
                  <MessageSquare size={16} className="text-indigo-500" /> Manager's Insights
                </h4>
                <p className="text-gray-700 leading-relaxed italic font-medium">
                  "{ev.managerFeedback}"
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default EmployeeFeedback;