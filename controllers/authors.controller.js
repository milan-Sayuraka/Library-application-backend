const Author = require('../models/author.model');

// Create and Save a new Author
exports.create = (req, res) => {
    // Validate request
    if (!req.body.first_name || !req.body.last_name) {
        return res.status(400).send({
            message: "Author First and last name can not be empty"
        });
    }

    // Create a Author
    const author = new Author({
        first_name: req.body.first_name,
        last_name: req.body.last_name
    });

    // Save Author in the database
    author.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Author."
            });
        });
};

// Retrieve and return all authors from the database.
exports.findAll = (req, res) => {
    Author.find()
        .then(authors => {
            res.send(authors);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving authors."
            });
        });
};

// Find a single author with a authorId
exports.findOne = (req, res) => {
    Author.findById(req.params.authorId)
        .then(author => {
            if (!author) {
                return res.status(404).send({
                    message: "Author not found with id " + req.params.authorId
                });
            }
            res.send(author);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Author not found with id " + req.params.authorId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Author with id " + req.params.authorId
            });
        });
};

// Update a author identified by the authorId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.first_name || !req.body.last_name) {
        return res.status(400).send({
            message: "Author First and last can not be empty"
        });
    }

    // Find author and update it with the request body
    Author.findByIdAndUpdate(req.params.authorId, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    }, { new: true })
        .then(author => {
            if (!author) {
                return res.status(404).send({
                    message: "Author not found with id " + req.params.authorId
                });
            }
            res.send(author);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Author not found with id " + req.params.authorId
                });
            }
            return res.status(500).send({
                message: "Error updating author with id " + req.params.authorId
            });
        });
};