import express from "express";
import { PORT } from "./configs/serverConfig.js";
import { connectDB } from "./configs/dbConfig.js";
import v1Router from "./routes/index.js";


const app = express();


app.use('/api', v1Router);

app.listen(PORT, async () => {
    try {
        
        await connectDB();
        launchBot()
        console.log('Server is up on ', PORT, "port")

    } catch (error) {
        console.log(error.message)
    }
})