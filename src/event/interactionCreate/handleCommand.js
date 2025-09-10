const {EmbedBuilder} = require('discord.js');

module.exports = async (client, interaction) => {
    // client.on('interactionCreate', async (interaction) => {
    // Slash Command Interaction
    console.log(interaction);

    // If its a slash command then run
    if (interaction.isChatInputCommand()) {
        // When /kill command is entered
        if (interaction.commandName === "kill") {
            const response = interaction.options.get('user');
            const userID = response.value;

            interaction.reply(`<@${interaction.user.id}> killed <@${userID}>`);
        }

        // when /describe is runned
        if (interaction.commandName === "describe") {
            const response = interaction.options.get('tank');
            const tank = response.value

            const embed = new EmbedBuilder()
                .setTitle("Type 16 maneuver combat vehicle")
                .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/JGSDF_Type_16_Maneuver_Combat_Vehicle_%2826-7978%29_left_front_view_at_JASDF_Hamamatsu_Air_Base_October_23%2C_2022_01.jpg/1024px-JGSDF_Type_16_Maneuver_Combat_Vehicle_%2826-7978%29_left_front_view_at_JASDF_Hamamatsu_Air_Base_October_23%2C_2022_01.jpg")
                .setDescription("Japanese wheeled armoured fighting vehicle")
                .addFields(
                    {
                        name: "History",
                        value: "The Type 16 maneuver combat vehicle  is a wheeled armored fighting vehicle of the Japan Ground Self-Defense Force (JGSDF).",
                        inline: false,
                    },
                    {
                        name: "Main armament",
                        value: "105 mm L/52 gun (developed by Japan Steel Works)",
                        inline: true,
                    },
                    {
                        name: "Secondary armament",
                        value: "12.7 mm (0.5 in) M2 Browning machine gun, 7.62 mm NATO coaxial Sumitomo Type 74 machine gun (replacing M2 Browning) Type 96 40 mm Automatic grenade launcher or FN Minimi 5.56 mm NATO light machine gun",
                        inline: true,
                    }
                )
                .setColor("White");

            interaction.reply({ embeds: [embed] });
        }
    }
    // })
};