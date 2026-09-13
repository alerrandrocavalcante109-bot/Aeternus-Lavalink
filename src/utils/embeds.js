const { EmbedBuilder } = require('discord.js');
const config = require('../config');

const embedFactory = {
  success: (title, description) => {
    return new EmbedBuilder()
      .setColor(config.colors.success)
      .setTitle(`✅ ${title}`)
      .setDescription(description)
      .setTimestamp();
  },

  error: (title, description) => {
    return new EmbedBuilder()
      .setColor(config.colors.error)
      .setTitle(`❌ ${title}`)
      .setDescription(description)
      .setTimestamp();
  },

  info: (title, description) => {
    return new EmbedBuilder()
      .setColor(config.colors.primary)
      .setTitle(`ℹ️ ${title}`)
      .setDescription(description)
      .setTimestamp();
  },

  nowPlaying: (track) => {
    const duration = formatTime(track.durationMS);
    const progress = '▶️ Tocando agora';

    return new EmbedBuilder()
      .setColor(config.colors.primary)
      .setTitle('🎵 Tocando Agora')
      .setDescription(`**${track.title}**`)
      .addFields(
        { name: 'Artista', value: track.author || 'Desconhecido', inline: true },
        { name: 'Duração', value: duration, inline: true },
        { name: 'Fonte', value: track.source, inline: true }
      )
      .setThumbnail(track.thumbnail)
      .setTimestamp();
  },

  queue: (tracks, currentTrack, page = 1) => {
    const itemsPerPage = 10;
    const totalPages = Math.ceil(tracks.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = tracks.slice(startIndex, endIndex);

    let description = `**Tocando:** ${currentTrack.title}\n\n**Fila (${tracks.length} músicas):**\n`;

    pageItems.forEach((track, index) => {
      const number = startIndex + index + 1;
      description += `${number}. ${track.title} - ${formatTime(track.durationMS)}\n`;
    });

    return new EmbedBuilder()
      .setColor(config.colors.primary)
      .setTitle('📋 Fila de Músicas')
      .setDescription(description)
      .setFooter({ text: `Página ${page} de ${totalPages}` })
      .setTimestamp();
  },

  track: (track) => {
    return new EmbedBuilder()
      .setColor(config.colors.primary)
      .setTitle('🎵 Música')
      .setDescription(`**${track.title}**`)
      .addFields(
        { name: 'Artista', value: track.author || 'Desconhecido', inline: true },
        { name: 'Duração', value: formatTime(track.durationMS), inline: true },
        { name: 'Fonte', value: track.source, inline: true }
      )
      .setThumbnail(track.thumbnail)
      .setTimestamp();
  },
};

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60)
      .toString()
      .padStart(2, '0')}`;
  }
  return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
}

module.exports = { embedFactory, formatTime };
