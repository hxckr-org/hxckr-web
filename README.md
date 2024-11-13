# Jede WEB

This is the frontend for Jede - a modular Learning Management System (LMS) designed to facilitate bitcoin technical education through structured challenges and exercises.

## Getting Started

We use GitHub Oauth as the primary authentication method. So you will need to [create a Github Oauth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app).

First, copy the `.env.sample` into a `.env` file

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

## Using Storybook

This project uses Storybook for developing and showcasing UI components in isolation. To use Storybook:

1. Make sure you've installed all dependencies:

```bash
npm install
```

2. Run Storybook:

```bash
npm run storybook
```

3. Open [http://localhost:6006](http://localhost:6006) in your browser to view the Storybook interface.

### Creating New Stories

To create a new story for a component:

1. Create a new file in the same directory as your component with the naming convention `[ComponentName].stories.tsx`.
2. Use the following template, replacing `[ComponentName]` with your actual component name:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import [ComponentName] from './[ComponentName]';

const meta: Meta<typeof [ComponentName]> = {
  title: 'Components/[ComponentName]',
  component: [ComponentName],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof [ComponentName]>;

export const Default: Story = {
  args: {},
};
```

3. Customize the `args` object in the `Default` story to pass props to your component as needed.

4. Run Storybook to see your new story in action.

Using Storybook allows for rapid UI development and testing, independent of the backend implementation.

## Docker Deployment

This project includes Docker support for easy deployment on any VPS (Virtual Private Server) or cloud platform.

1. Build the Docker image:

```bash
docker build -f Dockerfile -t hxckr-web .
```

2. Run the container:

```bash
docker run -p 3000:3000 hxckr-web
```

The app will be available at `http://your-server-ip:3000`.

### Environment Variables

When deploying with Docker, make sure to set up your environment variables. You can do this by:

1. Creating a `.env` file as described in the Getting Started section
2. Passing environment variables when running the container:

```bash
docker run -p 3000:3000 \
  -e GITHUB_ID=your_github_id \
  -e GITHUB_SECRET=your_github_secret \
  -e NEXTAUTH_SECRET=your_nextauth_secret \
  -e NEXTAUTH_URL=http://your-domain.com \
  -e NEXT_PUBLIC_APP_CORE_BASE_URL=http://your-core-api-url \
  -e NEXT_PUBLIC_APP_WEBSOCKET_URL=ws://your-websocket-url \
  hxckr-web
```

This Docker setup enables easy deployment on any VPS, providing a consistent environment across different hosting platforms.
