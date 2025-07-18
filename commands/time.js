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

function getDeclension(number, singular, plural1, plural2) {
    const n = Math.abs(number) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return plural2;
    if (n1 > 1 && n1 < 5) return plural1;
    if (n1 === 1) return singular;
    return plural2;
}

function formatTimeWithWords(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hoursWord = getDeclension(hours, 'час', 'часа', 'часов');
    const minutesWord = getDeclension(minutes, 'минута', 'минуты', 'минут');
    const secondsWord = getDeclension(seconds, 'секунда', 'секунды', 'секунд');

    return `${hours} ${hoursWord} ${minutes} ${minutesWord} ${seconds} ${secondsWord}`;
}

function getOffsetDate(offsetHours) {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offsetHours));
}

module.exports = (Command, settings) => {
    return class TimeCommand extends Command {
        constructor() {
            super({
                name: COMMANDS.TIME.NAME,
                description: 'Показывает время по МСК или с указанным часовым поясом.',
                aliases: ['время'],
                permissions: COMMANDS.TIME.PERM,
                owner: PLUGIN_OWNER_ID,
                cooldown: 5,
                allowedChatTypes: ['clan', 'chat', 'private'],
                args: [{
                    name: 'пояс',
                    type: 'string',
                    required: false
                }]
            });
        }
        async handler(bot, typeChat, user, {
            пояс
        }) {
            let date, timezone;
            if (пояс) {
                const offset = parseInt(пояс, 10);
                if (isNaN(offset) || offset < -12 || offset > 12) return bot.api.sendMessage(typeChat, settings.timeInvalidOffset, user.username);
                date = getOffsetDate(offset);
                timezone = `UTC${offset >= 0 ? '+' : ''}${offset}`;
            } else {
                date = getOffsetDate(3);
                timezone = 'МСК (UTC+3)';
            }
            const formattedTime = formatTimeWithWords(date);
            const message = format(settings.timeFormat, {
                time: formattedTime,
                timezone
            });
            bot.api.sendMessage(typeChat, message, user.username);
        }
    };
};