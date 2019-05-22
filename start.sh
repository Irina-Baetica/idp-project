#!/bin/bash

# sudo docker-compose up
sudo docker login
# sudo docker build -t app1 ./app
# sudo docker build -t client1 ./client
# sudo docker build -t database1 ./db

sudo docker tag app1 whale1234/idp2:first1
sudo docker tag client1 whale1234/idp2:second1
sudo docker tag database1 whale1234/idp2:third1

sudo docker push whale1234/idp2:first1
# sudo docker swarm init --advertise-addr 192.168.0.102
sudo docker swarm init --advertise-addr 192.168.43.75



# sudo docker stack deploy -c docker-compose.yml myapp1

# ar trebui sa mai fac un repo in docker mai dau o data push la niste imagini builduite local ca imi ia 127.0.0.1 in pagina web la server
# sau sa mai testez o data cu pull dupa ce dau restart
