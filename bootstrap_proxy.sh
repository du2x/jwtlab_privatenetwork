#!/usr/bin/env bash

apt-get update
apt-get install -y apache2
rm -rf /etc/apache2/sites-enabled/000-default
cp -rf /vagrant/proxy.conf /etc/apache2/sites-enabled/

