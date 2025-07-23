const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const swaggerSpec = require('./swagger');
const swaggerUi = require('swagger-ui-express');
const candidateRoute =  require('./routes/candidateRoutes');
const voterRoute = require('./routes/voterRoutes');
const voteRoute = require('./routes/voteRoutes');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";


// Middlewares.
app.use(express.json());






//Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/user', userRoutes);
app.use('/api/candidate', candidateRoute);
app.use('/api/voter', voterRoute);
app.use('/api/vote', voteRoute);






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