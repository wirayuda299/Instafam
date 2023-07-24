# Contributing to Instafam

Welcome to Instafam! We appreciate your interest in contributing to our open-source project. By contributing, you can help us improve the project and make it better for the community.

Before you get started, please take a moment to read through the following guidelines to ensure a smooth and effective collaboration.

## Ways to Contribute

There are several ways you can contribute to the project:

1. **Reporting Issues**: If you find a bug or have a feature request, please [open an issue] on GitHub. Make sure to provide as much detail as possible for better understanding.
2. **Code Contributions**: We welcome code contributions! If you'd like to fix a bug or add new feature please follow development process

## Development Process

If you plan to contribute code, follow these steps to get started:

1. Fork the repository to your GitHub account.

2. Clone your forked repository to your local machine.

```bash
git clone https://github.com/wirayuda299/Instafam

cd instafam

create .env file containing these key
X_RapidAPI_KEY= nsfw-images-detection api key
X_RapidAPI_HOST=nsfw-images-detection api host
NEXTAUTH_SECRET=secret
GOOGLE_CLIENT_ID= goggle client id
GOOGLE_CLIENT_SECRET=google clent secret
NEXTAUTH_URL=http://localhost:3000
FIREBASE_API_KEY=firebase api key
FIREBASE_AUTH_DOMAIN=firebase auth domain
FIREBASE_PROJECT_ID=firebase project id
FIREBASE_STORAGE_BUCKET=firebase storage bucket
FIREBASE_MESSAGING_SENDER_ID=firebase messaging sender id
FIREBASE_APP_ID=1firebase app id

-and then run npm run dev in your terminal

-make any changes you want and run git add . and then git commit -m "your commit message"
-run git push

-Make new PR on github
-and wait for approval

```
