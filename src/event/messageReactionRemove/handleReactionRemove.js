module.exports = async (client, reaction, user) => {
    // // Run when someone remove a Reaction
    // client.on('messageReactionRemove', async (reaction, user) => {
    // // This event fires when a reaction is removed from a message.
    // // Similar to messageReactionAdd, you have access to the reaction and user.

    const roleList = {
        "🔵": "1413826588075757609",
        "🟡": "1413826731822813234",
    }

    const emoji = reaction._emoji.name;

    if (reaction.message.id != process.env.CLAIM_ROLE_MESSAGE_ID || !roleList[emoji]) {
        return;
    }

    try {
        const guild = client.guilds.cache.get(process.env.SERVER_ID); // Get server object
        const member = await guild.members.fetch(user.id) // Fetch user object

        const role = member.guild.roles.cache.get(roleList[emoji]); // Get role object
        await member.roles.remove(role);
    }
    catch (e) {
        console.log(e);
    }
    // });
}