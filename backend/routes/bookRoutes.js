import express from 'express';
import { Book } from '../models/bookModel.js';


const router = express.Router();


router.post('/', async (req, res) => {
    try {

        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send("Please fill in all the required field(title, author and publishYear)");
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook);

        res.status(201).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send("System error mf")
    }
})


router.get('/', async (req, res) => {
    try {
        const books = await Book.find();

        const count = books.length;

        res.status(200).json({ count: count, data: books });
    } catch (error) {
        console.log(error);
        res.status(500).send("System Error")
    }

})


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);


        res.status(200).send(book);


    } catch (error) {
        console.log(error.message);
        res.status(404).send({ message: "Book not found. insert valid id" });
    }

})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send("Please fill in all the required field(title, author and publishYear)");
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.findByIdAndUpdate(id, newBook);

        if (!book) {
            res.send(404).send("Book not found");
        }

        res.status(201).json({ Success: true, Message: "Book updated successful", data: book })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("System Error occurded!!")
    }




})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            res.send(404).send("Book not found");
        }

        res.status(200).send("Book deleted successfully");
    } catch (error) {
        console.log(error.message);
        res.status(500).send("System Error Occured");
    }

})
export default router;