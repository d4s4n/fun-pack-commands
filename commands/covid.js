const {
    getCovidStats
} = require('../lib/api/covid.js');
const countryMap = require('../data/countryMap.js');
const {
    COMMANDS,
    PLUGIN_OWNER_ID
} = require('../constants.js');

function format(template, values = {}) {
    return Object.entries(values).reduce((acc, [key, value]) => acc.replace(new RegExp(`{${key}}`, 'g'), value), template);
}

module.exports = (Command, settings) => {
    return class CovidCommand extends Command {
        constructor() {
            super({
                name: COMMANDS.COVID.NAME,
                description: 'Статистика COVID-19 по стране.',
                aliases: ['ковид'],
                permissions: COMMANDS.COVID.PERM,
                owner: PLUGIN_OWNER_ID,
                cooldown: 10,
                allowedChatTypes: ['clan', 'chat', 'private'],
                args: [{
                    name: 'страна',
                    type: 'greedy_string',
                    required: true
                }]
            });
        }
        async handler(bot, typeChat, user, {
            страна
        }) {
            const countryQuery = страна.toLowerCase();
            const countryEng = countryMap[countryQuery] || countryQuery;

            const data = await getCovidStats(countryEng);
            if (!data || data.message) {
                return bot.api.sendMessage(typeChat, format(settings.covidNotFound, {
                    country: страна
                }), user.username);
            }
            const message = format(settings.covidSuccess, {
                country: страна,
                cases: data.cases.toLocaleString('ru-RU'),
                deaths: data.deaths.toLocaleString('ru-RU'),
                recovered: data.recovered.toLocaleString('ru-RU')
            });
            bot.api.sendMessage(typeChat, message, user.username);
        }
    };
};