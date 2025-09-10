const path = require('path');
const getAllFiles = require('../utils/getAllFiles');

module.exports = (client) => {
    const folders = getAllFiles(path.join(__dirname, "..", "event"), true);

    for (const folder of folders) {
        const eventFiles = getAllFiles(folder);
        const eventName = folder.replace(/\\/g, '/').split('/').pop();

        client.on(eventName, async(...args) => {
            for(eventFile of eventFiles){
                const event = require(eventFile);

                await event(client, ...args);
            }
        })
    }
};