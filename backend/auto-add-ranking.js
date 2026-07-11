const fs = require("fs");

const file = "server.js";

let code = fs.readFileSync(file, "utf8");

// Ajouter le require si absent
if (!code.includes('require("./routes/ranking")')) {
  code = code.replace(
    'const topRoutes = require("./routes/top");',
    `const topRoutes = require("./routes/top");
const rankingRoute = require("./routes/ranking");`
  );
}

// Ajouter app.use si absent
if (!code.includes('app.use("/api/ranking"')) {
  code = code.replace(
    'app.use("/api/top", topRoutes);',
    `app.use("/api/top", topRoutes);
app.use("/api/ranking", rankingRoute);`
  );
}

fs.writeFileSync(file, code);

console.log("✅ Route /api/ranking ajoutée automatiquement");
