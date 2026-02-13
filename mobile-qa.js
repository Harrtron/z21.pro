const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Test viewport 390x844 (iPhone 12 Pro)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:8888/index.html');
  await page.waitForTimeout(3000); // Wait for animations
  await page.screenshot({ path: 'mobile-qa-390x844.png', fullPage: true });
  console.log('✓ Screenshot captured: 390x844');

  // Test viewport 375x812 (iPhone X)
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload();
  await page.waitForTimeout(3000); // Wait for animations
  await page.screenshot({ path: 'mobile-qa-375x812.png', fullPage: true });
  console.log('✓ Screenshot captured: 375x812');

  await browser.close();
  console.log('\n✓ Mobile QA screenshots complete');
})();
