import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDbUrl = process.env.MONGODB_URL_STRING as string;

if (!mongoDbUrl) {
  console.error("Error: MONGODB_URL_STRING no está definido en el archivo .env");
  process.exit(1);
}

export default (async () => {
  try {
    await mongoose.connect(mongoDbUrl);
    console.log("Conexion exitosa");
  } catch (err) {
    console.log("Error al conectar a MongoDB ", err);
    process.exit(1);
  }
})();
