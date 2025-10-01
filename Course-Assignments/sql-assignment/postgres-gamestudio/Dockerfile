FROM postgres:15

# Copy initialization script
COPY init.sql /docker-entrypoint-initdb.d/

# Set permissions
RUN chmod 644 /docker-entrypoint-initdb.d/init.sql

# Optional: Set environment variables
ENV POSTGRES_DB=gamestudio
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=root