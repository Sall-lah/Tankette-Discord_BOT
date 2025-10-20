const { EmbedBuilder, ActionRowBuilder, UserSelectMenuBuilder } = require('discord.js');
const getUserStatusString = require('./gameUtils/getUserStatusString')

module.exports = (async (client, interaction, player) => {
    return new Promise(async (resolve) => {
        const embeds = new EmbedBuilder()
            .setTitle("The Night Begins")
            .setDescription("Who will the Traitor choose\n" + getUserStatusString(player) + "\nTime: 15s")
            .setColor("Red")
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

        const collector = msg.createMessageComponentCollector({ time: 15000 });

        const killList = {
            killerID: [],
            victimID: []
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
                // If the user that send the message is not a traitor
                else if (player.crew.includes(m.user.id)) {
                    await m.editReply({
                        content: "You are not a Traitor"
                    })
                }
                // if the traitor havent selected a crew to kill
                else if (player.killer.includes(m.user.id) && !killList.killerID.includes(m.user.id)) {
                    // If the traitor selected themself
                    if(m.user.id === m.values[0]){
                        await m.editReply({
                            content: `You cant kill your self vro`
                        })
                    }
                    // If the selected user is not a player this session
                    else if(!player.list.includes(m.values[0])){
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
                        killList.killerID.push(m.user.id);
                        // Jika korban sudah dipilih oleh traitor lain
                        if(!killList.victimID.includes(m.values[0])){
                            // Menyimpan ID korban yang di bunuh
                            killList.victimID.push(m.values[0]);    
                        }
                    
                        await m.editReply({
                            content: `You choose to kill <@${m.values[0]}> tonight`
                        })
                    }
                }
                // if the traitor already selected a crew to kill
                else if(player.killer.includes(m.user.id) && killList.killerID.includes(m.user.id)){
                        await m.editReply({
                            content: `You already selected someone to kill`
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
                .setDescription("The night has ended")
                .setColor("Red")
                .setTimestamp();
            await interaction.channel.send({ embeds: [embed] });
            resolve(killList);
        });
        // Set timeout so that the while loop stop until the collecter ended
        await new Promise(resolve => setTimeout(resolve, 15000));
    })
});