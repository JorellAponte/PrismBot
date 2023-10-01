require('dotenv').config();
const PrismBot = require('./class/PrismBot');  // Updated class name
const logError = require('./logger');  // Import the logger

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);

    // Optionally, you can log the stack trace
    console.error('Stack Trace:', reason.stack);

    // Log information about the message (if available)
    if (promise.context?.message) {
        console.error('Message:', promise.context.message.content);
        console.error('Author:', promise.context.message.author.tag);
    }
});

// Handle uncaught exceptions
process.on('uncaughtException', error => {
    console.error('Uncaught Exception:', error);

    // Optionally, you can log the stack trace
    console.error('Stack Trace:', error.stack);

    // Log information about the message (if available)
    if (error.context?.message) {
        console.error('Message:', error.context.message.content);
        console.error('Author:', error.context.message.author.tag);
    }

    // Perform any necessary cleanup or shutdown operations here
    // For example, gracefully close database connections or other resources

    // Exit the application (you can choose an appropriate exit code)
    process.exit(1);
});

const client = new PrismBot();  // Updated class name

client.start();

// Make sure to handle errors within your application code as well
// Example: Wrap your client.start() function in a try...catch block
// to capture any synchronous errors that occur during startup.
