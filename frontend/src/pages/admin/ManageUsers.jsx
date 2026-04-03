import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Trash2, Shield, User, Briefcase, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import api from '../../utils/axiosConfig';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'Manager' 
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { 
    fetchUsers(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      await api.post('/users', formData);
      setMessage({ type: 'success', text: 'Manager account created successfully!' });
      
      setTimeout(() => setMessage({ type: '', text: '' }), 4000);
      setFormData({ name: '', email: '', password: '', role: 'Manager' });
      setShowForm(false);
      fetchUsers(); 
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Error creating manager account.' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        await api.delete(`/users/${id}`);
        fetchUsers(); 
      } catch (err) {
        alert("Error deleting user");
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 pb-4 border-b border-gray-100/80 gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-gray-900 mb-1 tracking-tight">Manage System Users</h1>
          <p className="text-sm text-gray-500">Create Manager accounts and monitor all users.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow hover:-translate-y-0.5 w-full sm:w-auto justify-center ${showForm ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-none' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
        >
          {showForm ? <><X size={16}/> Cancel</> : <><UserPlus size={16} className="text-indigo-400"/> Add New Manager</>}
        </button>
      </div>

      <AnimatePresence>
        {message.text && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className={`p-3 mb-6 rounded-xl text-xs font-bold border flex items-center gap-2 shadow-sm ${message.type === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}
          >
            {message.type === 'error' ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

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
                <Briefcase size={18} />
              </div>
              Create Manager Account
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Manager Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm transition-all text-sm" placeholder="e.g. Rahul Sharma" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Email Address</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm transition-all text-sm" placeholder="manager@performx.com" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Temporary Password</label>
                <input type="text" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm transition-all text-sm" placeholder="Set a secure password" />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button type="submit" className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-md hover:shadow-indigo-600/30 hover:-translate-y-0.5 w-full sm:w-auto">
                Create Manager
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 overflow-hidden">
        <div className="p-6 border-b border-gray-100/80 flex items-center gap-3 bg-gradient-to-r from-gray-50/50 to-transparent">
           <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100/50">
             <User size={18} />
           </div>
           <h2 className="text-xl font-extrabold text-gray-900">Current Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/50 border-b border-gray-100">
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">User Details</th>
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">Role</th>
                <th className="p-4 font-bold text-gray-500 text-[10px] tracking-widest uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-50/50 hover:bg-white transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-extrabold shadow-inner text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-sm text-gray-900 mb-0.5">{user.name}</p>
                        <p className="text-xs font-medium text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shadow-sm border ${
                      user.role === 'Admin' ? 'bg-purple-50 text-purple-700 border-purple-100' : 
                      user.role === 'Manager' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                      'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      {user.role === 'Admin' && <Shield size={12} />}
                      {user.role === 'Manager' && <Briefcase size={12} />}
                      {user.role === 'Employee' && <User size={12} />}
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    {user.role !== 'Admin' && (
                      <button onClick={() => handleDelete(user._id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors tooltip opacity-50 group-hover:opacity-100" title="Delete User">
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-10 text-center text-gray-400 font-medium text-sm">
                    <User className="mx-auto mb-3 opacity-30" size={32} />
                    No users found.
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

export default ManageUsers;