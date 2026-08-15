const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
/** Latencia */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Latencia')
    .addStringOption((o) => o.setName('entrada').setDescription('Texto').setRequired(false)),
  aliases: ['ping'],
  async execute(interaction) {
    const entrada = interaction.options.getString('entrada') || 'Latencia';
    return interaction.reply({ embeds: [new EmbedBuilder().setTitle('/ping').setDescription(entrada).setColor(0x7c3aed)] });
  },
  async executePrefix(message, args) {
    const texto = (args || []).join(' ') || 'Latencia';
    return message.reply({ embeds: [new EmbedBuilder().setDescription(texto).setColor(0x7c3aed)] });
  }
};
