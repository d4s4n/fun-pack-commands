const {
    searchAnime
} = require('../lib/api/anime.js');
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
    return class AnimeCommand extends Command {
        constructor() {
            super({
                name: COMMANDS.ANIME.NAME,
                description: 'Ищет информацию об аниме по названию.',
                aliases: ['аниме'],
                permissions: COMMANDS.ANIME.PERM,
                owner: PLUGIN_OWNER_ID,
                cooldown: 15,
                allowedChatTypes: ['clan', 'chat', 'private'],
                args: [{
                    name: 'title',
                    type: 'greedy_string',
                    required: true,
                    description: 'Название аниме'
                }]
            });
        }
        async handler(bot, typeChat, user, {
            title
        }) {
            const anime = await searchAnime(title);
            if (!anime) return bot.api.sendMessage(typeChat, settings.apiErrorMessage, user.username);
            if (anime.notFound) return bot.api.sendMessage(typeChat, format(settings.animeNotFoundMessage, {
                query: title
            }), user.username);
            const name = anime.russian || anime.name || 'Неизвестно';
            const originalNameText = (anime.name && anime.name !== name) ? ` (${anime.name})` : '';
            const type = anime.kind || 'н/д';
            const year = anime.aired_on ? new Date(anime.aired_on).getFullYear() : 'н/д';
            const rating = anime.score || 'N/A';
            let episodes;
            if (anime.status === 'released') episodes = `Вышло (${anime.episodes || '?'})`;
            else if (anime.status === 'ongoing') episodes = `Онгоинг (${anime.episodes_aired || '?'}/${anime.episodes || '?'})`;
            else episodes = `Анонс`;
            const infoMessage = format(settings.animeInfoMessage, {
                name,
                originalNameText,
                type,
                year,
                rating,
                episodes
            });
            bot.api.sendMessage(typeChat, infoMessage, user.username);
        }
    };
};