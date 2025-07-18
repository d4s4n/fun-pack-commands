const https = require('https');
const agent = new https.Agent({
    family: 4
});

async function fetchWithIPv4(url, options = {}) {
    return fetch(url, {
        ...options,
        agent
    });
}

module.exports = {
    fetchWithIPv4
};