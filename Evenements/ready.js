const format = require('chalk');

module.exports = client => {

    console.log('');
    console.log('[' + format.cyan.bold('Bot') + '] ' + 'Je suis démarré ! [ ' + format.cyan.bold(client.user.username) + ' ]');
    console.log('');

};