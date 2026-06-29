import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Scanner from "./pages/Scanner";
import Signals from "./pages/Signals";
import Favorites from "./pages/Favorites";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="scanner" element={<Scanner />} />
          <Route path="signals" element={<Signals />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
