const cheerio = require('cheerio');
const { fetch } = require('undici');

let data = [];
async function Search(x) {
    const headers = {
        'accept-language': 'en-US,en;q=0.9',
        'set-cookie': 'path=/; domain=.bing.com; HttpOnly; Secure; SameSite=None'
    }

    const pages = 3; // Number of pages to scrape.

    for (let i = 1; i <= pages; i++) {
        const res = await fetch(`https://www.bing.com/search?q=${x}&first=${i * 10}`, { headers });
        const html = await res.text();
        const $ = cheerio.load(html);
        $('.b_algo').each((i, el) => {
            data.push({
                title: $(el).find('h2').text(),
                link: $(el).find('cite').text(),
                content: $(el).find('p').text(),
            });
        });
    }
    return data;
}

module.exports = { Search };