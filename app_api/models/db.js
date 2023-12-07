const mongoose = require('mongoose');
const uri = "mongodb+srv://Michelle:Password123@cluster0.9dhdd22.mongodb.net/gtr";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, dbName: "cars" });
        console.log('Database Connected');
    } catch (error) {
        console.error(error);
    }
};

const closeMongoDBConnection = async () => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB!");
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    connectToMongoDB,
    closeMongoDBConnection,
    mongoose,
};
