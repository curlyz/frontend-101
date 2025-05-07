# Build and Deployment

## Main Ideas to Convey

- Explain the build process: transforming source code (React, JSX, TS) into static assets (HTML, CSS, JS) for browsers.
- Introduce common build tools for React (e.g., Vite, Create React App/Webpack).
- Define deployment: making the built application accessible to users on a server.
- Briefly cover CI/CD (Continuous Integration/Continuous Deployment) concepts.
- Mention common deployment platforms/strategies (e.g., Netlify, Vercel, static hosting on S3, Docker).

## Content

After developing your React application, the final steps are to build it for production and deploy it so users can access it.

### The Build Process

The build process transforms your development code (React components, JSX, TypeScript, modern JavaScript, CSS preprocessors, etc.) into optimized static assets (HTML, CSS, and JavaScript bundles) that web browsers can understand and render efficiently.

**Key tasks during a build:**
- **Transpilation:** Converting JSX and modern JavaScript/TypeScript into browser-compatible JavaScript (e.g., using Babel or SWC).
- **Bundling:** Combining multiple JavaScript modules into fewer files to reduce HTTP requests (e.g., using tools like Rollup, which Vite uses under the hood, or Webpack).
- **Minification:** Removing unnecessary characters (whitespace, comments) from code to reduce file size.
- **Optimization:** Applying various techniques like code splitting, tree shaking (removing unused code), and image optimization.

In this project, we use **Vite**. Running `npm run build` (or `yarn build`) executes Vite's build process, typically outputting the static files to a `dist` directory.

### Deployment

Deployment is the process of taking these built static assets and making them available on a web server so users can access your application via a URL.

**Common Deployment Approaches for React Apps:**

1.  **Static Hosting Platforms:**
    *   Services like Vercel (from the creators of Next.js), Netlify, GitHub Pages, GitLab Pages, Firebase Hosting.
    *   These platforms are often optimized for front-end applications and offer easy integration with Git repositories, CI/CD, custom domains, and HTTPS.
    *   You typically configure them to watch your repository and automatically build and deploy when changes are pushed.

2.  **Cloud Storage with CDN:**
    *   Hosting static files on services like AWS S3, Google Cloud Storage, or Azure Blob Storage.
    *   Often paired with a Content Delivery Network (CDN) (e.g., AWS CloudFront, Cloudflare) to cache assets geographically closer to users for faster loading.

3.  **Containerization (e.g., Docker):**
    *   Packaging your application (often with a simple web server like Nginx to serve the static files) into a Docker container.
    *   Containers can then be deployed to various platforms: cloud providers (AWS ECS/EKS, Google Kubernetes Engine, Azure Kubernetes Service), or on-premises servers.
    *   Useful for more complex setups or when needing consistent environments.

### Continuous Integration/Continuous Deployment (CI/CD)

CI/CD is a set of practices that automates the build, test, and deployment pipeline.
- **Continuous Integration (CI):** Developers regularly merge their code changes into a central repository, after which automated builds and tests are run.
- **Continuous Deployment (CD):** If the CI stage (builds and tests) passes, the application is automatically deployed to a staging or production environment.

Tools like GitHub Actions, GitLab CI/CD, Jenkins, CircleCI facilitate CI/CD pipelines. For example, a GitHub Action could be configured to run `yarn build` and then deploy the `dist` folder to Netlify on every push to the `main` branch.

### Environment Configurations

It's common to have different environments:
- **Development:** Your local machine, with tools for fast feedback (like Vite's dev server).
- **Staging/Testing:** A production-like environment for testing before releasing to users.
- **Production:** The live environment for end-users.

Environment variables (e.g., API endpoints, feature flags) are often used to configure the application differently for each environment. Vite supports environment variables through `.env` files (e.g., `.env.production`, `.env.development`).

### Monitoring and Rollback

Once deployed, it's important to monitor your application for errors and performance issues using tools like Sentry, New Relic, or Datadog.
If a deployment introduces critical issues, you should have a rollback strategy to quickly revert to a previous stable version. Many deployment platforms and CI/CD tools offer mechanisms for this.

## Presentation Status: Ready for Review 