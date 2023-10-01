// Import necessary classes and objects from discord.js and other modules
const { Client, Partials, Collection, GatewayIntentBits } = require("discord.js");
const config = require('../config');
const commands = require("../handlers/commands");
const events = require("../handlers/events");
const deploy = require("../handlers/deploy");
const mongoose = require("../handlers/mongoose");
const components = require("../handlers/components");

// Define the PrismBot class, extending the discord.js Client class
module.exports = class PrismBot extends Client {
    
    // Define collections and array to hold commands, aliases, and interactive components
    collection = {
        interactioncommands: new Collection(),
        prefixcommands: new Collection(),
        aliases: new Collection(),
        components: {
            buttons: new Collection(),
            selects: new Collection(),
            modals: new Collection()
        }
    };
    applicationcommandsArray = [];

    // Constructor to initialize the client with specific configurations
    constructor() {
        super({
            // Specify all intents by spreading the array of keys from GatewayIntentBits
            intents: [Object.keys(GatewayIntentBits)],
            // Specify all partials by spreading the array of keys from Partials
            partials: [Object.keys(Partials)],
            // Set the bot's presence and activity
            presence: {
                activities: [{
                    name: 'something goes here',
                    type: 4,
                    state: 'PrismBot v2'  // Updated to PrismBot
                }]
            }
        });
    };

    // Asynchronous start method to initialize handlers and log in to Discord
    start = async () => {
        // Initialize command, event, and component handlers
        commands(this);
        events(this);
        components(this);

        // Conditionally initialize MongoDB connection if configured to do so
        if (config.handler.mongodb.toggle) mongoose();

        // Log in to Discord using the client token from environment variables or config
        await this.login(process.env.CLIENT_TOKEN || config.client.token);

        // Conditionally deploy commands if configured to do so
        if (config.handler.deploy) deploy(this, config);
    };
};
