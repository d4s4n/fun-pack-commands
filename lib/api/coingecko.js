const {
    fetchWithIPv4
} = require('./fetchHelper');
const PRIORITY_COINS = require('../../data/priorityCoins');

async function fetchAndBuildCryptoMaps(log, ownerId) {
    const symbolMap = new Map();
    const nameMap = new Map();
    for (const [symbol, data] of Object.entries(PRIORITY_COINS)) {
        symbolMap.set(symbol.toLowerCase(), data);
        nameMap.set(data.name.toLowerCase(), data);
    }
    try {
        log(`[${ownerId}] Загрузка списка криптовалют с CoinGecko...`);
        const response = await fetchWithIPv4('https://api.coingecko.com/api/v3/coins/list');
        if (!response.ok) throw new Error(`API ответило со статусом ${response.status}`);
        const coinList = await response.json();
        for (const {
                id,
                symbol,
                name
            }
            of coinList) {
            const symbolLower = symbol.toLowerCase();
            const nameLower = name.toLowerCase();
            if (symbol && id && !symbolMap.has(symbolLower)) symbolMap.set(symbolLower, {
                id,
                name
            });
            if (name && id && !nameMap.has(nameLower)) nameMap.set(nameLower, {
                id,
                name
            });
        }
        log(`[${ownerId}] Успешно загружено ${symbolMap.size} криптовалют.`);
        return {
            symbolMap,
            nameMap
        };
    } catch (error) {
        log(`[${ownerId}] ОШИБКА: Не удалось загрузить полный список криптовалют. ${error.message}`);
        return {
            symbolMap,
            nameMap
        };
    }
}

async function getCryptoPrice(coinId) {
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd,rub`;
    const response = await fetchWithIPv4(apiUrl);
    if (!response.ok) throw new Error(`API ответило со статусом ${response.status}`);
    const data = await response.json();
    return data[coinId] || null;
}
module.exports = {
    fetchAndBuildCryptoMaps,
    getCryptoPrice
};