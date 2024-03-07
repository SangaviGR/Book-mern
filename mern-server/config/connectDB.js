const mongoose = require('mongoose');

const connectionString = process.env.DB_URL;
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL).then((con) => {
            console.log('MongoDB connected to host:'+con.connection.host)
        })
    } catch (error) {
        console.log("Mongodb connection FAIL ");
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;
