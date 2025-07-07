import { Page, Route } from '@playwright/test';

export function mockSubmissionApi(
  page: Page,
  status: number = 200,
  response: Record<string, any> = { success: true }
) {
  page.route('**/report-it/street-vendors/submit', (route: Route) => {
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(response),
    });
  });
}