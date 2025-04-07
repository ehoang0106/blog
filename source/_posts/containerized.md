---
title: Containerized My Python Flask Web App with AWS ECS, RDS, and Terraform
date: 2025-04-01 15:30:25
categories:
- AWS
tags:
- ecs
- ec2
- rds
- terraform
- asg
- alb
- python
- docker
- pi
- mysql
---
As part of my exploration of public cloud technologies, I just built a real-time currency price tracking application for the game Path of Exile 2 (～￣▽￣)～.
This project combines web scraping, data storage, and visualization to create a useful tool for currency price monitoring. Initially deployed on AWS, I later migrated the application to a Raspberry Pi to optimize costs while maintaining full functionality.

## Architecture Overview

The application follows a modern web architecture:
1. **Flask Web Application** - Serving the frontend and API endpoints
2. **Selenium Web Scraping** - Automated data collection from a website
3. **AWS RDS (MySQL)** - Managed database service for persistent storage
4. **AWS ECS** - Running the application container
5. **Chart.js Visualization** - Interactive price charts for data analysis
6. **AWS Application Load Balancer** - Managing traffic distribution

Here's a diagram showing the setup:

![img](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/orbwatch/diagram.png)

## How It Works

### Data Collection
1. The application uses Selenium with Chromium in headless mode to scrape website (orbwatch.trade) every 12 hours
2. Data is stored in AWS RDS MySQL instance with timestamps for historical tracking

### Data Presentation
1. Users access the web interface through the application load balancer
2. The frontend fetches the last 7 days of price data
3. Chart.js renders interactive price charts

You can check out my website right here: [https://orb.khoah.com/](https://orb.khoah.com/)

![img](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/orbwatch/Screenshot+2025-04-03+152238.png)

## AWS Infrastructure Setup

1. **Container Management**
   - Containerized application using Docker
   - Stored image in Amazon ECR
   - Deployed container using AWS ECS
   - Configured task definitions for container specifications

2. **Database Management**
   - Set up AWS RDS MySQL instance
   - Implemented proper security groups

3. **Load Balancing and Scaling**
   - Configured Application Load Balancer
   - Set up Auto Scaling Group

4. **Infrastructure as Code**
   - Used Terraform for infrastructure management
   - Defined all AWS resources in code

## Encountered Issues

One of the first hurdles I encountered was with Selenium configuration. I struggled with ChromeDriver compatibility issues, which were quite frustrating at first. However, I found a solution by implementing webdriver-manager for automatic driver management. This not only resolved the compatibility issues but also made the setup more maintainable. I also had to add specific Chrome options to ensure proper headless operation.

The Docker and ECS setup was another learning curve. Configuring Chrome and ChromeDriver in the container took some trial and error, and I had to optimize the container size while ensuring proper networking for ECS tasks. These challenges helped me better understand container orchestration in the cloud.

## Cost Optimization and Migration to Raspberry Pi

After running the application on AWS for awhile, I decided to migrate it to a Raspberry Pi to optimize costs while maintaining functionality. Here's how I accomplished this:

1. **Migration Process**
   - Set up MariaDB on Raspberry Pi
   - Configured Docker
   - Set up Cloudflare Tunnel
   - Migrated data from AWS RDS to local MariaDB

2. **Cost Benefits**
   - Eliminated AWS RDS costs
   - Removed ECS and EC2 expenses
   - Reduced overall infrastructure costs
   - Maintained full application functionality

3. **Current Setup**
   - Application runs on Raspberry Pi
   - Accessible via orb.khoah.com through Cloudflare Tunnel
   - Local MariaDB for data storage
   - Docker containers for application deployment

![img](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/orbwatch/pi.png)

## Improvements

Currently, I'm using `mysql.connector` which tightly couples the application to MySQL. While it works well, switching to `SQLAlchemy` would provide better database abstraction. This means if I want to switch to PostgreSQL or any other database in the future, I won't need to rewrite the database layer from scratch.

Additionally, the application runs directly on Flask's development server, which isn't ideal for production. I plan to switch to Gunicorn, a production-grade WSGI server. While Flask's built-in server is great for development, it's not designed for production workloads and doesn't handle multiple requests efficiently.

For the complete implementation, you can check out my code [here](https://github.com/ehoang0106/containerized).
