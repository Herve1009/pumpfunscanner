import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Radar,
  Bell,
  Star,
  History,
  User,
  Settings,
} from "lucide-react";

export default function MainLayout() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/",
    },
    {
      name: "Scanner",
      icon: <Radar size={20} />,
      path: "/scanner",
    },
    {
      name: "Signaux",
      icon: <Bell size={20} />,
      path: "/signals",
    },
    {
      name: "Favoris",
      icon: <Star size={20} />,
      path: "/favorites",
    },
    {
      name: "Historique",
      icon: <History size={20} />,
      path: "/history",
    },
    {
      name: "Profil",
      icon: <User size={20} />,
      path: "/profile",
    },
    {
      name: "Paramètres",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0f172a",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          background: "#111827",
          padding: "20px",
          borderRight: "1px solid #1f2937",
        }}
      >
        <h2
          style={{
            color: "#22c55e",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          PumpFunScanner
        </h2>

        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              marginBottom: "8px",
              borderRadius: "8px",
              textDecoration: "none",
              color:
                location.pathname === item.path ? "#22c55e" : "#e5e7eb",
              background:
                location.pathname === item.path
                  ? "#1f2937"
                  : "transparent",
              transition: "0.2s",
            }}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </aside>

      {/* Contenu */}
      <main
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <header
          style={{
            marginBottom: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>PumpFunScanner</h1>
            <p style={{ color: "#9ca3af", marginTop: "5px" }}>
              Scanner intelligent de tokens Solana
            </p>
          </div>

          <div
            style={{
              background: "#22c55e",
              padding: "10px 18px",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
          >
            FREE
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
