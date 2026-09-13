# 🎵 Servidor Lavalink - ODISSEIA
## Com Proteção Anti-Bloqueio do YouTube ⚔️

Servidor de áudio autossuficiente para Discord bots com sistema robusto de proteção contra bloqueios do YouTube.

## 🛡️ Sistema de Proteção do YouTube

Este servidor inclui múltiplas camadas de proteção:

### 1. **Rotação de User-Agent**
- Alterna entre diferentes navegadores
- Evita bloqueios por identificação

### 2. **Retry Automático**
- 3 tentativas de reconexão automática
- Delay de 1 segundo entre tentativas

### 3. **Rate Limiting**
- 500ms entre requisições
- Evita banimento por excesso de requisições

### 4. **HTTP Client Proxy**
- Suporte a proxies HTTP e SOCKS5
- Rotação de IPs disponível

### 5. **Timeouts Inteligentes**
- Timeout de carga: 30s
- Timeout de conexão: 30s
- Timeout de leitura: 30s

## 🚀 Início Rápido

### Instalação Básica
```bash
git clone https://github.com/alerrandrocavalcante109-bot/ODISSEIA-.git
cd ODISSEIA-
docker-compose up -d
```

### Instalação com Proteção Máxima
```bash
chmod +x protect-youtube.sh
./protect-youtube.sh
```

## 📝 Configurar Proxies (Opcional)

Edite o arquivo `proxies.txt`:

```
http://seu-proxy-1.com:8080
socks5://seu-proxy-2.com:1080
http://seu-proxy-3.com:3128
```

Depois reinicie o container:
```bash
docker-compose restart lavalink
```

## 🔧 Configuração

### Credenciais Padrão
- **Host:** localhost
- **Porta:** 2333
- **Senha:** youshallnotpass

### Alterar Configurações

Edite o arquivo `application.yml`:

```yaml
youtube:
  useHttpClientProxy: true
  maxRetries: 3
  retryDelay: 1000
  rateLimitDelay: 500
```

## 🎵 Plataformas Suportadas

- ✅ YouTube (com proteção)
- ✅ Spotify
- ✅ SoundCloud
- ✅ Bandcamp
- ✅ Twitch
- ✅ Vimeo
- ✅ HTTP (URLs diretas)

## 📊 Status do Servidor

Verificar se está funcionando:

```bash
curl http://localhost:2333/loadbalance
```

## 🐳 Comandos Docker

### Iniciar
```bash
docker-compose up -d
```

### Parar
```bash
docker-compose down
```

### Logs
```bash
docker-compose logs -f lavalink
```

### Reiniciar
```bash
docker-compose restart lavalink
```

## 🔌 Conectar um Bot Discord

```javascript
const player = new Player(client, {
  nodes: [
    {
      identifier: 'main',
      hostname: 'localhost',
      port: 2333,
      password: 'youshallnotpass',
      secure: false,
    },
  ],
});
```

## 📁 Estrutura

```
ODISSEIA-/
├── docker-compose.yml       # Docker Compose
├── application.yml          # Configuração com proteção
├── proxies.txt             # Lista de proxies
├── protect-youtube.sh      # Script de proteção
├── logs/                   # Logs do servidor
├── README.md
└── LICENSE
```

## ⚙️ Filtros Disponíveis

- Volume
- Equalizador
- Karaokê
- Timescale
- Tremolo
- Vibrato
- Distorção
- Rotação
- Channel Mix
- Low Pass

## 🆘 Troubleshooting

### YouTube continua bloqueando
1. Adicione proxies ao arquivo `proxies.txt`
2. Aumente o `retryDelay` em `application.yml`
3. Reduza o `rateLimitDelay`
4. Reinicie: `docker-compose restart lavalink`

### Conexão lenta
- Verifique os logs: `docker-compose logs -f lavalink`
- Reduza `playerUpdateInterval` em `application.yml`

### Porta 2333 já em uso
```bash
docker-compose down
```

### Verificar logs detalhados
```bash
docker-compose logs lavalink | grep -i youtube
```

## 🔐 Segurança

- Senha padrão: `youshallnotpass`
- **Mude a senha em produção!**

Para mudar a senha:
1. Edite `application.yml`
2. Altere `password: "sua_nova_senha"`
3. Reinicie: `docker-compose restart lavalink`

## 🚨 Se Bloqueado

Se o YouTube bloquear o Lavalink:

1. **Aguarde 24 horas** - O bloqueio é temporário
2. **Use proxies** - Configure em `proxies.txt`
3. **Altere IPs** - Reinicie o container
4. **Aumente delays** - Edite `application.yml`

## 📞 Suporte

Para problemas, verifique os logs:
```bash
docker-compose logs -f lavalink
```

## 📝 Licença

MIT

## ⭐ Recursos Destacados

✅ Proteção contra bloqueios do YouTube  
✅ Retry automático  
✅ Rate limiting  
✅ Suporte a proxies  
✅ Rotação de User-Agent  
✅ Fácil configuração  
✅ Docker automatizado  
