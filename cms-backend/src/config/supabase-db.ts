import { supabase } from './supabase';

export interface DatabaseUser {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'editor';
  avatar?: string;
  bio?: string;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author_id: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  categories: string[];
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseCaseStudy {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  client_logo?: string;
  challenge: string;
  solution: string;
  results: Array<{
    metric: string;
    value: string;
    unit: string;
    description?: string;
  }>;
  content: string;
  featured_image?: string;
  author_id: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  industries: string[];
  tags: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseWhitepaper {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  key_takeaways: string[];
  pdf_url: string;
  cover_image?: string;
  author_id: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  topics: string[];
  tags: string[];
  is_gated: boolean;
  download_count: number;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  file_size: number;
  created_at: string;
  updated_at: string;
}

// Database operations using Supabase
export class SupabaseDatabase {
  // User operations
  static async createUser(userData: Omit<DatabaseUser, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateUser(id: string, updates: Partial<DatabaseUser>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Blog operations
  static async createBlog(blogData: Omit<DatabaseBlog, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('blogs')
      .insert([blogData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getBlogs(filters: {
    status?: string;
    category?: string;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}) {
    let query = supabase
      .from('blogs')
      .select(`
        *,
        author:users(id, first_name, last_name, avatar)
      `);

    if (filters.status === 'published') {
      query = query.eq('status', 'published').not('published_at', 'is', null);
    } else if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.category) {
      query = query.contains('categories', [filters.category]);
    }

    if (filters.tag) {
      query = query.contains('tags', [filters.tag]);
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
    }

    query = query.order('published_at', { ascending: false });

    if (filters.limit) {
      const offset = ((filters.page || 1) - 1) * filters.limit;
      query = query.range(offset, offset + filters.limit - 1);
    }

    const { data, error, count } = await query;
    
    if (error) throw error;
    return { data, count };
  }

  static async getBlogBySlug(slug: string) {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        author:users(id, first_name, last_name, avatar, bio)
      `)
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateBlog(id: string, updates: Partial<DatabaseBlog>) {
    const { data, error } = await supabase
      .from('blogs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteBlog(id: string) {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Case Study operations
  static async createCaseStudy(caseStudyData: Omit<DatabaseCaseStudy, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('case_studies')
      .insert([caseStudyData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getCaseStudies(filters: {
    status?: string;
    industry?: string;
    outcome?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}) {
    let query = supabase
      .from('case_studies')
      .select(`
        *,
        author:users(id, first_name, last_name, avatar)
      `);

    if (filters.status === 'published') {
      query = query.eq('status', 'published').not('published_at', 'is', null);
    } else if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.industry) {
      query = query.contains('industries', [filters.industry]);
    }

    if (filters.outcome) {
      query = query.contains('tags', [filters.outcome]);
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,client_name.ilike.%${filters.search}%,challenge.ilike.%${filters.search}%,solution.ilike.%${filters.search}%`);
    }

    query = query.order('published_at', { ascending: false });

    if (filters.limit) {
      const offset = ((filters.page || 1) - 1) * filters.limit;
      query = query.range(offset, offset + filters.limit - 1);
    }

    const { data, error, count } = await query;
    
    if (error) throw error;
    return { data, count };
  }

  static async getCaseStudyBySlug(slug: string) {
    const { data, error } = await supabase
      .from('case_studies')
      .select(`
        *,
        author:users(id, first_name, last_name, avatar, bio)
      `)
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  }

  // Whitepaper operations
  static async createWhitepaper(whitepaperData: Omit<DatabaseWhitepaper, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('whitepapers')
      .insert([whitepaperData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getWhitepapers(filters: {
    status?: string;
    topic?: string;
    search?: string;
  } = {}) {
    let query = supabase
      .from('whitepapers')
      .select(`
        *,
        author:users(id, first_name, last_name, avatar)
      `);

    if (filters.status === 'published') {
      query = query.eq('status', 'published').not('published_at', 'is', null);
    } else if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.topic) {
      query = query.contains('topics', [filters.topic]);
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,abstract.ilike.%${filters.search}%`);
    }

    query = query.order('published_at', { ascending: false });

    const { data, error } = await query;
    
    if (error) throw error;
    return { data };
  }

  static async getWhitepaperBySlug(slug: string) {
    const { data, error } = await supabase
      .from('whitepapers')
      .select(`
        *,
        author:users(id, first_name, last_name, avatar, bio)
      `)
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async incrementDownloadCount(id: string) {
    // For now, just return the whitepaper without incrementing
    // This can be implemented later with a proper RPC function
    const { data, error } = await supabase
      .from('whitepapers')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
}

export default SupabaseDatabase;
