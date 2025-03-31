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
---
As part of my journey in web development and data collection, I developed a real-time currency price tracking application that monitors prices from orbwatch.trade. This project combines web scraping, data storage, and visualization to create a useful tool for currency price monitoring.

## Architecture Overview

The application follows a modern web architecture:
1. **Flask Web Application** - Serving the frontend and API endpoints
2. **Selenium Web Scraping** - Automated data collection from a website
3. **MySQL Database (AWS RDS)** - Persistent storage for historical price data
4. **Docker Containerization (AWS ECS)** - Ensuring consistent deployment across environments
5. **Chart.js Visualization** - Interactive price charts for data analysis

Here's a diagram showing the complete setup:

## How It Works

### Data Collection
1. The application uses Selenium with Chromium in headless mode to scrape website
2. BeautifulSoup4 parses the HTML to extract currency prices and related data
3. Data is stored in AWS RDS (MySQL) with timestamps for historical tracking
4. The scraping process is optimized with proper wait conditions and error handling

### Data Presentation
1. Users access the web interface through a clean, responsive design
2. The frontend fetches the last 7 days of price data via REST API
3. Chart.js renders interactive price charts
4. Real-time updates are available through the update endpoint

## Key Features

1. **Automated Data Collection**
   - Headless browser automation with Selenium
   - Timezone-aware timestamp recording

2. **Data Storage**
   - MySQL database for persistent storage
   - Efficient table structure for price data
   - Automatic database and table creation

3. **Web Interface**
   - Clean, responsive design
   - Real-time price updates
   - Historical data visualization
   - RESTful API endpoints

## Encountered Issues

1. **Selenium Configuration**
   - Initially struggled with ChromeDriver compatibility
   - Resolved by using webdriver-manager for automatic driver management
   - Added necessary Chrome options for headless operation

2. **Database Connection**
   - Implemented proper connection pooling
   - Added error handling for database operations
   - Ensured proper connection closure

3. **Docker Setup**
   - Configured Chrome and ChromeDriver in the container
   - Optimized container size by cleaning up package lists
   - Set up proper environment variable handling

## Improvements

Several enhancements could be made to improve the application:
1. **Performance Optimization**
   - Implement caching for frequently accessed data
   - Add database indexing for faster queries
   - Optimize scraping frequency based on data volatility

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

## Conclusion

This project demonstrates the power of combining web scraping, data storage, and visualization to create a useful tool. The modular architecture allows for easy maintenance and future enhancements. The use of modern technologies like Docker ensures consistent deployment across different environments.

For the complete implementation, you can check out my code [here](https://github.com/ehoang0106/RDS).
