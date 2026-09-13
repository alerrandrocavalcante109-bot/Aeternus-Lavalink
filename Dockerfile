FROM eclipse-temurin:21-jre-alpine

# Instala bibliotecas nativas de áudio e utilitários
RUN apk add --no-cache \
    curl \
    fontconfig \
    freetype \
    ttf-dejavu

WORKDIR /opt/Lavalink

# Copia os arquivos do projeto
COPY Lavalink.jar Lavalink.jar
COPY application.yml application.yml

# Expõe a porta dinâmica
EXPOSE 2333

# Otimizações de JVM para evitar estouro de memória no Render (OOM Killer)
CMD ["java", "-Xms128m", "-Xmx450m", "-XX:+UseG1GC", "-XX:+ShrinkHeapInSteps", "-jar", "Lavalink.jar"]
