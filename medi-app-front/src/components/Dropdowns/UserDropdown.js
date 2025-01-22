import React, { useState, useRef } from "react";
import { createPopper } from "@popperjs/core";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef(null);
  const popoverDropdownRef = useRef(null);
  const navigate = useNavigate();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
        {
          name: "preventOverflow",
          options: {
            boundary: "viewport", // Limita el área de despliegue
          },
        },
      ],
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem("token");
    // Redirigir al login
    navigate("/auth/login");
  };

  return (
    <>
      {/* Botón de usuario */}
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="User"
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={"assets/img/team-1-800x800.jpg"}
              onError={(e) => {
                e.target.onerror = null; // Evita loops infinitos
                e.target.src = "https://via.placeholder.com/150"; // Imagen de respaldo
              }}
            />
          </span>
        </div>
      </a>

      {/* Dropdown */}
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
        style={{
          maxWidth: "200px", // Ancho máximo fijo
          overflowY: "auto", // Solo scroll vertical
        }}
      >
        <a
          href="#logout"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
