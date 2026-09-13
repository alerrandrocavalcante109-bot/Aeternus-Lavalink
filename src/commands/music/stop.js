const { embedFactory } = require('../../utils/embeds');
const logger = require('../../utils/logger');

module.exports = {
  name: 'stop',
  description: 'Para a reprodução de música',
  usage: '!stop',
  async execute(message) {
    const player = message.client.player;
    const queue = player.nodes.get(message.guildId);

    if (!queue || !queue.node.isPlaying()) {
      return message.reply({
        embeds: [embedFactory.error('Erro', 'Nenhuma música está sendo tocada no momento!')],
      });
    }

    try {
      queue.node.stop();
      queue.clear();

      const embed = embedFactory.success('Parado', 'A reprodução foi interrompida e a fila foi limpa.');
      message.reply({ embeds: [embed] });

      logger.success('Reprodução parada');
    } catch (error) {
      logger.error(`Erro ao parar reprodução: ${error.message}`);
      return message.reply({
        embeds: [embedFactory.error('Erro', `Ocorreu um erro: ${error.message}`)],
      });
    }
  },
};
