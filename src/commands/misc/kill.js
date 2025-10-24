const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'kill',
    description: 'Kill someone',
    options: [
        {
            name: "user",
            description: "Pick server member to kill",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],
    deleted: false,
    // devOnly: Boolean,
    // testOnly: Boolean,
    callback: (interaction) => {
        try {
            const response = interaction.options.get('user');
            const userID = response.value;

            interaction.reply(`<@${interaction.user.id}> killed <@${userID}>`);
        }
        catch (e) {
            interaction.reply(e);
        }
    },
}