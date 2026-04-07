import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import HomePage from "@/pages/HomePage";
import ServicePage from "@/pages/ServicePage";
import AboutPage from "@/pages/AboutPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import BlogManagement from "@/pages/BlogManagement";
import CaseStudyManagement from "@/pages/CaseStudyManagement";

function App() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navigation />
              <HomePage />
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navigation />
              <AboutPage />
              <Footer />
            </>
          } />
          <Route path="/solutions/:slug" element={
            <>
              <Navigation />
              <ServicePage />
              <Footer />
            </>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/blogs" element={<BlogManagement />} />
          <Route path="/admin/case-studies" element={<CaseStudyManagement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
