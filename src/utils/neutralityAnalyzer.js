/**
 * Analyzes text for neutrality by detecting:
 * - Loaded/emotive language
 * - Biased framing
 * - Persuasive techniques
 * - Factual vs. opinion language
 */

// Words/phrases that indicate bias or loaded language
const loadedLanguage = {
  negative: [
    'reject', 'oppose', 'dangerous', 'harmful', 'threat', 'crisis', 'fail', 
    'disaster', 'corrupt', 'waste', 'unfair', 'unjust', 'attack', 'destroy',
    'eliminate', 'ban', 'restrict', 'limit', 'reduce', 'cut', 'slash'
  ],
  positive: [
    'fast-track', 'fast', 'modernize', 'increase', 'improve', 'enhance',
    'boost', 'expand', 'build more', 'better', 'best', 'excellent', 'great',
    'success', 'win', 'protect', 'secure', 'strengthen', 'empower'
  ],
  persuasive: [
    'must', 'should', 'need to', 'have to', 'critical', 'essential', 
    'urgent', 'immediate', 'now', 'quickly', 'rapidly', 'immediately'
  ],
  superlative: [
    'most', 'best', 'worst', 'greatest', 'lowest', 'highest', 'largest',
    'smallest', 'biggest', 'fastest', 'slowest'
  ]
};

// Neutral framing indicators
const neutralIndicators = [
  'would', 'could', 'may', 'might', 'proposal', 'would allow', 'would create',
  'would make', 'would change', 'would move', 'would require'
];

/**
 * Calculate neutrality score (0-100, where 100 is most neutral)
 */
export function analyzeNeutrality(text) {
  if (!text || typeof text !== 'string') {
    return { score: 0, rating: 'not neutral', reasons: ['Invalid text input'] };
  }

  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);
  const wordCount = words.length;
  
  let biasScore = 0;
  const reasons = [];
  
  // Check for loaded negative language
  const negativeMatches = loadedLanguage.negative.filter(word => 
    lowerText.includes(word)
  );
  if (negativeMatches.length > 0) {
    biasScore += negativeMatches.length * 15;
    reasons.push(`Contains negative/loaded language: ${negativeMatches.join(', ')}`);
  }
  
  // Check for loaded positive language
  const positiveMatches = loadedLanguage.positive.filter(word => 
    lowerText.includes(word)
  );
  if (positiveMatches.length > 0) {
    biasScore += positiveMatches.length * 12;
    reasons.push(`Contains positive/loaded language: ${positiveMatches.join(', ')}`);
  }
  
  // Check for persuasive language
  const persuasiveMatches = loadedLanguage.persuasive.filter(word => 
    lowerText.includes(word)
  );
  if (persuasiveMatches.length > 0) {
    biasScore += persuasiveMatches.length * 10;
    reasons.push(`Contains persuasive language: ${persuasiveMatches.join(', ')}`);
  }
  
  // Check for superlatives
  const superlativeMatches = loadedLanguage.superlative.filter(word => 
    lowerText.includes(word)
  );
  if (superlativeMatches.length > 0) {
    biasScore += superlativeMatches.length * 8;
    reasons.push(`Contains superlatives: ${superlativeMatches.join(', ')}`);
  }
  
  // Check for neutral framing (reduces bias score)
  const neutralMatches = neutralIndicators.filter(phrase => 
    lowerText.includes(phrase)
  );
  if (neutralMatches.length > 0) {
    biasScore -= neutralMatches.length * 5;
  }
  
  // Check for repetition (can indicate emphasis/bias)
  const wordFrequency = {};
  words.forEach(word => {
    const cleanWord = word.replace(/[^\w]/g, '');
    if (cleanWord.length > 3) {
      wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
    }
  });
  
  const repeatedWords = Object.entries(wordFrequency)
    .filter(([_, count]) => count > 2)
    .map(([word, _]) => word);
  
  if (repeatedWords.length > 0) {
    biasScore += repeatedWords.length * 3;
    if (repeatedWords.length > 2) {
      reasons.push(`Excessive repetition of words: ${repeatedWords.slice(0, 3).join(', ')}`);
    }
  }
  
  // Normalize score (0-100 scale, inverted so higher = more neutral)
  const normalizedScore = Math.max(0, Math.min(100, 100 - biasScore));
  
  // Determine rating
  let rating;
  if (normalizedScore >= 90) {
    rating = 'very neutral';
  } else if (normalizedScore >= 80) {
    rating = 'neutral';
  } else {
    rating = 'not neutral';
  }
  
  // If no specific reasons found, add a neutral reason
  if (reasons.length === 0) {
    reasons.push('Language appears relatively neutral and factual');
  }
  
  return {
    score: Math.round(normalizedScore),
    rating,
    reasons,
    biasScore: Math.round(biasScore)
  };
}

/**
 * Get rating display info
 */
export function getRatingInfo(rating) {
  const ratings = {
    'very neutral': {
      label: 'Very Neutral',
      color: '#10b981',
      emoji: '✓',
      description: 'Language is factual and unbiased (90-100)'
    },
    'neutral': {
      label: 'Neutral',
      color: '#3b82f6',
      emoji: '→',
      description: 'Generally neutral with some minor bias indicators (80-89)'
    },
    'not neutral': {
      label: 'Not Neutral',
      color: '#ef4444',
      emoji: '⚠',
      description: 'Contains loaded language or persuasive framing (0-79)'
    }
  };
  
  return ratings[rating] || ratings['neutral'];
}

