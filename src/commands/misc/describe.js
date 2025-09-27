const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'describe',
    description: 'A short history of the tank',
    options: [
        {
            name: "tank",
            description: "Describe a tank History",
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
    // deleted: Boolean,
    // devOnly: Boolean,
    // testOnly: Boolean,
    // callback: (client, interaction) => {
    //     interaction.reply("Kill your Self");
    // }
}