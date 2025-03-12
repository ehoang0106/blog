---
title: Building a Highly Available Web Server with Terraform - Auto Scaling, Load Balancing, and Cross-Region Failover
date: 2025-03-15 12:20:25
tags:
- ec2
- asg
- alb
- load balancer
- failover
categories:
- AWS
---

As part of honing my Terraform skills, I developed a script to provision a highly available web server, designed to simulate a real-world infrastructure solution.

## Architecture Overview

My architecture follows the recommended AWS best practices, including:
1. **Multi-region deployment** - Primary in US West, Secondary in US East
2. **Auto Scaling Groups** in each region to handle traffic fluctuations
3. **Application Load Balancers** to distribute traffic
4. **Route53 DNS Failover** for automatic cross-region recovery
5. **Health checks** to detect and respond to failure

To reduce expenses, I omitted the database from this project. The diagram shows my complete setup minus the database.

![img](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/load-balancing/diagram-2.png)

## How It Works

Here's how the system handles different scenarios:
### Normal Operation

1. Users access web.khoah.net
2. Route53 routes traffic to ALB in the primary region (US West)
3. The ALB distributes requests to healthy instances in the ASG
4. ASG maintains the desired number of instances based on load

### Primary Region Failure

1. Health checks detect the primary region is unavailable
2. CloudWatch Alarm triggers a Lambda function to spin up the secondary region (US East)
3. Route53 automatically routes traffic to the secondary region
4. Users continue to access the application through the same URL
5. When the primary region recovers, traffic fails back automatically
6. After the primary region is recovered, the CloudWatch Alarm will turn off the secondary region to save cost

### Traffic Spike

1. Increased load causes higher CPU utilization
2. ASG scales out additional instances when CPU exceeds 50%
3. ALB distributes traffic across all healthy instances
4. As load decreases, ASG terminates excess instances

## Cost Optimization

The architecture is designed to be cost-effective:
- Auto-scaling ensures you only pay for what you need
- Multi-AZ deployment provides high availability with minimal resources
- Implementing CloudWatch Alarms and Lambda functions to manage secondary server activation based on primary region health

## Encountered Issues

Initially, I designed a system with two auto-scaling groups running simultaneously in two regions. However, I realized this was not cost-effective, so I redesigned it and have to right the terraform code again.

Also while setting up auto scaling with Terraform, I spent hours troubleshooting why the auto scaling group wasn’t created—only to realize I had referenced the security group by name instead of id (`security_groups = [aws_security_group.my_sg.id]`).

Moreoever, "thanks to" a bug, when I enabled the IP address in the `launch template` for the instance in the Terraform code, it helped to remember that the network interface required a security group assignment. If you use the console to create the launch template, it will automatically select the default security group for you.

I also hit an issue configuring a CloudWatch Alarm for a Lambda trigger. The Route 53 Health Check metric is only in `us-east-1`, and my `aws_cloudwatch_metric_alarm` failed until I explicitly set the correct provider in the CloudWatch configuration.

## Improvements

- WAF integration for additional security
- CloudFront for global edge caching
- Private subnets for the application tier
- RDS for database storage with cross-region replication
- Enhanced monitoring with CloudWatch dashboards

