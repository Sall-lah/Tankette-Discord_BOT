require('dotenv').config();

// Get event handler module
const eventHandler = require('./src/handlers/eventHandler');

// Get module from discord.js
const {Client, IntentsBitField, Partials, Collection} = require('discord.js');

// Setup client intents
const client = new Client({
    intents:[ // Intents tell Discord what events your bot wants to receive.
        IntentsBitField.Flags.Guilds, // Allow your bot to get event on your server
        IntentsBitField.Flags.GuildMembers, // Your bot knows when people join/leave, and you can manage roles & member info.
        IntentsBitField.Flags.GuildMessages, // Lets your bot receive events about messages in servers.
        IntentsBitField.Flags.MessageContent, // Lets your bot read the actual text of messages.
        IntentsBitField.Flags.GuildMessageReactions, // Lets your bot receive events about reactions on guild messages.
    ],
    partials: [ // Partial returns uncached, you need to fetch() the full object
        Partials.Message, // Lets you receive events for uncached messages (e.g. someone reacts to a message sent before bot startup).
        Partials.Channel, // Lets you handle events for uncached channels (common for DMs, since DM channels aren’t cached until used).
        Partials.Reaction // Lets you handle events for uncached reactions (important for messageReactionAdd / Remove).
    ]
});

// Make a collection to collect the callback that a commands have
client.commands = new Collection();

// Run event handler
eventHandler(client);

// Start client
client.login(process.env.BOT_TOKEN);