import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    alert("Connexion bientôt connectée au backend");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={login}
        style={{
          width: 360,
          background: "#1e293b",
          padding: 30,
          borderRadius: 12,
        }}
      >
        <h1
          style={{
            color: "#22c55e",
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          PumpScannerPro
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 15,
            borderRadius: 8,
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 20,
            borderRadius: 8,
            border: "none",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 14,
            background: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
