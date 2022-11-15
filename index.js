const { Search } = require('./searcher');

Search('nodejs').then(results => {
    console.log(results) // Returns an array of objects.
});