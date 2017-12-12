FROM ubuntu:16.04

# Update
RUN apt-get update 
RUN apt-get install -y nodejs npm git

RUN git clone https://github.com/syarbeats/nodejs-container.git

# Install app dependencies
RUN cd /nodejs-container; npm install

COPY . /nodejs-container

EXPOSE  8585
CMD ["nodejs", "/nodejs-container/app.js"]
