const { MessageContextMenuCommandInteraction, ContextMenuCommandBuilder } = require('discord.js');
const PrismBot = require('../../../class/PrismBot');

module.exports = {
    structure: new ContextMenuCommandBuilder()
        .setName('Test Message command')
        .setType(3),
    /**
     * @param {PrismBot} client 
     * @param {MessageContextMenuCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        await interaction.reply({
            content: 'Hello message context command!'
        });

    }
};