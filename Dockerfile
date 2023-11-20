FROM node:14.17.6-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
EXPOSE 80
CMD ["npm", "start"]
