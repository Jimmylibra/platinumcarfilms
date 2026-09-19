const { chromium } = require('C:/Users/Jamal/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const URL = 'http://127.0.0.1:5173/mock/index.html';
const OUT = 'J:/Home Cloud/Movies/platinum-ppf/platinumcarfilms/output/mock-preview/sections';

const sections = [
  { slug: 'header-nav', selector: '.header' },
  { slug: 'hero', selector: '#home' },
  { slug: 'stats', selector: '#stats' },
  { slug: 'profile', selector: '#profile' },
  { slug: 'banners', selector: '#banners' },
  { slug: 'material', selector: '#material' },
  { slug: 'comparison', selector: '#comparison' },
  { slug: 'audience', selector: '#audience' },
  { slug: 'faq', selector: '#faq' },
  { slug: 'partners', selector: '#partners' },
  { slug: 'contact', selector: '#contact' },
  { slug: 'footer', selector: '.site-footer' },
];

const devices = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

(async () => {
  const browser = await chromium.launch();

  for (const device of devices) {
    const page = await browser.newPage({ viewport: { width: device.width, height: device.height } });
    await page.goto(URL, { waitUntil: 'networkidle' });
    // This is a client-facing deliverable, not a dev QA capture -- hide the
    // dev-only design-preview widget (motion toggle / replay hero) so it
    // doesn't bleed into every section screenshot.
    await page.addStyleTag({ content: '.preview-tools{display:none!important}' });

    // Trigger all reveal-on-scroll / lazy-load / IntersectionObserver effects
    // for real, the same way a visitor scrolling down the page would.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.85;
      for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);

    for (const s of sections) {
      const loc = page.locator(s.selector).first();
      await loc.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      await loc.screenshot({ path: `${OUT}/${device.name}-${s.slug}.png` });
      console.log(`${device.name} - ${s.slug} done`);
    }

    // Quote dialog open state
    await page.locator('.contact [data-quote-trigger]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    const box = await page.locator('.contact [data-quote-trigger]').boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(300);
    // The dialog scrolls internally (max-height + overflow-y:auto) so an
    // element screenshot only grabs the scrolled-to-top viewport of it,
    // cutting off the submit button below the fold. Temporarily lift that
    // cap just for this capture so the reference shows the whole form.
    await page.evaluate(() => {
      const d = document.querySelector('#quoteDialog');
      d.style.maxHeight = 'none';
      d.style.overflow = 'visible';
    });
    await page.waitForTimeout(100);
    await page.locator('#quoteDialog').screenshot({ path: `${OUT}/${device.name}-quote-dialog.png` });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);

    await page.close();
  }

  await browser.close();
  console.log('ALL DONE');
})();
