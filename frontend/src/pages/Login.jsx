import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axiosConfig';
import Navbar from '../components/layout/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data); 
      if (res.data.role === 'Admin') navigate('/admin');
      else if (res.data.role === 'Manager') navigate('/manager');
      else navigate('/employee');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await api.post('/auth/google', { 
        tokenId: credentialResponse.credential 
      });
      login(res.data);
      if (res.data.role === 'Admin') navigate('/admin');
      else if (res.data.role === 'Manager') navigate('/manager');
      else navigate('/employee');
    } catch (err) {
      setError('Google Login failed on server. Please try again.');
    }
  };

  return (
    <div className="h-screen bg-white flex relative overflow-hidden">
      <Navbar />

      <div className="flex w-full h-full">
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 pt-12 z-10 bg-white">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[22rem] mx-auto flex flex-col"
          >
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-[10px] uppercase tracking-widest w-fit">
              <Sparkles size={12} className="text-indigo-500" />
              Welcome to PerformX
            </div>
            
            <div className="mb-6">
              <h2 className="text-3xl font-heading font-extrabold text-gray-900 mb-1">Log In</h2>
              <p className="text-sm text-gray-500 font-medium">Please enter your credentials to continue.</p>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              {error && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-semibold border border-red-100">
                  {error}
                </motion.div>
              )}

              <div className="relative group">
                <Mail className="absolute left-4 top-3 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="email" required placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-2.5 text-sm bg-gray-50/50 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-gray-900"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-3 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                  <input 
                    type="password" required placeholder="Password"
                    className="w-full pl-12 pr-4 py-2.5 text-sm bg-gray-50/50 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-gray-900"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-right mt-1 mr-1">
                  <Link to="/forgot-password" size="sm" className="text-[11px] text-indigo-600 font-bold hover:text-indigo-700 transition-colors">Forgot password?</Link>
                </div>
              </div>

              <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 mt-2 flex justify-center items-center gap-2 group">
                Access Dashboard
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="my-6 flex items-center before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
              <p className="mx-4 text-gray-400 text-[10px] font-bold tracking-wider uppercase">Or</p>
            </div>

            <div className="flex justify-center w-full [&>div]:w-full [&>div>div]:!w-full [&>div>div]:!justify-center transform">
              <GoogleLogin 
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google Login Failed')}
                theme="outline" size="large" shape="rectangular"
              />
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account yet? <Link to="/register" className="text-indigo-600 font-bold hover:text-indigo-700 underline underline-offset-4">Sign up</Link>
            </div>
          </motion.div>
        </div>
        
        {/* Right Side: Image/Banner */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
           <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" alt="Office space" />
             <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
             <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 mix-blend-multiply"></div>
           </div>
           
           <div className="relative z-10 flex flex-col justify-end pb-16 px-12 w-full h-full">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="glass bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20"
              >
                <div className="flex gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                </div>
                <h3 className="text-3xl font-heading font-bold text-white mb-4 leading-tight">
                  <span className="text-indigo-300">Empower</span> your workforce.<br />
                  <span className="text-purple-300">Evaluate</span> with precision.
                </h3>
                <p className="text-gray-300 text-sm font-medium leading-relaxed">
                  Join hundreds of forward-thinking HR teams already using PerformX to align goals and deliver actionable, continuous feedback.
                </p>
              </motion.div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;