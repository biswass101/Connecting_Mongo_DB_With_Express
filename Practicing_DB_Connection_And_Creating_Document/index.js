const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 3002

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//creating Schema
const booksSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    auth_name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    publi_name: {
        type: String,
        required: true,
    },
    publi_date: {
        type: Date,
        default: Date.now()
    }
})

//Creating model
const Book = mongoose.model("Book", booksSchema)

//creating and connecting Database
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Library")
        console.log("DB is connected")
    } catch (error) {
        console.log("DB is not connected")
        console.log(error);
    }
}

app.get('/', (req, res) => {
    res.send("Welcome to Library server")
})


const documents = [
    {
        name: 'English',
        auth_name: 'Kibria',
        price: '$20',
        publi_name: 'Anupam',
    },
    {
        name: 'Bangla',
        auth_name: 'Solimullah',
        price: '$60',
        publi_name: 'Rubauet Publication',
    },
    
]

app.post('/books', async (req, res) => {
    // const currentDate = new Date();
    // const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    
    // try {
    //         const newBook = new Book({
    //         name: req.body.name,
    //         auth_name: req.body.auth_name,
    //         price: req.body.price,
    //         publi_name: req.body.publi_name,
    //     })

    //     const savedBook = await newBook.save()

    //     res.status(201).send(savedBook)
    // } catch (error) {
    //     res.status(501).send({
    //         message: error.message
    //     })
    // }

    //multiple data saving to database
    Book.insertMany(documents)
        .then((docs) => {
            console.log("Documanets inserted successfully");
            res.status(201).send({documents})
        })
        .catch((err) => {
            console.error('Error inserting document', err);
            res.status(500).send({
                message: err.message
            })
        })
})

app.listen(port, async () => {
    console.log("Server is running at http://localhost:" + port);
    await connectDB()
})