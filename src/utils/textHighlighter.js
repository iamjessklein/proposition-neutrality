/**
 * Highlights positive and negative words in text
 */

// Words/phrases that indicate positive/loaded language
const positiveWords = [
  'fast-track', 'fast track', 'fast', 'modernize', 'increase', 'improve', 'enhance',
  'boost', 'expand', 'build more', 'better', 'best', 'excellent', 'great',
  'success', 'win', 'protect', 'secure', 'strengthen', 'empower', 'create',
  'consolidate', 'consolidated', 'digital', 'simplify', 'simplifies', 'delivering',
  'maintain', 'significantly reducing', 'reducing', 'more affordable', 'significantly',
  'faster', 'fast tracks', 'fast tracks applications'
];

// Words/phrases that indicate negative/loaded language
const negativeWords = [
  'reject', 'oppose', 'dangerous', 'harmful', 'threat', 'crisis', 'fail', 
  'disaster', 'corrupt', 'waste', 'unfair', 'unjust', 'attack', 'destroy',
  'eliminate', 'ban', 'restrict', 'limit', 'reduce', 'cut', 'slash', 'longer review',
  'leaves', 'subject to', 'unchanged', 'separate', 'least', 'leaves affordable',
  'leaves these', 'leaves in place', 'longer', 'rejects', 'reject or change'
];

/**
 * Highlights words in text and returns an array of text parts with their types
 */
export function highlightText(text) {
  if (!text || typeof text !== 'string') {
    return [{ text, type: 'normal' }];
  }

  const matches = [];

  // Find positive word matches
  positiveWords.forEach(word => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // For phrases, don't use word boundaries
    const pattern = word.includes(' ') 
      ? new RegExp(escaped, 'gi')
      : new RegExp(`\\b${escaped}\\b`, 'gi');
    
    let match;
    while ((match = pattern.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
        type: 'positive'
      });
    }
  });

  // Find negative word matches
  negativeWords.forEach(word => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // For phrases, don't use word boundaries
    const pattern = word.includes(' ') 
      ? new RegExp(escaped, 'gi')
      : new RegExp(`\\b${escaped}\\b`, 'gi');
    
    let match;
    while ((match = pattern.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
        type: 'negative'
      });
    }
  });

  // Sort matches by position
  matches.sort((a, b) => a.start - b.start);

  // Remove overlapping matches (keep earlier matches, prioritize negative over positive if they overlap)
  const nonOverlapping = [];
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const overlaps = nonOverlapping.some(existing => 
      (current.start < existing.end && current.end > existing.start)
    );
    if (!overlaps) {
      nonOverlapping.push(current);
    }
  }

  // Build the result array
  const result = [];
  let currentIndex = 0;

  nonOverlapping.forEach(match => {
    // Add text before the match
    if (match.start > currentIndex) {
      result.push({
        text: text.substring(currentIndex, match.start),
        type: 'normal'
      });
    }

    // Add the highlighted match (preserve original casing)
    result.push({
      text: text.substring(match.start, match.end),
      type: match.type
    });

    currentIndex = match.end;
  });

  // Add remaining text
  if (currentIndex < text.length) {
    result.push({
      text: text.substring(currentIndex),
      type: 'normal'
    });
  }

  // If no matches, return the whole text as normal
  if (result.length === 0) {
    result.push({ text, type: 'normal' });
  }

  return result;
}

