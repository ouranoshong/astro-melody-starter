---
author: AA
category:
- Two
cover: https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw3fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: low angle photography of gray building at daytime
description: Some tips and tricks for converting your site to Astro.
pubDate: 2024-02-27 00:00:00
slug: welcome-world-guides-migrate-to-astro
tags:
- astro-build
- CSharp
- Stylus
title: Migrate an existing project to Astro 
---

**Ready to convert your site to Astro?** See one of our guides for migration tips.


Migration Guides
----------------

[Section titled Migration Guides](#migration-guides)


* 


### [Create React App](/en/guides/migrate-to-astro/from-create-react-app/)
* 


### [Docusaurus](/en/guides/migrate-to-astro/from-docusaurus/)
* 


### [Eleventy](/en/guides/migrate-to-astro/from-eleventy/)
* 


### [Gatsby](/en/guides/migrate-to-astro/from-gatsby/)
* 


### [GitBook](/en/guides/migrate-to-astro/from-gitbook/)
* 


### [Gridsome](/en/guides/migrate-to-astro/from-gridsome/)
* 


### [Hugo](/en/guides/migrate-to-astro/from-hugo/)
* 


### [Jekyll](/en/guides/migrate-to-astro/from-jekyll/)
* 


### [Next.js](/en/guides/migrate-to-astro/from-nextjs/)
* 


### [NuxtJS](/en/guides/migrate-to-astro/from-nuxtjs/)
* 


### [Pelican](/en/guides/migrate-to-astro/from-pelican/)
* 


### [SvelteKit](/en/guides/migrate-to-astro/from-sveltekit/)
* 


### [VuePress](/en/guides/migrate-to-astro/from-vuepress/)
* 


### [WordPress](/en/guides/migrate-to-astro/from-wordpress/)




Note that many of these pages are **stubs**: they’re collections of resources waiting for your contribution!


Why migrate your site to Astro?
-------------------------------

[Section titled Why migrate your site to Astro?](#why-migrate-your-site-to-astro)
Astro provides many benefits: performance, simplicity, and many of the features you want built right into the framework. When you do need to extend your site, Astro provides several [official and 3rd\-party community integrations](https://astro.build/integrations).


Migrating may be less work than you think!


Depending on your existing project, you may be able to use your existing:


* [UI framework components](/en/guides/framework-components/) directly in Astro.
* [CSS stylesheets or libraries](/en/guides/styling/) including Tailwind.
* [Markdown/MDX files](/en/guides/markdown-content/), configured using your existing [remark and rehype plugins](/en/guides/markdown-content/#markdown-plugins).
* [Content from a CMS](/en/guides/cms/) through an integration or API.


Which projects can I convert to Astro?
--------------------------------------

[Section titled Which projects can I convert to Astro?](#which-projects-can-i-convert-to-astro)
[Many existing sites can be built with Astro](/en/concepts/why-astro/). Astro is ideally suited for your existing content\-based sites like blogs, landing pages, marketing sites and portfolios. Astro integrates with several popular headless CMSs, and allows you to connect eCommerce shop carts.


Astro allows you to choose between a statically\-generated site and [server\-side rendering (SSR)](/en/guides/server-side-rendering/), making it a great replacement for SSGs or for sites that need to fetch some page data on the fly.


How will my project design change?
----------------------------------

[Section titled How will my project design change?](#how-will-my-project-design-change)
Depending on your existing project, you may need to think differently about:


* Designing in [Astro Islands](/en/concepts/islands/#what-is-an-island) to avoid sending unnecessary JavaScript to the browser.
* Providing client\-side interactivity with [client\-side `<script>` tags](/en/guides/client-side-scripts/) or [UI framework components](/en/guides/framework-components/).
* Managing [shared state](/en/recipes/sharing-state-islands/) with Nano Stores or local storage instead of app\-wide hooks or wrappers.


Recipes