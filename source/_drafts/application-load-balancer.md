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
5. **Health checks** to detect and respond to failures
6. **CloudWatch Alarm** to trigger a Lambda function that spins up the second region

Here's what my infrastructure looks like:

![img](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/load-balancing/diagram-2.png)

## How It Works

Here's how the system handles different scenarios:
### Normal Operation

1. Users access web.khoah.net
2. Route53 routes traffic to the primary region (US West)
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

While setting up auto scaling with Terraform, I ran into an issue where the auto scaling group wasn't created as expected. After hours of troubleshooting, I realized the problem was that I referenced the security group as its `name` instead of using its `id` `(security_groups = [aws_security_group.my_sg.id])`. 

Once corrected, the auto scaling group still didn't create properly until I added `depends_on` to ensure the security group was fully created first. This experience highlighted the importance of referencing resources correctly and using `depends_on` to manage dependencies.

## Improvements

- WAF integration for additional security
- CloudFront for global edge caching
- Private subnets for the application tier
- RDS for database storage with cross-region replication
- Enhanced monitoring with CloudWatch dashboards

