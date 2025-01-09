---
title: Tracking Gas Prices with AWS DynamoDB, Terraform, GitHub - AWS OIDC Configuration, and Discord Bot
date: 2025-01-06 14:48:34
tags: 
- dynamodb
- terraform
- OIDC
- raspberry pi
---

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/gas/cover.webp)

It's been a while since my last post, and I hope you haven't forgotten me. After getting frustrated with the fluctuating gas prices in California, I decided to use a Discord bot and DynamoDB to create a database. This allows me to analyze the data and determine the lowest gas prices of the week, so I can plan the best time to fuel up my car.

Here's how it works:
- I host a bot on my Raspberry Pi to save money.
- [Terraform](https://blog.khoah.net/tags/terraform/) helps me spin up the database by using DynamoDB.
- Every 24 hours, the bot will get data from Google.
- The bot then writes the data to DynamoDB and returns the results in the chat.

You can take a look at the setup below:

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/gas/gas-chart.jpg)

Since this is a budget project, I use web scraping to gather data from Google instead of paying for their API. It's been 3 months now, and the code is still working great! If you're interested in the code, you can access it [here](https://github.com/ehoang0106/gas-price).

*Please note that I specifically track Chevron gas stations because they offer the best quality gas in the city.*


Here is an example of the bot's response when given a command:

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/gas/gas1.png)

And here is the data stored in my DynamoDB:

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/gas/db.jpg)

As promised, I also configured OpenID Connect (OIDC) within my workflows to authenticate with AWS. OIDC is a secure way to authenticate without exposing tokens or secret access keys. Instead, it uses a trusted role directly in AWS, which enhances security and simplifies the authentication process.

Here's a deeper dive into the setup:

1. **Create an OIDC Provider in AWS**: This allows AWS to trust the identity provider (in this case, GitHub Actions).
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


Even though this is just a small project, it took a lot of time to debug the data scraping from Google. I had to go through every single element on their website to determine the correct class and collect the data. However, it was very fun and helped me practice Terraform and learn how to use DynamoDB, as this was my first time using it.

In the future, if I have the opportunity to access data from the Google API, I will use it instead of web scraping to ensure the code remains stable.
Additionally, I could visualize the data by creating graphs or importing it into PowerBI for a better graphical experience.
