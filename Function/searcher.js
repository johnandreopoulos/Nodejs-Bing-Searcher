const cheerio = require('cheerio');
const { fetch } = require('undici');

let data = [];
const Search = async (query) => {
    const headers = {
        'accept-language': 'en-US,en;q=0.9',
        'set-cookie': 'path=/; domain=.bing.com; HttpOnly; Secure; SameSite=None',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    let response = await fetch(`https://www.bing.com/search?q=${query}`, {
        method: 'GET',
        headers
    });

    if (response.status === 404) return console.log('Error: 404 - Not Found');
    if (response.status === 500) return console.log('Error: 500 - Internal Server Error');
    if (response.status === 503) return console.log('Error: 503 - Service Unavailable');
    if (response.status === 504) return console.log('Error: 504 - Gateway Timeout');

    let $ = cheerio.load(await response.text());
    await $('.b_algo').each((i, el) => {
        let title = $(el).find('h2').text() ?? null;
        let link = $(el).find('a').attr('href') ?? null;
        let content = $(el).find('p').text() ?? null;

        if (title && link && content) {
            data.push({ title, link, content });
        }
    });

    if (data.length < 1) return { error: true, message: 'I couldn\'t find anything.' };

    return data;
}

module.exports = { Search };