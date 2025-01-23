import React from "react";
import ReactDOM from "react-dom/client"; // Cambiar a react-dom/client para React 18
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider, locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions  } from "primereact/api";
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

const value = {
  locale: 'es',
  pt: Tailwind
};

addLocale('es', {
  firstDayOfWeek: 1,
  dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  today: 'Hoy',
  clear: 'Limpiar',
  startsWith: 'Empieza con',
  contains: 'Contiene',
  notContains: 'No contiene',
  endsWith: 'Termina con',
  equals: 'Igual',
  notEquals: 'No igual',
  noFilter: 'Sin filtro',
});
    

root.render(
  <React.StrictMode>
    <PrimeReactProvider value={value}>
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
