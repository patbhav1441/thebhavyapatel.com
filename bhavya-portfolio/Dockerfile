# 1) Build the React app
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 2) Serve the build output
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
