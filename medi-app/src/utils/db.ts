
import mongoose from "mongoose";

const connectDB = async (dbUri: string) => {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log("Conexión a la base de datos establecida");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1); 
  }
};

export default connectDB;
