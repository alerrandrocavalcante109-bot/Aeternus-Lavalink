#!/bin/sh
set -e

LAVALINK_VERSION="${LAVALINK_VERSION:-4.2.2}"

if [ ! -f Lavalink.jar ]; then
  echo "Baixando Lavalink v${LAVALINK_VERSION}..."
  curl -fsSL "https://github.com/lavalink-devs/Lavalink/releases/download/${LAVALINK_VERSION}/Lavalink.jar" -o Lavalink.jar
fi

if [ ! -f application.yml ]; then
  echo "ERRO: application.yml não encontrado."
  exit 1
fi

echo "Iniciando Lavalink (PORT=${PORT:-2333})..."
exec java -Xms128m -Xmx450m -XX:+UseG1GC -XX:+ShrinkHeapInSteps -jar Lavalink.jar
