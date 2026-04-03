import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Settings, FileText, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/cycles', icon: <Settings size={20} />, label: 'Evaluation Cycles' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'Manage Users' },
    { path: '/admin/reports', icon: <FileText size={20} />, label: 'Reports' },
  ];

  return (
    <div className="flex h-screen bg-[#FAFAFB] overflow-hidden">
      <motion.aside 
        initial={{ x: -250 }} 
        animate={{ x: 0 }} 
        className="w-72 bg-white border-r border-gray-100 flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        <div className="p-8 pb-4">
          <h2 className="text-2xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
            PerformX Admin
          </h2>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                }`}>
                  <div className={`${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-500'} transition-colors`}>
                    {item.icon}
                  </div>
                  <span className={`font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <button 
            onClick={logout}
            className="flex items-center justify-center gap-3 text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 w-full px-4 py-3.5 rounded-2xl transition-all font-bold group shadow-sm"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Secure Logout</span>
          </button>
        </div>
      </motion.aside>

      <main className="flex-1 overflow-y-auto bg-[#FAFAFB] p-8 xl:p-12 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 pointer-events-none"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;