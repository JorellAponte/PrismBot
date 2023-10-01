const { Message, VoiceChannel } = require('discord.js');
const PrismBot = require('../../../class/PrismBot');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr'); // Add ytsr for searching YouTube
const sodium = require('libsodium-wrappers');


// Create an audio player and a connection manager
const audioPlayer = createAudioPlayer();
const connections = new Map();

module.exports = {
    structure: {
        name: 'play',
        description: 'Play a YouTube song in a voice channel',
        aliases: [],
    },
    /**
     * @param {PrismBot} client
     * @param {Message<true>} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            message.reply('You must be in a voice channel to use this command.');
            return;
        }

        const connection = connections.get(voiceChannel.guild.id);

        if (!connection) {
            const voiceConnection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            voiceConnection.subscribe(audioPlayer);

            connections.set(voiceChannel.guild.id, voiceConnection);
        }

        if (!args[0]) {
            message.reply('Please provide a YouTube URL or a search query to play.');
            return;
        }

        // Check if the argument is a YouTube URL
        if (ytdl.validateURL(args[0])) {
            // Play the provided YouTube URL
            const stream = ytdl(args[0], { filter: 'audioonly' });
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            audioPlayer.play(resource);

            audioPlayer.on(AudioPlayerStatus.Idle, () => {
                connections.get(voiceChannel.guild.id)?.disconnect();
                connections.delete(voiceChannel.guild.id);
            });

            message.reply('Now playing: ' + args[0]);
        } else {
            // Search for YouTube videos based on the query
            const searchResults = await ytsr(args.join(' '), { limit: 1 });

            if (searchResults && searchResults.items.length > 0) {
                const videoUrl = searchResults.items[0].url;
                const stream = ytdl(videoUrl, { filter: 'audioonly' });
                const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
                audioPlayer.play(resource);

                audioPlayer.on(AudioPlayerStatus.Idle, () => {
                    connections.get(voiceChannel.guild.id)?.disconnect();
                    connections.delete(voiceChannel.guild.id);
                });

                message.reply('Now playing: ' + videoUrl);
            } else {
                message.reply('No search results found for the query: ' + args.join(' '));
            }
        }
    },
};
