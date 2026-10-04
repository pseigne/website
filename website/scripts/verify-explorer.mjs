import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const url = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';
await mkdir('.portfolio-checks', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const [width, theme] of [[320,'light'],[375,'dark'],[768,'light'],[1440,'light'],[1440,'dark']]) {
    const context = await browser.newContext({viewport:{width,height:1000},colorScheme:theme,reducedMotion:'reduce'});
    const page = await context.newPage();
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto(`${url}/#/links`);
    await page.getByRole('heading',{name:'Coder Cards',exact:true}).waitFor();
    assert.equal(await page.locator('iframe').count(),0,'Previews load only when selected');
    if(width<768) await page.getByRole('button',{name:'Projects'}).click();
    const nav=page.getByRole('navigation',{name:'Browse projects'});
    assert.equal(await nav.getByRole('link').count(),11);
    assert.deepEqual(await nav.locator('h2').allTextContents(),['Web Apps','Websites','Data Analysis','Writing']);
    await nav.getByRole('link',{name:'Time Progress',exact:true}).click();
    await page.getByRole('heading',{name:'Time Progress',exact:true}).waitFor();
    if(width<768) assert.equal(await page.locator('#project-directory').isVisible(),false);
    await page.getByRole('link',{name:'Try app',exact:true}).click();
    await page.locator('iframe').waitFor();
    assert.match(page.url(),/links\/time-progress\/app$/);
    assert.equal(await page.getByRole('link',{name:'Open separately'}).getAttribute('href'),'/time-progress-visualizer/');
    await page.screenshot({path:`.portfolio-checks/explorer-${width}-${theme}.png`,fullPage:true});
    // Return to the case study and audit the portfolio's navigation rather than third-party embedded apps.
    await page.getByRole('link',{name:'Case study',exact:true}).click();
    await page.waitForURL('**/#/links/time-progress');
    assert.equal(await page.locator('iframe').count(),1,'Visited preview remains mounted');
    await page.locator('.explorer-preview').waitFor({state:'hidden'});
    assert.equal(await page.locator('.explorer-preview').isVisible(),false);
    const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    assert.deepEqual(audit.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),[],`${width}/${theme} accessibility`);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${width}/${theme} overflow`);
    if(width<768){
      await page.getByRole('button',{name:'Projects'}).click();
      await page.keyboard.press('Escape');
      assert.equal(await page.getByRole('button',{name:'Projects'}).evaluate(el=>el===document.activeElement),true);
    }
    assert.deepEqual(errors,[]);
    console.log(`PASS explorer ${width}px ${theme}: navigation, routes, lazy previews, accessibility`);
    await context.close();
  }
  const page=await browser.newPage();
  await page.goto(`${url}/#/links/running-utilities/app`);
  const frame=page.frameLocator('iframe[title="Running Utilities: Try app"]').frameLocator('iframe[title="Weekly Mileage Planner"]');
  await frame.locator('#goal-mileage').waitFor();
  const input=frame.locator('#goal-mileage');
  await input.fill('77');
  await page.getByRole('navigation',{name:'Browse projects'}).getByRole('link',{name:'TFRRS Monitor'}).click();
  await page.getByRole('link',{name:'Try app',exact:true}).click();
  await page.getByRole('navigation',{name:'Browse projects'}).getByRole('link',{name:'Running Utilities'}).click();
  await page.getByRole('link',{name:'Try app',exact:true}).click();
  assert.equal(await input.inputValue(),'77','Input retained across project switching');
  for(const path of ['/syllabus-analyzer/','/ncaa-indoor-qualification/','/time-progress-visualizer/','/documents/resource-allocation.pdf','/documents/song-duration.pdf','/documents/spanish-inquisition.pdf','/documents/resource-allocation-analysis.html']){
    const response=await page.request.get(url+path);
    assert.equal(response.status(),200,path);
    assert.ok(!response.headers()['content-type']?.includes('text/html')||path.endsWith('/')||path.endsWith('.html'),path);
  }
  console.log('PASS embedded app input persistence and hosted project/document URLs');
} finally { await browser.close(); }
