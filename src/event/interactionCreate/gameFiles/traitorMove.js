const { EmbedBuilder, ActionRowBuilder, UserSelectMenuBuilder } = require('discord.js');

module.exports = (async (client, interaction, player) => {
    return new Promise(async (resolve) => {
        const embeds = new EmbedBuilder()
            .setDescription("What will you do");
        // Create User Select Menu
        let userMenu = new UserSelectMenuBuilder()
            .setCustomId('userSelect')
            .setPlaceholder('Choose a user')
            .setMinValues(1)
            .setMaxValues(1);

        let row = new ActionRowBuilder().addComponents(userMenu);

        const msg = await interaction.channel.send({
            embeds: [embeds],
            components: [row]
        });

        const collector = msg.createMessageComponentCollector({ time: 15000 });

        const victim = []

        await collector.on('collect', async (m) => {
            console.log(player);
            await m.deferReply({
                flags: 64, // <- only the user that make the interaction can see
            });

            if (m.customId === "userSelect") {
                if (player.killer.includes(m.user.id)) {
                    victim.push({ m });
                    await m.editReply({
                        content: "KYS vro"
                    })
                }
                else if (player.crew.includes(m.user.id)) {
                    await m.editReply({
                        content: "You are not a Traitor"
                    })
                }
                else {
                    await m.editReply({
                        content: "You havent joined this session of the game"
                    })
                }
            }
            else {

            }
        });

        await collector.on('end', async() => {
            const embed = new EmbedBuilder()
                .setDescription("The voting has ended");
            await interaction.channel.send({ embeds: [embed]});
            resolve(victim);
        });
        // Set timeout so that the while loop stop until the collecter ended
        await new Promise(resolve => setTimeout(resolve, 15000));
    })
});