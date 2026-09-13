const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const logger = {
  log: (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    const prefix = `[${timestamp}]`;

    switch (type) {
      case 'error':
        console.error(`${colors.red}${prefix} ❌ ERROR:${colors.reset}`, message);
        break;
      case 'success':
        console.log(`${colors.green}${prefix} ✅ SUCCESS:${colors.reset}`, message);
        break;
      case 'warning':
        console.warn(`${colors.yellow}${prefix} ⚠️ WARNING:${colors.reset}`, message);
        break;
      case 'debug':
        console.log(`${colors.cyan}${prefix} 🔍 DEBUG:${colors.reset}`, message);
        break;
      default:
        console.log(`${colors.blue}${prefix} ℹ️ INFO:${colors.reset}`, message);
    }
  },

  error: (message) => logger.log(message, 'error'),
  success: (message) => logger.log(message, 'success'),
  warning: (message) => logger.log(message, 'warning'),
  debug: (message) => logger.log(message, 'debug'),
};

module.exports = logger;
