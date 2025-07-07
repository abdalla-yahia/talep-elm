/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const date = new Date().toISOString().split('T')[0]; // التاريخ فقط بدون الوقت

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex 
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
  <sitemap>
    <loc>https://talep-elm.vercel.app/sitemap-0.xml</loc>
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1</priority>
  </sitemap>
</sitemapindex>`;

// حفظ الملف في public
fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemapIndex);

// console.log('✅ تم إنشاء ملف sitemap.xml بنجاح مع lastmod');
