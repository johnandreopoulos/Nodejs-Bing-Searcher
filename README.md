# Simple Bing Searcher
This is a custom nodejs module that allows you to search for a query on Bing and get the results in a JSON format.
> The code is made to be as simple as possible, so it's not optimized for performance.
> Used only 2 modules: [Undici](https://www.npmjs.com/package/undici) and [Cheerio](https://www.npmjs.com/package/cheerio)

> <p style="color: red">
> <b style="color: black">Note:</b> <u>This module is not meant to be used for scraping or other illegal purposes. It's only meant to be used for educational purposes.</u>
> </p> 

# Fast navigation
- [Simple Bing Searcher](#simple-bing-searcher)
- [Fast navigation](#fast-navigation)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Returning Errors](#returning-errors)
    - [Query](#query)
  - [Returning the results](#returning-the-results)
    - [Examples:](#examples)
	
## Installation
install [Nodejs](https://nodejs.org/en/download/) and then run this command in your terminal:

```
npm install
```
The above command will install the dependencies.

```
node index.js
```
The above command will start the code.

## Usage
##### Query
You can also change the `query` by editing the following line in index.js:
```javascript
Search('query').then(data => {
    if (data.error) return console.log(data);
    console.log(data);
});
```
Example of "Nodejs": ![image](https://user-images.githubusercontent.com/39243722/201919355-b0eea5c5-0d0c-41d0-a7fe-e9e0684d3523.png)


The above code will return an `array` of results. For each result, you can access the following properties:
```javascript
{
    title: 'Title of the result',
    link: 'URL of the result',
    content: 'Description of the result'
}
```

## Returning Errors
On Response Statuses errors (4xx, 5xx), the module will return an error with the following format:
- 404: Not Found
- 500: Internal Server Error
- 503: Service Unavailable
- 504: Gateway Timeout
- No Results: No results were found for the query

```javascript
[ 
    { error: true, message: 'Message' } 
]
```
<br>

## Returning the results
##### Examples:

```javascript
// Get the all resukts
Search.search('query').then(data => {
    if (data.error) return console.log(data);
    console.log(data);
});
```

```javascript
// Get the first 1st result
Search.search('query').then(data => {
    if (data.error) return console.log(data);
    console.log(data[0]);
});
```

```javascript
// Get the first 2nd result
Search.search('query').then(data => {
    if (data.error) return console.log(data);
    console.log(data[1]);
});
```

```javascript
// Get the first 2 results
Search.search('query').then(data => {
    if (data.error) return console.log(data);
    console.log(data.slice(0, 2));
});
```

```javascript
// Get the first 3 results
Search.search('query').then(data => {
    if (data.error) return console.log(data);
    console.log(data.slice(0, 3));
});
```
And so on...

> Note: `slice(x, y)` is a method that returns a shallow copy of a portion of an array into a new array object selected from `begin` to `end` (end not included). The original array will not be modified.

> Note: `results[0]` is a method that returns the first element of an array. The original array will not be modified.
> - <b>Inside the brackets, you can specify the index of the element you want to get. The first element is at index 0, the second element is at index 1, and so on.</b>
