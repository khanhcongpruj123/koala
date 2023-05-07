#!/bin/bash

# install ory
echo 'Install ory'
bash <(curl https://raw.githubusercontent.com/ory/meta/master/install.sh) -b . ory
mv ./ory /usr/local/bin/

# install glibc

apt update
apt install wget
apt install make

echo 'Install glibc'
wget -c https://ftp.gnu.org/gnu/glibc/glibc-2.29.tar.gz
tar -zxvf glibc-2.29.tar.gz
mkdir glibc-2.29/build
cd glibc-2.29/build
../configure --prefix=/opt/glibc
make 
make install