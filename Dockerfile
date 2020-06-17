FROM mhart/alpine-node:8

WORKDIR /src

COPY package.json /src
RUN npm install
ADD . .
EXPOSE 8000

CMD ["npm", "start"]