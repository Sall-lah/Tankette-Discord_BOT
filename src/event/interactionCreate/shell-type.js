const { EmbedBuilder } = require('discord.js');
const getTypeData = require('../../utils/fetchWiki');

module.exports = async (client, interaction) => {
    try {
        // client.on('interactionCreate', async (interaction) => {
        // Slash Command Interaction
        // console.log(interaction);

        // If its a slash command then run
        if (interaction.isChatInputCommand()) {
            // when /describe is runned
            if (interaction.commandName === "tank-type") {
                const tankType = interaction.options.get('type').value;
                const data = await getTypeData(tankType);

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

                await interaction.reply({ embeds: [embed] });
            }
        }
    }
    catch (e) {
        interaction.reply("Something went wrong !!");
        console.log(e);
    }
    // })
};