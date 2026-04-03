import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, BarChart, Eye, X, Target, FileText } from 'lucide-react';
import api from '../../utils/axiosConfig';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [userGoals, setUserGoals] = useState([]);

  useEffect(() => {
    const fetchAllEvaluations = async () => {
      try {
        const res = await api.get('/evaluations/all');
        setReports(res.data);
      } catch (err) { console.error(err); }
    };
    fetchAllEvaluations();
  }, []);

  const exportToCSV = () => {
    if (reports.length === 0) return alert("No data to export!");
    
    const headers = "Employee Name,Cycle,Status,Final Rating\n";
    const rows = reports.map(r => {
      const empName = r.employeeId?.name || 'Unknown';
      const cycleName = r.cycleId?.name || 'N/A';
      const status = r.status;
      const rating = r.rating || 'Pending';
      return `${empName},${cycleName},${status},${rating}`;
    }).join("\n");

    const csvContent = headers + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Performance_Reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewDetails = async (report) => {
    setSelectedReport(report);
    setUserGoals([]);
    try {
      const res = await api.get('/goals/all');
      const filteredGoals = res.data.filter(g => g.employeeId?._id === report.employeeId?._id);
      setUserGoals(filteredGoals);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 pb-4 border-b border-gray-100/80 gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-gray-900 mb-1 tracking-tight">Performance Reports</h1>
          <p className="text-sm text-gray-500">Company-wide appraisal results and analytics.</p>
        </div>
        
        <button onClick={exportToCSV} className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-all shadow hover:-translate-y-0.5 w-full sm:w-auto justify-center">
            <Download size={16} className="text-indigo-400" /> Export CSV Report
        </button>
      </div>

      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 overflow-hidden">
        <div className="p-6 border-b border-gray-100/80 flex items-center gap-3 bg-gradient-to-r from-gray-50/50 to-transparent">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100/50">
            <BarChart size={18} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">Evaluations Summary</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/50 border-b border-gray-100">
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">Employee Name</th>
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">Cycle</th>
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">Final Rating</th>
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">Status</th>
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((data) => (
                <tr key={data._id} className="border-b border-gray-50/50 hover:bg-white transition-colors group">
                  <td className="p-4 font-bold text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-md bg-gray-100 text-gray-500 flex items-center justify-center text-[10px] font-bold">{data.employeeId?.name?.charAt(0) || '?'}</div>
                       {data.employeeId?.name || 'Unknown'}
                    </div>
                  </td>
                  <td className="p-4 text-xs font-medium text-gray-600">
                    <span className="bg-gray-100/80 px-2.5 py-1 rounded-lg border border-gray-200/50">
                      {data.cycleId?.name || 'N/A'}
                    </span>
                  </td>
                  <td className="p-4">
                    {data.rating ? (
                      <span className="font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100 inline-flex items-center gap-1 text-xs">
                        {data.rating} <span className="opacity-50 text-[10px]">/ 5</span>
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider bg-gray-50 px-2.5 py-1 rounded-lg">Pending</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shadow-sm inline-block border ${data.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>{data.status}</span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => handleViewDetails(data)} className="flex items-center justify-center gap-1.5 text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-all w-full sm:w-auto overflow-hidden">
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-gray-400 font-medium text-sm">
                    <FileText className="mx-auto mb-3 opacity-30" size={32} />
                    No evaluation data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-white">
              <button onClick={() => setSelectedReport(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 bg-gray-100/80 hover:bg-gray-200 p-2 rounded-xl transition-all shadow-sm"><X size={20} strokeWidth={2.5}/></button>
              
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100/80 pb-5">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Evaluation Details</h2>
                  <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mt-0.5">Full Report</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100/80 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-5"><Target size={60} /></div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-extrabold mb-1">Employee</p>
                  <p className="font-extrabold text-gray-900 text-lg">{selectedReport.employeeId?.name}</p>
                </div>
                <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100/80 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-5"><BarChart size={60} /></div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-extrabold mb-1">Cycle</p>
                  <p className="font-extrabold text-gray-900 text-lg">{selectedReport.cycleId?.name}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                  <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md"><Target size={14}/></div>
                  Assigned Goals
                </h3>
                <div className="space-y-2">
                  {userGoals.map(goal => (
                    <div key={goal._id} className="bg-white border border-gray-100 shadow-sm p-3 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:shadow-md transition-shadow">
                      <div>
                        <p className="font-bold text-sm text-gray-900">{goal.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{goal.description}</p>
                      </div>
                      <span className={`self-start sm:self-auto px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg border shadow-sm ${goal.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>{goal.status || 'Pending'}</span>
                    </div>
                  ))}
                  {userGoals.length === 0 && (
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                      <p className="text-xs font-bold text-gray-400">No goals found for this cycle.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-extrabold text-indigo-900 mb-3 text-sm">Employee's Self-Evaluation</h3>
                <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 p-4 rounded-xl border border-indigo-100 text-gray-700 text-sm font-medium leading-relaxed shadow-inner">
                  {selectedReport.selfEvaluation || <span className="opacity-50 italic">Not provided.</span>}
                </div>
              </div>

              {selectedReport.status === 'Approved' ? (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <h3 className="font-extrabold text-emerald-900 text-sm">Manager's Feedback</h3>
                    <div className="bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-extrabold shadow-sm flex items-center gap-1.5">
                       Rating: <span className="text-base">{selectedReport.rating}</span><span className="opacity-60 text-[10px]">/ 5</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 p-4 rounded-xl border border-emerald-100 text-gray-700 text-sm font-medium leading-relaxed shadow-inner">
                    {selectedReport.managerFeedback}
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 text-amber-700 p-4 rounded-xl border border-amber-100 text-sm font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0"><BarChart size={12}/></div>
                  This evaluation is currently pending manager's review.
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Reports;