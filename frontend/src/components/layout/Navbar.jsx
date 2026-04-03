import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 glass border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex-shrink-0 group">
            <span className="font-heading font-extrabold text-2xl tracking-tight text-gradient">
              PerformX
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-10 items-center">
            <a href="/#features" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors text-sm">Features</a>
            <a href="/#about" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors text-sm">About</a>
            <Link 
              to="/login" 
              className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-full shadow-sm hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;