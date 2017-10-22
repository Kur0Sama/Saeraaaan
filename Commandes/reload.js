exports.run = (client, message, args) => {
    let command;
    if (client.commands.has(args[0])) {
        command = args[0];
    } else if (client.aliases.has(args[0])) {
        command = client.aliases.get(args[0]);
    }
    if (!command) {
        return message.channel.send(`Je ne peut pas trouver la commande ${args[0]}`);
    } else {
        message.channel.send(`Rechargement de la commande ${command}`)
            .then(m => {
                client.reload(command)
                    .then(() => {
                        m.edit(`La commande ${command} à bien été rechargée !`);
                    })
                    .catch(e => {
                        m.edit(`Echec lors du rechargement de la commande ${command}\n\`\`\`${e.stack}\`\`\``);
                    });
            });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rl'],
    permLevel: 4
};

exports.help = {
    name: 'reload',
    description: 'Recharger une commande.',
    usage: 'reload <commande>'
};