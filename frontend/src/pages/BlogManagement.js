import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Plus, Edit, Trash2, X, Save, Eye, EyeOff, Bold, Italic, Underline as UnderlineIcon, Link as LinkIcon, List, AlignLeft, AlignCenter, AlignRight, Heading1, Heading2, Type, Upload, ImageIcon } from 'lucide-react';
import { adminGet, adminMutate, AdminAuthError } from '@/lib/adminApi';

const EMPTY_BLOG = {
  title: '', slug: '', excerpt: '', content: '',
  author: 'MyAibo Team', category: '', tags: '',
  published: false, featured_image: '',
  meta_title: '', meta_description: '',
};

function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

// ── Rich Text Editor ─────────────────────────────────────────────────────────

function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isInitialized.current) {
      editorRef.current.innerHTML = value || '';
      isInitialized.current = true;
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (editorRef.current && isInitialized.current) {
      if (editorRef.current.innerHTML !== (value || '')) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  const execCmd = (command, val = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, val);
    syncContent();
  };

  const syncContent = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const handleLink = () => {
    const selectedText = window.getSelection()?.toString();
    const url = window.prompt('Enter URL:', 'https://');
    if (url) {
      if (selectedText) {
        execCmd('createLink', url);
      } else {
        const linkText = window.prompt('Link text:', url);
        if (linkText) {
          document.execCommand('insertHTML', false, `<a href="${url}" target="_blank">${linkText}</a>`);
          syncContent();
        }
      }
    }
  };

  const handleFontSize = (size) => {
    if (window.getSelection()?.toString()) {
      document.execCommand('fontSize', false, '7');
      const fontEls = editorRef.current?.querySelectorAll('font[size="7"]') || [];
      fontEls.forEach(el => {
        const span = document.createElement('span');
        span.style.fontSize = size;
        span.innerHTML = el.innerHTML;
        el.replaceWith(span);
      });
      syncContent();
    }
  };

  const btn = () => ({
    padding: '5px 8px', border: '1px solid var(--border-clr)', borderRadius: 6,
    background: 'var(--white)', cursor: 'pointer', display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)',
    fontSize: 13, fontWeight: 600, minWidth: 32, height: 32,
  });

  return (
    <div style={{ border: '1px solid var(--border-clr)', borderRadius: 8, overflow: 'hidden', background: 'var(--white)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: '8px 10px', borderBottom: '1px solid var(--border-clr)', background: 'var(--off-white)', alignItems: 'center' }}>
        <button type="button" title="Heading 1" style={btn()} onClick={() => execCmd('formatBlock', 'h2')}><Heading1 size={15} /></button>
        <button type="button" title="Heading 2" style={btn()} onClick={() => execCmd('formatBlock', 'h3')}><Heading2 size={15} /></button>
        <button type="button" title="Paragraph" style={btn()} onClick={() => execCmd('formatBlock', 'p')}><Type size={15} /></button>
        <div style={{ width: 1, height: 24, background: 'var(--border-clr)', margin: '0 4px' }} />
        <select onChange={(e) => handleFontSize(e.target.value)} defaultValue=""
          style={{ padding: '4px 6px', borderRadius: 6, border: '1px solid var(--border-clr)', background: 'var(--white)', fontSize: 12, cursor: 'pointer', height: 32, color: 'var(--text-secondary)' }}>
          <option value="" disabled>Size</option>
          {['12px','14px','16px','18px','20px','24px','28px','32px'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <div style={{ width: 1, height: 24, background: 'var(--border-clr)', margin: '0 4px' }} />
        <button type="button" title="Bold" style={btn()} onClick={() => execCmd('bold')}><Bold size={15} /></button>
        <button type="button" title="Italic" style={btn()} onClick={() => execCmd('italic')}><Italic size={15} /></button>
        <button type="button" title="Underline" style={btn()} onClick={() => execCmd('underline')}><UnderlineIcon size={15} /></button>
        <div style={{ width: 1, height: 24, background: 'var(--border-clr)', margin: '0 4px' }} />
        <button type="button" title="Align Left" style={btn()} onClick={() => execCmd('justifyLeft')}><AlignLeft size={15} /></button>
        <button type="button" title="Align Center" style={btn()} onClick={() => execCmd('justifyCenter')}><AlignCenter size={15} /></button>
        <button type="button" title="Align Right" style={btn()} onClick={() => execCmd('justifyRight')}><AlignRight size={15} /></button>
        <div style={{ width: 1, height: 24, background: 'var(--border-clr)', margin: '0 4px' }} />
        <button type="button" title="Bullet List" style={btn()} onClick={() => execCmd('insertUnorderedList')}><List size={15} /></button>
        <button type="button" title="Insert Link" style={btn()} onClick={handleLink}><LinkIcon size={15} /></button>
        <button type="button" title="Clear Formatting" style={{ ...btn(), fontSize: 11, padding: '4px 8px', minWidth: 'auto' }} onClick={() => execCmd('removeFormat')}>Clear</button>
      </div>
      <div ref={editorRef} contentEditable suppressContentEditableWarning
        onInput={syncContent} onBlur={syncContent}
        style={{ minHeight: 220, padding: '14px 16px', fontSize: 14, lineHeight: 1.7, outline: 'none', fontFamily: "'DM Sans', sans-serif", color: 'var(--text-primary)', overflowY: 'auto', maxHeight: 400 }}
      />
    </div>
  );
}

// ── Image Upload ─────────────────────────────────────────────────────────────

function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setUploadError('Please select an image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { setUploadError('Image must be under 5MB.'); return; }

    setUploading(true);
    setUploadError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const token = sessionStorage.getItem('admin_token');
      const res = await fetch('/api/cms/upload', {
        method: 'POST',
        headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Upload failed');
      }
      const data = await res.json();
      onChange(data.url);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div>
      {!value && (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          style={{
            padding: '10px 16px', borderRadius: 8, border: '1px solid var(--border-clr)',
            background: 'var(--white)', cursor: uploading ? 'not-allowed' : 'pointer',
            fontSize: 13, fontWeight: 500, display: 'inline-flex', alignItems: 'center',
            gap: 6, whiteSpace: 'nowrap', opacity: uploading ? 0.7 : 1,
          }}
        >
          <Upload size={15} />
          {uploading ? 'Uploading…' : 'Upload Image'}
        </button>
      )}
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />

      {uploadError && (
        <div style={{ marginTop: 6, fontSize: 12, color: '#dc2626' }}>{uploadError}</div>
      )}

      {value && (
        <div style={{ marginTop: 10, position: 'relative', display: 'inline-block' }}>
          <img src={value} alt="Featured" style={{ maxHeight: 160, maxWidth: '100%', borderRadius: 8, border: '1px solid var(--border-clr)', display: 'block' }} />
          <button
            type="button"
            onClick={() => onChange('')}
            style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}
          >
            <X size={12} />
          </button>
        </div>
      )}

      {!value && (
        <div
          onClick={() => fileRef.current?.click()}
          style={{ marginTop: 10, border: '2px dashed var(--border-clr)', borderRadius: 8, padding: '24px', textAlign: 'center', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 13 }}
        >
          <ImageIcon size={24} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.4 }} />
          Click to upload or drag & drop
          <div style={{ fontSize: 11, marginTop: 4 }}>PNG, JPG, WebP up to 5MB</div>
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_BLOG);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editorKey, setEditorKey] = useState(0);
  const navigate = useNavigate();

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminGet('/blogs');
      setBlogs(data);
    } catch (err) {
      if (err instanceof AdminAuthError) { navigate('/admin'); return; }
      console.error('[BlogManagement] Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY_BLOG);
    setError('');
    setEditorKey(k => k + 1);
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
      meta_title: blog.meta_title || '',
      meta_description: blog.meta_description || '',
    });
    setError('');
    setEditorKey(k => k + 1);
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
    if (!form.title.trim() || !form.slug.trim()) { setError('Title and slug are required.'); return; }
    setSaving(true);
    setError('');
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      published_at: form.published ? (editing?.published_at || new Date().toISOString()) : null,
    };
    try {
      const path = editing ? `/blogs/${editing.id}` : '/blogs';
      await adminMutate(path, editing ? 'PUT' : 'POST', payload);
      setShowModal(false);
      fetchBlogs();
    } catch (err) {
      if (err instanceof AdminAuthError) { navigate('/admin'); return; }
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await adminMutate(`/blogs/${id}`, 'DELETE');
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (err) {
      if (err instanceof AdminAuthError) { navigate('/admin'); return; }
      alert('Failed to delete blog post. Please try again.');
    }
  };

  const togglePublish = async (blog) => {
    try {
      await adminMutate(`/blogs/${blog.id}`, 'PUT', {
        title: blog.title, slug: blog.slug, excerpt: blog.excerpt,
        content: blog.content, author: blog.author, category: blog.category,
        tags: blog.tags || [], published: !blog.published,
        featured_image: blog.featured_image,
        meta_title: blog.meta_title || '',
        meta_description: blog.meta_description || '',
        published_at: !blog.published ? new Date().toISOString() : blog.published_at,
      });
      fetchBlogs();
    } catch (err) {
      if (err instanceof AdminAuthError) { navigate('/admin'); return; }
    }
  };

  const inputSt = {
    width: '100%', padding: '10px 14px', fontSize: 14,
    border: '1px solid var(--border-clr)', borderRadius: 8,
    background: 'var(--off-white)', boxSizing: 'border-box',
    fontFamily: "'DM Sans', sans-serif", outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--off-white)' }} data-testid="blog-management">
      <header style={{ background: 'var(--white)', borderBottom: '1px solid var(--border-clr)', padding: '16px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link to="/admin/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}><ChevronLeft size={20} /></Link>
            <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0, fontFamily: "'Fraunces', serif" }}>Blog Management</h1>
          </div>
          <button onClick={openNew} className="btn-purple" data-testid="new-blog-button"
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {blog.featured_image && (
                          <img src={blog.featured_image} alt="" style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }} />
                        )}
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{blog.title}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{blog.slug}</div>
                        </div>
                      </div>
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
                        <button onClick={() => openEdit(blog)} data-testid={`edit-blog-${blog.id}`}
                          style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid var(--border-clr)', background: 'var(--white)', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Edit size={14} /> Edit
                        </button>
                        <button onClick={() => handleDelete(blog.id)} data-testid={`delete-blog-${blog.id}`}
                          style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #fecaca', background: '#fef2f2', cursor: 'pointer', fontSize: 13, color: '#dc2626', display: 'flex', alignItems: 'center', gap: 4 }}>
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

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '40px 20px' }}>
          <div style={{ background: 'var(--white)', borderRadius: 16, width: '100%', maxWidth: 780, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid var(--border-clr)' }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, margin: 0 }}>{editing ? 'Edit Blog Post' : 'New Blog Post'}</h2>
              <button onClick={() => setShowModal(false)} data-testid="blog-modal-close" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}><X size={22} /></button>
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
                <RichTextEditor key={editorKey} value={form.content} onChange={(html) => setForm(prev => ({ ...prev, content: html }))} />
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
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Featured Image</label>
                <ImageUpload value={form.featured_image} onChange={(url) => setForm(prev => ({ ...prev, featured_image: url }))} />
              </div>

              <div style={{ borderTop: '1px solid var(--border-clr)', paddingTop: 18 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.05em' }}>SEO Meta</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                      Meta Title
                      <span style={{ fontWeight: 400, color: form.meta_title.length > 55 ? '#f59e0b' : 'var(--text-muted)', marginLeft: 8, fontSize: 12 }}>
                        {form.meta_title.length}/60
                      </span>
                    </label>
                    <input name="meta_title" value={form.meta_title} onChange={handleChange} placeholder="Leave blank to use post title" maxLength={60}
                      style={{ ...inputSt, borderColor: form.meta_title.length > 55 ? '#f59e0b' : 'var(--border-clr)' }} />
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Recommended: 50–60 characters</div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                      Meta Description
                      <span style={{ fontWeight: 400, color: form.meta_description.length > 150 ? '#f59e0b' : 'var(--text-muted)', marginLeft: 8, fontSize: 12 }}>
                        {form.meta_description.length}/160
                      </span>
                    </label>
                    <textarea name="meta_description" value={form.meta_description} onChange={handleChange} placeholder="Leave blank to use excerpt" maxLength={160} rows={3}
                      style={{ ...inputSt, resize: 'vertical', borderColor: form.meta_description.length > 150 ? '#f59e0b' : 'var(--border-clr)' }} />
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Recommended: 150–160 characters</div>
                  </div>
                  {(form.meta_title || form.title) && (
                    <div style={{ background: 'var(--off-white)', border: '1px solid var(--border-clr)', borderRadius: 8, padding: 14 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Google Preview</div>
                      <div style={{ fontSize: 18, color: '#1a0dab', marginBottom: 2, fontWeight: 400, lineHeight: 1.3 }}>{form.meta_title || form.title}</div>
                      <div style={{ fontSize: 13, color: '#006621', marginBottom: 4 }}>www.myaibo.in/blog/{form.slug || 'post-slug'}</div>
                      <div style={{ fontSize: 13, color: '#545454', lineHeight: 1.5 }}>{form.meta_description || form.excerpt || 'Meta description will appear here...'}</div>
                    </div>
                  )}
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
                <input type="checkbox" name="published" checked={form.published} onChange={handleChange} style={{ width: 16, height: 16 }} />
                Publish immediately
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '20px 28px', borderTop: '1px solid var(--border-clr)' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid var(--border-clr)', background: 'var(--white)', cursor: 'pointer', fontSize: 14 }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-purple" data-testid="blog-save-button"
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
