import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const chrome = process.env.CHROME_PATH || (process.platform === 'darwin' && existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome') ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined);
const browser = await chromium.launch({headless: true, ...(chrome ? {executablePath: chrome} : {})});
await mkdir(new URL('tmp/cv-preview/', root), {recursive: true});
const results = [];
try {
  for (const lang of ['en', 'zh']) {
    const page = await browser.newPage({viewport: {width: 1000, height: 1250}, deviceScaleFactor: 1});
    await page.goto(new URL(`cv/Ziheng-He-CV-${lang}.html`, root).href);
    await page.emulateMedia({media: 'print'});
    await page.evaluate(() => document.fonts.ready);
    const metrics = await page.evaluate(() => {
      const sheet = document.querySelector('.sheet');
      const doc = document.querySelector('.document');
      const s = getComputedStyle(sheet);
      const available = sheet.clientHeight - parseFloat(s.paddingTop) - parseFloat(s.paddingBottom);
      const overflow = [...doc.querySelectorAll('*')].filter(el => el.getBoundingClientRect().right > doc.getBoundingClientRect().right + 1).map(el => el.textContent);
      return {fill: Math.round(doc.getBoundingClientRect().height / available * 100), height: doc.getBoundingClientRect().height, available, horizontalOverflow: overflow, overlapsFooter: doc.getBoundingClientRect().bottom > document.querySelector('.footer').getBoundingClientRect().top - 8};
    });
    if (metrics.fill > 100 || metrics.overlapsFooter || metrics.horizontalOverflow.length) throw new Error(`${lang} CV layout overflow: ${JSON.stringify(metrics)}`);
    await page.pdf({path: fileURLToPath(new URL(`cv/Ziheng-He-CV-${lang}.pdf`, root)), printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false});
    await page.locator('.sheet').screenshot({path: fileURLToPath(new URL(`tmp/cv-preview/${lang}.png`, root))});
    results.push({lang, ...metrics});
    await page.close();
  }
  await writeFile(new URL('tmp/cv-preview/layout.json', root), JSON.stringify(results, null, 2) + '\n');
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
