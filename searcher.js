const cheerio = require('cheerio');
const { fetch } = require('undici');

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