import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Plus, Edit, Trash2, X, Save, Eye, EyeOff } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const EMPTY_BLOG = {
  title: '', slug: '', excerpt: '', content: '',
  author: 'MyAibo Team', category: '', tags: '',
  published: false, featured_image: '',
};

function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null); // null = new, else blog object
  const [form, setForm] = useState(EMPTY_BLOG);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getToken = useCallback(() => sessionStorage.getItem('admin_token'), []);

  const authHeaders = useCallback(() => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  }), [getToken]);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`${BACKEND_URL}/admin/blogs`, { headers: authHeaders() });
      if (r.status === 401) { navigate('/admin'); return; }
      const data = await r.json();
      setBlogs(data);
    } catch (_err) {
      /* network error — silently handled */
    } finally {
      setLoading(false);
    }
  }, [authHeaders, navigate]);

  useEffect(() => {
    if (!getToken()) { navigate('/admin'); return; }
    fetchBlogs();
  }, [navigate, getToken, fetchBlogs]);

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY_BLOG);
    setError('');
    setShowModal(true);
  };

  const openEdit = (blog) => {
    setEditing(blog);
    setForm({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      author: blog.author || 'MyAibo Team',
      category: blog.category || '',
      tags: (blog.tags || []).join(', '),
      published: blog.published || false,
      featured_image: blog.featured_image || '',
    });
    setError('');
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'title' && !editing ? { slug: slugify(value) } : {}),
    }));
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim()) {
      setError('Title and slug are required.');
      return;
    }
    setSaving(true);
    setError('');
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    };
    try {
      const url = editing
        ? `${BACKEND_URL}/admin/blogs/${editing.id}`
        : `${BACKEND_URL}/admin/blogs`;
      const r = await fetch(url, {
        method: editing ? 'PUT' : 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.detail || 'Save failed');
      }
      setShowModal(false);
      fetchBlogs();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    await fetch(`${BACKEND_URL}/admin/blogs/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    setBlogs(blogs.filter(b => b.id !== id));
  };

  const togglePublish = async (blog) => {
    const r = await fetch(`${BACKEND_URL}/admin/blogs/${blog.id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({
        title: blog.title, slug: blog.slug, excerpt: blog.excerpt,
        content: blog.content, author: blog.author, category: blog.category,
        tags: blog.tags || [], published: !blog.published,
        featured_image: blog.featured_image,
      }),
    });
    if (r.ok) fetchBlogs();
  };

  const inputSt = {
    width: '100%', padding: '10px 14px', fontSize: 14,
    border: '1px solid var(--border-clr)', borderRadius: 8,
    background: 'var(--off-white)', boxSizing: 'border-box',
    fontFamily: "'DM Sans', sans-serif", outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--off-white)' }}>
      {/* Header */}
      <header style={{ background: 'var(--white)', borderBottom: '1px solid var(--border-clr)', padding: '16px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link to="/admin/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              <ChevronLeft size={20} />
            </Link>
            <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0, fontFamily: "'Fraunces', serif" }}>Blog Management</h1>
          </div>
          <button onClick={openNew} className="btn-purple"
            style={{ padding: '10px 20px', fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Plus size={18} /> New Blog Post
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading…</p>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>No blog posts yet. Create your first one!</p>
            <button onClick={openNew} className="btn-purple" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
              <Plus size={16} style={{ marginRight: 8 }} /> New Blog Post
            </button>
          </div>
        ) : (
          <div style={{ background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border-clr)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-clr)', background: 'var(--off-white)' }}>
                  {['Title', 'Category', 'Author', 'Status', 'Created', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, i) => (
                  <tr key={blog.id} style={{ borderBottom: i < blogs.length - 1 ? '1px solid var(--border-clr)' : 'none' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{blog.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{blog.slug}</div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{blog.category || '—'}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{blog.author || 'MyAibo Team'}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <button onClick={() => togglePublish(blog)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                          background: blog.published ? 'rgba(34,197,94,0.1)' : 'rgba(156,163,175,0.15)',
                          color: blog.published ? '#16a34a' : '#6b7280' }}>
                        {blog.published ? <Eye size={12} /> : <EyeOff size={12} />}
                        {blog.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: 'var(--text-muted)' }}>
                      {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : '—'}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => openEdit(blog)} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid var(--border-clr)', background: 'var(--white)', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Edit size={14} /> Edit
                        </button>
                        <button onClick={() => handleDelete(blog.id)} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #fecaca', background: '#fef2f2', cursor: 'pointer', fontSize: 13, color: '#dc2626', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '40px 20px' }}>
          <div style={{ background: 'var(--white)', borderRadius: 16, width: '100%', maxWidth: 720, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid var(--border-clr)' }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, margin: 0 }}>{editing ? 'Edit Blog Post' : 'New Blog Post'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}><X size={22} /></button>
            </div>
            <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {error && <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, fontSize: 13, color: '#dc2626' }}>{error}</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Title *</label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="Blog post title" style={inputSt} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Slug *</label>
                  <input name="slug" value={form.slug} onChange={handleChange} placeholder="url-friendly-slug" style={inputSt} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Excerpt</label>
                <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} placeholder="Short description..." style={{ ...inputSt, resize: 'vertical' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Content</label>
                <textarea name="content" value={form.content} onChange={handleChange} rows={8} placeholder="Full blog post content..." style={{ ...inputSt, resize: 'vertical', minHeight: 160 }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Author</label>
                  <input name="author" value={form.author} onChange={handleChange} placeholder="Author name" style={inputSt} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Category</label>
                  <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. GEO" style={inputSt} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Tags</label>
                  <input name="tags" value={form.tags} onChange={handleChange} placeholder="tag1, tag2" style={inputSt} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Featured Image URL</label>
                <input name="featured_image" value={form.featured_image} onChange={handleChange} placeholder="https://..." style={inputSt} />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
                <input type="checkbox" name="published" checked={form.published} onChange={handleChange} style={{ width: 16, height: 16 }} />
                Publish immediately
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '20px 28px', borderTop: '1px solid var(--border-clr)' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid var(--border-clr)', background: 'var(--white)', cursor: 'pointer', fontSize: 14 }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-purple"
                style={{ padding: '10px 24px', fontSize: 14, fontWeight: 500, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, opacity: saving ? 0.8 : 1 }}>
                <Save size={16} /> {saving ? 'Saving…' : 'Save Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
