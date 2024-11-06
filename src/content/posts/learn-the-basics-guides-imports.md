---
author: AA
category:
- Two
cover: https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw3fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: low angle photography of gray building at daytime
description: Learn how to import different content types with Astro.
pubDate: 2024-01-08 00:00:00
slug: learn-the-basics-guides-imports
tags:
- astro
- Go
- Stylus
title: Imports 
---

Astro supports most static assets with zero configuration required. You can use the `import` statement anywhere in your project JavaScript (including your Astro frontmatter) and Astro will include a built, optimized copy of that static asset in your final build. `@import` is also supported inside of CSS \& `<style>` tags.


Supported File Types
--------------------

[Section titled Supported File Types](#supported-file-types)
The following file types are supported out\-of\-the\-box by Astro:


* Astro Components (`.astro`)
* Markdown (`.md`, `.markdown`, etc.)
* JavaScript (`.js`, `.mjs`)
* TypeScript (`.ts`)
* NPM Packages
* JSON (`.json`)
* CSS (`.css`)
* CSS Modules (`.module.css`)
* Images \& Assets (`.svg`, `.jpg`, `.png`, etc.)


Additionally, you can extend Astro to add support for different [UI Frameworks](/en/guides/framework-components/) like React, Svelte and Vue components. You can also install the [Astro MDX integration](/en/guides/integrations-guide/mdx/) and use `.mdx` files in your project.


### Files in `public/`

[Section titled Files in public/](#files-in-public)
You can place any static asset in the [`public/` directory](/en/basics/project-structure/#public) of your project, and Astro will copy it directly into your final build untouched. `public/` files are not built or bundled by Astro, which means that any type of file is supported. You can reference a `public/` file by a URL path directly in your HTML templates.


Import statements
-----------------

[Section titled Import statements](#import-statements)
Astro uses ESM, the same [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#syntax) and [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) syntax supported in the browser.


### JavaScript

[Section titled JavaScript](#javascript)





```
import { getUser } from './user.js';
```

JavaScript can be imported using normal ESM `import` \& `export` syntax.


Importing JSX files

An appropriate [UI framework](/en/guides/framework-components/) ([React](/en/guides/integrations-guide/react/), [Preact](/en/guides/integrations-guide/preact/), or [Solid](/en/guides/integrations-guide/solid-js/)) is required to render JSX/TSX files.
Use `.jsx`/`.tsx` extensions where appropriate, as Astro does not support JSX in `.js`/`.ts` files.


### TypeScript

[Section titled TypeScript](#typescript)





```
import { getUser } from './user';import type { UserType } from './user';
```

Astro includes built\-in support for [TypeScript](https://www.typescriptlang.org/). You can import `.ts` and `.tsx` files directly in your Astro project, and even write TypeScript code directly inside your [Astro component script](/en/basics/astro-components/#the-component-script) and any [hoisted script tags](/en/guides/client-side-scripts/).


**Astro doesn’t perform any type checking itself.** Type checking should be taken care of outside of Astro, either by your IDE or through a separate script. For type checking Astro files, the [`astro check` command](/en/reference/cli-reference/#astro-check) is provided.


TypeScript and file extensions

Per [TypeScript’s module resolution rules](https://www.typescriptlang.org/docs/handbook/module-resolution.html), `.ts` and `.tsx` file extensions should not be used when importing TypeScript files. Instead, either use `.js`/`.jsx` file extensions or completely omit the file extension.






```
import { getUser } from './user.js'; // user.tsimport MyComponent from "./MyComponent"; // MyComponent.tsx
```



Read more about [TypeScript support in Astro](/en/guides/typescript/).

### NPM Packages

[Section titled NPM Packages](#npm-packages)
If you’ve installed an NPM package, you can import it in Astro.







```
---import { Icon } from 'astro-icon';---
```

If a package was published using a legacy format, Astro will try to convert the package to ESM so that `import` statements work. In some cases, you may need to adjust your [`vite` config](/en/reference/configuration-reference/#vite) for it to work.


Caution

Some packages rely on a browser environment. Astro components runs on the server, so importing these packages in the frontmatter may [lead to errors](/en/guides/troubleshooting/#document-or-window-is-not-defined).


### JSON

[Section titled JSON](#json)





```
// Load the JSON object via the default exportimport json from './data.json';
```

Astro supports importing JSON files directly into your application. Imported files return the full JSON object in the default import.


### CSS

[Section titled CSS](#css)





```
// Load and inject 'style.css' onto the pageimport './style.css';
```

Astro supports importing CSS files directly into your application. Imported styles expose no exports, but importing one will automatically add those styles to the page. This works for all CSS files by default, and can support compile\-to\-CSS languages like Sass \& Less via plugins.




Read more about advanced CSS import use cases such as a direct URL reference for a CSS file, or importing CSS as a string in the [Styling guide](/en/guides/styling/#advanced).

### CSS Modules

[Section titled CSS Modules](#css-modules)





```
// 1. Converts './style.module.css' classnames to unique, scoped values.// 2. Returns an object mapping the original classnames to their final, scoped value.import styles from './style.module.css';
// This example uses JSX, but you can use CSS Modules with any framework.return <div className={styles.error}>Your Error Message</div>;
```

Astro supports CSS Modules using the `[name].module.css` naming convention. Like any CSS file, importing one will automatically apply that CSS to the page. However, CSS Modules export a special default `styles` object that maps your original classnames to unique identifiers.


CSS Modules help you enforce component scoping \& isolation on the frontend with uniquely\-generated class names for your stylesheets.


### Other Assets

[Section titled Other Assets](#other-assets)





```
import imgReference from './image.png'; // imgReference === '/src/image.png'import svgReference from './image.svg'; // svgReference === '/src/image.svg'import txtReference from './words.txt'; // txtReference === '/src/words.txt'
// This example uses JSX, but you can use import references with any framework.<img src={imgReference.src} alt="image description" />;
```

All other assets not explicitly mentioned above can be imported via ESM `import` and will return a URL reference to the final built asset. This can be useful for referencing non\-JS assets by URL, like creating an image element with a `src` attribute pointing to that image.


It can also be useful to place images in the `public/` folder as explained on the [project\-structure page](/en/basics/project-structure/#public).




Read more about appending Vite import parameters (e.g. `?url`, `?raw`) in [Vite’s static asset handling guide](https://vite.dev/guide/assets.html).

Note

Adding **alt text** to `<img>` tags is encouraged for accessibility! Don’t forget to add an `alt="a helpful description"` attribute to your image elements. You can just leave the attribute empty if the image is purely decorative.


Aliases
-------

[Section titled Aliases](#aliases)
An **alias** is a way to create shortcuts for your imports.


Aliases can help improve the development experience in codebases with many directories or relative imports.




src/pages/about/company.astro


```
---import Button from '../../components/controls/Button.astro';import logoUrl from '../../assets/logo.png?url';---
```

In this example, a developer would need to understand the tree relationship between `src/pages/about/company.astro`, `src/components/controls/Button.astro`, and `src/assets/logo.png`. And then, if the `company.astro` file were to be moved, these imports would also need to be updated.


You can add import aliases in `tsconfig.json`.




tsconfig.json


```
{  "compilerOptions": {    "baseUrl": ".",    "paths": {      "@components/*": ["src/components/*"],      "@assets/*": ["src/assets/*"]    }  }}
```

Note

Make sure `compilerOptions.baseUrl` is set so the aliased paths can be resolved.


The development server will automatically restart after this configuration change. You can now import using the aliases anywhere in your project:




src/pages/about/company.astro


```
---import Button from '@components/controls/Button.astro';import logoUrl from '@assets/logo.png?url';---
```

These aliases are also integrated automatically into [VS Code](https://code.visualstudio.com/docs/languages/jsconfig) and other editors.


`Astro.glob()`
--------------

[Section titled Astro.glob()](#astroglob)
[`Astro.glob()`](/en/reference/api-reference/#astroglob) is a way to import many files at once.


`Astro.glob()` only takes one parameter: a relative [glob pattern](/en/guides/imports/#glob-patterns) matching the local files you’d like to import. It’s asynchronous, and returns an array of each matching file’s exports.




src/components/my\-component.astro


```
---// imports all files that end with `.md` in `./src/pages/post/`const posts = await Astro.glob('../pages/post/*.md');---<!-- Renders an <article> for the first 5 blog posts --><div>{posts.slice(0, 4).map((post) => (  <article>    <h2>{post.frontmatter.title}</h2>    <p>{post.frontmatter.description}</p>    <a href={post.url}>Read more</a>  </article>))}</div>
```

Astro components imported using `Astro.glob` are of type [`AstroInstance`](/en/reference/api-reference/#astro-files). You can render each component instance using its `default` property:




src/pages/component\-library.astro


```
---// imports all files that end with `.astro` in `./src/components/`const components = await Astro.glob('../components/*.astro');---<!-- Display all of our components -->{components.map((component) => (  <div>    <component.default size={24} />  </div>))}
```

### Glob Patterns

[Section titled Glob Patterns](#glob-patterns)
A glob pattern is a file path that supports special wildcard characters. This is used to reference multiple files in your project at once.


For example, the glob pattern `./pages/**/*.{md,mdx}` starts within the pages subdirectory, looks through all of its subdirectories (`/**`), and matches any filename (`/*`) that ends in either `.md` or `.mdx` (`.{md,mdx}`).


#### Glob Patterns in Astro

[Section titled Glob Patterns in Astro](#glob-patterns-in-astro)
To use with `Astro.glob()`, the glob pattern must be a string literal and cannot contain any variables. See [the troubleshooting guide](/en/guides/troubleshooting/#astroglob---no-matches-found) for a workaround.


Additionally, glob patterns must begin with one of the following:


* `./` (to start in the current directory)
* `../` (to start in the parent directory)
* `/` (to start at the root of the project)


[Read more about the glob pattern syntax](https://github.com/mrmlnc/fast-glob#pattern-syntax).


#### `Astro.glob()` vs `getCollection()`

[Section titled Astro.glob() vs getCollection()](#astroglob-vs-getcollection)
[Content collections](/en/guides/content-collections/) provide a [`getCollection()` API](/en/reference/modules/astro-content/#getcollection) for loading multiple files instead of `Astro.glob()`. If your content files (e.g. Markdown, MDX, Markdoc) are located in collections within the `src/content/` directory, use `getCollection()` to [query a collection](/en/guides/content-collections/#querying-collections) and return content entries.


WASM
----

[Section titled WASM](#wasm)





```
// Loads and initializes the requested WASM fileconst wasm = await WebAssembly.instantiateStreaming(fetch('/example.wasm'));
```

Astro supports loading WASM files directly into your application using the browser’s [`WebAssembly`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly) API.


Node Builtins
-------------

[Section titled Node Builtins](#node-builtins)
We encourage Astro users to avoid Node.js builtins (`fs`, `path`, etc.) whenever possible. Astro is compatible with multiple runtimes using [adapters](/en/guides/server-side-rendering/). This includes [Deno](https://github.com/denoland/deno-astro-adapter) and [Cloudflare Workers](/en/guides/integrations-guide/cloudflare/) which do not support Node builtin modules such as `fs`.


Our aim is to provide Astro alternatives to common Node.js builtins. However, no such alternatives exist today. So, if you *really* need to use these builtin modules we don’t want to stop you. Astro supports Node.js builtins using Node’s newer `node:` prefix. If you want to read a file, for example, you can do so like this:




src/components/MyComponent.astro


```
---// Example: import the "fs/promises" builtin from Node.jsimport fs from 'node:fs/promises';
const url = new URL('../../package.json', import.meta.url);const json = await fs.readFile(url, 'utf-8');const data = JSON.parse(json);---
<span>Version: {data.version}</span>
```

Extending file type support
---------------------------

[Section titled Extending file type support](#extending-file-type-support)
With **Vite** and compatible **Rollup** plugins, you can import file types which aren’t natively supported by Astro. Learn where to find the plugins you need in the [Finding Plugins](https://vite.dev/guide/using-plugins.html#finding-plugins) section of the Vite Documentation.


Plugin configuration

Refer to your plugin’s documentation for configuration options, and how to correctly install it.





**Related recipe:**
[Installing a Vite or Rollup plugin](/en/recipes/add-yaml-support/) 


Learn