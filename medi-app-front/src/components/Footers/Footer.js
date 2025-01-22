import React from "react";
import drImage from "../../assets/img/drMarlon.jpg"

export default function Footer() {
  return (
    <>
      <footer className="relative bg-blueGray-200 pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            {/* Imagen */}
            <div className="w-full lg:w-4/12 px-4 text-center">
              <img
                src={drImage}// Cambia este enlace por el enlace real de la imagen
                alt="Dr. Marlon Jiménez"
                className="rounded-full mx-auto"
                style={{ width: "150px", height: "150px" }}
              />
            </div>
            {/* Información */}
            <div className="w-full lg:w-8/12 px-4">
              <h4 className="text-3xl font-semibold">Dr. Marlon Jiménez R.</h4>
              <p className="text-lg mt-2 text-blueGray-600">
                Médico General y Especialista en Medicina Estética.
              </p>
              <p className="text-md text-blueGray-600">
                Hospital La Católica, Teléfono: 2246-3393
              </p>
              <p className="text-md text-blueGray-600">
                Médico de Empresa - CCSS
              </p>
              <p className="text-md text-blueGray-600">
                Contacto:{" "}
                <a href="tel:+50689116033" className="text-blue-500">
                  +506 8911-6033
                </a>
              </p>
              <p className="text-md text-blueGray-600">
                Ubicación: Guadalupe, San José, Costa Rica
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center px-4 mt-6">
          <div className="w-full flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.816681904716!2d-84.06148682402753!3d9.949205473904732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e47d57bfdbd5%3A0xbd8efb4b06725e69!2sHospital%20Internacional%20La%20Cat%C3%B3lica!5e0!3m2!1ses-419!2scr!4v1736931568145!5m2!1ses-419!2scr"
              style={{ border: 0 }}
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación"
            ></iframe>
          </div>
          </div>
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center justify-center">
            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                © {new Date().getFullYear()} Todos los derechos reservados.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
