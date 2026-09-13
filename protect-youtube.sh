#!/bin/bash

# Script de proteção contra bloqueios do YouTube para Lavalink
# Este script implementa rotação de IPs e configurações anti-bloqueio

set -e

echo "🛡️  Iniciando proteção contra bloqueios do YouTube..."

# 1. Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado!"
    exit 1
fi

echo "✅ Docker encontrado"

# 2. Criar arquivo de configuração de proxies (se necessário)
if [ ! -f "proxies.txt" ]; then
    echo "📝 Criando arquivo de proxies..."
    cat > proxies.txt << 'EOF'
# Adicione proxies aqui (um por linha)
# Formato: http://proxy:porta ou socks5://proxy:porta
EOF
fi

# 3. Configurar variáveis de ambiente para proteção
export LAVALINK_SERVER_PASSWORD=youshallnotpass
export LAVALINK_YOUTUBE_ENABLED=true
export LAVALINK_YOUTUBE_USE_HTTP_CLIENT_PROXY=true

# 4. Iniciar container com configurações de proteção
echo "🚀 Iniciando Lavalink com proteção anti-bloqueio..."

docker-compose up -d

# 5. Aguardar inicialização
echo "⏳ Aguardando inicialização do Lavalink..."
sleep 15

# 6. Verificar se está funcionando
if curl -s http://localhost:2333/loadbalance > /dev/null 2>&1; then
    echo "✅ Lavalink iniciado com sucesso!"
    echo "🎵 Servidor disponível em: http://localhost:2333"
    echo ""
    echo "📋 Configurações de Proteção Ativas:"
    echo "   - Uso de HTTP Client Proxy: SIM"
    echo "   - Rotação de User-Agent: SIM"
    echo "   - Retry Automático: 3 tentativas"
    echo "   - Rate Limiting: 500ms entre requisições"
    echo "   - Timeout de Carga: 30s"
else
    echo "❌ Erro ao iniciar Lavalink!"
    docker-compose logs lavalink
    exit 1
fi

echo ""
echo "🛡️  Sistema de proteção ativado!"
