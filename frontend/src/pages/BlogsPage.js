import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { BACKEND_URL } from '@/lib/constants';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/admin/public/blogs`);
      const data = await response.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('[BlogsPage] Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <>
      <SEO
        title="Blog — AI, Marketing & Technology Insights | MyAibo"
        description="Expert perspectives on GEO, AEO, SEO, AI automation, and full-stack development from the team building systems that actually compound."
      />
      <main style={{ paddingTop: 64 }}>
        <section style={{ background: 'var(--dark)', padding: '100px 40px 60px' }}>
          <div className="mx-auto text-center" style={{ maxWidth: 1100 }}>
            <h1 s
