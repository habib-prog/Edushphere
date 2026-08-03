import mongoose from "mongoose";

const Database = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE);
    console.log(`🗄️ MongoDB connected to: -> ${connection.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default Database;
