const { testServer } = require('../../../config.json');
const getApplicationCommands = require('../../utils/getApplicationCommands');

module.exports = async (client, interaction) => {
    if(!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try {
        await command(interaction);
    }
    catch (e) {
        console.error(e);
        await interaction.reply("Oops, something went wrong");
    }
};