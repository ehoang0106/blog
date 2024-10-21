---
title: Create an email subscription for my new blog posts
date: 2024-10-09 13:47:26
tags: serverless, sns, s3, lambda, api
---

![image](https://blog.khoah.net/images/sns.jpg)


Continuing my cloud journey, I’ve developed a new project that allows readers to subscribe to my blog via email. For this, I utilized several AWS services, including SNS, Lambda, API Gateway, Route 53, and S3 Events.

The project involves two main components. First, I created a Lambda function that triggers SNS notifications whenever I publish a new post on my static website hosted on S3.


The second component is another Lambda function integrated with API Gateway, which handles subscription confirmations to the SNS topic. Additionally, I set up a custom domain using API Gateway and Route 53 to manage the DNS records for my new domain. 

You can try it by clicking the subscribe text below :)

For full details, check out the complete setup and code on my [GitHub](https://github.com/ehoang0106/lambda-sns-blog)

![image](https://blog.khoah.net/media/sns-new-blog/sns2.png)
![image](https://blog.khoah.net/media/sns-new-blog/sns1.png)

Here are a few improvements I could consider:
- **S3 Event Filter for Selective Triggering**: Refine the S3 event notification to filter specific file types or prefixes, making the event more targeted and efficient.
- **Implement Retry Logic in Lambda**: Add retry logic in the Lambda functions to handle potential failures in SNS or API requests.


--
