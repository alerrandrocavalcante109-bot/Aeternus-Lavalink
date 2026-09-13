const { embedFactory, formatTime } = require('../../utils/embeds');

module.exports = {
  name: 'queue',
  description: 'Mostra a fila de músicas',
  usage: '!queue [página]',
  async execute(message, args) {
    const player = message.client.player;
    const queue = player.nodes.get(message.guildId);

    if (!queue || !queue.currentTrack) {
      return message.reply({
        embeds: [embedFactory.error('Erro', 'Nenhuma música está sendo tocada no momento!')],
      });
    }

    const page = args[0] ? parseInt(args[0]) : 1;
    const itemsPerPage = 10;
    const tracks = queue.tracks;

    if (tracks.length === 0) {
      return message.reply({
        embeds: [embedFactory.info('Fila Vazia', 'Não há músicas na fila além da atual.')],
      });
    }

    const totalPages = Math.ceil(tracks.length / itemsPerPage);

    if (page < 1 || page > totalPages) {
      return message.reply({
        embeds: [embedFactory.error('Erro', `Página inválida! Total: ${totalPages}`)],
      });
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = tracks.slice(startIndex, endIndex);

    let description = `**Tocando agora:**\n1. ${queue.currentTrack.title} - ${formatTime(queue.currentTrack.durationMS)}\n\n**Próximas (${tracks.length} restantes):**\n`;

    pageItems.forEach((track, index) => {
      const number = startIndex + index + 2;
      description += `${number}. ${track.title} - ${formatTime(track.durationMS)}\n`;
    });

    const embed = embedFactory.info('📋 Fila de Músicas', description);
    embed.setFooter({ text: `Página ${page} de ${totalPages}` });

    message.reply({ embeds: [embed] });
  },
};
