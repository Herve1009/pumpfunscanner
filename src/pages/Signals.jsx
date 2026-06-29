import { useEffect, useState } from "react";
import axios from "axios";

export default function Signals() {
  const [signals, setSignals] = useState([]);

  async function loadSignals() {
    try {
      const res = await axios.get(
        "https://pumpscannerpro.onrender.com/api/signals"
      );

      if (res.data.success) {
        setSignals(res.data.signals);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadSignals();

    const timer = setInterval(loadSignals, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>

      <h2 style={{ marginBottom: 25 }}>
        📡 Signaux Temps Réel
      </h2>

      {signals.map((signal) => (

        <div
          key={signal.id}
          style={{
            background: "#1e293b",
            padding: 20,
            borderRadius: 12,
            marginBottom: 15,
          }}
        >

          <h3>{signal.symbol}</h3>

          <p>
            Score IA : <b>{signal.score}</b>
          </p>

          <p>
            Signal :
            <span
              style={{
                color:
                  signal.type === "BUY"
                    ? "#22c55e"
                    : "#f59e0b",
                marginLeft: 10,
              }}
            >
              {signal.type}
            </span>
          </p>

          <p>
            Risque : {signal.risk}
          </p>

        </div>

      ))}

    </div>
  );
}
