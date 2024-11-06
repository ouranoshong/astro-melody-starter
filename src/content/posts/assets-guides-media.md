---
author: AA
category:
- Three
cover: https://images.unsplash.com/photo-1463130456064-77fda7f96d6b?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHwzfHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: white concrete building wall
description: How to use a Digital Asset Manager (DAM) to add images and videos to
  Astro
pubDate: 2024-02-03 00:00:00
slug: assets-guides-media
tags:
- astro-build
- Python
- Sass
title: Use a DAM with Astro 
---

**Ready to connect a headless Digital Asset Manager (DAM) to your Astro project?** Follow one of our guides to integrate a hosted media system.


Tip

Find [community\-maintained integrations](https://astro.build/integrations/) for connecting a DAM or hosted media system to your project in our integrations directory.


Hosted Media Guides
-------------------

[Section titled Hosted Media Guides](#hosted-media-guides)
Note that many of these pages are **stubs**: they’re collections of resources waiting for your contribution!




* 


### [Cloudinary](/en/guides/media/cloudinary/)




Why use a DAM or hosted media?
------------------------------

[Section titled Why use a DAM or hosted media?](#why-use-a-dam-or-hosted-media)
Using a DAM, or Digital Asset Manager, helps individuals, teams, and organizations manage their image and video assets from a central location much like a [CMS](/en/guides/cms/).


The difference is the type of content being managed: a DAM would primarily manage images, videos, other media assets like 3D models, and any metadata associated with those assets.


This can be useful particularly when using a single source of truth for your assets between multiple web or mobile properties. This is important if you’re part of an organization that requires multiple teams to use the same assets, or are integrating into other content systems like a PIM (Product Information Manager) to connect your assets to products.


Which hosted media systems or DAMs work well with Astro?
--------------------------------------------------------

[Section titled Which hosted media systems or DAMs work well with Astro?](#which-hosted-media-systems-or-dams-work-well-with-astro)
Much like when using a CMS, as Astro handles the *presentation* of your content, you’ll want to use a headless DAM that allows you to fetch and interact with your assets via an API or SDK.


Some headless DAMs, like Cloudinary, provide an Astro [integration](/en/guides/integrations-guide/) that allows you to easily fetch your assets as well as display them on your website or app.


Can I use Astro without a hosted media system or DAM?
-----------------------------------------------------

[Section titled Can I use Astro without a hosted media system or DAM?](#can-i-use-astro-without-a-hosted-media-system-or-dam)
Yes! Astro provides built\-in ways to [store images](/en/guides/images/#where-to-store-images), including support for referencing remote images.


Recipes