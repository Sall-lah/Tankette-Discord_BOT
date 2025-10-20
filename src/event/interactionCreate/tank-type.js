const { EmbedBuilder } = require('discord.js');
const getTankData = require('../../utils/getTankData');

module.exports = async (client, interaction) => {
    try {
        // client.on('interactionCreate', async (interaction) => {
        // Slash Command Interaction
        // console.log(interaction);

        // If its a slash command then run
        if (interaction.isChatInputCommand()) {
            // when /describe is runned
            if (interaction.commandName === "tank-type") {
                interaction.reply("Oke vro");
            }
        }
    }
    catch (e) {
        interaction.reply(e);
    }
    // })
};