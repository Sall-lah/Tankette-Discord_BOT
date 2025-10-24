const { EmbedBuilder, ActionRowBuilder, UserSelectMenuBuilder } = require('discord.js');
const getUserStatusString = require('../utils/getUserStatusString')

module.exports = (async (client, interaction, player) => {
    return new Promise(async (resolve) => {
        const embeds = new EmbedBuilder()
            .setTitle("Afternoon")
            .setDescription("Who will the crew vote out\n" + getUserStatusString(player) + "\nTime: 30s")
            .setColor("Blue")
            .setTimestamp();

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

        const collector = msg.createMessageComponentCollector({ time: 30000 });

        let voteList = {
            crewID: [],
            voteID: {}
        }

        await collector.on('collect', async (m) => {
            await m.deferReply({
                flags: 64, // <- only the user that make the interaction can see
            });

            if (m.customId === "userSelect") {
                // If the user that send the message is elready dead
                if (player.dead.includes(m.user.id)) {
                    await m.editReply({
                        content: `You are elready dead`
                    })
                }
                // if the crew havent Voted
                else if (!voteList.crewID.includes(m.user.id)) {
                    // If the selected user is not a player this session
                    if(!player.list.includes(m.values[0])){
                        await m.editReply({
                            content: `This user is not playing on this session of the game`
                        })
                    }
                    // if the selected user is a crew that are already dead
                    else if (player.dead.includes(m.values[0])){
                        await m.editReply({
                            content: `This player is already dead`
                        })
                    }
                    // if the selected user is a valid crew and alive
                    else {
                        // Menyimpan ID sang pembunuh
                        voteList.crewID.push(m.user.id);

                        // Add new
                        if(!voteList.voteID[m.values[0]]){
                            voteList.voteID = {
                                ...(voteList.voteID),
                                [m.values[0]]: 1, 
                            }
                        }
                        else {
                            // Update Old vote
                            voteList.voteID[m.values[0]] += 1;
                        }
                    
                        await m.editReply({
                            content: `You choose to vote <@${m.values[0]}>`
                        })
                    }
                }
                // if the crew already selected a voted
                else if(voteList.crewID.includes(m.user.id)){
                        await m.editReply({
                            content: `You already voted someone`
                        })
                    }
                // If the user that send the message is not playing the game in this session
                else {
                    await m.editReply({
                        content: "You havent joined this session of the game"
                    })
                }
            }
            else {
                // if the message is no userSelect
            }
        });

        await collector.on('end', async () => {
            const embed = new EmbedBuilder()
                .setDescription("The voting has ended")
                .setColor("Blue")
                .setTimestamp();
            await interaction.channel.send({ embeds: [embed] });
            resolve(voteList);
        });

        // Set timeout so that the while loop stop until the collecter ended
        await new Promise(resolve => setTimeout(resolve, 30000));
    })
});