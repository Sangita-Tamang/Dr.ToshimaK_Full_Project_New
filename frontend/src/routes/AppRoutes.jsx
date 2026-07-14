import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth } from '../context/AuthContext';

// Loading component for lazy-loaded routes
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#fcfcfc'
  }}>
    <div className="loader">
      <div className="spinner"></div>
    </div>
  </div>
);

// Lazy load pages for better performance
const Home = lazy(() => import('../pages/home/Home'));
const About = lazy(() => import('../pages/about/About'));
const Ministry = lazy(() => import('../pages/ministry/Ministry'));
const HealthContributions = lazy(() => import('../pages/health/HealthContributions'));
const Parliament = lazy(() => import('../pages/parliament/Parliament'));
const Party = lazy(() => import('../pages/party/Party'));
const News = lazy(() => import('../pages/news/News'));
const Blog = lazy(() => import('../pages/blog/Blog'));
const BlogDetails = lazy(() => import('../pages/blog/BlogDetails'));
const Media = lazy(() => import('../pages/media/Media'));
const Gallery = lazy(() => import('../pages/gallery/Gallery'));
const Contact = lazy(() => import('../pages/contact/Contact'));
const Interview = lazy(() => import('../pages/interview/Interview'));
const InternshipPage = lazy(() => import('../pages/internship/InternshipPage'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));

// Protected route wrapper for admin
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <PageLoader />;
  }
  
  return user ? children : <AdminLogin />;
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ministry" element={<Ministry />} />
        <Route path="/health-contributions" element={<HealthContributions />} />
        <Route path="/parliament" element={<Parliament />} />
        <Route path="/party" element={<Party />} />
        <Route path="/news" element={<News />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/media" element={<Media />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/internship" element={<InternshipPage />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
