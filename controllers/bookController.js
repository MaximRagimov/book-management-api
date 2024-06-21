const Book = require('../models/bookModel');

const bookController = {
    async create(req, res) {
        const { title, author, publicationDate, genres } = req.body;
        const newBook = await Book.create(title, author, publicationDate, genres);
        res.json(newBook);
    },

    async findAll(req, res) {
        const books = await Book.findAll();
        res.json(books);
    },

    async findById(req, res) {
        const book = await Book.findById(req.params.id);
        res.json(book);
    },

    async update(req, res) {
        const { title, author, publicationDate, genres } = req.body;
        const updatedBook = await Book.update(req.params.id, title, author, publicationDate, genres);
        res.json(updatedBook);
    },

    async delete(req, res) {
        await Book.delete(req.params.id);
        res.status(204).send();
    },
};

module.exports = bookController;