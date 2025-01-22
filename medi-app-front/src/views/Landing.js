import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/img/medicobg.jpg";
import { createAppointment } from "../api/appointments"; // Importa la función de tu API para crear citas
import toast, { Toaster } from "react-hot-toast";
// components
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Landing() {
  const [form, setForm] = useState({ titulo: "", fechaHora: "", descripcion: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createAppointment(form); // Llama a la API para crear la cita
      toast.success("Cita creada exitosamente.");
      setForm({ titulo: "", fechaHora: "", descripcion: "", email: "" }); // Resetea el formulario
    } catch (error) {
      toast.error("Esta hora se encuentra ocupada, porfavor selecciona otra");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Tu salud, nuestra prioridad
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    Brindando atención médica excepcional para ti y tu familia.
                    Tu bienestar es nuestra misión.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
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
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-user-md"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Médico calificado</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Nuestro equipo está formado por profesionales médicos experimentados y altamente calificados dedicados a tu cuidado.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fas fa-clinic-medical"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Instalaciones modernas</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Equipos e instalaciones de última generación para garantizar el mejor tratamiento y diagnóstico para nuestros pacientes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-heartbeat"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Atención integral</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Ofrecemos una amplia gama de servicios médicos para atender todas tus necesidades de salud.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Sección para agregar una cita */}
        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="w-full lg:w-8/12 px-4 mx-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
                <div className="rounded-t bg-blueGray-100 mb-0 px-6 py-6">
                  <h6 className="text-blueGray-700 text-xl font-bold">Agendar una Cita</h6>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Título
                          </label>
                          <input
                            type="text"
                            name="titulo"
                            value={form.titulo}
                            onChange={handleChange}
                            placeholder="Título"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Fecha y Hora
                          </label>
                          <input
                            type="datetime-local"
                            name="fechaHora"
                            value={form.fechaHora}
                            onChange={handleChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Informacion
                          </label>
                          <textarea
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            placeholder="Informacion de paciente"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            rows="4"
                            required
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-6">
                      <button
                        type="submit"
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                        disabled={loading}
                      >
                        {loading ? "Creando..." : "Agendar Cita"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
