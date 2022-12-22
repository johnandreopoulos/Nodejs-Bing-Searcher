# Simple Bing Searcher (Scrapper)
This is a custom nodejs module that allows you to search for a query on Bing and get the results in a JSON format.
> The code is made to be as simple as possible, so it's not optimized for performance.
> Used only 2 modules: [Undici](https://www.npmjs.com/package/undici) and [Cheerio](https://www.npmjs.com/package/cheerio)

> <p style="color: red">
> <b style="color: black">Note:</b> <u>This module is not meant to be used for scraping or other illegal purposes. It's only meant to be used for educational purposes.</u>
> </p> 

# Details
The `index.js` file exports a single function called `runSearch` that takes a `query` as input and calls the `search` function in the `searcher.js` file with the given query. The `runSearch` function is designed to handle any errors that may occur during the search process and log them to the console.

Here is the code for the `runSearch` function in more detail:
```js
async function runSearch(query) {
  try {
    const data = await search(query);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

To use the `runSearch` function, you will need to pass in a `query` as a string argument. For example, you can execute a search for the query 'google' by calling the `runSearch` function as follows:
```js
runSearch('google');
```

The `search` function in the `searcher.js` file is responsible for fetching the search results from Bing and parsing them using `cheerio`. It takes a `query` as input and returns an array of objects containing the title, link, and content for each search result. If any errors occur during the fetch or parse process, the function will catch them and return an error object with a message property that describes the error.

Here is the code for the `search` function in more detail:
```js
async function search(query) {
    const headers = {
        'accept-language': 'en-US,en;q=0.9',
        'set-cookie': 'path=/; domain=.bing.com; HttpOnly; Secure; SameSite=None',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    };

    try {
        const response = await fetch(`https://www.bing.com/search?q=${query}`, {
            method: 'GET',
            headers
        });

        const $ = cheerio.load(await response.text());
        const data = [];

        await $('.b_algo').each((i, el) => {
            const title = $(el).find('h2').text() || null;
            const link = $(el).find('a').attr('href') || null;
            const content = $(el).find('p').text() || null;

            if (title && link && content) {
                data.push({ title, link, content });
            }
        });

        if (data.length < 1) {
            throw new Error('No Results');
        }

        return data;
    } catch (error) {
        if (error.message === 'No Results') {
            return { error: true, message: 'No Results' };
        } else if (error.status === 404) {
            return { error: true, message: '404 Not Found' };
        } else if (error.status === 500) {
            return { error: true, message: '500 Internal Server Error' };
        } else if (error.status === 503) {
            return { error: true, message: '503 Service Unavailable' };
        } else if (error.status === 504) {
            return { error: true, message: '504 Gateway Timeout' };
        } else {
            return { error: true, message: error.message };
        }
    }
}

module.exports = { search };
```

This will fetch the search results from Bing and parse them using `cheerio`. If the search was successful and returned results, the function will return an array of objects containing the title, link, and content for each result. If any errors occurred during the fetch or parse process, the function will return an error object with a message property that describes the error.

You can then use the returned data or error object as needed in your code. For example, you could log the data to the console or display the results in a user interface.



