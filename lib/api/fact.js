const {
    fetchWithIPv4
} = require('./fetchHelper');

async function translateText(text, targetLang = 'ru') {
    if (!text) return null;
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        const response = await fetchWithIPv4(url);
        if (!response.ok) return text;
        const data = await response.json();
        if (Array.isArray(data) && Array.isArray(data[0])) {
            return data[0].map(chunk => chunk[0]).join('');
        }
        return text;
    } catch (e) {
        return text;
    }
}

async function getRandomFact() {
    try {
        const factTypes = ['trivia', 'math', 'date', 'year'];
        const randomType = factTypes[Math.floor(Math.random() * factTypes.length)];
        const url = `http://numbersapi.com/random/${randomType}?json`;

        const response = await fetchWithIPv4(url);
        if (!response.ok) return null;

        const data = await response.json();
        const englishFact = data?.text || null;

        if (!englishFact) return null;

        return await translateText(englishFact, 'ru');

    } catch (e) {
        return null;
    }
}

module.exports = {
    getRandomFact
};