import { Page, Locator, expect } from '@playwright/test';

export enum IssueType {
  UnlicensedStreetSeller = 'UnlicensedStreetSeller',
  Market= 'Market',
  MarketPitch = 'MarketPitch',
  isolatedPitchs = 'IsolatedPitch',
}

export class ReportStreetVendorsPage {
  readonly page: Page;
  readonly acceptCookiesBtn: Locator;
  readonly newFormCard: Locator;
  readonly nextBtn: Locator;
  readonly spinner: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesBtn = page.getByRole('button', { name: 'Accept cookies policy' });
    this.newFormCard = page.getByTestId('card-use-the-new-form');
    this.nextBtn = page.getByTestId('button-next');
    this.spinner = page.locator('[data-testid="spinner"]');
  }

  async goto() {
    await this.page.goto('/report-it/street-vendors');
  }

  async acceptCookies() {
    await this.acceptCookiesBtn.click();
  }

  async startNewForm() {
    await this.newFormCard.click();
  }

  async clickNext() {
    await this.nextBtn.click();
  }
  async selectIssue(issue: IssueType) {
    await this.page.getByTestId(issue).check();
  }


  async fillDescription(text: string) {
    await this.page.getByTestId('issue-description-textarea').fill(text);
  }

  async answerYesNo(answer: 'Yes' | 'No') {
    await this.page.getByTestId(answer).check();
  }


async searchAddress(searchInput: string, suggestionMatcher: string | RegExp) {
    const input = this.page.getByRole('textbox', { name: 'Search for an address or' });
    await input.fill(searchInput);
    await this.page.getByRole('option', { name: suggestionMatcher }).click();
  }

  
  async verifyAddress(expected: string | RegExp) {
    const mapDiv = this.page.getByTestId('map-display-address').locator('div');
    await expect(mapDiv).toContainText(expected);
  }

  async getConfirmationText(timeout = 10_000): Promise<string> {
    const mainContent = this.page.locator('#main-content');
    await mainContent.waitFor({ state: 'visible', timeout });
    return (await mainContent.innerText()).trim();
  }
  async waitForSpinnerToDisappear(timeout = 20_000) {
    await this.spinner.waitFor({ state: 'hidden', timeout });
  }

  }
