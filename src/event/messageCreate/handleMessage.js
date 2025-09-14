module.exports = (client, message) => {
    // When new message is created on the server
    // client.on('messageCreate', (message) => {
    // console.log(message);
    if (message.author.bot) {
        return;
    }

    if (message.content === "hi") {
        message.reply('KYS');
    }
    // })
}