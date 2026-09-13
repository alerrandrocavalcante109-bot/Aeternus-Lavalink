const { embedFactory } = require('../../utils/embeds');
const logger = require('../../utils/logger');

module.exports = {
  name: 'volume',
  description: 'Ajusta o volume da reprodução',
  usage: '!volume <0-100>',
  async execute(message, args) {
    const player = message.client.player;
    const queue = player.nodes.get(message.guildId);

    if (!queue || !queue.node.isPlaying()) {
      return message.reply({
        embeds: [embedFactory.error('Erro', 'Nenhuma música está sendo tocada no momento!')],
      });
    }

    if (!args.length) {
      const currentVolume = queue.node.volume;
      return message.reply({
        embeds: [
          embedFactory.info('Volume Atual', `O volume está em: **${currentVolume}%**`),
        ],
      });
    }

    const volume = parseInt(args[0]);

    if (isNaN(volume) || volume < 0 || volume > 100) {
      return message.reply({
        embeds: [embedFactory.error('Erro', 'Volume deve estar entre 0 e 100!')],
      });
    }

    try {
      queue.node.setVolume(volume);

      const embed = embedFactory.success('Volume Ajustado', `Volume definido para: **${volume}%**`);
      message.reply({ embeds: [embed] });

      logger.success(`Volume ajustado para ${volume}%`);
    } catch (error) {
      logger.error(`Erro ao ajustar volume: ${error.message}`);
      return message.reply({
        embeds: [embedFactory.error('Erro', `Ocorreu um erro: ${error.message}`)],
      });
    }
  },
};
