const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT | 5000;
const MONGO_URI = process.env.MONGO_URI || "";


// Middlewares.
app.use(express.json());


//Routes
app.get("/", (req, res) => {
    res.send("Bismillah")
});


// Connect to DB and Start  Server
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(PORT, () => {
        console.log(`Server Runnit at port ${PORT} after starting MongoDB.`);
        
    })
}).catch(err => {
    console.error("Error connecting MongoDB. ", err);
    
});