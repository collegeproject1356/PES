import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Shield } from 'lucide-react';
import api from '../../utils/axiosConfig';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const usersRes = await api.get('/users');
        setEmployees(usersRes.data.filter(u => u.role.toLowerCase() === 'employee'));
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-extrabold text-gray-900 mb-1 tracking-tight">Team Roster</h1>
        <p className="text-sm text-gray-500">View all active employees eligible for evaluation cycles.</p>
      </div>

      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 overflow-hidden">
        <div className="p-6 border-b border-gray-100/80 bg-gray-50/30">
           <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
             <User size={18} className="text-indigo-500" />
             Active Employees
           </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {employees.map(emp => (
            <div key={emp._id} className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:scale-110 transition-transform shadow-sm shrink-0">
                <span className="font-bold text-lg">{emp.name?.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-base mb-1">{emp.name}</p>
                <div className="flex items-center gap-2 text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded w-fit">
                   <Shield size={10} /> Employee
                </div>
              </div>
            </div>
          ))}
          {employees.length === 0 && (
            <div className="text-center py-10 col-span-full">
              <p className="text-sm text-gray-500 font-medium">No active employees found in the system.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EmployeeList;
