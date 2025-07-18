const {
    fetchWithIPv4
} = require('./fetchHelper');

async function searchAnime(title) {
    try {
        const searchUrl = `https://shikimori.one/api/animes?search=${encodeURIComponent(title)}&limit=1`;
        const response = await fetchWithIPv4(searchUrl);
        if (!response.ok) throw new Error(`Shikimori API Error: ${response.status}`);
        const data = await response.json();
        if (!data || data.length === 0) return {
            notFound: true
        };
        return data[0];
    } catch (error) {
        console.error(`[AnimeAPI] Ошибка: ${error.message}`);
        return null;
    }
}
module.exports = {
    searchAnime
};