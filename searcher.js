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

    if (response.status === 404) error(404);
    if (response.status === 500) error(500);
    if (response.status === 503) error(503);
    if (response.status === 504) error(504);

    let $ = cheerio.load(await response.text());
    await $('.b_algo').each((i, el) => {
        let title = $(el).find('h2').text() ?? null;
        let link = $(el).find('a').attr('href') ?? null;
        let content = $(el).find('p').text() ?? null;

        if (title && link && content) {
            data.push({ title, link, content });
        }
    });

    if (data.length < 1) error('No Results');

    return data;
}

function error(x) {
    if (x === 404) return data.push({ error: true, message: '404 Not Found' });
    if (x === 500) return data.push({ error: true, message: '500 Internal Server Error' });
    if (x === 503) return data.push({ error: true, message: '503 Service Unavailable' });
    if (x === 504) return data.push({ error: true, message: '504 Gateway Timeout' });
    if (x === 'No Results') return data.push({ error: true, message: 'No Results' });
}

module.exports = { Search };