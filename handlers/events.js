const { readdirSync } = require('fs');
const { log } = require('../functions');
const PrismBot = require('../class/PrismBot');

/**
 * Loads event modules from the events directory and binds them to the client.
 *
 * @param {PrismBot} client 
 */
module.exports = (client) => {
    // Iterate through each directory in the ./src/events/ directory
    for (const dir of readdirSync('./events/')) {
        // Iterate through each file in the current directory
        for (const file of readdirSync('./events/' + dir).filter((f) => f.endsWith('.js'))) {
            // Import the event module
            const module = require('../events/' + dir + '/' + file);

            // If module import fails, log a warning and skip to next iteration
            if (!module) {
                log(`Module import failed for file: ${file}`, 'warn');
                continue;
            }

            // If necessary properties are missing, log a warning and skip to next iteration
            if (!module.event || !module.run) {
                log(`Unable to load the event ${file} due to missing 'event' or/and 'run' properties.`, 'warn');
                continue;
            }

            // Log successful event loading
            log(`Loaded new event: ${file}`, 'info');

            // Bind the event to the client
            if (module.once) {
                client.once(module.event, (...args) => module.run(client, ...args));
            } else {
                client.on(module.event, (...args) => module.run(client, ...args));
            }
        }
    }
};
