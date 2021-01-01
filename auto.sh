#!/bin/bash


echo "start build container"
docker build -t city-station .


echo "starting services"
docker-compose up --build -d