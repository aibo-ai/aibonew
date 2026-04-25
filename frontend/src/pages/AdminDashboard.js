import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Briefcase, Eye, Plus } from 'lucide-react';

// Use the FastAPI backend admin API
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function AdminDashboard() {
  const [stats, setStats] = useState({ blogs: 0, caseStudies: 0, views: 0 });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchStats = useCallback(async (token) => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const [blogsRes, casesRes] = await Promise.all([
        fetch(`${BACKEND_URL}/admin/blogs`, { headers }),
        fetch(`${BACKEND_URL}/admin/case-studies`, { headers }),
      ]);

      const blogsData = await blogsRes.json();
      const casesData = await casesRes.json();

      setStats({
        blogs: Array.isArray(blogsData) ? blogsData.length : 0,
        caseStudies: Array.isArray(casesData) ? casesData.length : 0,
        views: 0
      });
    } catch (_error) {
      /* network error — silently handled */
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    const userData = sessionStorage.getItem('admin_user');
    
    if (!token) {
      navigate('/admin');
      return;
    }

    if (userData) {
      try { setUser(JSON.parse(userData)); } catch { /* invalid JSON */ }
    }

    fetchStats(token);
  }, [navigate, fetchStats]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_user');
    navigate('/admin');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--off-white)' }}>
      {/* Header */}
      <header style={{ 
        background: 'var(--white)', 
        borderBottom: '1px solid var(--border-clr)',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600 }}>
            <span style={{ color: 'var(--purple)' }}>My</span>
            <span style={{ color: 'var(--purple-dark)' }}>Aibo</span>
          </div>
          <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-primary)' }}>Admin Dashboard</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            Welcome, {user?.firstName || 'Admin User'}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              fontSize: 13,
              background: 'transparent',
              border: '1px solid var(--border-clr)',
              borderRadius: 6,
              cursor: 'pointer',
              color: 'var(--text-primary)',
              fontWeight: 500
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '40px 32px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 40 }}>
          <div style={{ background: 'var(--white)', padding: 24, borderRadius: 12, border: '1px solid var(--border-clr)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--purple-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={20} style={{ color: 'var(--purple-dark)' }} />
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 600, fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}>{stats.blogs}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Total Blogs</div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--white)', padding: 24, borderRadius: 12, border: '1px solid var(--border-clr)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--purple-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Briefcase size={20} style={{ color: 'var(--purple-dark)' }} />
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 600, fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}>{stats.caseStudies}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Case Studies</div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--white)', padding: 24, borderRadius: 12, border: '1px solid var(--border-clr)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--purple-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Eye size={20} style={{ color: 'var(--purple-dark)' }} />
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 600, fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}>{stats.views}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Total Views</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ background: 'var(--white)', padding: 32, borderRadius: 12, border: '1px solid var(--border-clr)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 24, fontFamily: "'Fraunces', serif" }}>
            Quick Actions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            <Link
              to="/admin/blogs"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: 20,
                background: 'var(--purple-light)',
                borderRadius: 10,
                textDecoration: 'none',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={20} style={{ color: 'white' }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--purple-dark)', marginBottom: 2 }}>New Blog Post</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Create a new blog article</div>
              </div>
            </Link>

            <Link
              to="/admin/case-studies"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: 20,
                background: 'var(--purple-light)',
                borderRadius: 10,
                textDecoration: 'none',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={20} style={{ color: 'white' }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--purple-dark)', marginBottom: 2 }}>New Case Study</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Add a client success story</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Content Sections */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Recent Blog Posts */}
          <div style={{ background: 'var(--white)', padding: 32, borderRadius: 12, border: '1px solid var(--border-clr)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0, fontFamily: "'Fraunces', serif" }}>
                Recent Blog Posts
              </h3>
              <Link to="/admin/blogs" style={{ fontSize: 13, color: 'var(--purple)', textDecoration: 'none', fontWeight: 500 }}>
                View all
              </Link>
            </div>
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', fontSize: 14 }}>
              {stats.blogs > 0 ? `${stats.blogs} blog posts` : 'No blog posts yet'}
            </div>
          </div>

          {/* Recent Case Studies */}
          <div style={{ background: 'var(--white)', padding: 32, borderRadius: 12, border: '1px solid var(--border-clr)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0, fontFamily: "'Fraunces', serif" }}>
                Recent Case Studies
              </h3>
              <Link to="/admin/case-studies" style={{ fontSize: 13, color: 'var(--purple)', textDecoration: 'none', fontWeight: 500 }}>
                View all
              </Link>
            </div>
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', fontSize: 14 }}>
              {stats.caseStudies > 0 ? `${stats.caseStudies} case studies` : 'No case studies yet'}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
