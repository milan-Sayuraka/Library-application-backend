const Book = require('../models/book.model.js');

// Create and Save a new Book
exports.create = (req, res) => {
    // Validate request
    if (!req.body.isbn || !req.body.author) {
        return res.status(400).send({
            message: "Book fields can not be empty"
        });
    }

    // Create a Book
    const book = new Book({
        name: req.body.name || "Untitled Book",
        isbn: req.body.isbn,
        author: req.body.author,
    });

    // Save Book in the database
    book.save()
        .then(data => {
            console.log(data);
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Book."
            });
        });
};

// Retrieve and return all books from the database.
exports.findAll = async (req, res) => {
    Book.find()
        .then(books => {
            res.send(books);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books."
            });
        });
};

// Find a single book with a bookId
exports.findOne = (req, res) => {
    Book.findById(req.params.bookId)
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.bookId
                });
            }
            res.send(book);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.bookId
                });
            }
            return res.status(500).send({
                message: "Error retrieving book with id " + req.params.bookId
            });
        });
};

// Update a book identified by the bookId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.isbn || !req.body.author) {
        return res.status(400).send({
            message: "Book fields can not be empty"
        });
    }

    // Find book and update it with the request body
    Book.findByIdAndUpdate(req.params.bookId, {
        name: req.body.name || "Untitled Book",
        isbn: req.body.isbn,
        author: req.body.author,
    }, { new: true })
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.bookId
                });
            }
            res.send(book);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.bookId
                });
            }
            return res.status(500).send({
                message: "Error updating book with id " + req.params.bookId
            });
        });
};

// Delete a book with the specified bookId in the request
exports.delete = (req, res) => {
    Book.findByIdAndRemove(req.params.bookId)
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.bookId
                });
            }
            res.send({ message: "Book deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.bookId
                });
            }
            return res.status(500).send({
                message: "Could not delete book with id " + req.params.bookId
            });
        });
};