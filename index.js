const { search } = require('./searcher');

async function runSearch(query) {
  try {
    const data = await search(query);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Fill in the 'query' with whatever you want to search for.
runSearch('google');
