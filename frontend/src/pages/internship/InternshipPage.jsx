import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const API = 'http://localhost:5050/api';

const SKILLS_LIST = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB',
  'MySQL', 'Tailwind', 'Figma', 'Photoshop', 'Canva', 'Microsoft Office',
  'Research', 'Communication', 'Public Speaking', 'Graphic Design',
  'Video Editing', 'Other'
];

const FAQ_DATA = [
  {
    q: 'Who can apply?',
    a: 'Any student currently enrolled in a recognized college or university in Nepal (or abroad) can apply. Fresh graduates may also apply.'
  },
  {
    q: 'How long is the internship?',
    a: 'Internships range from 1 to 6 months depending on the position. You can indicate your preferred duration in the application.'
  },
  {
    q: 'Is the internship paid?',
    a: 'The internship is currently unpaid, but interns receive a Certificate of Completion and may receive a Recommendation Letter upon successful completion.'
  },
  {
    q: 'What is the selection process?',
    a: 'Applications are reviewed, shortlisted candidates are called for an interview, and final selections are made based on skills, motivation, and fit.'
  },
  {
    q: 'Will I receive a certificate?',
    a: 'Yes. All interns who successfully complete their internship will receive an official Certificate of Completion from the office of Dr. Toshima Karki.'
  },
  {
    q: 'Where is the office located?',
    a: 'Singha Durbar, Kathmandu, Nepal. Remote internships may be available for certain roles.'
  }
];

const INITIAL_FORM = {
  fullName: '', email: '', phone: '',
  university: '', degree: '', semester: '',
  positionId: '', positionTitle: '', preferredDuration: '',
  resumeUrl: '', motivationWhy: '', declaration: true
};

export default function InternshipPage() {
  const { t } = useLanguage();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  
  // New Layout States
  const [activeTab, setActiveTab] = useState('apply');
  const [draftSaved, setDraftSaved] = useState(false);

  useEffect(() => {
    // Load Draft from LocalStorage
    const savedDraft = localStorage.getItem('internship_draft');
    if (savedDraft) {
      try { setForm(JSON.parse(savedDraft)); } catch (e) { console.error('Failed to parse draft'); }
    }

    fetch(`${API}/internships?status=Open`)
      .then(r => r.json())
      .then(d => { if (d.success) setPrograms(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleApplyClick = (prog) => {
    setForm(prev => ({
      ...prev,
      positionId: prog._id,
      positionTitle: prog.titleEn,
      department: prog.department
    }));
    setActiveTab('apply');
  };

  const handleSkillToggle = (skill) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const saveDraft = () => {
    localStorage.setItem('internship_draft', JSON.stringify(form));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const resetForm = () => {
    if(window.confirm('Are you sure you want to reset all form fields?')) {
      setForm(INITIAL_FORM);
      localStorage.removeItem('internship_draft');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Create a copy of the form data to send
    const payload = { ...form };
    
    // Remove empty positionId to prevent Mongoose CastError
    if (payload.positionId === '') {
      delete payload.positionId;
    }

    try {
      const res = await fetch(`${API}/internship-applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setForm(INITIAL_FORM);
        localStorage.removeItem('internship_draft');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(data.error || 'Submission failed. Please try again.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const themeColor = '#D81B60';

  return (
    <div className="internship-layout" style={{ background: '#f5f7fa', minHeight: '100vh', padding: '40px 20px', fontFamily: 'var(--font-body)' }}>
      <style>{`
        .internship-grid {
          display: grid;
          grid-template-columns: 260px 1fr 300px;
          gap: 24px;
          max-width: 1300px;
          margin: 0 auto;
        }
        .internship-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .internship-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          border: 1px solid #eaeaea;
          overflow: hidden;
        }
        .sidebar-nav {
          list-style: none;
          padding: 10px 0;
          margin: 0;
        }
        .sidebar-nav li {
          margin: 4px 12px;
        }
        .sidebar-nav button {
          width: 100%;
          text-align: left;
          padding: 12px 16px;
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 500;
          color: #444;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.2s;
        }
        .sidebar-nav button:hover {
          background: #f8f9fa;
        }
        .sidebar-nav button.active {
          background: #fce4ec;
          color: ${themeColor};
          font-weight: 700;
        }
        .form-section-title {
          font-family: var(--font-heading);
          color: ${themeColor};
          font-size: 1.05rem;
          font-weight: 700;
          margin: 32px 0 20px;
          text-transform: uppercase;
        }
        .form-field {
          margin-bottom: 20px;
        }
        .form-field label {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 8px;
        }
        .form-field input[type="text"],
        .form-field input[type="email"],
        .form-field input[type="date"],
        .form-field input[type="number"],
        .form-field select,
        .form-field textarea {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 0.95rem;
          color: #333;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .form-field input:focus,
        .form-field select:focus,
        .form-field textarea:focus {
          border-color: ${themeColor};
        }
        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .info-list-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }
        .info-list-item i {
          color: ${themeColor};
          margin-top: 4px;
        }
        .btn-outline-pink {
          border: 1px solid ${themeColor};
          color: ${themeColor};
          background: transparent;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-outline-pink:hover {
          background: #fce4ec;
        }
        .btn-solid-pink {
          border: none;
          background: ${themeColor};
          color: #fff;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-solid-pink:hover {
          background: #ad1457;
        }
        .upload-box {
          border: 2px dashed #ddd;
          border-radius: 8px;
          padding: 24px;
          text-align: center;
          color: #777;
          cursor: pointer;
          transition: all 0.2s;
        }
        .upload-box:hover {
          border-color: ${themeColor};
          background: #fce4ec;
        }
        @media (max-width: 1024px) {
          .internship-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="internship-grid">
        
        {/* LEFT SIDEBAR */}
        <div className="internship-sidebar">
          <div className="internship-card">
            <div style={{ background: themeColor, color: '#fff', padding: '20px', fontWeight: 800, fontSize: '1.2rem', textAlign: 'center', letterSpacing: 1 }}>
              INTERNSHIP
            </div>
            <ul className="sidebar-nav">
              <li>
                <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
                  <i className="far fa-file-alt"></i> Internship Overview
                </button>
              </li>
              <li>
                <button className={activeTab === 'areas' ? 'active' : ''} onClick={() => setActiveTab('areas')}>
                  <i className="fas fa-users-cog"></i> Internship Areas
                </button>
              </li>
              <li>
                <button className={activeTab === 'eligibility' ? 'active' : ''} onClick={() => setActiveTab('eligibility')}>
                  <i className="far fa-check-circle"></i> Eligibility
                </button>
              </li>
              <li>
                <button className={activeTab === 'apply' ? 'active' : ''} onClick={() => setActiveTab('apply')}>
                  <i className="far fa-edit"></i> Application Form
                </button>
              </li>
              <li>
                <button className={activeTab === 'faqs' ? 'active' : ''} onClick={() => setActiveTab('faqs')}>
                  <i className="far fa-question-circle"></i> FAQs
                </button>
              </li>
            </ul>
          </div>

          <div className="internship-card" style={{ padding: '24px', background: '#fff9fa', border: `1px solid #fce4ec` }}>
            <h4 style={{ color: themeColor, marginBottom: 12, fontWeight: 700 }}>Need Help?</h4>
            <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: 16, lineHeight: 1.5 }}>
              If you have any questions regarding the internship program, feel free to contact us.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.85rem', fontWeight: 500 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <i className="far fa-envelope" style={{ color: themeColor }}></i> internship@toshimakarki.gov.np
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <i className="fas fa-phone-alt" style={{ color: themeColor }}></i> +977 1-4200000
              </div>
            </div>
          </div>
        </div>

        {/* CENTER CONTENT */}
        <div className="internship-card" style={{ padding: '32px' }}>
          
          {activeTab === 'overview' && (
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 16, color: '#333' }}>INTERNSHIP OVERVIEW</h2>
              <p style={{ lineHeight: 1.7, color: '#555', marginBottom: 20 }}>
                Shape Your Future with Dr. Toshima Karki. Gain real-world experience in government, healthcare, policy, and technology. Build your career while contributing to meaningful change in Nepal.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 32 }}>
                 <div style={{ padding: 20, background: '#f9f9f9', borderRadius: 8 }}>
                   <h4 style={{ color: themeColor, marginBottom: 8 }}><i className="fas fa-project-diagram"></i> Real Projects</h4>
                   <p style={{ fontSize: '0.9rem', color: '#666' }}>Work on live government and public interest projects that create real impact.</p>
                 </div>
                 <div style={{ padding: 20, background: '#f9f9f9', borderRadius: 8 }}>
                   <h4 style={{ color: themeColor, marginBottom: 8 }}><i className="fas fa-user-tie"></i> Expert Mentorship</h4>
                   <p style={{ fontSize: '0.9rem', color: '#666' }}>Learn directly from Dr. Toshima Karki and her experienced team of professionals.</p>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'areas' && (
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 16, color: '#333' }}>INTERNSHIP AREAS</h2>
              {loading ? <p>Loading positions...</p> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {programs.map(prog => (
                    <div key={prog._id} style={{ border: '1px solid #eee', padding: 20, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: 4 }}>{prog.titleEn}</h4>
                        <span style={{ fontSize: '0.85rem', color: '#666' }}>{prog.department} • {prog.duration}</span>
                      </div>
                      <button onClick={() => handleApplyClick(prog)} className="btn-solid-pink" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                        Apply Now
                      </button>
                    </div>
                  ))}
                  {programs.length === 0 && <p style={{ color: '#777' }}>No open positions currently available.</p>}
                </div>
              )}
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 16, color: '#333' }}>ELIGIBILITY CRITERIA</h2>
              <ul style={{ lineHeight: 1.8, color: '#555', paddingLeft: 20 }}>
                <li>Currently enrolled in a recognized university/college</li>
                <li>Any faculty: IT, Management, Law, Social Science, Journalism, etc.</li>
                <li>Strong written and verbal communication skills</li>
                <li>Self-motivated and eager to learn</li>
                <li>Prior experience is optional but preferred</li>
              </ul>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 16, color: '#333' }}>FREQUENTLY ASKED QUESTIONS</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {FAQ_DATA.map((faq, i) => (
                  <div key={i} style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden' }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: 16, textAlign: 'left', background: '#f9f9f9', border: 'none', fontWeight: 600, display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                      {faq.q} <i className={`fas fa-chevron-${openFaq === i ? 'up' : 'down'}`}></i>
                    </button>
                    {openFaq === i && <div style={{ padding: 16, fontSize: '0.9rem', color: '#555', background: '#fff' }}>{faq.a}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'apply' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#333', margin: 0, textTransform: 'uppercase' }}>INTERNSHIP APPLICATION FORM</h2>
                <span style={{ fontSize: '0.85rem', color: '#d32f2f', fontWeight: 600 }}>* Required Fields</span>
              </div>
              
              {submitted && (
                <div style={{ background: '#d4edda', color: '#155724', padding: '16px', borderRadius: 8, marginBottom: 24, fontWeight: 600 }}>
                  <i className="fas fa-check-circle" style={{ marginRight: 8 }}></i> Application submitted successfully!
                </div>
              )}

              {draftSaved && (
                <div style={{ background: '#e3f2fd', color: '#1565c0', padding: '12px', borderRadius: 8, marginBottom: 24, fontWeight: 600, fontSize: '0.9rem' }}>
                  <i className="fas fa-save" style={{ marginRight: 8 }}></i> Draft saved locally.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <label>Full Name <span style={{ color: '#d32f2f' }}>*</span></label>
                  <input type="text" name="fullName" placeholder="Enter your full name" value={form.fullName} onChange={handleChange} required />
                </div>
                
                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Email Address <span style={{ color: '#d32f2f' }}>*</span></label>
                    <input type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>Phone Number <span style={{ color: '#d32f2f' }}>*</span></label>
                    <input type="text" name="phone" placeholder="Enter your phone number" value={form.phone} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>College / University <span style={{ color: '#d32f2f' }}>*</span></label>
                    <input type="text" name="university" placeholder="Enter your college or university" value={form.university} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>Degree / Program <span style={{ color: '#d32f2f' }}>*</span></label>
                    <input type="text" name="degree" placeholder="Enter your degree" value={form.degree} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Current Semester / Year <span style={{ color: '#d32f2f' }}>*</span></label>
                    <select name="semester" value={form.semester} onChange={handleChange} required>
                      <option value="">Select year / semester</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Preferred Internship Position <span style={{ color: '#d32f2f' }}>*</span></label>
                    <select name="positionTitle" value={form.positionTitle} onChange={handleChange} required>
                      <option value="">Select position</option>
                      {programs.map(p => <option key={p._id} value={p.titleEn}>{p.titleEn}</option>)}
                      <option value="Full Stack Developer">Full Stack Developer</option>
                      <option value="UI/UX Designer">UI/UX Designer</option>
                      <option value="Social Media Manager">Social Media Manager</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Internship Duration <span style={{ color: '#d32f2f' }}>*</span></label>
                    <select name="preferredDuration" value={form.preferredDuration} onChange={handleChange} required>
                      <option value="">Select duration</option>
                      <option value="1 Month">1 Month</option>
                      <option value="2 Months">2 Months</option>
                      <option value="3 Months">3 Months</option>
                      <option value="6 Months">6 Months</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Upload Resume / CV <span style={{ color: '#d32f2f' }}>*</span></label>
                    <div className="upload-box" style={{ padding: '12px', position: 'relative' }}>
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          
                          // Optional: update UI to show uploading state here
                          const formData = new FormData();
                          formData.append('file', file);
                          try {
                            const res = await fetch(`${API}/upload/public`, {
                              method: 'POST',
                              body: formData
                            });
                            const data = await res.json();
                            if (data.success) {
                              setForm(prev => ({ ...prev, resumeUrl: data.data }));
                            } else {
                              alert('Upload failed: ' + data.error);
                            }
                          } catch (err) {
                            alert('Upload error. Please try again.');
                          }
                        }}
                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                        required={!form.resumeUrl}
                      />
                      <i className="fas fa-cloud-upload-alt" style={{ fontSize: '1.2rem', marginBottom: 4, color: form.resumeUrl ? '#28a745' : themeColor }}></i>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#333' }}>
                        {form.resumeUrl ? 'File uploaded successfully' : 'Click to upload'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-field">
                  <label>Why do you want this internship? <span style={{ color: '#d32f2f' }}>*</span></label>
                  <textarea name="motivationWhy" placeholder="Explain your motivation..." value={form.motivationWhy} onChange={handleChange} required rows={3}></textarea>
                </div>

                {/* ACTION BUTTONS */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid #eee' }}>
                  <button type="button" onClick={resetForm} className="btn-outline-pink" style={{ border: 'none', color: '#777' }}>
                    <i className="fas fa-undo"></i> Reset Form
                  </button>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <button type="button" onClick={saveDraft} className="btn-outline-pink">
                      <i className="far fa-save"></i> Save as Draft
                    </button>
                    <button type="submit" disabled={submitting} className="btn-solid-pink">
                      <i className="far fa-paper-plane"></i> {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="internship-sidebar">
          <div className="internship-card" style={{ padding: '24px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#333', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
              <i className="fas fa-info-circle" style={{ color: '#555', fontSize: '1.2rem' }}></i> IMPORTANT INFORMATION
            </h4>
            
            <hr style={{ border: 0, borderTop: '1px solid #eee', marginBottom: 20 }} />

            <div className="info-list-item">
              <i className="far fa-id-badge" style={{ fontSize: '1.2rem' }}></i>
              <div>
                <h5 style={{ fontSize: '0.9rem', color: themeColor, marginBottom: 4 }}>Who Can Apply?</h5>
                <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.5 }}>Students and recent graduates who are passionate about public service, health, policy, and community development.</p>
              </div>
            </div>

            <div className="info-list-item">
              <i className="far fa-clock" style={{ fontSize: '1.2rem' }}></i>
              <div>
                <h5 style={{ fontSize: '0.9rem', color: themeColor, marginBottom: 4 }}>Internship Duration</h5>
                <p style={{ fontSize: '0.82rem', color: '#333', fontWeight: 600, marginBottom: 2 }}>1 to 6 Months</p>
                <p style={{ fontSize: '0.78rem', color: '#777', lineHeight: 1.4 }}>(Depending on the position and your availability)</p>
              </div>
            </div>

            <div className="info-list-item">
              <i className="fas fa-clipboard-list" style={{ fontSize: '1.2rem' }}></i>
              <div>
                <h5 style={{ fontSize: '0.9rem', color: themeColor, marginBottom: 4 }}>Application Process</h5>
                <ol style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.6, paddingLeft: 16, margin: 0 }}>
                  <li>Fill out the application form</li>
                  <li>Submit required documents</li>
                  <li>Shortlisted candidates will be contacted for an interview</li>
                </ol>
              </div>
            </div>

            <div className="info-list-item">
              <i className="far fa-file-alt" style={{ fontSize: '1.2rem' }}></i>
              <div>
                <h5 style={{ fontSize: '0.9rem', color: themeColor, marginBottom: 4 }}>Documents Required</h5>
                <ul style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.6, paddingLeft: 16, margin: 0 }}>
                  <li>Updated Resume / CV</li>
                  <li>Cover Letter</li>
                  <li>Academic Transcript (Optional)</li>
                  <li>Recommendation Letter (Optional)</li>
                </ul>
              </div>
            </div>

            <div style={{ background: '#fce4ec', padding: '16px', borderRadius: '8px', marginTop: 24, border: `1px solid #f8bbd0` }}>
              <h5 style={{ fontSize: '0.85rem', color: themeColor, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <i className="fas fa-exclamation-circle"></i> Note
              </h5>
              <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.5, margin: 0 }}>
                Incomplete applications may not be considered. Please ensure all required fields and documents are submitted.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
