

async function loadTopTokens(){

    try{

        const res =
        await fetch("/api/top");


        const data =
        await res.json();


        const container =
        document.getElementById("tokens");


        if(!container)
            return;


        container.innerHTML="";


        data.tokens.forEach(token=>{


            const card =
            document.createElement("div");


            card.className="token-card";


            card.innerHTML = `

            <h3>
            🪙 ${token.mint}
            </h3>

            <p>
            💎 Gem:
            ${token.gemScore || 0}/100
            </p>


            <p>
            🌐 Community:
            ${token.socialScore || 0}/100
            </p>


            <p>
            🚀 Opportunity:
            ${token.opportunityScore || 0}/100
            </p>


            <p>
            Status:
            ${token.opportunityStatus || "WAIT"}
            </p>

            `;

            container.appendChild(card);

        });


    }catch(e){

        console.log(
        "Dashboard error:",
        e.message
        );

    }

}


setInterval(
    loadTopTokens,
    5000
);


loadTopTokens();

