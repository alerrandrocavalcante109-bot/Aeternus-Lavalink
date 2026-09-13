const { embedFactory } = require('../../utils/embeds');
const logger = require('../../utils/logger');

module.exports = {
  name: 'clear',
  description: 'Limpa a fila de músicas',
  usage: '!clear',
  async execute(message) {
    const player = message.client.player;
    const queue = player.nodes.get(message.guildId);

    if (!queue) {
      return message.reply({
        embeds: [embedFactory.error('Erro', 'Nenhuma fila ativa no momento!')],
      });
    }

    try {
      const clearedCount = queue.tracks.length;
      queue.clear();

      const embed = embedFactory.success('Fila Limpa', `${clearedCount} música(s) foram removidas da fila.`);
      message.reply({ embeds: [embed] });

      logger.success(`Fila limpa (${clearedCount} músicas removidas)`);
    } catch (error) {
      logger.error(`Erro ao limpar fila: ${error.message}`);
      return message.reply({
        embeds: [embedFactory.error('Erro', `Ocorreu um erro: ${error.message}`)],
      });
    }
  },
};
