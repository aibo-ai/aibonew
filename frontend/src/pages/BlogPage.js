{/* Featured image */}
        {blog.featured_image && (
          <div style={{ background: 'var(--dark-surface)' }}>
            <div className="mx-auto" style={{ maxWidth: 900 }}>
              <img
                src={blog.featured_image}
                alt={blog.title}
                loading="lazy"
                style={{ width: '100%', maxHeight: 480, aspectRatio: '1.875 / 1', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        )}
