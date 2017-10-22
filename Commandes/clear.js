exports.run = function(client, message, args) {

    let fetched = parseInt(args.join(' '));
    message.channel.fetchMessages({limit: (fetched + 1)}).then(messages => {
        message.channel.bulkDelete(messages);
        message.channel.send((fetched) + ' messages ont été supprimés !');
    });

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['clean', 'purge'],
    permLevel: 2
};

exports.help = {
    name: 'clear',
    description: 'Supprimer x messages dans le channel.',
    usage: 'clear <x>'
};