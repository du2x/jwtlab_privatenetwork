#!/usr/bin/env bash 
 
apt-get update 
apt-get install -y apache2 libapache2-mod-python libapache2-mod-wsgi python-dev
a2enmod wsgi 
rm -rf /etc/apache2/sites-enabled/000-default.conf
cp -rf /vagrant/webapp2.conf /etc/apache2/sites-enabled/

