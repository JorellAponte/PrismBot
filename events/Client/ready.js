const { log } = require("../../functions");
const PrismBot = require('../../class/PrismBot');

module.exports = {
    event: 'ready',
    once: true,
    /**
     * 
     * @param {PrismBot} _ 
     * @param {import('discord.js').Client<true>} client 
     * @returns 
     */
    run: (_, client) => {

        log('Logged in as: ' + client.user.tag, 'done');

    }
};