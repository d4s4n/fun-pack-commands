const {
    fetchWithIPv4
} = require('./fetchHelper');

async function getWeather(city) {
    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ru`;
        const geoRes = await fetchWithIPv4(geoUrl);
        if (!geoRes.ok) throw new Error(`Geo API Error: ${geoRes.status}`);
        const geo = await geoRes.json();
        if (!geo.results?.length) return {
            notFound: true
        };
        const {
            latitude,
            longitude,
            name: cityName
        } = geo.results[0];
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_gusts_10m,pressure_msl,uv_index,cloud_cover,visibility&timezone=auto&lang=ru`;
        const wRes = await fetchWithIPv4(weatherUrl);
        if (!wRes.ok) throw new Error(`Weather API Error: ${wRes.status}`);
        return {
            ...(await wRes.json()),
            cityName
        };
    } catch (error) {
        return null;
    }
}
module.exports = {
    getWeather
};