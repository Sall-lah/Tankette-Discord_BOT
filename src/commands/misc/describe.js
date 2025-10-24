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
        {
            name: "shell",
            description: "Describe the type of shell used by tank",
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
        {
            name: "type",
            description: "Describe the type of tank",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "Main Battle Tank (MBT)",
                    value: "Main_battle_tank",
                },
                {
                    name: "Armored Personel Carrier (APC)",
                    value: "Armoured_personnel_carrier",
                },
            ],
        },
    ],
    deleted: false,
    // devOnly: Boolean,
    // testOnly: Boolean,
    callback: (interaction) => {
        interaction.reply("Kill your Self");
    },
}