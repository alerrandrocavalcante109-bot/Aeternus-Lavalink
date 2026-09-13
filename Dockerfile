FROM eclipse-temurin:21-jre-alpine

WORKDIR /opt/Lavalink

# Instala dependências nativas C/C++ (gcompat, libgcc) e baixa o Lavalink
RUN apk add --no-cache \
    curl \
    fontconfig \
    freetype \
    ttf-dejavu \
    gcompat \
    libgcc \
    libstdc++ && \
    curl -sSL "https://github.com/lavalink-devs/Lavalink/releases/download/4.2.2/Lavalink.jar" -o Lavalink.jar

COPY application.yml application.yml

EXPOSE 2333

CMD ["java", "-Xms128m", "-Xmx450m", "-XX:+UseG1GC", "-XX:+ShrinkHeapInSteps", "-jar", "Lavalink.jar"]
