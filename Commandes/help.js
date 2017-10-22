const settings = require('../config.json');

exports.run = (client, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.sendCode(`asciidoc`, `= Liste des commandes =\n\n${client.commands.map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.sendCode(`asciidoc`, `= ${command.help.name} =\n\nDescription :: ${command.help.description}\nUtilisation :: ${settings.prefix}${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['saeraan', 'bot'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Affiche l\'aide pour une commande / toutes les commandes',
  usage: 'help [commande]'
};