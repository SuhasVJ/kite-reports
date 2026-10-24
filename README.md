# Kite Reports — P&L Observatory

A no-build, static HTML5 + JavaScript dashboard for the Excel P&L reports stored in `reports/`.

## Features

- Discovers `.xlsx`, `.xls` and `.csv` files from the public repository's `reports/` folder using GitHub's contents API.
- Parses Excel workbooks in the browser with SheetJS; no backend or GitHub token is used.
- Shows worksheet coverage, recognizable P&L values, identifiable charges, a report-level chart, filters, and CSV export.
- Allows local workbooks to be imported for the current browser session. Local files are not uploaded.
- Responsive desktop and mobile layout.

## Deploy on GitHub Pages

1. Open [Repository Settings](https://github.com/SuhasVJ/kite-reports/settings/pages).
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose branch **main** and folder **/(root)**, then click **Save**.
4. After GitHub publishes the site, open **https://suhasvj.github.io/kite-reports/**.

The `index.html` file is in the repository root, so there is no build step.

## Add future reports

1. Upload a new Kite Excel report to the existing `reports/` folder in this repository.
2. Commit the file to the `main` branch.
3. Open or refresh the dashboard. It re-queries GitHub for files each time, so you do not have to edit a hardcoded list.

The source reports must remain public for a public GitHub Pages site to read them. Never commit API keys, access tokens, or other secrets.

## Run locally

Open `index.html` in a browser with internet access. If the browser blocks network requests from a local file, run a static server in the repository folder:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## P&L interpretation notes

- Header matching is best-effort. Reports with unfamiliar column names appear as **Needs review**.
- Dashboard amounts are **report-level sums**, not a deduplicated financial-year total. If multiple exports cover overlapping dates, adding them will double-count activity. This is particularly important when reports are saved as numbered snapshots.
- Charges are totaled only when the report has a recognizable total-charge column or identifiable itemized charge columns. A report's P&L column may already include costs; verify column semantics in the workbook.
- Reconcile the results against Kite Console before relying on them for tax, accounting, or trading decisions.

## Technology

HTML5, CSS, vanilla JavaScript, and [SheetJS](https://sheetjs.com/) via CDN. Workbook parsing runs in your browser.
