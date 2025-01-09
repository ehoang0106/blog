---
title: Tracking Gas Prices with Python Web Scraping, AWS DynamoDB, and Discord
date: 2025-01-06 14:48:34
tags: 
- AWS
- dynamodb
- terraform
- OIDC
- raspberry pi
---

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/gas/cover.webp)

It's been a while since my last post. It was frustrated with the fluctuating gas prices in California, I decided to use a Discord bot and DynamoDB to create a database. This allows me to analyze the data and determine the lowest gas prices of the week, so I can plan the best time to fuel up my car.

Here's how it works:
- I host a bot on my Raspberry Pi to save money.
- [Terraform](https://blog.khoah.net/tags/terraform/) helps me spin up the database by using DynamoDB.
- Every 24 hours, the bot will get data from Google.
- The bot then writes the data to DynamoDB and returns the results in the chat.

You can take a look at the setup below:

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/gas/gas-chart.jpg)

Since this is a budget project, I use a Python web scraping script to gather data from Google instead of their API. It's been 3 months now, and the code is still working great! Here is the script [source code](https://github.com/ehoang0106/gas-price).

*Please note that I specifically track Chevron gas stations because they offer the best quality gas in the city.*


Below is an example of the bot's response:

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/gas/gas1.png)

And the data stored in my DynamoDB:

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/gas/db.jpg)

As mentioned in the previous post, I configured OpenID Connect (OIDC) within my workflows to authenticate with AWS. OIDC is a secure way to authenticate without exposing tokens or secret access keys. Instead, it uses a trusted role directly in AWS, which enhances security and simplifies the authentication process.

Below is the steps how I set it up:

1. **Create an OIDC Provider in AWS**: This allows AWS to trust the identity provider, in this case, GitHub Actions.
2. **Define a Role in AWS**: Create a role that can be assumed by the OIDC provider. This role will have the necessary permissions for your workflow.
3. **Configure GitHub Actions**: Update GitHub Actions workflow to request a JSON Web Token (JWT) from the OIDC provider and use it to assume the role in AWS.

You can follow this [document](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) on GitHub to configure your setup, but here is an example from my workflow files:

```yaml
permissions:
  contents: read # This is required for actions/checkout
  id-token: write # This is required for requesting the JWT

- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v1.7.0
  with:
    role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
    role-session-name: 'GH_TO_AWS-VIA-OIDC'
    aws-region: us-west-1
```


While working on this project, I found that the most challenging task was debugging the data scrapped from Google. The `beautiful soup` library was amazing, it helped me a lot with identifying the element to collect the correct data from Google. This was very fun project which also helped me practice Terraform and learn how to use DynamoDB.

#### Improvements:
- Using data from Google API instead of web scraping to ensure data consistency.
- Visualize data with BI tool such as PowerBI to be able to determine the price trend from the data.
- Not using the `access token` in the script for accessing DynamoDB. Maybe build an auth server with `OAuth2` configurations.
