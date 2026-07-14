import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import defaultLogo from '../../assets/images/logo.png';

// Import CSS
import './Dashboard.css';

// Import Services
import homeService from '../../services/homeService';
import aboutService from '../../services/aboutService';
import ministryService from '../../services/ministryService';
import parliamentService from '../../services/parliamentService';
import galleryService from '../../services/galleryService';
import settingsService from '../../services/settingsService';
import userService from '../../services/userService';
import analyticsService from '../../services/analyticsService';
import uploadService from '../../services/uploadService';
import newsService from '../../services/newsService';
import blogService from '../../services/blogService';
import mediaService from '../../services/mediaService';
import contactService from '../../services/contactService';
import engagementService from '../../services/engagementService';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Navigation states
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [adminLanguage, setAdminLanguage] = useState('en'); // EN or NP for editing fields preview

  // Core Data States
  const [analytics, setAnalytics] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [ministryData, setMinistryData] = useState(null);
  const [parliamentData, setParliamentData] = useState(null);
  const [settingsData, setSettingsData] = useState(null);
  const [news, setNews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [media, setMedia] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [engagements, setEngagements] = useState([]);
  const [usersList, setUsersList] = useState([]);

  // Internship States
  const [internshipPrograms, setInternshipPrograms] = useState([]);
  const [internshipApplications, setInternshipApplications] = useState([]);
  const [internshipStats, setInternshipStats] = useState(null);
  const [internAppFilter, setInternAppFilter] = useState('All');
  const [internAppSearch, setInternAppSearch] = useState('');
  const [viewingApplication, setViewingApplication] = useState(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailForm, setEmailForm] = useState({ type: '', subject: '', body: '' });

  // UI and Loading States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // CRUD & Modal State
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'news', 'blog', 'media', 'gallery', 'user', 'contribution', 'speech'
  const [previewTab, setPreviewTab] = useState('edit'); // 'edit' or 'preview' (for Markdown preview)

  // Search, Filters & Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // File Upload State for modal/forms
  const [isUploading, setIsUploading] = useState(false);

  // Fetch all dashboard and system configurations on mount or tab change
  useEffect(() => {
    loadAllSystemData();
  }, [activeSection, /* re-run when auth user changes so protected data loads after login */ user]);

  const loadAllSystemData = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Fetch Analytics Summary always
      const analyticRes = await analyticsService.getSummary().catch(() => null);
      if (analyticRes?.success) setAnalytics(analyticRes.data);

      // 2. Fetch specific tab dataset to keep page fast
      if (activeSection === 'dashboard') {
        const latestNews = await newsService.getAll({ limit: 5 }).catch(() => null);
        const latestBlogs = await blogService.getAll({ limit: 5 }).catch(() => null);
        const latestContacts = await contactService.getAll().catch(() => null);
        const latestInterviews = await contactService.getInterviews().catch(() => null);

        if (latestNews?.success) setNews(latestNews.data);
        if (latestBlogs?.success) setBlogs(latestBlogs.data);
        if (latestContacts?.success) setContacts(latestContacts.data);
        if (latestInterviews?.success) setInterviews(latestInterviews.data);

        // Fetch internship stats for dashboard cards
        const statsRes = await api.get('/internships/stats').catch(() => null);
        if (statsRes?.success) setInternshipStats(statsRes.data);
      } 
      else if (activeSection === 'homepage') {
        const res = await homeService.getSettings();
        if (res.success) setHomeData(res.data);
      } 
      else if (activeSection === 'about') {
        const res = await aboutService.getSettings();
        if (res.success) setAboutData(res.data);
      } 
      else if (activeSection === 'ministry') {
        const res = await ministryService.getSettings();
        if (res.success) setMinistryData(res.data);
      } 
      else if (activeSection === 'parliament') {
        const res = await parliamentService.getSettings();
        if (res.success) setParliamentData(res.data);
      } 
      else if (activeSection === 'news') {
        const res = await newsService.getAll({ limit: 100 });
        if (res.success) setNews(res.data);
      } 
      else if (activeSection === 'blog') {
        const res = await blogService.getAll({ limit: 100 });
        if (res.success) setBlogs(res.data);
      } 
      else if (activeSection === 'media') {
        const res = await mediaService.getAll({ limit: 100 });
        if (res.success) setMedia(res.data);
      } 
      else if (activeSection === 'gallery') {
        const res = await galleryService.getAll({ limit: 100 });
        if (res.success) setGallery(res.data);
      } 
      else if (activeSection === 'contacts') {
        const res = await contactService.getAll();
        if (res.success) setContacts(res.data);
      } 
      else if (activeSection === 'interviews') {
        const res = await contactService.getInterviews();
        if (res.success) setInterviews(res.data);
      }
      else if (activeSection === 'engagements') {
        const res = await engagementService.getAll();
        if (res.success) setEngagements(res.data);
      }
      else if (activeSection === 'users') {
        const res = await userService.getAll();
        if (res.success) setUsersList(res.data);
      } 
      else if (activeSection === 'settings') {
        const res = await settingsService.getSettings();
        if (res.success) setSettingsData(res.data);
      }
      else if (activeSection === 'internship-programs') {
        const res = await api.get('/internships');
        if (res.success) setInternshipPrograms(res.data);
        const statsRes = await api.get('/internships/stats').catch(() => null);
        if (statsRes?.success) setInternshipStats(statsRes.data);
      }
      else if (activeSection === 'internship-applications') {
        const res = await api.get('/internship-applications');
        if (res.success) setInternshipApplications(res.data);
        const statsRes = await api.get('/internships/stats').catch(() => null);
        if (statsRes?.success) setInternshipStats(statsRes.data);
      }
    } catch (err) {
      setError('Error loading resources. Please confirm backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const showFeedback = (msg, isSuccess = true) => {
    if (isSuccess) {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(''), 4000);
    } else {
      setError(msg);
      setTimeout(() => setError(''), 4000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Generic File Uploader Handler
  const handleFileUpload = async (e, onUploadComplete) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setError('');
    try {
      const res = await uploadService.uploadFile(file);
      if (res.success) {
        onUploadComplete(res.data);
        showFeedback('File uploaded successfully!');
      } else {
        setError('Upload failed');
      }
    } catch (err) {
      setError(err?.error || 'Upload error. File type might be unsupported.');
    } finally {
      setIsUploading(false);
    }
  };

  // EXPORT UTILITY FOR CSV
  const handleExportCSV = (data, filename, headers) => {
    if (!data || data.length === 0) {
      showFeedback('No records found to export', false);
      return;
    }

    let csvContent = headers.join(",") + "\n";
    data.forEach(item => {
      const line = headers.map(header => {
        let val = item[header] === undefined || item[header] === null ? '' : String(item[header]);
        val = val.replace(/"/g, '""');
        return `"${val}"`;
      }).join(",");
      csvContent += line + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showFeedback('CSV file exported successfully!');
  };

  // MENU ITEMS DEFINITIONS
  const MENU_ITEMS = [
    { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { id: 'homepage', icon: 'fas fa-home', label: 'Home Page' },
    { id: 'about', icon: 'fas fa-user', label: 'About Page' },
    { id: 'ministry', icon: 'fas fa-briefcase-medical', label: 'Ministry Page' },
    { id: 'parliament', icon: 'fas fa-landmark', label: 'Parliament Page' },
    { id: 'news', icon: 'fas fa-newspaper', label: 'News Management' },
    { id: 'blog', icon: 'fas fa-blog', label: 'Blog Management' },
    { id: 'media', icon: 'fas fa-photo-video', label: 'Media Coverage' },
    { id: 'gallery', icon: 'fas fa-images', label: 'Gallery Albums' },
    { id: 'contacts', icon: 'fas fa-envelope', label: 'Contact Messages', badge: analytics?.pendingContacts },
    { id: 'engagements', icon: 'fas fa-calendar-check', label: 'Public Engagements' },
    { id: 'interviews', icon: 'fas fa-microphone-alt', label: 'Interview Requests', badge: analytics?.pendingInterviews, badgeGreen: true },
    { id: 'internship-programs', icon: 'fas fa-graduation-cap', label: 'Internship Programs' },
    { id: 'internship-applications', icon: 'fas fa-file-alt', label: 'Applications', badge: internshipStats?.pendingApplications },
    { id: 'users', icon: 'fas fa-users-cog', label: 'Admin Accounts' },
    { id: 'settings', icon: 'fas fa-cog', label: 'Settings & Security' }
  ];

  // SUBMIT HANDLERS FOR PAGE EDITORS
  const handleSaveHomeSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await homeService.updateSettings(homeData);
      if (res.success) {
        setHomeData(res.data);
        showFeedback('Home settings saved successfully!');
      }
    } catch (err) {
      setError('Failed to update home settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAboutSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await aboutService.updateSettings(aboutData);
      if (res.success) {
        setAboutData(res.data);
        showFeedback('About settings saved successfully!');
      }
    } catch (err) {
      setError('Failed to update about settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMinistrySettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await ministryService.updateSettings(ministryData);
      if (res.success) {
        setMinistryData(res.data);
        showFeedback('Ministry settings saved successfully!');
      }
    } catch (err) {
      setError('Failed to update ministry settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveParliamentSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await parliamentService.updateSettings(parliamentData);
      if (res.success) {
        setParliamentData(res.data);
        showFeedback('Parliament settings saved successfully!');
      }
    } catch (err) {
      setError('Failed to update parliament settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSiteSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await settingsService.updateSettings(settingsData);
      if (res.success) {
        setSettingsData(res.data);
        showFeedback('Site settings saved successfully!');
      }
    } catch (err) {
      setError('Failed to update settings.');
    } finally {
      setLoading(false);
    }
  };

  // PASSWORD CHANGE SECURE HANDLER
  const [securityForm, setSecurityForm] = useState({ password: '', confirmPassword: '', email: user?.email || '' });
  const handleSaveSecurity = async (e) => {
    e.preventDefault();
    if (securityForm.password && securityForm.password !== securityForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const payload = { email: securityForm.email };
      if (securityForm.password) payload.password = securityForm.password;

      const res = await userService.update(user._id, payload);
      if (res.success) {
        showFeedback('Security profile updated successfully!');
        setSecurityForm({ ...securityForm, password: '', confirmPassword: '' });
      }
    } catch (err) {
      setError('Failed to update credentials. Check requirements.');
    } finally {
      setLoading(false);
    }
  };

  // CRUD MODAL LAUNCHERS
  const openCreateModal = (type) => {
    setModalType(type);
    setCurrentEditItem({});
    setIsModalOpen(true);
  };

  const openEditModal = (type, item) => {
    setModalType(type);
    setCurrentEditItem({ ...item });
    setIsModalOpen(true);
  };

  const handleDeleteItem = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    setLoading(true);
    try {
      let res;
      if (type === 'news') res = await newsService.delete(id);
      else if (type === 'blog') res = await blogService.delete(id);
      else if (type === 'media') res = await mediaService.delete(id);
      else if (type === 'gallery') res = await galleryService.delete(id);
      else if (type === 'engagement') res = await engagementService.delete(id);
      else if (type === 'user') res = await userService.delete(id);

      if (res?.success) {
        showFeedback('Item deleted successfully!');
        loadAllSystemData();
      }
    } catch (err) {
      setError('Failed to delete item.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCRUD = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (modalType === 'news') {
        if (currentEditItem._id) res = await newsService.update(currentEditItem._id, currentEditItem);
        else res = await newsService.create(currentEditItem);
      } else if (modalType === 'blog') {
        if (currentEditItem._id) res = await blogService.update(currentEditItem._id, currentEditItem);
        else res = await blogService.create(currentEditItem);
      } else if (modalType === 'media') {
        if (currentEditItem._id) res = await mediaService.update(currentEditItem._id, currentEditItem);
        else res = await mediaService.create(currentEditItem);
      } else if (modalType === 'gallery') {
        if (currentEditItem._id) res = await galleryService.update(currentEditItem._id, currentEditItem);
        else res = await galleryService.create(currentEditItem);
      } else if (modalType === 'engagement') {
        if (currentEditItem._id) res = await engagementService.update(currentEditItem._id, currentEditItem);
        else res = await engagementService.create(currentEditItem);
      } else if (modalType === 'user') {
        if (currentEditItem._id) res = await userService.update(currentEditItem._id, currentEditItem);
        else res = await userService.create(currentEditItem);
      } else if (modalType === 'internship-program') {
        if (currentEditItem._id) {
          res = await api.put(`/internships/${currentEditItem._id}`, currentEditItem);
        } else {
          res = await api.post('/internships', currentEditItem);
        }
      }

      if (res?.success) {
        showFeedback('Saved successfully!');
        setIsModalOpen(false);
        loadAllSystemData();
      }
    } catch (err) {
      setError('Failed to save record. Please check field requirements.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleEngagementPublish = async (item) => {
    try {
      const res = await engagementService.update(item._id, { isPublished: !item.isPublished });
      if (res.success) {
        showFeedback(item.isPublished ? 'Engagement unpublished.' : 'Engagement published!');
        loadAllSystemData();
      }
    } catch {
      setError('Failed to update publish status.');
    }
  };

  const handleToggleEngagementStatus = async (item) => {
    const newStatus = item.status === 'upcoming' ? 'completed' : 'upcoming';
    try {
      const res = await engagementService.update(item._id, { status: newStatus });
      if (res.success) {
        showFeedback(`Engagement marked as ${newStatus}.`);
        loadAllSystemData();
      }
    } catch {
      setError('Failed to update status.');
    }
  };

  // INBOX INTERACTIVE ACTIONS
  const handleUpdateContactStatus = async (id, status) => {
    try {
      const res = await contactService.updateStatus(id, status);
      if (res.success) {
        showFeedback('Inbox status updated!');
        loadAllSystemData();
      }
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const handleUpdateInterview = async (id, payload) => {
    try {
      const res = await contactService.updateInterview(id, payload);
      if (res.success) {
        showFeedback('Interview request updated!');
        loadAllSystemData();
      }
    } catch (err) {
      setError('Failed to update request');
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Delete message?')) return;
    try {
      const res = await contactService.delete(id);
      if (res.success) {
        showFeedback('Message deleted');
        loadAllSystemData();
      }
    } catch (err) {
      setError('Failed to delete message');
    }
  };

  return (
    <div className="admin-layout">
      {/* ── SIDEBAR ── */}
      <aside className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="admin-sidebar-header">
          <img src={settingsData?.logo || defaultLogo} alt="Dr. Toshima Karki" />
          {!isSidebarCollapsed && (
            <div className="admin-brand-info">
              <div className="admin-brand-name">Dr. Toshima Karki</div>
              <div className="admin-brand-role">Content Manager CMS</div>
            </div>
          )}
        </div>

        <nav className="admin-nav">
          {MENU_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setCurrentPage(1);
                setSearchTerm('');
              }}
              className={`admin-nav-item ${activeSection === item.id ? 'active' : ''}`}
            >
              <div className="admin-nav-item-left">
                <i className={item.icon}></i>
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </div>
              {!isSidebarCollapsed && item.badge > 0 && (
                <span className={`admin-nav-badge ${item.badgeGreen ? 'green' : ''}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-summary">
            <div className="admin-user-avatar">
              {user?.name?.charAt(0) || 'A'}
            </div>
            {!isSidebarCollapsed && (
              <div className="admin-user-details">
                <div className="admin-user-name">{user?.name || 'Admin'}</div>
                <div className="admin-user-role">{user?.role || 'Administrator'}</div>
              </div>
            )}
          </div>
          {!isSidebarCollapsed && (
            <button onClick={handleLogout} className="admin-logout-btn" title="Logout">
              <i className="fas fa-sign-out-alt"></i>
            </button>
          )}
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="admin-main">
        {/* HEADER */}
        <header className="admin-header">
          <div className="admin-header-left">
            <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="admin-toggle-sidebar">
              <i className="fas fa-bars"></i>
            </button>
            <h2 style={{ fontSize: '1.2rem', textTransform: 'capitalize' }}>
              {activeSection.replace(/([A-Z])/g, ' $1').trim()} Module
            </h2>
          </div>

          <div className="admin-header-right">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Editing Lang:</span>
              <button 
                onClick={() => setAdminLanguage(adminLanguage === 'en' ? 'np' : 'en')}
                style={{
                  background: 'var(--primary)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px 8px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.78rem'
                }}
              >
                {adminLanguage === 'en' ? '🇬🇧 English' : '🇳🇵 नेपाली'}
              </button>
            </div>

            <Link to="/" target="_blank" className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
              <i className="fas fa-external-link-alt"></i> View Live Site
            </Link>
          </div>
        </header>

        {/* MESSAGES BAR */}
        {error && (
          <div style={{ background: '#FDEDEC', color: 'var(--primary)', padding: '10px 24px', fontWeight: 500, borderBottom: '1px solid #FADBD8', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}
        {successMsg && (
          <div style={{ background: '#E8F8F5', color: '#117A65', padding: '10px 24px', fontWeight: 500, borderBottom: '1px solid #D1F2EB', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-check-circle"></i> {successMsg}
          </div>
        )}

        <div className="admin-content-scroll">
          {/* LOADER */}
          {loading && (
            <div className="loader">
              <div className="spinner"></div>
            </div>
          )}

          {!loading && (
            <>
              {/* ──────────────────────────────────────────────────────── */}
              {/* 📊 DASHBOARD OVERVIEW */}
              {/* ──────────────────────────────────────────────────────── */}
              {activeSection === 'dashboard' && (
                <div>
                  {/* Stats Cards */}
                  <div className="admin-stats-grid">
                    <div className="admin-stat-card">
                      <div className="admin-stat-icon-wrap" style={{ background: '#FDEDEC', color: 'var(--primary)' }}>
                        <i className="fas fa-newspaper"></i>
                      </div>
                      <div className="admin-stat-details">
                        <h4>News Articles</h4>
                        <div className="value">{analytics?.totalNews || 0}</div>
                        <span className="link" onClick={() => setActiveSection('news')}>View all &rarr;</span>
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div className="admin-stat-icon-wrap" style={{ background: '#EBF5FB', color: '#2980B9' }}>
                        <i className="fas fa-blog"></i>
                      </div>
                      <div className="admin-stat-details">
                        <h4>Blog Posts</h4>
                        <div className="value">{analytics?.totalBlogs || 0}</div>
                        <span className="link" onClick={() => setActiveSection('blog')}>View all &rarr;</span>
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div className="admin-stat-icon-wrap" style={{ background: '#E8F8F5', color: '#27AE60' }}>
                        <i className="fas fa-video"></i>
                      </div>
                      <div className="admin-stat-details">
                        <h4>Media Coverage</h4>
                        <div className="value">{analytics?.totalMedia || 0}</div>
                        <span className="link" onClick={() => setActiveSection('media')}>View all &rarr;</span>
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div className="admin-stat-icon-wrap" style={{ background: '#F5EEF8', color: '#8E44AD' }}>
                        <i className="fas fa-images"></i>
                      </div>
                      <div className="admin-stat-details">
                        <h4>Gallery Items</h4>
                        <div className="value">{analytics?.totalGallery || 0}</div>
                        <span className="link" onClick={() => setActiveSection('gallery')}>View all &rarr;</span>
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div className="admin-stat-icon-wrap" style={{ background: '#FEF9E7', color: '#F39C12' }}>
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div className="admin-stat-details">
                        <h4>Messages</h4>
                        <div className="value">{analytics?.totalContacts || 0}</div>
                        <span className="link" onClick={() => setActiveSection('contacts')}>View all &rarr;</span>
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div className="admin-stat-icon-wrap" style={{ background: '#E6F9FA', color: '#008080' }}>
                        <i className="fas fa-microphone-alt"></i>
                      </div>
                      <div className="admin-stat-details">
                        <h4>Interviews</h4>
                        <div className="value">{analytics?.totalInterviews || 0}</div>
                        <span className="link" onClick={() => setActiveSection('interviews')}>View all &rarr;</span>
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div className="admin-stat-icon-wrap" style={{ background: '#EDE7F6', color: '#5E35B1' }}>
                        <i className="fas fa-graduation-cap"></i>
                      </div>
                      <div className="admin-stat-details">
                        <h4>Internships</h4>
                        <div className="value">{internshipStats?.totalPrograms || 0}</div>
                        <span className="link" onClick={() => setActiveSection('internship-programs')}>Manage &rarr;</span>
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div className="admin-stat-icon-wrap" style={{ background: '#FFF8E1', color: '#F9A825' }}>
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <div className="admin-stat-details">
                        <h4>Applications</h4>
                        <div className="value">{internshipStats?.totalApplications || 0}</div>
                        <span className="link" onClick={() => setActiveSection('internship-applications')}>View all &rarr;</span>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Row 1: Interactive SVG Line Chart & Recent Activity */}
                  <div className="admin-db-grid">
                    <div className="admin-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '1rem' }}>Website Analytics Overview</h3>
                        <select className="cms-select" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>
                          <option>Last 30 Days</option>
                          <option>Last 7 Days</option>
                          <option>Last 12 Months</option>
                        </select>
                      </div>

                      {/* Mock Chart using native SVGs */}
                      <div style={{ position: 'relative', height: '220px', background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '10px' }}>
                        <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                          {/* Grid Lines */}
                          <line x1="0" y1="50" x2="500" y2="50" stroke="#f0f0f0" strokeWidth="1" />
                          <line x1="0" y1="100" x2="500" y2="100" stroke="#f0f0f0" strokeWidth="1" />
                          <line x1="0" y1="150" x2="500" y2="150" stroke="#f0f0f0" strokeWidth="1" />
                          <line x1="0" y1="200" x2="500" y2="200" stroke="#eee" strokeWidth="1.5" />

                          {/* Line Chart path representing visitors */}
                          <path
                            d="M0,150 Q50,110 100,130 T200,90 T300,105 T400,60 T500,80"
                            fill="none"
                            stroke="var(--primary)"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />

                          {/* Gradient Fill under Path */}
                          <path
                            d="M0,150 Q50,110 100,130 T200,90 T300,105 T400,60 T500,80 L500,200 L0,200 Z"
                            fill="rgba(200,16,46,0.06)"
                          />

                          {/* Interactive Chart Points */}
                          <circle cx="100" cy="130" r="4.5" fill="var(--primary)" stroke="#fff" strokeWidth="1.5" />
                          <circle cx="200" cy="90" r="4.5" fill="var(--primary)" stroke="#fff" strokeWidth="1.5" />
                          <circle cx="300" cy="105" r="4.5" fill="var(--primary)" stroke="#fff" strokeWidth="1.5" />
                          <circle cx="400" cy="60" r="4.5" fill="var(--primary)" stroke="#fff" strokeWidth="1.5" />
                        </svg>
                      </div>

                      {/* Mock Chart Metrics */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '16px', textAlign: 'center' }}>
                        <div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--secondary)' }}>18,425</div>
                          <div style={{ fontSize: '0.75rem', color: '#27AE60', fontWeight: 600 }}><i className="fas fa-caret-up"></i> 12.5%</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Total Visitors</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--secondary)' }}>32,748</div>
                          <div style={{ fontSize: '0.75rem', color: '#27AE60', fontWeight: 600 }}><i className="fas fa-caret-up"></i> 8.7%</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Page Views</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--secondary)' }}>2m 45s</div>
                          <div style={{ fontSize: '0.75rem', color: '#27AE60', fontWeight: 600 }}><i className="fas fa-caret-up"></i> 5.1%</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Avg. Duration</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--secondary)' }}>68.42%</div>
                          <div style={{ fontSize: '0.75rem', color: '#C8102E', fontWeight: 600 }}><i className="fas fa-caret-down"></i> 3.4%</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Bounce Rate</div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions & Recent Publish */}
                    <div>
                      <div className="admin-card">
                        <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>Quick Actions</h3>
                        <div className="quick-actions-grid">
                          <button className="quick-action-btn" onClick={() => openCreateModal('news')}>
                            <i className="fas fa-plus-circle" style={{ color: 'var(--primary)' }}></i> Add News
                          </button>
                          <button className="quick-action-btn" onClick={() => openCreateModal('blog')}>
                            <i className="fas fa-pen-fancy" style={{ color: '#2980B9' }}></i> Add Blog
                          </button>
                          <button className="quick-action-btn" onClick={() => openCreateModal('gallery')}>
                            <i className="fas fa-images" style={{ color: '#8E44AD' }}></i> Add Gallery
                          </button>
                          <button className="quick-action-btn" onClick={() => setActiveSection('settings')}>
                            <i className="fas fa-cog" style={{ color: '#F39C12' }}></i> Settings
                          </button>
                        </div>
                      </div>

                      <div className="admin-card" style={{ paddingBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h3 style={{ fontSize: '1rem' }}>Recent Publications</h3>
                          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActiveSection('blog')}>View All</span>
                        </div>
                        <div className="published-list">
                          {blogs.slice(0, 3).map(post => (
                            <div key={post._id} className="published-item">
                              <div className="published-item-left">
                                <img src={post.image || '/image/image1.png'} className="published-item-thumb" alt="" />
                                <div className="published-item-info">
                                  <div className="published-item-title">{post.titleEn}</div>
                                  <div className="published-item-meta">
                                    <span className="badge-tag blog">Blog</span>
                                    <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          {news.slice(0, 2).map(n => (
                            <div key={n._id} className="published-item">
                              <div className="published-item-left">
                                <img src={n.image || '/image/image13.png'} className="published-item-thumb" alt="" />
                                <div className="published-item-info">
                                  <div className="published-item-title">{n.titleEn}</div>
                                  <div className="published-item-meta">
                                    <span className="badge-tag news">News</span>
                                    <span>{new Date(n.publishedDate).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Row 2: Recent Contact Messages & Interview Requests */}
                  <div className="admin-db-grid">
                    <div className="admin-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h3 style={{ fontSize: '1rem' }}>Recent Inbox Messages</h3>
                        <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActiveSection('contacts')}>Go to Messages</span>
                      </div>
                      <div className="inbox-list">
                        {contacts.slice(0, 4).map(msg => (
                          <div key={msg._id} className={`inbox-item ${msg.status === 'new' ? 'new' : ''}`} onClick={() => setActiveSection('contacts')}>
                            <div className="inbox-item-header">
                              <span>{msg.name} ({msg.email})</span>
                              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="inbox-item-sub">{msg.subject}</div>
                            <div className="inbox-item-message">{msg.message}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="admin-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h3 style={{ fontSize: '1rem' }}>Pending Interview Invites</h3>
                        <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActiveSection('interviews')}>Go to Requests</span>
                      </div>
                      <div className="inbox-list">
                        {interviews.filter(i => i.status === 'pending').slice(0, 3).map(req => (
                          <div key={req._id} className="inbox-item pending" onClick={() => setActiveSection('interviews')}>
                            <div className="inbox-item-header">
                              <span>{req.mediaOutlet}</span>
                              <span style={{ fontSize: '0.72rem', color: '#F39C12', fontWeight: 700 }}>Pending</span>
                            </div>
                            <div className="inbox-item-sub">{req.reporterName} | {new Date(req.proposedDate).toLocaleDateString()}</div>
                            <div className="inbox-item-message"><strong>Topics:</strong> {req.topics}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 🏠 HOME PAGE MANAGER */}
              {/* ──────────────────────────────────────────────────────── */}
              {activeSection === 'homepage' && homeData && (
                <form onSubmit={handleSaveHomeSettings}>
                  <div className="admin-card">
                    <h3 style={{ marginBottom: '16px' }}>Hero Banner Configuration</h3>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Hero Title (English)</label>
                        <input 
                          type="text" 
                          value={homeData.hero?.titleEn || ''} 
                          onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, titleEn: e.target.value } })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Hero Title (Nepali)</label>
                        <input 
                          type="text" 
                          value={homeData.hero?.titleNp || ''} 
                          onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, titleNp: e.target.value } })}
                        />
                      </div>
                    </div>

                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Hero Subtitle (English)</label>
                        <input 
                          type="text" 
                          value={homeData.hero?.subtitleEn || ''} 
                          onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, subtitleEn: e.target.value } })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Hero Subtitle (Nepali)</label>
                        <input 
                          type="text" 
                          value={homeData.hero?.subtitleNp || ''} 
                          onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, subtitleNp: e.target.value } })}
                        />
                      </div>
                    </div>

                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Hero Description (English)</label>
                        <textarea 
                          rows="3"
                          value={homeData.hero?.descriptionEn || ''} 
                          onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, descriptionEn: e.target.value } })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Hero Description (Nepali)</label>
                        <textarea 
                          rows="3"
                          value={homeData.hero?.descriptionNp || ''} 
                          onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, descriptionNp: e.target.value } })}
                        />
                      </div>
                    </div>

                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>CTA Button Text (English)</label>
                        <input 
                          type="text" 
                          value={homeData.hero?.ctaTextEn || ''} 
                          onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, ctaTextEn: e.target.value } })}
                        />
                      </div>
                      <div className="form-group">
                        <label>CTA Button Text (Nepali)</label>
                        <input 
                          type="text" 
                          value={homeData.hero?.ctaTextNp || ''} 
                          onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, ctaTextNp: e.target.value } })}
                        />
                      </div>
                      <div className="form-group">
                        <label>CTA Button Link</label>
                        <input 
                          type="text" 
                          value={homeData.hero?.ctaLink || ''} 
                          onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, ctaLink: e.target.value } })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Hero Image Upload</label>
                        <div className="image-upload-zone">
                          <input 
                            type="file" 
                            accept="image/*" 
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                            onChange={(e) => handleFileUpload(e, (url) => setHomeData({ ...homeData, hero: { ...homeData.hero, image: url } }))}
                          />
                          <p><i className="fas fa-cloud-upload-alt"></i> Choose new image</p>
                          {homeData.hero?.image && <img src={homeData.hero.image} alt="" className="image-upload-preview" />}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="admin-card">
                    <h3 style={{ marginBottom: '16px' }}>Impact Statistics Counters</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                      <div className="form-group">
                        <label>Lives Impacted</label>
                        <input type="text" value={homeData.stats?.livesImpacted || ''} onChange={(e) => setHomeData({ ...homeData, stats: { ...homeData.stats, livesImpacted: e.target.value } })} />
                      </div>
                      <div className="form-group">
                        <label>Patients Supported</label>
                        <input type="text" value={homeData.stats?.patientsSupported || ''} onChange={(e) => setHomeData({ ...homeData, stats: { ...homeData.stats, patientsSupported: e.target.value } })} />
                      </div>
                      <div className="form-group">
                        <label>Health Policies Created</label>
                        <input type="text" value={homeData.stats?.healthPolicies || ''} onChange={(e) => setHomeData({ ...homeData, stats: { ...homeData.stats, healthPolicies: e.target.value } })} />
                      </div>
                      <div className="form-group">
                        <label>Years Of Service</label>
                        <input type="text" value={homeData.stats?.yearsOfService || ''} onChange={(e) => setHomeData({ ...homeData, stats: { ...homeData.stats, yearsOfService: e.target.value } })} />
                      </div>
                      <div className="form-group">
                        <label>Reach Impact</label>
                        <input type="text" value={homeData.stats?.reachImpact || ''} onChange={(e) => setHomeData({ ...homeData, stats: { ...homeData.stats, reachImpact: e.target.value } })} />
                      </div>
                    </div>
                  </div>

                  {/* Explore work cards */}
                  <div className="admin-card">
                    <h3 style={{ marginBottom: '16px' }}>Explore My Work Cards</h3>
                    {['health', 'parliament', 'media', 'journey'].map(cardKey => (
                      <div key={cardKey} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
                        <h4 style={{ textTransform: 'capitalize', color: 'var(--primary)', marginBottom: '10px' }}>{cardKey} card</h4>
                        <div className="bilingual-grid">
                          <div className="form-group">
                            <label>Title (English)</label>
                            <input 
                              type="text" 
                              value={homeData.exploreWork?.[cardKey]?.titleEn || ''} 
                              onChange={(e) => {
                                const exp = { ...homeData.exploreWork };
                                exp[cardKey] = { ...exp[cardKey], titleEn: e.target.value };
                                setHomeData({ ...homeData, exploreWork: exp });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Title (Nepali)</label>
                            <input 
                              type="text" 
                              value={homeData.exploreWork?.[cardKey]?.titleNp || ''} 
                              onChange={(e) => {
                                const exp = { ...homeData.exploreWork };
                                exp[cardKey] = { ...exp[cardKey], titleNp: e.target.value };
                                setHomeData({ ...homeData, exploreWork: exp });
                              }}
                            />
                          </div>
                        </div>
                        <div className="bilingual-grid">
                          <div className="form-group">
                            <label>Description (English)</label>
                            <input 
                              type="text" 
                              value={homeData.exploreWork?.[cardKey]?.descriptionEn || ''} 
                              onChange={(e) => {
                                const exp = { ...homeData.exploreWork };
                                exp[cardKey] = { ...exp[cardKey], descriptionEn: e.target.value };
                                setHomeData({ ...homeData, exploreWork: exp });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Description (Nepali)</label>
                            <input 
                              type="text" 
                              value={homeData.exploreWork?.[cardKey]?.descriptionNp || ''} 
                              onChange={(e) => {
                                const exp = { ...homeData.exploreWork };
                                exp[cardKey] = { ...exp[cardKey], descriptionNp: e.target.value };
                                setHomeData({ ...homeData, exploreWork: exp });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Section Toggles and ordering */}
                  <div className="admin-card">
                    <h3 style={{ marginBottom: '16px' }}>Manage Homepage Sections Layout</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '15px' }}>Arrange section sorting display orders and toggle their visibility directly.</p>
                    
                    <div className="reorder-list">
                      {['hero', 'stats', 'explore', 'visionMission', 'featuredNews', 'featuredVideos', 'gallery'].map((secName, index) => {
                        // Safe map structure accessor
                        const secConfig = homeData.sections?.[secName] || { visible: true, order: index + 1 };
                        
                        return (
                          <div key={secName} className="reorder-item">
                            <div className="reorder-item-left">
                              <span className="reorder-drag-handle"><i className="fas fa-ellipsis-v"></i><i className="fas fa-ellipsis-v" style={{ marginLeft: 2 }}></i></span>
                              <span className="reorder-title" style={{ textTransform: 'capitalize' }}>{secName.replace(/([A-Z])/g, ' $1')} Section</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>
                                <input 
                                  type="checkbox" 
                                  checked={secConfig.visible}
                                  onChange={(e) => {
                                    const updatedSecs = { ...homeData.sections };
                                    updatedSecs[secName] = { ...secConfig, visible: e.target.checked };
                                    setHomeData({ ...homeData, sections: updatedSecs });
                                  }}
                                />
                                Show Section
                              </label>
                              <div className="form-group" style={{ margin: 0, width: '70px' }}>
                                <input 
                                  type="number" 
                                  value={secConfig.order} 
                                  onChange={(e) => {
                                    const updatedSecs = { ...homeData.sections };
                                    updatedSecs[secName] = { ...secConfig, order: parseInt(e.target.value) || 0 };
                                    setHomeData({ ...homeData, sections: updatedSecs });
                                  }}
                                  style={{ padding: '4px 8px', fontSize: '0.8rem', textAlign: 'center' }} 
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px' }}>
                      <i className="fas fa-save"></i> Save Homepage Configuration
                    </button>
                  </div>
                </form>
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 👤 ABOUT PAGE MANAGER */}
              {/* ──────────────────────────────────────────────────────── */}
              {activeSection === 'about' && aboutData && (
                <form onSubmit={handleSaveAboutSettings}>
                  <div className="admin-card">
                    <h3 style={{ marginBottom: '16px' }}>Hero Intro & Biography</h3>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Main Intro (English)</label>
                        <input type="text" value={aboutData.titleEn || ''} onChange={(e) => setAboutData({ ...aboutData, titleEn: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Main Intro (Nepali)</label>
                        <input type="text" value={aboutData.titleNp || ''} onChange={(e) => setAboutData({ ...aboutData, titleNp: e.target.value })} />
                      </div>
                    </div>

                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Brief Description (English)</label>
                        <textarea rows="3" value={aboutData.descriptionEn || ''} onChange={(e) => setAboutData({ ...aboutData, descriptionEn: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Brief Description (Nepali)</label>
                        <textarea rows="3" value={aboutData.descriptionNp || ''} onChange={(e) => setAboutData({ ...aboutData, descriptionNp: e.target.value })} />
                      </div>
                    </div>

                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Detailed Story (English)</label>
                        <textarea rows="6" value={aboutData.storyEn || ''} onChange={(e) => setAboutData({ ...aboutData, storyEn: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Detailed Story (Nepali)</label>
                        <textarea rows="6" value={aboutData.storyNp || ''} onChange={(e) => setAboutData({ ...aboutData, storyNp: e.target.value })} />
                      </div>
                    </div>

                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Profile Photo</label>
                        <div className="image-upload-zone">
                          <input 
                            type="file" 
                            accept="image/*" 
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}
                            onChange={(e) => handleFileUpload(e, (url) => setAboutData({ ...aboutData, profileImage: url }))}
                          />
                          <p><i className="fas fa-cloud-upload-alt"></i> Upload profile image</p>
                          {aboutData.profileImage && <img src={aboutData.profileImage} className="image-upload-preview" alt="" />}
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Signature Image</label>
                        <div className="image-upload-zone">
                          <input 
                            type="file" 
                            accept="image/*" 
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}
                            onChange={(e) => handleFileUpload(e, (url) => setAboutData({ ...aboutData, signatureImage: url }))}
                          />
                          <p><i className="fas fa-cloud-upload-alt"></i> Upload signature image</p>
                          {aboutData.signatureImage && <img src={aboutData.signatureImage} className="image-upload-preview" alt="" />}
                        </div>
                      </div>
                    </div>

                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Personal Quote Banner (English)</label>
                        <input type="text" value={aboutData.quoteEn || ''} onChange={(e) => setAboutData({ ...aboutData, quoteEn: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Personal Quote Banner (Nepali)</label>
                        <input type="text" value={aboutData.quoteNp || ''} onChange={(e) => setAboutData({ ...aboutData, quoteNp: e.target.value })} />
                      </div>
                    </div>
                  </div>

                  {/* Education & Careers Dynamic Lists */}
                  <div className="admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <h3>Education Details</h3>
                      <button 
                        type="button" 
                        className="btn btn-outline" 
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        onClick={() => {
                          const edu = [...(aboutData.education || [])];
                          edu.push({ schoolEn: '', schoolNp: '', degreeEn: '', degreeNp: '', period: '' });
                          setAboutData({ ...aboutData, education: edu });
                        }}
                      >
                        <i className="fas fa-plus"></i> Add Degree
                      </button>
                    </div>

                    {(aboutData.education || []).map((edu, idx) => (
                      <div key={idx} className="dynamic-form-item">
                        <button type="button" className="dynamic-form-remove" onClick={() => {
                          const updated = (aboutData.education || []).filter((_, i) => i !== idx);
                          setAboutData({ ...aboutData, education: updated });
                        }}><i className="fas fa-trash"></i></button>
                        
                        <div className="bilingual-grid">
                          <div className="form-group">
                            <label>Institution / School (English)</label>
                            <input type="text" value={edu.schoolEn || ''} onChange={(e) => {
                              const updated = [...aboutData.education];
                              updated[idx].schoolEn = e.target.value;
                              setAboutData({ ...aboutData, education: updated });
                            }} />
                          </div>
                          <div className="form-group">
                            <label>Institution / School (Nepali)</label>
                            <input type="text" value={edu.schoolNp || ''} onChange={(e) => {
                              const updated = [...aboutData.education];
                              updated[idx].schoolNp = e.target.value;
                              setAboutData({ ...aboutData, education: updated });
                            }} />
                          </div>
                        </div>

                        <div className="bilingual-grid">
                          <div className="form-group">
                            <label>Degree / Subject (English)</label>
                            <input type="text" value={edu.degreeEn || ''} onChange={(e) => {
                              const updated = [...aboutData.education];
                              updated[idx].degreeEn = e.target.value;
                              setAboutData({ ...aboutData, education: updated });
                            }} />
                          </div>
                          <div className="form-group">
                            <label>Degree / Subject (Nepali)</label>
                            <input type="text" value={edu.degreeNp || ''} onChange={(e) => {
                              const updated = [...aboutData.education];
                              updated[idx].degreeNp = e.target.value;
                              setAboutData({ ...aboutData, education: updated });
                            }} />
                          </div>
                          <div className="form-group">
                            <label>Completion Year / Period</label>
                            <input type="text" placeholder="e.g. 2012 - 2016" value={edu.period || ''} onChange={(e) => {
                              const updated = [...aboutData.education];
                              updated[idx].period = e.target.value;
                              setAboutData({ ...aboutData, education: updated });
                            }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Career Timeline details */}
                  <div className="admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <h3>Career Timeline Events</h3>
                      <button 
                        type="button" 
                        className="btn btn-outline" 
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        onClick={() => {
                          const timeline = [...(aboutData.careerTimeline || [])];
                          timeline.push({ organizationEn: '', organizationNp: '', roleEn: '', roleNp: '', period: '' });
                          setAboutData({ ...aboutData, careerTimeline: timeline });
                        }}
                      >
                        <i className="fas fa-plus"></i> Add Career Event
                      </button>
                    </div>

                    {(aboutData.careerTimeline || []).map((car, idx) => (
                      <div key={idx} className="dynamic-form-item">
                        <button type="button" className="dynamic-form-remove" onClick={() => {
                          const updated = (aboutData.careerTimeline || []).filter((_, i) => i !== idx);
                          setAboutData({ ...aboutData, careerTimeline: updated });
                        }}><i className="fas fa-trash"></i></button>

                        <div className="bilingual-grid">
                          <div className="form-group">
                            <label>Organization (English)</label>
                            <input type="text" value={car.organizationEn || ''} onChange={(e) => {
                              const updated = [...aboutData.careerTimeline];
                              updated[idx].organizationEn = e.target.value;
                              setAboutData({ ...aboutData, careerTimeline: updated });
                            }} />
                          </div>
                          <div className="form-group">
                            <label>Organization (Nepali)</label>
                            <input type="text" value={car.organizationNp || ''} onChange={(e) => {
                              const updated = [...aboutData.careerTimeline];
                              updated[idx].organizationNp = e.target.value;
                              setAboutData({ ...aboutData, careerTimeline: updated });
                            }} />
                          </div>
                        </div>

                        <div className="bilingual-grid">
                          <div className="form-group">
                            <label>Designation / Role (English)</label>
                            <input type="text" value={car.roleEn || ''} onChange={(e) => {
                              const updated = [...aboutData.careerTimeline];
                              updated[idx].roleEn = e.target.value;
                              setAboutData({ ...aboutData, careerTimeline: updated });
                            }} />
                          </div>
                          <div className="form-group">
                            <label>Designation / Role (Nepali)</label>
                            <input type="text" value={car.roleNp || ''} onChange={(e) => {
                              const updated = [...aboutData.careerTimeline];
                              updated[idx].roleNp = e.target.value;
                              setAboutData({ ...aboutData, careerTimeline: updated });
                            }} />
                          </div>
                          <div className="form-group">
                            <label>Employment Period</label>
                            <input type="text" placeholder="e.g. 2018 - Present" value={car.period || ''} onChange={(e) => {
                              const updated = [...aboutData.careerTimeline];
                              updated[idx].period = e.target.value;
                              setAboutData({ ...aboutData, careerTimeline: updated });
                            }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px' }}>
                      <i className="fas fa-save"></i> Save Biography changes
                    </button>
                  </div>
                </form>
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 🏥 MINISTRY PAGE MANAGER */}
              {/* ──────────────────────────────────────────────────────── */}
              {activeSection === 'ministry' && ministryData && (
                <form onSubmit={handleSaveMinistrySettings}>
                  <div className="admin-card">
                    <h3 style={{ marginBottom: '16px' }}>Ministry Hero & Stats</h3>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Hero Title (English)</label>
                        <input type="text" value={ministryData.hero?.titleEn || ''} onChange={(e) => setMinistryData({ ...ministryData, hero: { ...ministryData.hero, titleEn: e.target.value } })} />
                      </div>
                      <div className="form-group">
                        <label>Hero Title (Nepali)</label>
                        <input type="text" value={ministryData.hero?.titleNp || ''} onChange={(e) => setMinistryData({ ...ministryData, hero: { ...ministryData.hero, titleNp: e.target.value } })} />
                      </div>
                    </div>

                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Hero Description (English)</label>
                        <textarea rows="3" value={ministryData.hero?.descriptionEn || ''} onChange={(e) => setMinistryData({ ...ministryData, hero: { ...ministryData.hero, descriptionEn: e.target.value } })} />
                      </div>
                      <div className="form-group">
                        <label>Hero Description (Nepali)</label>
                        <textarea rows="3" value={ministryData.hero?.descriptionNp || ''} onChange={(e) => setMinistryData({ ...ministryData, hero: { ...ministryData.hero, descriptionNp: e.target.value } })} />
                      </div>
                    </div>

                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Hero Background image</label>
                        <div className="image-upload-zone">
                          <input 
                            type="file" 
                            accept="image/*" 
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}
                            onChange={(e) => handleFileUpload(e, (url) => setMinistryData({ ...ministryData, hero: { ...ministryData.hero, image: url } }))}
                          />
                          <p><i className="fas fa-cloud-upload-alt"></i> Choose new image</p>
                          {ministryData.hero?.image && <img src={ministryData.hero.image} className="image-upload-preview" alt="" />}
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Districts Reached (Stat)</label>
                        <input type="text" value={ministryData.stats?.districtsReached || ''} onChange={(e) => setMinistryData({ ...ministryData, stats: { ...ministryData.stats, districtsReached: e.target.value } })} />
                      </div>
                    </div>
                  </div>

                  {/* Ministry contributions array */}
                  <div className="admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <h3>Health Contributions Log</h3>
                      <button 
                        type="button" 
                        className="btn btn-outline" 
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        onClick={() => {
                          const conts = [...(ministryData.contributions || [])];
                          conts.push({ titleEn: '', titleNp: '', descriptionEn: '', descriptionNp: '', image: '', link: '' });
                          setMinistryData({ ...ministryData, contributions: conts });
                        }}
                      >
                        <i className="fas fa-plus"></i> Add Contribution
                      </button>
                    </div>

                    {(ministryData.contributions || []).map((item, idx) => (
                      <div key={idx} className="dynamic-form-item">
                        <button type="button" className="dynamic-form-remove" onClick={() => {
                          const updated = (ministryData.contributions || []).filter((_, i) => i !== idx);
                          setMinistryData({ ...ministryData, contributions: updated });
                        }}><i className="fas fa-trash"></i></button>

                        <div className="bilingual-grid">
                          <div className="form-group">
                            <label>Contribution Category / Title (English)</label>
                            <input type="text" value={item.titleEn || ''} onChange={(e) => {
                              const updated = [...ministryData.contributions];
                              updated[idx].titleEn = e.target.value;
                              setMinistryData({ ...ministryData, contributions: updated });
                            }} />
                          </div>
                          <div className="form-group">
                            <label>Contribution Category / Title (Nepali)</label>
                            <input type="text" value={item.titleNp || ''} onChange={(e) => {
                              const updated = [...ministryData.contributions];
                              updated[idx].titleNp = e.target.value;
                              setMinistryData({ ...ministryData, contributions: updated });
                            }} />
                          </div>
                        </div>

                        <div className="bilingual-grid">
                          <div className="form-group">
                            <label>Description (English)</label>
                            <textarea rows="2" value={item.descriptionEn || ''} onChange={(e) => {
                              const updated = [...ministryData.contributions];
                              updated[idx].descriptionEn = e.target.value;
                              setMinistryData({ ...ministryData, contributions: updated });
                            }} />
                          </div>
                          <div className="form-group">
                            <label>Description (Nepali)</label>
                            <textarea rows="2" value={item.descriptionNp || ''} onChange={(e) => {
                              const updated = [...ministryData.contributions];
                              updated[idx].descriptionNp = e.target.value;
                              setMinistryData({ ...ministryData, contributions: updated });
                            }} />
                          </div>
                        </div>

                        <div className="bilingual-grid">
                          <div className="form-group">
                            <label>Image Upload</label>
                            <div className="image-upload-zone">
                              <input 
                                type="file" 
                                accept="image/*" 
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}
                                onChange={(e) => handleFileUpload(e, (url) => {
                                  const updated = [...ministryData.contributions];
                                  updated[idx].image = url;
                                  setMinistryData({ ...ministryData, contributions: updated });
                                })}
                              />
                              <p><i className="fas fa-cloud-upload-alt"></i> Upload contribution image</p>
                              {item.image && <img src={item.image} className="image-upload-preview" alt="" />}
                            </div>
                          </div>

                          <div className="form-group">
                            <label>External Article Link (URL)</label>
                            <input type="text" placeholder="https://" value={item.link || ''} onChange={(e) => {
                              const updated = [...ministryData.contributions];
                              updated[idx].link = e.target.value;
                              setMinistryData({ ...ministryData, contributions: updated });
                            }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px' }}>
                      <i className="fas fa-save"></i> Save Ministry Settings
                    </button>
                  </div>
                </form>
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 🏛 PARLIAMENT PAGE MANAGER */}
              {/* ──────────────────────────────────────────────────────── */}
              {activeSection === 'parliament' && parliamentData && (
                <form onSubmit={handleSaveParliamentSettings}>
                  <div className="admin-card">
                    <h3 style={{ marginBottom: '16px' }}>Parliament Hero</h3>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Hero Title (English)</label>
                        <input type="text" value={parliamentData.hero?.titleEn || ''} onChange={(e) => setParliamentData({ ...parliamentData, hero: { ...parliamentData.hero, titleEn: e.target.value } })} />
                      </div>
                      <div className="form-group">
                        <label>Hero Title (Nepali)</label>
                        <input type="text" value={parliamentData.hero?.titleNp || ''} onChange={(e) => setParliamentData({ ...parliamentData, hero: { ...parliamentData.hero, titleNp: e.target.value } })} />
                      </div>
                    </div>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Hero Description (English)</label>
                        <textarea rows="3" value={parliamentData.hero?.descriptionEn || ''} onChange={(e) => setParliamentData({ ...parliamentData, hero: { ...parliamentData.hero, descriptionEn: e.target.value } })} />
                      </div>
                      <div className="form-group">
                        <label>Hero Description (Nepali)</label>
                        <textarea rows="3" value={parliamentData.hero?.descriptionNp || ''} onChange={(e) => setParliamentData({ ...parliamentData, hero: { ...parliamentData.hero, descriptionNp: e.target.value } })} />
                      </div>
                    </div>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Hero Background image</label>
                        <div className="image-upload-zone">
                          <input 
                            type="file" 
                            accept="image/*" 
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}
                            onChange={(e) => handleFileUpload(e, (url) => setParliamentData({ ...parliamentData, hero: { ...parliamentData.hero, image: url } }))}
                          />
                          <p><i className="fas fa-cloud-upload-alt"></i> Choose new image</p>
                          {parliamentData.hero?.image && <img src={parliamentData.hero.image} className="image-upload-preview" alt="" />}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div className="form-group">
                          <label>Questions Raised</label>
                          <input type="text" value={parliamentData.impact?.questionsRaised || ''} onChange={(e) => setParliamentData({ ...parliamentData, impact: { ...parliamentData.impact, questionsRaised: e.target.value } })} />
                        </div>
                        <div className="form-group">
                          <label>Bills Supported</label>
                          <input type="text" value={parliamentData.impact?.billsSupported || ''} onChange={(e) => setParliamentData({ ...parliamentData, impact: { ...parliamentData.impact, billsSupported: e.target.value } })} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Speeches & Documents */}
                  <div className="admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <h3>Speeches & Work Transcripts</h3>
                      <button 
                        type="button" 
                        className="btn btn-outline" 
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        onClick={() => {
                          const sp = [...(parliamentData.speeches || [])];
                          sp.push({ titleEn: '', titleNp: '', descriptionEn: '', descriptionNp: '', videoUrl: '', imageUrl: '', date: new Date().toISOString() });
                          setParliamentData({ ...parliamentData, speeches: sp });
                        }}
                      >
                        <i className="fas fa-plus"></i> Add Speech Event
                      </button>
                    </div>

                    {(parliamentData.speeches || []).map((speech, idx) => (
                      <div key={idx} className="dynamic-form-item">
                        <button type="button" className="dynamic-form-remove" onClick={() => {
                          const updated = (parliamentData.speeches || []).filter((_, i) => i !== idx);
                          setParliamentData({ ...parliamentData, speeches: updated });
                        }}><i className="fas fa-trash"></i></button>

                        <div className="bilingual-grid">
                          <div className="form-group">
                            <label>Speech Event Title (English)</label>
                            <input type="text" value={speech.titleEn || ''} onChange={(e) => {
                              const updated = [...parliamentData.speeches];
                              updated[idx].titleEn = e.target.value;
                              setParliamentData({ ...parliamentData, speeches: updated });
                            }} />
                          </div>
                          <div className="form-group">
                            <label>Speech Event Title (Nepali)</label>
                            <input type="text" value={speech.titleNp || ''} onChange={(e) => {
                              const updated = [...parliamentData.speeches];
                              updated[idx].titleNp = e.target.value;
                              setParliamentData({ ...parliamentData, speeches: updated });
                            }} />
                          </div>
                        </div>

                        <div className="bilingual-grid">
                          <div className="form-group">
                            <label>Description summary (English)</label>
                            <textarea rows="2" value={speech.descriptionEn || ''} onChange={(e) => {
                              const updated = [...parliamentData.speeches];
                              updated[idx].descriptionEn = e.target.value;
                              setParliamentData({ ...parliamentData, speeches: updated });
                            }} />
                          </div>
                          <div className="form-group">
                            <label>Description summary (Nepali)</label>
                            <textarea rows="2" value={speech.descriptionNp || ''} onChange={(e) => {
                              const updated = [...parliamentData.speeches];
                              updated[idx].descriptionNp = e.target.value;
                              setParliamentData({ ...parliamentData, speeches: updated });
                            }} />
                          </div>
                        </div>

                        <div className="bilingual-grid">
                          <div className="form-group">
                            <label>Speech PDF Transcript Upload</label>
                            <div className="image-upload-zone">
                              <input 
                                type="file" 
                                accept="application/pdf" 
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}
                                onChange={(e) => handleFileUpload(e, (url) => {
                                  const updated = [...parliamentData.speeches];
                                  updated[idx].videoUrl = url; // save path inside videoUrl field
                                  setParliamentData({ ...parliamentData, speeches: updated });
                                })}
                              />
                              <p><i className="fas fa-file-pdf" style={{ color: 'var(--primary)', marginRight: 4 }}></i> Upload Transcript PDF</p>
                              {speech.videoUrl && <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Linked PDF: {speech.videoUrl}</span>}
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Event Date</label>
                            <input type="date" value={speech.date ? new Date(speech.date).toISOString().split('T')[0] : ''} onChange={(e) => {
                              const updated = [...parliamentData.speeches];
                              updated[idx].date = e.target.value;
                              setParliamentData({ ...parliamentData, speeches: updated });
                            }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px' }}>
                      <i className="fas fa-save"></i> Save Parliament Settings
                    </button>
                  </div>
                </form>
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 📰 NEWS ARTICLE MANAGER (CRUD) */}
              {/* ──────────────────────────────────────────────────────── */}
              {activeSection === 'news' && (
                <div>
                  <div className="cms-toolbar">
                    <div className="cms-search-bar">
                      <i className="fas fa-search"></i>
                      <input 
                        type="text" 
                        placeholder="Search News by title..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="cms-filters">
                      <select className="cms-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                        <option value="All">All Categories</option>
                        <option value="Health">Health</option>
                        <option value="Parliament">Parliament</option>
                        <option value="Politics">Politics</option>
                        <option value="Public Service">Public Service</option>
                      </select>
                      <button className="btn btn-primary" onClick={() => openCreateModal('news')}>
                        <i className="fas fa-plus"></i> Add Article
                      </button>
                    </div>
                  </div>

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Thumbnail</th>
                          <th>Article Title</th>
                          <th>Category</th>
                          <th>News Source</th>
                          <th>Published Date</th>
                          <th>Featured</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {news
                          .filter(n => n.titleEn?.toLowerCase().includes(searchTerm.toLowerCase()) && (filterCategory === 'All' || n.category === filterCategory))
                          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                          .map(item => (
                            <tr key={item._id}>
                              <td>
                                <img src={item.image || '/image/image13.png'} alt="" style={{ width: 44, height: 32, borderRadius: 2, objectFit: 'cover' }} />
                              </td>
                              <td style={{ fontWeight: 600, color: 'var(--secondary)' }}>{item.titleEn}</td>
                              <td><span className="badge-tag news">{item.category || 'General'}</span></td>
                              <td>{item.publisherEn || 'External'}</td>
                              <td>{new Date(item.publishedDate).toLocaleDateString()}</td>
                              <td>
                                <span style={{ color: item.isFeatured ? '#27AE60' : '#85929E', fontWeight: 600 }}>
                                  {item.isFeatured ? '★ Featured' : '☆ Standard'}
                                </span>
                              </td>
                              <td>
                                <div className="action-btn-group">
                                  <button className="icon-btn edit" onClick={() => openEditModal('news', item)}><i className="fas fa-edit"></i></button>
                                  <button className="icon-btn delete" onClick={() => handleDeleteItem('news', item._id)}><i className="fas fa-trash"></i></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination footer */}
                  <div className="admin-pagination">
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Showing Page {currentPage}</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="admin-pagination-btn">Prev</button>
                      <button disabled={news.length <= currentPage * itemsPerPage} onClick={() => setCurrentPage(currentPage + 1)} className="admin-pagination-btn">Next</button>
                    </div>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* ✍️ BLOG MANAGEMENT (CRUD + Markdown Editor) */}
              {/* ──────────────────────────────────────────────────────── */}
              {activeSection === 'blog' && (
                <div>
                  <div className="cms-toolbar">
                    <div className="cms-search-bar">
                      <i className="fas fa-search"></i>
                      <input 
                        type="text" 
                        placeholder="Search Blogs by title..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <button className="btn btn-primary" onClick={() => openCreateModal('blog')}>
                      <i className="fas fa-plus"></i> Create Blog Post
                    </button>
                  </div>

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Blog Title</th>
                          <th>Category</th>
                          <th>Views</th>
                          <th>Status</th>
                          <th>Published Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogs
                          .filter(b => b.titleEn?.toLowerCase().includes(searchTerm.toLowerCase()))
                          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                          .map(item => (
                            <tr key={item._id}>
                              <td>
                                <img src={item.image || '/image/image1.png'} alt="" style={{ width: 44, height: 32, borderRadius: 2, objectFit: 'cover' }} />
                              </td>
                              <td style={{ fontWeight: 600, color: 'var(--secondary)' }}>{item.titleEn}</td>
                              <td><span className="badge-tag blog">{item.category || 'Healthcare'}</span></td>
                              <td><i className="fas fa-eye" style={{ marginRight: 4, color: 'var(--text-muted)' }}></i> {item.views || 0}</td>
                              <td>
                                <span style={{ color: '#27AE60', fontWeight: 600 }}>Published</span>
                              </td>
                              <td>{new Date(item.publishedDate).toLocaleDateString()}</td>
                              <td>
                                <div className="action-btn-group">
                                  <button className="icon-btn edit" onClick={() => openEditModal('blog', item)}><i className="fas fa-edit"></i></button>
                                  <button className="icon-btn delete" onClick={() => handleDeleteItem('blog', item._id)}><i className="fas fa-trash"></i></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="admin-pagination">
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Showing Page {currentPage}</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="admin-pagination-btn">Prev</button>
                      <button disabled={blogs.length <= currentPage * itemsPerPage} onClick={() => setCurrentPage(currentPage + 1)} className="admin-pagination-btn">Next</button>
                    </div>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 🎤 MEDIA COVERAGE MANAGER */}
              {/* ──────────────────────────────────────────────────────── */}
              {activeSection === 'media' && (
                <div>
                  <div className="cms-toolbar">
                    <div className="cms-search-bar">
                      <i className="fas fa-search"></i>
                      <input 
                        type="text" 
                        placeholder="Search media items..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <button className="btn btn-primary" onClick={() => openCreateModal('media')}>
                      <i className="fas fa-plus"></i> Add Video / Podcast
                    </button>
                  </div>

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Thumbnail</th>
                          <th>Title</th>
                          <th>Type</th>
                          <th>Source Channel</th>
                          <th>Link</th>
                          <th>Featured</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {media
                          .filter(m => m.titleEn?.toLowerCase().includes(searchTerm.toLowerCase()))
                          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                          .map(item => (
                            <tr key={item._id}>
                              <td>
                                <img src={item.thumbnail || '/image/image12.png'} alt="" style={{ width: 44, height: 32, borderRadius: 2, objectFit: 'cover' }} />
                              </td>
                              <td style={{ fontWeight: 600, color: 'var(--secondary)' }}>{item.titleEn}</td>
                              <td><span className="badge-tag media">{item.type}</span></td>
                              <td>{item.sourceEn}</td>
                              <td><a href={item.link} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>Play link &rarr;</a></td>
                              <td>{item.isFeatured ? '★ Yes' : 'No'}</td>
                              <td>
                                <div className="action-btn-group">
                                  <button className="icon-btn edit" onClick={() => openEditModal('media', item)}><i className="fas fa-edit"></i></button>
                                  <button className="icon-btn delete" onClick={() => handleDeleteItem('media', item._id)}><i className="fas fa-trash"></i></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 🖼 GALLERY MANAGER */}
              {/* ──────────────────────────────────────────────────────── */}
              {activeSection === 'gallery' && (
                <div>
                  <div className="cms-toolbar">
                    <div className="cms-search-bar">
                      <i className="fas fa-search"></i>
                      <input 
                        type="text" 
                        placeholder="Search gallery images..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <button className="btn btn-primary" onClick={() => openCreateModal('gallery')}>
                      <i className="fas fa-plus"></i> Upload Gallery Image
                    </button>
                  </div>

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Preview</th>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Featured</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gallery
                          .filter(g => g.titleEn?.toLowerCase().includes(searchTerm.toLowerCase()))
                          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                          .map(item => (
                            <tr key={item._id}>
                              <td>
                                <img src={item.mediaUrl} alt="" style={{ width: 50, height: 40, borderRadius: 2, objectFit: 'cover' }} />
                              </td>
                              <td style={{ fontWeight: 600, color: 'var(--secondary)' }}>{item.titleEn}</td>
                              <td><span className="badge-tag" style={{ background: '#EAECEE', color: '#2C3E50' }}>{item.category}</span></td>
                              <td>{item.isFeatured ? '★ Yes' : 'No'}</td>
                              <td>
                                <div className="action-btn-group">
                                  <button className="icon-btn edit" onClick={() => openEditModal('gallery', item)}><i className="fas fa-edit"></i></button>
                                  <button className="icon-btn delete" onClick={() => handleDeleteItem('gallery', item._id)}><i className="fas fa-trash"></i></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 📅 PUBLIC ENGAGEMENT MANAGER */}
              {/* ──────────────────────────────────────────────────────── */}
              {activeSection === 'engagements' && (
                <div>
                  <div className="cms-toolbar">
                    <div className="cms-search-bar">
                      <i className="fas fa-search"></i>
                      <input
                        type="text"
                        placeholder="Search engagements..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="cms-filters">
                      <select className="cms-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="All">All Statuses</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button className="btn btn-primary" onClick={() => openCreateModal('engagement')}>
                        <i className="fas fa-plus"></i> Add Engagement
                      </button>
                    </div>
                  </div>

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Preview</th>
                          <th>Title</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Location</th>
                          <th>Status</th>
                          <th>Published</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {engagements
                          .filter(e =>
                            e.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
                            (filterStatus === 'All' || e.status === filterStatus)
                          )
                          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                          .map(item => (
                            <tr key={item._id}>
                              <td>
                                {item.image ? (
                                  <img src={item.image} alt="" style={{ width: 50, height: 40, borderRadius: 2, objectFit: 'cover' }} />
                                ) : (
                                  <div style={{ width: 50, height: 40, background: '#EAECEE', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="fas fa-calendar" style={{ color: '#95A5A6' }}></i>
                                  </div>
                                )}
                              </td>
                              <td style={{ fontWeight: 600, color: 'var(--secondary)' }}>{item.title}</td>
                              <td>{new Date(item.date).toLocaleDateString()}</td>
                              <td>{item.startTime}{item.endTime ? ` – ${item.endTime}` : ''}</td>
                              <td style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.location}</td>
                              <td>
                                <button
                                  type="button"
                                  className="badge-tag"
                                  style={{
                                    background: item.status === 'upcoming' ? 'rgba(200,16,46,0.1)' : '#EAECEE',
                                    color: item.status === 'upcoming' ? 'var(--primary)' : '#5D6D7E',
                                    border: 'none',
                                    cursor: 'pointer'
                                  }}
                                  onClick={() => handleToggleEngagementStatus(item)}
                                  title="Click to toggle status"
                                >
                                  {item.status}
                                </button>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className={`badge-tag ${item.isPublished ? 'badge-green' : ''}`}
                                  style={{
                                    background: item.isPublished ? 'rgba(39,174,96,0.12)' : '#EAECEE',
                                    color: item.isPublished ? '#27AE60' : '#5D6D7E',
                                    border: 'none',
                                    cursor: 'pointer'
                                  }}
                                  onClick={() => handleToggleEngagementPublish(item)}
                                  title="Click to publish/unpublish"
                                >
                                  {item.isPublished ? 'Published' : 'Draft'}
                                </button>
                              </td>
                              <td>
                                <div className="action-btn-group">
                                  <button className="icon-btn edit" onClick={() => openEditModal('engagement', item)}><i className="fas fa-edit"></i></button>
                                  <button className="icon-btn delete" onClick={() => handleDeleteItem('engagement', item._id)}><i className="fas fa-trash"></i></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 📩 CONTACT MESSAGES LOGS */}
              {/* ──────────────────────────────────────────────────────── */}
              {activeSection === 'contacts' && (
                <div>
                  <div className="cms-toolbar">
                    <div className="cms-search-bar">
                      <i className="fas fa-search"></i>
                      <input 
                        type="text" 
                        placeholder="Search contacts..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="cms-filters">
                      <select className="cms-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="All">All Statuses</option>
                        <option value="new">New Messages</option>
                        <option value="read">Read Messages</option>
                        <option value="replied">Replied</option>
                      </select>
                      <button 
                        className="btn btn-outline"
                        onClick={() => handleExportCSV(contacts, 'TK_ContactMessages', ['name', 'email', 'phone', 'subject', 'priority', 'message', 'status', 'createdAt'])}
                      >
                        <i className="fas fa-file-csv"></i> Export CSV
                      </button>
                    </div>
                  </div>

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Sender Details</th>
                          <th>Subject</th>
                          <th>Priority</th>
                          <th>Message preview</th>
                          <th>Received Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts
                          .filter(c => (c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || c.email?.toLowerCase().includes(searchTerm.toLowerCase())) && (filterStatus === 'All' || c.status === filterStatus))
                          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                          .map(item => (
                            <tr key={item._id} style={{ fontWeight: item.status === 'new' ? '700' : 'normal' }}>
                              <td>
                                <div style={{ fontWeight: 600 }}>{item.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.email}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.phone}</div>
                              </td>
                              <td>{item.subject}</td>
                              <td>
                                <span style={{ color: item.priority === 'Urgent' ? 'var(--primary)' : '#5D6D7E' }}>
                                  {item.priority}
                                </span>
                              </td>
                              <td style={{ maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.message}</td>
                              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                              <td>
                                <select 
                                  className="cms-select" 
                                  value={item.status}
                                  onChange={(e) => handleUpdateContactStatus(item._id, e.target.value)}
                                  style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                                >
                                  <option value="new">New</option>
                                  <option value="read">Read</option>
                                  <option value="replied">Replied</option>
                                  <option value="archived">Archived</option>
                                </select>
                              </td>
                              <td>
                                <button className="icon-btn delete" onClick={() => handleDeleteContact(item._id)}><i className="fas fa-trash"></i></button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 🎙 INTERVIEW REQUESTS LOGS */}
              {/* ──────────────────────────────────────────────────────── */}
              {activeSection === 'interviews' && (
                <div>
                  <div className="cms-toolbar">
                    <div className="cms-search-bar">
                      <i className="fas fa-search"></i>
                      <input 
                        type="text" 
                        placeholder="Search media organization..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="cms-filters">
                      <button 
                        className="btn btn-outline"
                        onClick={() => handleExportCSV(interviews, 'TK_InterviewRequests', ['mediaOutlet', 'reporterName', 'email', 'phone', 'proposedDate', 'topics', 'status', 'notes', 'createdAt'])}
                      >
                        <i className="fas fa-file-csv"></i> Export CSV
                      </button>
                    </div>
                  </div>

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Media Outlet</th>
                          <th>Contact Person</th>
                          <th>Proposed Date</th>
                          <th>Urgency / Topics</th>
                          <th>Status</th>
                          <th>Admin Notes</th>
                          <th>Decision</th>
                        </tr>
                      </thead>
                      <tbody>
                        {interviews
                          .filter(i => i.mediaOutlet?.toLowerCase().includes(searchTerm.toLowerCase()))
                          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                          .map(item => (
                            <tr key={item._id}>
                              <td>
                                <div style={{ fontWeight: 600, color: 'var(--secondary)' }}>{item.mediaOutlet}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.email}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.phone}</div>
                              </td>
                              <td>{item.reporterName}</td>
                              <td>{new Date(item.proposedDate).toLocaleString()}</td>
                              <td style={{ maxWidth: '220px', fontSize: '0.8rem' }}>
                                <div style={{ fontWeight: 600 }}>{item.topics}</div>
                              </td>
                              <td>
                                <span className={`badge-tag ${item.status === 'approved' ? 'media' : item.status === 'declined' ? 'news' : 'parliament'}`}>
                                  {item.status}
                                </span>
                              </td>
                              <td>
                                <input 
                                  type="text" 
                                  value={item.notes || ''} 
                                  placeholder="Add notes..."
                                  onChange={(e) => {
                                    // Local state update helper
                                    const updated = interviews.map(x => x._id === item._id ? { ...x, notes: e.target.value } : x);
                                    setInterviews(updated);
                                  }}
                                  onBlur={(e) => handleUpdateInterview(item._id, { notes: e.target.value })}
                                  style={{ padding: '4px 8px', fontSize: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                />
                              </td>
                              <td>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                  <button onClick={() => handleUpdateInterview(item._id, { status: 'approved' })} className="icon-btn view" title="Approve"><i className="fas fa-check"></i></button>
                                  <button onClick={() => handleUpdateInterview(item._id, { status: 'declined' })} className="icon-btn delete" title="Reject"><i className="fas fa-times"></i></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 🎓 INTERNSHIP PROGRAMS */}
              {/* ──────────────────────────────────────────────────────── */}
              {activeSection === 'internship-programs' && (
                <div>
                  {/* Stats Cards */}
                  <div className="admin-stats-grid" style={{ marginBottom: 28 }}>
                    <div className="admin-stat-card">
                      <div className="admin-stat-icon-wrap" style={{ background: '#EDE7F6', color: '#5E35B1' }}>
                        <i className="fas fa-graduation-cap"></i>
                      </div>
                      <div className="admin-stat-details">
                        <h4>Total Programs</h4>
                        <div className="value">{internshipStats?.totalPrograms || 0}</div>
                      </div>
                    </div>
                    <div className="admin-stat-card">
                      <div className="admin-stat-icon-wrap" style={{ background: '#E8F5E9', color: '#2E7D32' }}>
                        <i className="fas fa-door-open"></i>
                      </div>
                      <div className="admin-stat-details">
                        <h4>Active (Open)</h4>
                        <div className="value">{internshipStats?.activePrograms || 0}</div>
                      </div>
                    </div>
                    <div className="admin-stat-card">
                      <div className="admin-stat-icon-wrap" style={{ background: '#FFEBEE', color: '#C62828' }}>
                        <i className="fas fa-door-closed"></i>
                      </div>
                      <div className="admin-stat-details">
                        <h4>Closed</h4>
                        <div className="value">{internshipStats?.closedPrograms || 0}</div>
                      </div>
                    </div>
                    <div className="admin-stat-card">
                      <div className="admin-stat-icon-wrap" style={{ background: '#E3F2FD', color: '#1565C0' }}>
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <div className="admin-stat-details">
                        <h4>Total Applications</h4>
                        <div className="value">{internshipStats?.totalApplications || 0}</div>
                        <span className="link" onClick={() => setActiveSection('internship-applications')}>View all &rarr;</span>
                      </div>
                    </div>
                  </div>

                  {/* Toolbar */}
                  <div className="cms-toolbar">
                    <div className="cms-search-bar">
                      <i className="fas fa-search"></i>
                      <input type="text" placeholder="Search programs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="cms-filters">
                      <button className="btn btn-primary" onClick={() => {
                        setCurrentEditItem({ titleEn: '', titleNp: '', department: '', location: 'Kathmandu, Nepal', internshipType: 'Full-Time', vacancies: 1, duration: '3 Months', startDate: '', endDate: '', overviewEn: '', overviewNp: '', responsibilitiesEn: '', responsibilitiesNp: '', benefitsEn: '', benefitsNp: '', eligibilityEn: '', eligibilityNp: '', requiredSkillsEn: '', requiredSkillsNp: '', applicationDeadline: '', status: 'Open', isFeatured: false, metaTitle: '', metaDescription: '' });
                        setModalType('internship-program');
                        setIsModalOpen(true);
                      }}>
                        <i className="fas fa-plus"></i> Add Program
                      </button>
                    </div>
                  </div>

                  {/* Programs Table */}
                  <div className="admin-card" style={{ marginTop: 16 }}>
                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Position</th>
                            <th>Department</th>
                            <th>Duration</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Applications</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {internshipPrograms
                            .filter(p => !searchTerm || p.titleEn?.toLowerCase().includes(searchTerm.toLowerCase()) || p.department?.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map(prog => (
                            <tr key={prog._id}>
                              <td>
                                <div style={{ fontWeight: 600 }}>{prog.titleEn}</div>
                                {prog.isFeatured && <span style={{ fontSize: '0.7rem', background: '#FFF3E0', color: '#E65100', padding: '2px 6px', borderRadius: 4 }}>Featured</span>}
                              </td>
                              <td>{prog.department}</td>
                              <td>{prog.duration}</td>
                              <td>{prog.applicationDeadline ? new Date(prog.applicationDeadline).toLocaleDateString() : '—'}</td>
                              <td>
                                <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: '0.78rem', fontWeight: 600, background: prog.status === 'Open' ? '#E8F5E9' : '#FFEBEE', color: prog.status === 'Open' ? '#2E7D32' : '#C62828' }}>
                                  {prog.status}
                                </span>
                              </td>
                              <td><span style={{ fontWeight: 600 }}>{prog.applicationCount || 0}</span></td>
                              <td>
                                <div style={{ display: 'flex', gap: 6 }}>
                                  <button className="btn-icon" title="Edit" onClick={() => {
                                    setCurrentEditItem({ ...prog, startDate: prog.startDate ? prog.startDate.split('T')[0] : '', endDate: prog.endDate ? prog.endDate.split('T')[0] : '', applicationDeadline: prog.applicationDeadline ? prog.applicationDeadline.split('T')[0] : '' });
                                    setModalType('internship-program');
                                    setIsModalOpen(true);
                                  }}>
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button className="btn-icon" title={prog.status === 'Open' ? 'Close' : 'Open'} onClick={async () => {
                                    await api.patch(`/internships/${prog._id}/status`, { status: prog.status === 'Open' ? 'Closed' : 'Open' }).catch(() => null);
                                    loadAllSystemData();
                                    showFeedback(`Program ${prog.status === 'Open' ? 'closed' : 'opened'}!`);
                                  }}>
                                    <i className={`fas fa-${prog.status === 'Open' ? 'lock' : 'unlock'}`}></i>
                                  </button>
                                  <button className="btn-icon" title="Delete" style={{ color: '#dc3545' }} onClick={async () => {
                                    if (!window.confirm('Delete this internship program?')) return;
                                    await api.delete(`/internships/${prog._id}`).catch(() => null);
                                    loadAllSystemData();
                                    showFeedback('Program deleted.');
                                  }}>
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {internshipPrograms.length === 0 && (
                            <tr><td colSpan="7" style={{ textAlign: 'center', padding: 40, color: '#999' }}>No internship programs yet. Click "Add Program" to create one.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 📝 INTERNSHIP APPLICATIONS */}
              {/* ──────────────────────────────────────────────────────── */}
              {activeSection === 'internship-applications' && (
                <div>
                  {/* Stats Cards */}
                  <div className="admin-stats-grid" style={{ marginBottom: 28 }}>
                    {[
                      { label: 'Total', value: internshipStats?.totalApplications, icon: 'fa-file-alt', bg: '#E3F2FD', color: '#1565C0' },
                      { label: 'Pending', value: internshipStats?.pendingApplications, icon: 'fa-clock', bg: '#FFF8E1', color: '#F9A825' },
                      { label: 'Under Review', value: internshipStats?.underReview, icon: 'fa-eye', bg: '#F3E5F5', color: '#7B1FA2' },
                      { label: 'Shortlisted', value: internshipStats?.shortlisted, icon: 'fa-list', bg: '#E0F7FA', color: '#00838F' },
                      { label: 'Accepted', value: internshipStats?.accepted, icon: 'fa-check-circle', bg: '#E8F5E9', color: '#2E7D32' },
                      { label: 'Rejected', value: internshipStats?.rejected, icon: 'fa-times-circle', bg: '#FFEBEE', color: '#C62828' },
                    ].map((s, i) => (
                      <div className="admin-stat-card" key={i}>
                        <div className="admin-stat-icon-wrap" style={{ background: s.bg, color: s.color }}><i className={`fas ${s.icon}`}></i></div>
                        <div className="admin-stat-details"><h4>{s.label}</h4><div className="value">{s.value || 0}</div></div>
                      </div>
                    ))}
                  </div>

                  {/* Toolbar */}
                  <div className="cms-toolbar">
                    <div className="cms-search-bar">
                      <i className="fas fa-search"></i>
                      <input type="text" placeholder="Search applicant name, email, position..." value={internAppSearch} onChange={(e) => setInternAppSearch(e.target.value)} />
                    </div>
                    <div className="cms-filters">
                      {['All', 'Pending', 'Under Review', 'Shortlisted', 'Accepted', 'Rejected'].map(f => (
                        <button key={f} className={`btn ${internAppFilter === f ? 'btn-primary' : 'btn-outline'}`}
                          style={{ fontSize: '0.82rem', padding: '6px 12px' }}
                          onClick={() => setInternAppFilter(f)}>{f}</button>
                      ))}
                      <button className="btn btn-outline" onClick={() => handleExportCSV(internshipApplications, 'TK_InternshipApplications', ['fullName', 'email', 'phone', 'university', 'positionTitle', 'status', 'createdAt'])}>
                        <i className="fas fa-download"></i> Export
                      </button>
                    </div>
                  </div>

                  {/* Applications Table */}
                  <div className="admin-card" style={{ marginTop: 16 }}>
                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Applicant</th>
                            <th>Position</th>
                            <th>University</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {internshipApplications
                            .filter(a => internAppFilter === 'All' || a.status === internAppFilter)
                            .filter(a => !internAppSearch || a.fullName?.toLowerCase().includes(internAppSearch.toLowerCase()) || a.email?.toLowerCase().includes(internAppSearch.toLowerCase()) || a.positionTitle?.toLowerCase().includes(internAppSearch.toLowerCase()))
                            .map(app => (
                            <tr key={app._id}>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1565C0', fontSize: '0.85rem', flexShrink: 0 }}>
                                    {app.fullName?.charAt(0)?.toUpperCase()}
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 600 }}>{app.fullName}</div>
                                    <div style={{ fontSize: '0.78rem', color: '#999' }}>{app.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td>{app.positionTitle}</td>
                              <td>{app.university}</td>
                              <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                              <td>
                                  <select
                                  value={app.status}
                                  onChange={async (e) => {
                                    await api.patch(`/internship-applications/${app._id}/status`, { status: e.target.value }).catch(() => null);
                                    loadAllSystemData();
                                    showFeedback(`Application status updated to ${e.target.value}`);
                                  }}
                                  style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ddd', fontSize: '0.82rem', fontWeight: 600,
                                    background: { 'Pending': '#FFF8E1', 'Under Review': '#F3E5F5', 'Shortlisted': '#E0F7FA', 'Accepted': '#E8F5E9', 'Rejected': '#FFEBEE' }[app.status] || '#fff',
                                    color: { 'Pending': '#F9A825', 'Under Review': '#7B1FA2', 'Shortlisted': '#00838F', 'Accepted': '#2E7D32', 'Rejected': '#C62828' }[app.status] || '#333'
                                  }}
                                >
                                  {['Pending', 'Under Review', 'Shortlisted', 'Accepted', 'Rejected'].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                              </td>
                              <td>
                                <div style={{ display: 'flex', gap: 6 }}>
                                  <button className="btn-icon" title="View Full Application" onClick={() => setViewingApplication(app)}>
                                    <i className="fas fa-eye"></i>
                                  </button>
                                  <button className="btn-icon" title="Send Email" onClick={() => { setViewingApplication(app); setEmailModalOpen(true); setEmailForm({ type: '', subject: '', body: '' }); }}>
                                    <i className="fas fa-envelope"></i>
                                  </button>
                                  <button className="btn-icon" title="Delete" style={{ color: '#dc3545' }} onClick={async () => {
                                    if (!window.confirm(`Delete application from ${app.fullName}?`)) return;
                                    await api.delete(`/internship-applications/${app._id}`).catch(() => null);
                                    loadAllSystemData();
                                    showFeedback('Application deleted.');
                                  }}>
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {internshipApplications.length === 0 && (
                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: 40, color: '#999' }}>No applications received yet.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* View Application Detail Modal */}
                  {viewingApplication && !emailModalOpen && (
                    <div className="modal-overlay" onClick={() => setViewingApplication(null)}>
                      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 800, maxHeight: '90vh', overflow: 'auto' }}>
                        <div className="modal-header">
                          <h2>Application Details — {viewingApplication.fullName}</h2>
                          <button className="modal-close" onClick={() => setViewingApplication(null)}>&times;</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, padding: '20px 0' }}>
                          {/* Personal */}
                          <div className="admin-card">
                            <h4 style={{ marginBottom: 12, color: '#1565C0' }}><i className="fas fa-user" style={{ marginRight: 8 }}></i>Personal Info</h4>
                            <p><strong>Name:</strong> {viewingApplication.fullName}</p>
                            <p><strong>Email:</strong> {viewingApplication.email}</p>
                            <p><strong>Phone:</strong> {viewingApplication.phone}</p>
                            <p><strong>Gender:</strong> {viewingApplication.gender || '—'}</p>
                            <p><strong>DOB:</strong> {viewingApplication.dateOfBirth ? new Date(viewingApplication.dateOfBirth).toLocaleDateString() : '—'}</p>
                            <p><strong>Nationality:</strong> {viewingApplication.nationality || '—'}</p>
                            <p><strong>Address:</strong> {viewingApplication.currentAddress || viewingApplication.permanentAddress || '—'}</p>
                          </div>

                          {/* Education */}
                          <div className="admin-card">
                            <h4 style={{ marginBottom: 12, color: '#2E7D32' }}><i className="fas fa-graduation-cap" style={{ marginRight: 8 }}></i>Education</h4>
                            <p><strong>University:</strong> {viewingApplication.university}</p>
                            <p><strong>Faculty:</strong> {viewingApplication.faculty || '—'}</p>
                            <p><strong>Degree:</strong> {viewingApplication.degree || '—'}</p>
                            <p><strong>Semester:</strong> {viewingApplication.semester || '—'}</p>
                            <p><strong>GPA:</strong> {viewingApplication.gpa || '—'}</p>
                          </div>

                          {/* Internship */}
                          <div className="admin-card">
                            <h4 style={{ marginBottom: 12, color: '#7B1FA2' }}><i className="fas fa-briefcase" style={{ marginRight: 8 }}></i>Internship Details</h4>
                            <p><strong>Position:</strong> {viewingApplication.positionTitle}</p>
                            <p><strong>Department:</strong> {viewingApplication.department || '—'}</p>
                            <p><strong>Duration:</strong> {viewingApplication.preferredDuration || '—'}</p>
                            <p><strong>Start Date:</strong> {viewingApplication.preferredStartDate ? new Date(viewingApplication.preferredStartDate).toLocaleDateString() : '—'}</p>
                            <p><strong>Availability:</strong> {viewingApplication.availability || '—'}</p>
                            <p><strong>Status:</strong> <span style={{ fontWeight: 700, color: { 'Pending': '#F9A825', 'Under Review': '#7B1FA2', 'Shortlisted': '#00838F', 'Accepted': '#2E7D32', 'Rejected': '#C62828' }[viewingApplication.status] }}>{viewingApplication.status}</span></p>
                          </div>

                          {/* Skills */}
                          <div className="admin-card">
                            <h4 style={{ marginBottom: 12, color: '#E65100' }}><i className="fas fa-tools" style={{ marginRight: 8 }}></i>Skills</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                              {viewingApplication.skills?.length ? viewingApplication.skills.map((s, i) => (
                                <span key={i} style={{ background: '#E3F2FD', color: '#1565C0', padding: '3px 10px', borderRadius: 12, fontSize: '0.8rem', fontWeight: 500 }}>{s}</span>
                              )) : <span style={{ color: '#999' }}>No skills listed</span>}
                            </div>
                          </div>

                          {/* Experience */}
                          <div className="admin-card">
                            <h4 style={{ marginBottom: 12, color: '#00838F' }}><i className="fas fa-history" style={{ marginRight: 8 }}></i>Experience</h4>
                            <p><strong>Prev. Internship:</strong> {viewingApplication.previousInternship || '—'}</p>
                            <p><strong>Work Exp:</strong> {viewingApplication.workExperience || '—'}</p>
                            <p><strong>Projects:</strong> {viewingApplication.projects || '—'}</p>
                            {viewingApplication.github && <p><strong>GitHub:</strong> <a href={viewingApplication.github} target="_blank" rel="noreferrer">{viewingApplication.github}</a></p>}
                            {viewingApplication.linkedin && <p><strong>LinkedIn:</strong> <a href={viewingApplication.linkedin} target="_blank" rel="noreferrer">{viewingApplication.linkedin}</a></p>}
                            {viewingApplication.portfolioWebsite && <p><strong>Portfolio:</strong> <a href={viewingApplication.portfolioWebsite} target="_blank" rel="noreferrer">{viewingApplication.portfolioWebsite}</a></p>}
                          </div>

                          {/* Motivation */}
                          <div className="admin-card">
                            <h4 style={{ marginBottom: 12, color: '#C62828' }}><i className="fas fa-heart" style={{ marginRight: 8 }}></i>Motivation</h4>
                            <p><strong>Why intern here?</strong></p>
                            <p style={{ color: '#555', lineHeight: 1.6 }}>{viewingApplication.motivationWhy || '—'}</p>
                            <p style={{ marginTop: 8 }}><strong>What to learn?</strong></p>
                            <p style={{ color: '#555', lineHeight: 1.6 }}>{viewingApplication.motivationLearn || '—'}</p>
                            <p style={{ marginTop: 8 }}><strong>Why select you?</strong></p>
                            <p style={{ color: '#555', lineHeight: 1.6 }}>{viewingApplication.motivationSelect || '—'}</p>
                          </div>
                        </div>

                        {/* Admin Notes */}
                        <div className="admin-card" style={{ marginTop: 16 }}>
                          <h4 style={{ marginBottom: 12 }}><i className="fas fa-sticky-note" style={{ marginRight: 8, color: '#F9A825' }}></i>Admin Notes</h4>
                          <textarea
                            rows={3}
                            style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 8, fontSize: '0.9rem', resize: 'vertical', boxSizing: 'border-box' }}
                            value={viewingApplication.adminNotes || ''}
                            onChange={(e) => setViewingApplication({ ...viewingApplication, adminNotes: e.target.value })}
                            placeholder="Add internal notes about this applicant..."
                          />
                          <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={async () => {
                            await api.post(`/internship-applications/${viewingApplication._id}/notes`, { notes: viewingApplication.adminNotes }).catch(() => null);
                            showFeedback('Notes saved!');
                          }}>
                            <i className="fas fa-save" style={{ marginRight: 6 }}></i> Save Notes
                          </button>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                          <button className="btn btn-outline" onClick={() => { setEmailModalOpen(true); setEmailForm({ type: '', subject: '', body: '' }); }}>
                            <i className="fas fa-envelope" style={{ marginRight: 6 }}></i> Send Email
                          </button>
                          <button className="btn btn-outline" onClick={() => setViewingApplication(null)}>Close</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Email Modal */}
                  {emailModalOpen && viewingApplication && (
                    <div className="modal-overlay" onClick={() => setEmailModalOpen(false)}>
                      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 600 }}>
                        <div className="modal-header">
                          <h2>Send Email to {viewingApplication.fullName}</h2>
                          <button className="modal-close" onClick={() => setEmailModalOpen(false)}>&times;</button>
                        </div>
                        <div style={{ padding: '20px 0' }}>
                          <div className="form-group">
                            <label>Email Template</label>
                            <select className="cms-select" value={emailForm.type} onChange={(e) => {
                              const type = e.target.value;
                              const templates = {
                                'application_received': { subject: 'Application Received — Dr. Toshima Karki Internship', body: `Dear ${viewingApplication.fullName},\n\nThank you for applying to the ${viewingApplication.positionTitle} internship. Your application has been received and is under review.\n\nWe will contact you regarding next steps.\n\nBest regards,\nOffice of Dr. Toshima Karki` },
                                'shortlisted': { subject: 'Congratulations! You have been Shortlisted', body: `Dear ${viewingApplication.fullName},\n\nWe are pleased to inform you that you have been shortlisted for the ${viewingApplication.positionTitle} internship.\n\nWe will be in touch with interview details.\n\nBest regards,\nOffice of Dr. Toshima Karki` },
                                'interview': { subject: 'Interview Invitation — Internship Program', body: `Dear ${viewingApplication.fullName},\n\nYou are invited for an interview for the ${viewingApplication.positionTitle} position.\n\nPlease confirm your availability.\n\nBest regards,\nOffice of Dr. Toshima Karki` },
                                'offer': { subject: 'Internship Offer — Dr. Toshima Karki Office', body: `Dear ${viewingApplication.fullName},\n\nCongratulations! We are pleased to offer you the ${viewingApplication.positionTitle} internship.\n\nPlease respond to confirm your acceptance.\n\nBest regards,\nOffice of Dr. Toshima Karki` },
                                'rejection': { subject: 'Application Update — Internship Program', body: `Dear ${viewingApplication.fullName},\n\nThank you for your interest in the ${viewingApplication.positionTitle} internship. After careful consideration, we regret to inform you that we are unable to offer you a position at this time.\n\nWe wish you the best in your future endeavors.\n\nBest regards,\nOffice of Dr. Toshima Karki` },
                                'custom': { subject: '', body: '' }
                              };
                              setEmailForm({ type, ...(templates[type] || { subject: '', body: '' }) });
                            }}>
                              <option value="">Select a template...</option>
                              <option value="application_received">Application Received</option>
                              <option value="shortlisted">Shortlisted for Interview</option>
                              <option value="interview">Interview Invitation</option>
                              <option value="offer">Internship Offer</option>
                              <option value="rejection">Rejection Email</option>
                              <option value="custom">Custom Email</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Subject</label>
                            <input type="text" value={emailForm.subject} onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })} />
                          </div>
                          <div className="form-group">
                            <label>Body</label>
                            <textarea rows={8} style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 8, fontSize: '0.9rem', resize: 'vertical', boxSizing: 'border-box' }} value={emailForm.body} onChange={(e) => setEmailForm({ ...emailForm, body: e.target.value })} />
                          </div>
                          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                            <button className="btn btn-outline" onClick={() => setEmailModalOpen(false)}>Cancel</button>
                            <button className="btn btn-primary" disabled={!emailForm.subject || !emailForm.body} onClick={async () => {
                              await api.post(`/internship-applications/${viewingApplication._id}/email`, emailForm).catch(() => null);
                              showFeedback('Email logged successfully!');
                              setEmailModalOpen(false);
                            }}>
                              <i className="fas fa-paper-plane" style={{ marginRight: 6 }}></i> Send Email
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* ⚙️ SETTINGS & SECURITY */}
              {/* ──────────────────────────────────────────────────────── */}
              {activeSection === 'settings' && settingsData && (
                <div>
                  <form onSubmit={handleSaveSiteSettings}>
                    <div className="admin-card">
                      <h3 style={{ marginBottom: '16px' }}>Site Identity & General Settings</h3>
                      <div className="bilingual-grid">
                        <div className="form-group">
                          <label>Website Title (English)</label>
                          <input type="text" value={settingsData.siteNameEn || ''} onChange={(e) => setSettingsData({ ...settingsData, siteNameEn: e.target.value })} />
                        </div>
                        <div className="form-group">
                          <label>Website Title (Nepali)</label>
                          <input type="text" value={settingsData.siteNameNp || ''} onChange={(e) => setSettingsData({ ...settingsData, siteNameNp: e.target.value })} />
                        </div>
                      </div>

                      <div className="bilingual-grid">
                        <div className="form-group">
                          <label>Address (English)</label>
                          <input type="text" value={settingsData.contactAddressEn || ''} onChange={(e) => setSettingsData({ ...settingsData, contactAddressEn: e.target.value })} />
                        </div>
                        <div className="form-group">
                          <label>Address (Nepali)</label>
                          <input type="text" value={settingsData.contactAddressNp || ''} onChange={(e) => setSettingsData({ ...settingsData, contactAddressNp: e.target.value })} />
                        </div>
                      </div>

                      <div className="bilingual-grid">
                        <div className="form-group">
                          <label>Primary Office Phone</label>
                          <input type="text" value={settingsData.contactPhone || ''} onChange={(e) => setSettingsData({ ...settingsData, contactPhone: e.target.value })} />
                        </div>
                        <div className="form-group">
                          <label>Alternate Office Phone</label>
                          <input type="text" value={settingsData.contactPhoneAlt || ''} onChange={(e) => setSettingsData({ ...settingsData, contactPhoneAlt: e.target.value })} />
                        </div>
                      </div>

                      <div className="bilingual-grid">
                        <div className="form-group">
                          <label>Contact Email</label>
                          <input type="email" value={settingsData.contactEmail || ''} onChange={(e) => setSettingsData({ ...settingsData, contactEmail: e.target.value })} />
                        </div>
                        <div className="form-group">
                          <label>Internship Recruiting Open Status</label>
                          <select className="cms-select" value={settingsData.internshipOpen ? 'open' : 'closed'} onChange={(e) => setSettingsData({ ...settingsData, internshipOpen: e.target.value === 'open' })}>
                            <option value="open">Recruitment Open</option>
                            <option value="closed">Closed / Suspended</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="admin-card">
                      <h3 style={{ marginBottom: '16px' }}>Social Media & Google Map Link</h3>
                      <div className="bilingual-grid">
                        <div className="form-group">
                          <label>Facebook URL</label>
                          <input type="text" value={settingsData.socials?.facebook || ''} onChange={(e) => setSettingsData({ ...settingsData, socials: { ...settingsData.socials, facebook: e.target.value } })} />
                        </div>
                        <div className="form-group">
                          <label>Twitter / X URL</label>
                          <input type="text" value={settingsData.socials?.twitter || ''} onChange={(e) => setSettingsData({ ...settingsData, socials: { ...settingsData.socials, twitter: e.target.value } })} />
                        </div>
                      </div>
                      <div className="bilingual-grid">
                        <div className="form-group">
                          <label>YouTube URL</label>
                          <input type="text" value={settingsData.socials?.youtube || ''} onChange={(e) => setSettingsData({ ...settingsData, socials: { ...settingsData.socials, youtube: e.target.value } })} />
                        </div>
                        <div className="form-group">
                          <label>TikTok URL</label>
                          <input type="text" value={settingsData.socials?.tiktok || ''} onChange={(e) => setSettingsData({ ...settingsData, socials: { ...settingsData.socials, tiktok: e.target.value } })} />
                        </div>
                      </div>
                    </div>

                    <div className="admin-card">
                      <h3 style={{ marginBottom: '16px' }}>Bilingual SEO Settings</h3>
                      <div className="bilingual-grid">
                        <div className="form-group">
                          <label>Meta Title Keyword (English)</label>
                          <input type="text" value={settingsData.seo?.metaTitleEn || ''} onChange={(e) => setSettingsData({ ...settingsData, seo: { ...settingsData.seo, metaTitleEn: e.target.value } })} />
                        </div>
                        <div className="form-group">
                          <label>Meta Title Keyword (Nepali)</label>
                          <input type="text" value={settingsData.seo?.metaTitleNp || ''} onChange={(e) => setSettingsData({ ...settingsData, seo: { ...settingsData.seo, metaTitleNp: e.target.value } })} />
                        </div>
                      </div>
                      <div className="bilingual-grid">
                        <div className="form-group">
                          <label>Meta Description (English)</label>
                          <textarea rows="2" value={settingsData.seo?.metaDescriptionEn || ''} onChange={(e) => setSettingsData({ ...settingsData, seo: { ...settingsData.seo, metaDescriptionEn: e.target.value } })} />
                        </div>
                        <div className="form-group">
                          <label>Meta Description (Nepali)</label>
                          <textarea rows="2" value={settingsData.seo?.metaDescriptionNp || ''} onChange={(e) => setSettingsData({ ...settingsData, seo: { ...settingsData.seo, metaDescriptionNp: e.target.value } })} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Keywords (comma separated)</label>
                        <input type="text" value={settingsData.seo?.keywords || ''} onChange={(e) => setSettingsData({ ...settingsData, seo: { ...settingsData.seo, keywords: e.target.value } })} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                      <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px' }}>
                        <i className="fas fa-save"></i> Save Site Identity Settings
                      </button>
                    </div>
                  </form>

                  {/* Security panel: separate form */}
                  <form onSubmit={handleSaveSecurity}>
                    <div className="admin-card">
                      <h3 style={{ marginBottom: '16px' }}>Security & Administrator Credentials</h3>
                      <div className="form-group">
                        <label>Admin Login Email</label>
                        <input 
                          type="email" 
                          value={securityForm.email} 
                          onChange={(e) => setSecurityForm({ ...securityForm, email: e.target.value })} 
                          required
                        />
                      </div>
                      <div className="bilingual-grid">
                        <div className="form-group">
                          <label>New Password (leave empty to keep current)</label>
                          <input 
                            type="password" 
                            placeholder="••••••"
                            value={securityForm.password}
                            onChange={(e) => setSecurityForm({ ...securityForm, password: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Confirm Password</label>
                          <input 
                            type="password" 
                            placeholder="••••••"
                            value={securityForm.confirmPassword}
                            onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                          />
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn btn-secondary" style={{ padding: '10px 24px' }}>
                          <i className="fas fa-key"></i> Update Credentials
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 👥 ADMIN ACCOUNTS */}
              {/* ──────────────────────────────────────────────────────── */}
              {activeSection === 'users' && (
                <div>
                  <div className="cms-toolbar">
                    <h3 style={{ fontSize: '1rem' }}>Active Workspace Administrators</h3>
                    <button className="btn btn-primary" onClick={() => openCreateModal('user')}>
                      <i className="fas fa-user-plus"></i> Add Account
                    </button>
                  </div>

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email Address</th>
                          <th>Role Scope</th>
                          <th>Created At</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersList.map(usr => (
                          <tr key={usr._id}>
                            <td style={{ fontWeight: 600 }}>{usr.name}</td>
                            <td>{usr.email}</td>
                            <td><span className="badge-tag blog">{usr.role}</span></td>
                            <td>{new Date(usr.createdAt).toLocaleDateString()}</td>
                            <td>
                              <div className="action-btn-group">
                                <button className="icon-btn edit" onClick={() => openEditModal('user', usr)}><i className="fas fa-edit"></i></button>
                                <button className="icon-btn delete" onClick={() => handleDeleteItem('user', usr._id)}><i className="fas fa-trash"></i></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* ──────────────────────────────────────────────────────── */}
      {/* ── MODALS (CRUD EDITORS) ── */}
      {/* ──────────────────────────────────────────────────────── */}
      {isModalOpen && currentEditItem && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: modalType === 'blog' ? '800px' : '650px' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px' }}>
              {currentEditItem._id ? 'Edit' : 'Create New'} {modalType.toUpperCase()}
            </h3>

            <form onSubmit={handleSaveCRUD}>
              {/* 1. NEWS FORM */}
              {modalType === 'news' && (
                <div>
                  <div className="bilingual-grid">
                    <div className="form-group">
                      <label>News Title (English)</label>
                      <input 
                        type="text" 
                        value={currentEditItem.titleEn || ''} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, titleEn: e.target.value })} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>News Title (Nepali)</label>
                      <input 
                        type="text" 
                        value={currentEditItem.titleNp || ''} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, titleNp: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="bilingual-grid">
                    <div className="form-group">
                      <label>Category</label>
                      <select 
                        className="cms-select" 
                        value={currentEditItem.category || 'General'} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, category: e.target.value })}
                      >
                        <option value="General">General</option>
                        <option value="Health">Health</option>
                        <option value="Parliament">Parliament</option>
                        <option value="Politics">Politics</option>
                        <option value="Public Service">Public Service</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>News Publisher / Source (English)</label>
                      <input 
                        type="text" 
                        value={currentEditItem.publisherEn || ''} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, publisherEn: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="bilingual-grid">
                    <div className="form-group">
                      <label>Brief Content / Description (English)</label>
                      <textarea 
                        rows="3" 
                        value={currentEditItem.contentEn || ''} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, contentEn: e.target.value })} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Brief Content / Description (Nepali)</label>
                      <textarea 
                        rows="3" 
                        value={currentEditItem.contentNp || ''} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, contentNp: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="bilingual-grid">
                    <div className="form-group">
                      <label>News Source Link (URL)</label>
                      <input 
                        type="text" 
                        placeholder="https://"
                        value={currentEditItem.link || ''} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, link: e.target.value })} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Published Date</label>
                      <input 
                        type="date" 
                        value={currentEditItem.publishedDate ? new Date(currentEditItem.publishedDate).toISOString().split('T')[0] : ''} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, publishedDate: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="bilingual-grid">
                    <div className="form-group">
                      <label>Thumbnail Image</label>
                      <div className="image-upload-zone">
                        <input 
                          type="file" 
                          accept="image/*" 
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}
                          onChange={(e) => handleFileUpload(e, (url) => setCurrentEditItem({ ...currentEditItem, image: url }))}
                        />
                        <p><i className="fas fa-cloud-upload-alt"></i> Choose new image</p>
                        {currentEditItem.image && <img src={currentEditItem.image} className="image-upload-preview" alt="" />}
                      </div>
                    </div>

                    <div className="form-group" style={{ justifyContent: 'center' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          checked={currentEditItem.isFeatured || false} 
                          onChange={(e) => setCurrentEditItem({ ...currentEditItem, isFeatured: e.target.checked })} 
                        />
                        Feature Article on Homepage
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. BLOG FORM WITH MARKDOWN TABS */}
              {modalType === 'blog' && (
                <div>
                  <div className="bilingual-grid">
                    <div className="form-group">
                      <label>Blog Title (English)</label>
                      <input 
                        type="text" 
                        value={currentEditItem.titleEn || ''} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, titleEn: e.target.value })} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Blog Title (Nepali)</label>
                      <input 
                        type="text" 
                        value={currentEditItem.titleNp || ''} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, titleNp: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="editor-tabs">
                    <button 
                      type="button" 
                      onClick={() => setPreviewTab('edit')} 
                      className={`editor-tab-btn ${previewTab === 'edit' ? 'active' : ''}`}
                    >
                      Write English Content
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setPreviewTab('nepali')} 
                      className={`editor-tab-btn ${previewTab === 'nepali' ? 'active' : ''}`}
                    >
                      Write Nepali Content
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setPreviewTab('preview')} 
                      className={`editor-tab-btn ${previewTab === 'preview' ? 'active' : ''}`}
                    >
                      Live Content Preview
                    </button>
                  </div>

                  {previewTab === 'edit' && (
                    <div className="form-group">
                      <label>Content (supports Markdown)</label>
                      <textarea 
                        rows="8" 
                        value={currentEditItem.contentEn || ''} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, contentEn: e.target.value })} 
                        required 
                      />
                    </div>
                  )}

                  {previewTab === 'nepali' && (
                    <div className="form-group">
                      <label>Content (supports Markdown)</label>
                      <textarea 
                        rows="8" 
                        value={currentEditItem.contentNp || ''} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, contentNp: e.target.value })} 
                      />
                    </div>
                  )}

                  {previewTab === 'preview' && (
                    <div className="markdown-preview-pane">
                      <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>English Content View:</h4>
                      <div style={{ whiteSpace: 'pre-wrap', marginBottom: '20px' }}>
                        {currentEditItem.contentEn || '*No content written yet*'}
                      </div>
                      <hr style={{ margin: '20px 0', borderColor: 'var(--border-color)' }} />
                      <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Nepali Content View:</h4>
                      <div style={{ whiteSpace: 'pre-wrap' }}>
                        {currentEditItem.contentNp || '*No content written yet*'}
                      </div>
                    </div>
                  )}

                  <div className="bilingual-grid" style={{ marginTop: '15px' }}>
                    <div className="form-group">
                      <label>Blog Category</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Healthcare, Parliament, Reforms"
                        value={currentEditItem.category || ''} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, category: e.target.value })} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Read Time</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 5 min read"
                        value={currentEditItem.readTime || ''} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, readTime: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="bilingual-grid">
                    <div className="form-group">
                      <label>Featured Image</label>
                      <div className="image-upload-zone">
                        <input 
                          type="file" 
                          accept="image/*" 
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}
                          onChange={(e) => handleFileUpload(e, (url) => setCurrentEditItem({ ...currentEditItem, image: url }))}
                        />
                        <p><i className="fas fa-cloud-upload-alt"></i> Choose new image</p>
                        {currentEditItem.image && <img src={currentEditItem.image} className="image-upload-preview" alt="" />}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Author name</label>
                      <input type="text" value={currentEditItem.authorEn || 'Dr. Toshima Karki'} onChange={(e) => setCurrentEditItem({ ...currentEditItem, authorEn: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}

              {/* 3. MEDIA FORM */}
              {modalType === 'media' && (
                <div>
                  <div className="bilingual-grid">
                    <div className="form-group">
                      <label>Title (English)</label>
                      <input 
                        type="text" 
                        value={currentEditItem.titleEn || ''} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, titleEn: e.target.value })} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Title (Nepali)</label>
                      <input 
                        type="text" 
                        value={currentEditItem.titleNp || ''} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, titleNp: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="bilingual-grid">
                    <div className="form-group">
                      <label>Media Category / Type</label>
                      <select 
                        className="cms-select" 
                        value={currentEditItem.type || 'Interviews'} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, type: e.target.value })}
                      >
                        <option value="Interviews">Interviews</option>
                        <option value="TV Shows">TV Shows</option>
                        <option value="Podcasts">Podcasts</option>
                        <option value="Press Conference">Press Conference</option>
                        <option value="Speeches">Speeches</option>
                        <option value="Public Talks">Public Talks</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Source / Channel (English)</label>
                      <input type="text" value={currentEditItem.sourceEn || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, sourceEn: e.target.value })} />
                    </div>
                  </div>

                  <div className="bilingual-grid">
                    <div className="form-group">
                      <label>External Video Link (YouTube/Facebook URL)</label>
                      <input 
                        type="text" 
                        placeholder="https://youtube.com/..."
                        value={currentEditItem.link || ''} 
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, link: e.target.value })} 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Duration</label>
                      <input type="text" placeholder="e.g. 15:42" value={currentEditItem.duration || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, duration: e.target.value })} />
                    </div>
                  </div>

                  <div className="bilingual-grid">
                    <div className="form-group">
                      <label>Thumbnail Image</label>
                      <div className="image-upload-zone">
                        <input 
                          type="file" 
                          accept="image/*" 
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}
                          onChange={(e) => handleFileUpload(e, (url) => setCurrentEditItem({ ...currentEditItem, thumbnail: url }))}
                        />
                        <p><i className="fas fa-cloud-upload-alt"></i> Choose new image</p>
                        {currentEditItem.thumbnail && <img src={currentEditItem.thumbnail} className="image-upload-preview" alt="" />}
                      </div>
                    </div>
                    <div className="form-group" style={{ justifyContent: 'center' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          checked={currentEditItem.isFeatured || false} 
                          onChange={(e) => setCurrentEditItem({ ...currentEditItem, isFeatured: e.target.checked })} 
                        />
                        Feature on Homepage
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. GALLERY UPLOAD FORM */}
              {modalType === 'gallery' && (
                <div>
                  <div className="bilingual-grid">
                    <div className="form-group">
                      <label>Caption / Title (English)</label>
                      <input
                        type="text"
                        value={currentEditItem.titleEn || ''}
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, titleEn: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Caption / Title (Nepali)</label>
                      <input
                        type="text"
                        value={currentEditItem.titleNp || ''}
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, titleNp: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="bilingual-grid">
                    <div className="form-group">
                      <label>Album Category</label>
                      <select
                        className="cms-select"
                        value={currentEditItem.category || 'Ministry'}
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, category: e.target.value })}
                      >
                        <option value="Ministry">Ministry</option>
                        <option value="Parliament">Parliament</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Public Meetings">Public Meetings</option>
                        <option value="Community Visits">Community Visits</option>
                        <option value="International Visits">International Visits</option>
                        <option value="Media Events">Media Events</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Image Upload</label>
                      <div className="image-upload-zone">
                        <input
                          type="file"
                          accept="image/*"
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}
                          onChange={(e) => handleFileUpload(e, (url) => setCurrentEditItem({ ...currentEditItem, mediaUrl: url }))}
                        />
                        <p><i className="fas fa-cloud-upload-alt"></i> Choose new image</p>
                        {currentEditItem.mediaUrl && <img src={currentEditItem.mediaUrl} className="image-upload-preview" alt="" />}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. ENGAGEMENT FORM */}
              {modalType === 'engagement' && (
                <div>
                  <div className="form-group">
                    <label>Engagement Title</label>
                    <input
                      type="text"
                      value={currentEditItem.title || ''}
                      onChange={(e) => setCurrentEditItem({ ...currentEditItem, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="bilingual-grid">
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        value={currentEditItem.date ? new Date(currentEditItem.date).toISOString().split('T')[0] : ''}
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        className="cms-select"
                        value={currentEditItem.status || 'upcoming'}
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, status: e.target.value })}
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="bilingual-grid">
                    <div className="form-group">
                      <label>Start Time</label>
                      <input
                        type="time"
                        value={currentEditItem.startTime || ''}
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, startTime: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>End Time</label>
                      <input
                        type="time"
                        value={currentEditItem.endTime || ''}
                        onChange={(e) => setCurrentEditItem({ ...currentEditItem, endTime: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={currentEditItem.location || ''}
                      onChange={(e) => setCurrentEditItem({ ...currentEditItem, location: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      rows="4"
                      value={currentEditItem.description || ''}
                      onChange={(e) => setCurrentEditItem({ ...currentEditItem, description: e.target.value })}
                    />
                  </div>

                  <div className="bilingual-grid">
                    <div className="form-group">
                      <label>Event Image</label>
                      <div className="image-upload-zone">
                        <input
                          type="file"
                          accept="image/*"
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}
                          onChange={(e) => handleFileUpload(e, (url) => setCurrentEditItem({ ...currentEditItem, image: url }))}
                        />
                        <p><i className="fas fa-cloud-upload-alt"></i> {isUploading ? 'Uploading...' : 'Choose event image'}</p>
                        {currentEditItem.image && <img src={currentEditItem.image} className="image-upload-preview" alt="" />}
                      </div>
                    </div>
                    <div className="form-group" style={{ justifyContent: 'center' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={currentEditItem.isPublished || false}
                          onChange={(e) => setCurrentEditItem({ ...currentEditItem, isPublished: e.target.checked })}
                        />
                        Publish on Contact Page
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. USER ACCOUNT FORM */}
              {modalType === 'internship-program' && (
                <div>
                  <div className="admin-card" style={{ marginBottom: 16 }}>
                    <h3 style={{ marginBottom: 16 }}>Basic Information</h3>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Internship Title (English) *</label>
                        <input type="text" value={currentEditItem.titleEn || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, titleEn: e.target.value })} required />
                      </div>
                      <div className="form-group">
                        <label>Internship Title (Nepali)</label>
                        <input type="text" value={currentEditItem.titleNp || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, titleNp: e.target.value })} />
                      </div>
                    </div>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Department *</label>
                        <input type="text" value={currentEditItem.department || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, department: e.target.value })} required />
                      </div>
                      <div className="form-group">
                        <label>Location</label>
                        <input type="text" value={currentEditItem.location || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, location: e.target.value })} />
                      </div>
                    </div>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Internship Type</label>
                        <select value={currentEditItem.internshipType || 'Full-Time'} onChange={(e) => setCurrentEditItem({ ...currentEditItem, internshipType: e.target.value })}>
                          <option value="Full-Time">Full-Time</option>
                          <option value="Part-Time">Part-Time</option>
                          <option value="Both">Both</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Number of Vacancies</label>
                        <input type="number" min="1" value={currentEditItem.vacancies || 1} onChange={(e) => setCurrentEditItem({ ...currentEditItem, vacancies: parseInt(e.target.value) })} />
                      </div>
                    </div>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Duration</label>
                        <select value={currentEditItem.duration || '3 Months'} onChange={(e) => setCurrentEditItem({ ...currentEditItem, duration: e.target.value })}>
                          <option value="1 Month">1 Month</option>
                          <option value="2 Months">2 Months</option>
                          <option value="3 Months">3 Months</option>
                          <option value="6 Months">6 Months</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Application Deadline</label>
                        <input type="date" value={currentEditItem.applicationDeadline || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, applicationDeadline: e.target.value })} />
                      </div>
                    </div>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Start Date</label>
                        <input type="date" value={currentEditItem.startDate || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, startDate: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>End Date</label>
                        <input type="date" value={currentEditItem.endDate || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, endDate: e.target.value })} />
                      </div>
                    </div>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Status</label>
                        <select value={currentEditItem.status || 'Open'} onChange={(e) => setCurrentEditItem({ ...currentEditItem, status: e.target.value })}>
                          <option value="Open">Open</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24 }}>
                        <input type="checkbox" id="isFeaturedInternship" checked={currentEditItem.isFeatured || false} onChange={(e) => setCurrentEditItem({ ...currentEditItem, isFeatured: e.target.checked })} style={{ width: 18, height: 18, accentColor: '#2d4a8a' }} />
                        <label htmlFor="isFeaturedInternship" style={{ fontWeight: 600, cursor: 'pointer' }}>Featured Internship</label>
                      </div>
                    </div>
                  </div>

                  <div className="admin-card" style={{ marginBottom: 16 }}>
                    <h3 style={{ marginBottom: 16 }}>Description (Bilingual)</h3>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Overview (English)</label>
                        <textarea rows={4} value={currentEditItem.overviewEn || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, overviewEn: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Overview (Nepali)</label>
                        <textarea rows={4} value={currentEditItem.overviewNp || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, overviewNp: e.target.value })} />
                      </div>
                    </div>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Responsibilities (English)</label>
                        <textarea rows={4} value={currentEditItem.responsibilitiesEn || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, responsibilitiesEn: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Responsibilities (Nepali)</label>
                        <textarea rows={4} value={currentEditItem.responsibilitiesNp || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, responsibilitiesNp: e.target.value })} />
                      </div>
                    </div>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Benefits (English)</label>
                        <textarea rows={4} value={currentEditItem.benefitsEn || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, benefitsEn: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Benefits (Nepali)</label>
                        <textarea rows={4} value={currentEditItem.benefitsNp || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, benefitsNp: e.target.value })} />
                      </div>
                    </div>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Eligibility (English)</label>
                        <textarea rows={4} value={currentEditItem.eligibilityEn || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, eligibilityEn: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Eligibility (Nepali)</label>
                        <textarea rows={4} value={currentEditItem.eligibilityNp || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, eligibilityNp: e.target.value })} />
                      </div>
                    </div>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Required Skills (English)</label>
                        <textarea rows={3} value={currentEditItem.requiredSkillsEn || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, requiredSkillsEn: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Required Skills (Nepali)</label>
                        <textarea rows={3} value={currentEditItem.requiredSkillsNp || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, requiredSkillsNp: e.target.value })} />
                      </div>
                    </div>
                  </div>

                  <div className="admin-card">
                    <h3 style={{ marginBottom: 16 }}>SEO Settings</h3>
                    <div className="bilingual-grid">
                      <div className="form-group">
                        <label>Meta Title</label>
                        <input type="text" value={currentEditItem.metaTitle || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, metaTitle: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Meta Description</label>
                        <input type="text" value={currentEditItem.metaDescription || ''} onChange={(e) => setCurrentEditItem({ ...currentEditItem, metaDescription: e.target.value })} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {modalType === 'user' && (
                <div>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      value={currentEditItem.name || ''} 
                      onChange={(e) => setCurrentEditItem({ ...currentEditItem, name: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={currentEditItem.email || ''} 
                      onChange={(e) => setCurrentEditItem({ ...currentEditItem, email: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Account Role</label>
                    <select 
                      className="cms-select" 
                      value={currentEditItem.role || 'editor'} 
                      onChange={(e) => setCurrentEditItem({ ...currentEditItem, role: e.target.value })}
                    >
                      <option value="editor">Editor (Content Writer)</option>
                      <option value="admin">Administrator (Full Access)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Login Password {currentEditItem._id && '(Leave blank to keep current)'}</label>
                    <input 
                      type="password" 
                      placeholder="••••••"
                      value={currentEditItem.password || ''} 
                      onChange={(e) => setCurrentEditItem({ ...currentEditItem, password: e.target.value })} 
                      required={!currentEditItem._id}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isUploading}>
                  {isUploading ? 'Uploading...' : 'Save details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
