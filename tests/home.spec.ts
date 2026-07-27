import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
	test('loads and shows navigation', async ({ page }) => {
		await page.goto('/');

		await expect(page).toHaveTitle('Home');

		// Navigation links
		await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
	});

	test('renders Perspective viewer', async ({ page }) => {
		await page.goto('/');

		// Wait for Perspective viewer custom element to render
		const viewer = page.locator('perspective-viewer');
		await viewer.waitFor({ state: 'attached', timeout: 15000 });

		// Verify the custom element is in the DOM and has size (layout applied)
		await expect(viewer).toBeVisible({ timeout: 15000 });
		const box = await viewer.boundingBox();
		expect(box).not.toBeNull();
		expect(box!.width).toBeGreaterThan(0);
		expect(box!.height).toBeGreaterThan(0);

		// Verify data was loaded by checking the viewer has content
		const children = await viewer.evaluate(
			(el) => el.shadowRoot?.querySelectorAll('*').length ?? 0
		);
		expect(children).toBeGreaterThan(0);
	});

	test('shows footer links', async ({ page }) => {
		await page.goto('/');

		await expect(
			page.getByRole('link', { name: 'kit.svelte.dev' })
		).toBeVisible();
		await expect(
			page.getByRole('link', { name: 'perspective.finos.org' })
		).toBeVisible();
	});
});
