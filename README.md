# Ballot Proposal Neutrality Analyzer

A web application that analyzes the language used in NYC's 2025 ballot proposals and evaluates how neutral the language is, providing ratings from "very neutral" to "not neutral".

## Features

- Analyzes all 6 NYC 2025 ballot proposals
- Provides neutrality scores (0-100)
- Three-tier rating system:
  - **Very Neutral** (75-100): Language is factual and unbiased
  - **Meh** (50-74): Somewhat neutral with minor bias indicators
  - **Not Neutral** (0-49): Contains loaded language or persuasive framing
- Detailed analysis with reasons for each rating
- Beautiful, modern UI with expandable details

## How It Works

The analyzer evaluates text for:
- Loaded/emotive language (positive or negative)
- Persuasive techniques
- Superlatives
- Repetition patterns
- Neutral framing indicators

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
├── src/
│   ├── data/
│   │   └── ballotProposals.js    # Ballot proposal data
│   ├── utils/
│   │   └── neutralityAnalyzer.js # Neutrality analysis logic
│   ├── App.jsx                    # Main app component
│   ├── App.css                    # App styles
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Data Source

Ballot proposal text sourced from the official NYC Charter Revision Commission document:
[2025 NYC Charter Revision Commission - Adopted Final Report (PDF)](https://www.nyc.gov/assets/charter/downloads/pdf/2025/7-21-2025-charter-revision-commission-adopted-final-report-digital.pdf)

## Deployment

This app can be easily deployed to the internet using several platforms:

### Option 1: Vercel (Recommended - Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Vercel will auto-detect Vite settings - just click "Deploy"
5. Your app will be live in seconds!

**Or use Vercel CLI:**
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in with GitHub
3. Click "New site from Git" and select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

**Or use Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Option 3: GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run: `npm run deploy`

### Option 4: Cloudflare Pages

1. Push your code to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
3. Connect your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Deploy!

## License

MIT

