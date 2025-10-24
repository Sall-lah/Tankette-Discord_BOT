const { EmbedBuilder } = require('discord.js');
const getData = require('../../../utils/fetchWiki');

module.exports = async (client, interaction) => {
    // try {
    //     // client.on('interactionCreate', async (interaction) => {
    //     // Slash Command Interaction
    //     // console.log(interaction);

    //     // If its a slash command then run
    //     if (interaction.isChatInputCommand()) {
    //         // when /describe is runned
    //         if (interaction.commandName === "describe") {
    //             const tank = interaction.options.get('tank') ?? false;
    //             const type = interaction.options.get('type') ?? false;
    //             const shell = interaction.options.get('shell') ?? false;

    //             // Validate that user can only send one options
    //             const check = [tank, type, shell].filter(Boolean);
    //             if(check.length !== 1){
    //                 interaction.reply("You need to choose only one option");
    //                 return;
    //             }

    //             let data;
    //             if(tank){
    //                 data = await getData(tank.value);
    //             }
    //             else if(type){
    //                 data = await getData(type.value);
    //             }
    //             else if(shell){
    //                 data = await getData(shell.value);
    //             }

    //             const embed = new EmbedBuilder()
    //                 .setTitle(data.title)
    //                 .setThumbnail(data.thumbnail.source)
    //                 .setDescription(data.description)
    //                 .addFields(
    //                     {
    //                         name: "Description",
    //                         value: data.extract,
    //                         inline: false,
    //                     },
    //                     // {
    //                     //     name: "Main armament",
    //                     //     value: "105 mm L/52 gun (developed by Japan Steel Works)",
    //                     //     inline: true,
    //                     // },
    //                     // {
    //                     //     name: "Secondary armament",
    //                     //     value: "12.7 mm (0.5 in) M2 Browning machine gun, 7.62 mm NATO coaxial Sumitomo Type 74 machine gun (replacing M2 Browning) Type 96 40 mm Automatic grenade launcher or FN Minimi 5.56 mm NATO light machine gun",
    //                     //     inline: true,
    //                     // }
    //                 )
    //                 .setColor("White")
    //                 .setTimestamp()
    //                 .setFooter({ text: "By Wikipedia" });

    //             interaction.reply({ embeds: [embed] });
    //         }
    //     }
    // }
    // catch (e) {
    //     interaction.reply("Something went wrong !!!");
    //     console.log(e)
    // }
    // // })
};