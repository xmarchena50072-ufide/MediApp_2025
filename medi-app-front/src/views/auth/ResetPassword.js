import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPasswordRequest } from '../../api/authv2';
import toast, { Toaster } from 'react-hot-toast';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [countdown, setCountdown] = useState(5);

  const onSubmit = handleSubmit(async (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    try {
      await resetPasswordRequest(token, values.password);
      toast.success('Contraseña restablecida exitosamente');
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        navigate('/auth/login');
      }, 5000);
    } catch (error) {
      toast.error(error.message || 'Error al restablecer la contraseña');
    }
  });

  return (
    <div className="container mx-auto px-4 h-full">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <h6 className="text-blueGray-500 text-sm font-bold">Restablecer Contraseña</h6>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={onSubmit}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Nueva Contraseña</label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Nueva Contraseña"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">La contraseña es obligatoria</p>}
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Confirmar Contraseña</label>
                  <input
                    type="password"
                    {...register("confirmPassword", { required: true })}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Confirmar Contraseña"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">La confirmación de la contraseña es obligatoria</p>}
                </div>
                <div className="text-center mt-6">
                  <button className="bg-blueGray-800 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full ease-linear transition-all duration-150" type="submit">
                    Restablecer
                  </button>
                </div>
              </form>
              {countdown < 5 && (
                <p className="text-blueGray-600 text-center mt-4">
                  Redirigiendo al inicio de sesión en {countdown} segundos...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}