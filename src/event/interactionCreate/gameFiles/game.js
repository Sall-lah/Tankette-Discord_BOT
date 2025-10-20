const { EmbedBuilder } = require('discord.js');
const traitorMove = require('./traitorMove');
const vote = require('./vote');
const getHighestVote =  require('./gameUtils/findHighestVote');
const getUserTeam = require('./gameUtils/getUserTeam');

module.exports = async (client, interaction, playerIds) => {
    // Get total palyer
    const totalPlayer = playerIds.length;
    // Pick the Saboteur(Killer) by random;
    const rollNumber = Math.floor(Math.random() * totalPlayer);

    // Assign Killer and Crew
    let player = {
        killer: playerIds.filter(id => id == playerIds[rollNumber]),
        crew: playerIds.filter(id => id != playerIds[rollNumber]),
        alive: playerIds,
        dead: [],
        list: playerIds,
    }

    // A scoreboard view when the game ended
    const team = {
        traitor: player.killer,
        crew: player.crew
    }

    // While there still exist killer and there atleast more than 2 crew member
    while (player.killer.length > 0 && player.crew.length > 2) {
    // while(true) {
        // Send a night dialog
        const embedNight = new EmbedBuilder()
            .setTitle("At Night")
            .setDescription("The Traitor is Planning to do something tonight")
            .setColor("Red")
            .setTimestamp();
        await interaction.channel.send({
            embeds : [embedNight]
        })

        // Get the user that is chosed by the traitor
        const killResult = await traitorMove(client, interaction, player);

        // Create and Send Result message
        let embedNightResult;
        if(killResult.victimID.length > 0){
            // Removed the killed person from crew
            player.crew = player.crew.filter((t) => {return t !== killResult.victimID[0]});
            // Change the status
            player.alive = player.alive.filter((t) => {return t !== killResult.victimID[0]});
            player.dead.push(killResult.victimID[0]);
            
            embedNightResult = new EmbedBuilder()
            .setTitle("In the morning")
            .setDescription(`Last night, a crew with the name of <@${killResult.victimID[0]}> have been killed by a traitor`)
            .setColor("White")
            .setTimestamp();
        } else {
            embedNightResult = new EmbedBuilder()
            .setTitle("In the morning")
            .setDescription("No one is dead today")
            .setColor("White")
            .setTimestamp();
        }
        await interaction.channel.send({
            embeds : [embedNightResult]
        })

        // Create Story Embeds
        const embedNoon = new EmbedBuilder()
            .setTitle("At Noon")
            .setDescription("The Crew is planning to find the traitor")
            .setColor("Blue")
            .setTimestamp();

        await interaction.channel.send({
            embeds : [embedNoon]
        })

        const voteResult = await vote(client, interaction, player);
        const votedID = getHighestVote(voteResult);

        if(voteResult.crewID.length > 0 && votedID != null){
            // Removed the killed person from crew or traitor
            if(player.crew.includes(votedID)){
                player.crew = player.crew.filter((t) => {return t !== votedID});  
            }
            else{
                player.killer = player.killer.filter((t) => {return t !== votedID});  
            }
            

            // Change the status
            player.alive = player.alive.filter((t) => {return t !== votedID});
            player.dead.push(votedID);

            embedNightResult = new EmbedBuilder()
            .setTitle("Vote Result")
            .setDescription(`A crew with the name of <@${killResult.victimID[0]}> has been voted out`)
            .setColor("White")
            .setTimestamp();
        }
        else {
            embedNightResult = new EmbedBuilder()
            .setTitle("Vote Result")
            .setDescription("No one is voted out")
            .setColor("White")
            .setTimestamp();
        }
        await interaction.channel.send({
            embeds : [embedNightResult]
        })
    }
    // Get the team list string
    const userTeamString = getUserTeam(team);
    // Send match summary
    if (player.killer.length > 0) {
        embedNightResult = new EmbedBuilder()
            .setTitle("The traitors win")
            .setDescription(userTeamString)
            .setColor("White")
            .setTimestamp();
    }
    else {
        embedNightResult = new EmbedBuilder()
            .setTitle("The crew win")
            .setDescription(userTeamString)
            .setColor("White")
            .setTimestamp();
    }
    await interaction.channel.send({
        embeds: [embedNightResult]
    })
};