import { useState } from 'react'
import { ballotProposals } from './data/ballotProposals'
import { analyzeNeutrality, getRatingInfo } from './utils/neutralityAnalyzer'
import { highlightText } from './utils/textHighlighter'
import './App.css'

function App() {
  const [analyses, setAnalyses] = useState(() => {
    // Analyze all proposals on mount
    return ballotProposals.map(proposal => ({
      ...proposal,
      analysis: analyzeNeutrality(proposal.fullText)
    }))
  })

  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Ballot Proposal Neutrality Analyzer</h1>
        <p className="subtitle">
          Analyzing language neutrality in NYC's 2025 ballot proposals
        </p>
      </header>

      <div className="proposals-container">
        {analyses.map((proposal) => {
          const ratingInfo = getRatingInfo(proposal.analysis.rating)
          const isExpanded = expandedId === proposal.id

          return (
            <div key={proposal.id} className="proposal-card">
              <div className="proposal-header">
                <div className="proposal-number">Proposal {proposal.id}</div>
                <div 
                  className={`rating-badge rating-${proposal.analysis.rating.replace(' ', '-')}`}
                  style={{ backgroundColor: ratingInfo.color }}
                >
                  <span className="rating-emoji">{ratingInfo.emoji}</span>
                  <span className="rating-label">{ratingInfo.label}</span>
                </div>
              </div>

              <h2 className="proposal-title">{proposal.title}</h2>
              
              <div className="score-display">
                <div className="score-bar-container">
                  <div 
                    className="score-bar"
                    style={{ 
                      width: `${proposal.analysis.score}%`,
                      backgroundColor: ratingInfo.color
                    }}
                  />
                </div>
                <div className="score-text">
                  Neutrality Score: <strong>{proposal.analysis.score}/100</strong>
                </div>
              </div>

              <p className="proposal-description">{proposal.description}</p>

              <div className="details-section">
                <h3>Full Proposal Text:</h3>
                <div className="highlighted-text">
                  {highlightText(proposal.fullText).map((part, idx) => {
                    if (part.type === 'positive') {
                      return <span key={idx} className="highlight-positive">{part.text}</span>;
                    } else if (part.type === 'negative') {
                      return <span key={idx} className="highlight-negative">{part.text}</span>;
                    } else {
                      return <span key={idx}>{part.text}</span>;
                    }
                  })}
                </div>
                <div className="highlight-legend">
                  <span className="legend-item">
                    <span className="legend-color legend-positive"></span>
                    Positive/loaded language
                  </span>
                  <span className="legend-item">
                    <span className="legend-color legend-negative"></span>
                    Negative/loaded language
                  </span>
                </div>
              </div>

              <button 
                className="expand-button"
                onClick={() => toggleExpand(proposal.id)}
              >
                {isExpanded ? 'Hide' : 'Show'} Analysis Details
              </button>

              {isExpanded && (
                <div className="analysis-details">
                  <div className="details-section">
                    <h3>Rating: {ratingInfo.label}</h3>
                    <p className="rating-description">{ratingInfo.description}</p>
                  </div>

                  <div className="details-section">
                    <h3>Analysis Reasons:</h3>
                    <ul className="reasons-list">
                      {proposal.analysis.reasons.map((reason, idx) => (
                        <li key={idx}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <footer className="footer">
        <p>
          This tool analyzes language patterns to assess neutrality. 
          Results are based on automated text analysis and should be used as a guide.
        </p>
        <p className="source-link">
          Source: <a 
            href="https://www.nycvotes.org/whats-on-the-ballot/2025-general-election/2025-ballot-proposals/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            NYC Votes - 2025 Ballot Proposals
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App

