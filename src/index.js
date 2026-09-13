const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Player } = require('discord-player');
const config = require('./config');
const logger = require('./utils/logger');
const fs = require('fs');
const path = require('path');

// Validar configurações
if (!config.discordToken) {
  logger.error('DISCORD_TOKEN não está configurado no arquivo .env');
  process.exit(1);
}

// Inicializar cliente Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
  ],
});

// Inicializar Player (Lavalink)
const player = new Player(client, {
  nodes: [
    {
      identifier: 'main',
      hostname: config.lavalink.host,
      port: config.lavalink.port,
      password: config.lavalink.password,
      secure: config.lavalink.secure,
    },
  ],
});

// Adicionar player ao cliente
client.player = player;
client.commands = new Collection();

// Carregar comandos
const commandsPath = path.join(__dirname, 'commands');
const loadCommands = (dir) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      loadCommands(filePath);
    } else if (file.endsWith('.js')) {
      const command = require(filePath);
      if (command.name) {
        client.commands.set(command.name, command);
        logger.success(`Comando carregado: ${command.name}`);
      }
    }
  });
};

// Carregar eventos
const eventsPath = path.join(__dirname, 'events');
const loadEvents = (dir) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      loadEvents(filePath);
    } else if (file.endsWith('.js')) {
      const event = require(filePath);
      if (event.name) {
        player.on(event.name, event.execute);
        logger.success(`Evento carregado: ${event.name}`);
      }
    }
  });
};

// Evento: Bot pronto
client.once('ready', () => {
  logger.success(`Bot conectado como ${client.user.tag}`);
  client.user.setActivity('🎵 Música', { type: 'LISTENING' });
});

// Evento: Mensagem recebida
client.on('messageCreate', async (message) => {
  // Ignorar bots
  if (message.author.bot) return;

  // Verificar prefixo
  if (!message.content.startsWith(config.prefix)) return;

  // Extrair comando
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Procurar comando
  const command = client.commands.get(commandName);

  if (!command) {
    return message.reply('❌ Comando não encontrado. Use `!help` para ver os comandos disponíveis.');
  }

  // Executar comando
  try {
    await command.execute(message, args, client);
  } catch (error) {
    logger.error(`Erro ao executar comando ${commandName}: ${error.message}`);
    message.reply('❌ Houve um erro ao executar este comando.');
  }
});

// Player eventos
player.on('playerStart', async (queue, track) => {
  const { embedFactory } = require('./utils/embeds');
  const embed = embedFactory.nowPlaying(track);
  queue.metadata.channel.send({ embeds: [embed] }).catch(() => {});
});

player.on('playerError', (queue, error) => {
  logger.error(`Erro no player: ${error.message}`);
  const { embedFactory } = require('./utils/embeds');
  const embed = embedFactory.error('Erro de Reprodução', error.message);
  queue.metadata.channel.send({ embeds: [embed] }).catch(() => {});
});

player.on('queueEnd', (queue) => {
  logger.log('Fila terminada');
  const { embedFactory } = require('./utils/embeds');
  const embed = embedFactory.info('Fila Finalizada', 'A fila foi completamente tocada!');
  queue.metadata.channel.send({ embeds: [embed] }).catch(() => {});
});

// Carregar comandos e eventos
if (!fs.existsSync(commandsPath)) {
  fs.mkdirSync(commandsPath, { recursive: true });
}

if (!fs.existsSync(eventsPath)) {
  fs.mkdirSync(eventsPath, { recursive: true });
}

loadCommands(commandsPath);
loadEvents(eventsPath);

// Login
client.login(config.discordToken);
