import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const data = JSON.parse(await readFile(new URL('cv/content.json', root), 'utf8'));
const css = await readFile(new URL('cv/style.css', root), 'utf8');
// Embed original artwork so saved HTML copies retain their portrait and logos.
const imagePaths = new Set([data.portrait, ...['en', 'zh'].flatMap(lang =>
  ['education', 'experience', 'projects'].flatMap(section => data[lang][section].map(entry => entry.logo))
)].filter(Boolean));
const images = new Map(await Promise.all([...imagePaths].map(async path => {
  const bytes = await readFile(new URL(`cv/${path}`, root));
  const type = path.endsWith('.jpg') ? 'image/jpeg' : 'image/png';
  return [path, `data:${type};base64,${bytes.toString('base64')}`];
})));
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
const visibleUrl = url => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
const link = (url, label = visibleUrl(url)) => `<a href="${escape(url)}">${escape(label)}</a>`;
const logo = entry => entry.logo ? `<img class="brand-logo" src="${images.get(entry.logo)}" alt="" contenteditable="false">` : '';

for (const lang of ['en', 'zh']) {
  const d = data[lang];
  const zh = lang === 'zh';
  const education = d.education.map(e => `<article class="entry">
    <div class="row brand-row brand-${escape(e.brand)}"><div class="brand-name">${logo(e)}<strong>${escape(e.title)}</strong></div><span class="date">${escape(e.date)}</span></div>
    ${e.detail ? `<p>${escape(e.detail)}</p>` : ''}<p class="detail">${escape(e.note)}</p>
  </article>`).join('\n');
  const publications = data.publications.map(p => `<article class="entry publication">
    <h3 class="pub-title">${escape(p.title)}</h3>
    <p class="authors">${escape(p.authors).replaceAll('Ziheng He', '<strong>Ziheng He</strong>')}</p>
    <p class="pub-meta"><span class="venue">${escape(p.venue[lang])}</span> · ${link(p.url)}</p>
    ${p.summary ? `<p class="summary">${escape(p.summary[lang])}</p>` : ''}
  </article>`).join('\n');
  const experience = d.experience.map(e => `<article class="entry">
    <div class="row brand-row brand-${escape(e.brand)}"><div class="brand-name">${logo(e)}<strong>${escape(e.title)} <span class="entry-role">| ${escape(e.role)}</span></strong></div><span class="date">${escape(e.date)}</span></div>
    <ul>${e.bullets.map(b => `<li>${escape(b)}</li>`).join('')}</ul>
  </article>`).join('\n');
  const projects = d.projects.map(p => `<article class="entry">
    <div class="row brand-row brand-${escape(p.brand)}"><div class="brand-name">${logo(p)}<strong>${escape(p.title)} <span class="entry-role">| ${escape(p.role)}</span></strong></div><span class="project-link">${link(p.url)}</span></div>
    <p>${escape(p.description)}</p>${p.note ? `<p class="project-note">${escape(p.note)}</p>` : ''}
  </article>`).join('\n');
  const html = `<!doctype html>
<!-- Generated from cv/content.json by scripts/build-cv.mjs. -->
<html lang="${zh ? 'zh-CN' : 'en'}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${escape(d.name)} - ${escape(d.role)}. Academic CV.">
<title>${escape(d.name)} | ${zh ? '学术简历' : 'Academic CV'}</title><style>${css}</style></head>
<body>
<nav class="toolbar" aria-label="${zh ? '简历工具' : 'CV tools'}">
  <button type="button" id="edit">${zh ? '编辑文字' : 'Edit text'}</button>
  <button type="button" id="print">${zh ? '打印 / 保存 PDF' : 'Print / Save PDF'}</button>
  <button type="button" id="save">${zh ? '保存编辑后的 HTML' : 'Save edited HTML'}</button>
  <a href="Ziheng-He-CV-${zh ? 'en' : 'zh'}.html">${zh ? 'English' : '中文'}</a>
  <a href="../">${zh ? '个人主页' : 'Homepage'}</a>
  <p>${zh ? '可在浏览器编辑后保存 HTML；长期维护请修改 cv/content.json。打印：A4、100% 缩放、关闭页眉页脚。' : 'Edit in your browser and save the HTML. For lasting updates, edit cv/content.json. Print: A4, 100% scale, no headers or footers.'}</p>
</nav>
<main class="sheet">
 <div class="document" contenteditable="false">
  <header class="cv-header">
   <div class="header-main"><div class="header-copy">
   <h1>${escape(d.name)}</h1><span class="secondary-name">${escape(d.nameSecondary)}</span>
   <p class="role">${escape(d.role)}</p>
   <p class="affiliation">${escape(d.affiliation)}</p>
   <div class="contacts">${link('mailto:' + data.email, data.email)} ${link(data.website)} ${link(data.github)}</div>
   </div><img class="portrait" src="${images.get(data.portrait)}" alt="${escape(d.name)}" contenteditable="false"></div>
   <p class="interests">${escape(d.interests)}</p>
  </header>
  <section><h2>${escape(d.headings.education)}</h2>${education}</section>
  <section><h2>${escape(d.headings.publications)}</h2>${publications}</section>
  <section><h2>${escape(d.headings.experience)}</h2>${experience}</section>
  <section><h2>${escape(d.headings.projects)}</h2>${projects}</section>
 </div>
 <footer class="footer"><span>${escape(d.name)} · ${zh ? '学术简历' : 'Academic CV'}</span><span>${escape(d.updatedLabel)} · 1</span></footer>
</main>
<script>
const doc = document.querySelector('.document');
document.querySelector('#edit').addEventListener('click', event => {
  const enabled = doc.contentEditable !== 'true';
  doc.contentEditable = String(enabled);
  event.currentTarget.textContent = enabled ? '${zh ? '完成编辑' : 'Finish editing'}' : '${zh ? '编辑文字' : 'Edit text'}';
  if (enabled) doc.focus();
});
document.querySelector('#print').addEventListener('click', () => window.print());
document.querySelector('#save').addEventListener('click', () => {
  const clone = document.documentElement.cloneNode(true);
  clone.querySelector('.document').contentEditable = 'false';
  clone.querySelector('#edit').textContent = '${zh ? '编辑文字' : 'Edit text'}';
  clone.querySelectorAll('a[href]').forEach(a => a.href = new URL(a.getAttribute('href'), document.baseURI).href);
  const url = URL.createObjectURL(new Blob(['<!doctype html>\\n' + clone.outerHTML], {type:'text/html;charset=utf-8'}));
  const a = document.createElement('a'); a.href = url; a.download = 'Ziheng-He-CV-${lang}-edited.html'; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
</script>
</body></html>\n`;
  await writeFile(new URL(`cv/Ziheng-He-CV-${lang}.html`, root), html);
  console.log(`Built cv/Ziheng-He-CV-${lang}.html`);
}
