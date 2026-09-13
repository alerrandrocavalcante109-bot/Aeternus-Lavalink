const { embedFactory } = require('../../utils/embeds');

module.exports = {
  name: 'nowplaying',
  description: 'Mostra a música que está tocando agora',
  usage: '!nowplaying',
  async execute(message) {
    const player = message.client.player;
    const queue = player.nodes.get(message.guildId);

    if (!queue || !queue.currentTrack) {
      return message.reply({
        embeds: [embedFactory.error('Erro', 'Nenhuma música está sendo tocada no momento!')],
      });
    }

    const track = queue.currentTrack;
    const embed = embedFactory.nowPlaying(track);

    message.reply({ embeds: [embed] });
  },
};
