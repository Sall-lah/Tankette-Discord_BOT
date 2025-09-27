module.exports = async (client, interaction) => {
    // Button Interaction
    // client.on('interactionCreate', async (interaction) => {
    // console.log(interaction);
    // If it an interaction button then run
    if (interaction.isButton()) {
        if (interaction.message.id == "1413831231107366955") {
            // Give the user the massage the bot is thinking
            await interaction.deferReply({
                flags: 64, // <- only the user that make the interaction can see
            });

            // Get the role id
            const role = interaction.member.guild.roles.cache.get(interaction.customId);

            // Check if the user already had the role
            const hasRole = interaction.member.roles.cache.has(role.id);

            // Remove Role
            if (hasRole) {
                await interaction.member.roles.remove(role);
                await interaction.editReply({
                    content: `Removed role`,
                })
                return;
            }

            // Add Role
            await interaction.member.roles.add(role);
            interaction.editReply({
                content: `Role added`
            })
        }
    }
    // })
}