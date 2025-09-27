const { EmbedBuilder } = require('discord.js');
const getTankData = require('../../utils/getTankData');

module.exports = async (client, interaction) => {
    try {
        // client.on('interactionCreate', async (interaction) => {
        // Slash Command Interaction
        // console.log(interaction);

        // If its a slash command then run
        if (interaction.isChatInputCommand()) {
            // when /describe is runned
            if (interaction.commandName === "describe") {
                const response = interaction.options.get('tank');
                const tank = response.value
                const data = await getTankData(tank);

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
                        // {
                        //     name: "Main armament",
                        //     value: "105 mm L/52 gun (developed by Japan Steel Works)",
                        //     inline: true,
                        // },
                        // {
                        //     name: "Secondary armament",
                        //     value: "12.7 mm (0.5 in) M2 Browning machine gun, 7.62 mm NATO coaxial Sumitomo Type 74 machine gun (replacing M2 Browning) Type 96 40 mm Automatic grenade launcher or FN Minimi 5.56 mm NATO light machine gun",
                        //     inline: true,
                        // }
                    )
                    .setColor("White")
                    .setTimestamp()
                    .setFooter({ text: "By Wikipedia" });

                interaction.reply({ embeds: [embed] });
            }
        }
    }
    catch (e) {
        interaction.reply(e);
    }
    // })
};