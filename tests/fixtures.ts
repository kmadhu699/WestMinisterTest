import { test as base, expect } from "@playwright/test";
import { ReportStreetVendorsPage } from "../src/pages/ReportStreetVendorsPage";

type Fixtures = {
  useNewReportForm: ReportStreetVendorsPage;
};

export const test = base.extend<Fixtures>({
  useNewReportForm: async ({ page }, use) => {
    const reportPage = new ReportStreetVendorsPage(page);
    await reportPage.goto();
    await reportPage.acceptCookies();
    await reportPage.startNewForm();
    await use(reportPage);
  },
});

export { expect };
