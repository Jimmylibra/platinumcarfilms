const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/Jamal/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'output/visual-reference');
fs.mkdirSync(out, {recursive:true});
const entries = JSON.parse(fs.readFileSync(path.join(root,'react-app/public/content/index.json')));
entries.push({route:'/?s=film',title:'Search results'},{route:'/not-a-real-page/',title:'Not found'});
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
(async()=>{
const browser = await chromium.launch({headless:true});
const manifest=[];
for(const device of [{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844}]){
 const page=await browser.newPage({viewport:{width:device.width,height:device.height},deviceScaleFactor:1});
 const wire=await browser.newPage({viewport:{width:device.width,height:device.height},deviceScaleFactor:1});
 for(const entry of entries){
  const slug=entry.route==='/'?'home':entry.route.includes('?')?'search':entry.route.replace(/^\/|\/$/g,'').replaceAll('/','__');
  const dir=path.join(out,slug,device.name);fs.mkdirSync(dir,{recursive:true});
  await page.goto('http://127.0.0.1:5173'+entry.route,{waitUntil:'networkidle'});
  await page.locator('.replica-loading').waitFor({state:'detached'});
  await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))});
  await page.addStyleTag({content:'*{animation:none!important;transition:none!important;scroll-behavior:auto!important}'});
  await page.evaluate(()=>window.scrollTo(0,0));
  const data=await page.evaluate(()=>{
   const W=innerWidth,H=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
   const visible=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>1&&r.height>1&&s.display!=='none'&&s.visibility!=='hidden'};
   const box=e=>{const r=e.getBoundingClientRect();return {x:Math.max(0,r.x),y:Math.max(0,r.y+scrollY),w:Math.min(r.width,W-Math.max(0,r.x)),h:r.height}};
   let candidates=[...document.querySelectorAll('.replica-header,.page-title,.wpb-content-wrapper > .vc_section,.wpb-content-wrapper > .vc_row,article,.replica-utility,footer,.copyrights-wrapper')].filter(visible);
   candidates=candidates.filter(e=>!(e.matches('article')&&e.querySelector('.vc_section,.vc_row')));
   candidates=candidates.filter(e=>!candidates.some(p=>p!==e&&p.contains(e)));
   if(!candidates.some(e=>e.closest('main'))) {const m=document.querySelector('main');if(m&&visible(m))candidates.push(m)}
   candidates.sort((a,b)=>a.getBoundingClientRect().y-b.getBoundingClientRect().y);
   const sections=candidates.map((e,i)=>({...box(e),label:e.matches('header')?'Navigation':e.matches('footer')?'Footer':e.querySelector('h1,h2,h3')?.textContent.trim()||e.classList.contains('page-title')?'': ''}));
   candidates.forEach((e,i)=>sections[i].label=e.matches('header')?'Navigation':e.matches('footer')?'Footer':e.querySelector('h1,h2,h3')?.textContent.trim()||e.textContent.trim().replace(/\s+/g,' ').slice(0,75)||`Section ${i+1}`);
   const blocks=[...document.querySelectorAll('h1,h2,h3,h4,p,img,button,input,textarea,select,table,summary,a,li')].filter(visible).filter(e=>!e.parentElement.closest('table,button,summary')&&!e.closest('svg')).map(e=>({...box(e),type:e.tagName.toLowerCase(),text:(e.alt||e.innerText||e.getAttribute('aria-label')||e.getAttribute('placeholder')||e.tagName).trim().replace(/\s+/g,' ').slice(0,110),font:parseFloat(getComputedStyle(e).fontSize)})).filter(b=>b.w>0);
   const colors={};const fonts={};for(const e of document.querySelectorAll('body *')){if(!visible(e))continue;const s=getComputedStyle(e);for(const k of ['color','backgroundColor','borderTopColor']){const v=s[k];if(v&&v!=='rgba(0, 0, 0, 0)'){const key=k+'|'+v;colors[key]=(colors[key]||0)+1}}fonts[s.fontFamily]=(fonts[s.fontFamily]||0)+1}
   return {width:W,height:H,sections,blocks,colors,fonts,overflow:document.documentElement.scrollWidth>W};
  });
  await page.screenshot({path:path.join(dir,'appearance.png'),fullPage:true});
  let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${data.width}" height="${data.height}"><rect width="100%" height="100%" fill="#fff"/>`;
  for(const s of data.sections)svg+=`<rect x="1" y="${s.y}" width="${data.width-2}" height="${s.h}" fill="#fafafa" stroke="#a1a1aa" stroke-dasharray="7 5"/>`;
  for(const b of data.blocks){
   if(b.type==='img'){svg+=`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="#e4e4e7" stroke="#a1a1aa"/><path d="M${b.x},${b.y} l${b.w},${b.h} M${b.x+b.w},${b.y} l${-b.w},${b.h}" stroke="#c4c4cc"/>`;}
   else if(['input','textarea','select','button','table','summary'].includes(b.type)){svg+=`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="3" fill="#eeeef0" stroke="#999"/><text x="${b.x+6}" y="${b.y+Math.min(20,b.h-3)}" font-family="Arial" font-size="12" fill="#444">${esc(b.text.slice(0,Math.max(4,Math.floor(b.w/7))))}</text>`;}
   else {const lineH=Math.max(10,Math.min(b.font*1.35,48));const n=Math.min(12,Math.max(1,Math.round(b.h/lineH)));for(let i=0;i<n;i++)svg+=`<rect x="${b.x}" y="${b.y+i*lineH+3}" width="${Math.max(1,b.w*(i===n-1?.7:.95))}" height="${Math.min(lineH*.45,16)}" rx="2" fill="${/^h/.test(b.type)?'#52525b':'#bcbcc4'}"/>`;}
  }
  svg+='</svg>';fs.writeFileSync(path.join(dir,'wireframe.svg'),svg);
  await wire.setContent(`<html><body style="margin:0">${svg}</body></html>`);await wire.screenshot({path:path.join(dir,'wireframe.png'),fullPage:true});
  const record={route:entry.route,title:entry.title,slug,device:device.name,...data};delete record.blocks;manifest.push(record);
  fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2));
  console.log(`${device.name}: ${slug} (${data.sections.length} sections)`);
 }
 await page.close();await wire.close();
}
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

