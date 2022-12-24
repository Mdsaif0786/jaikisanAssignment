const express = require("express")
const mongoose = require("mongoose")
const route= require("./routes/route")
const app = express()


app.use(express.json())

const url = "mongodb+srv://Saif2:Pvvluxhd2m5OOHIg@cluster0.j5omh.mongodb.net/jaikisan"
mongoose.connect(url, { useNewUrlParser: true }
).then(() => console.log("MongoDb is connected")).catch((err) => console.log(err))


app.use("/", route)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("App is running on port" + port)
})