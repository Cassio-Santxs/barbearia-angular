FROM alpine:latest

RUN apk --update add apache2

COPY ./dist/biblioteca/browser /var/www/localhost/htdocs
COPY ./modules /var/www/
#COPY ./barbearia.conf /etc/apache2/conf.d/barbearia.conf
COPY ./httpd.conf /etc/apache2/

#RUN mkdir -p /run/apache2

EXPOSE 80

CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]