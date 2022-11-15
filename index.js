const { Search } = require('./searcher');

// Fill in the 'query' with whatever you want to search for.
Search('123123123123123123q45wd4sdq').then((data) => {
    if (data.error) return console.log(data);
    else console.log(data);
});