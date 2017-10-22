exports.run = function(client, message, args) {

    message.channel.send('Mon ping est de ' + client.ping + 'ms');

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'ping',
    description: 'Voir le ping du bot.',
    usage: 'ping'
};