import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { forgotPasswordRequest } from '../../api/authv2';
import toast, { Toaster } from 'react-hot-toast';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [emailSent, setEmailSent] = useState(false);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await forgotPasswordRequest(values.email);
      toast.success('Correo de restablecimiento de contraseña enviado');
      setEmailSent(true);
    } catch (error) {
      toast.error(error.message || 'Error al enviar el correo de restablecimiento de contraseña');
    }
  });

  return (
    <div className="container mx-auto px-4 h-full">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <h6 className="text-blueGray-500 text-sm font-bold">
                {emailSent ? 'Restablecer contraseña' : 'Recuperar Contraseña'}
              </h6>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              {emailSent ? (
                <p className="text-blueGray-600 text-center">
                  Por favor revisa la bandeja de entrada de tu correo para restablecer la contraseña.
                </p>
              ) : (
                <form onSubmit={onSubmit}>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      {...register('email', { required: true })}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Correo Electrónico"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">El correo es obligatorio</p>
                    )}
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}