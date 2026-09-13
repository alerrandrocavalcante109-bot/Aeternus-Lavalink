FROM eclipse-temurin:21-jre-alpine

WORKDIR /opt/Lavalink

# Instala dependências de sistema e faz o download automático do Lavalink
RUN apk add --no-cache curl fontconfig freetype ttf-dejavu && \
    curl -sSL "https://github.com/lavalink-devs/Lavalink/releases/download/4.2.2/Lavalink.jar" -o Lavalink.jar

# Copia a configuração da aplicação
COPY application.yml application.yml

EXPOSE 2333

# Otimizações de JVM para evitar limite de memória do Render
CMD ["java", "-Xms128m", "-Xmx450m", "-XX:+UseG1GC", "-XX:+ShrinkHeapInSteps", "-jar", "Lavalink.jar"]
