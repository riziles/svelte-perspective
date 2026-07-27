import { test, expect } from '@playwright/test';

test.describe('About page', () => {
	test('loads and shows content', async ({ page }) => {
		await page.goto('/about');

		await expect(page).toHaveTitle('About');

		await expect(
			page.getByRole('heading', { name: 'About this app' })
		).toBeVisible();

		await expect(
			page.getByText('This is a')
		).toBeVisible();

		// The npm create command should be shown
		await expect(
			page.getByText('npm create svelte@latest')
		).toBeVisible();
	});

	test('shows footer links', async ({ page }) => {
		await page.goto('/about');

		await expect(
			page.getByRole('link', { name: 'kit.svelte.dev' })
		).toBeVisible();
		await expect(
			page.getByRole('link', { name: 'perspective.finos.org' })
		).toBeVisible();
	});
});
