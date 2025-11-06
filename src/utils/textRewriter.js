/**
 * Rewrites text to be more neutral by:
 * - Removing loaded/emotive language
 * - Replacing persuasive phrases with neutral alternatives
 * - Using more factual, objective language
 */

// Replacement mappings for loaded language (ordered by length, longest first)
const neutralReplacements = [
  // Multi-word phrases first
  ['fast track', 'expedite the review process for'],
  ['fast-track', 'expedite the review process for'],
  ['significantly reducing', 'reducing'],
  ['build more', 'allow for additional'],
  ['longer review', 'standard review process'],
  ['leaves affordable', 'maintains affordable'],
  ['leaves these', 'maintains these'],
  ['leaves in place', 'maintains'],
  ['reject or change', 'not approve or modify'],
  ['subject to', 'subject to'],
  ['more affordable', 'affordable'],
  
  // Single words
  ['significantly', ''],
  ['fast', 'expedited'],
  ['modernize', 'update'],
  ['increase', 'modify to allow for additional'],
  ['improve', 'modify'],
  ['enhance', 'modify'],
  ['boost', 'modify to allow for'],
  ['expand', 'modify to allow for additional'],
  ['better', 'different'],
  ['best', 'one option'],
  ['excellent', ''],
  ['great', ''],
  ['success', 'outcome'],
  ['win', 'outcome'],
  ['protect', 'address'],
  ['secure', 'establish'],
  ['strengthen', 'modify'],
  ['empower', 'allow'],
  ['create', 'establish'],
  ['creates', 'establishes'],
  ['consolidate', 'combine'],
  ['consolidated', 'combined'],
  ['digital', 'electronic'],
  ['simplify', 'streamline'],
  ['simplifies', 'streamlines'],
  ['delivering', 'providing'],
  ['reject', 'not approve'],
  ['rejects', 'does not approve'],
  ['oppose', 'not support'],
  ['dangerous', 'concerning'],
  ['harmful', 'potentially problematic'],
  ['threat', 'concern'],
  ['crisis', 'challenge'],
  ['fail', 'not succeed'],
  ['disaster', 'significant problem'],
  ['corrupt', 'problematic'],
  ['waste', 'inefficient use of'],
  ['unfair', 'potentially inequitable'],
  ['unjust', 'potentially inequitable'],
  ['attack', 'address'],
  ['destroy', 'remove'],
  ['eliminate', 'remove'],
  ['ban', 'prohibit'],
  ['restrict', 'limit'],
  ['limit', 'establish parameters for'],
  ['reduce', 'decrease'],
  ['cut', 'reduce'],
  ['slash', 'reduce'],
  ['leaves', 'maintains'],
  ['unchanged', 'as currently established'],
  ['separate', 'distinct'],
  ['least', 'fewest'],
  ['longer', 'standard'],
  ['must', 'would'],
  ['should', 'would'],
  ['need to', 'would'],
  ['have to', 'would'],
  ['critical', 'important'],
  ['essential', 'important'],
  ['urgent', 'timely'],
  ['immediate', 'prompt'],
  ['now', ''],
  ['quickly', 'in a timely manner'],
  ['rapidly', 'in a timely manner'],
  ['immediately', 'promptly'],
];

/**
 * Rewrites text to be more neutral
 */
export function rewriteForNeutrality(text) {
  if (!text || typeof text !== 'string') {
    return text;
  }

  let rewritten = text;
  
  // Apply replacements (already ordered by length, longest first)
  neutralReplacements.forEach(([original, replacement]) => {
    // Escape special regex characters
    const escaped = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // For multi-word phrases, don't use word boundaries
    // For single words, use word boundaries
    const hasSpace = original.includes(' ');
    const regex = hasSpace 
      ? new RegExp(escaped, 'gi')
      : new RegExp(`\\b${escaped}\\b`, 'gi');
    
    rewritten = rewritten.replace(regex, (match) => {
      // Preserve original case for first letter
      if (match[0] === match[0].toUpperCase()) {
        if (replacement.length > 0) {
          return replacement.charAt(0).toUpperCase() + replacement.slice(1);
        }
        return replacement;
      }
      return replacement;
    });
  });
  
  // Clean up extra spaces
  rewritten = rewritten.replace(/\s+/g, ' ').trim();
  
  // Remove double periods, commas, etc.
  rewritten = rewritten.replace(/\.\.+/g, '.');
  rewritten = rewritten.replace(/,,+/g, ',');
  rewritten = rewritten.replace(/\s+\./g, '.');
  rewritten = rewritten.replace(/\s+,/g, ',');
  
  // Fix "would would" or similar duplicates
  rewritten = rewritten.replace(/\b(would|maintains|establishes)\s+\1\b/gi, '$1');
  
  // Capitalize first letter
  if (rewritten.length > 0) {
    rewritten = rewritten.charAt(0).toUpperCase() + rewritten.slice(1);
  }
  
  return rewritten;
}

