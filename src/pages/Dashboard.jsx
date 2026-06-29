export default function Dashboard() {
  const stats = [
    { title: "Nouveaux Tokens", value: "128", color: "#22c55e" },
    { title: "Signaux BUY", value: "34", color: "#3b82f6" },
    { title: "Score IA", value: "91%", color: "#f59e0b" },
    { title: "Tokens scannés", value: "12548", color: "#ef4444" },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginBottom: 30,
        }}
      >
        {stats.map((item) => (
          <div
            key={item.title}
            style={{
              background: "#1e293b",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <h3>{item.title}</h3>
            <h1 style={{ color: item.color }}>{item.value}</h1>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "#1e293b",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <h3>Derniers tokens détectés</h3>

        <table style={{ width: "100%", marginTop: 20 }}>
          <thead>
            <tr>
              <th align="left">Token</th>
              <th align="left">Score</th>
              <th align="left">Signal</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>PUMPX</td>
              <td>98</td>
              <td style={{ color: "#22c55e" }}>BUY</td>
            </tr>

            <tr>
              <td>MOON</td>
              <td>95</td>
              <td style={{ color: "#22c55e" }}>BUY</td>
            </tr>

            <tr>
              <td>DOGSOL</td>
              <td>82</td>
              <td style={{ color: "#f59e0b" }}>WATCH</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
