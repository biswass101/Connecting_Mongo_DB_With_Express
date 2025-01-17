const express = require("express")
const mongoose = require('mongoose')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// mongoose.connect('mongodb://localhost:27017/usersDB')
//     .then(() => console.log("db is connected"))
//     .catch((err) => {
//         console.log("db is not connected");
//         console.log(err);
//     })

//create product shcema
const productsShcema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
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

//create
app.post('/products', async (req, res) => {
    try {
        const newProduct = new Product({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description
        })
        const productData = await newProduct.save()
        res.status(201).send(productData)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

//read all products
app.get('/products',  async (req, res) => {
    try {
        const price = req.query.price //using query params
        let products
        if(price)
        {
            products = await Product.find({price: {$eq: price}}) // all products
        } else {

            products = await Product.find();
        }
        //without limit it will show all documents
        if (products) {
            res.status(200).send({
                success: true,
                message: "returned all products",
                data : products
            })
        } else {
            res.status(404).send({
                success: false,
                message: "products not found"
            })
        }
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
})
//read products by id(query parameter)
app.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findOne({_id : id}) 
        
        //finding more specifically
        // const product = await Product.findOne({_id : id}).select({
        //     _id : 0,
        //     title: 1,
        //     price : 1
        // }); //1 visible and 0 hidden
        // res.send(product)
        
        if (product) {
            res.status(200).send({
                success: true,
                message: "returned single product",
                data : product
            })
        } else {
            res.status(404).send({
                success: false,
                message: "products not found"
            })
        }

    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
})


app.use((req, res) => {
    res.status(404).send({
        success: false,
        message: "Route Not Found!!!"
    })
})
app.listen(PORT, async () => {

    console.log("Server is running at http://localhost:" + PORT);
    await connectDB()
})