import React, { useState, useEffect } from 'react';
import { getInventory, createInventory, updateInventory } from '../../api/inventory';
import toast, { Toaster } from 'react-hot-toast';
import DynamicTable from '../../components/utils/DynamicTable';

export default function Inventory() {
  const [inventario, setInventario] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState(0);

  useEffect(() => {
    fetchInventario();
  }, []);

  const fetchInventario = async () => {
    try {
      const data = await getInventory();
      setInventario(data);
    } catch (error) {
      toast.error('Error al obtener el inventario');
    }
  };

  const handleCreateInventario = async (e) => {
    e.preventDefault();
    try {
      await createInventory({ nombre, descripcion, cantidad });
      toast.success('Medicamento de muestra agregado al inventario exitosamente!');
      fetchInventario();
      setNombre('');
      setDescripcion('');
      setCantidad(0);
    } catch (error) {
      toast.error('Error al agregar la muestra al inventario');
    }
  };

  const handleReduceQuantity = async (id, cantidad) => {
    try {
      await updateInventory(id, { cantidad });
      toast.success('Cantidad actualizada exitosamente');
      fetchInventario();
    } catch (error) {
      toast.error('Error al actualizar la cantidad');
    }
  };

  const columns = [
    { field: 'nombre', header: 'Nombre de muestra' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'cantidad', header: 'Cantidad', body: (rowData) => (
      <div className="flex align-items-center">
        <span>{rowData.cantidad}</span>
        <button
          className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-3 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none ml-2"
          onClick={() => handleReduceQuantity(rowData._id, rowData.cantidad - 1)}
          disabled={rowData.cantidad <= 0}
        >
          <i className="fas fa-minus"></i>
        </button>
      </div>
    ) },
  ];

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <h6 className="text-blueGray-700 text-xl font-bold">Inventario</h6>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={handleCreateInventario}>
          <div className="flex flex-wrap mt-3">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Nombre de muestra
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required
                />
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Descripción
                </label>
                <input
                  type="text"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required
                />
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Cantidad
                </label>
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(parseInt(e.target.value))}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
            >
              Agregar a inventario
            </button>
          </div>
        </form>
        <div className="mt-6">
          <DynamicTable data={inventario} columns={columns} name="InventarioMedicamentos" />
        </div>
      </div>
    </div>
  );
}