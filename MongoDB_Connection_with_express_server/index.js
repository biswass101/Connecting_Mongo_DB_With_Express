const express = require("express")
const mongoose = require('mongoose')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// mongoose.connect('mongodb://localhost:27017/usersDB')
//     .then(() => console.log("db is connected"))
//     .catch((err) => {
//         console.log("db is not connected");
//         console.log(err);
//     })

//create product shcema
const productsShcema = new mongoose.Schema({
    title : {
        type :  String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

//create product mode
const Product = mongoose.model("Products", productsShcema)

const connectDB = async () => {

    try {
        await mongoose.connect('mongodb://localhost:27017/testProductDB')
        console.log("db is connected");
    } catch (err) {
        console.log("db is not connected");
        console.log(err);
    }
}
app.get('/', (req, res) => {
    res.send("Hello Server")
})

app.post('/products', async (req, res) => {
    try {
        //get data from request body
        // const[title, price, description] = req.body
    
        const newProduct = new Product({
            title : req.body.title,
            price : req.body.price,
            description : req.body.description
        })
        const productData = await newProduct.save()
        res.status(201).send(productData)
    } catch (error) {
        res.status(500).send({message : error.message})
    }
})

app.listen(PORT, async () => {

    console.log("Server is running at http://localhost:"+PORT);
    await connectDB()
})