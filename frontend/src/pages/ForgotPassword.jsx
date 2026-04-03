import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage("Check your email for the reset link!");
      setError(false);
    } catch (err) {
      setMessage("Error sending email. Please try again.");
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB] flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000 pointer-events-none"></div>

      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 pt-24 pb-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass bg-white/70 p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-md border border-white/50"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-extrabold text-gray-900 mb-2">Reset Password</h2>
            <p className="text-gray-500">Enter your email to receive a secure link</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {message && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className={`p-4 rounded-2xl text-sm font-medium text-center border ${error ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                {message}
              </motion.div>
            )}

            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input 
                type="email" required placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3.5 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-2">
              Send Reset Link
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/login" className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 font-medium transition-colors gap-2 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;