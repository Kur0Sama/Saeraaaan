const reqEvent = (event) => require(`../Evenements/${event}`);

module.exports = client => {
    client.on('ready', () => reqEvent('ready')(client));
    client.on('message', message => reqEvent('message')(client, message));
};