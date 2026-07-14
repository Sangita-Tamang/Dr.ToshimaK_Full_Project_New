import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home/Home';
import About from '../pages/about/About';
import Ministry from '../pages/ministry/Ministry';
import HealthContributions from '../pages/health/HealthContributions';
import Parliament from '../pages/parliament/Parliament';
import Party from '../pages/party/Party';
import News from '../pages/news/News';
import Blog from '../pages/blog/Blog';
import BlogDetails from '../pages/blog/BlogDetails';
import Media from '../pages/media/Media';
import Gallery from '../pages/gallery/Gallery';
import Contact from '../pages/contact/Contact';
import Interview from '../pages/interview/Interview';
import InternshipPage from '../pages/internship/InternshipPage';
import Dashboard from '../pages/admin/Dashboard';
import { useAuth } from '../context/AuthContext';
import AdminLogin from '../pages/admin/AdminLogin';

// Protected route wrapper for admin
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loader"><div className="spinner"></div></div>;
  return user ? children : <AdminLogin />;
}

export default function AppRoutes() {
  return (
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
  );
}
