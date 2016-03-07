#!/usr/bin/env bash 
 
apt-get update 
apt-get install -y apache2 libapache2-mod-python libapache2-mod-wsgi python-dev
a2enmod wsgi 
rm -rf /etc/apache2/sites-enabled/000-default
cp -rf /vagrant/vhost_web.conf /etc/apache2/sites-enabled/vhost_web.conf

