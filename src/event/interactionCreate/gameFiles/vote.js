const { EmbedBuilder, ActionRowBuilder, UserSelectMenuBuilder } = require('discord.js');

module.exports = (async(client, interaction, player) => {
    const embeds = new EmbedBuilder()
        .setDescription("Who will you vote");
    // Create User Select Menu
    let userMenu = new UserSelectMenuBuilder()
        .setCustomId('userSelect')
        .setPlaceholder('Choose a user')
        .setMinValues(1)
        .setMaxValues(1);

    let row = new ActionRowBuilder().addComponents(userMenu);

    await interaction.channel.send({
        embeds: [embeds],
        components: [row]
    });
})