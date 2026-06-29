export default function Favorites() {

    const favorites = [
        {
            symbol: "PUMPX",
            score: 98,
            volume: "$154K"
        },
        {
            symbol: "MOON",
            score: 95,
            volume: "$98K"
        },
        {
            symbol: "DOGSOL",
            score: 91,
            volume: "$71K"
        }
    ];

    return (

        <div>

            <h2 style={{ marginBottom: 25 }}>
                ⭐ Mes Favoris
            </h2>

            {favorites.map((token) => (

                <div
                    key={token.symbol}
                    style={{
                        background: "#1e293b",
                        padding: 20,
                        marginBottom: 15,
                        borderRadius: 12
                    }}
                >

                    <h3>{token.symbol}</h3>

                    <p>Score IA : {token.score}</p>

                    <p>Volume : {token.volume}</p>

                </div>

            ))}

        </div>

    );

}
