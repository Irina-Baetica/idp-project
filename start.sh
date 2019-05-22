#!/bin/bash

# sudo docker-compose up
# sudo docker build -t app1 ./app
# sudo docker build -t client1 ./client
# sudo docker build -t database1 ./db

sudo docker tag app1 whale1234/idp2:first1
sudo docker tag client1 whale1234/idp2:second1
sudo docker tag database1 whale1234/idp2:third1

# sudo docker swarm init --advertise-addr 192.168.0.102
sudo docker swarm init --advertise-addr 192.168.43.75



# sudo docker stack deploy -c docker-compose.yml myapp1
