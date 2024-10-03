import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/ecommerce", {});
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB", error);
        process.exit(1); // Detener la aplicación si no se puede conectar a la base de datos
    }
};

export default connectDB;