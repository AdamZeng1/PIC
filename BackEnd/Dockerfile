FROM node:12.4.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

CMD ["node","app.js"]

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
	CMD curl -fs http://localhost:3000/health-check || exit 1



