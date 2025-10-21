const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'shell-type',
    description: 'Explain about type of tank',
    options: [
        {
            name: "shell",
            description: "Choose what type of tank do you want to know",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "Armour-Piercing Fin-Stabilized Discarding Sabot (APFSDS)",
                    value: "Armour-piercing_fin-stabilized_discarding_sabot",
                },
                {
                    name: "Armour-Piercing Discarding Sabot (APDS)",
                    value: "Armour-piercing_discarding_sabot",
                },
            ],
        },
    ],
    deleted: true,
    // devOnly: Boolean,
    // testOnly: Boolean,
    // callback: (client, interaction) => {
    //     interaction.reply("Kill your Self");
    // }
}