const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'kill',
    description: 'Kill someone',
    options: [
        {
            name: "user",
            description: "Pick server member to kill",
            type: ApplicationCommandOptionType.User,
        },
    ],
    deleted: false,
    // devOnly: Boolean,
    // testOnly: Boolean,
    // callback: (client, interaction) => {
    //     interaction.reply("Kill your Self");
    // }
}