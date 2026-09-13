const { embedFactory } = require('../../utils/embeds');
const logger = require('../../utils/logger');

module.exports = {
  name: 'resume',
  description: 'Retoma a reprodução de música',
  usage: '!resume',
  async execute(message) {
    const player = message.client.player;
    const queue = player.nodes.get(message.guildId);

    if (!queue || !queue.node.isPlaying()) {
      return message.reply({
        embeds: [embedFactory.error('Erro', 'Nenhuma música está sendo tocada no momento!')],
      });
    }

    if (!queue.node.isPaused()) {
      return message.reply({
        embeds: [embedFactory.error('Erro', 'A música não está pausada!')],
      });
    }

    try {
      queue.node.resume();

      const embed = embedFactory.success('Retomado', 'A música foi retomada.');
      message.reply({ embeds: [embed] });

      logger.success('Reprodução retomada');
    } catch (error) {
      logger.error(`Erro ao retomar: ${error.message}`);
      return message.reply({
        embeds: [embedFactory.error('Erro', `Ocorreu um erro: ${error.message}`)],
      });
    }
  },
};
