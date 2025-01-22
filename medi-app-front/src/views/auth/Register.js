import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../api/authv2";
import { useNavigate, Link  } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/admin");
  }, [navigate]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const data = await registerUser(values);
      localStorage.setItem("token", data.token);
      toast.success("Registro exitoso");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Error al registrar");
    }
  });

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">
                  Regístrate con
                </h6>
              </div>
              {/* Botones de terceros */}
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
                <small>O regístrate con tus credenciales</small>
              </div>
              <form onSubmit={onSubmit}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Nombre</label>
                  <input
                    type="text"
                    {...register("username", { required: true })}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Nombre"
                  />
                  {errors.username && <p className="text-red-500 text-sm mt-1">El nombre es obligatorio</p>}
                </div>
                {/* Correo */}
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Correo</label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Correo"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">El correo es obligatorio</p>}
                </div>
                {/* Contraseña */}
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Contraseña</label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Contraseña"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">La contraseña es obligatoria</p>}
                </div>
                <div className="text-center mt-6">
                  <button className="bg-blueGray-800 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full ease-linear transition-all duration-150" type="submit">
                    Crear Cuenta
                  </button>
                </div>
              </form>
              <div className="mt-6 flex justify-between items-center">
                <span className="text-blueGray-500 text-sm">
                  ¿Ya tienes cuenta?{" "}
                  <Link to="/auth/login" className="text-lightBlue-500">
                    Inicia sesión
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
