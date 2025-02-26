---
title: Automating Spin Up a Remote Desktop Server Using Ansible, Terraform, and RustDesk
date: 2025-02-24 14:48:34
tags:
- terraform
- ansible
- rustdesk
- vpc
- docker
- ec2
categories: AWS
---

Frustrated with TeamViewer’s restrictions and TightVNC’s limitations, I found RustDesk—the ideal remote desktop solution for accessing my MacBook and Ubuntu server at home.

What I love about RustDesk is that it's open-source, works across Linux, Windows, and macOS, and even lets you host your own server for more control.

So, I figured—why not take this as a chance to set up my own RustDesk server while also learning Ansible for automation, sharpening my Terraform skills, and getting deeper into AWS?

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/remote-desktop/flow.png)

Setting up RustDesk is kinda simple and hassle-free.

I have two instances running simultaneously - One serves as the Ansible control node, managing the second server, the other runs two Docker containers.

I used terraform to build my infrastructure on AWS. There is a VPC contains 2 subnet. Each subnet has a instance with a needed security group open required port as well as a network acl and internet gateway. 

Terraform helps me 

The reason for having 2 containers is RustDesk self-hosted required 2 executable called `hbbs` and `hbbr`

- `hbbs` - RustDesk ID server for rendezvous/signaling, listen on `TCP: 21114` for http, `TCP:  21115, 21116, 21118` for web socket and `UDP: 21116`
- `hbbr` - RustDesk replay server, listen on `TCP: 21117, 21119` for web socket

Here is illustrations of how RustDesk client communicates with hbbr/hbbs

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/remote-desktop/hbbs-hbbr.png)



