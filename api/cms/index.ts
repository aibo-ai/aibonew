// Case Studies
app.get('/api/cms/case-studies', protect, async (_req, res) => {
  try {
    const sql = getDb();
    await sql`CREATE TABLE IF NOT EXISTS cms_case_studies (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title VARCHAR(500) NOT NULL, client VARCHAR(255), industry VARCHAR(255), service VARCHAR(255), excerpt TEXT, challenge TEXT, solution TEXT, result TEXT, metrics JSONB, featured_image VARCHAR(1000), published BOOLEAN DEFAULT false, "createdAt" TIMESTAMPTZ DEFAULT NOW(), "updatedAt" TIMESTAMPTZ DEFAULT NOW())`;
    const rows = await sql`SELECT * FROM cms_case_studies ORDER BY "createdAt" DESC`;
    res.json(rows);
  } catch (e: any) { res.status(500).json({ success: false, message: e.message }); }
});

app.post('/api/cms/case-studies', protect, async (req, res) => {
  try {
    const sql = getDb();
    const { title, client, industry, service, excerpt, challenge, solution, result, metrics, published = false, featured_image } = req.body;
    let metricsJson = null;
    try { metricsJson = metrics ? JSON.parse(metrics) : null; } catch { metricsJson = null; }
    const rows = await sql`
      INSERT INTO cms_case_studies (title, client, industry, service, excerpt, challenge, solution, result, metrics, published, featured_image)
      VALUES (${title}, ${client}, ${industry}, ${service}, ${excerpt}, ${challenge}, ${solution}, ${result}, ${metricsJson}, ${published}, ${featured_image})
      RETURNING *
    `;
    res.json({ success: true, caseStudy: rows[0] });
  } catch (e: any) { res.status(500).json({ success: false, message: e.message }); }
});

app.put('/api/cms/case-studies/:id', protect, async (req, res) => {
  try {
    const sql = getDb();
    const { title, client, industry, service, excerpt, challenge, solution, result, metrics, published, featured_image } = req.body;
    let metricsJson = null;
    try { metricsJson = metrics ? (typeof metrics === 'string' ? JSON.parse(metrics) : metrics) : null; } catch { metricsJson = null; }
    const rows = await sql`
      UPDATE cms_case_studies SET title=${title}, client=${client}, industry=${industry}, service=${service}, excerpt=${excerpt}, challenge=${challenge}, solution=${solution}, result=${result}, metrics=${metricsJson}, published=${published}, featured_image=${featured_image}, "updatedAt"=NOW()
      WHERE id=${req.params.id} RETURNING *
    `;
    res.json({ success: true, caseStudy: rows[0] });
  } catch (e: any) { res.status(500).json({ success: false, message: e.message }); }
});

app.delete('/api/cms/case-studies/:id', protect, async (req, res) => {
  try {
    const sql = getDb();
    await sql`DELETE FROM cms_case_studies WHERE id=${req.params.id}`;
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
});
