const { embedFactory } = require('../../utils/embeds');
const logger = require('../../utils/logger');

module.exports = {
  name: 'play',
  description: 'Toca uma música',
  usage: '!play <nome da música ou URL>',
  async execute(message, args) {
    // Validações
    if (!args.length) {
      return message.reply({
        embeds: [embedFactory.error('Erro', 'Você precisa especificar uma música ou URL!')],
      });
    }

    // Verificar se está em um canal de voz
    if (!message.member.voice.channel) {
      return message.reply({
        embeds: [embedFactory.error('Erro', 'Você precisa estar em um canal de voz!')],
      });
    }

    // Verificar permissões
    if (!message.guild.members.me.permissions.has('CONNECT')) {
      return message.reply({
        embeds: [embedFactory.error('Erro', 'Não tenho permissão para conectar no canal de voz!')],
      });
    }

    try {
      const query = args.join(' ');
      const player = message.client.player;

      // Mostrar que está buscando
      const searchingEmbed = embedFactory.info('Buscando', `Procurando por: **${query}**`);
      const searchMsg = await message.reply({ embeds: [searchingEmbed] });

      // Buscar música
      const results = await player.search(query, {
        requestedBy: message.author,
      });

      if (!results.hasTracks()) {
        return searchMsg.edit({
          embeds: [embedFactory.error('Não encontrado', `Nenhuma música encontrada para: **${query}**`)],
        });
      }

      // Obter ou criar fila
      let queue = player.nodes.get(message.guildId);

      if (!queue) {
        queue = player.nodes.create(message.guildId, {
          metadata: {
            channel: message.channel,
            voiceChannel: message.member.voice.channel,
          },
          leaveOnEnd: true,
          leaveOnEmpty: true,
          leaveOnEmptyCooldown: 60000,
          defaultFFmpegFilters: [],
        });
      }

      // Conectar ao canal
      if (!queue.connection) {
        await queue.connect(message.member.voice.channel);
      }

      // Adicionar música
      const track = results.tracks[0];
      queue.addTrack(track);

      const playingEmbed = embedFactory.track(track);
      await searchMsg.edit({
        embeds: [playingEmbed],
      });

      logger.success(`Música adicionada: ${track.title}`);

      // Iniciar reprodução se não estiver tocando
      if (!queue.node.isPlaying()) {
        await queue.node.play();
      }
    } catch (error) {
      logger.error(`Erro ao tocar música: ${error.message}`);
      return message.reply({
        embeds: [embedFactory.error('Erro', `Ocorreu um erro ao tocar a música: ${error.message}`)],
      });
    }
  },
};
