const fs = require("fs");

const file = "services/gemAnalyzer.js";

let code = fs.readFileSync(file, "utf8");

if (!code.includes("socialScore")) {

code = code.replace(
"let score = 0;",
`let score = 0;

// Social Intelligence bonus
if (data.socialScore) {
    score += Math.min(
        data.socialScore,
        25
    );
}`
);

fs.writeFileSync(file, code);

console.log("✅ Social Score connecté au Gem Analyzer");

} else {

console.log("ℹ️ Social Score déjà présent");

}
