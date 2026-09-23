FROM eclipse-temurin:21-jre-alpine

WORKDIR /opt/Lavalink

ARG LAVALINK_VERSION=4.2.2

RUN apk add --no-cache \
    curl \
    fontconfig \
    freetype \
    ttf-dejavu \
    gcompat \
    libgcc \
    libstdc++ && \
    curl -fsSL "https://github.com/lavalink-devs/Lavalink/releases/download/${LAVALINK_VERSION}/Lavalink.jar" -o Lavalink.jar

COPY application.yml application.yml

# Render / hosts usam PORT dinâmico; application.yml lê ${PORT:2333}
EXPOSE 2333

ENV JAVA_OPTS="-Xms128m -Xmx450m -XX:+UseG1GC -XX:+ShrinkHeapInSteps"

CMD ["sh", "-c", "java $JAVA_OPTS -jar Lavalink.jar"]
