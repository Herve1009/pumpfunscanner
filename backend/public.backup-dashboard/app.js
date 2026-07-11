async function loadTokens() {

    try {

        const res = await fetch("/api/tokens");
        const data = await res.json();

        const tbody = document.getElementById("tokens");
        tbody.innerHTML = "";

        if (!data.success || !data.tokens) return;

        data.tokens.forEach(token => {

            let css = "ignore";

            if (token.signal === "WATCH")
                css = "watch";

            if (token.signal === "BUY")
                css = "buy";

            if (token.signal === "STRONG BUY")
                css = "strong";

            tbody.innerHTML += `
            <tr>
                <td>${token.symbol || "TOKEN"}</td>
                <td>${Number(token.price || 0).toFixed(8)}</td>
                <td>${Number(token.liquidity || 0).toLocaleString()}</td>
                <td>${Number(token.marketCap || 0).toLocaleString()}</td>
                <td>${token.score || 0}</td>
                <td class="${css}">${token.signal || "IGNORE"}</td>
            </tr>
            `;
        });

    } catch (err) {
        console.error(err);
    }
}

loadTokens();

setInterval(loadTokens, 5000);
