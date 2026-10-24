# Kite Reports — P&L Observatory

A no-build, static HTML5 + JavaScript dashboard for Zerodha Kite P&L workbooks stored in `reports/`.

## Features

- Discovers `.xlsx`, `.xls` and `.csv` files from the public repository's `reports/` folder using the GitHub Contents API.
- Parses Zerodha workbook summary rows such as **Charges**, **Realized P&L**, **Unrealized P&L**, and **Other Credit & Debit** rather than mistaking the **Realized P&L Pct.** column for rupee P&L.
- Displays report coverage, report-level P&L and charges, date periods, a report comparison chart, filters, and CSV export.
- Allows local workbooks to be imported for the current browser session. Local files are not uploaded.
- Responsive desktop and mobile layout.

## Deploy on GitHub Pages

1. Open [Repository Pages settings](https://github.com/SuhasVJ/kite-reports/settings/pages).
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose branch **main** and folder **/(root)**, then click **Save**.
4. After GitHub publishes the site, open https://suhasvj.github.io/kite-reports/.

The `index.html` file is in the repository root, so there is no build step.

## Add future reports

1. Upload a new Kite Excel report to the existing `reports/` folder.
2. Commit the file to `main`.
3. Open or refresh the dashboard. It rediscovers report files at refresh time, so no hardcoded file list needs maintenance.

The source reports must be publicly readable for a public GitHub Pages site to read them. Never commit API keys, access tokens, or other secrets.

## Run locally

Open `index.html` in a browser with internet access. If the browser blocks network requests from a local file, run a static server in the repository folder:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Reading the figures

- **P&L before charges** is the workbook summary's Realized P&L plus Unrealized P&L.
- **Charges & taxes** uses the workbook summary's Charges row when available.
- **Estimated after charges** is calculated as reported realized + unrealized P&L, minus summary Charges, plus the signed Other Credit & Debit amount when present. Treat this as an estimate and reconcile against the source report; do not use as a tax statement.
- Figures are report-level sums. If multiple workbooks cover overlapping dates or are snapshots for different segments/periods, summing them together will double-count activity. Use the period shown per report and inspect the original workbook before drawing a financial-year conclusion.
- Reports with unknown formats are marked **Needs review**. Zerodha notes that tradewise charges may not always equal summary charges, so the source report and Kite Console remain authoritative.

## Technology

HTML5, CSS, vanilla JavaScript, and SheetJS via CDN. Workbook parsing runs in the browser.
