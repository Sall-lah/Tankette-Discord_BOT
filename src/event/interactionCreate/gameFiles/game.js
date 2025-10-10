const { EmbedBuilder } = require('discord.js');
const traitorMove = require('./traitorMove');

module.exports = async (client, interaction, playerIds) => {
    const totalPlayer = playerIds.length;

    // Pick the Saboteur(Killer) by random;
    const rollNumber = Math.floor(Math.random() * totalPlayer);

    // Assign Killer and Crew
    const player = {
        killer: playerIds.filter(id => id == playerIds[rollNumber]),
        crew: playerIds.filter(id => id != playerIds[rollNumber]),
    }

    // while (player.killer.length > 0 && player.crew.length > 1) {
    while(true) {
        // Create Story Embeds
        const embedNight = new EmbedBuilder()
            .setTitle("At Night")
            .setDescription("The Traitor is Planning to do something tonight");

        await interaction.channel.send({
            embeds : [embedNight]
        })

        const killResult = await traitorMove(client, interaction, player);

        // Create Story Embeds
        // const embedNoon = new EmbedBuilder()
        //     .setTitle("At Noon")
        //     .setDescription("The Crew is planning to find the traitor");

        // await interaction.channel.send({
        //     embeds : [embedNoon]
        // })

        // const voteResult = await vote(client, interaction, player);
    }
};