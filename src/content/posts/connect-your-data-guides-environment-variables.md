---
author: AA
category:
- Three
cover: https://images.unsplash.com/photo-1555883006-0f5a0915a80f?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHwxMHx8YnVpbGRpbmclMjBjb21taWN8ZW58MHwwfDF8fDE3MzA1NTI3NTd8MA&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: view of white metal tower through cherry blossom tree
description: Learn how to use environment variables in an Astro project.
pubDate: 2024-02-10 00:00:00
slug: connect-your-data-guides-environment-variables
tags:
- documentation
- Javascript
- Stylus
title: Using environment variables 
---

Looking for astro:env?

Find out more about the [experimental `astro:env` API](/en/reference/configuration-reference/#experimentalenv) for type\-safe environment variables!


Astro uses Vite’s built\-in support for environment variables, which are statically replaced at build time, and lets you [use any of its methods](https://vite.dev/guide/env-and-mode.html) to work with them.


Note that while *all* environment variables are available in server\-side code, only environment variables prefixed with `PUBLIC_` are available in client\-side code for security purposes.




.env


```
SECRET_PASSWORD=password123PUBLIC_ANYBODY=there
```

In this example, `PUBLIC_ANYBODY` (accessible via `import.meta.env.PUBLIC_ANYBODY`) will be available in server or client code, while `SECRET_PASSWORD` (accessible via `import.meta.env.SECRET_PASSWORD`) will be server\-side only.


Caution

`.env` files are not loaded inside [configuration files](/en/guides/configuring-astro/#environment-variables).


Default environment variables
-----------------------------

[Section titled Default environment variables](#default-environment-variables)
Astro includes a few environment variables out\-of\-the\-box:


* `import.meta.env.MODE`: The mode your site is running in. This is `development` when running `astro dev` and `production` when running `astro build`.
* `import.meta.env.PROD`: `true` if your site is running in production; `false` otherwise.
* `import.meta.env.DEV`: `true` if your site is running in development; `false` otherwise. Always the opposite of `import.meta.env.PROD`.
* `import.meta.env.BASE_URL`: The base url your site is being served from. This is determined by the [`base` config option](/en/reference/configuration-reference/#base).
* `import.meta.env.SITE`: This is set to [the `site` option](/en/reference/configuration-reference/#site) specified in your project’s `astro.config`.
* `import.meta.env.ASSETS_PREFIX`: The prefix for Astro\-generated asset links if the [`build.assetsPrefix` config option](/en/reference/configuration-reference/#buildassetsprefix) is set. This can be used to create asset links not handled by Astro.


Use them like any other environment variable.







```
const isProd = import.meta.env.PROD;const isDev = import.meta.env.DEV;
```

Setting environment variables
-----------------------------

[Section titled Setting environment variables](#setting-environment-variables)
### `.env` files

[Section titled .env files](#env-files)
Environment variables can be loaded from `.env` files in your project directory.


You can also attach a mode (either `production` or `development`) to the filename, like `.env.production` or `.env.development`, which makes the environment variables only take effect in that mode.


Just create a `.env` file in the project directory and add some variables to it.




.env


```
# This will only be available when run on the server!DB_PASSWORD="foobar"# This will be available everywhere!PUBLIC_POKEAPI="https://pokeapi.co/api/v2"
```

For more on `.env` files, [see the Vite documentation](https://vite.dev/guide/env-and-mode.html#env-files).


### Using the CLI

[Section titled Using the CLI](#using-the-cli)
You can also add environment variables as you run your project:





* [npm](#tab-panel-262)
* [pnpm](#tab-panel-263)
* [Yarn](#tab-panel-264)






Terminal window


```
PUBLIC_POKEAPI=https://pokeapi.co/api/v2 npm run dev
```





Terminal window


```
PUBLIC_POKEAPI=https://pokeapi.co/api/v2 pnpm run dev
```





Terminal window


```
PUBLIC_POKEAPI=https://pokeapi.co/api/v2 yarn run dev
```





Getting environment variables
-----------------------------

[Section titled Getting environment variables](#getting-environment-variables)
Environment variables in Astro are accessed with import.meta.env, using the [import.meta feature added in ES2020](https://tc39.es/ecma262/2020/#prod-ImportMeta), instead of process.env.


For example, use `import.meta.env.PUBLIC_POKEAPI` to get the `PUBLIC_POKEAPI` environment variable.







```
// When import.meta.env.SSR === trueconst data = await db(import.meta.env.DB_PASSWORD);
// When import.meta.env.SSR === falseconst data = fetch(`${import.meta.env.PUBLIC_POKEAPI}/pokemon/squirtle`);
```

When using SSR, environment variables can be accessed at runtime based on the SSR adapter being used. With most adapters you can access environment variables with `process.env`, but some adapters work differently. For the Deno adapter, you will use `Deno.env.get()`. See how to [access the Cloudflare runtime](/en/guides/integrations-guide/cloudflare/#cloudflare-runtime) to handle environment variables when using the Cloudflare adapter. Astro will first check the server environment for variables, and if they don’t exist, Astro will look for them in .env files.


IntelliSense for TypeScript
---------------------------

[Section titled IntelliSense for TypeScript](#intellisense-for-typescript)
By default, Astro provides type definition for `import.meta.env` in `astro/client.d.ts`.


While you can define more custom env variables in `.env.[mode]` files, you may want to get TypeScript IntelliSense for user\-defined env variables which are prefixed with `PUBLIC_`.


To achieve this, you can create an `env.d.ts` in `src/` and configure `ImportMetaEnv` like this:




src/env.d.ts


```
interface ImportMetaEnv {  readonly DB_PASSWORD: string;  readonly PUBLIC_POKEAPI: string;  // more env variables...}
interface ImportMeta {  readonly env: ImportMetaEnv;}
```

Learn