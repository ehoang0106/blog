---
title: Containerized My Python Flask Web App with Docker, MariaDB, and Cloudflare Tunnel
date: 2025-03-28 15:30:25
categories:
- Raspberry Pi
tags:
- docker
- mariadb
- cloudflare
- python
- raspberry-pi
---
As part of my journey in web development and data collection, I developed a real-time currency price tracking application that monitors prices from orbwatch.trade. This project combines web scraping, data storage, and visualization to create a useful tool for currency price monitoring. Initially deployed on AWS, I later migrated the application to a Raspberry Pi to optimize costs while maintaining full functionality.

## Architecture Overview

The application follows a modern web architecture:
1. **Flask Web Application** - Serving the frontend and API endpoints
2. **Selenium Web Scraping** - Automated data collection from a website
3. **MariaDB Database** - Local database for persistent storage
4. **Docker Containerization** - Ensuring consistent deployment
5. **Chart.js Visualization** - Interactive price charts for data analysis
6. **Cloudflare Tunnel** - Secure remote access to the application

Here's a diagram showing the complete setup:

## How It Works

### Data Collection
1. The application uses Selenium with Chromium in headless mode to scrape website
2. BeautifulSoup4 parses the HTML to extract currency prices and related data
3. Data is stored in MariaDB with timestamps for historical tracking
4. The scraping process is optimized with proper wait conditions and error handling

### Data Presentation
1. Users access the web interface through orb.khoah.com
2. Cloudflare Tunnel securely routes traffic to the Raspberry Pi
3. The frontend fetches the last 7 days of price data via REST API
4. Chart.js renders interactive price charts
5. Real-time updates are available through the update endpoint

## Key Features

1. **Automated Data Collection**
   - Headless browser automation with Selenium
   - Timezone-aware timestamp recording

2. **Data Storage**
   - MariaDB for efficient local database storage
   - Efficient table structure for price data
   - Automatic database and table creation
   - Regular backups to external storage

3. **Web Interface**
   - Clean, responsive design
   - Real-time price updates
   - Historical data visualization
   - RESTful API endpoints
   - Secure access through Cloudflare Tunnel

## Encountered Issues

1. **Selenium Configuration**
   - Initially struggled with ChromeDriver compatibility
   - Resolved by using webdriver-manager for automatic driver management
   - Added necessary Chrome options for headless operation
   - Optimized for Raspberry Pi's ARM architecture

2. **Database Setup**
   - Configured MariaDB for optimal performance on Raspberry Pi
   - Implemented proper connection pooling
   - Added error handling for database operations
   - Ensured proper connection closure

3. **Docker and Raspberry Pi Setup**
   - Configured Chrome and ChromeDriver in the container
   - Optimized container size for Raspberry Pi
   - Set up proper environment variable handling
   - Configured container networking for local access

4. **Cloudflare Tunnel Configuration**
   - Set up secure tunnel for remote access
   - Configured DNS records for orb.khoah.com
   - Implemented proper security measures
   - Ensured reliable connection stability

## Improvements

Several enhancements could be made to improve the application:
1. **Performance Optimization**
   - Implement caching for frequently accessed data
   - Add database indexing for faster queries
   - Optimize scraping frequency based on data volatility
   - Monitor Raspberry Pi resource usage

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
   - Monitor Raspberry Pi temperature and performance

## Conclusion

This project demonstrates the power of combining web scraping, local database storage, and visualization to create a useful tool, all running efficiently on a Raspberry Pi. The modular architecture allows for easy maintenance and future enhancements. The use of Docker ensures consistent deployment, while Cloudflare Tunnel provides secure remote access to the application. This setup proves that powerful web applications can run effectively on cost-effective hardware while maintaining professional-grade features and security.

For the complete implementation, you can check out my code [here](https://github.com/ehoang0106/RDS).
