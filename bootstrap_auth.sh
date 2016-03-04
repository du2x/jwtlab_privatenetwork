#!/usr/bin/env bash 
 
apt-get update 
apt-get install -y apache2 libapache2-mod-python libapache2-mod-wsgi python-dev python-virtualenv
a2enmod wsgi 

