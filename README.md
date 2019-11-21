# Ultimate Typescript Monorepo

Nicely organize you're backend, frontend, and shared packages.

## Getting Started

🚨 *Warning*: This requies NodeJS 12 with the [--experimental-modules](https://github.com/jkrems/proposal-pkg-exports) flag.

```shell
git clone https://github.com/sparebytes/ultimate-typescript-monorepo.git
cd ultimate-typescript-monorepo
yarn install
yarn dev
```

## Structure

```
projects/
├── api/
│   ├── main/
│   │   ├── dist/
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── .../
└── shared/
    ├── models/
    │   ├── dist/
    │   ├── src/
    │   ├── package.json
    │   └── tsconfig.json
    └── .../
```
