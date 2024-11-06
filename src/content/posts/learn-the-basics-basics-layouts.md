---
author: AA
category:
- Three
cover: https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw2fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: white house under maple trees
description: An intro to layouts, a type of Astro component that is shared between
  pages for common layouts.
pubDate: 2024-01-07 00:00:00
slug: learn-the-basics-basics-layouts
tags:
- astro-build
- CSharp
- Css
title: Layouts 
---

**Layouts** are [Astro components](/en/basics/astro-components/) used to provide a reusable UI structure, such as a page template.


We conventionally use the term “layout” for Astro components that provide common UI elements shared across pages such as headers, navigation bars, and footers. A typical Astro layout component provides [Astro, Markdown or MDX pages](/en/basics/astro-pages/) with:


* a **page shell** (`<html>`, `<head>` and `<body>` tags)
* a [**`<slot />`**](/en/basics/astro-components/#slots) to specify where individual page content should be injected.


But, there is nothing special about a layout component! They can [accept props](/en/basics/astro-components/#component-props) and [import and use other components](/en/basics/astro-components/#component-structure) like any other Astro component. They can include [UI frameworks components](/en/guides/framework-components/) and [client\-side scripts](/en/guides/client-side-scripts/). They do not even have to provide a full page shell, and can instead be used as partial UI templates.


However, if a layout component does contain a page shell, its `<html>` element must be the parent of all other elements in the component. All [`<style>`](/en/guides/styling/#styling-in-astro) or [`<script>`](/en/guides/client-side-scripts/#using-script-in-astro) elements must be enclosed by the `<html>` tags.


Layout components are commonly placed in a `src/layouts` directory in your project for organization, but this is not a requirement; you can choose to place them anywhere in your project. You can even colocate layout components alongside your pages by [prefixing the layout names with `_`](/en/guides/routing/#excluding-pages).


Sample Layout
-------------

[Section titled Sample Layout](#sample-layout)


src/layouts/MySiteLayout.astro


```
---import BaseHead from '../components/BaseHead.astro';import Footer from '../components/Footer.astro';const { title } = Astro.props;---<html lang="en">  <head>    <meta charset="utf-8">    <meta name="viewport" content="width=device-width, initial-scale=1">    <BaseHead title={title}/>  </head>  <body>    <nav>      <a href="#">Home</a>      <a href="#">Posts</a>      <a href="#">Contact</a>    </nav>    <h1>{title}</h1>    <article>      <slot /> <!-- your content is injected here -->    </article>    <Footer />  </body>  <style>    h1 {      font-size: 2rem;    }  </style></html>
```



src/pages/index.astro


```
---import MySiteLayout from '../layouts/MySiteLayout.astro';---<MySiteLayout title="Home Page">  <p>My page content, wrapped in a layout!</p></MySiteLayout>
```



Learn more about [slots](/en/basics/astro-components/#slots).

Using TypeScript with layouts
-----------------------------

[Section titled Using TypeScript with layouts](#using-typescript-with-layouts)
Any Astro layout can be modified to introduce typesafety \& autocompletion by providing the types for your props:




src/components/MyLayout.astro


```
---interface Props {  title: string;  description: string;  publishDate: string;  viewCount: number;}const { title, description, publishDate, viewCount } = Astro.props;---<html lang="en">  <head>    <meta charset="UTF-8">    <meta name="description" content={description}>    <title>{title}</title>  </head>  <body>    <header>      <p>Published on {publishDate}</p>      <p>Viewed by {viewCount} folks</p>    </header>    <main>      <slot />    </main>  </body></html>
```

Markdown Layouts
----------------

[Section titled Markdown Layouts](#markdown-layouts)
Page layouts are especially useful for individual Markdown pages which otherwise would not have any page formatting.


Astro provides a special `layout` frontmatter property to specify which `.astro` component to use as the page layout. By default, this specified component can automatically access data from the Markdown file.




src/pages/page.md


```
---layout: ../layouts/BlogPostLayout.astrotitle: "Hello, World!"author: "Matthew Phillips"date: "09 Aug 2022"---All frontmatter properties are available as props to an Astro layout component.
The `layout` property is the only special one provided by Astro.
You can use it in Markdown files located within `src/pages/`.
```

A typical layout for a Markdown page includes:


1. The `frontmatter` prop to access the Markdown page’s frontmatter and other data.
2. A default [`<slot />`](/en/basics/astro-components/#slots) to indicate where the page’s Markdown content should be rendered.




src/layouts/BlogPostLayout.astro


```
---// 1. The frontmatter prop gives access to frontmatter and other dataconst { frontmatter } = Astro.props;---<html>  <head>    <!-- Add other Head elements here, like styles and meta tags. -->    <title>{frontmatter.title}</title>  </head>  <body>    <!-- Add other UI components here, like common headers and footers. -->    <h1>{frontmatter.title} by {frontmatter.author}</h1>    <!-- 2. Rendered HTML will be passed into the default slot. -->    <slot />    <p>Written on: {frontmatter.date}</p>  </body></html>
```

You can set a layout’s [`Props` type](/en/guides/typescript/#component-props) with the `MarkdownLayoutProps` helper:




src/layouts/BlogPostLayout.astro


```
---import type { MarkdownLayoutProps } from 'astro';
type Props = MarkdownLayoutProps<{  // Define frontmatter props here  title: string;  author: string;  date: string;}>;
// Now, `frontmatter`, `url`, and other Markdown layout properties// are accessible with type safetyconst { frontmatter, url } = Astro.props;---<html>  <head>    <link rel="canonical" href={new URL(url, Astro.site).pathname}>    <title>{frontmatter.title}</title>  </head>  <body>    <h1>{frontmatter.title} by {frontmatter.author}</h1>    <slot />    <p>Written on: {frontmatter.date}</p>  </body></html>
```

### Markdown Layout Props

[Section titled Markdown Layout Props](#markdown-layout-props)
A Markdown layout will have access to the following information via `Astro.props`:


* **`file`** \- The absolute path of this file (e.g. `/home/user/projects/.../file.md`).
* **`url`** \- The URL of the page (e.g. `/en/guides/markdown-content`).
* **`frontmatter`** \- All frontmatter from the Markdown or MDX document.
	+ **`frontmatter.file`** \- The same as the top\-level `file` property.
	+ **`frontmatter.url`** \- The same as the top\-level `url` property.
* **`headings`** \- A list of headings (`h1 -> h6`) in the Markdown or MDX document with associated metadata. This list follows the type: `{ depth: number; slug: string; text: string }[]`.
* **`rawContent()`** \- A function that returns the raw Markdown document as a string.
* **`compiledContent()`** \- A function that returns the Markdown document compiled to an HTML string.


Note

A Markdown layout will have access to all the Markdown file’s [available properties](/en/guides/markdown-content/#available-properties) from `Astro.props` **with two key differences:**

* Heading information (i.e. `h1 -> h6` elements) is available via the `headings` array, rather than a `getHeadings()` function.
* `file` and `url` are *also* available as nested `frontmatter` properties (i.e. `frontmatter.url` and `frontmatter.file`).

### Importing Layouts Manually (MDX)

[Section titled Importing Layouts Manually (MDX)](#importing-layouts-manually-mdx)
You can also use the special Markdown layout property in the frontmatter of MDX files to pass `frontmatter` and `headings` props directly to a specified layout component in the same way.


To pass information to your MDX layout that does not (or cannot) exist in your frontmatter, you can instead import and use a `<Layout />` component. This works like any other Astro component, and will not receive any props automatically. Pass it any necessary props directly:




src/pages/posts/first\-post.mdx


```
---layout: ../../layouts/BaseLayout.astrotitle: 'My first MDX post'publishDate: '21 September 2022'---import BaseLayout from '../../layouts/BaseLayout.astro';
export function fancyJsHelper() {  return "Try doing that with YAML!";}
<BaseLayout title={frontmatter.title} fancyJsHelper={fancyJsHelper}>  Welcome to my new Astro blog, using MDX!</BaseLayout>
```

Then, your values are available to you through `Astro.props` in your layout, and your MDX content will be injected into the page where your `<slot />` component is written:




src/layouts/BaseLayout.astro


```
---const { title, fancyJsHelper } = Astro.props;---<!-- --><h1>{title}</h1><slot /> <!-- your content is injected here --><p>{fancyJsHelper()}</p><!-- -->
```



Learn more about Astro’s Markdown and MDX support in our [Markdown guide](/en/guides/markdown-content/).

Nesting Layouts
---------------

[Section titled Nesting Layouts](#nesting-layouts)
Layout components do not need to contain an entire page worth of HTML. You can break your layouts into smaller components, and combine layout components to create even more flexible, page templates. This pattern is useful when you want to share some code across multiple layouts.


For example, a `BlogPostLayout.astro` layout component could style a post’s title, date and author. Then, a site\-wide `BaseLayout.astro` could handle the rest of your page template, like navigation, footers, SEO meta tags, global styles, and fonts. You can also pass props received from your post to another layout, just like any other nested component.




src/layouts/BlogPostLayout.astro


```
---import BaseLayout from './BaseLayout.astro';const { frontmatter } = Astro.props;---<BaseLayout url={frontmatter.url}>  <h1>{frontmatter.title}</h1>  <h2>Post author: {frontmatter.author}</h2>  <slot /></BaseLayout>
```

Learn