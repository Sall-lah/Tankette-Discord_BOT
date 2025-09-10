require('dotenv').config();

// Get module from discord.js
const {Client, IntentsBitField, EmbedBuilder} = require('discord.js');

// Setup client intents
const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

// Send claim role massage
client.on('clientReady', async (c) => {
    try{
        // Get the channel
        const channel = await client.channels.cache.get("1413818307714224139");

        // If the channel doesnt exist
        if (!channel) {
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle("Claim Role")
            .setDescription(`Add role based on your play style\n🔵 <@&1413826588075757609>\n🟡 <@&1413826731822813234>`)

        await channel.send({ embeds: [embed] })
        process.exit();
    }
    catch(e){
        console.log(e);
    }
})

client.login(process.env.BOT_TOKEN);