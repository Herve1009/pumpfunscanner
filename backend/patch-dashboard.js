const fs = require("fs");

const file = "public/app.js";

const code = `

async function loadTopTokens(){

    try {

        const response = await fetch("/api/top");

        const data = await response.json();

        const container =
            document.getElementById("tokens");

        if(!container) return;


        container.innerHTML = "";


        data.tokens.forEach(token => {

            const row = document.createElement("div");

            row.className = "token-card";


            row.innerHTML = \`
                <h3>\${token.mint}</h3>

                <p>
                💎 Gem Score:
                \${token.gemScore || 0}
                </p>

                <p>
                🌐 Social:
                \${token.socialScore || 0}
                </p>

                <p>
                🚨 Alert:
                \${token.alert?.level || "NONE"}
                </p>
            \`;

            container.appendChild(row);

        });


    } catch(error){

        console.log(
            "Dashboard API error:",
            error.message
        );

    }

}


setInterval(
    loadTopTokens,
    5000
);


loadTopTokens();

`;

fs.writeFileSync(file, code);

console.log("✅ Dashboard app.js mis à jour");
