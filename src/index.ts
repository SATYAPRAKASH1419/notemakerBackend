
import express, { Request, Response } from "express"
import rootRouter from './routes/rootRouter'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express()
app.use(express.json());
app.use(cookieParser());
const PORT=process.env.PORT||3000;



// app.post('/settings',updateSettings)

app.use('/api/v1',rootRouter)








app.listen(PORT,()=>{
    console.log(`Server is runing on Port : ${PORT}`)
})