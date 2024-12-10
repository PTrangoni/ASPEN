const { SlashCommandBuilder } = require('@discordjs/builders');
const voiceDiscord = require('@discordjs/voice');
const { createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const OpusScript = require('opusscript');
const encoder = new OpusScript(48000, 2);
module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('¡El bot se conecta al canal de voz!'),
    execute: async (interaction) => {
        const channel = interaction.member.voice.channel;
        if (!interaction.member.voice.channel) {
            return await interaction.reply({
                content: '¡Tenés que unirte a un canal para usar el comando!', ephemeral: true
            });
        } else {
            const connection = voiceDiscord.joinVoiceChannel({
                channelId: channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            console.log('Creando recurso de audio');
            const player = createAudioPlayer();
            const resource = createAudioResource('https://playerservices.streamtheworld.com/api/livestream-redirect/ASPEN.mp3', {
                inputType: 'opus',
                encoder,
            });
            console.log('Reproduciendo audio');
            connection.subscribe(player);
            player.play(resource);
            console.log('Intentando conectarse al canal');
            await interaction.reply('¡Reproduciendo ASPEN! :)');
            console.log(`Conexion exitosa a ${interaction.guild.name}`);
        }
    }
};
