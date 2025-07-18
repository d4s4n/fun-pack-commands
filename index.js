const {
    PLUGIN_OWNER_ID,
    COMMANDS
} = require('./constants.js');
const {
    fetchAndBuildCryptoMaps
} = require('./lib/api/coingecko.js');

const commandFiles = {
    ANIME: './commands/anime.js',
    COINFLIP: './commands/coinflip.js',
    COVID: './commands/covid.js',
    CRYPTO: './commands/crypto.js',
    CURRENCY: './commands/currency.js',
    DATE: './commands/date.js',
    FACT: './commands/fact.js',
    TIME: './commands/time.js',
    WEATHER: './commands/weather.js',
};

async function onLoad(bot, options) {
    const log = bot.sendLog;
    const Command = bot.api.Command;
    const settings = options.settings;

    let cryptoMaps = {
        symbolMap: new Map(),
        nameMap: new Map()
    };
    if (settings.enableCrypto) {
        cryptoMaps = await fetchAndBuildCryptoMaps(log, PLUGIN_OWNER_ID);
    }

    try {
        const permissionsToRegister = [];
        const commandsToRegister = [];

        for (const [key, cmdData] of Object.entries(COMMANDS)) {
            const settingKey = `enable${key.charAt(0) + key.slice(1).toLowerCase()}`;
            if (settings[settingKey]) {
                permissionsToRegister.push({
                    name: cmdData.PERM,
                    description: `Доступ к команде !${cmdData.NAME}`,
                    owner: PLUGIN_OWNER_ID
                });

                const createCommand = require(commandFiles[key]);
                let commandInstance;

                if (key === 'CRYPTO') {
                    commandInstance = new(createCommand(Command, settings, cryptoMaps))();
                } else {
                    commandInstance = new(createCommand(Command, settings))();
                }
                commandsToRegister.push(commandInstance);
            }
        }

        if (permissionsToRegister.length > 0) {
            await bot.api.registerPermissions(permissionsToRegister);
            await bot.api.addPermissionsToGroup('Member', permissionsToRegister.map(p => p.name));
        }

        for (const cmd of commandsToRegister) {
            await bot.api.registerCommand(cmd);
        }

        log(`[${PLUGIN_OWNER_ID}] Пак развлекательных команд успешно загружен. Зарегистрировано команд: ${commandsToRegister.length}.`);

    } catch (error) {
        log(`[${PLUGIN_OWNER_ID}] Ошибка при загрузке: ${error.message}\n${error.stack}`);
    }
}

async function onUnload({
    botId,
    prisma
}) {
    console.log(`[${PLUGIN_OWNER_ID}] Удаление ресурсов для бота ID: ${botId}`);
    try {
        await prisma.command.deleteMany({
            where: {
                botId,
                owner: PLUGIN_OWNER_ID
            }
        });
        await prisma.permission.deleteMany({
            where: {
                botId,
                owner: PLUGIN_OWNER_ID
            }
        });
        console.log(`[${PLUGIN_OWNER_ID}] Команды и права плагина удалены.`);
    } catch (error) {
        console.error(`[${PLUGIN_OWNER_ID}] Ошибка при очистке ресурсов:`, error);
    }
}

module.exports = {
    onLoad,
    onUnload,
};