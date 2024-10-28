---
title: Automating Valheim Server Hosting on AWS with Terraform and GitHub Actions
date: 2024-10-20 09:07:38
tags:
---
![image](https://blog.khoah.net/media/terraform-github-action-for-valheim/valheim-cover.jpg)
I love playing survival games, and Valheim is the best one I've ever played. Developed by Iron Gate, Valheim is a survival sandbox game set in a stunning, Norse-inspired world. Players take on the role of a Viking warrior, exploring, crafting, and building to prove themselves to the gods, all while being under 1 GB in size. With a mix of exploration, combat, and resource management, I decided to host a server to invite my friend, making it an even more thrilling adventure.

Because the game very light, a t3 medium instance is enough, here is full specs of the instance:

![image](https://blog.khoah.net/media/terraform-github-action-for-valheim/graph.png)

Since the game is very light, a T3 medium instance is sufficient. Here are the full specifications of the instance:

- AMI: `Ubuntu Server 24.04 LTS (HVM)`
- Instance type: `t3.medium`
- VPC: `Default`
- Storage: `8 GB`


A security group with the following rules:
- Custom TCP: Port `2456-2458`
- Custom UDP: Port `2456-2458`
- SSH: TCP `Port 22` open to my IP
git 
For the 