module.exports = async (client, reaction, user) => {
    // // Run when someone add a reaction
    // client.on('messageReactionAdd', async (reaction, user) => {
    // // This event fires when a reaction is added to a message.
    // // 'reaction' is a MessageReaction object representing the reaction.
    // // 'user' is the User object of the person who added the reaction.
    // // You can access the message content: reaction.message.content
    // // You can access the emoji details: reaction.emoji.name, reaction.emoji.id

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
        await member.roles.add(role);
    }
    catch (e) {
        console.log(e);
    }
    // });
}