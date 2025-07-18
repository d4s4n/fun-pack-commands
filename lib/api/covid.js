const {
    fetchWithIPv4
} = require('./fetchHelper');

async function getCovidStats(country) {
    const response = await fetchWithIPv4(`https://disease.sh/v3/covid-19/countries/${country}`);
    if (!response.ok) return null;
    return response.json();
}
module.exports = {
    getCovidStats
};