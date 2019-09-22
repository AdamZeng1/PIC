FROM node:12.4.0
WORKDIR '/app'
COPY ./package*.json ./
RUN npm install
COPY . .
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
CMD ["npm","run","start"]
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
	CMD curl -fs http://localhost:5000/health-check || exit 1



