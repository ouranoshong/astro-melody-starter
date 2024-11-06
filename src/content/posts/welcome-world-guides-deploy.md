---
author: AA
category:
- Three
cover: https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw2fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: white house under maple trees
description: How to deploy your Astro site to the web.
pubDate: 2024-02-16 00:00:00
slug: welcome-world-guides-deploy
tags:
- guide
- CSharp
- Sass
title: Deploy your Astro Site 
---

**Ready to build and deploy your Astro site?** Follow one of our guides to different deployment services or scroll down for general guidance about deploying an Astro site.


Deployment Guides
-----------------

[Section titled Deployment Guides](#deployment-guides)

* 


### [Netlify](/en/guides/deploy/netlify/)



SSRStatic
* 


### [Vercel](/en/guides/deploy/vercel/)



SSRStatic
* 


### [Deno Deploy](/en/guides/deploy/deno/)



SSR
* 


### [GitHub Pages](/en/guides/deploy/github/)



Static
* 


### [GitLab Pages](/en/guides/deploy/gitlab/)



Static
* 


### [Cloudflare Pages](/en/guides/deploy/cloudflare/)



SSRStatic
* 


### [AWS](/en/guides/deploy/aws/)



Static
* 


### [AWS via Flightcontrol](/en/guides/deploy/flightcontrol/)



SSRStatic
* 


### [AWS via SST](/en/guides/deploy/sst/)



SSRStatic
* 


### [Clever Cloud](/en/guides/deploy/clever-cloud/)



SSRStatic
* 


### [Azion](/en/guides/deploy/azion/)



SSRStatic
* 


### [Google Cloud](/en/guides/deploy/google-cloud/)



SSRStatic
* 


### [Firebase Hosting](/en/guides/deploy/google-firebase/)



SSRStatic
* 


### [Heroku](/en/guides/deploy/heroku/)



Static
* 


### [Microsoft Azure](/en/guides/deploy/microsoft-azure/)



Static
* 


### [Buddy](/en/guides/deploy/buddy/)



Static
* 


### [Edgio](/en/guides/deploy/edgio/)



SSRStatic
* 


### [Fleek](/en/guides/deploy/fleek/)



Static
* 


### [Fly.io](/en/guides/deploy/flyio/)



SSRStatic
* 


### [Render](/en/guides/deploy/render/)



Static
* 


### [Stormkit](/en/guides/deploy/stormkit/)



Static
* 


### [Surge](/en/guides/deploy/surge/)



Static
* 


### [Cleavr](/en/guides/deploy/cleavr/)



SSRStatic
* 


### [Kinsta](/en/guides/deploy/kinsta/)



SSRStatic
* 


### [Zeabur](/en/guides/deploy/zeabur/)



SSRStatic
* 


### [Zerops](/en/guides/deploy/zerops/)



SSRStatic



Quick Deploy Options
--------------------

[Section titled Quick Deploy Options](#quick-deploy-options)
You can build and deploy an Astro site to a number of hosts quickly using either their website’s dashboard UI or a CLI.


### Website UI

[Section titled Website UI](#website-ui)
A quick way to deploy your website is to connect your Astro project’s online Git repository (e.g. GitHub, GitLab, Bitbucket) to a host provider and take advantage of continuous deployment using Git.


These host platforms automatically detect pushes to your Astro project’s source repository, build your site and deploy it to the web at a custom URL or your personal domain. Often, setting up a deployment on these platforms will follow steps something like the following:


1. Add your repository to an online Git provider (e.g. in GitHub, GitLab, Bitbucket)
2. Choose a host that supports **continuous deployment** (e.g. [Netlify](/en/guides/deploy/netlify/) or [Vercel](/en/guides/deploy/vercel/)) and import your Git repository as a new site/project.


Many common hosts will recognize your project as an Astro site, and should choose the appropriate configuration settings to build and deploy your site as shown below. (If not, these settings can be changed.)


Deploy settings


	* **Build Command:** `astro build` or `npm run build`
	* **Publish directory:** `dist`
3. Click “Deploy” and your new website will be created at a unique URL for that host (e.g. `new-astro-site.netlify.app`).


The host will be automatically configured to watch your Git provider’s main branch for changes, and to rebuild and republish your site at each new commit. These settings can typically be configured in your host provider’s dashboard UI.


### CLI Deployment

[Section titled CLI Deployment](#cli-deployment)
Some hosts will have their own command line interface (CLI) you can install globally to your machine using npm. Often, using a CLI to deploy looks something like the following:


1. Install your host’s CLI globally, for example:






	* [npm](#tab-panel-227)
	* [pnpm](#tab-panel-228)
	* [Yarn](#tab-panel-229)




Terminal window


```
npm install --global netlify-cli
```





Terminal window


```
pnpm add --global netlify-cli
```





Terminal window


```
yarn global add netlify-cli
```
2. Run the CLI and follow any instructions for authorization, setup etc.
3. Build your site and deploy to your host


Many common hosts will build and deploy your site for you. They will usually recognize your project as an Astro site, and should choose the appropriate configuration settings to build and deploy as shown below. (If not, these settings can be changed.)


Deploy settings


	* **Build Command:** `astro build` or `npm run build`
	* **Publish directory:** `dist`
Other hosts will require you to [build your site locally](#building-your-site-locally) and deploy using the command line.


Building Your Site Locally
--------------------------

[Section titled Building Your Site Locally](#building-your-site-locally)
Many hosts like Netlify and Vercel will build your site for you and then publish that build output to the web. But, some sites will require you to build locally and then run a deploy command or upload your build output.


You may also wish to build locally to preview your site, or to catch any potential errors and warnings in your own environment.


Run the command `npm run build` to build your Astro site.




* [npm](#tab-panel-230)
* [pnpm](#tab-panel-231)
* [Yarn](#tab-panel-232)






Terminal window


```
npm run build
```





Terminal window


```
pnpm run build
```





Terminal window


```
yarn run build
```




By default, the build output will be placed at `dist/`. This location can be changed using the [`outDir` configuration option](/en/reference/configuration-reference/#outdir).


Adding an Adapter for SSR
-------------------------

[Section titled Adding an Adapter for SSR](#adding-an-adapter-for-ssr)
Note

Before deploying your Astro site with [SSR (server\-side rendering)](/en/guides/server-side-rendering/) enabled, make sure you have:

* Installed the [appropriate adapter](/en/guides/server-side-rendering/) to your project dependencies (either manually, or using the adapter’s `astro add` command, e.g. `npx astro add netlify`).
* [Added the adapter](/en/reference/configuration-reference/#integrations) to your `astro.config.mjs` file’s import and default export when installing manually. (The `astro add` command will take care of this step for you!)

Recipes