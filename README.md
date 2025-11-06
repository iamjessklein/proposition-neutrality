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

Ballot proposal information sourced from:
[NYC Votes - 2025 Ballot Proposals](https://www.nycvotes.org/whats-on-the-ballot/2025-general-election/2025-ballot-proposals/)

## License

MIT

