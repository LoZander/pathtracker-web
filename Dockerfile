FROM ubuntu:18.04

LABEL maintainer="AlexanderDybdahlTroelsen_lozander@outlook.com"

RUN apt update

RUN apt install nodejs -y
RUN apt install npm -y

RUN npm install express -y
RUN npm install express ejs -y

WORKDIR /root/app

COPY dist/ .

CMD ["node", "express.js"]
EXPOSE 3000