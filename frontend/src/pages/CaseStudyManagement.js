import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Plus, Edit, Trash2 } from 'lucide-react';

// Use the FastAPI proxy to access CMS backend
const CMS_API_BASE = '/api/cms/api';

export default function CaseStudyManagement() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchCaseStudies(token);
  }, [navigate]);

  const fetchCaseStudies = async (token) => {
    try {
      const response = await fetch(`${CMS_API_BASE}/case-studies`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setCaseStudies(data.data || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this case study?')) return;

    const token = localStorage.getItem('admin_token');
    try {
      await fetch(`${CMS_API_BASE}/case-studies/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCaseStudies(caseStudies.filter(cs => cs.id !== id));
    } catch (error) {
      console.error('Error deleting case study:', error);
      alert('Failed to delete case study');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--off-white)' }}>
      {/* Header */}
      <header style={{ 
        background: 'var(--white)', 
        borderBottom: '1px solid var(--border-clr)',
        padding: '16px 32px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link to="/admin/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              <ChevronLeft size={20} />
            </Link>
            <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0, fontFamily: "'Fraunces', serif" }}>
              Case Study Management
            </h1>
          </div>
          <Link
            to="/admin/case-studies/new"
            className="btn-purple"
            style={{ padding: '10px 20px', fontSize: 14, fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <Plus size={18} />
            New Case Study
          </Link>
        </div>
      </header>

      <main style={{ padding: '32px', maxWidth: 1200, margin: '0 auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            Loading case studies...
          </div>
        ) : caseStudies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            No case studies yet
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {caseStudies.map((cs) => (
              <div
                key={cs.id}
                style={{
                  background: 'var(--white)',
                  borderRadius: 12,
                  border: '1px solid var(--border-clr)',
                  overflow: 'hidden'
                }}
              >
                {cs.featuredImage && (
                  <img
                    src={cs.featuredImage}
                    alt={cs.title}
                    style={{ width: '100%', height: 180, objectFit: 'cover' }}
                  />
                )}
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px', fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}>
                    {cs.title}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 12px' }}>
                    {cs.clientName}
                  </p>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
                    Created: {new Date(cs.createdAt).toLocaleDateString()}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => navigate(`/admin/case-studies/edit/${cs.id}`)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        background: 'var(--purple)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6
                      }}
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cs.id)}
                      style={{
                        padding: '8px 12px',
                        background: 'transparent',
                        border: '1px solid #FCA5A5',
                        borderRadius: 6,
                        cursor: 'pointer',
                        color: '#DC2626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
