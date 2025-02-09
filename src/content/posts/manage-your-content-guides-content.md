---
author: AA
category:
- One
cover: https://images.unsplash.com/photo-1555883006-0f5a0915a80f?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHwxMHx8YnVpbGRpbmclMjBjb21taWN8ZW58MHwwfDF8fDE3MzA1NTI3NTd8MA&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: view of white metal tower through cherry blossom tree
description: 'Astro is a perfect choice for your content-focused site: blogs, marketing
  sites, portfolios, and more! Author your content directly in your project, or connect
  your CMS of choice.'
pubDate: 2024-01-31 00:00:00
slug: manage-your-content-guides-content
tags:
- astro-build
- Python
- Css
title: Authoring Content 
---

Astro is a perfect choice for your content\-focused site: blogs, marketing sites, portfolios, and more!


Astro helps you author and present your content. You can write a blog post directly in Astro using Markdown/MDX, or fetch your content from a headless CMS. Astro lets you build a site around your content: you can add a layout to your pages, create an index of posts, and set up an RSS feed to allow readers to subscribe.


Writing Content
---------------

[Section titled Writing Content](#writing-content)
In Astro, you can author your content in a variety of ways:


* In Markdown files (`.md` or [alternative extensions](/en/guides/markdown-content/)), designed to make it easy to write rich text content.
* In MDX (`.mdx`) or Markdoc (`.mdoc`) files with [an official integration](/en/guides/integrations-guide/), which can include components and dynamic expressions in your document.
* Using a [third\-party content management system (CMS)](#headless-cms-authoring), then pulling that content into a `.astro` page.
* Other options (less commonly used for content\-heavy pages) include [`.astro` files](/en/basics/astro-pages/#astro-pages) and [`.html` files](/en/basics/astro-pages/#html-pages).


### Markdown Authoring

[Section titled Markdown Authoring](#markdown-authoring)
Markdown is a convenient syntax for writing rich text with basic formatting and common elements like headers, lists, and images. Astro has built\-in support for Markdown files in your project.


Create and write a new `.md` file in your code editor or bring in an existing file written in your favorite Markdown editor. Some online Markdown editors like [StackEdit](https://stackedit.io/) and [Dillinger](https://dillinger.io) will even allow you to edit and sync your work with your Astro repository stored on GitHub.




Learn more about [writing Markdown content in Astro](/en/guides/markdown-content/).

### MDX Authoring

[Section titled MDX Authoring](#mdx-authoring)
If you add the [Astro MDX integration](/en/guides/integrations-guide/mdx/) to your project, you can also write content using `.mdx` files, which can include JavaScript expressions and components within your Markdown. This includes both static [Astro components](/en/basics/astro-components/) and interactive [framework components](/en/guides/framework-components/). This allows you to include UI elements such as a banner or an interactive carousel along with your text content.


Write and edit `.mdx` files directly in your code editor, alongside your project files. MDX files are a [supported page file type](/en/basics/astro-pages/#supported-page-files) in Astro, and may also be used as [content collection entries](#content-collections).




Learn more about [using MDX with Astro](/en/guides/integrations-guide/mdx/).

### Headless CMS Authoring

[Section titled Headless CMS Authoring](#headless-cms-authoring)
Write blog posts in your existing Content Management System (CMS) such as Storyblok, WordPress, or Contentful. Some CMSes, like Storyblok, provide an official [Astro integration](https://www.storyblok.com/mp/announcing-storyblok-astro). Others expose a JavaScript SDK that Astro pages can use to [fetch your remote content](/en/guides/data-fetching/#fetch-from-a-headless-cms).




Explore our collection of [CMS guides](/en/guides/cms/) and [Astro CMS integrations](https://astro.build/integrations/?search=cms) for a wide selection of resources.

Managing content pages
----------------------

[Section titled Managing content pages](#managing-content-pages)
### Page files

[Section titled Page files](#page-files)
Markdown and MDX files that live in your `src/pages` directory will automatically generate pages on your site using Astro’s [file\-based routing](/en/guides/routing/), built at a URL corresponding to the post’s file path.


### Local content

[Section titled Local content](#local-content)
You can also choose to keep your Markdown and MDX files outside of the `src/pages` directory, and instead [import their content](/en/guides/markdown-content/#importing-markdown) into `.astro` pages.


### Content collections

[Section titled Content collections](#content-collections)
Astro’s own [content collections](/en/guides/content-collections/) provide a powerful, type\-safe way to work with Markdown, MDX, or Markdoc content organized in the `src/content/` directory.


### Remote content

[Section titled Remote content](#remote-content)
You can also [fetch markdown remotely](/en/guides/markdown-content/#fetching-remote-markdown) from a source outside of your project. This will require your own Markdown parser, or a community integration (e.g. [`astro-remote`](https://github.com/natemoo-re/astro-remote)).


Showcasing your content
-----------------------

[Section titled Showcasing your content](#showcasing-your-content)
To build common features to organize and display your content, such as a blog archive or a page for each blog tag, Astro allows you to [fetch filenames and metadata](/en/reference/api-reference/#astroglob) from your Markdown and MDX frontmatter or use [content collection helper utilities](/en/guides/content-collections/#querying-collections) to query your entries and generate page content and routes.


To publish to a broader audience, [create an RSS feed](/en/guides/rss/) that can be distributed to feed readers.


Community Integrations
----------------------

[Section titled Community Integrations](#community-integrations)
In addition to the official [`@astrojs/mdx`](/en/guides/integrations-guide/mdx/) and [`@astrojs/markdoc`](/en/guides/integrations-guide/markdoc/) integrations, there are several third\-party [community integrations](https://astro.build/integrations/?search=content) for working with content in your Astro project.


Learn