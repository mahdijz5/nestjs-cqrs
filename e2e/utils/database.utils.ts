import mongoose from "mongoose";


export const cleanupDatabase = async () => {
    await mongoose.connect("mongodb://localhost:27017/ddd", {})

    const collections = await mongoose.connection.db.collections();
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
};

export const disconnectDb = async () => {
    await mongoose.disconnect( )
};
