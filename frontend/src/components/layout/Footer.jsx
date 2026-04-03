import { Link } from 'react-router-dom';
import { Target } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0B0F19] text-white pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <Target className="text-indigo-500 group-hover:rotate-90 transition-transform duration-500" size={32} />
              <span className="font-heading font-extrabold text-3xl tracking-tight text-white">
                PerformX
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              Empowering teams with data-driven performance evaluations, seamless feedback cycles, and clear goal tracking. Elevate your workforce today.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">Platform</h4>
            <ul className="space-y-4">
              <li><a href="/#features" className="text-gray-400 hover:text-indigo-400 transition-colors">Features</a></li>
              <li><a href="/#about" className="text-gray-400 hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><Link to="/login" className="text-gray-400 hover:text-indigo-400 transition-colors">Log In</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} PerformX System. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">LinkedIn</span>
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">GitHub</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;