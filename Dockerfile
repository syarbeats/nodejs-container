FROM alpine:3.1

# Update
RUN apk add --update nodejs

# Install app dependencies
COPY * /src/
RUN cd /src; npm install

# Bundle app source
COPY . /src

EXPOSE  8585
CMD ["node", "/src/app.js"]
