---
title: Create my own VPN with Terraform, AWS, and OpenVPN
tags:
- ec2
- terraform
category:
- AWS
---

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/vpn-blog/cover.webp)

I'm planning to visit Melbourne, Australia, this summer. While searching for a hotel, I noticed that prices vary based on location, so I decided to use a VPN to find a better deal. Rather than relying on a VPN provider, I opted to set up my own VPN using Terraform, AWS, and OpenVPN.

The setup is straightforward. First, I create a `VPC` and then host an `EC2 instance` using the `OpenVPN AMI`. Next, I configure a `subnet` and a `security group` that allows the necessary `TCP/UDP` ports, including `TCP ports 943, 945, 1194`. Additionally, I set up a network ACL to manage traffic. Here is the diagram for my setup:

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/vpn-blog/vpn.jpg)

Since the nearest AWS region to Melbourne is Sydney, I chose the `ap-southeast-2` region for my instance. Terraform greatly simplifies the process of spinning up the infrastructure as code. You can check out my code on my GitHub Repo here.

Here are the price comparisons when using a VPN to simulate locations in Sydney and the US.

US:

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/vpn-blog/bk-us2.png)

AU:

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/vpn-blog/bk-au1.jpg)

US:

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/vpn-blog/bk-au2-1.png)

AU: 

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/vpn-blog/bk-us1-1.png)
