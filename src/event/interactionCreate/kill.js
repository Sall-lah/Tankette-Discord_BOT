module.exports = async (client, interaction) => {
    try {
        // client.on('interactionCreate', async (interaction) => {
        // Slash Command Interaction
        // console.log(interaction);

        // If its a slash command then run
        if (interaction.isChatInputCommand()) {
            // When /kill command is entered
            if (interaction.commandName === "kill") {
                const response = interaction.options.get('user');
                const userID = response.value;

                interaction.reply(`<@${interaction.user.id}> killed <@${userID}>`);
            }
        }
    }
    catch (e) {
        interaction.reply(e);
    }
    // })
};