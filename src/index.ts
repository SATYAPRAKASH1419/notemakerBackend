
import express, { Request, Response } from "express"
import rootRouter from './routes/rootRouter'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express()
app.use(express.json());
app.use(cookieParser());
const PORT=process.env.PORT||8080;
app.get("/", (req: Request, res: Response) => {
  res.send("NoteApp Backend is running on Railway! 🚂");
});



// app.post('/settings',updateSettings)

app.use('/api/v1',rootRouter)


app.use((err: Error, req: Request, res: Response) => {
  console.error("Unhandled Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});







app.listen(PORT,()=>{
    console.log(`Server is runing on Port : ${PORT}`)
})