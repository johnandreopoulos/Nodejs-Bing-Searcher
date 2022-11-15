const { Search } = require('./searcher');

// Fill in the 'query' with whatever you want to search for.
Search('query').then((data) => {
    if (data.error) return console.log(data);
    else return console.log(data);
});
