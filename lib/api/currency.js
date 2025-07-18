const {
    fetchWithIPv4
} = require('./fetchHelper');

let currencyCache = {
    data: null,
    timestamp: 0
};

async function getCurrencyRates() {
    const now = Date.now();
    if (currencyCache.data && (now - currencyCache.timestamp < 3600000)) {
        return currencyCache.data;
    }

    try {
        const response = await fetchWithIPv4(`https://www.cbr-xml-daily.ru/daily_json.js`);
        if (!response.ok) return null;

        const data = await response.json();
        const rates = {
            'RUB': 1
        };

        if (data && data.Valute) {
            for (const key in data.Valute) {
                const currency = data.Valute[key];
                rates[currency.CharCode] = currency.Value / currency.Nominal;
            }
        }

        currencyCache = {
            data: rates,
            timestamp: now
        };
        return rates;
    } catch (error) {
        console.error("[CurrencyAPI] Ошибка получения курсов от ЦБ РФ:", error.message);
        return null;
    }
}

module.exports = {
    getCurrencyRates
};