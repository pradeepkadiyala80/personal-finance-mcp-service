# Stage 1: Build dependencies with Bun
FROM oven/bun:1 AS base

# Set the working directory inside the container
WORKDIR /app

RUN mkdir -p /temp/dev
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

# Expose the port your MCP server listens on (e.g., 3000)
EXPOSE 3001

# Command to run your Bun application
CMD ["bun", "run", "src/server/http-server.ts"]