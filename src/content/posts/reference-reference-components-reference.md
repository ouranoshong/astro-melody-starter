---
author: AA
category:
- Two
cover: https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHwyfHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: worm's-eye view photography of concrete building
description: ''
pubDate: 2024-01-23 00:00:00
slug: reference-reference-components-reference
tags:
- docs
- Javascript
- Css
title: Built-in Components Reference 
---

Astro includes several built\-in components for you to use in your projects. All built\-in components are available in `.astro` files and may require an import statement.


You can reference the `Props` of these components using the [`ComponentProps` type](/en/guides/typescript/#componentprops-type) utility.


`<Code />`
----------

[Section titled \&lt;Code /\&gt;](#code-)





```
---import { Code } from 'astro:components';---<!-- Syntax highlight some JavaScript code. --><Code code={`const foo = 'bar';`} lang="js" /><!-- Optional: Customize your theme. --><Code code={`const foo = 'bar';`} lang="js" theme="dark-plus" /><!-- Optional: Enable word wrapping. --><Code code={`const foo = 'bar';`} lang="js" wrap /><!-- Optional: Output inline code. --><p>  <Code code={`const foo = 'bar';`} lang="js" inline />  will be rendered inline.</p><!-- Optional: defaultColor --><Code code={`const foo = 'bar';`} lang="js" defaultColor={false} />
```

This component provides syntax highlighting for code blocks at build time (no client\-side JavaScript included). The component is powered internally by Shiki and it supports all popular [themes](https://shiki.style/themes) and [languages](https://shiki.style/languages). Plus, you can add your custom themes, languages, [transformers](#transformers), and [default colors](https://shiki.style/guide/dual-themes#without-default-color) by passing them to the `theme`, `lang`, `transformers`, and `defaultColor` attributes respectively.


Note

This component **does not** inherit the settings from your [Shiki configuration](/en/guides/markdown-content/#shiki-configuration). You will have to set them using the component props.


### Transformers

[Section titled Transformers](#transformers)

**Added in:**
`astro@4.11.0`



[Shiki transformers](https://shiki.style/packages/transformers#shikijs-transformers) can optionally be applied to code by passing them in through the `transformers` property as an array. Since Astro v4\.14\.0, you can also provide a string for [Shiki’s `meta` attribute](https://shiki.style/guide/transformers#meta) to pass options to transformers.


Note that `transformers` only applies classes and you must provide your own CSS rules to target the elements of your code block.




src/pages/index.astro


```
---import { transformerNotationFocus, transformerMetaHighlight } from '@shikijs/transformers'import { Code } from 'astro:components'const code = `const foo = 'hello'const bar = ' world'console.log(foo + bar) // [!code focus]`---<Code  code={code}  lang="js"  transformers={[transformerMetaHighlight()]}  meta="{1,3}"/>
<style is:global>  pre.has-focused .line:not(.focused) {    filter: blur(1px);  }</style>
```

`<Fragment />`
--------------

[Section titled \&lt;Fragment /\&gt;](#fragment-)
A component used with [`set:*` directives](/en/reference/directives-reference/#sethtml) to render HTML content without any additional wrapping elements:




src/components/SetHtml.astro


```
---const htmlString = '<p>Raw HTML content</p>';---<Fragment set:html={htmlString} />
```

See more about [using fragments](/en/basics/astro-syntax/#fragments) in Astro syntax.


`<Prism />`
-----------

[Section titled \&lt;Prism /\&gt;](#prism-)
To use the `Prism` highlighter component, first **install** the `@astrojs/prism` package:





* [npm](#tab-panel-614)
* [pnpm](#tab-panel-615)
* [Yarn](#tab-panel-616)






Terminal window


```
npm install @astrojs/prism
```





Terminal window


```
pnpm add @astrojs/prism
```





Terminal window


```
yarn add @astrojs/prism
```










```
---import { Prism } from '@astrojs/prism';---<Prism lang="js" code={`const foo = 'bar';`} />
```

This component provides language\-specific syntax highlighting for code blocks by applying Prism’s CSS classes. Note that **you need to provide a Prism CSS stylesheet** (or bring your own) for syntax highlighting to appear! See the [Prism configuration section](/en/guides/markdown-content/#prism-configuration) for more details.


See the [list of languages supported by Prism](https://prismjs.com/#supported-languages) where you can find a language’s corresponding alias. And, you can also display your Astro code blocks with `lang="astro"`.


`<Debug />`
-----------

[Section titled \&lt;Debug /\&gt;](#debug-)





```
---import { Debug } from 'astro:components';const serverObject = {  a: 0,  b: "string",  c: {    nested: "object"  }}---<Debug {serverObject} />
```

This component provides a way to inspect values on the client\-side, without any JavaScript.


Reference