const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 3001

app.get('/', (req, res) => {
    res.send("<h1>Hello Server</h1>")
})

//creating schema
const studentSchema = new mongoose.Schema({
    name : String,
    age : Number,
    location : String,
    dateOfBirth : {
        type : Date,
        default : Date.now
    }

})

//creating model
const Student = mongoose.model("Student", studentSchema);
//creating database
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/CT')
        console.log("Database is connected");
    } catch (err) {
        console.log("Database is not connected");
        console.log(err);
    }
}

app.listen(PORT, async () => {
    console.log("Server is running at http://localhost:"+PORT)
    await connectDB()
})