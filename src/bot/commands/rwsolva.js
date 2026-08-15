const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
/** Rwsolva o erro que apareceu no log */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('rwsolva')
    .setDescription('Rwsolva o erro que apareceu no log')
    .addStringOption((o) => o.setName('entrada').setDescription('Texto').setRequired(false)),
  aliases: ['rwsolva'],
  async execute(interaction) {
    const entrada = interaction.options.getString('entrada') || 'Rwsolva o erro que apareceu no log';
    return interaction.reply({ embeds: [new EmbedBuilder().setTitle('/rwsolva').setDescription(entrada).setColor(0x7c3aed)] });
  },
  async executePrefix(message, args) {
    const texto = (args || []).join(' ') || 'Rwsolva o erro que apareceu no log';
    return message.reply({ embeds: [new EmbedBuilder().setDescription(texto).setColor(0x7c3aed)] });
  }
};
