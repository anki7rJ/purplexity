import express from "express"
import router from "./routes/authRoute.js"

const app = express()

const port = 3000 


app.post('/auth',router)

app.listen(port ,()=>{
    console.log(`Your app is running on PORT ${port}`)
})
