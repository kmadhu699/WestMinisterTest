import { test, expect } from "./fixtures";

import { IssueType } from "../src/pages/ReportStreetVendorsPage";

import { streetVendorsReportData } from "./data/vendors-report-data";

test.describe("Report a street vendor issues using New form", () => {
  test("submit Unlicensed Street Seller Issue", async ({
    useNewReportForm,
    page,
  }) => {
    const reportPage = useNewReportForm;

    await reportPage.clickNext();
    await reportPage.selectIssue(IssueType.MarketPitch);
    await reportPage.fillDescription(streetVendorsReportData.description);
    await reportPage.clickNext();
    await reportPage.answerYesNo("Yes");
    await reportPage.clickNext();
    await reportPage.searchAddress(
      streetVendorsReportData.searchInput,
      streetVendorsReportData.suggestionOptions[0]
    );
    await reportPage.verifyAddress(streetVendorsReportData.searchInput);

    await reportPage.clickNext();
    await reportPage.answerYesNo("No");
    await reportPage.clickNext();
    await reportPage.answerYesNo("No");
    await reportPage.clickNext();

    await reportPage.waitForSpinnerToDisappear();

    await page.waitForURL("**/confirmation**", { timeout: 5_000 });

    const confirmation = await reportPage.getConfirmationText();
    expect(confirmation).toContain("Your report has been submitted");
  });
  test("submit Isolated Pitches Issue", async ({ useNewReportForm, page }) => {
    const reportPage = useNewReportForm;

    await reportPage.clickNext();
    await reportPage.selectIssue(IssueType.isolatedPitchs);
    await reportPage.fillDescription(streetVendorsReportData.description);
    await reportPage.clickNext();
    await reportPage.answerYesNo("Yes");
    await reportPage.clickNext();
    await reportPage.searchAddress(
      streetVendorsReportData.searchInput,
      streetVendorsReportData.suggestionOptions[0]
    );
    await reportPage.verifyAddress(streetVendorsReportData.searchInput);

    await reportPage.clickNext();
    await reportPage.answerYesNo("No");
    await reportPage.clickNext();
    await reportPage.answerYesNo("No");
    await reportPage.clickNext();

    await reportPage.waitForSpinnerToDisappear();

    await page.waitForURL("**/confirmation**");

    const confirmation = await reportPage.getConfirmationText();
    expect(confirmation).toContain("Your report has been submitted");
  });
});
