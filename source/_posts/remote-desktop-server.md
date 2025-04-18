---
title: Automating Build a Remote Desktop Server Using Ansible, Terraform, and RustDesk
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

Frustrated with TeamViewer’s restrictions and TightVNC’s limitations, I found RustDesk—an ideal remote desktop solution for accessing my MacBook and Ubuntu server at home.

What I love about RustDesk is that it's open-source, works across Linux, Windows, and macOS, and even lets you host your own server for more control.

So, I figured — why not take this as a chance to set up my own RustDesk server while also learning Ansible for automation, sharpening my Terraform skills, and getting deeper into AWS?

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/remote-desktop/rm-cover.png)

## Infrastructure

You'll have two servers running simultaneously:

1. Ansible Control Node – Manages the RustDesk server.
2. RustDesk Server – Runs two Docker containers to control remote desktop connections.

Terraform provisions the AWS infrastructure, as shown in the diagram below. It sets up:

- A `VPC` with two subnets.
- Two `Network Interface` for static private `IPv4` addresses for the instances.
- Two `EC2 instances` (one for Ansible, one for RustDesk).
- `Security groups` with the required ports open.
- `Internet Gateway `for accessing internet.

Meanwhile, Ansible automates:
- Install `Docker` and run `docker containers`.
- Configure `UFW` (Uncomplicated Firewall) on the RustDesk server using an `Ansible playbook`.

For the complete setup and code, check it out [here](https://github.com/ehoang0106/rustdesk).
![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/remote-desktop/flow.png)



## Why two Docker containers?

RustDesk’s self-hosted setup requires two executables: `hbbs` and `hbbr`.

- `hbbs` - `RustDesk ID server`: Handles rendezvous/signaling.
  - Listen on: 
    - `TCP: 21114` (HTTP)
    -  `TCP:  21115, 21116, 21118` (WebSocket)
    - `UDP: 21116`.
- `hbbr` - `RustDesk replay server`: Facilitates communication between clients.
  - Listen on:
    - `TCP: 21117, 21119` (WebSocket)

Here is an illustrations of how RustDesk client communicates with hbbr/hbbs from [RustDesk documentation](https://github.com/rustdesk/rustdesk/wiki/How-does-RustDesk-work%3F):
![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/remote-desktop/hbbs-hbbr.png)

## Demo
Once `hbbs` is up and running, it will automatically generate a pair of encrypted private and public keys (`id_ed25519` and `id_ed25519.pub`). These keys are primarily used for communication encryption. The public key will be used for authorization when connecting to the server.

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/remote-desktop/rd4.png)
The connection between RustDesk remote and RustDesk client are encrypted.

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/remote-desktop/rd5.png)
Using RustDesk on smartphone.

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/remote-desktop/rd3.png)


## Encountered issues
While setting up Ansible, I ran into issues with defining the correct host IP for the RustDesk server and bypassing SSH known hosts verification, which blocked provisioning. 

I also faced permission errors due to missing sudo privileges. After tweaking the Ansible inventory and SSH settings, I got everything working—turning these hurdles into valuable learning experiences.


## Improvements
- Use ECS or Kubernetes for Container Management – Running RustDesk on AWS ECS or Kubernetes would simplify deployment and scaling.
- Automate SSH Key Setup – Automating keypair configuration with Terraform & AWS System Manager Agent (AWS SSM) would eliminate manual setup since Ansible isn’t the ideal solution for managing SSH keys.
- Enable Auto-Healing & Scaling – Adding Auto Scaling & Health Checks would improve reliability by automatically recovering from failures.








