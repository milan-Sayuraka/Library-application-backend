module.exports = (app) => {
    const authors = require('../controllers/authors.controller.js');

    // Create a new Author
    app.post('/authors', authors.create);

    // Retrieve all Authors
    app.get('/authors', authors.findAll);

    // Retrieve a single Author with AuthorId
    app.get('/author/:authorId', authors.findOne);

    // Update a Author with AuthorId
    app.put('/author/:authorId', authors.update);
}