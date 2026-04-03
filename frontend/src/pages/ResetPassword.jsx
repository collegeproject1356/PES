import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Lock, CheckCircle2 } from 'lucide-react';
import api from '../utils/axiosConfig';
import Navbar from '../components/layout/Navbar';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { token } = useParams(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (password !== confirmPassword) {
      return setMessage({ type: 'error', text: 'Passwords do not match!' });
    }

    try {
      const res = await api.put(`/auth/reset-password/${token}`, { password });
      setMessage({ type: 'success', text: res.data.message });
      setIsSuccess(true);
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Something went wrong. Link might be expired.' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB] flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000 pointer-events-none"></div>

      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 pt-24 pb-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass bg-white/70 p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-md border border-white/50"
        >
          {!isSuccess ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-heading font-extrabold text-gray-900 mb-2">Create New Password</h2>
                <p className="text-gray-500 text-sm">Your new password must be different from previous ones.</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {message.text && (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}}  className={`p-4 rounded-2xl text-sm font-medium text-center border ${message.type === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                    {message.text}
                  </motion.div>
                )}

                <div className="relative group">
                  <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input 
                    type="password" required placeholder="New Password"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <div className="relative group">
                  <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input 
                    type="password" required placeholder="Confirm New Password"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-2">
                  Reset Password
                </button>
              </form>
            </>
          ) : (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6">
              <CheckCircle2 className="text-emerald-500 mx-auto mb-6" size={72} strokeWidth={1.5} />
              <h2 className="text-3xl font-heading font-extrabold text-gray-900 mb-2">Password Reset!</h2>
              <p className="text-gray-500 mb-8">Your password has been changed successfully. You can now log in.</p>
              <Link to="/login" className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg w-full block">
                Back to Login
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;