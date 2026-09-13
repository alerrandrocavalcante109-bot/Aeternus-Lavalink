# 🛡️ GUIA DE PROTEÇÃO CONTRA BLOQUEIOS DO YOUTUBE

## 📌 Entendendo o Problema

O YouTube bloqueia frequentemente o Lavalink por:
- Excesso de requisições (rate limiting)
- Identificação como bot
- Mesma IP fazendo muitas requisições
- User-Agent não autenticado

## ✅ Soluções Implementadas

### 1. **Rotação de User-Agent**
```yaml
rotateUserAgent: true
```
Alterna automaticamente entre diferentes navegadores para não ser detectado como bot.

### 2. **Retry Automático (3 tentativas)**
```yaml
maxRetries: 3
retryDelay: 1000  # 1 segundo entre tentativas
```
Se uma requisição falhar, tenta automaticamente 3 vezes com delay.

### 3. **Rate Limiting (500ms entre requisições)**
```yaml
rateLimitDelay: 500
```
Evita excesso de requisições que dispara bloqueios.

### 4. **HTTP Client Proxy**
```yaml
useHttpClientProxy: true
```
Permite usar proxies para rotacionar IPs.

### 5. **Timeouts Inteligentes**
```yaml
searchTimeout: 10
loadTimeout: 30
```
Define timeouts para não ficar travado em requisições lentas.

## 🚀 Como Usar

### Opção 1: Proteção Básica (Recomendado)
```bash
docker-compose up -d
```
Usa as proteções padrão sem proxies. Funciona bem para uso moderado.

### Opção 2: Proteção com Script Automático
```bash
chmod +x protect-youtube.sh
./protect-youtube.sh
```
Executa o script que configura tudo automaticamente.

### Opção 3: Proteção Máxima com Proxies
1. Configure proxies em `proxies.txt`
2. Reinicie: `docker-compose restart lavalink`

## 📝 Configurar Proxies

### Opção A: Proxies Grátis (Risco de bloqueio)
```bash
# Adicione em proxies.txt
http://proxy1.com:8080
http://proxy2.com:8080
```

### Opção B: Proxies Pagos (Mais confiável)
```bash
http://usuario:senha@proxy.com:porta
socks5://usuario:senha@proxy.com:porta
```

### Opção C: Usar Serviços como:
- **Bright Data** - Proxies residenciais
- **Oxylabs** - Proxies de alta qualidade
- **SmartProxy** - Proxies acessíveis
- **Scraperapi** - Proxies para scraping

## 🔧 Ajustar Configurações

Se o YouTube ainda bloquear, edite `application.yml`:

### Aumentar Delays
```yaml
youtube:
  rateLimitDelay: 1000  # 1 segundo em vez de 500ms
  retryDelay: 2000      # 2 segundos em vez de 1s
```

### Aumentar Timeouts
```yaml
youtube:
  searchTimeout: 15
  loadTimeout: 60
```

### Reduzir Playlist Limit
```yaml
youtube:
  youtubePlaylistLoadLimit: 3  # Em vez de 6
```

## 🆘 Se Bloqueado

### Passo 1: Verificar Logs
```bash
docker-compose logs lavalink | grep -i youtube
```

### Passo 2: Aguardar
Bloqueios temporários duram geralmente **24 horas**.

### Passo 3: Aumentar Proteção
- Adicione proxies
- Aumente `rateLimitDelay`
- Reduce `youtubePlaylistLoadLimit`

### Passo 4: Reiniciar
```bash
docker-compose down
docker-compose up -d
```

## 🌐 Alternativas se YouTube Falhar

Se mesmo com proteção não funcionar, use:

```javascript
// No seu bot, adicione fallback
const player = new Player(client, {
  nodes: [{
    identifier: 'main',
    hostname: 'localhost',
    port: 2333,
    password: 'youshallnotpass',
  }],
  autoPlay: true,
  clientName: 'ODISSEIA-Lavalink',
  clientVersion: '1.0.0',
  resumeKey: 'odisseia-resume-key',
});

// Use SoundCloud como alternativa
// Procure no SoundCloud quando YouTube falhar
```

## 📊 Monitorar Status

Crie um script de monitoramento:

```bash
#!/bin/bash
while true; do
  STATUS=$(curl -s http://localhost:2333/loadbalance)
  if [ $? -eq 0 ]; then
    echo "[$(date)] ✅ Lavalink OK"
  else
    echo "[$(date)] ❌ Lavalink DOWN - Reiniciando..."
    docker-compose restart lavalink
  fi
  sleep 300  # 5 minutos
done
```

## 🎯 Best Practices

1. **Use Proxies Residenciais** - Mais difíceis de bloquear
2. **Respeite Rate Limits** - Não faça muitas requisições
3. **Monitore Logs** - Verifique bloqueios cedo
4. **Mude IPs Regularmente** - Reinicie o container
5. **Use SOCKS5** - Mais seguro que HTTP

## ⚠️ Avisos

- YouTube pode bloquear qualquer momento
- Proxies podem ser lentos
- Usar muitos proxies pode ser banido
- Sempre respeite os Termos de Serviço do YouTube

## 📞 Suporte

Se tiver dúvidas:
1. Verifique logs: `docker-compose logs -f lavalink`
2. Teste conexão: `curl http://localhost:2333/loadbalance`
3. Reinicie: `docker-compose restart lavalink`

---

**Última atualização:** 2026-09-13
**Status:** ✅ Proteção ativa e funcionando
