FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20

RUN groupadd -r appuser && useradd -r -g appuser -m appuser

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 5000
CMD ["node", "dist/main"]
