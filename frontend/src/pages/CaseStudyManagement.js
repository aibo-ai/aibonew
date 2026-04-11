import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Plus, Edit, Trash2, X, Save, Eye, EyeOff } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SERVICES = [
  'Generative Engine Optimization (GEO)', 'Answer Engine Optimization (AEO)',
  'Search Engine Optimization (SEO)', 'Content Marketing',
  'Full Stack Development', 'AI Automations', 'White Label Solutions',
];

const EMPTY_CS = {
  title: '', client: '', industry: '', service: '',
  excerpt: '', challenge: '', solution: '', result: '',
  metrics: '', published: false, featured_image: '',
};

export default function CaseStudyManagement() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_CS);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getToken = useCallback(() => sessionStorage.getItem('admin_token'), []);
  const authHeaders = useCallback(() => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` }), [getToken]);

  const fetchCaseStudies = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`${BACKEND_URL}/api/admin/case-studies`, { headers: authHeaders() });
      if (r.status === 401) { navigate('/admin'); return; }
      const data = await r.json();
      setCaseStudies(data);
    } catch (_err) { /* network error */ } finally { setLoading(false); }
  }, [authHeaders, navigate]);

  useEffect(() => {
    if (!getToken()) { navigate('/admin'); return; }
    fetchCaseStudies();
  }, [navigate, getToken, fetchCaseStudies]);

  const openNew = () => { setEditing(null); setForm(EMPTY_CS); setError(''); setShowModal(true); };
  const openEdit = (cs) => {
    setEditing(cs);
    setForm({
      title: cs.title || '', client: cs.client || '', industry: cs.industry || '',
      service: cs.service || '', excerpt: cs.excerpt || '', challenge: cs.challenge || '',
      solution: cs.solution || '', result: cs.result || '',
      metrics: cs.metrics ? JSON.stringify(cs.metrics, null, 2) : '',
      published: cs.published || false, featured_image: cs.featured_image || '',
    });
    setError('');
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setError('Title is required.'); return; }
    setSaving(true); setError('');
    let metrics = {};
    if (form.metrics.trim()) {
      try { metrics = JSON.parse(form.metrics); } catch { setError('Metrics must be valid JSON.'); setSaving(false); return; }
    }
    const payload = { ...form, metrics };
    try {
      const url = editing
        ? `${BACKEND_URL}/api/admin/case-studies/${editing.id}`
        : `${BACKEND_URL}/api/admin/case-studies`;
      const r = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: authHeaders(), body: JSON.stringify(payload) });
      if (!r.ok) { const d = await r.json().catch(() => ({})); throw new Error(d.detail || 'Save failed'); }
      setShowModal(false);
      fetchCaseStudies();
    } catch (e) { setError(e.message); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this case study?')) return;
    await fetch(`${BACKEND_URL}/api/admin/case-studies/${id}`, { method: 'DELETE', headers: authHeaders() });
    setCaseStudies(caseStudies.filter(cs => cs.id !== id));
  };

  const togglePublish = async (cs) => {
    const r = await fetch(`${BACKEND_URL}/api/admin/case-studies/${cs.id}`, {
      method: 'PUT', headers: authHeaders(),
      body: JSON.stringify({ ...cs, metrics: cs.metrics || {}, published: !cs.published }),
    });
    if (r.ok) fetchCaseStudies();
  };

  const inputSt = { width: '100%', padding: '10px 14px', fontSize: 14, border: '1px solid var(--border-clr)', borderRadius: 8, background: 'var(--off-white)', boxSizing: 'border-box', fontFamily: "'DM Sans', sans-serif", outline: 'none' };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--off-white)' }}>
      <header style={{ background: 'var(--white)', borderBottom: '1px solid var(--border-clr)', padding: '16px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link to="/admin/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}><ChevronLeft size={20} /></Link>
            <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0, fontFamily: "'Fraunces', serif" }}>Case Study Management</h1>
          </div>
          <button onClick={openNew} className="btn-purple" style={{ padding: '10px 20px', fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Plus size={18} /> New Case Study
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading…</p>
        ) : caseStudies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>No case studies yet. Create your first one!</p>
            <button onClick={openNew} className="btn-purple" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
              <Plus size={16} style={{ marginRight: 8 }} /> New Case Study
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 20 }}>
            {caseStudies.map(cs => (
              <div key={cs.id} style={{ background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border-clr)', overflow: 'hidden' }}>
                <div style={{ padding: '20px 20px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--purple-dark)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{cs.service || 'Case Study'}</span>
                    <button onClick={() => togglePublish(cs)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: cs.published ? 'rgba(34,197,94,0.1)' : 'rgba(156,163,175,0.15)', color: cs.published ? '#16a34a' : '#6b7280' }}>
                      {cs.published ? <Eye size={10} /> : <EyeOff size={10} />}
                      {cs.published ? 'Live' : 'Draft'}
                    </button>
                  </div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, margin: '0 0 6px', color: 'var(--text-primary)' }}>{cs.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 4px' }}>{cs.client || '—'} {cs.industry ? `· ${cs.industry}` : ''}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{cs.excerpt || 'No excerpt'}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, padding: '12px 20px', borderTop: '1px solid var(--border-clr)' }}>
                  <button onClick={() => openEdit(cs)} style={{ flex: 1, padding: '8px', borderRadius: 6, border: '1px solid var(--border-clr)', background: 'var(--white)', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <Edit size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(cs.id)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #fecaca', background: '#fef2f2', cursor: 'pointer', color: '#dc2626', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13 }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '40px 20px' }}>
          <div style={{ background: 'var(--white)', borderRadius: 16, width: '100%', maxWidth: 720, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid var(--border-clr)' }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, margin: 0 }}>{editing ? 'Edit Case Study' : 'New Case Study'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={22} /></button>
            </div>
            <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {error && <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, fontSize: 13, color: '#dc2626' }}>{error}</div>}

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Title *</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Case study title" style={inputSt} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Client</label>
                  <input name="client" value={form.client} onChange={handleChange} placeholder="Client name" style={inputSt} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Industry</label>
                  <input name="industry" value={form.industry} onChange={handleChange} placeholder="e.g. D2C" style={inputSt} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Service</label>
                  <select name="service" value={form.service} onChange={handleChange} style={{ ...inputSt, cursor: 'pointer' }}>
                    <option value="">Select…</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Excerpt</label>
                <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} placeholder="Short summary…" style={{ ...inputSt, resize: 'vertical' }} />
              </div>

              {[['Challenge', 'challenge', 'What problem needed solving…'], ['Solution', 'solution', 'What we built / did…'], ['Result', 'result', 'Outcomes achieved…']].map(([label, name, ph]) => (
                <div key={name}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{label}</label>
                  <textarea name={name} value={form[name]} onChange={handleChange} rows={3} placeholder={ph} style={{ ...inputSt, resize: 'vertical' }} />
                </div>
              ))}

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Metrics (JSON)</label>
                <textarea name="metrics" value={form.metrics} onChange={handleChange} rows={3} placeholder={'{"increase": "+340%", "timeframe": "6 months"}'} style={{ ...inputSt, resize: 'vertical', fontFamily: 'monospace', fontSize: 12 }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Featured Image URL</label>
                <input name="featured_image" value={form.featured_image} onChange={handleChange} placeholder="https://…" style={inputSt} />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
                <input type="checkbox" name="published" checked={form.published} onChange={handleChange} style={{ width: 16, height: 16 }} />
                Publish immediately
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '20px 28px', borderTop: '1px solid var(--border-clr)' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid var(--border-clr)', background: 'var(--white)', cursor: 'pointer', fontSize: 14 }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-purple" style={{ padding: '10px 24px', fontSize: 14, fontWeight: 500, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, opacity: saving ? 0.8 : 1 }}>
                <Save size={16} /> {saving ? 'Saving…' : 'Save Case Study'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
