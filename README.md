[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Testing

We're using [Jest's Snapshot Testing](https://jestjs.io/docs/en/snapshot-testing) for our components.

### Adding a Component

We are creating React components from the [Gov UK Frontend components](https://design-system.service.gov.uk/components/).

To add a new component:

- Create a test file in `test/components`
- Create an empty component in `src/components`
  - Copy the HTML from the Gov UK Design System Website into the component
  - Resolve any HTML to TSX conversion issues e.g. `class -> className`
  - Decide the properties you want to make configurable e.g. `phase` in `PhaseBanner`
  - Extract to props object
- Check the component renders properly
- Take a snapshot of the component by running the tests

### Updating Snapshots

To update all snapshots, run: `npm run test:update-all`

To update a specific snapshot, run: `npm run test:update [INSERT TEST NAME PATTERN HERE]`

For example: `npm run test:update Header`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
