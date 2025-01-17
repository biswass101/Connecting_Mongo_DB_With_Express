const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 3001

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//creating schema
const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
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

app.get('/', (req, res) => {
    res.send("<h1>Hello Server</h1>")
})

app.post('/student', async (req, res) => {
    try {
        //get data from request body
        const name = req.body.name
        const age = req.body.age
        const location = req.body.location

        const newStudnet = new Student({
            name, age, location
        })

        const savedStudent = await newStudnet.save()

        res.status(201).send(savedStudent)
    } catch (error) {
        res.status(500).send({
            message : error.message
        })
    }
})

app.listen(PORT, async () => {
    console.log("Server is running at http://localhost:"+PORT)
    await connectDB()
})