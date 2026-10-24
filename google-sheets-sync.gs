/**
 * Kite Reports -> Google Sheets sync.
 * Paste this into Extensions > Apps Script in the Google Sheet you want to use.
 * Replace CHANGE_ME_WITH_A_LONG_RANDOM_TOKEN before deploying.
 */
const SHARED_TOKEN = "CHANGE_ME_WITH_A_LONG_RANDOM_TOKEN";
const SHEET_NAME = "Recovery Updates";

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (!SHARED_TOKEN || SHARED_TOKEN === "CHANGE_ME_WITH_A_LONG_RANDOM_TOKEN" ||
        payload.token !== SHARED_TOKEN) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Updated at", "Reported estimated P&L after charges (INR)", "Loss baseline (INR)", "Reports loaded"]);
      sheet.setFrozenRows(1);
    }

    const reportedNet = Number(payload.reportedNetPnl);
    const lossBaseline = Number(payload.lossBaseline);
    const reportsLoaded = Number(payload.reportsLoaded);
    if (!Number.isFinite(reportedNet) || !Number.isFinite(lossBaseline) || !Number.isFinite(reportsLoaded)) {
      return jsonResponse({ ok: false, error: "Invalid numeric data" });
    }

    sheet.appendRow([new Date(), reportedNet, lossBaseline, reportsLoaded]);
    const row = sheet.getLastRow();
    sheet.getRange(row, 2, 1, 2).setNumberFormat('"₹"#,##0.00;[Red]-"₹"#,##0.00');
    return jsonResponse({ ok: true, row: row });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: "Kite Reports Sheets sync is running" });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
