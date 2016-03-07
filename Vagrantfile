# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version

Vagrant.configure(2) do |config|


  config.vm.define "proxy" do |proxy|
    proxy.vm.box = "ubuntu/trusty64"
    proxy.vm.provision :shell, path: "bootstrap_proxy.sh"
    proxy.vm.network "forwarded_port", guest: 80, host: 8070
  end

  config.vm.define "auth" do |auth|
    auth.vm.box = "ubuntu/trusty64"
    auth.vm.provision :shell, path: "bootstrap_auth.sh"
    auth.vm.network "private_network", ip: "192.168.1.4"
  end

  config.vm.define "web1" do |web1|
    web1.vm.box = "ubuntu/trusty64"
    web1.vm.provision :shell, path: "bootstrap_web1.sh"
    web1.vm.network "private_network", ip: "192.168.1.2"
  end

  config.vm.define "web2" do |web2|
    web2.vm.box = "ubuntu/trusty64"
    web2.vm.provision :shell, path: "bootstrap_web2.sh"
    web2.vm.network "private_network", ip: "192.168.1.3"
  end


  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end

end
