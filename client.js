const Discord = require('discord.js');
const format = require('chalk');
const fs = require('fs');

const client = new Discord.Client();

const config = require('./config.json')
require('./Utilitaires/eventLoader.js')(client);

const log = message => {
	console.log('[' + format.yellow.bold('Info') + '] ' + message);
};

const startLog = message => {
	console.log('[' + format.white.bold('Load') + '] ' + message);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./Commandes/', (err, files) => {
	if (err) console.log('[' + format.red.bold('Erreur') + `] \n\n' + ${format.bgRed(err)}`);
	console.log('');
	startLog(`Chargement de ${format.white.bold(files.length)} commandes:`);
	console.log('');
	files.forEach(f => {
		let props = require(`./Commandes/${f}`);
		startLog(`La commande ${format.white.bold(props.help.name)} à été chargée !`);
		client.commands.set(props.help.name, props);
		props.conf.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	});
});

client.reload = command => {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(`./Commandes/${command}`)];
			let cmd = require(`./Commandes/${command}`);
			client.commands.delete(command);
			client.aliases.forEach((cmd, alias) => {
				if (cmd === command) client.aliases.delete(alias);
			});
			client.commands.set(command, cmd);
			cmd.conf.aliases.forEach(alias => {
				client.aliases.set(alias, cmd.help.name);
			});
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};

client.elevation = message => {
	let permlvl = 0;
	let mod_role = message.guild.roles.find('name', settings.modrolename);
	if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
	let admin_role = message.guild.roles.find('name', settings.adminrolename);
	if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
	if (message.author.id === settings.ownerid) permlvl = 4;
	return permlvl;
};

client.login(process.env.TOKEN);
