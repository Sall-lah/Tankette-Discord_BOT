const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'tank-type',
    description: 'Explain about type of tank',
    options: [
        {
            name: "type",
            description: "Choose what type of tank do you want to know",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "Main Battle Tank (MBT)",
                    value: "null",
                },
                {
                    name: "Armored Personel Carrier (APC)",
                    value: "null",
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