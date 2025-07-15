const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT | 5000;
const MONGO_URI = process.env.MONGO_URI || "";


// Middlewares.
app.use(express.json());






//Routes
app.use('/api/users', userRoutes);






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