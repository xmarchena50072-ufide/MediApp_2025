import dotenv from "dotenv";
import app from "./app";
import connectDB from "./utils/db";

dotenv.config(); // Cargar variables de entorno

const PORT = process.env.PORT || 4000;
const DB_URI = process.env.DB_URI || "";

const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDB(DB_URI);

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1); // Detener la aplicación si algo falla
  }
};

startServer();
