
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './components/auth/Signup'
import Home from './components/Home'
import { Login } from './components/auth/Login'
import AdminDashboard from './components/admin/AdminDashBoard'
import EmployeeOverview from './components/admin/EmployeeOverview'
import EmployeeDetail from './components/admin/EmployeeDetail'
import EmployeeList from './components/admin/EmployeeList'
import EmployeeDashboard from './components/employee/EmployeeDashboard'
import ForgotPassword from './components/employee/ForgetPassword'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/admin/dashboard" element={<AdminDashboard/>}></Route>
          {/* employee route control by admin */}
          <Route path="/admin/dashboard/overview" element={<EmployeeOverview/>}></Route>
          <Route path="/admin/dashboard/employee/:id" element={<EmployeeDetail/>}></Route>
          <Route path="/admin/dashboard/employees" element={<EmployeeList/>}></Route>
          {/* employee routes */}
          <Route path="/employee/dashboard" element={<EmployeeDashboard/>}></Route>
          <Route path="/employee/forgetPassword" element={<ForgotPassword/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
