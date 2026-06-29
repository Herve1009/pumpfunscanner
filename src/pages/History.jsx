export default function History() {

    const history = [
        {
            id: 1,
            token: "PUMPX",
            score: 98,
            signal: "BUY",
            date: "28/06/2026 20:30"
        },
        {
            id: 2,
            token: "MOON",
            score: 94,
            signal: "BUY",
            date: "28/06/2026 20:15"
        },
        {
            id: 3,
            token: "DOGSOL",
            score: 83,
            signal: "WATCH",
            date: "28/06/2026 20:00"
        }
    ];

    return (
        <div>

            <h2 style={{ marginBottom: 25 }}>
                📜 Historique des scans
            </h2>

            <table
                style={{
                    width: "100%",
                    background: "#1e293b",
                    borderCollapse: "collapse",
                    borderRadius: 12,
                    overflow: "hidden"
                }}
            >

                <thead
                    style={{
                        background: "#111827"
                    }}
                >
                    <tr>
                        <th style={{ padding: 15 }}>Token</th>
                        <th>Score</th>
                        <th>Signal</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>

                    {history.map((item) => (

                        <tr
                            key={item.id}
                            style={{
                                textAlign: "center",
                                borderBottom: "1px solid #374151"
                            }}
                        >

                            <td style={{ padding: 15 }}>
                                {item.token}
                            </td>

                            <td>{item.score}</td>

                            <td
                                style={{
                                    color:
                                        item.signal === "BUY"
                                            ? "#22c55e"
                                            : "#f59e0b"
                                }}
                            >
                                {item.signal}
                            </td>

                            <td>{item.date}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );

}
