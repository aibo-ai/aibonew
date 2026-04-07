import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Plus, Edit, Trash2, Eye } from 'lucide-react';

const BACKEND_URL = 'http://localhost:3002';

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchBlogs(token);
  }, [navigate, filter]);

  const fetchBlogs = async (token) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/blog`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setBlogs(data.data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    const token = localStorage.getItem('admin_token');
    try {
      await fetch(`${BACKEND_URL}/api/blog/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog post');
    }
  };

  const filteredBlogs = filter === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.status === filter);

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
              Blog Management
            </h1>
          </div>
          <Link
            to="/admin/blogs/new"
            className="btn-purple"
            style={{ padding: '10px 20px', fontSize: 14, fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <Plus size={18} />
            New Blog Post
          </Link>
        </div>
      </header>

      <main style={{ padding: '32px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Filters */}
        <div style={{ background: 'var(--white)', padding: '20px 24px', borderRadius: 12, border: '1px solid var(--border-clr)', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search blogs..."
            style={{
              flex: 1,
              padding: '10px 16px',
              fontSize: 14,
              border: '1px solid var(--border-clr)',
              borderRadius: 8,
              background: 'var(--off-white)',
              maxWidth: 400,
              outline: 'none'
            }}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '10px 16px',
              fontSize: 14,
              border: '1px solid var(--border-clr)',
              borderRadius: 8,
              background: 'var(--white)',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Blog List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            Loading blogs...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            No blog posts yet
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                style={{
                  background: 'var(--white)',
                  padding: 24,
                  borderRadius: 12,
                  border: '1px solid var(--border-clr)',
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start'
                }}
              >
                {blog.featuredImage && (
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}>
                      {blog.title}
                    </h3>
                    <span style={{
                      padding: '4px 10px',
                      fontSize: 11,
                      fontWeight: 600,
                      borderRadius: 6,
                      background: blog.status === 'published' ? '#D1FAE5' : '#FEF3C7',
                      color: blog.status === 'published' ? '#065F46' : '#92400E',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {blog.status}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 12px', lineHeight: 1.5 }}>
                    {blog.excerpt}
                  </p>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    Created: {new Date(blog.createdAt).toLocaleDateString()} • 
                    {blog.publishedAt && ` Published: ${new Date(blog.publishedAt).toLocaleDateString()}`} • 
                    Views: {blog.viewCount || 0}
                  </div>
                  {blog.categories && Array.isArray(blog.categories) && blog.categories.length > 0 && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                      {blog.categories.map((cat, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '4px 10px',
                            fontSize: 11,
                            background: 'var(--purple-light)',
                            color: 'var(--purple-dark)',
                            borderRadius: 6,
                            fontWeight: 500
                          }}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <button
                    onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
                    style={{
                      padding: '8px 12px',
                      background: 'transparent',
                      border: '1px solid var(--border-clr)',
                      borderRadius: 6,
                      cursor: 'pointer',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 13
                    }}
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    style={{
                      padding: '8px 12px',
                      background: 'transparent',
                      border: '1px solid #FCA5A5',
                      borderRadius: 6,
                      cursor: 'pointer',
                      color: '#DC2626',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 13
                    }}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
