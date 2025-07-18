const {
    COMMANDS,
    PLUGIN_OWNER_ID
} = require('../constants.js');

module.exports = (Command, settings) => {
    return class CoinflipCommand extends Command {
        constructor() {
            super({
                name: COMMANDS.COINFLIP.NAME,
                description: 'Подбрасывает монетку.',
                aliases: ['монетка'],
                permissions: COMMANDS.COINFLIP.PERM,
                owner: PLUGIN_OWNER_ID,
                cooldown: 5,
                allowedChatTypes: ['clan', 'chat', 'private']
            });
        }
        async handler(bot, typeChat, user) {
            const result = Math.random() < 0.5 ? settings.coinflipHeads : settings.coinflipTails;
            bot.api.sendMessage(typeChat, result, user.username);
        }
    };
};