export async function completeWelcome(page){
 for(let i=0;i<2;i++){
  await page.locator('[data-action=welcome-open]').click();
  await page.locator('[data-action=welcome-next]').click();
 }
 for(let i=0;i<6;i++)await page.locator('[data-action=welcome-toggle]').nth(i).click();
 await page.locator('[data-action=welcome-finish]').click();
}
