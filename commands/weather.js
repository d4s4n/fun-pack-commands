const {
    getWeather
} = require('../lib/api/weather.js');
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
    return class WeatherCommand extends Command {
        constructor() {
            super({
                name: COMMANDS.WEATHER.NAME,
                description: 'Показывает погоду в указанном городе.',
                aliases: ['погода'],
                permissions: COMMANDS.WEATHER.PERM,
                owner: PLUGIN_OWNER_ID,
                cooldown: 10,
                allowedChatTypes: ['clan', 'chat', 'private'],
                args: [{
                    name: 'город',
                    type: 'greedy_string',
                    required: true
                }]
            });
        }
        async handler(bot, typeChat, user, {
            город
        }) {
            const weatherData = await getWeather(город);
            if (!weatherData) return bot.api.sendMessage(typeChat, settings.apiErrorMessage, user.username);
            if (weatherData.notFound) return bot.api.sendMessage(typeChat, format(settings.weatherNotFoundMessage, {
                city: город
            }), user.username);
            const c = weatherData.current;
            const weatherCodes = {
                0: 'ясно',
                1: 'преимущественно ясно',
                2: 'переменная облачность',
                3: 'пасмурно',
                45: 'туман',
                48: 'густой туман',
                51: 'лёгкая морось',
                53: 'морось',
                55: 'сильная морось',
                61: 'небольшой дождь',
                63: 'дождь',
                65: 'сильный дождь',
                71: 'небольшой снег',
                73: 'снег',
                75: 'сильный снег',
                80: 'небольшой ливень',
                81: 'ливень',
                82: 'сильный ливень',
                95: 'гроза',
                96: 'гроза с градом'
            };
            const description = weatherCodes[c.weather_code] || 'неизвестно';
            const msg = format(settings.weatherInfoMessage, {
                city: weatherData.cityName,
                temp: Math.round(c.temperature_2m),
                feelsLike: Math.round(c.apparent_temperature),
                description,
                humidity: Math.round(c.relative_humidity_2m),
                windSpeed: (c.wind_speed_10m * 3.6).toFixed(1),
                windGust: (c.wind_gusts_10m * 3.6).toFixed(1),
                pressure: Math.round(c.pressure_msl),
                uv: c.uv_index.toFixed(1),
                cloud: Math.round(c.cloud_cover),
                visibility: Math.round(c.visibility / 1000)
            });
            bot.api.sendMessage(typeChat, msg, user.username);
        }
    };
};