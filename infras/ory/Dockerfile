FROM ubuntu:18.04

COPY ./install.sh ./

RUN apt update
RUN apt install curl -y
RUN chmod +x ./install.sh
RUN ./install.sh

ENTRYPOINT [ "ory", "proxy", "--port", "8080", "http://app:3000", "https://amazing-montalcini-i5d0dw4grd.projects.oryapis.com", "<", "echo 'n'"]