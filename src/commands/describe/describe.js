const { ApplicationCommandOptionType } = require('discord.js');
const getData = require('../../utils/fetchWiki');
const { EmbedBuilder } = require('discord.js');

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
    callback: async (interaction) => {
        try {
            const tank = interaction.options.get('tank') ?? false;
            const type = interaction.options.get('type') ?? false;
            const shell = interaction.options.get('shell') ?? false;

            // Validate that user can only send one options
            const check = [tank, type, shell].filter(Boolean);
            if (check.length !== 1) {
                interaction.reply("You need to choose only one option");
                return;
            }

            let data;
            if (tank) {
                data = await getData(tank.value);
            }
            else if (type) {
                data = await getData(type.value);
            }
            else if (shell) {
                data = await getData(shell.value);
            }

            const embed = new EmbedBuilder()
                .setTitle(data.title)
                .setThumbnail(data.thumbnail.source)
                .setDescription(data.description)
                .addFields(
                    {
                        name: "Description",
                        value: data.extract,
                        inline: false,
                    },
                )
                .setColor("White")
                .setTimestamp()
                .setFooter({ text: "By Wikipedia" });

            interaction.reply({ embeds: [embed] });
        }
        catch (e) {
            interaction.reply("Something went wrong !!!");
            console.log(e)
        }
    },
}