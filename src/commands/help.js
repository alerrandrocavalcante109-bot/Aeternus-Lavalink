const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'help',
  description: 'Mostra lista de comandos',
  usage: '!help',
  async execute(message, args, client) {
    let commands = Array.from(client.commands.values());

    if (args.length > 0) {
      const command = client.commands.get(args[0].toLowerCase());
      if (!command) {
        return message.reply('❌ Comando não encontrado.');
      }

      const embed = new EmbedBuilder()
        .setColor(config.colors.primary)
        .setTitle(`📖 Ajuda - ${command.name}`)
        .addFields(
          { name: 'Descrição', value: command.description || 'Sem descrição' },
          { name: 'Uso', value: `\`${command.usage || `${config.prefix}${command.name}`}\`` }
        );

      return message.reply({ embeds: [embed] });
    }

    // Agrupar comandos por categoria
    const musicCommands = commands.filter((cmd) => cmd.name !== 'help');
    const helpCommands = commands.filter((cmd) => cmd.name === 'help');

    let description = '';

    if (musicCommands.length > 0) {
      description += '**🎵 Comandos de Música:**\n';
      musicCommands.forEach((cmd) => {
        description += `\`${config.prefix}${cmd.name}\` - ${cmd.description || 'Sem descrição'}\n`;
      });
    }

    if (helpCommands.length > 0) {
      description += '\n**ℹ️ Outros:**\n';
      helpCommands.forEach((cmd) => {
        description += `\`${config.prefix}${cmd.name}\` - ${cmd.description || 'Sem descrição'}\n`;
      });
    }

    description += `\n**💡 Dica:** Use \`${config.prefix}help <comando>\` para mais informações sobre um comando específico.`;

    const embed = new EmbedBuilder()
      .setColor(config.colors.primary)
      .setTitle('📚 Ajuda - Comandos Disponíveis')
      .setDescription(description)
      .setFooter({ text: `Total de ${commands.length} comando(s)` });

    message.reply({ embeds: [embed] });
  },
};
