---
title: Serverless Blog
date: 2024-10-07 14:43:13
tags: serverless
categories: AWS
---

![image](https://s3.amazonaws.com/blog.khoah.net/images/serverless.jpg)

This blog is serverless using combination of Hexo, GitHub, AWS S3, AWS Route 53, and AWS CloudFront.

[Hexo](https://hexo.io/) serves as the static site generator, allowing me to easily write content in Markdown and generate a lightweight, fast website. 

To automate deployments, I leverage GitHub Actions and AWS IAM Access Key, which triggers workflows every time I push changes, ensuring my site is always up-to-date without manual effort. 

For hosting, I utilize Amazon S3, providing reliable storage for my static files and Amazon Route 53 routes traffic efficiently to my S3 bucket.

Finally, Amazon CloudFront enhances performance by caching my content globally, ensuring quick load times and secure connections with HTTPS. This serverless architecture makes my blog scalable, efficient, and easy to maintain—perfect for sharing my thoughts.

This setup works well, however there are a few improvements that I could think off:
- Setup Terraform as IaC to manage the resources.
- GitHub OIDC instead of using IAM Access Keys, reducing the risk of exposing the AWS credentials.

P/s: This blog uses the [Cactus](https://github.com/probberechts/hexo-theme-cactus) theme by [Pieter Robberechts](https://github.com/probberechts)

--