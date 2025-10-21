const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'describe',
    description: 'Tells a little story about tanks',
    options: [
        {
            name: "tank",
            description: "Describe a tank",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "Type 16",
                    value: "Type_16_maneuver_combat_vehicle",
                },
                {
                    name: "L3/33",
                    value: "L3/33",
                },
            ],
        },
    ],
    deleted: false,
    // devOnly: Boolean,
    // testOnly: Boolean,
    // callback: (client, interaction) => {
    //     interaction.reply("Kill your Self");
    // }
}