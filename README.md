# HXCKR WEB

This is the frontend for HXCKR - a modular Learning Management System (LMS) designed to facilitate bitcoin technical education through structured challenges and exercises.

## Getting Started

We use GitHub Oauth as the primary authentication method. So you will need to [create a Github Oauth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app).

Fisrt, copy the `.env.sample` into a `.env` file

```bash
cp .env.sample .env
```

Next, copy the GitHub client ID and the secret and replace the values of the environment variables in the `env.sample` file.
You can optionally generate a random secret and replace the value of the `NEXTAUTH_SECRET` in the env file.

```bash
openssl rand -hex 32
```

Next, install the dependencies `npm install` and run the code.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

