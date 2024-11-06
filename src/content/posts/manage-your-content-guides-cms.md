---
author: AA
category:
- One
cover: https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw4fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: blue boats parked on river between multicolored buildings at sunset
description: How to use a CMS to add content to Astro
pubDate: 2024-01-19 00:00:00
slug: manage-your-content-guides-cms
tags:
- astro
- Go
- Stylus
title: Use a CMS with Astro 
---

**Ready to connect a Headless CMS to your Astro project?** Follow one of our guides to integrate a CMS.


Tip

Find [community\-maintained integrations](https://astro.build/integrations/?search=cms) for connecting a CMS to your project in our integrations directory.


CMS Guides
----------

[Section titled CMS Guides](#cms-guides)
Note that many of these pages are **stubs**: they’re collections of resources waiting for your contribution!




* 


### [Apostrophe](/en/guides/cms/apostrophecms/)
* 


### [Builder.io](/en/guides/cms/builderio/)
* 


### [ButterCMS](/en/guides/cms/buttercms/)
* 


### [Caisy](/en/guides/cms/caisy/)
* 


### [CloudCannon](/en/guides/cms/cloudcannon/)
* 


### [Contentful](/en/guides/cms/contentful/)
* 


### [Cosmic](/en/guides/cms/cosmic/)
* 


### [Craft CMS](/en/guides/cms/craft-cms/)
* 


### [Crystallize](/en/guides/cms/crystallize/)
* 


### [DatoCMS](/en/guides/cms/datocms/)
* 


### [Decap CMS](/en/guides/cms/decap-cms/)
* 


### [Directus](/en/guides/cms/directus/)
* 


### [Drupal](/en/guides/cms/drupal/)
* 


### [Front Matter CMS](/en/guides/cms/frontmatter-cms/)
* 


### [Ghost](/en/guides/cms/ghost/)
* 


### [Hashnode](/en/guides/cms/hashnode/)
* 


### [Hygraph](/en/guides/cms/hygraph/)
* 


### [Keystatic](/en/guides/cms/keystatic/)
* 


### [KeystoneJS](/en/guides/cms/keystonejs/)
* 


### [Kontent.ai](/en/guides/cms/kontent-ai/)
* 


### [microCMS](/en/guides/cms/microcms/)
* 


### [Payload CMS](/en/guides/cms/payload/)
* 


### [Prepr CMS](/en/guides/cms/preprcms/)
* 


### [Prismic](/en/guides/cms/prismic/)
* 


### [Sanity](/en/guides/cms/sanity/)
* 


### [Sitecore XM](/en/guides/cms/sitecore/)
* 


### [Spinal](/en/guides/cms/spinal/)
* 


### [Statamic](/en/guides/cms/statamic/)
* 


### [Storyblok](/en/guides/cms/storyblok/)
* 


### [Strapi](/en/guides/cms/strapi/)
* 


### [Tina CMS](/en/guides/cms/tina-cms/)
* 


### [Umbraco](/en/guides/cms/umbraco/)
* 


### [WordPress](/en/guides/cms/wordpress/)




Why use a CMS?
--------------

[Section titled Why use a CMS?](#why-use-a-cms)
A Content Management System lets you write content and manage assets outside of your Astro project.


This unlocks new features for working with content. Most CMSes give you a visual content editor, the ability to specify standard types of content, and a way to collaborate with others.


A CMS can be useful for content that follows a particular structure, often giving you a dashboard\-like experience and WYSIWYG editing tools. You might use a CMS to write blog posts using a CMS’s rich text editor instead of Markdown files. Or you might use a CMS to maintain product listings for an eCommerce shop, making certain fields required to avoid incomplete listings.


Your Astro project can then fetch your content from your CMS and display it, wherever and however you want on your site.


Which CMSes work well with Astro?
---------------------------------

[Section titled Which CMSes work well with Astro?](#which-cmses-work-well-with-astro)
Because Astro takes care of the *presentation* of your content, you’ll want to choose a *headless* CMS, like those in the list above. This means that the CMS helps you write your content, but doesn’t generate a site that displays it. Instead, you fetch the content data and use in your Astro project.


Some headless CMSes, like Storyblok, provide an Astro [integration](/en/guides/integrations-guide/) that helps fetch the content specifically for an Astro site. Others provide a JavaScript SDK, a library that you install and use to fetch your remote content.




 Explore a [list of over 100 headless content management systems](https://jamstack.org/headless-cms/) External where you can filter by type (e.g. Git\-based, API driven) and license (open\-source or closed\-source).

Can I use Astro without a CMS?
------------------------------

[Section titled Can I use Astro without a CMS?](#can-i-use-astro-without-a-cms)
Yes! Astro provides built\-in support for [Markdown](/en/guides/markdown-content/).


Recipes