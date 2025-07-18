const {
    fetchWithIPv4
} = require('./fetchHelper');

async function getTodaysHolidays() {
    try {
        const now = new Date();
        const year = now.getFullYear();
        const response = await fetchWithIPv4(`https://date.nager.at/api/v3/PublicHolidays/${year}/RU`);
        if (!response.ok) return null;

        const allHolidays = await response.json();
        const todayString = now.toISOString().split('T')[0];

        const todayHolidays = allHolidays.filter(h => h.date === todayString);

        return todayHolidays.map(h => h.localName);
    } catch (error) {
        return null;
    }
}

module.exports = {
    getTodaysHolidays
};