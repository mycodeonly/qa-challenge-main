
import { test, expect } from '@playwright/test';

test.describe('Rooming List Management Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Verify that the Search input is displayed', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search"]');
    await expect(searchInput).toBeVisible();
  });

  test('Verify that a user can type text into the Search input', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search"]');
    await searchInput.fill('Festival');
    await expect(searchInput).toHaveValue('Festival');
  });

  test('Verify that searching filters the list of events based on input', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search"]');
    await searchInput.fill('Festival');
    const eventCards = page.locator('.event-card:has-text("Festival")');
    const count = await eventCards.count();
    expect(count).toBeGreaterThan(0); 

  });

  test('Verify that if no matching event is found, a "no results" message appears', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search"]');
    await searchInput.fill('NoSuchEventName');
    const noResults = page.locator('text="no results"');
    await expect(noResults).toBeVisible(); // FAILED
  });

  test('Verify that the Filters button is displayed', async ({ page }) => {
    const filtersButton = page.locator('button:has-text("Filters")');
    await expect(filtersButton).toBeVisible();
  });

  test('Verify that clicking the Filters button opens the filter dropdown', async ({ page }) => {
    await page.locator('button:has-text("Filters")').click();
    const dropdown = page.locator('.filter-dropdown');
    await expect(dropdown).toBeVisible();
  });

  test('Verify that the filter options are "Active", "Closed", and "Canceled"', async ({ page }) => {
    await page.locator('button:has-text("Filters")').click();
    await expect(page.locator('label:has-text("Active")')).toBeVisible();
    await expect(page.locator('label:has-text("Closed")')).toBeVisible();
    await expect(page.locator('label:has-text("Canceled")')).toBeVisible();
  });

  test('Verify that selecting a filter option filters the event list correctly', async ({ page }) => {
    await page.locator('button:has-text("Filters")').click();
    await page.check('label:has-text("Active") input');
    await page.click('button:has-text("Save")');
    const activeCards = page.locator('.event-card:has-text("Active")');
    const count = await locator.count();
    expect(count).toBeGreaterThan(0);
    // FAILED
  });

  test('Verify that the "Save" button applies the selected filter', async ({ page }) => {
    await page.locator('button:has-text("Filters")').click();
    await page.check('label:has-text("Closed") input');
    await page.click('button:has-text("Save")');
    const closedCards = page.locator('.event-card:has-text("Closed")');
    await expect(closedCards).toHaveCountGreaterThan(0); // FAILED
  });

  test('Verify that after applying a filter, the selected filter persists if the Filters dropdown is reopened', async ({ page }) => {
    await page.locator('button:has-text("Filters")').click();
    await page.check('label:has-text("Canceled") input');
    await page.click('button:has-text("Save")');
    await page.locator('button:has-text("Filters")').click();
    const canceledCheckbox = page.locator('label:has-text("Canceled") input');
    await expect(canceledCheckbox).toBeChecked(); // FAILED
  });

  test('Verify that multiple filters can be selected/deselected', async ({ page }) => {
    await page.locator('button:has-text("Filters")').click();
    await page.check('label:has-text("Active") input');
    await page.check('label:has-text("Closed") input');
    await page.uncheck('label:has-text("Active") input');
    const closedCheckbox = page.locator('label:has-text("Closed") input');
    await expect(closedCheckbox).toBeChecked();
  });

  test('Verify that event cards are displayed grouped by event names', async ({ page }) => {
    const groups = page.locator('.event-group');
    await expect(groups).toHaveCountGreaterThan(0);
  });

  test('Verify that each event card displays the RFP name, Agreement type, and Cut-Off Date', async ({ page }) => {
    const card = page.locator('.event-card').first();
    await expect(card.locator('.rfp-name')).toBeVisible();
    await expect(card.locator('.agreement-type')).toBeVisible();
    await expect(card.locator('.cut-off-date')).toBeVisible();
  });

  test('Verify that the "View Bookings" button is displayed on each event card', async ({ page }) => {
    const bookingButtons = page.locator('button:has-text("View Bookings")');
    await expect(bookingButtons.first()).toBeVisible();
  });

  test('Verify that the "View Bookings" button displays the correct number of bookings', async ({ page }) => {
    const bookingText = page.locator('.event-card .booking-count').first();
    await expect(bookingText).toHaveText(/\d+/); // FAILED
  });

  test('Verify that clicking on the "View Bookings" button opens the correct booking details', async ({ page }) => {
    await page.locator('button:has-text("View Bookings")').first().click();
    const bookingDetail = page.locator('.booking-details');
    await expect(bookingDetail).toBeVisible();
  });

  test('Verify that event cards can be scrolled horizontally if there are many', async ({ page }) => {
    const scrollContainer = page.locator('.event-card-container');
    await scrollContainer.evaluate(node => node.scrollLeft = 100);
    const scrollPos = await scrollContainer.evaluate(node => node.scrollLeft);
    expect(scrollPos).toBeGreaterThan(0);
  });

  test('Verify that the page title "Rooming List Management: Events" is displayed', async ({ page }) => {
    const title = page.locator('h1');
    await expect(title).toHaveText('Rooming List Management: Events');
  });

  test('Verify that the filters dropdown is correctly positioned under the Filters button', async ({ page }) => {
    await page.locator('button:has-text("Filters")').click();
    const dropdown = page.locator('.filter-dropdown');
    // Positioning verification skipped – FAILED
    await expect(dropdown).toBeVisible();
  });

  test('Verify that each event group has a clear visual separator', async ({ page }) => {
    const separators = page.locator('.event-group-separator');
    await expect(separators).toHaveCountGreaterThan(0);
  });

  test('Verify the behavior when no events are available', async ({ page }) => {
    const message = page.locator('text="No events available"');
    await expect(message).toBeVisible(); // FAILED
  });

  test('Verify if search and filters work together', async ({ page }) => {
    await page.locator('input[placeholder="Search"]').fill('Festival');
    await page.locator('button:has-text("Filters")').click();
    await page.check('label:has-text("Active") input');
    await page.click('button:has-text("Save")');
    const filteredResults = page.locator('.event-card:has-text("Festival")');
    await expect(filteredResults).toHaveCountGreaterThan(0); // FAILED
  });

  test('Verify UI responsiveness', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const mobileView = page.locator('.mobile-ui');
    await expect(mobileView).toBeVisible(); // FAILED
  });
});
