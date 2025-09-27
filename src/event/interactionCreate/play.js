const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, c } = require('discord.js');
const game = require('./gameFiles/game');

module.exports = async (client, interaction) => {
    try {
        if (interaction.isChatInputCommand()) {
            if (interaction.commandName === "play") {
                // send a message to let user join the game
                const embed = new EmbedBuilder()
                    .setTitle("Sabotaged Squadron")
                    .setDescription("a game of Sabotaged Squadron will begin. \nreact to this massage to join the game")
                    .setColor("White")
                    .setTimestamp();

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId("join").setLabel("Join").setStyle(ButtonStyle.Success)
                );
                // Send reply
                await interaction.reply({ embeds: [embed], components: [row] });

                // Fetch reply message
                const reply = await interaction.fetchReply();

                // make a collector to get the user who joined the game
                const collector = reply.createMessageComponentCollector({ time: 15000 });

                let playerIds = [];

                await collector.on('collect', (m) => {
                    if(!playerIds.includes(m.user.id)){
                        playerIds.push(m.user.id);
                        m.reply(`<@${m.user.id}> joined the game`);  
                    }
                });

                await collector.on('end', () => {
                    if(playerIds.length >= 1){
                        interaction.channel.send(`The game will start soon`);

                        // Load Game
                        setTimeout(() => {
                            game(client, interaction, playerIds);
                        }, 2000);
                    }
                    else{
                        interaction.channel.send(`You need more than 3 people to start the game`);
                        return;
                    }    
                });
            }
        }
    }
    catch (e) {
        console.log(e);
    }
};