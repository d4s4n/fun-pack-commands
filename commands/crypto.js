const {
    getCryptoPrice
} = require('../lib/api/coingecko.js');
const {
    COMMANDS,
    PLUGIN_OWNER_ID
} = require('../constants.js');

function format(template, values = {}) {
    if (!template) return '';
    return Object.entries(values).reduce((acc, [key, value]) => {
        return acc.replace(new RegExp(`{${key}}`, 'g'), value);
    }, template);
}

module.exports = (Command, settings, coinMaps) => {
    return class CryptoCommand extends Command {
        constructor() {
            super({
                name: COMMANDS.CRYPTO.NAME,
                description: 'Показывает курс криптовалют.',
                aliases: ['крипто', 'курс'],
                permissions: COMMANDS.CRYPTO.PERM,
                owner: PLUGIN_OWNER_ID,
                cooldown: 5,
                allowedChatTypes: ['clan', 'chat', 'private'],
                args: [{
                    name: 'тикер_или_название',
                    type: 'greedy_string',
                    required: true
                }]
            });
        }
        async handler(bot, typeChat, user, {
            тикер_или_название
        }) {
            const queryLower = тикер_или_название.toLowerCase();
            const coin = coinMaps.symbolMap.get(queryLower) || coinMaps.nameMap.get(queryLower);
            if (!coin) return bot.api.sendMessage(typeChat, format(settings.cryptoNotFoundMessage, {
                query: тикер_или_название
            }), user.username);

            try {
                const priceData = await getCryptoPrice(coin.id);
                if (!priceData) throw new Error(`В ответе API нет данных для ${coin.id}`);
                const usd = (priceData.usd || 0).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6
                });
                const rub = (priceData.rub || 0).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                const message = format(settings.cryptoSuccessMessage, {
                    name: coin.name,
                    symbol: coin.symbol || queryLower.toUpperCase(),
                    usd,
                    rub,
                    change24h: 'N/A'
                });
                bot.api.sendMessage(typeChat, message, user.username);
            } catch (e) {
                bot.sendLog(`[${PLUGIN_OWNER_ID}] Ошибка получения курса: ${e.message}`);
                bot.api.sendMessage(typeChat, settings.apiErrorMessage, user.username);
            }
        }
    };
};