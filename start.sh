#!/bin/sh

LAVALINK_VERSION="4.2.2"

if [ ! -f Lavalink.jar ]; then
  echo "Lavalink.jar não encontrado. Baixando v${LAVALINK_VERSION}..."
  curl -sSL "https://github.com/lavalink-devs/Lavalink/releases/download/${LAVALINK_VERSION}/Lavalink.jar" -o Lavalink.jar
fi

echo "Iniciando servidor Lavalink..."
exec java -Xms128m -Xmx450m -XX:+UseG1GC -XX:+ShrinkHeapInSteps -jar Lavalink.jar
