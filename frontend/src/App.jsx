import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import Registration from './pages/registration'
import DashboardNavber from './utils/dashboard-navber'
import TeacherDashboard from './components/teacher-details/teacher-dashboard'
import Givefeedback from './components/students-things/give-feedback'
import FeedbackAnalytics from './components/teacher-details/feedback-analytics'
import StudentDashboard from './components/students-things/student-dashboard'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<DashboardNavber />} />
        <Route path='/teacher-dashboard/profile' element={<TeacherDashboard/>}/>
        <Route path='/student-dashboard/profile' element={<StudentDashboard/>}/>
        <Route path='/teacher-dashboard/feedback-analytics' element={<FeedbackAnalytics/>}/>
        <Route path='/student-dashboard/give-feedback' element={<Givefeedback/>}/>
      </Routes>
    </Router>
  )
}

export default App
