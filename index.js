require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'src', 'bot', 'commands');
if (fs.existsSync(commandsPath)) {
  for (const file of fs.readdirSync(commandsPath).filter((f) => f.endsWith(".js"))) {
    const cmd = require(path.join(commandsPath, file));
    if (cmd?.data?.name) client.commands.set(cmd.data.name, cmd);
  }
}

client.once(Events.ClientReady, (c) => console.log("Online:", c.user.tag));

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const cmd = client.commands.get(interaction.commandName);
  if (!cmd) return;
  try { await cmd.execute(interaction); } catch (err) {
    console.error(err);
    const payload = { content: "Erro no comando.", ephemeral: true };
    if (interaction.replied || interaction.deferred) await interaction.followUp(payload);
    else await interaction.reply(payload);
  }
});

client.login(process.env.DISCORD_TOKEN);
