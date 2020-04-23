FROM node:10-slim

WORKDIR /api

COPY server.bundle.js .

CMD ["node", "server.bundle.js"]