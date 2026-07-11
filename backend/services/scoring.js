function calculateScore(token) {
  let score = 0;

  // Liquidité
  if (token.liquidity >= 100000) score += 25;
  else if (token.liquidity >= 50000) score += 15;
  else if (token.liquidity >= 10000) score += 5;

  // Nombre de holders
  if (token.holders >= 1000) score += 20;
  else if (token.holders >= 500) score += 10;
  else if (token.holders >= 100) score += 5;

  // Market Cap
  if (token.marketCap >= 1000000) score += 20;
  else if (token.marketCap >= 250000) score += 10;

  // Volume 24h
  if (token.volume24h >= 500000) score += 20;
  else if (token.volume24h >= 100000) score += 10;

  // Âge du token
  if (token.ageMinutes <= 30) score += 15;
  else if (token.ageMinutes <= 120) score += 8;

  if (score > 100) score = 100;

  return score;
}

function getSignal(score) {
  if (score >= 90) return "STRONG BUY";
  if (score >= 75) return "BUY";
  if (score >= 50) return "WATCH";
  return "IGNORE";
}

module.exports = {
  calculateScore,
  getSignal,
};
