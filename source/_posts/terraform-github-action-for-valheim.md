---
title: Automating Valheim Server Hosting on AWS with Terraform and GitHub Actions
date: 2024-10-20 09:07:38
tags:
- terraform
- docker
- raspberry pi
- ec2
- s3
- sns
categories: AWS
---
![image](https://blog.khoah.net/media/terraform-github-action-for-valheim/valheim-cover-new.jpg)
I love playing survival games, and Valheim is the best one I've ever played. Developed by Iron Gate, Valheim is a survival sandbox game set in a stunning, Norse-inspired world. Players take on the role of a Viking warrior, exploring, crafting, and building to prove themselves to the gods, all while being under 1 GB in size.

With a mix of exploration, combat, and resource management, I decided to host a server to invite my friend, making it an even more thrilling adventure.

Since the game is very light, a T3 medium instance is sufficient. Here are the full specifications of the instance:

- AMI: `Ubuntu Server 24.04 LTS (HVM)`
- Instance type: `t3.medium`
- VPC: `Default`
- Storage: `gp3` `8 GB`


A security group with the following rules:
- Custom TCP: Port `2456-2458`
- Custom UDP: Port `2456-2458`
- SSH: TCP `Port 22` open to my IP

One challenge was configuring security group rules. Initially, the server was inaccessible due to incorrect port settings. Opening TCP and UDP ports 2456-2458 resolved the issue, allowing players to connect.

You can check out the graph below for the full setup:

![image](https://blog.khoah.net/media/terraform-github-action-for-valheim/graph-new.png)

For docker image in the server, I'm using the image of [mbround18](https://hub.docker.com/r/mbround18/valheim). The container has been running smoothly without issues. 

Below is the docker-compose configuration, which is also available in my GitHub [valheim-install.tftpl](https://github.com/ehoang0106/terraform-valheim-server/blob/master/terraform/valheim-install.tftpl)

```docker
version: "3"
services:
  valheim:
    image: mbround18/valheim:latest
    ports:
      - 2456:2456/udp
      - 2457:2457/udp
      - 2458:2458/udp
    environment:
      PORT: 2456
      NAME: "lazyValheim"
      WORLD: "lazyValheim"
      PASSWORD: "${password}"
      TZ: "America/Los_Angeles"
      PUBLIC: 1
    volumes:
      - ./valheim/saves:/home/steam/.config/unity3d/IronGate/Valheim
      - ./valheim/server:/home/steam/valheim

```

I also set up a Discord bot hosted on a Raspberry Pi running Ubuntu Server. 
This bot operates as a service in the background, ensuring it’s always active and responsive to commands. 

With the command `!up`, the bot initiates the EC2 instance hosting the Valheim server and responds with the server's IP address.

When the session is over, the `!down` command shuts down the instance when needed beside the CloudWatch setup to automatically turn off the server if there is no connection. 

This bot-based control lets me manage the server remotely without needing to log into the AWS console.

![image](https://blog.khoah.net/media/terraform-github-action-for-valheim/discord_sc.png)

Here is an example of a CloudWatch setup to monitor `NetworkPacketsIn` over a 5-minute period with a threshold of `300`.

```docker
resource "aws_cloudwatch_metric_alarm" "valheim-network-in-alarm" {
alarm_name                = "vrisng-network-in-alarm"
comparison_operator       = "LessThanOrEqualToThreshold"
evaluation_periods        = 2
metric_name               = "NetworkPacketsIn"
namespace                 = "AWS/EC2"
period                    = 300
statistic                 = "Maximum"
threshold                 = 300
alarm_description         = "Monitor network packets in"
dimensions = {
    InstanceId = resource.aws_instance.valheim-instance.id
}
actions_enabled     = "true"
alarm_actions       = ["arn:aws:automate:us-west-1:ec2:stop"]
}
```

I set up an SNS Topic to notify me when the CloudWatch alarm triggers to stop the instance. Initially, there were permission issues, but adjusting the IAM policies resolved them.

![image](https://blog.khoah.net/media/terraform-github-action-for-valheim/sns-noti.png)

In case you're wondering why there's an S3 bucket, it's used to store the `tfstate` file as specified in [provider.tf](https://github.com/ehoang0106/terraform-valheim-server/blob/master/terraform/provider.tf)

For the full code setup and instruction, please check out my [GitHub Repository](https://github.com/ehoang0106/terraform-valheim-server)

I'm really happy with how this server is performing. However, I’m looking forward to making some improvements next time:

- Utilize `Ansible` to automate the deployment of a Docker image instead of manually accessing the server to install it.
- In the previous post, I promised to set up OIDC for the GitHub Action and AWS but I did not complete it. I will cover this in the next post.
