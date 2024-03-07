const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/connectDB');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
dotenv.config({path: path.join(__dirname,'config','config.env')})


connectDB();

// middleware ---- as we post orders the req.body is undefined as we do't say it's json data

app.use(express.json()); //takes the req and sets it into the body
app.use(cors());
// app.use(cors({
//     origin:["http://localhost:3000",]
// }));


app.use('/api/v1/books',require("./routes/bookRoutes")); // have this before products path
// app.use('/api/v1/',orders); // have this before orders path

// error handle
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Serever listening to Port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});

