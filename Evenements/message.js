const config = require('../config.json');
const format = require('chalk');

module.exports = (client, message) => {

    if(!message.content.startsWith(config.prefix)) return;
    if(message.author.bot) return;
    
    const args = message.content.split(' ');
    const cmd = args.shift().slice(config.prefix.length);

    try {
        let cmdFile = require(`../Commandes/${cmd}`);
        cmdFile.run(client, message, args);
        console.log('[' + format.magenta.bold('Action') + '] Auteur: ' + format.magenta.bold(message.author.username) + ' | Commande: ' + format.magenta.bold(cmd));
    } catch (err) {
        console.log('[' + format.magenta.bold('Action') + '] Auteur: ' + format.magenta.bold(message.author.username) + ' | Commande: ' + format.bgRed.magenta.bold(cmd));
    }

};