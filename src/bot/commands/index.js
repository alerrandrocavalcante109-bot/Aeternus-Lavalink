const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
/** Editar o index.js para deixar o bot online */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('index')
    .setDescription('Comando index')
    .addStringOption((o) => o.setName('entrada').setDescription('Texto').setRequired(false)),
  aliases: ['index'],
  async execute(interaction) {
    const entrada = interaction.options.getString('entrada') || 'Comando index';
    return interaction.reply({ embeds: [new EmbedBuilder().setTitle('/index').setDescription(entrada).setColor(0x7c3aed)] });
  },
  async executePrefix(message, args) {
    const texto = (args || []).join(' ') || 'Comando index';
    return message.reply({ embeds: [new EmbedBuilder().setDescription(texto).setColor(0x7c3aed)] });
  }
};
