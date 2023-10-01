#!/bin/bash
cd /home/prismbot/PrismBot

# Log Node.js version to bot.log
echo "Node.js version: $(node -v)" > bot.log

# Log start message to bot.log
echo "Starting PrismBot..." >> bot.log

# Use nodemon to run index.js, monitor for changes, and log output to bot.log
nodemon ./ >> bot.log 2>&1
