const {
    getCurrencyRates
} = require('../lib/api/currency.js');
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

module.exports = (Command, settings) => {
    return class CurrencyCommand extends Command {
        constructor() {
            super({
                name: COMMANDS.CURRENCY.NAME,
                description: 'Конвертирует валюту.',
                aliases: ['валюта'],
                permissions: COMMANDS.CURRENCY.PERM,
                owner: PLUGIN_OWNER_ID,
                cooldown: 10,
                allowedChatTypes: ['clan', 'chat', 'private'],
                args: [{
                    name: 'сумма',
                    type: 'number',
                    required: true
                }, {
                    name: 'из',
                    type: 'string',
                    required: true
                }, {
                    name: 'в',
                    type: 'string',
                    required: true
                }]
            });
        }
        async handler(bot, typeChat, user, {
            сумма,
            из,
            в
        }) {
            const amount = parseFloat(сумма);
            if (isNaN(amount)) return bot.api.sendMessage(typeChat, settings.currencyInvalid, user.username);
            const from = из.toUpperCase();
            const to = в.toUpperCase();
            const rates = await getCurrencyRates();
            if (!rates || !rates[from] || !rates[to]) return bot.api.sendMessage(typeChat, settings.currencyInvalid, user.username);
            const fromRate = from === 'RUB' ? 1 : rates[from];
            const toRate = to === 'RUB' ? 1 : rates[to];
            const resultInRub = amount * fromRate;
            const finalResult = resultInRub / toRate;
            const resultFormatted = finalResult.toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            bot.api.sendMessage(typeChat, format(settings.currencySuccess, {
                amount,
                from,
                result: resultFormatted,
                to
            }), user.username);
        }
    };
};