#!/bin/bash

# sudo docker-compose down
# sudo docker rm $(sudo  docker ps -a -q)
# sudo docker rmi $(sudo docker images -q) --force


sudo docker service rm myapp_app
sudo docker service rm myapp_db
sudo docker service rm myapp_client

sudo docker network prune
sudo docker system prune
sudo docker swarm leave --force