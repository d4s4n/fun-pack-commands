const {
    getTodaysHolidays
} = require('../lib/api/date.js');
const {
    COMMANDS,
    PLUGIN_OWNER_ID
} = require('../constants.js');

function format(template, values = {}) {
    return Object.entries(values).reduce((acc, [key, value]) => acc.replace(new RegExp(`{${key}}`, 'g'), value), template);
}

module.exports = (Command, settings) => {
    return class DateCommand extends Command {
        constructor() {
            super({
                name: COMMANDS.DATE.NAME,
                description: 'Показывает сегодняшнюю дату и праздник.',
                aliases: ['дата', 'data'],
                permissions: COMMANDS.DATE.PERM,
                owner: PLUGIN_OWNER_ID,
                cooldown: 10,
                allowedChatTypes: ['clan', 'chat', 'private']
            });
        }
        async handler(bot, typeChat, user) {
            const now = new Date();
            const dateString = now.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                weekday: 'long'
            });

            const holidays = await getTodaysHolidays();

            if (holidays === null) {
                return bot.api.sendMessage(typeChat, settings.apiErrorMessage, user.username);
            }

            if (holidays.length > 0) {
                const holidayText = holidays.join(', ');
                const message = format(settings.dateWithHoliday, {
                    date: dateString,
                    holiday: holidayText
                });
                bot.api.sendMessage(typeChat, message, user.username);
            } else {
                const message = format(settings.dateWithoutHoliday, {
                    date: dateString
                });
                bot.api.sendMessage(typeChat, message, user.username);
            }
        }
    };
};