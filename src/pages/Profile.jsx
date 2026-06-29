export default function Profile() {

    return (

        <div>

            <h2 style={{ marginBottom: 25 }}>
                👤 Mon Profil
            </h2>

            <div
                style={{
                    background: "#1e293b",
                    padding: 25,
                    borderRadius: 12
                }}
            >

                <h3>PumpFunScanner</h3>

                <p>
                    Nom : Utilisateur
                </p>

                <p>
                    Email : utilisateur@email.com
                </p>

                <p>
                    Abonnement :
                    <span
                        style={{
                            color: "#22c55e",
                            marginLeft: 10
                        }}
                    >
                        FREE
                    </span>
                </p>

                <button
                    style={{
                        marginTop: 20,
                        background: "#22c55e",
                        border: "none",
                        color: "white",
                        padding: "12px 20px",
                        borderRadius: 8,
                        cursor: "pointer"
                    }}
                >
                    Passer en Premium
                </button>

            </div>

        </div>

    );

}
