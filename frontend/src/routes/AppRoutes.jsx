import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import StudentLayout from '../layouts/StudentLayout';
import AdminLayout from '../layouts/AdminLayout';

// Route Guards
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// Public Pages
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Courses from '../pages/Courses/Courses';
import FeeStructure from '../pages/FeeStructure/FeeStructure';
import Notes from '../pages/Notes/Notes';
import OnlineTest from '../pages/OnlineTest/OnlineTest';
import Results from '../pages/Results/Results';
import Gallery from '../pages/Gallery/Gallery';
import Contact from '../pages/Contact/Contact';
import Login from '../pages/Login/Login';
import AdminLogin from '../pages/Login/AdminLogin';
import Register from '../pages/Register/Register';
import Receipt from '../pages/Receipt/Receipt';
import NotFound from '../pages/NotFound/NotFound';

// Student Portal Pages
import StudentDashboard from '../pages/StudentDashboard/StudentDashboard';
import Payment from '../pages/Payment/Payment';
import PaymentHistory from '../pages/PaymentHistory/PaymentHistory';
import Attendance from '../pages/Attendance/Attendance';
import Homework from '../pages/Homework/Homework';
import Assignments from '../pages/Assignments/Assignments';
import Notices from '../pages/Notices/Notices';
import Profile from '../pages/Profile/Profile';

// Admin Portal Pages
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. Public Website Routes (MainLayout) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/fee-structure" element={<FeeStructure />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/online-test" element={<OnlineTest />} />
        <Route path="/results" element={<Results />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/notices" element={<Notices />} />
      </Route>

      {/* 2. Authenticated Student Portal Routes (StudentLayout) */}
      <Route
        element={
          <PrivateRoute>
            <StudentLayout />
          </PrivateRoute>
        }
      >
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-history" element={<PaymentHistory />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/homework" element={<Homework />} />
        <Route path="/assignments" element={<Assignments />} />
      </Route>

      {/* 3. Protected Senior Admin Portal Routes (AdminLayout) */}
      <Route
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      {/* 4. 404 Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
