import express from "express"
import router from "./routes/authRoute"
import Queryrouter from "./routes/queryRoute"
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express()
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URL|| "http://localhost:5173" ,
    credentials:true
}))

app.use(express.json())
const port = process.env.PORT || 3000


app.use('/auth',router)
app.use('/query',Queryrouter)

app.listen(port ,()=>{
    console.log(`Your app is running on PORT ${port}`)
})
