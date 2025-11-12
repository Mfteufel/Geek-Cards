FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Configurar DNS para el build
RUN echo "nameserver 8.8.8.8" > /etc/resolv.conf && \
    echo "nameserver 8.8.4.4" >> /etc/resolv.conf || true

# Copiar settings.xml con configuración de Maven
COPY .m2/settings.xml /root/.m2/settings.xml

COPY pom.xml .
# Intentar con diferentes timeouts y retries
RUN mvn -B -DskipTests -Dmaven.wagon.http.retryHandler.count=3 dependency:go-offline || \
    sleep 5 && mvn -B -DskipTests -Dmaven.wagon.http.retryHandler.count=3 dependency:go-offline || \
    sleep 10 && mvn -B -DskipTests -Dmaven.wagon.http.retryHandler.count=3 dependency:go-offline

COPY src ./src
RUN mvn -B -Dmaven.wagon.http.retryHandler.count=3 clean package spring-boot:repackage -DskipTests || \
    sleep 5 && mvn -B -Dmaven.wagon.http.retryHandler.count=3 clean package spring-boot:repackage -DskipTests || \
    sleep 10 && mvn -B -Dmaven.wagon.http.retryHandler.count=3 clean package spring-boot:repackage -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar app.jar
ENV SPRING_PROFILES_ACTIVE=docker
EXPOSE 8080

# 👇 para el healthcheck usamos wget (ya viene en Alpine busybox)
HEALTHCHECK --interval=10s --timeout=3s --start-period=30s --retries=10 \
  CMD wget -qO- http://localhost:8080/actuator/health | grep -q '"status":"UP"' || exit 1

USER appuser
ENTRYPOINT ["java","-jar","/app/app.jar"]
