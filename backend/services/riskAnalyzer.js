function analyzeRisk(token) {

  let risk = 0;
  const reasons = [];

  if ((token.liquidity || 0) < 5000) {
    risk += 30;
    reasons.push("Faible liquidité");
  }

  if ((token.marketCap || 0) < 20000) {
    risk += 20;
    reasons.push("Faible market cap");
  }

  if ((token.volume24h || 0) < 5000) {
    risk += 20;
    reasons.push("Faible volume");
  }

  if ((token.holders || 0) < 50) {
    risk += 15;
    reasons.push("Peu de holders");
  }

  if (token.mint && token.mint.endsWith("pump")) {
    risk += 5;
  }

  let level = "LOW";

  if (risk >= 70)
    level = "HIGH";
  else if (risk >= 40)
    level = "MEDIUM";

  return {
    score: risk,
    level,
    reasons
  };
}

module.exports = {
  analyzeRisk
};
