
import express, { Request, Response,NextFunction } from "express"
import rootRouter from './routes/rootRouter'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config();
const app = express()
const allowedOrigins = [
  "http://localhost:5173",
  "https://noteflowsatya.vercel.app",
 "https://noteflowsatya-qssk5nos8-satya-prakash-swains-projects-9c7de52c.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
const PORT=process.env.PORT||8080;
app.get("/", (req: Request, res: Response) => {
  res.send("NoteApp Backend is running on Vercel!");
});



// app.post('/settings',updateSettings)

app.use('/api/v1',rootRouter)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});




if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

// app.listen(PORT,()=>{
//     console.log(`Server is runing on Port : ${PORT}`)
// })

export default app;
