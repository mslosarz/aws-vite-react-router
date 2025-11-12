# Vite + React Router SPA Deployment Scaffolding (AWS S3 + CloudFront)
## Purpose

This scaffolding provides a lightweight, cost-effective, and production-ready setup for hosting a React single-page application (SPA) built with Vite and React Router on AWS S3, fronted by CloudFront for CDN caching and HTTPS delivery.

It supports full client-side routing (React Router), seamless deep links (e.g., /about, /dashboard), and automatic SPA fallbacks without needing CloudFront Functions or Lambda@Edge.

## ⚙️ Architecture Overview
```Browser
↓
CloudFront Distribution
↓
S3 Website Endpoint (Static Assets)
```

**Flow:**

1. CloudFront serves static assets (HTML, JS, CSS) from S3.
2. All routes (e.g., /, /page1, /page2) resolve to index.html.
3. React Router handles routing client-side.
4. CloudFront caches assets globally, with automatic HTTPS redirection.

## 🧩 Stack Components

| Component              | Purpose                                             |
| ---------------------- | --------------------------------------------------- |
| **Vite**               | Fast modern React bundler and dev server            |
| **React Router DOM**   | SPA routing (client-side navigation)                |
| **AWS S3**             | Static web hosting for build output                 |
| **AWS CloudFront**     | CDN distribution, HTTPS endpoint, caching layer     |
| **AWS CloudFormation** | Infrastructure-as-Code for reproducible deployments |

## Prerequisites
To use the `deploy.sh` script, ensure that [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) is installed.

To use the `undeploy.sh` script, ensure that `jq` is in place.

## Available Scripts
### `deploy.sh <SPA name>`
This script automates the deployment of your React app to AWS by creating the necessary infrastructure:
- S3 Bucket: The app will be stored and served from this bucket.
- CloudFront Distribution: Acts as a content delivery network (CDN) to provide a globally distributed access point for
  your app.
- CloudFront Function: Ensures that React Router works correctly by intercepting CloudFront requests.

The script leverages AWS CloudFormation to create and manage these resources. Once the infrastructure is in place, it
builds your React app and uploads the files to the S3 bucket.

### `undeploy.sh <SPA name>`
This script cleans up all the resources created during deployment:

- Deletes the S3 bucket
- Removes the CloudFront distribution
- Deletes the associated function
