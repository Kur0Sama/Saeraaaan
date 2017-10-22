const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'moderation');
  if (!modlog) return message.reply('Je ne peut pas trouver le channel : #moderation');
  if (reason.length < 1) return message.reply('Tu dois mettre une raison !');
  if (message.mentions.users.size < 1) return message.reply('Tu dois mentionner un utilisateur !').catch(console.error);
  user.send(`<@${message.author.id}>, Tu à été averti par **${message.author.username}#${message.author.discriminator}** pour **${reason.toString()}**`);
  const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setDescription(`Action : **Avertissement**\n\nCible : **${user.username}#${user.discriminator}**\nAuteur : **${message.author.username}#${message.author.discriminator}**`)
  return client.channels.get(modlog.id).send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['advert'],
    permLevel: 2
};

exports.help = {
    name: 'warn',
    description: 'Avertir un utilisateur.',
    usage: 'warn <@utilisateur>'
};