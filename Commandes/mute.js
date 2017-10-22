const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'moderation');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', '> Mute');
  if (!modlog) return message.reply('Je ne peut pas trouver le channel : #moderation.').catch(console.error);
  if (!muteRole) return message.reply('Je ne peut pas touver le role de Mute.').catch(console.error);
  if (reason.length < 1) return message.reply('Tu dois entrer une raison.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('Tu dois mentionner un utilisateur.').catch(console.error);
  const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setDescription(`Action : **Mute**\n\nCible : **${message.author.username}#${message.author.discriminator}**\nAuteur : **${message.author.username}#${message.author.discriminator}**`);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    user.send(`<@${message.author.id}>, Tu à été unMute par **${message.author.username}#${message.author.discriminator}**`);
    message.channel.send(':white_check_mark: Tu à bien unMute cette personne !');
    message.guild.member(user).removeRole(muteRole);
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {
      user.send(`<@${message.author.id}>, Tu à été Mute par **${message.author.username}#${message.author.discriminator}** pour **${reason.toString()}**`);
      message.channel.send(':white_check_mark: Tu à bien Mute cette personne !');
      client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
    });
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'Mute ou unMute un utilisateur.',
  usage: 'un/mute [@utilisateur]'
};