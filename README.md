# HXCKR WEB

This is the frontend for HXCKR - a modular Learning Management System (LMS) designed to facilitate bitcoin technical education through structured challenges and exercises.

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
