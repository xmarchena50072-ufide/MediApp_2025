import React from "react";
import { useNavigate } from "react-router-dom";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import toast, { Toaster } from "react-hot-toast";
export default function Navbar() {
  const navigate = useNavigate(); // Correcta importación del hook

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem("token");
    // Redirigir al login
    navigate("/auth/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-bold uppercase text-xs px-6 py-2 rounded shadow hover:bg-red-600 hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
            >
              Cerrar Sesión
            </button>
          </ul>
        </div>
      </nav>
    </>
  );
}
