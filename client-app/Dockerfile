# Build stage
FROM node:latest AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy the remaining source code
COPY . .

# Build the application
RUN npm run build

# Runtime stage
FROM nginx:latest AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY certs/certificate.crt /etc/ssl/certs/certificate.crt
COPY certs/private.key /etc/ssl/private/private.key
EXPOSE 80
EXPOSE 443
