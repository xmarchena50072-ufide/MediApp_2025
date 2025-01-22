import  { useContext } from "react";
import { useForm } from "react-hook-form";
import { loginUser, getUserInfo } from "../../api/authv2";
import { useNavigate, Link  } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const data = await loginUser(values);
      localStorage.setItem("token", data.token);
      toast.success("Inicio de sesión exitoso");
      const dataUser = await getUserInfo(data.token);
      if (dataUser.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user/profile");
      }
    } catch (error) {
      toast.error(error.message || "Error al iniciar sesión");
    }
  });

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={onSubmit}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Correo Electrónico</label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Correo Electrónico"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">El correo es obligatorio</p>}
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Contraseña</label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Contraseña"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">La contraseña es obligatoria</p>}
                  <span className="text-blueGray-500 text-sm">
                    <Link to="/auth/forgot-password">
                      ¿Olvidaste tu contraseña?
                    </Link>
                </span>
                </div>
                <div className="text-center mt-6">
                  <button className="bg-blueGray-800 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full ease-linear transition-all duration-150" type="submit">
                    Iniciar Sesión
                  </button>
                </div>
                <div className="mt-6 flex justify-between items-center">
                <span className="text-blueGray-500 text-sm">
                  ¿No tienes cuenta?{" "}
                  <Link to="/auth/register" className="text-lightBlue-500">
                    Regístrate
                  </Link>
                </span>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
