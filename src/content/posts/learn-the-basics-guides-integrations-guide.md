---
author: AA
category:
- One
cover: https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw2fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: white house under maple trees
description: ''
pubDate: 2024-01-27 00:00:00
slug: learn-the-basics-guides-integrations-guide
tags:
- astro
- CSharp
- Css
title: Add Integrations 
---

**Astro integrations** add new functionality and behaviors for your project with only a few lines of code. You can use an official integration, [integrations built by the community](#finding-more-integrations) or even [build a custom integration yourself](#building-your-own-integration).


Integrations can…


* Unlock React, Vue, Svelte, Solid, and other popular UI frameworks with a [renderer](/en/guides/framework-components/).
* Enable on\-demand rendering with an [SSR adapter](/en/guides/server-side-rendering/).
* Integrate tools like Tailwind, and Partytown with a few lines of code.
* Add new features to your project, like automatic sitemap generation.
* Write custom code that hooks into the build process, dev server, and more.


Integrations directory

Browse or search the complete set of hundreds of official and community integrations in our [integrations directory](https://astro.build/integrations/). Find packages to add to your Astro project for authentication, analytics, performance, SEO, accessibility, UI, developer tools, and more.


Official Integrations
---------------------

[Section titled Official Integrations](#official-integrations)
The following integrations are maintained by Astro.


### UI Frameworks



* 


### [@astrojs/alpinejs](/en/guides/integrations-guide/alpinejs/)
* 


### [@astrojs/lit](/en/guides/integrations-guide/lit/)
* 


### [@astrojs/preact](/en/guides/integrations-guide/preact/)
* 


### [@astrojs/react](/en/guides/integrations-guide/react/)
* 


### [@astrojs/solid⁠\-⁠js](/en/guides/integrations-guide/solid-js/)
* 


### [@astrojs/svelte](/en/guides/integrations-guide/svelte/)
* 


### [@astrojs/vue](/en/guides/integrations-guide/vue/)



### SSR Adapters



* 


### [@astrojs/cloudflare](/en/guides/integrations-guide/cloudflare/)
* 


### [@astrojs/netlify](/en/guides/integrations-guide/netlify/)
* 


### [@astrojs/node](/en/guides/integrations-guide/node/)
* 


### [@astrojs/vercel](/en/guides/integrations-guide/vercel/)



### Other integrations



* 


### [@astrojs/db](/en/guides/integrations-guide/db/)
* 


### [@astrojs/markdoc](/en/guides/integrations-guide/markdoc/)
* 


### [@astrojs/mdx](/en/guides/integrations-guide/mdx/)
* 


### [@astrojs/partytown](/en/guides/integrations-guide/partytown/)
* 


### [@astrojs/sitemap](/en/guides/integrations-guide/sitemap/)
* 


### [@astrojs/tailwind](/en/guides/integrations-guide/tailwind/)



Automatic Integration Setup
---------------------------

[Section titled Automatic Integration Setup](#automatic-integration-setup)
Astro includes an `astro add` command to automate the setup of official integrations. Several community plugins can also be added using this command. Please check each integration’s own documentation to see whether `astro add` is supported, or whether you must [install manually](#manual-installation).


Run the `astro add` command using the package manager of your choice and our automatic integration wizard will update your configuration file and install any necessary dependencies.





* [npm](#tab-panel-268)
* [pnpm](#tab-panel-269)
* [Yarn](#tab-panel-270)






Terminal window


```
npx astro add react
```





Terminal window


```
pnpm astro add react
```





Terminal window


```
yarn astro add react
```





It’s even possible to add multiple integrations at the same time!




* [npm](#tab-panel-271)
* [pnpm](#tab-panel-272)
* [Yarn](#tab-panel-273)






Terminal window


```
npx astro add react tailwind partytown
```





Terminal window


```
pnpm astro add react tailwind partytown
```





Terminal window


```
yarn astro add react tailwind partytown
```




Handling integration dependencies

If you see any warnings like `Cannot find package '[package-name]'` after adding an integration, your package manager may not have installed [peer dependencies](https://nodejs.org/en/blog/npm/peer-dependencies/) for you. To install these missing packages, run `npm install [package-name]`.


### Manual Installation

[Section titled Manual Installation](#manual-installation)
Astro integrations are always added through the `integrations` property in your `astro.config.mjs` file.


There are three common ways to import an integration into your Astro project:


1. [Install an npm package integration](#installing-an-npm-package).
2. Import your own integration from a local file inside your project.
3. Write your integration inline, directly in your config file.




astro.config.mjs


```
import { defineConfig } from 'astro/config';import installedIntegration from '@astrojs/vue';import localIntegration from './my-integration.js';
export default defineConfig({  integrations: [    // 1. Imported from an installed npm package    installedIntegration(),    // 2. Imported from a local JS file    localIntegration(),    // 3. An inline object    {name: 'namespace:id', hooks: { /* ... */ }},  ]});
```


Check out the [Integration API](/en/reference/integrations-reference/) reference to learn all of the different ways that you can write an integration.


#### Installing an NPM package

[Section titled Installing an NPM package](#installing-an-npm-package)
Install an NPM package integration using a package manager, and then update `astro.config.mjs` manually.


For example, to install the `@astrojs/sitemap` integration:


1. Install the integration to your project dependencies using your preferred package manager:





	* [npm](#tab-panel-274)
	* [pnpm](#tab-panel-275)
	* [Yarn](#tab-panel-276)




Terminal window


```
npm install @astrojs/sitemap
```





Terminal window


```
pnpm add @astrojs/sitemap
```





Terminal window


```
yarn add @astrojs/sitemap
```
2. Import the integration to your `astro.config.mjs` file, and add it to your `integrations[]` array, along with any configuration options:




astro.config.mjs


```
import { defineConfig } from 'astro/config';import sitemap from '@astrojs/sitemap';
export default defineConfig({  // ...  integrations: [sitemap()],  // ...});
```

Note that different integrations may have different configuration settings. Read each integration’s documentation, and apply any necessary config options to your chosen integration in `astro.config.mjs`


### Custom Options

[Section titled Custom Options](#custom-options)
Integrations are almost always authored as factory functions that return the actual integration object. This lets you pass arguments and options to the factory function that customize the integration for your project.







```
integrations: [  // Example: Customize your integration with function arguments  sitemap({filter: true})]
```

### Toggle an Integration

[Section titled Toggle an Integration](#toggle-an-integration)
Falsy integrations are ignored, so you can toggle integrations on \& off without worrying about left\-behind `undefined` and boolean values.







```
integrations: [  // Example: Skip building a sitemap on Windows  process.platform !== 'win32' && sitemap()]
```

Upgrading Integrations
----------------------

[Section titled Upgrading Integrations](#upgrading-integrations)
To upgrade all official integrations at once, run the `@astrojs/upgrade` command. This will upgrade both Astro and all official integrations to their latest versions.


### Automatic Upgrading

[Section titled Automatic Upgrading](#automatic-upgrading)


* [npm](#tab-panel-277)
* [pnpm](#tab-panel-278)
* [Yarn](#tab-panel-279)






Terminal window


```
# Upgrade Astro and official integrations together to latestnpx @astrojs/upgrade
```





Terminal window


```
# Upgrade Astro and official integrations together to latestpnpm dlx @astrojs/upgrade
```





Terminal window


```
# Upgrade Astro and official integrations together to latestyarn dlx @astrojs/upgrade
```




### Manual Upgrading

[Section titled Manual Upgrading](#manual-upgrading)
To upgrade one or more integrations manually, use the appropriate command for your package manager.




* [npm](#tab-panel-280)
* [pnpm](#tab-panel-281)
* [Yarn](#tab-panel-282)






Terminal window


```
# Example: upgrade React and Tailwind integrationsnpm install @astrojs/react@latest @astrojs/tailwind@latest
```





Terminal window


```
# Example: upgrade React and Tailwind integrationspnpm add @astrojs/react@latest @astrojs/tailwind@latest
```





Terminal window


```
# Example: upgrade React and Tailwind integrationsyarn add @astrojs/react@latest @astrojs/tailwind@latest
```




Removing an Integration
-----------------------

[Section titled Removing an Integration](#removing-an-integration)
To remove an integration, first uninstall the integration from your project




* [npm](#tab-panel-283)
* [pnpm](#tab-panel-284)
* [Yarn](#tab-panel-285)






Terminal window


```
npm uninstall @astrojs/react
```





Terminal window


```
pnpm remove @astrojs/react
```





Terminal window


```
yarn remove @astrojs/react
```




Next, remove the integration from your `astro.config.*` file:




astro.config.mjs


```
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
export default defineConfig({  integrations: [    react()  ]});
```

Finding More Integrations
-------------------------

[Section titled Finding More Integrations](#finding-more-integrations)
You can find many integrations developed by the community in the [Astro Integrations Directory](https://astro.build/integrations/). Follow links there for detailed usage and configuration instructions.


Building Your Own Integration
-----------------------------

[Section titled Building Your Own Integration](#building-your-own-integration)
Astro’s Integration API is inspired by Rollup and Vite, and designed to feel familiar to anyone who has ever written a Rollup or Vite plugin before.


Check out the [Integration API](/en/reference/integrations-reference/) reference to learn what integrations can do and how to write one yourself.


Learn