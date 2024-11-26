FROM alpine:latest

RUN apk --update add apache2

COPY ./dist/biblioteca/browser /var/www/localhost/htdocs

EXPOSE 80

CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]