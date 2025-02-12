---
author: AA
category:
- Three
cover: https://images.unsplash.com/photo-1472377723522-4768db9c41ce?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: white and brown concrete house near trees at daytime
description: Learn how to create content using Markdown in Astro
pubDate: 2024-02-21 00:00:00
slug: manage-your-content-guides-markdown-content
tags:
- astro-build
- Go
- Css
title: Markdown in Astro 
---

[Markdown](https://daringfireball.net/projects/markdown/) is commonly used to author text\-heavy content like blog posts and documentation. Astro includes built\-in support for Markdown files that can also include [frontmatter YAML](https://dev.to/paulasantamaria/introduction-to-yaml-125f) to define custom properties such as a title, description, and tags.


In Astro, you can author content in [GitHub Flavored Markdown](https://github.github.com/gfm/), then render it in `.astro` components. This combines a familiar writing format designed for content with the flexibility of Astro’s component syntax and architecture.


Tip

For additional functionality, such as including components and JSX expressions in Markdown, add the [`@astrojs/mdx` integration](/en/guides/integrations-guide/mdx/) to write your Markdown content using [MDX](https://mdxjs.com/).


Organizing Markdown files
-------------------------

[Section titled Organizing Markdown files](#organizing-markdown-files)
Your local Markdown files can be kept anywhere within your `src/` directory. Local Markdown can be imported into `.astro` components using an `import` statement for a single file and Vite’s `import.meta.glob()` to query multiple files at once.


If you have groups of related Markdown files, consider [defining them as collections](/en/guides/content-collections/). This gives you several advantages, including the ability to store Markdown files anywhere on your filesystem or remotely.


Collections also allow you to use content\-specfic, optimized API for querying and rendering your content. Collections are intended for sets of data that share the same structure, such as blog posts or product items. When you define that shape in a schema, you additionally get validation, type safety, and Intellisense in your editor.


Dynamic JSX\-like expressions
-----------------------------

[Section titled Dynamic JSX\-like expressions](#dynamic-jsx-like-expressions)
After importing or querying Markdown files, you can write dynamic HTML templates in your `.astro` components that include frontmatter data and body content.




src/posts/great\-post.md


```
---title: 'The greatest post of all time'author: 'Ben'---
Here is my _great_ post!
```



src/pages/my\-posts.astro


```
---import * as greatPost from '../posts/great-post.md';const posts = Object.values(await import.meta.glob('../posts/*.md', { eager: true }));---
<p>{greatPost.frontmatter.title}</p><p>Written by: {greatPost.frontmatter.author}</p>
<p>Post Archive:</p><ul>  {posts.map(post => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}</ul>
```

### Available Properties

[Section titled Available Properties](#available-properties)
#### Querying collections

[Section titled Querying collections](#querying-collections)
When fetching data from your collections via helper functions, your Markdown’s frontmatter properties are available on a `data` object (e.g. `post.data.title`). Additionally, `body` contains the raw, uncompiled body content as a string.




See the full [CollectionEntry type](/en/reference/modules/astro-content/#collectionentry).

#### Importing Markdown

[Section titled Importing Markdown](#importing-markdown)
The following exported properties are available in your `.astro` component when importing Markdown using `import` or `import.meta.glob()`:


* **`file`** \- The absolute file path (e.g. `/home/user/projects/.../file.md`).
* **`url`** \- The URL of the page (e.g. `/en/guides/markdown-content`).
* **`frontmatter`** \- Contains any data specified in the file’s YAML frontmatter.
* **`<Content />`** \- A component that returns the full, rendered contents of the file.
* **`rawContent()`** \- A function that returns the raw Markdown document as a string.
* **`compiledContent()`** \- A function that returns the Markdown document compiled to an HTML string.
* **`getHeadings()`** \- An async function that returns an array of all headings (`<h1>` to `<h6>`) in the file with the type: `{ depth: number; slug: string; text: string }[]`. Each heading’s `slug` corresponds to the generated ID for a given heading and can be used for anchor links.


An example Markdown blog post may pass the following `Astro.props` object:







```
Astro.props = {  file: "/home/user/projects/.../file.md",  url: "/en/guides/markdown-content/",  frontmatter: {    /** Frontmatter from a blog post */    title: "Astro 0.18 Release",    date: "Tuesday, July 27 2021",    author: "Matthew Phillips",    description: "Astro 0.18 is our biggest release since Astro launch.",  },  getHeadings: () => [    {"depth": 1, "text": "Astro 0.18 Release", "slug": "astro-018-release"},    {"depth": 2, "text": "Responsive partial hydration", "slug": "responsive-partial-hydration"}    /* ... */  ],  rawContent: () => "# Astro 0.18 Release\nA little over a month ago, the first public beta [...]",  compiledContent: () => "<h1>Astro 0.18 Release</h1>\n<p>A little over a month ago, the first public beta [...]</p>",}
```

The `<Content />` Component
---------------------------

[Section titled The \&lt;Content /\&gt; Component](#the-content--component)
The `<Content />` component is available by importing `Content` from a Markdown file. This component returns the file’s full body content, rendered to HTML. You can optionally rename `Content` to any component name you prefer.


You can similarly [render the HTML content of a Markdown collection entry](/en/guides/content-collections/#rendering-content-to-html) by rendering a `<Content />` component.




src/pages/content.astro


```
---// Import statementimport {Content as PromoBanner} from '../components/promoBanner.md';
// Collections queryimport { getEntry, render } from 'astro:content';
const product = await getEntry('products', 'shirt');const { Content } = await render();---<h2>Today's promo</h2><PromoBanner />
<p>Sale Ends: {product.data.saleEndDate.toDateString()}</p><Content />
```

Heading IDs
-----------

[Section titled Heading IDs](#heading-ids)
Writing headings in Markdown will automatically give you anchor links so you can link directly to certain sections of your page.




src/pages/page\-1\.md


```
---title: My page of content---## Introduction
I can link internally to [my conclusion](#conclusion) on the same page when writing Markdown.
## Conclusion
I can visit `https://example.com/page-1/#introduction` in a browser to navigate directly to my Introduction.
```

Astro generates heading `id`s based on `github-slugger`. You can find more examples in [the github\-slugger documentation](https://github.com/Flet/github-slugger#usage).


### Heading IDs and plugins

[Section titled Heading IDs and plugins](#heading-ids-and-plugins)
Astro injects an `id` attribute into all heading elements (`<h1>` to `<h6>`) in Markdown and MDX files and provides a `getHeadings()` utility for retrieving these IDs in [Markdown exported properties](#available-properties).


You can customize these heading IDs by adding a rehype plugin that injects `id` attributes (e.g. `rehype-slug`). Your custom IDs, instead of Astro’s defaults, will be reflected in the HTML output and the items returned by `getHeadings()`.


By default, Astro injects `id` attributes after your rehype plugins have run. If one of your custom rehype plugins needs to access the IDs injected by Astro, you can import and use Astro’s `rehypeHeadingIds` plugin directly. Be sure to add `rehypeHeadingIds` before any plugins that rely on it:




astro.config.mjs


```
import { defineConfig } from 'astro/config';import { rehypeHeadingIds } from '@astrojs/markdown-remark';import { otherPluginThatReliesOnHeadingIDs } from 'some/plugin/source';
export default defineConfig({  markdown: {    rehypePlugins: [      rehypeHeadingIds,      otherPluginThatReliesOnHeadingIDs,    ],  },});
```

Markdown Plugins
----------------

[Section titled Markdown Plugins](#markdown-plugins)
Markdown support in Astro is powered by [remark](https://remark.js.org/), a powerful parsing and processing tool with an active ecosystem. Other Markdown parsers like Pandoc and markdown\-it are not currently supported.


Astro applies the [GitHub\-flavored Markdown](https://github.com/remarkjs/remark-gfm) and [SmartyPants](https://github.com/silvenon/remark-smartypants) plugins by default. This brings some niceties like generating clickable links from text, and formatting for [quotations and em\-dashes](https://daringfireball.net/projects/smartypants/).


You can customize how remark parses your Markdown in `astro.config.mjs`. See the full list of [Markdown configuration options](/en/reference/configuration-reference/#markdown-options).


### Adding remark and rehype plugins

[Section titled Adding remark and rehype plugins](#adding-remark-and-rehype-plugins)
Astro supports adding third\-party [remark](https://github.com/remarkjs/remark) and [rehype](https://github.com/rehypejs/rehype) plugins for Markdown. These plugins allow you to extend your Markdown with new capabilities, like [auto\-generating a table of contents](https://github.com/remarkjs/remark-toc), [applying accessible emoji labels](https://github.com/florianeckerstorfer/remark-a11y-emoji), and [styling your Markdown](/en/guides/styling/#markdown-styling).


We encourage you to browse [awesome\-remark](https://github.com/remarkjs/awesome-remark) and [awesome\-rehype](https://github.com/rehypejs/awesome-rehype) for popular plugins! See each plugin’s own README for specific installation instructions.


This example applies [`remark-toc`](https://github.com/remarkjs/remark-toc) and [`rehype-accessible-emojis`](https://www.npmjs.com/package/rehype-accessible-emojis) to Markdown files:




astro.config.mjs


```
import { defineConfig } from 'astro/config';import remarkToc from 'remark-toc';import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
export default defineConfig({  markdown: {    remarkPlugins: [ [remarkToc, { heading: 'toc', maxDepth: 3 } ] ],    rehypePlugins: [rehypeAccessibleEmojis],  },});
```

### Customizing a plugin

[Section titled Customizing a plugin](#customizing-a-plugin)
In order to customize a plugin, provide an options object after it in a nested array.


The example below adds the [heading option to the `remarkToc` plugin](https://github.com/remarkjs/remark-toc#options) to change where the table of contents is placed, and the [`behavior` option to the `rehype-autolink-headings` plugin](https://github.com/rehypejs/rehype-autolink-headings#options) in order to add the anchor tag after the headline text.




astro.config.mjs


```
import remarkToc from 'remark-toc';import rehypeSlug from 'rehype-slug';import rehypeAutolinkHeadings from 'rehype-autolink-headings';
export default {  markdown: {    remarkPlugins: [ [remarkToc, { heading: "contents"} ] ],    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]],  },}
```

### Modifying frontmatter programmatically

[Section titled Modifying frontmatter programmatically](#modifying-frontmatter-programmatically)
You can add frontmatter properties to all of your Markdown and MDX files by using a [remark or rehype plugin](#markdown-plugins).


1. Append a `customProperty` to the `data.astro.frontmatter` property from your plugin’s `file` argument:




example\-remark\-plugin.mjs


```
export function exampleRemarkPlugin() {  // All remark and rehype plugins return a separate function  return function (tree, file) {    file.data.astro.frontmatter.customProperty = 'Generated property';  }}
```

Tip


**Added in:**
`astro@2.0.0`
`data.astro.frontmatter` contains all properties from a given Markdown or MDX document. This allows you to modify existing frontmatter properties, or compute new properties from this existing frontmatter.
2. Apply this plugin to your `markdown` or `mdx` integration config:




astro.config.mjs


```
import { defineConfig } from 'astro/config';import { exampleRemarkPlugin } from './example-remark-plugin.mjs';
export default defineConfig({  markdown: {    remarkPlugins: [exampleRemarkPlugin]  },});
```

or




astro.config.mjs


```
import { defineConfig } from 'astro/config';import { exampleRemarkPlugin } from './example-remark-plugin.mjs';
export default defineConfig({  integrations: [    mdx({      remarkPlugins: [exampleRemarkPlugin],    }),  ],});
```


Now, every Markdown or MDX file will have `customProperty` in its frontmatter, making it available when [importing your markdown](#importing-markdown) and from [the `Astro.props.frontmatter` property in your layouts](#frontmatter-layout-property).





**Related recipe:**
[Add reading time](/en/recipes/reading-time/) 


### Extending Markdown config from MDX

[Section titled Extending Markdown config from MDX](#extending-markdown-config-from-mdx)
Astro’s MDX integration will extend [your project’s existing Markdown configuration](/en/reference/configuration-reference/#markdown-options) by default. To override individual options, you can specify their equivalent in your MDX configuration.


The following example disables GitHub\-Flavored Markdown and applies a different set of remark plugins for MDX files:




astro.config.mjs


```
import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';
export default defineConfig({  markdown: {    syntaxHighlight: 'prism',    remarkPlugins: [remarkPlugin1],    gfm: true,  },  integrations: [    mdx({      // `syntaxHighlight` inherited from Markdown
      // Markdown `remarkPlugins` ignored,      // only `remarkPlugin2` applied.      remarkPlugins: [remarkPlugin2],      // `gfm` overridden to `false`      gfm: false,    })  ]});
```

To avoid extending your Markdown config from MDX, set [the `extendMarkdownConfig` option](/en/guides/integrations-guide/mdx/#extendmarkdownconfig) (enabled by default) to `false`:




astro.config.mjs


```
import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';
export default defineConfig({  markdown: {    remarkPlugins: [remarkPlugin],  },  integrations: [    mdx({      // Markdown config now ignored      extendMarkdownConfig: false,      // No `remarkPlugins` applied    })  ]});
```

Syntax Highlighting
-------------------

[Section titled Syntax Highlighting](#syntax-highlighting)
Astro comes with built\-in support for [Shiki](https://shiki.style/) and [Prism](https://prismjs.com/). This provides syntax highlighting for:


* all code fences (\`\`\`) used in a Markdown or MDX file.
* content within the [built\-in `<Code />` component](/en/reference/components-reference/#code-) (powered by Shiki).
* content within the [`<Prism />` component](/en/reference/components-reference/#prism-) (powered by Prism).


Shiki is enabled by default, preconfigured with the `github-dark` theme. The compiled output will be limited to inline `style`s without any extraneous CSS classes, stylesheets, or client\-side JS.


### Shiki configuration

[Section titled Shiki configuration](#shiki-configuration)
Shiki is our default syntax highlighter. You can configure all options via the `shikiConfig` object like so:




astro.config.mjs


```
import { defineConfig } from 'astro/config';
export default defineConfig({  markdown: {    shikiConfig: {      // Choose from Shiki's built-in themes (or add your own)      // https://shiki.style/themes      theme: 'dracula',      // Alternatively, provide multiple themes      // See note below for using dual light/dark themes      themes: {        light: 'github-light',        dark: 'github-dark',      },      // Disable the default colors      // https://shiki.style/guide/dual-themes#without-default-color      // (Added in v4.12.0)      defaultColor: false,      // Add custom languages      // Note: Shiki has countless langs built-in, including .astro!      // https://shiki.style/languages      langs: [],      // Add custom aliases for languages      // Map an alias to a Shiki language ID: https://shiki.style/languages#bundled-languages      // https://shiki.style/guide/load-lang#custom-language-aliases      langAlias: {        cjs: "javascript"      },      // Enable word wrap to prevent horizontal scrolling      wrap: true,      // Add custom transformers: https://shiki.style/guide/transformers      // Find common transformers: https://shiki.style/packages/transformers      transformers: [],    },  },});
```

Customizing Shiki themes

Astro code blocks are styled using the `.astro-code` class. When following Shiki’s documentation (e.g. to [customize light/dark dual or multiple themes](https://shiki.style/guide/dual-themes#query-based-dark-mode)), be sure to replace the `.shiki` class in the examples with `.astro-code`.


#### Adding your own theme

[Section titled Adding your own theme](#adding-your-own-theme)
Instead of using one of Shiki’s predefined themes, you can import a custom theme from a local file.




astro.config.mjs


```
import { defineConfig } from 'astro/config';import customTheme from './my-shiki-theme.json';
export default defineConfig({  markdown: {    shikiConfig: { theme: customTheme },  },});
```

We also suggest reading [Shiki’s own theme documentation](https://shiki.style/themes) to explore more about themes, light vs dark mode toggles, or styling via CSS variables.


### Default Syntax Highlighter

[Section titled Default Syntax Highlighter](#default-syntax-highlighter)
If you’d like to switch to `'prism'` by default, or disable syntax highlighting entirely, you can use the `markdown.syntaxHighlighting` config object:




astro.config.mjs


```
import { defineConfig } from 'astro/config';
export default defineConfig({  markdown: {    // Can be 'shiki' (default), 'prism' or false to disable highlighting    syntaxHighlight: 'prism',  },});
```

#### Prism configuration

[Section titled Prism configuration](#prism-configuration)
If you opt to use Prism, Astro will apply Prism’s CSS classes instead. Note that **you need to bring your own CSS stylesheet** for syntax highlighting to appear!


1. Choose a premade stylesheet from the available [Prism Themes](https://github.com/PrismJS/prism-themes).
2. Add this stylesheet to [your project’s `public/` directory](/en/basics/project-structure/#public).
3. Load this into your page’s `<head>` in a [layout component](/en/basics/layouts/) via a `<link>` tag. (See [Prism basic usage](https://prismjs.com/#basic-usage).)


You can also visit the [list of languages supported by Prism](https://prismjs.com/#supported-languages) for options and usage.


Fetching Remote Markdown
------------------------

[Section titled Fetching Remote Markdown](#fetching-remote-markdown)
**Astro does not include built\-in support for remote Markdown outside of [experimental content collections](/en/reference/configuration-reference/#experimentalcontentlayer)!**


To fetch remote Markdown directly and render it to HTML, you will need to install and configure your own Markdown parser from NPM. This **will not** inherit from any of Astro’s built\-in Markdown settings that you have configured.


Be sure that you understand these limitations before implementing this in your project, and consider fetching your remote Markdown using a content collections loader instead.




src/pages/remote\-example.astro


```
---// Example: Fetch Markdown from a remote API// and render it to HTML, at runtime.// Using "marked" (https://github.com/markedjs/marked)import { marked } from 'marked';const response = await fetch('https://raw.githubusercontent.com/wiki/adam-p/markdown-here/Markdown-Cheatsheet.md');const markdown = await response.text();const content = marked.parse(markdown);---<article set:html={content} />
```

Individual Markdown pages
-------------------------

[Section titled Individual Markdown pages](#individual-markdown-pages)
Tip

[Content collections](/en/guides/content-collections/) and [importing Markdown into `.astro` components](#dynamic-jsx-like-expressions) provide more features for rendering your Markdown and are the recommended way to handle most of your content. However, there may be times when you want the convenience of just adding a file to `src/pages/` and having a simple page automatically created for you.


Astro treats [any supported file inside of the `/src/pages/` directory](/en/basics/astro-pages/#supported-page-files) as a page, including `.md` and other Markdown file types.


Placing a file in this directory, or any sub\-directory, will automatically build a page route using the pathname of the file and display the Markdown content rendered to HTML.




src/pages/page\-1\.md


```
---title: Hello, World---
# Hi there!
This Markdown file creates a page at `your-domain.com/page-1/`
It probably isn't styled much, but Markdown does support:- **bold** and _italics._- lists- [links](https://astro.build)- <p>HTML elements</p>- and more!
```

### Frontmatter `layout` property

[Section titled Frontmatter layout property](#frontmatter-layout-property)
To help with the limited functionality of Markdown pages, Astro provides a special frontmatter `layout` property which is a relative path to an Astro [Markdown layout component](/en/basics/layouts/#markdown-layouts). If your Markdown file is located within `src/pages/`, create a layout component and add it in this layout property to provide a page shell around your Markdown content.




src/pages/posts/post\-1\.md


```
---layout: ../../layouts/BlogPostLayout.astrotitle: Astro in briefauthor: Himanshudescription: Find out what makes Astro awesome!---This is a post written in Markdown.
```

This layout component is a regular Astro component with [specific properties automatically available](/en/basics/layouts/#markdown-layout-props) through `Astro.props` for your Astro template. For example, you can access your Markdown file’s frontmatter properties through `Astro.props.frontmatter`:




src/layouts/BlogPostLayout.astro


```
---const {frontmatter} = Astro.props;---<html>  <!-- ... -->  <h1>{frontmatter.title}</h1>  <h2>Post author: {frontmatter.author}</h2>  <p>{frontmatter.description}</p>  <slot /> <!-- Markdown content is injected here -->  <!-- ... --></html>
```

You can also [style your Markdown](/en/guides/styling/#markdown-styling) in your layout component.




Learn more about [Markdown Layouts](/en/basics/layouts/#markdown-layouts).

Learn