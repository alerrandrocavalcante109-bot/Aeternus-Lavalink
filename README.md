# 🎵 Servidor Lavalink - ODISSEIA

Servidor de áudio autossuficiente para Discord bots. Suporta reprodução de múltiplas plataformas de música.

## 🚀 Início Rápido

### Pré-requisitos
- Docker instalado
- Docker Compose instalado

### Instalação

```bash
git clone https://github.com/alerrandrocavalcante109-bot/ODISSEIA-.git
cd ODISSEIA-
docker-compose up -d
```

O servidor Lavalink estará disponível em: `http://localhost:2333`

## 🔧 Configuração

### Credenciais Padrão
- **Host:** localhost
- **Porta:** 2333
- **Senha:** youshallnotpass

### Alterar Configurações

Edite o arquivo `application.yml`:

```yaml
server:
  port: 2333
  address: 0.0.0.0

lavalink:
  server:
    password: "sua_nova_senha"
```

## 🎵 Plataformas Suportadas

- ✅ YouTube
- ✅ Spotify
- ✅ SoundCloud
- ✅ Bandcamp
- ✅ Twitch
- ✅ Vimeo
- ✅ HTTP (URLs diretas)

## 📊 Status do Servidor

Para verificar se o servidor está rodando:

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

Configure seu bot Discord para conectar ao Lavalink:

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
├── docker-compose.yml
├── application.yml
├── logs/
└── README.md
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

### Porta 2333 já em uso
```bash
docker-compose down
```

### Verificar logs
```bash
docker-compose logs lavalink
```

### Conectar com senha diferente
1. Edite `application.yml`
2. Altere o valor de `password`
3. Reinicie: `docker-compose restart lavalink`

## 📝 Licença

MIT

## 📞 Suporte

Para problemas, verifique os logs:
```bash
docker-compose logs -f lavalink
```
