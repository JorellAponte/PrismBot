const { Message } = require('discord.js');
const PrismBot = require('../../../class/PrismBot');

module.exports = {
    structure: {
        name: 'ping',
        description: 'Replies with Pong!',
        aliases: ['p'],
        permissions: 'Administrator',
        cooldown: 5000
    },
    /**
     * @param {PrismBot} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {

        await message.reply({
            content: 'Pong! ' +  client.ws.ping
        });

    }
};