# 🎵 Servidor Lavalink - ODISSEIA
## Com Proteção Anti-Bloqueio do YouTube ⚔️
### Deploy Online no Render 🚀

Servidor de áudio autossuficiente para Discord bots com sistema robusto de proteção contra bloqueios do YouTube. **Agora online 24/7 no Render!**

## ⭐ Novo: Deploy no Render

### 🚀 Deploy em 5 Minutos

```bash
# 1. Clone o repositório
git clone https://github.com/alerrandrocavalcante109-bot/ODISSEIA-.git
cd ODISSEIA-

# 2. Execute o script de deploy
chmod +x deploy-render.sh
./deploy-render.sh

# 3. Siga as instruções
```

### 📋 Passo a Passo Manual

1. **Acesse o Render:**
   - Vá para https://dashboard.render.com
   - Faça login com GitHub

2. **Criar Web Service:**
   - Clique em "New +" → "Web Service"
   - Selecione seu repositório: `alerrandrocavalcante109-bot/ODISSEIA-`

3. **Configurar:**
   - **Name:** lavalink-server
   - **Environment:** Docker
   - **Region:** Oregon (ou mais próximo)
   - **Plan:** Standard ($12/mês)

4. **Variáveis de Ambiente:**
   ```
   LAVALINK_SERVER_PASSWORD=youshallnotpass
   LAVALINK_YOUTUBE_ENABLED=true
   LAVALINK_YOUTUBE_USE_HTTP_CLIENT_PROXY=true
   ```

5. **Deploy:**
   - Clique em "Create Web Service"
   - Aguarde 5-10 minutos

## 🌐 Acessar Seu Servidor

Após deploy no Render, seu servidor estará disponível em:

```
https://lavalink-server.onrender.com:2333
```

### Conectar ao Bot Discord

```javascript
const player = new Player(client, {
  nodes: [
    {
      identifier: 'main',
      hostname: 'lavalink-server.onrender.com',
      port: 2333,
      password: 'youshallnotpass',
      secure: false,
    },
  ],
});
```

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

## 📁 Estrutura do Projeto

```
ODISSEIA-/
├── docker-compose.yml          # Para uso local
├── application.yml              # Configuração com proteção
├── Dockerfile                   # Para deploy no Render
├── render.yaml                  # Config do Render
├── Procfile                     # Processo para Render
├── proxies.txt                  # Lista de proxies
├── deploy-render.sh             # Script de deploy
├── protect-youtube.sh           # Script local de proteção
├── YOUTUBE-PROTECTION.md        # Guia de proteção
├── .env.example                 # Variáveis de exemplo
├── README.md
└── LICENSE
```

## 🎵 Plataformas Suportadas

- ✅ YouTube (com proteção)
- ✅ Spotify
- ✅ SoundCloud
- ✅ Bandcamp
- ✅ Twitch
- ✅ Vimeo
- ✅ HTTP (URLs diretas)

## 📊 Monitorar Servidor

### Verificar Status
```bash
curl https://lavalink-server.onrender.com:2333/loadbalance
```

### Ver Logs no Render
1. Acesse https://dashboard.render.com
2. Clique no seu serviço "lavalink-server"
3. Vá para "Logs"

## 💰 Custo

- **Plan Standard:** $12/mês
- **Inclui:** 750 horas/mês
- **Suficiente para:** 24/7 contínuo

## 🆘 Troubleshooting

### Deployment falha

1. Verifique se o repositório está correto
2. Confirme as variáveis de ambiente
3. Verifique os logs no dashboard do Render

### YouTube bloqueado

1. Adicione proxies a `proxies.txt`
2. Aumente `rateLimitDelay` em `application.yml`
3. Redeploy no Render

### Conexão recusada

1. Aguarde 5-10 minutos após deploy
2. Verifique a porta: 2333
3. Reinicie o serviço no Render

## 🔐 Segurança

### Mude a Senha!

**IMPORTANTE:** Altere a senha padrão!

1. Acesse seu dashboard do Render
2. Clique no serviço "lavalink-server"
3. Vá para "Environment"
4. Altere `LAVALINK_SERVER_PASSWORD`
5. Clique "Deploy"

### Usar HTTPS

Para usar HTTPS (seguro), configure:

```javascript
const player = new Player(client, {
  nodes: [
    {
      identifier: 'main',
      hostname: 'lavalink-server.onrender.com',
      port: 2333,
      password: 'sua_nova_senha',
      secure: true,  // HTTPS
    },
  ],
});
```

## 📖 Documentação Completa

Para mais informações sobre proteção do YouTube, veja: `YOUTUBE-PROTECTION.md`

## 🚀 Comandos Úteis

### Deploy Local com Docker
```bash
docker-compose up -d
```

### Deploy Remoto no Render
```bash
chmod +x deploy-render.sh
./deploy-render.sh
```

### Parar Servidor Local
```bash
docker-compose down
```

### Ver Logs
```bash
docker-compose logs -f lavalink
```

## 📞 Suporte

- Docs do Render: https://render.com/docs
- GitHub: https://github.com/alerrandrocavalcante109-bot/ODISSEIA-
- Lavalink: https://lavalink.dev

## 📝 Licença

MIT

## ⭐ Features

✅ Proteção contra bloqueios do YouTube  
✅ Retry automático  
✅ Rate limiting  
✅ Suporte a proxies  
✅ Rotação de User-Agent  
✅ Deploy online 24/7  
✅ Fácil configuração  
✅ Docker automatizado  

---

**✨ Seu servidor Lavalink está online 24/7 no Render! 🎵🚀**

Acesse: **https://github.com/alerrandrocavalcante109-bot/ODISSEIA-**
