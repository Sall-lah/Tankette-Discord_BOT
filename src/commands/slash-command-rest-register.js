require('dotenv').config();

const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'kill',
        description: 'Kill someone',
        options: [
            {
                name: "user",
                description: "Other server member",
                type: ApplicationCommandOptionType.User,
            }
        ]
    },
    {
        name: 'history',
        description: 'A short history of the tank',
        options: [
            {
                name: "tank",
                description: "Describe a tank History",
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: "Type 16",
                        value: "Type_16_maneuver_combat_vehicle",
                    },
                    {
                        name: "L3/33",
                        value: "L3/33",
                    }
                ],
            },
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

// Load all command to discord
(async () =>{
    try{
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.SERVER_ID),
            { body: commands }
        )
    }
    catch(e){
        console.log({message: e.message});
    }
    finally{
        console.log("loaded all Command");
    }
})();