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

## Directory structure

We separate the frontend in to three building blocks:

1.  **Components**.  The individual components, most likely derived from the [GOV.UK Design System](https://design-system.service.gov.uk/components/).
2.  **Pages**.  A page or view as it is displayed to the user, comprising several components.
3.  **Functions**.  The logical functionality used by components and pages, most likely expressed in vanilla TypeScript.

```
├── node_modules
|   └── ...
├── public
│   └── assets 
├── src
│   ├── components // Components go here
│   ├── lib // Functions go here
│   ├── pages // Pages go here
│   └── styles
└── test
    ├── components
    ├── lib 
    └── pages
```
