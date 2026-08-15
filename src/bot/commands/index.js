const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
/** Apague o comando index.js */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('index')
    .setDescription('Apague o comando index.js')
    .addStringOption((o) => o.setName('entrada').setDescription('Texto').setRequired(false)),
  aliases: ['index'],
  async execute(interaction) {
    const entrada = interaction.options.getString('entrada') || 'Apague o comando index.js';
    return interaction.reply({ embeds: [new EmbedBuilder().setTitle('/index').setDescription(entrada).setColor(0x7c3aed)] });
  },
  async executePrefix(message, args) {
    const texto = (args || []).join(' ') || 'Apague o comando index.js';
    return message.reply({ embeds: [new EmbedBuilder().setDescription(texto).setColor(0x7c3aed)] });
  }
};
