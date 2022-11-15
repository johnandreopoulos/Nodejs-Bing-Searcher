const { Search } = require('./Function/searcher');

// Fill in the 'query' with whatever you want to search for.
Search('query').then((data) => {
    console.log(data);
});