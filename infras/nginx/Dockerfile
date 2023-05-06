FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/koala.conf
RUN curl -LO https://raw.githubusercontent.com/0xJacky/nginx-ui/master/install.sh
RUN chmod +x ./install.sh
RUN ./install.sh install
