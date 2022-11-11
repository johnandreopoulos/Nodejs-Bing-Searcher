# Simple Bing Searcher
This is a custom nodejs module that allows you to search for a query on Bing and get the results in a JSON format.
> The code is made to be as simple as possible, so it's not optimized for performance.
> Used only 2 modules: [Undici](https://www.npmjs.com/package/undici) and [Cheerio](https://www.npmjs.com/package/cheerio)

> <p style="color: red">
> <b style="color: black">Note:</b> <u>This module is not meant to be used for scraping or other illegal purposes. It's only meant to be used for educational purposes.</u>
> </p>

# Fast navigation
  - [Installation](#installation)
  - [Start](#start)
  - [Usage](#usage)
        - [Pages](#pages)
        - [Query](#query)
  - [Obtain a specific number of outcomes](#obtain-a-specific-number-of-outcomes)

	
## Installation
```
npm install
```
The above command will install the dependencies.

## Start
```
node index.js
```
The above command will start the code.

## Usage
By default, I set the page limit to `3`. You may alter this by changing the following line in searcher.js:

##### Pages
```javascript
const pages = 3;
```

##### Query
You can also change the `query` by editing the following line in index.js:
```javascript
Search.search('query').then(results => {
    console.log(results.slice(0, 3));
});
```

The above code will return an `array` of results. For each result, you can access the following properties:
```javascript
{
    title: 'Title of the result',
    link: 'URL of the result',
    content: 'Description of the result'
}
```
<br>

## Obtain a specific number of outcomes
By default, the search will return all the results that Bing returns from the mentioned page limit. If you want to obtain a specific number of results, you can use the `slice` method on the results array. For example, if you want to obtain the first <b>3 results</b>, you can do the following:
```javascript
Search.search('query').then(results => {
    console.log(results.slice(0, 3));
});
```
> Note: The first parameter of the `slice` method is the starting index and the second parameter is the ending index. The ending index is not included in the results.