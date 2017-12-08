FROM alpine:3.1

# Update
RUN apk add --update nodejs

# Install app dependencies
COPY package.json /src/package.json
COPY server.js /src/index.js
RUN cd /src; npm install

# Bundle app source
COPY . /src

EXPOSE  8585
CMD ["node", "/src/index.js"]
