const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
/** Criae o comando/oi. O bot responde 👋olá. */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('oi')
    .setDescription('Comando oi')
    .addStringOption((o) => o.setName('entrada').setDescription('Texto').setRequired(false)),
  aliases: ['oi'],
  async execute(interaction) {
    const entrada = interaction.options.getString('entrada') || 'Comando oi';
    return interaction.reply({ embeds: [new EmbedBuilder().setTitle('/oi').setDescription(entrada).setColor(0x7c3aed)] });
  },
  async executePrefix(message, args) {
    const texto = (args || []).join(' ') || 'Comando oi';
    return message.reply({ embeds: [new EmbedBuilder().setDescription(texto).setColor(0x7c3aed)] });
  }
};
