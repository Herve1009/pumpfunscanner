import { useEffect, useState } from "react";
import axios from "axios";

export default function Scanner() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadTokens() {
    try {
      const response = await axios.get(
        "https://pumpscannerpro.onrender.com/api/signals"
      );

      if (response.data.success) {
        setTokens(response.data.signals);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadTokens();
  }, []);

  return (
    <div>

      <h2 style={{ marginBottom: 25 }}>
        🚀 Scanner Temps Réel
      </h2>

      {loading ? (
        <h3>Chargement...</h3>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#1e293b",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <thead
            style={{
              background: "#111827",
            }}
          >
            <tr>
              <th style={{ padding: 15 }}>Token</th>
              <th>Score</th>
              <th>Signal</th>
              <th>Risque</th>
            </tr>
          </thead>

          <tbody>
            {tokens.map((token) => (
              <tr
                key={token.id}
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid #374151",
                }}
              >
                <td style={{ padding: 15 }}>
                  {token.symbol}
                </td>

                <td>{token.score}</td>

                <td
                  style={{
                    color:
                      token.type === "BUY"
                        ? "#22c55e"
                        : "#f59e0b",
                  }}
                >
                  {token.type}
                </td>

                <td>{token.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}
