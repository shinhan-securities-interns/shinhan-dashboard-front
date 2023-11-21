FROM node:14.17.6-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copying rest of the application to app directory
COPY . /app

# Expose the port and start the application
EXPOSE 80

CMD ["npm","start"]
