import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import SEO from '@/components/SEO';
import { BACKEND_URL } from '@/lib/constants';

export default function BlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchBlog = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/admin/public/blogs/${slug}`);
      if (response.status === 404) { setNotFound(true); return; }
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error('[BlogPage] Failed to fetch blog:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { fetchBlog(); }, [fetchBlog]);

  if (loading) {
    return (
      <main style={{ paddingTop: 64, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--
