---
title: Building a Real-Time Visitor Counter For My Blog with AWS Lambda and API Gateway
date: 2025-10-16 10:00:00
categories:
- AWS
tags:
- lambda
- api
- api-gateway
- terraform
- dynamodb
---

I recently challenged myself to build at least one project per day until I land my dream job as a CloudOps/DevOps engineer 🥹. Then, I came up with this little project on day 3.

I wanted a simple way to track blog visitors without using Google Analytics or other third-party tracking services. The solution? A serverless visitor counter built with AWS Lambda, API Gateway, and DynamoDB, all provisioned with Terraform.

![Architecture Diagram](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/visitor-count/diagram.jpg)

## The Setup

The architecture is pretty straightforward. **DynamoDB** stores the visit data. Each day gets its own record, and I can easily query the table for daily counts or total visits.

The **Lambda function**, when triggered, it increments today's count in DynamoDB, then queries all date entries to calculate the total visits. The function returns the total count as JSON.

For the API layer, I went with **HTTP API** instead of REST API—lower latency, cheaper pricing, and simpler configuration. I also set up a custom domain using Route 53 and an ACM certificate to provide a consistent, branded endpoint and enable secure HTTPS access.

The IAM setup includes a custom role for Lambda with DynamoDB permissions (Query, PutItem, UpdateItem, etc.) and CloudWatch Logs access for debugging.

For the fully setup, check out the Terraform code in my [GitHub repository](https://github.com/ehoang0106/everyday-devops-project/tree/master/day3).

Here is the visit count screenshot from my blog:

![Visitor Count Screenshot](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/visitor-count/visit-count.png)

## The 3-Hour Debug Lesson

Everything worked fine when I tested the Lambda function directly. But through API Gateway? 500 errors every single time.

I checked the IAM role, correct. The integration configuration, yes it looks good. The route and stage, all set up properly. I even re-deployed the API multiple times thinking it was a cache issue.

Turns out, the missing piece was `aws_lambda_permission`, thanks for the document from [Terraform docs](https://registry.terraform.io/providers/hashicorp/aws/2.33.0/docs/guides/serverless-with-aws-lambda-and-api-gateway). Even though the Lambda function has an IAM role, API Gateway needs explicit permission to invoke it. This is a resource-based policy on the Lambda function itself, separate from the execution role.

Lesson learned: Always read the documentation carefully, especially for cross-service permissions!

## Improvements

Right now, the API is wide open. Anyone who knows the URL can hit it, which could lead to inflated counts and unexpected AWS bills if someone decides to spam it.

Some options to lock it down:

- **Rate Limiting with AWS WAF** - Attach WAF to the API Gateway and set rules like "maximum 10 requests per minute per IP." This prevents abuse while still allowing legitimate traffic. WAF costs a bit extra, but it's worth it for public APIs.
- **CORS Restrictions** - Configure the API to only accept requests from my blog's domain. Won't stop determined attackers, but prevents casual misuse and embedding on other sites.
- **Lambda Authorizer** - Write a custom authorizer that validates a token or checks the request origin. More flexible but adds complexity and another Lambda invocation to every request.

For my use case, **CORS + basic rate limiting** would probably be enough. It's a blog counter, not a payment API. I just want to prevent obvious abuse without over-engineering the solution.

