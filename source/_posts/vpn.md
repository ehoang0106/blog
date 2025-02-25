---
title: Create my own VPN with Terraform, AWS, and OpenVPN
date: 2025-02-14 14:48:34
tags:
- ec2
- terraform
- vpn
category:
- AWS
---
![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/vpn-blog/vpn.jpg)

I'm planning to visit Melbourne, Australia, this summer. While searching for a hotel, I noticed that prices vary based on location, so I decided to use a VPN to find a better deal. Rather than relying on a VPN provider, I opted to set up my own VPN using Terraform, AWS, and OpenVPN.

The setup is straightforward. First, I create a `VPC` and then host an `EC2 instance` using the `OpenVPN AMI`. Next, I configure a `subnet` and a `security group` that allows the necessary `TCP/UDP` ports, including `TCP ports 943, 945, 1194`. Additionally, I set up a network ACL to manage traffic.

I chose the `ap-southeast-2` region (Sydney) for my instance, which is in Australia. I didn't realize that there is a new region in Melbourne, but I will keep it in mind.

Terraform greatly simplifies the process of spinning up the infrastructure as code. You can check out my code on my GitHub Repo [here](https://github.com/ehoang0106/vpn).

Here are some screenshots of the server's web page:

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/vpn-blog/vpn-3.jpg)

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/vpn-blog/vpn-4.jpg)


Below are the price comparisons when using a VPN to simulate locations in Sydney and the US.
Surprisingly, the price in US is better than the price in Australia for some reason. All the prices are in USD.

US:

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/vpn-blog/bk-au2-1.png)

AU: 

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/vpn-blog/bk-us1-1.png)

I believe the booking site has VPN detector so maybe that's why the prices are much more expensive when I was accessing the site from VPN.

One thing I've learnt doing this is instead of using filter for the name to search the VPN ami, I need to use the `product_id` for the exact result. You can find the `product_id` in the subcription page on AWS Marketplace.

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/vpn-blog/product_id.png)

Improvements:

- Consider using ECS instead of an AMI for improved pre-configuration and management.
- Explore other cloud providers for enhanced location masking, as AWS IP ranges are widely recognized.
- Learn more about other open source VPN product for faster performance. For example, WireGuard.