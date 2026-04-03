import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ManageCycles from './pages/admin/ManageCycles';
import SetGoals from './pages/manager/SetGoals'; 
import SelfEvaluation from './pages/employee/SelfEvaluation';
import ReviewEvaluations from './pages/manager/ReviewEvaluations';
import Reports from './pages/admin/Reports';
import ManageUsers from './pages/admin/ManageUsers';
import EmployeeGoals from './pages/employee/EmployeeGoals';
import EmployeeFeedback from './pages/employee/EmployeeFeedback';
import ResetPassword from './pages/ResetPassword';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagerLayout from './components/layout/ManagerLayout';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import EmployeeLayout from './components/layout/EmployeeLayout';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';

import GoalRegistry from './pages/manager/GoalRegistry';
import EmployeeList from './pages/manager/EmployeeList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['Admin']}><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} /> 
          <Route path="cycles" element={<ManageCycles />} /> 
          <Route path="reports" element={<Reports />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>

        <Route path="/manager" element={<ProtectedRoute allowedRoles={['Manager']}><ManagerLayout /></ProtectedRoute>}>
          <Route index element={<ManagerDashboard />} /> 
          <Route path="goals" element={<SetGoals />} />
          <Route path="evaluations" element={<ReviewEvaluations />} />
          <Route path="registry" element={<GoalRegistry />} />
          <Route path="employees" element={<EmployeeList />} />
        </Route>

        <Route path="/employee" element={<ProtectedRoute allowedRoles={['Employee']}><EmployeeLayout /></ProtectedRoute>}>
          <Route index element={<EmployeeDashboard />} /> 
          <Route path="self-evaluation" element={<SelfEvaluation />} />
          <Route path='goals' element={<EmployeeGoals/>}  ></Route>
          <Route path='feedback' element={<EmployeeFeedback/>}  ></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;