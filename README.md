# Aeternus Lavalink

Servidor **Lavalink 4.2.2** + **youtube-plugin 1.18.2** para o bot Aeternus.

## Variáveis

| ENV | Descrição |
|-----|-----------|
| `PORT` | Porta HTTP (padrão `2333`; Render usa `10000`) |
| `LAVALINK_PASSWORD` | Senha do node (padrão `Aeternus-music`) |
| `YOUTUBE_REFRESH_TOKEN` | OAuth do plugin YouTube (recomendado) |
| `YOUTUBE_OAUTH_ENABLED` | `true`/`false` |

## Conectar no bot Aeternus

No host do **bot** (não neste repo):

```env
LAVALINK_NODES=aeternus|SEU_HOST:PORTA|SUA_SENHA|true
```

Exemplos:

```env
# HTTP local
LAVALINK_NODES=aeternus|127.0.0.1:2333|Aeternus-music|false

# Render / HTTPS (porta 443 do proxy → app na PORT)
LAVALINK_NODES=aeternus|aeternus-lavalink.onrender.com:443|SENHA_DO_RENDER|true
```

Formato Shoukaku: `nome|host:porta|senha|secure`

## Local (Docker)

```bash
cp .env.example .env
# edite LAVALINK_PASSWORD e YOUTUBE_REFRESH_TOKEN se quiser
docker compose up -d --build
curl -s http://127.0.0.1:2333/version
```

## Local (Java)

```bash
chmod +x start.sh
./start.sh
```

## Render

1. New → Web Service → este repositório
2. Runtime: **Docker**
3. Defina `LAVALINK_PASSWORD` (não use a senha padrão em produção)
4. Opcional: `YOUTUBE_REFRESH_TOKEN`
5. Health check: `/version`

> No plano free o serviço dorme sem tráfego. Para música 24/7 use plano pago ou outro host (VPS / Discloud com Java).

## Health

```bash
curl -s http://HOST:PORT/version
# ou
curl -s -H "Authorization: SENHA" http://HOST:PORT/v4/info
```

## Notas

- Fonte YouTube nativa está **desligada**; o plugin cuida do YouTube.
- SoundCloud funciona sem OAuth.
- **Nunca** commite `YOUTUBE_REFRESH_TOKEN` no Git.
- `lavalink/config.yml` é legado — a config ativa é `application.yml`.
