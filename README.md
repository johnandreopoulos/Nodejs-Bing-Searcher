# Simple Bing Searcher
This is a simple nodejs bing searcher that returns results based on a query you specify.

	
## - Install
```
npm install
```

## - Start
```
node index.js
```

## - Usage
By default i set the page limit to `3`. You can change this by editing the following line in index.js:
```javascript
const pages = 3;
```

<br>
You can also change the `query` by editing the following line in index.js:
```javascript
Search.search('query').then(results => {
    console.log(results.slice(0, 3));
});
```
<br>
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