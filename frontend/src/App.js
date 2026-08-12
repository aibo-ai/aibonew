import "@/App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import HomePage from "@/pages/HomePage";

const ServicePage = lazy(() => import("@/pages/ServicePage"));
const ClusterPage = lazy(() => import("@/pages/ClusterPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const BlogsPage = lazy(() => import("@/pages/BlogsPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const CaseStudiesPage = lazy(() => import("@/pages/CaseStudiesPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const AdminLogin = lazy(() => import("@/pages/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const BlogManagement = lazy(() => import("@/pages/BlogManagement"));
const CaseStudyManagement = lazy(() => import("@/pages/CaseStudyManagement"));

function App() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <BrowserRouter>
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <Routes>
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
            <Route path="/blogs" element={
              <>
                <Navigation />
                <BlogsPage />
                <Footer />
              </>
            } />
            <Route path="/blog/:slug" element={
              <>
                <Navigation />
                <BlogPage />
                <Footer />
              </>
            } />
            <Route path="/case-studies" element={
              <>
                <Navigation />
                <CaseStudiesPage />
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Navigation />
                <ContactPage />
                <Footer />
              </>
            } />

            {/* Redirect the removed White Label pillar to Full Stack Development */}
            <Route path="/solutions/white-label" element={<Navigate to="/solutions/full-stack" replace />} />
            <Route path="/solutions/white-label/*" element={<Navigate to="/solutions/full-stack" replace />} />

            {/* Redirect the removed AI/ML pillar — Google still has this URL indexed
                (real impressions for "ai ml solutions", "custom machine learning solutions"),
                so send it somewhere live instead of letting it 404 silently. */}
            <Route path="/solutions/ai-ml" element={<Navigate to="/solutions/ai-automations" replace />} />
            <Route path="/solutions/ai-ml/*" element={<Navigate to="/solutions/ai-automations" replace />} />

            {/* Cluster (sub-service) pages */}
            <Route path="/solutions/:pillar/:cluster" element={
              <>
                <Navigation />
                <ClusterPage />
                <Footer />
              </>
            } />

            {/* Pillar page */}
            <Route path="/solutions/:slug" element={
              <>
                <Navigation />
                <ServicePage />
                <Footer />
              </>
            } />

            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/blogs" element={<BlogManagement />} />
            <Route path="/admin/case-studies" element={<CaseStudyManagement />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
