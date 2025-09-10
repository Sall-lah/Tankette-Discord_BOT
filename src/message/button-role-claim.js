require('dotenv').config();

// Get module from discord.js
const {Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

// Setup client intents
const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

const roles = [
    {
        id: '1413826588075757609',
        label: 'Light Tank'
    },
    {
        id: '1413826731822813234',
        label: 'Medium Tank'
    }
]



// Send claim role massage
client.on('clientReady', async (c) => {
    try{
        // Get the channel
        const channel = await client.channels.cache.get("1413818307714224139");

        // If the channel doesnt exist
        if (!channel) {
            return;
        }

        const row = new ActionRowBuilder();

        // Insert the button to row
        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Success)
            )
        })

        // Send massage to channel
        await channel.send({
            content: "Claim or remove Role",
            components: [row]
        })
        process.exit();
    }
    catch(e){
        console.log(e);
    }
})

client.login(process.env.BOT_TOKEN);