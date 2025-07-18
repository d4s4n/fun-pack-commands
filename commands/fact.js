const {
    getRandomFact
} = require('../lib/api/fact.js');
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
    return class FactCommand extends Command {
        constructor() {
            super({
                name: COMMANDS.FACT.NAME,
                description: 'Показывает случайный интересный факт.',
                aliases: ['факт'],
                permissions: COMMANDS.FACT.PERM,
                owner: PLUGIN_OWNER_ID,
                cooldown: 10,
                allowedChatTypes: ['clan', 'chat', 'private'],
                args: []
            });
        }
        async handler(bot, typeChat, user) {
            const fact = await getRandomFact();
            if (!fact) {
                return bot.api.sendMessage(typeChat, settings.apiErrorMessage, user.username);
            }
            bot.api.sendMessage(typeChat, format(settings.factMessage, {
                fact
            }), user.username);
        }
    };
};