const { embedFactory } = require('../../utils/embeds');
const logger = require('../../utils/logger');

module.exports = {
  name: 'skip',
  description: 'Pula para a próxima música',
  usage: '!skip',
  async execute(message) {
    const player = message.client.player;
    const queue = player.nodes.get(message.guildId);

    if (!queue || !queue.node.isPlaying()) {
      return message.reply({
        embeds: [embedFactory.error('Erro', 'Nenhuma música está sendo tocada no momento!')],
      });
    }

    if (queue.tracks.length === 0) {
      return message.reply({
        embeds: [embedFactory.error('Erro', 'Não há próxima música na fila!')],
      });
    }

    try {
      const currentTrack = queue.currentTrack;
      queue.node.skip();

      const embed = embedFactory.success(
        'Pulado',
        `Pulei: **${currentTrack.title}**\n\nPróxima: **${queue.currentTrack?.title || 'Nenhuma'}**`
      );
      message.reply({ embeds: [embed] });

      logger.success('Música pulada');
    } catch (error) {
      logger.error(`Erro ao pular: ${error.message}`);
      return message.reply({
        embeds: [embedFactory.error('Erro', `Ocorreu um erro: ${error.message}`)],
      });
    }
  },
};
