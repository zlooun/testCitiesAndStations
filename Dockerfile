FROM node:12
RUN mkdir /www
RUN mkdir /www/city-station
WORKDIR /www/city-station
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]