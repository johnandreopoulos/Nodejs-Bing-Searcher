# Simple Bing Searcher
This is a simple nodejs bing searcher that returns results based on a query you specify.

	
## Install
```
npm install
```
---

## Start
```
node index.js
```
---

## Usage
```javascript
Search.search('query', function(results) {
    console.log(results);
});
```
The above code will return an array of results. Each result will have the following properties:
```javascript
{
    title: 'Title of the result',
    link: 'URL of the result',
    content: 'Description of the result'
}
```
---

## Page Limit
By default i set the page limit to 3. You can change this by editing the following line in index.js:
```javascript
const pages = 3;
```