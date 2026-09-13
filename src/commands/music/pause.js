const { embedFactory } = require('../../utils/embeds');
const logger = require('../../utils/logger');

module.exports = {
  name: 'pause',
  description: 'Pausa a reprodução de música',
  usage: '!pause',
  async execute(message) {
    const player = message.client.player;
    const queue = player.nodes.get(message.guildId);

    if (!queue || !queue.node.isPlaying()) {
      return message.reply({
        embeds: [embedFactory.error('Erro', 'Nenhuma música está sendo tocada no momento!')],
      });
    }

    if (queue.node.isPaused()) {
      return message.reply({
        embeds: [embedFactory.error('Erro', 'A música já está pausada!')],
      });
    }

    try {
      queue.node.pause();

      const embed = embedFactory.success('Pausado', 'A música foi pausada.');
      message.reply({ embeds: [embed] });

      logger.success('Reprodução pausada');
    } catch (error) {
      logger.error(`Erro ao pausar: ${error.message}`);
      return message.reply({
        embeds: [embedFactory.error('Erro', `Ocorreu um erro: ${error.message}`)],
      });
    }
  },
};
