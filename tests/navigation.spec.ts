import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
	test('navigates from Home to About', async ({ page }) => {
		await page.goto('/');

		await expect(page).toHaveTitle('Home');

		// Click the About link
		await page.getByRole('link', { name: 'About' }).click();

		await expect(page).toHaveTitle('About');
		await expect(page.getByRole('heading', { name: 'About this app' })).toBeVisible();
	});

	test('navigates back from About to Home', async ({ page }) => {
		await page.goto('/about');

		await expect(page).toHaveTitle('About');

		// Click the Home link
		await page.getByRole('link', { name: 'Home' }).click();

		await expect(page).toHaveTitle('Home');
	});

	test('Home link has active state on home page', async ({ page }) => {
		await page.goto('/');

		const homeLink = page.getByRole('link', { name: 'Home' });
		const listItem = homeLink.locator('..');
		await expect(listItem).toHaveAttribute('aria-current', 'page');
	});

	test('About link has active state on about page', async ({ page }) => {
		await page.goto('/about');

		const aboutLink = page.getByRole('link', { name: 'About' });
		const listItem = aboutLink.locator('..');
		await expect(listItem).toHaveAttribute('aria-current', 'page');
	});
});
