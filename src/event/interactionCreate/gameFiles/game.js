const { EmbedBuilder } = require('discord.js');
const traitorMove = require('./traitorMove');

module.exports = async (client, interaction, playerIds) => {
    const totalPlayer = playerIds.length;

    // Pick the Saboteur(Killer) by random;
    const rollNumber = Math.floor(Math.random() * totalPlayer);

    // Assign Killer and Crew
    let player = {
        killer: playerIds.filter(id => id == playerIds[rollNumber]),
        crew: playerIds.filter(id => id != playerIds[rollNumber]),
        dead: []
    }

    // while (player.killer.length > 0 && player.crew.length > 1) {
    while(true) {
        // Send a night dialog
        const embedNight = new EmbedBuilder()
            .setTitle("At Night")
            .setDescription("The Traitor is Planning to do something tonight");
        await interaction.channel.send({
            embeds : [embedNight]
        })

        // Get the user that is chosed by the traitor
        const killResult = await traitorMove(client, interaction, player);

        // Create and Send Result message
        let embedNightResult;
        if(killResult.length > 0){
            // Change player status
            player.crew = player.crew.filter((t) => {return t !== killResult[0].m.values[0]});
            player.dead.push(killResult[0].m.values[0]);
            
            embedNightResult = new EmbedBuilder()
            .setTitle("In the morning")
            .setDescription(`Last night, a crew with the name of <@${killResult[0].m.values[0]}> have been killed by a traitor`);
        } else {
            embedNightResult = new EmbedBuilder()
            .setTitle("In the morning")
            .setDescription("No one is dead today");
        }
        await interaction.channel.send({
            embeds : [embedNightResult]
        })

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