// models/bookModel.js
const pool = require('../config/db');

const Book = {
    async create(title, author, publicationDate, genres) {
        const result = await pool.query(
            'INSERT INTO books (title, author, publication_date, genres) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, author, publicationDate, genres]
        );
        return result.rows[0];
    },

    async findAll() {
        const result = await pool.query('SELECT * FROM books');
        return result.rows;
    },

    async findById(id) {
        const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        return result.rows[0];
    },

    async update(id, title, author, publicationDate, genres) {
        const result = await pool.query(
            'UPDATE books SET title = $1, author = $2, publication_date = $3, genres = $4 WHERE id = $5 RETURNING *',
            [title, author, publicationDate, genres, id]
        );
        return result.rows[0];
    },

    async delete(id) {
        await pool.query('DELETE FROM books WHERE id = $1', [id]);
    },
};

module.exports = Book;