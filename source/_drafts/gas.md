---
title: Tracking Gas Prices with AWS DynamoDB, Terraform, GitHub Actions (OIDC), and Discord Bot
date: 2025-01-06 14:48:34
tags: 
- dynamodb
- terraform
- OIDC
- raspberry pi
---

Hi everyone,

It's been a while since my last post, and I hope you haven't forgotten me. After getting frustrated with the fluctuating gas prices in California, I decided to use a Discord bot and DynamoDB to create a database. This allows me to analyze the data and determine the lowest gas prices of the week, so I can plan the best time to fuel up my car.

Here's how it works:
- I host a bot on my Raspberry Pi to save money.
- Every 24 hours, the bot spins up a Chrome driver to crawl data from Google.
- Once the results are returned, the bot writes the data to DynamoDB and then returns the results in the chat.

Since this is a budget project, I use web scraping to gather data from Google instead of paying for their API. It's been 3 months now, and the code is still working great! If you're interested in the code, you can access it here.

*Please note that I specific the Chevron gas station because they offer the best quality gas in the city. You can adjust it in the code if needed.*

This is a result is returned from the bot. When giving them a command.

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/gas/gas1.png)

And this is a data in my DynamoDB.

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/gas/gas2.png)

As promised, I also configured OpenID Connect (OIDC) within my workflows to authenticate with AWS. You can follow this document on GitHub to configure your setup, but here is an example from my workflow files:
```
permissions:
  contents: read # This is required for actions/checkout
  id-token: write   # This is required for requesting the JWT

- name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1.7.0
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
          role-session-name: 'GH_TO_AWS-VIA-OIDC'
          aws-region: us-west-1
```