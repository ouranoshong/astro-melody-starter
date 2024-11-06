---
author: AA
category:
- One
cover: https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHwyfHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: worm's-eye view photography of concrete building
description: Learn how to use Astro's built-in TypeScript support.
pubDate: 2024-01-03 00:00:00
slug: reference-guides-typescript
tags:
- documentation
- PHP
- Css
title: TypeScript 
---

Astro ships with built\-in support for [TypeScript](https://www.typescriptlang.org/). You can import `.ts` and `.tsx` files in your Astro project, write TypeScript code directly inside your [Astro component](/en/basics/astro-components/#the-component-script), and even use an [`astro.config.ts`](/en/guides/configuring-astro/#the-astro-config-file) file if you like.


Using TypeScript, you can prevent errors at runtime by defining the shapes of objects and components in your code. For example, if you use TypeScript to [type your component’s props](#component-props), you’ll get an error in your editor if you set a prop that your component doesn’t accept.


You don’t need to write TypeScript code in your Astro projects to benefit from it. Astro always treats your component code as TypeScript, and the [Astro VSCode Extension](/en/editor-setup/) will infer as much as it can to provide autocompletion, hints, and errors in your editor.


The Astro dev server won’t perform any type checking, but you can use a [separate script](#type-checking) to check for type errors from the command line.


Setup
-----

[Section titled Setup](#setup)
Astro starter projects include a `tsconfig.json` file in your project. Even if you don’t write TypeScript code, this file is important so that tools like Astro and VS Code know how to understand your project. Some features (like npm package imports) aren’t fully supported in the editor without a `tsconfig.json` file. If you install Astro manually, be sure to create this file yourself.


### TypeScript templates

[Section titled TypeScript templates](#typescript-templates)
Three extensible `tsconfig.json` templates are included in Astro: `base`, `strict`, and `strictest`. The `base` template enables support for modern JavaScript features and is also used as a basis for the other templates. We recommend using `strict` or `strictest` if you plan to write TypeScript in your project. You can view and compare the three template configurations at [astro/tsconfigs/](https://github.com/withastro/astro/blob/main/packages/astro/tsconfigs/).


To inherit from one of the templates, use [the `extends` setting](https://www.typescriptlang.org/tsconfig#extends):




tsconfig.json


```
{  "extends": "astro/tsconfigs/base"}
```

Additionally, our templates include an `env.d.ts` file inside the `src` folder to provide [Vite’s client types](https://vite.dev/guide/features.html#client-types) to your project:




env.d.ts


```
/// <reference path="../.astro/types.d.ts" />
```

### TypeScript editor plugin

[Section titled TypeScript editor plugin](#typescript-editor-plugin)
The [Astro TypeScript plugin](https://www.npmjs.com/package/@astrojs/ts-plugin) can be installed separately when you are not using the [official Astro VS Code extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode). This plugin is automatically installed and configured by the VSCode extension, and you do not need to install both.


This plugin runs only in the editor. When running `tsc` in the terminal, `.astro` files are ignored entirely. Instead, you can use [the `astro check` CLI command](/en/reference/cli-reference/#astro-check) to check both `.astro` and `.ts` files.
This plugin also supports importing `.astro` files from `.ts` files (which can be useful for re\-exporting).





* [npm](#tab-panel-495)
* [pnpm](#tab-panel-496)
* [Yarn](#tab-panel-497)






Terminal window


```
npm install @astrojs/ts-plugin
```





Terminal window


```
pnpm add @astrojs/ts-plugin
```





Terminal window


```
yarn add @astrojs/ts-plugin
```





Then, add the following to your `tsconfig.json`:




tsconfig.json


```
  "compilerOptions": {    "plugins": [      {        "name": "@astrojs/ts-plugin"      },    ],  }
```

To check that the plugin is working, create a `.ts` file and import an Astro component into it. You should have no warning messages from your editor.


### UI Frameworks

[Section titled UI Frameworks](#ui-frameworks)
If your project uses a [UI framework](/en/guides/framework-components/), additional settings depending on the framework might be needed. Please see your framework’s TypeScript documentation for more information. ([Vue](https://vuejs.org/guide/typescript/overview.html#using-vue-with-typescript), [React](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup), [Preact](https://preactjs.com/guide/v10/typescript), [Solid](https://www.solidjs.com/guides/typescript))


Type Imports
------------

[Section titled Type Imports](#type-imports)
Use explicit type imports and exports whenever possible.







```
import { SomeType } from './script';import type { SomeType } from './script';
```

This way, you avoid edge cases where Astro’s bundler may try to incorrectly bundle your imported types as if they were JavaScript.


You can configure TypeScript to enforce type imports in your `tsconfig.json` file. Set [`verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax) to `true`. TypeScript will check your imports and tell you when `import type` should be used. This setting is enabled by default in all our presets.




tsconfig.json


```
  {    "compilerOptions": {      "verbatimModuleSyntax": true    }  }
```

Import Aliases
--------------

[Section titled Import Aliases](#import-aliases)
Astro supports [import aliases](/en/guides/imports/#aliases) that you define in your `tsconfig.json` `paths` configuration. [Read our guide](/en/guides/imports/#aliases) to learn more.




src/pages/about/nate.astro


```
---import HelloWorld from '@components/HelloWorld.astro';import Layout from '@layouts/Layout.astro';---
```



tsconfig.json


```
{  "compilerOptions": {    "baseUrl": ".",    "paths": {      "@components/*": ["src/components/*"],      "@layouts/*": ["src/layouts/*"]    }  }}
```

Extending `window` and `globalThis`
-----------------------------------

[Section titled Extending window and globalThis](#extending-window-and-globalthis)
You may want to add a property to the global object. You can do this by adding top\-level declarations using the `declare` keyword to your `env.d.ts` file:




env.d.ts


```
declare var myString: string;declare function myFunction(): boolean;
```

This will provide typing to `globalThis.myString` and `globalThis.myFunction`, as well as `window.myString` and `window.myFunction`.


Note that `window` is only available in client\-side code. `globalThis` is available both server\-side and client\-side, but its server\-side value won’t be shared with the client.


If you only want to type a property on the `window` object, provide a `Window` interface instead:




env.d.ts


```
interface Window {  myFunction(): boolean;}
```

Component Props
---------------

[Section titled Component Props](#component-props)
Astro supports typing your component props via TypeScript. To enable, add a TypeScript `Props` interface to your component frontmatter. An `export` statement may be used, but is not necessary. The [Astro VSCode Extension](/en/editor-setup/) will automatically look for the `Props` interface and give you proper TS support when you use that component inside another template.




src/components/HelloProps.astro


```
---interface Props {  name: string;  greeting?: string;}const { greeting = 'Hello', name } = Astro.props;---<h2>{greeting}, {name}!</h2>
```

### Common prop type patterns

[Section titled Common prop type patterns](#common-prop-type-patterns)
* If your component takes no props or slotted content, you can use `type Props = Record<string, never>`.
* If your component must be passed children to its default slot, you can enforce this by using `type Props = { children: any; };`.


Type Utilities
--------------

[Section titled Type Utilities](#type-utilities)

**Added in:**
`astro@1.6.0`



Astro comes with some built\-in utility types for common prop type patterns. These are available under the `astro/types` entrypoint.


### Built\-in HTML attributes

[Section titled Built\-in HTML attributes](#built-in-html-attributes)
Astro provides the `HTMLAttributes` type to check that your markup is using valid HTML attributes. You can use these types to help build component props.


For example, if you were building a `<Link>` component, you could do the following to mirror the default HTML attributes for `<a>` tags in your component’s prop types.




src/components/Link.astro


```
---import type { HTMLAttributes } from 'astro/types';// use a `type`type Props = HTMLAttributes<'a'>;// or extend with an `interface`interface Props extends HTMLAttributes<'a'> {  myProp?: boolean;}const { href, ...attrs } = Astro.props;---<a href={href} {...attrs}>  <slot /></a>
```

It is also possible to extend the default JSX definitions to add non\-standard attributes by redeclaring the `astroHTML.JSX` namespace in a `.d.ts` file.




src/custom\-attributes.d.ts


```
declare namespace astroHTML.JSX {  interface HTMLAttributes {    'data-count'?: number;    'data-label'?: string;  }
  // Add a CSS custom property to the style object  interface CSSProperties {    '--theme-color'?: 'black' | 'white';  }}
```

Note

`astroHTML` is injected globally inside `.astro` components. To use it in TypeScript files, use a [triple\-slash directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html):






```
/// <reference types="astro/astro-jsx" />
type MyAttributes = astroHTML.JSX.ImgHTMLAttributes;
```

### `ComponentProps` type

[Section titled ComponentProps type](#componentprops-type)

**Added in:**
`astro@4.3.0`



This type export allows you to reference the `Props` accepted by another component, even if that component doesn’t export that `Props` type directly.


The following example shows using the `ComponentProps` utility from `astro/types` to reference a `<Button />` component’s `Props` types:




src/pages/index.astro


```
---import type { ComponentProps } from 'astro/types';
import Button from "./Button.astro";
type ButtonProps = ComponentProps<typeof Button>;---
```

### Polymorphic type

[Section titled Polymorphic type](#polymorphic-type)

**Added in:**
`astro@2.5.0`



Astro includes a helper to make it easier to build components that can render as different HTML elements with full type safety. This is useful for components like `<Link>` that can render as either `<a>` or `<button>` depending on the props passed to it.


The example below implements a fully\-typed, polymorphic component that can render as any HTML element. The [`HTMLTag`](#built-in-html-attributes) type is used to ensure that the `as` prop is a valid HTML element.







```
---import type { HTMLTag, Polymorphic } from 'astro/types';
type Props<Tag extends HTMLTag> = Polymorphic<{ as: Tag }>;
const { as: Tag, ...props } = Astro.props;---
<Tag {...props} />
```

### Infer `getStaticPaths()` types

[Section titled Infer getStaticPaths() types](#infer-getstaticpaths-types)

**Added in:**
`astro@2.1.0`



Astro includes helpers for working with the types returned by your [`getStaticPaths()`](/en/reference/api-reference/#getstaticpaths) function for dynamic routes.


You can get the type of [`Astro.params`](/en/reference/api-reference/#astroparams) with `InferGetStaticParamsType` and the type of [`Astro.props`](/en/reference/api-reference/#astroprops) with `InferGetStaticPropsType`:




src/pages/posts/\[...slug].astro


```
---import type { InferGetStaticParamsType, InferGetStaticPropsType, GetStaticPaths } from 'astro';
export const getStaticPaths = (async () => {  const posts = await getCollection('blog');  return posts.map((post) => {    return {      params: { slug: post.slug },      props: { draft: post.data.draft, title: post.data.title },    };  });}) satisfies GetStaticPaths;
type Params = InferGetStaticParamsType<typeof getStaticPaths>;type Props = InferGetStaticPropsType<typeof getStaticPaths>;
const { slug } = Astro.params as Params;//                      ^? { slug: string; }const { title } = Astro.props;//                      ^? { draft: boolean; title: string; }---
```

Type checking
-------------

[Section titled Type checking](#type-checking)
To see type errors in your editor, please make sure that you have the [Astro VS Code extension](/en/editor-setup/) installed. Please note that the `astro start` and `astro build` commands will transpile the code with esbuild, but will not run any type checking. To prevent your code from building if it contains TypeScript errors, change your “build” script in `package.json` to the following:




package.json


```
  "scripts": {    "build": "astro build",    "build": "astro check && astro build",  },
```

Note

`astro check` checks all the files included in your TypeScript project. To check types within Svelte and Vue files, you can use the [`svelte-check`](https://www.npmjs.com/package/svelte-check) and the [`vue-tsc`](https://www.npmjs.com/package/vue-tsc) packages respectively.




Read more about [`.ts` file imports](/en/guides/imports/#typescript) in Astro.



Read more about [TypeScript Configuration](https://www.typescriptlang.org/tsconfig/).

Troubleshooting
---------------

[Section titled Troubleshooting](#troubleshooting)
### Errors typing multiple JSX frameworks at the same time

[Section titled Errors typing multiple JSX frameworks at the same time](#errors-typing-multiple-jsx-frameworks-at-the-same-time)
An issue may arise when using multiple JSX frameworks in the same project, as each framework requires different, sometimes conflicting, settings inside `tsconfig.json`.


**Solution**: Set the [`jsxImportSource` setting](https://www.typescriptlang.org/tsconfig#jsxImportSource) to `react` (default), `preact` or `solid-js` depending on your most\-used framework. Then, use a [pragma comment](https://www.typescriptlang.org/docs/handbook/jsx.html#configuring-jsx) inside any conflicting file from a different framework.


For the default setting of `jsxImportSource: react`, you would use:







```
// For Preact/** @jsxImportSource preact */
// For Solid/** @jsxImportSource solid-js */
```

Learn