const { ActivityType } = require('discord.js');

module.exports = (client, c) => {
    // // Check if client is running (c is client response)
    // client.on('clientReady', (c) => {
    console.log(`${c.user.tag} is Running `);

    client.user.setActivity({
        name: "The history of aircraft",
        type: ActivityType.Streaming,
        url: "https://www.youtube.com/watch?v=9xTiEx1EE1E",
    })
    // })
};