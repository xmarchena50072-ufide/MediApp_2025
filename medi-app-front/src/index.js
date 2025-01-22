import React from "react";
import ReactDOM from "react-dom/client"; // Cambiar a react-dom/client para React 18
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";

// layouts
import Admin from "layouts/Admin.js";
import User from "layouts/User.js";
import Auth from "layouts/Auth.js";

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";

// AuthProvider
import { AuthProvider } from "context/AuthContext";

// Crear el root container con React 18
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PrimeReactProvider value={{ pt: Tailwind }}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas con layouts */}
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/auth/*" element={<Auth />} />

          {/* Rutas sin layouts */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Landing />} />

          {/* Redirección para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
