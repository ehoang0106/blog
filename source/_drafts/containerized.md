---
title: Containerized My Python Flask Web App with AWS ECS, RDS, and Terraform
date: 2025-03-28 15:30:25
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
- raspberry-pi
---
As part of my journey in web development and data collection, I developed a real-time currency price tracking application that monitors prices. This project combines web scraping, data storage, and visualization to create a useful tool for currency price monitoring. Initially deployed on AWS, I later migrated the application to a Raspberry Pi to optimize costs while maintaining full functionality.

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
   Users can get the real-time price by hitting `Update Data` button
2. Data is stored in AWS RDS MySQL instance with timestamps for historical tracking

### Data Presentation
1. Users access the web interface through the application load balancer
2. The frontend fetches the last 7 days of price data
3. Chart.js renders interactive price charts

![img](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/orbwatch/Screenshot+2025-04-03+151635.png)

## Key Features

1. **Automated Data Collection**
   - Headless browser automation with Selenium
   - Timezone-aware timestamp recording

2. **Data Storage**
   - AWS RDS MySQL for managed database service
   - Efficient table structure for price data
   - Automatic database and table creation
   - Automated backups and maintenance

3. **Web Interface**
   - Clean, responsive design
   - Real-time price updates
   - Historical data visualization

## AWS Infrastructure Setup

1. **Container Management**
   - Containerized application using Docker
   - Stored images in Amazon ECR
   - Deployed containers using AWS ECS
   - Configured task definitions for container specifications

2. **Database Management**
   - Set up AWS RDS MySQL instance
   - Implemented proper security groups

3. **Load Balancing and Scaling**
   - Configured Application Load Balancer
   - Set up Auto Scaling Group
   - Implemented health checks
   - Configured target groups

4. **Infrastructure as Code**
   - Used Terraform for infrastructure management
   - Defined all AWS resources in code

## Encountered Issues

1. **Selenium Configuration**
   - Initially struggled with ChromeDriver compatibility
   - Resolved by using webdriver-manager for automatic driver management
   - Added necessary Chrome options for headless operation

2. **AWS RDS Connection**
   - Implemented proper connection pooling for RDS
   - Added error handling for database operations
   - Ensured proper connection closure
   - Configured security groups for RDS access

3. **Docker and ECS Setup**
   - Configured Chrome and ChromeDriver in the container
   - Optimized container size by cleaning up package lists
   - Set up proper environment variable handling
   - Configured container networking for ECS tasks

## Cost Optimization and Migration to Raspberry Pi

After running the application on AWS for several months, I decided to migrate it to a Raspberry Pi to optimize costs while maintaining functionality. Here's how I accomplished this:

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

## Improvements

Several enhancements could be made to improve the application:
1. **Performance Optimization**
   - Implement caching for frequently accessed data
   - Add database indexing for faster queries
   - Optimize scraping frequency based on data volatility
   - Monitor resource usage (AWS or Raspberry Pi)

2. **Feature Additions**
   - Add user authentication
   - Implement price alerts
   - Add more currency pairs
   - Include price prediction features

3. **Monitoring and Maintenance**
   - Add logging system
   - Implement health checks
   - Set up automated backups
   - Add monitoring dashboard
   - Configure performance insights

## Conclusion

This project demonstrates the power of combining web scraping, data storage, and visualization to create a useful tool. The modular architecture allows for easy maintenance and future enhancements. The initial AWS deployment showcased the power of cloud services, while the migration to Raspberry Pi proved that powerful applications can run efficiently on cost-effective hardware. The use of modern technologies like Docker, AWS services, and Cloudflare Tunnel ensures consistent deployment and secure access across different environments.

For the complete implementation, you can check out my code [here](https://github.com/ehoang0106/RDS).
