const { Search } = require('./searcher');

// Fill in the 'query' with whatever you want to search for.
Search('john andreopoulos').then((data) => {
    if (data.error) return console.log(data.message);
    else console.log(data);
});