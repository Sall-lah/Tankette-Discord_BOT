const { testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');

module.exports = async (client, c) => {
    try {
        const localCommands = getLocalCommands([]);
        const applicationCommands = await getApplicationCommands(client, testServer)

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;

            let existingCommand;
            const guildCommands = applicationCommands.cache;

            for (data of await guildCommands) {
                if (data[1].name === name) {
                    existingCommand = data[1];
                }
            }

            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Deleted Command ${name}`);
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    })

                    console.log(`Updated Command ${name}`)
                    continue;
                } else {
                    if (localCommand.deleted) {
                        continue;
                    }
                    continue;
                }
            }
            await applicationCommands.create({
                name,
                description,
                options,
            })
            console.log(`Command ${name} Registered`);
        }
    }
    catch (e) {
        console.log(e);
    }
}