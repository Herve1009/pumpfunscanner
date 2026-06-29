export default function Settings() {

    return (

        <div>

            <h2 style={{ marginBottom: 25 }}>
                ⚙️ Paramètres
            </h2>

            <div
                style={{
                    background: "#1e293b",
                    padding: 25,
                    borderRadius: 12
                }}
            >

                <h3>Préférences</h3>

                <p>Mode sombre : Activé</p>

                <p>Notifications Telegram : Désactivées</p>

                <p>Notifications Email : Activées</p>

                <p>Langue : Français</p>

                <button
                    style={{
                        marginTop: 20,
                        padding: "12px 20px",
                        border: "none",
                        borderRadius: 8,
                        background: "#22c55e",
                        color: "#fff",
                        cursor: "pointer"
                    }}
                >
                    Enregistrer
                </button>

            </div>

        </div>

    );

}
