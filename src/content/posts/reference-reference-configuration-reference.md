---
author: AA
category:
- One
cover: https://images.unsplash.com/photo-1514539079130-25950c84af65?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw1fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: closeup photo of castle with mist
description: ''
pubDate: 2024-02-05 00:00:00
slug: reference-reference-configuration-reference
tags:
- guide
- PHP
- Sass
title: Configuration Reference 
---

The following reference covers all supported configuration options in Astro. To learn more about configuring Astro, read our guide on [Configuring Astro](/en/guides/configuring-astro/).




astro.config.mjs


```
import { defineConfig } from 'astro/config'
export default defineConfig({  // your configuration options here...})
```

Top\-Level Options
------------------

[Section titled Top\-Level Options](#top-level-options)
### site

[Section titled site](#site)
**Type:** `string`


Your final, deployed URL. Astro uses this full URL to generate your sitemap and canonical URLs in your final build. It is strongly recommended that you set this configuration to get the most out of Astro.







```
{  site: 'https://www.my-site.dev'}
```

### base

[Section titled base](#base)
**Type:** `string`


The base path to deploy to. Astro will use this path as the root for your pages and assets both in development and in production build.


In the example below, `astro dev` will start your server at `/docs`.







```
{  base: '/docs'}
```

When using this option, all of your static asset imports and URLs should add the base as a prefix. You can access this value via `import.meta.env.BASE_URL`.


The value of `import.meta.env.BASE_URL` will be determined by your `trailingSlash` config, no matter what value you have set for `base`.


A trailing slash is always included if `trailingSlash: "always"` is set. If `trailingSlash: "never"` is set, `BASE_URL` will not include a trailing slash, even if `base` includes one.


Additionally, Astro will internally manipulate the configured value of `config.base` before making it available to integrations. The value of `config.base` as read by integrations will also be determined by your `trailingSlash` configuration in the same way.


In the example below, the values of `import.meta.env.BASE_URL` and `config.base` when processed will both be `/docs`:







```
{   base: '/docs/',   trailingSlash: "never"}
```

In the example below, the values of `import.meta.env.BASE_URL` and `config.base` when processed will both be `/docs/`:







```
{   base: '/docs',   trailingSlash: "always"}
```

### trailingSlash

[Section titled trailingSlash](#trailingslash)
**Type:** `'always' | 'never' | 'ignore'`  

**Default:** `'ignore'`


Set the route matching behavior of the dev server. Choose from the following options:


* `'always'` \- Only match URLs that include a trailing slash (ex: “/foo/“)
* `'never'` \- Never match URLs that include a trailing slash (ex: “/foo”)
* `'ignore'` \- Match URLs regardless of whether a trailing ”/” exists


Use this configuration option if your production host has strict handling of how trailing slashes work or do not work.


You can also set this if you prefer to be more strict yourself, so that URLs with or without trailing slashes won’t work during development.







```
{  // Example: Require a trailing slash during development  trailingSlash: 'always'}
```

**See Also:**


* build.format


### redirects

[Section titled redirects](#redirects)
**Type:** `Record.<string, RedirectConfig>`  

**Default:** `{}`  



**Added in:**
`astro@2.9.0`

Specify a mapping of redirects where the key is the route to match
and the value is the path to redirect to.


You can redirect both static and dynamic routes, but only to the same kind of route.
For example you cannot have a `'/article': '/blog/[...slug]'` redirect.







```
{  redirects: {    '/old': '/new',    '/blog/[...slug]': '/articles/[...slug]',  }}
```

For statically\-generated sites with no adapter installed, this will produce a client redirect using a [`<meta http-equiv="refresh">` tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#http-equiv) and does not support status codes.


When using SSR or with a static adapter in `output: static`
mode, status codes are supported.
Astro will serve redirected GET requests with a status of `301`
and use a status of `308` for any other request method.


You can customize the [redirection status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages) using an object in the redirect config:







```
{  redirects: {    '/other': {      status: 302,      destination: '/place',    },  }}
```

### output

[Section titled output](#output)
**Type:** `'static' | 'server' | 'hybrid'`  

**Default:** `'static'`


Specifies the output target for builds.


* `'static'` \- Building a static site to be deployed to any static host.
* `'server'` \- Building an app to be deployed to a host supporting SSR (server\-side rendering).
* `'hybrid'` \- Building a static site with a few server\-side rendered pages.







```
import { defineConfig } from 'astro/config';
export default defineConfig({  output: 'static'})
```

**See Also:**


* adapter


### adapter

[Section titled adapter](#adapter)
**Type:** `AstroIntegration`


Deploy to your favorite server, serverless, or edge host with build adapters. Import one of our first\-party adapters for [Netlify](/en/guides/deploy/netlify/#adapter-for-ssr), [Vercel](/en/guides/deploy/vercel/#adapter-for-ssr), and more to engage Astro SSR.


[See our Server\-side Rendering guide](/en/guides/server-side-rendering/) for more on SSR, and [our deployment guides](/en/guides/deploy/) for a complete list of hosts.







```
import netlify from '@astrojs/netlify';{  // Example: Build for Netlify serverless deployment  adapter: netlify(),}
```

**See Also:**


* output


### integrations

[Section titled integrations](#integrations)
**Type:** `AstroIntegration[]`


Extend Astro with custom integrations. Integrations are your one\-stop\-shop for adding framework support (like Solid.js), new features (like sitemaps), and new libraries (like Partytown).


Read our [Integrations Guide](/en/guides/integrations-guide/) for help getting started with Astro Integrations.







```
import react from '@astrojs/react';import tailwind from '@astrojs/tailwind';{  // Example: Add React + Tailwind support to Astro  integrations: [react(), tailwind()]}
```

### root

[Section titled root](#root)
**Type:** `string`  

**CLI:** `--root`  

**Default:** `"."` (current working directory)


You should only provide this option if you run the `astro` CLI commands in a directory other than the project root directory. Usually, this option is provided via the CLI instead of the [Astro config file](/en/guides/configuring-astro/#supported-config-file-types), since Astro needs to know your project root before it can locate your config file.


If you provide a relative path (ex: `--root: './my-project'`) Astro will resolve it against your current working directory.


#### Examples

[Section titled Examples](#examples)





```
{  root: './my-project-directory'}
```



Terminal window


```
$ astro build --root ./my-project-directory
```

### srcDir

[Section titled srcDir](#srcdir)
**Type:** `string`  

**Default:** `"./src"`


Set the directory that Astro will read your site from.


The value can be either an absolute file system path or a path relative to the project root.







```
{  srcDir: './www'}
```

### publicDir

[Section titled publicDir](#publicdir)
**Type:** `string`  

**Default:** `"./public"`


Set the directory for your static assets. Files in this directory are served at `/` during dev and copied to your build directory during build. These files are always served or copied as\-is, without transform or bundling.


The value can be either an absolute file system path or a path relative to the project root.







```
{  publicDir: './my-custom-publicDir-directory'}
```

### outDir

[Section titled outDir](#outdir)
**Type:** `string`  

**Default:** `"./dist"`


Set the directory that `astro build` writes your final build to.


The value can be either an absolute file system path or a path relative to the project root.







```
{  outDir: './my-custom-build-directory'}
```

**See Also:**


* build.server


### cacheDir

[Section titled cacheDir](#cachedir)
**Type:** `string`  

**Default:** `"./node_modules/.astro"`


Set the directory for caching build artifacts. Files in this directory will be used in subsequent builds to speed up the build time.


The value can be either an absolute file system path or a path relative to the project root.







```
{  cacheDir: './my-custom-cache-directory'}
```

### compressHTML

[Section titled compressHTML](#compresshtml)
**Type:** `boolean`  

**Default:** `true`


This is an option to minify your HTML output and reduce the size of your HTML files.


By default, Astro removes whitespace from your HTML, including line breaks, from `.astro` components in a lossless manner.
Some whitespace may be kept as needed to preserve the visual rendering of your HTML. This occurs both in development mode and in the final build.


To disable HTML compression, set `compressHTML` to false.







```
{  compressHTML: false}
```

### scopedStyleStrategy

[Section titled scopedStyleStrategy](#scopedstylestrategy)
**Type:** `'where' | 'class' | 'attribute'`  

**Default:** `'attribute'`  



**Added in:**
`astro@2.4`

Specify the strategy used for scoping styles within Astro components. Choose from:


* `'where'` \- Use `:where` selectors, causing no specificity increase.
* `'class'` \- Use class\-based selectors, causing a \+1 specificity increase.
* `'attribute'` \- Use `data-` attributes, causing a \+1 specificity increase.


Using `'class'` is helpful when you want to ensure that element selectors within an Astro component override global style defaults (e.g. from a global stylesheet).
Using `'where'` gives you more control over specificity, but requires that you use higher\-specificity selectors, layers, and other tools to control which selectors are applied.
Using `'attribute'` is useful when you are manipulating the `class` attribute of elements and need to avoid conflicts between your own styling logic and Astro’s application of styles.


### security

[Section titled security](#security)
**Type:** `object`  

**Default:** `{}`  



**Added in:**
`astro@4.9.0`

Enables security measures for an Astro website.


These features only exist for pages rendered on demand (SSR) using `server` mode or pages that opt out of prerendering in `hybrid` mode.




astro.config.mjs


```
export default defineConfig({  output: "server",  security: {    checkOrigin: true  }})
```

#### security.checkOrigin

[Section titled security.checkOrigin](#securitycheckorigin)
**Type:** `boolean`  

**Default:** `false`  



**Added in:**
`astro@4.9.0`

When enabled, performs a check that the “origin” header, automatically passed by all modern browsers, matches the URL sent by each `Request`. This is used to provide Cross\-Site Request Forgery (CSRF) protection.


The “origin” check is executed only for pages rendered on demand, and only for the requests `POST`, `PATCH`, `DELETE` and `PUT` with
one of the following `content-type` headers: `'application/x-www-form-urlencoded'`, `'multipart/form-data'`, `'text/plain'`.


If the “origin” header doesn’t match the `pathname` of the request, Astro will return a 403 status code and will not render the page.


### vite

[Section titled vite](#vite)
**Type:** `ViteUserConfig`


Pass additional configuration options to Vite. Useful when Astro doesn’t support some advanced configuration that you may need.


View the full `vite` configuration object documentation on [vite.dev](https://vite.dev/config/).


#### Examples

[Section titled Examples](#examples-1)





```
{  vite: {    ssr: {      // Example: Force a broken package to skip SSR processing, if needed      external: ['broken-npm-package'],    }  }}
```






```
{  vite: {    // Example: Add custom vite plugins directly to your Astro project    plugins: [myPlugin()],  }}
```

Build Options
-------------

[Section titled Build Options](#build-options)
### build.format

[Section titled build.format](#buildformat)
**Type:** `('file' | 'directory' | 'preserve')`  

**Default:** `'directory'`


Control the output file format of each page. This value may be set by an adapter for you.


* `'file'`: Astro will generate an HTML file named for each page route. (e.g. `src/pages/about.astro` and `src/pages/about/index.astro` both build the file `/about.html`)
* `'directory'`: Astro will generate a directory with a nested `index.html` file for each page. (e.g. `src/pages/about.astro` and `src/pages/about/index.astro` both build the file `/about/index.html`)
* `'preserve'`: Astro will generate HTML files exactly as they appear in your source folder. (e.g. `src/pages/about.astro` builds `/about.html` and `src/pages/about/index.astro` builds the file `/about/index.html`)







```
{  build: {    // Example: Generate `page.html` instead of `page/index.html` during build.    format: 'file'  }}
```

#### Effect on Astro.url

[Section titled Effect on Astro.url](#effect-on-astrourl)
Setting `build.format` controls what `Astro.url` is set to during the build. When it is:


* `directory` \- The `Astro.url.pathname` will include a trailing slash to mimic folder behavior; ie `/foo/`.
* `file` \- The `Astro.url.pathname` will include `.html`; ie `/foo.html`.


This means that when you create relative URLs using `new URL('./relative', Astro.url)`, you will get consistent behavior between dev and build.


To prevent inconsistencies with trailing slash behaviour in dev, you can restrict the [`trailingSlash` option](#trailingslash) to `'always'` or `'never'` depending on your build format:


* `directory` \- Set `trailingSlash: 'always'`
* `file` \- Set `trailingSlash: 'never'`


### build.client

[Section titled build.client](#buildclient)
**Type:** `string`  

**Default:** `'./dist/client'`


Controls the output directory of your client\-side CSS and JavaScript when `output: 'server'` or `output: 'hybrid'` only.
`outDir` controls where the code is built to.


This value is relative to the `outDir`.







```
{  output: 'server', // or 'hybrid'  build: {    client: './client'  }}
```

### build.server

[Section titled build.server](#buildserver)
**Type:** `string`  

**Default:** `'./dist/server'`


Controls the output directory of server JavaScript when building to SSR.


This value is relative to the `outDir`.







```
{  build: {    server: './server'  }}
```

### build.assets

[Section titled build.assets](#buildassets)
**Type:** `string`  

**Default:** `'_astro'`  



**Added in:**
`astro@2.0.0`

Specifies the directory in the build output where Astro\-generated assets (bundled JS and CSS for example) should live.







```
{  build: {    assets: '_custom'  }}
```

**See Also:**


* outDir


### build.assetsPrefix

[Section titled build.assetsPrefix](#buildassetsprefix)
**Type:** `string | Record.<string, string>`  

**Default:** `undefined`  



**Added in:**
`astro@2.2.0`

Specifies the prefix for Astro\-generated asset links. This can be used if assets are served from a different domain than the current site.


This requires uploading the assets in your local `./dist/_astro` folder to a corresponding `/_astro/` folder on the remote domain.
To rename the `_astro` path, specify a new directory in `build.assets`.


To fetch all assets uploaded to the same domain (e.g. `https://cdn.example.com/_astro/...`), set `assetsPrefix` to the root domain as a string (regardless of your `base` configuration):







```
{  build: {    assetsPrefix: 'https://cdn.example.com'  }}
```

**Added in:** `astro@4.5.0`


You can also pass an object to `assetsPrefix` to specify a different domain for each file type.
In this case, a `fallback` property is required and will be used by default for any other files.







```
{  build: {    assetsPrefix: {      'js': 'https://js.cdn.example.com',      'mjs': 'https://js.cdn.example.com',      'css': 'https://css.cdn.example.com',      'fallback': 'https://cdn.example.com'    }  }}
```

### build.serverEntry

[Section titled build.serverEntry](#buildserverentry)
**Type:** `string`  

**Default:** `'entry.mjs'`


Specifies the file name of the server entrypoint when building to SSR.
This entrypoint is usually dependent on which host you are deploying to and
will be set by your adapter for you.


Note that it is recommended that this file ends with `.mjs` so that the runtime
detects that the file is a JavaScript module.







```
{  build: {    serverEntry: 'main.mjs'  }}
```

### build.redirects

[Section titled build.redirects](#buildredirects)
**Type:** `boolean`  

**Default:** `true`  



**Added in:**
`astro@2.6.0`

Specifies whether redirects will be output to HTML during the build.
This option only applies to `output: 'static'` mode; in SSR redirects
are treated the same as all responses.


This option is mostly meant to be used by adapters that have special
configuration files for redirects and do not need/want HTML based redirects.







```
{  build: {    redirects: false  }}
```

### build.inlineStylesheets

[Section titled build.inlineStylesheets](#buildinlinestylesheets)
**Type:** `'always' | 'auto' | 'never'`  

**Default:** `auto`  



**Added in:**
`astro@2.6.0`

Control whether project styles are sent to the browser in a separate css file or inlined into `<style>` tags. Choose from the following options:


* `'always'` \- project styles are inlined into `<style>` tags
* `'auto'` \- only stylesheets smaller than `ViteConfig.build.assetsInlineLimit` (default: 4kb) are inlined. Otherwise, project styles are sent in external stylesheets.
* `'never'` \- project styles are sent in external stylesheets







```
{  build: {    inlineStylesheets: 'never',  },}
```

### build.concurrency

[Section titled build.concurrency](#buildconcurrency)
**Type:** `number`  

**Default:** `1`  



**Added in:**
`astro@4.16.0`
New

The number of pages to build in parallel.


**In most cases, you should not change the default value of `1`.**


Use this option only when other attempts to reduce the overall rendering time (e.g. batch or cache long running tasks like fetch calls or data access) are not possible or are insufficient.
If the number is set too high, page rendering may slow down due to insufficient memory resources and because JS is single\-threaded.







```
{  build: {    concurrency: 2  }}
```

Breaking changes possible

This feature is stable and is not considered experimental. However, this feature is only intended to address difficult performance issues, and breaking changes may occur in a [minor release](/en/upgrade-astro/#semantic-versioning) to keep this option as performant as possible. Please check the [Astro CHANGELOG](https://github.com/withastro/astro/blob/refs/heads/next/packages/astro/CHANGELOG.md) for every minor release if you are using this feature.


Server Options
--------------

[Section titled Server Options](#server-options)
Customize the Astro dev server, used by both `astro dev` and `astro preview`.







```
{  server: { port: 1234, host: true }}
```

To set different configuration based on the command run (“dev”, “preview”) a function can also be passed to this configuration option.







```
{  // Example: Use the function syntax to customize based on command  server: ({ command }) => ({ port: command === 'dev' ? 4321 : 4000 })}
```

### server.host

[Section titled server.host](#serverhost)
**Type:** `string | boolean`  

**Default:** `false`  



**Added in:**
`astro@0.24.0`

Set which network IP addresses the server should listen on (i.e. non\-localhost IPs).


* `false` \- do not expose on a network IP address
* `true` \- listen on all addresses, including LAN and public addresses
* `[custom-address]` \- expose on a network IP address at `[custom-address]` (ex: `192.168.0.1`)


### server.port

[Section titled server.port](#serverport)
**Type:** `number`  

**Default:** `4321`


Set which port the server should listen on.


If the given port is already in use, Astro will automatically try the next available port.







```
{  server: { port: 8080 }}
```

### server.open

[Section titled server.open](#serveropen)
**Type:** `string | boolean`  

**Default:** `false`  



**Added in:**
`astro@4.1.0`

Controls whether the dev server should open in your browser window on startup.


Pass a full URL string (e.g. ”<http://example.com>”) or a pathname (e.g. “/about”) to specify the URL to open.







```
{  server: { open: "/about" }}
```

### server.headers

[Section titled server.headers](#serverheaders)
**Type:** `OutgoingHttpHeaders`  

**Default:** `{}`  



**Added in:**
`astro@1.7.0`

Set custom HTTP response headers to be sent in `astro dev` and `astro preview`.


Dev Toolbar Options
-------------------

[Section titled Dev Toolbar Options](#dev-toolbar-options)
### devToolbar.enabled

[Section titled devToolbar.enabled](#devtoolbarenabled)
**Type:** `boolean`  

**Default:** `true`


Whether to enable the Astro Dev Toolbar. This toolbar allows you to inspect your page islands, see helpful audits on performance and accessibility, and more.


This option is scoped to the entire project, to only disable the toolbar for yourself, run `npm run astro preferences disable devToolbar`. To disable the toolbar for all your Astro projects, run `npm run astro preferences disable devToolbar --global`.


Prefetch Options
----------------

[Section titled Prefetch Options](#prefetch-options)
**Type:** `boolean | object`


Enable prefetching for links on your site to provide faster page transitions.
(Enabled by default on pages using the `<ViewTransitions />` router. Set `prefetch: false` to opt out of this behaviour.)


This configuration automatically adds a prefetch script to every page in the project
giving you access to the `data-astro-prefetch` attribute.
Add this attribute to any `<a />` link on your page to enable prefetching for that page.







```
<a href="/about" data-astro-prefetch>About</a>
```

Further customize the default prefetching behavior using the [`prefetch.defaultStrategy`](#prefetchdefaultstrategy) and [`prefetch.prefetchAll`](#prefetchprefetchall) options.


See the [Prefetch guide](/en/guides/prefetch/) for more information.


### prefetch.prefetchAll

[Section titled prefetch.prefetchAll](#prefetchprefetchall)
**Type:** `boolean`


Enable prefetching for all links, including those without the `data-astro-prefetch` attribute.
This value defaults to `true` when using the `<ViewTransitions />` router. Otherwise, the default value is `false`.







```
prefetch: {  prefetchAll: true}
```

When set to `true`, you can disable prefetching individually by setting `data-astro-prefetch="false"` on any individual links.







```
<a href="/about" data-astro-prefetch="false">About</a>
```

### prefetch.defaultStrategy

[Section titled prefetch.defaultStrategy](#prefetchdefaultstrategy)
**Type:** `'tap' | 'hover' | 'viewport' | 'load'`  

**Default:** `'hover'`


The default prefetch strategy to use when the `data-astro-prefetch` attribute is set on a link with no value.


* `'tap'`: Prefetch just before you click on the link.
* `'hover'`: Prefetch when you hover over or focus on the link. (default)
* `'viewport'`: Prefetch as the links enter the viewport.
* `'load'`: Prefetch all links on the page after the page is loaded.


You can override this default value and select a different strategy for any individual link by setting a value on the attribute.







```
<a href="/about" data-astro-prefetch="viewport">About</a>
```

Image Options
-------------

[Section titled Image Options](#image-options)
### image.endpoint

[Section titled image.endpoint](#imageendpoint)
**Type:** `string`  

**Default:** `undefined`  



**Added in:**
`astro@3.1.0`

Set the endpoint to use for image optimization in dev and SSR. Set to `undefined` to use the default endpoint.


The endpoint will always be injected at `/_image`.







```
{  image: {    // Example: Use a custom image endpoint    endpoint: './src/image-endpoint.ts',  },}
```

### image.service

[Section titled image.service](#imageservice)
**Type:** `Object`  

**Default:** `{entrypoint: 'astro/assets/services/sharp', config?: {}}`  



**Added in:**
`astro@2.1.0`

Set which image service is used for Astro’s assets support.


The value should be an object with an entrypoint for the image service to use and optionally, a config object to pass to the service.


The service entrypoint can be either one of the included services, or a third\-party package.







```
{  image: {    // Example: Enable the Sharp-based image service with a custom config    service: {       entrypoint: 'astro/assets/services/sharp',       config: {         limitInputPixels: false,      },     },  },}
```

#### image.service.config.limitInputPixels

[Section titled image.service.config.limitInputPixels](#imageserviceconfiglimitinputpixels)
**Type:** `number | boolean`  

**Default:** `true`  



**Added in:**
`astro@4.1.0`

Whether or not to limit the size of images that the Sharp image service will process.


Set `false` to bypass the default image size limit for the Sharp image service and process large images.


### image.domains

[Section titled image.domains](#imagedomains)
**Type:** `Array.<string>`  

**Default:** `[]`  



**Added in:**
`astro@2.10.10`

Defines a list of permitted image source domains for remote image optimization. No other remote images will be optimized by Astro.


This option requires an array of individual domain names as strings. Wildcards are not permitted. Instead, use [`image.remotePatterns`](#imageremotepatterns) to define a list of allowed source URL patterns.




astro.config.mjs


```
{  image: {    // Example: Allow remote image optimization from a single domain    domains: ['astro.build'],  },}
```

### image.remotePatterns

[Section titled image.remotePatterns](#imageremotepatterns)
**Type:** `Array.<RemotePattern>`  

**Default:** `{remotePatterns: []}`  



**Added in:**
`astro@2.10.10`

Defines a list of permitted image source URL patterns for remote image optimization.


`remotePatterns` can be configured with four properties:


1. protocol
2. hostname
3. port
4. pathname







```
{  image: {    // Example: allow processing all images from your aws s3 bucket    remotePatterns: [{      protocol: 'https',      hostname: '**.amazonaws.com',    }],  },}
```

You can use wildcards to define the permitted `hostname` and `pathname` values as described below. Otherwise, only the exact values provided will be configured:


`hostname`:


* Start with ’\*\*.’ to allow all subdomains (‘endsWith’).
* Start with ’\*.’ to allow only one level of subdomain.


`pathname`:


* End with ’/\*\*’ to allow all sub\-routes (‘startsWith’).
* End with ’/\*’ to allow only one level of sub\-route.


Markdown Options
----------------

[Section titled Markdown Options](#markdown-options)
### markdown.shikiConfig

[Section titled markdown.shikiConfig](#markdownshikiconfig)
**Type:** `Partial<ShikiConfig>`


Shiki configuration options. See [the Markdown configuration docs](/en/guides/markdown-content/#shiki-configuration) for usage.


### markdown.syntaxHighlight

[Section titled markdown.syntaxHighlight](#markdownsyntaxhighlight)
**Type:** `'shiki' | 'prism' | false`  

**Default:** `shiki`


Which syntax highlighter to use, if any.


* `shiki` \- use the [Shiki](https://shiki.style) highlighter
* `prism` \- use the [Prism](https://prismjs.com/) highlighter
* `false` \- do not apply syntax highlighting.







```
{  markdown: {    // Example: Switch to use prism for syntax highlighting in Markdown    syntaxHighlight: 'prism',  }}
```

### markdown.remarkPlugins

[Section titled markdown.remarkPlugins](#markdownremarkplugins)
**Type:** `RemarkPlugins`


Pass [remark plugins](https://github.com/remarkjs/remark) to customize how your Markdown is built. You can import and apply the plugin function (recommended), or pass the plugin name as a string.







```
import remarkToc from 'remark-toc';{  markdown: {    remarkPlugins: [ [remarkToc, { heading: "contents" }] ]  }}
```

### markdown.rehypePlugins

[Section titled markdown.rehypePlugins](#markdownrehypeplugins)
**Type:** `RehypePlugins`


Pass [rehype plugins](https://github.com/remarkjs/remark-rehype) to customize how your Markdown’s output HTML is processed. You can import and apply the plugin function (recommended), or pass the plugin name as a string.







```
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';{  markdown: {    rehypePlugins: [rehypeAccessibleEmojis]  }}
```

### markdown.gfm

[Section titled markdown.gfm](#markdowngfm)
**Type:** `boolean`  

**Default:** `true`  



**Added in:**
`astro@2.0.0`

Astro uses [GitHub\-flavored Markdown](https://github.com/remarkjs/remark-gfm) by default. To disable this, set the `gfm` flag to `false`:







```
{  markdown: {    gfm: false,  }}
```

### markdown.smartypants

[Section titled markdown.smartypants](#markdownsmartypants)
**Type:** `boolean`  

**Default:** `true`  



**Added in:**
`astro@2.0.0`

Astro uses the [SmartyPants formatter](https://daringfireball.net/projects/smartypants/) by default. To disable this, set the `smartypants` flag to `false`:







```
{  markdown: {    smartypants: false,  }}
```

### markdown.remarkRehype

[Section titled markdown.remarkRehype](#markdownremarkrehype)
**Type:** `RemarkRehype`


Pass options to [remark\-rehype](https://github.com/remarkjs/remark-rehype#api).







```
{  markdown: {    // Example: Translate the footnotes text to another language, here are the default English values    remarkRehype: { footnoteLabel: "Footnotes", footnoteBackLabel: "Back to reference 1" },  },};
```

i18n
----

[Section titled i18n](#i18n)
**Type:** `object`  



**Added in:**
`astro@3.5.0`

Configures i18n routing and allows you to specify some customization options.


See our guide for more information on [internationalization in Astro](/en/guides/internationalization/)


### i18n.defaultLocale

[Section titled i18n.defaultLocale](#i18ndefaultlocale)
**Type:** `string`  



**Added in:**
`astro@3.5.0`

The default locale of your website/application. This is a required field.


No particular language format or syntax is enforced, but we suggest using lower\-case and hyphens as needed (e.g. “es”, “pt\-br”) for greatest compatibility.


### i18n.locales

[Section titled i18n.locales](#i18nlocales)
**Type:** `Locales`  



**Added in:**
`astro@3.5.0`

A list of all locales supported by the website, including the `defaultLocale`. This is a required field.


Languages can be listed either as individual codes (e.g. `['en', 'es', 'pt-br']`) or mapped to a shared `path` of codes (e.g. `{ path: "english", codes: ["en", "en-US"]}`). These codes will be used to determine the URL structure of your deployed site.


No particular language code format or syntax is enforced, but your project folders containing your content files must match exactly the `locales` items in the list. In the case of multiple `codes` pointing to a custom URL path prefix, store your content files in a folder with the same name as the `path` configured.


### i18n.fallback

[Section titled i18n.fallback](#i18nfallback)
**Type:** `Record.<string, string>`  



**Added in:**
`astro@3.5.0`

The fallback strategy when navigating to pages that do not exist (e.g. a translated page has not been created).


Use this object to declare a fallback `locale` route for each language you support. If no fallback is specified, then unavailable pages will return a 404\.


##### Example

[Section titled Example](#example)
The following example configures your content fallback strategy to redirect unavailable pages in `/pt-br/` to their `es` version, and unavailable pages in `/fr/` to their `en` version. Unavailable `/es/` pages will return a 404\.







```
export default defineConfig({  i18n: {    defaultLocale: "en",    locales: ["en", "fr", "pt-br", "es"],    fallback: {      pt: "es",      fr: "en"    }  }})
```

### i18n.routing

[Section titled i18n.routing](#i18nrouting)
**Type:** `Routing`  



**Added in:**
`astro@3.7.0`

Controls the routing strategy to determine your site URLs. Set this based on your folder/URL path configuration for your default language.


#### i18n.routing.prefixDefaultLocale

[Section titled i18n.routing.prefixDefaultLocale](#i18nroutingprefixdefaultlocale)
**Type:** `boolean`  

**Default:** `false`  



**Added in:**
`astro@3.7.0`

When `false`, only non\-default languages will display a language prefix.
The `defaultLocale` will not show a language prefix and content files do not exist in a localized folder.
URLs will be of the form `example.com/[locale]/content/` for all non\-default languages, but `example.com/content/` for the default locale.


When `true`, all URLs will display a language prefix.
URLs will be of the form `example.com/[locale]/content/` for every route, including the default language.
Localized folders are used for every language, including the default.







```
export default defineConfig({  i18n: {    defaultLocale: "en",    locales: ["en", "fr", "pt-br", "es"],    routing: {      prefixDefaultLocale: true,    }  }})
```

#### i18n.routing.redirectToDefaultLocale

[Section titled i18n.routing.redirectToDefaultLocale](#i18nroutingredirecttodefaultlocale)
**Type:** `boolean`  

**Default:** `true`  



**Added in:**
`astro@4.2.0`

Configures whether or not the home URL (`/`) generated by `src/pages/index.astro`
will redirect to `/[defaultLocale]` when `prefixDefaultLocale: true` is set.


Set `redirectToDefaultLocale: false` to disable this automatic redirection at the root of your site:




astro.config.mjs


```
export default defineConfig({  i18n:{    defaultLocale: "en",    locales: ["en", "fr"],    routing: {      prefixDefaultLocale: true,      redirectToDefaultLocale: false    }  }})
```

#### i18n.routing.fallbackType

[Section titled i18n.routing.fallbackType](#i18nroutingfallbacktype)
**Type:** `"redirect" | "rewrite"`  

**Default:** `"redirect"`  



**Added in:**
`astro@4.15.0`

When [`i18n.fallback`](#i18nfallback) is configured to avoid showing a 404 page for missing page routes, this option controls whether to [redirect](/en/guides/routing/#redirects) to the fallback page, or to [rewrite](/en/guides/routing/#rewrites) the fallback page’s content in place.


By default, Astro’s i18n routing creates pages that redirect your visitors to a new destination based on your fallback configuration. The browser will refresh and show the destination address in the URL bar.


When `i18n.routing.fallback: "rewrite"` is configured, Astro will create pages that render the contents of the fallback page on the original, requested URL.


With the following configuration, if you have the file `src/pages/en/about.astro` but not `src/pages/fr/about.astro`, the `astro build` command will generate `dist/fr/about.html` with the same content as the `dist/en/about.html` page.
Your site visitor will see the English version of the page at `https://example.com/fr/about/` and will not be redirected.




astro.config.mjs


```
export default defineConfig({   i18n: {    defaultLocale: "en",    locales: ["en", "fr"],    routing: {      prefixDefaultLocale: false,      fallbackType: "rewrite",    },    fallback: {      fr: "en",    }  },})
```

#### i18n.routing.manual

[Section titled i18n.routing.manual](#i18nroutingmanual)
**Type:** `string`  



**Added in:**
`astro@4.6.0`

When this option is enabled, Astro will **disable** its i18n middleware so that you can implement your own custom logic. No other `routing` options (e.g. `prefixDefaultLocale`) may be configured with `routing: "manual"`.


You will be responsible for writing your own routing logic, or executing Astro’s i18n middleware manually alongside your own.







```
export default defineConfig({  i18n: {    defaultLocale: "en",    locales: ["en", "fr", "pt-br", "es"],    routing: {      prefixDefaultLocale: true,    }  }})
```

Legacy Flags
------------

[Section titled Legacy Flags](#legacy-flags)
To help some users migrate between versions of Astro, we occasionally introduce `legacy` flags.
These flags allow you to opt in to some deprecated or otherwise outdated behavior of Astro
in the latest version, so that you can continue to upgrade and take advantage of new Astro releases.


Experimental Flags
------------------

[Section titled Experimental Flags](#experimental-flags)
Astro offers experimental flags to give users early access to new features.
These flags are not guaranteed to be stable.


### experimental.directRenderScript

[Section titled experimental.directRenderScript](#experimentaldirectrenderscript)
**Type:** `boolean`  

**Default:** `false`  



**Added in:**
`astro@4.5.0`

Enables a more reliable strategy to prevent scripts from being executed in pages where they are not used.


Scripts will directly render as declared in Astro files (including existing features like TypeScript, importing `node_modules`,
and deduplicating scripts). You can also now conditionally render scripts in your Astro file.
However, this means scripts are no longer hoisted to the `<head>` and multiple scripts on a page are no longer bundled together.
If you enable this option, you should check that all your `<script>` tags behave as expected.


This option will be enabled by default in Astro 5\.0\.







```
{  experimental: {    directRenderScript: true,  },}
```

### experimental.contentCollectionCache

[Section titled experimental.contentCollectionCache](#experimentalcontentcollectioncache)
**Type:** `boolean`  

**Default:** `false`  



**Added in:**
`astro@3.5.0`

Enables a persistent cache for content collections when building in static mode.







```
{  experimental: {    contentCollectionCache: true,  },}
```

### experimental.clientPrerender

[Section titled experimental.clientPrerender](#experimentalclientprerender)
**Type:** `boolean`  

**Default:** `false`  



**Added in:**
`astro@4.2.0`

Enables pre\-rendering your prefetched pages on the client in supported browsers.


This feature uses the experimental [Speculation Rules Web API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API) and enhances the default `prefetch` behavior globally to prerender links on the client.
You may wish to review the [possible risks when prerendering on the client](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API#unsafe_prefetching) before enabling this feature.


Enable client side prerendering in your `astro.config.mjs` along with any desired `prefetch` configuration options:




astro.config.mjs


```
{  prefetch: {    prefetchAll: true,    defaultStrategy: 'viewport',  },  experimental: {    clientPrerender: true,  },}
```

Continue to use the `data-astro-prefetch` attribute on any `<a />` link on your site to opt in to prefetching.
Instead of appending a `<link>` tag to the head of the document or fetching the page with JavaScript, a `<script>` tag will be appended with the corresponding speculation rules.


Client side prerendering requires browser support. If the Speculation Rules API is not supported, `prefetch` will fallback to the supported strategy.


See the [Prefetch Guide](/en/guides/prefetch/) for more `prefetch` options and usage.


### experimental.globalRoutePriority

[Section titled experimental.globalRoutePriority](#experimentalglobalroutepriority)
**Type:** `boolean`  

**Default:** `false`  



**Added in:**
`astro@4.2.0`

Prioritizes redirects and injected routes equally alongside file\-based project routes, following the same [route priority order rules](/en/guides/routing/#route-priority-order) for all routes.


This allows more control over routing in your project by not automatically prioritizing certain types of routes, and standardizes the route priority ordering for all routes.


The following example shows which route will build certain page URLs when file\-based routes, injected routes, and redirects are combined as shown below:


* File\-based route: `/blog/post/[pid]`
* File\-based route: `/[page]`
* Injected route: `/blog/[...slug]`
* Redirect: `/blog/tags/[tag]` \-\> `/[tag]`
* Redirect: `/posts` \-\> `/blog`


With `experimental.globalRoutingPriority` enabled (instead of Astro 4\.0 default route priority order):


* `/blog/tags/astro` is built by the redirect to `/tags/[tag]` (instead of the injected route `/blog/[...slug]`)
* `/blog/post/0` is built by the file\-based route `/blog/post/[pid]` (instead of the injected route `/blog/[...slug]`)
* `/posts` is built by the redirect to `/blog` (instead of the file\-based route `/[page]`)


In the event of route collisions, where two routes of equal route priority attempt to build the same URL, Astro will log a warning identifying the conflicting routes.


### experimental.env

[Section titled experimental.env](#experimentalenv)
**Type:** `object`  

**Default:** `undefined`  



**Added in:**
`astro@4.10.0`

Enables experimental `astro:env` features.


The `astro:env` API lets you configure a type\-safe schema for your environment variables, and indicate whether they should be available on the server or the client. Import and use your defined variables from the appropriate `/client` or `/server` module:







```
---import { API_URL } from "astro:env/client"import { API_SECRET_TOKEN } from "astro:env/server"
const data = await fetch(`${API_URL}/users`, {  method: "GET",  headers: {    "Content-Type": "application/json",    "Authorization": `Bearer ${API_SECRET_TOKEN}`  },})---
<script>import { API_URL } from "astro:env/client"
fetch(`${API_URL}/ping`)</script>
```

To define the data type and properties of your environment variables, declare a schema in your Astro config in `experimental.env.schema`. The `envField` helper allows you define your variable as a string, number, or boolean and pass properties in an object:




astro.config.mjs


```
import { defineConfig, envField } from "astro/config"
export default defineConfig({    experimental: {        env: {            schema: {                API_URL: envField.string({ context: "client", access: "public", optional: true }),                PORT: envField.number({ context: "server", access: "public", default: 4321 }),                API_SECRET: envField.string({ context: "server", access: "secret" }),            }        }    }})
```

There are currently four data types supported: strings, numbers, booleans and enums.


There are three kinds of environment variables, determined by the combination of `context` (client or server) and `access` (secret or public) settings defined in your [`env.schema`](#experimentalenvschema):


* **Public client variables**: These variables end up in both your final client and server bundles, and can be accessed from both client and server through the `astro:env/client` module:







```
import { API_URL } from "astro:env/client"
```
* **Public server variables**: These variables end up in your final server bundle and can be accessed on the server through the `astro:env/server` module:







```
import { PORT } from "astro:env/server"
```
* **Secret server variables**: These variables are not part of your final bundle and can be accessed on the server through the `astro:env/server` module. The `getSecret()` helper function can be used to retrieve secrets not specified in the schema. Its implementation is provided by your adapter and defaults to `process.env`:







```
import { API_SECRET, getSecret } from "astro:env/server"
const SECRET_NOT_IN_SCHEMA = getSecret("SECRET_NOT_IN_SCHEMA") // string | undefined
```


**Note:** Secret client variables are not supported because there is no safe way to send this data to the client. Therefore, it is not possible to configure both `context: "client"` and `access: "secret"` in your schema.


For a complete overview, and to give feedback on this experimental API, see the [Astro Env RFC](https://github.com/withastro/roadmap/blob/main/proposals/0049-astro-env.md).


#### experimental.env.schema

[Section titled experimental.env.schema](#experimentalenvschema)
**Type:** `EnvSchema`  

**Default:** `undefined`  



**Added in:**
`astro@4.10.0`

An object that uses `envField` to define the data type (`string`, `number`, or `boolean`) and properties of your environment variables: `context` (client or server), `access` (public or secret), a `default` value to use, and whether or not this environment variable is `optional` (defaults to `false`).




astro.config.mjs


```
import { defineConfig, envField } from "astro/config"
export default defineConfig({  experimental: {    env: {      schema: {        API_URL: envField.string({ context: "client", access: "public", optional: true }),        PORT: envField.number({ context: "server", access: "public", default: 4321 }),        API_SECRET: envField.string({ context: "server", access: "secret" }),      }    }  }})
```

#### experimental.env.validateSecrets

[Section titled experimental.env.validateSecrets](#experimentalenvvalidatesecrets)
**Type:** `boolean`  

**Default:** `false`  



**Added in:**
`astro@4.11.6`

Whether or not to validate secrets on the server when starting the dev server or running a build.


By default, only public variables are validated on the server when starting the dev server or a build, and private variables are validated at runtime only. If enabled, private variables will also be checked on start. This is useful in some continuous integration (CI) pipelines to make sure all your secrets are correctly set before deploying.




astro.config.mjs


```
import { defineConfig, envField } from "astro/config"
export default defineConfig({  experimental: {    env: {      schema: {        // ...      },      validateSecrets: true    }  }})
```

### experimental.serverIslands

[Section titled experimental.serverIslands](#experimentalserverislands)
**Type:** `boolean`  

**Default:** `false`  



**Added in:**
`astro@4.12.0`

Enables experimental Server Island features.
Server Islands offer the ability to defer a component to render asynchronously after the page has already rendered.


To enable, configure an [on\-demand server rendering `output` mode](/en/basics/rendering-modes/#on-demand-rendered) with an adapter, and add the `serverIslands` flag to the `experimental` object:







```
{  output: 'hybrid', // or 'server'  adapter: nodejs({ mode: 'standalone' }),  experimental: {    serverIslands: true,  },}
```

Use the `server:defer` directive on any Astro component to delay initial rendering:







```
---import Avatar from '~/components/Avatar.astro';---<Avatar server:defer />
```

The outer page will be rendered, either at build time (`hybrid`) or at runtime (`server`) with the island content omitted and a `<script>` tag included in its place.


After the page loads in the browser, the script tag will replace itself with the contents of the island by making a request.


Any Astro component can be given the `server: defer` attribute to delay its rendering. There is no special API and you can write `.astro` code as normal:







```
---import { getUser } from '../api';
const user = await getUser(Astro.locals.userId);---<img class="avatar" src={user.imageUrl}>
```

#### Server island fallback content

[Section titled Server island fallback content](#server-island-fallback-content)
Since your component will not render with the rest of the page, you may want to add generic content (e.g. a loading message) to temporarily show in its place. This content will be displayed when the page first renders but before the island has loaded.


Add placeholder content as a child of your Astro component with the `slot="fallback"` attribute. When your island content is available, the fallback content will be replaced.


The example below displays a generic avatar as fallback content, then animates into a personalized avatar using view transitions:







```
<Avatar server:defer>  <svg slot="fallback" class="generic-avatar" transition:name="avatar">...</svg></Avatar>
```

For a complete overview, and to give feedback on this experimental API, see the [Server Islands RFC](https://github.com/withastro/roadmap/pull/963).


### experimental.contentIntellisense

[Section titled experimental.contentIntellisense](#experimentalcontentintellisense)
**Type:** `boolean`  

**Default:** `false`  



**Added in:**
`astro@4.14.0`

Enables Intellisense features (e.g. code completion, quick hints) for your content collection entries in compatible editors.


When enabled, this feature will generate and add JSON schemas to the `.astro` directory in your project. These files can be used by the Astro language server to provide Intellisense inside content files (`.md`, `.mdx`, `.mdoc`).







```
{  experimental: {    contentIntellisense: true,  },}
```

To use this feature with the Astro VS Code extension, you must also enable the `astro.content-intellisense` option in your VS Code settings. For editors using the Astro language server directly, pass the `contentIntellisense: true` initialization parameter to enable this feature. See the [content Intellisense implementation PR](https://github.com/withastro/language-tools/pull/915) for more details about this early feature.


### experimental.contentLayer

[Section titled experimental.contentLayer](#experimentalcontentlayer)
**Type:** `boolean`  

**Default:** `false`  



**Added in:**
`astro@4.14.0`

The Content Layer API is a new way to handle content and data in Astro. It is similar to and builds upon [content collections](/en/guides/content-collections/), taking them beyond local files in `src/content/` and allowing you to fetch content from anywhere, including remote APIs, by adding a `loader` to your collection.


Your existing content collections can be [migrated to the Content Layer API](#migrating-an-existing-content-collection-to-use-the-content-layer-api) with a few small changes. However, it is not necessary to update all your collections at once to add a new collection powered by the Content Layer API. You may have collections using both the existing and new APIs defined in `src/content/config.ts` at the same time.


The Content Layer API is designed to be more powerful and more performant, helping sites scale to thousands of pages. Data is cached between builds and updated incrementally. Markdown parsing is also 5\-10 times faster, with similar scale reductions in memory, and MDX is 2\-3 times faster.


To enable, add the `contentLayer` flag to the `experimental` object in your Astro config:




astro.config.mjs


```
{  experimental: {    contentLayer: true,  }}
```

#### Fetching data with a `loader`

[Section titled Fetching data with a loader](#fetching-data-with-a-loader)
The Content Layer API allows you to fetch your content from outside of the `src/content/` folder (whether stored locally in your project or remotely) and uses a `loader` property to retrieve your data.


The `loader` is defined in the collection’s schema and returns an array of entries. Astro provides two built\-in loader functions (`glob()` and `file()`) for fetching your local content, as well as access to the API to [construct your own loader and fetch remote data](#creating-a-loader).


The `glob()` loader creates entries from directories of Markdown, MDX, Markdoc, or JSON files from anywhere on the filesystem. It accepts a `pattern` of entry files to match, and a `base` file path of where your files are located. Use this when you have one file per entry.


The `file()` loader creates multiple entries from a single local file. Use this when all your entries are stored in an array of objects.




src/content/config.ts


```
import { defineCollection, z } from 'astro:content';import { glob, file } from 'astro/loaders';
const blog = defineCollection({  // By default the ID is a slug generated from  // the path of the file relative to `base`  loader: glob({ pattern: "**\/*.md", base: "./src/data/blog" }),  schema: z.object({    title: z.string(),    description: z.string(),    pubDate: z.coerce.date(),    updatedDate: z.coerce.date().optional(),  })});
const dogs = defineCollection({  // The path is relative to the project root, or an absolute path.  loader: file("src/data/dogs.json"),  schema: z.object({    id: z.string(),    breed: z.string(),    temperament: z.array(z.string()),  }),});
export const collections = { blog, dogs };
```

Note

Loaders will not automatically [exclude files prefaced with an `_`](/en/guides/routing/#excluding-pages). Use a regular expression such as `pattern: '**\/[^_]*.md'` in your loader to ignore these files.


#### Querying and rendering with the Content Layer API

[Section titled Querying and rendering with the Content Layer API](#querying-and-rendering-with-the-content-layer-api)
The collection can be [queried in the same way as content collections](/en/guides/content-collections/#querying-collections):




src/pages/index.astro


```
import { getCollection, getEntry } from 'astro:content';
// Get all entries from a collection.// Requires the name of the collection as an argument.const allBlogPosts = await getCollection('blog');
// Get a single entry from a collection.// Requires the name of the collection and IDconst labradorData = await getEntry('dogs', 'labrador-retriever');
```

Entries generated from Markdown, MDX, or Markdoc can be rendered directly to a page using the `render()` function.


Note

The syntax for rendering collection entries is different from the current content collections syntax.




src/pages/\[slug].astro


```
---import { getEntry, render } from 'astro:content';
const post = await getEntry('blog', Astro.params.slug);
const { Content, headings } = await render(post);---
<Content />
```

#### Creating a loader

[Section titled Creating a loader](#creating-a-loader)
With the Content Layer API, you can build loaders to load or generate content from anywhere.


For example, you can create a loader that fetches collection entries from a remote API.




src/content/config.ts


```
const countries = defineCollection({  loader: async () => {    const response = await fetch("https://restcountries.com/v3.1/all");    const data = await response.json();    // Must return an array of entries with an id property,    // or an object with IDs as keys and entries as values    return data.map((country) => ({      id: country.cca3,      ...country,    }));  },  // optionally add a schema  // schema: z.object...});
export const collections = { countries };
```

For more advanced loading logic, you can define an object loader. This allows incremental updates and conditional loading while also giving full access to the data store. See the API in [the Content Layer API RFC](https://github.com/withastro/roadmap/blob/content-layer/proposals/0050-content-layer.md#loaders).


#### Migrating an existing content collection to use the Content Layer API

[Section titled Migrating an existing content collection to use the Content Layer API](#migrating-an-existing-content-collection-to-use-the-content-layer-api)
You can convert an existing content collection with Markdown, MDX, Markdoc, or JSON entries to use the Content Layer API.


1. **Move the collection folder out of `src/content/`** (e.g. to `src/data/`). All collections located in the `src/content/` folder will use the existing Content Collections API.


**Do not move the existing `src/content/config.ts` file**. This file will define all collections, using either API.
2. **Edit the collection definition**. Your updated collection requires a `loader`, and the option to select a collection `type` is no longer available.




src/content/config.ts


```
import { defineCollection, z } from 'astro:content';import { glob } from 'astro/loaders';
const blog = defineCollection({  // For content layer you no longer define a `type`  type: 'content',  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/data/blog" }),  schema: z.object({    title: z.string(),    description: z.string(),    pubDate: z.coerce.date(),    updatedDate: z.coerce.date().optional(),  }),});
```
3. **Change references from `slug` to `id`**. Content layer collections do not have a `slug` field. Instead, all updated collections will have an `id`.




src/pages/index.astro


```
---export async function getStaticPaths() {  const posts = await getCollection('blog');  return posts.map((post) => ({    params: { slug: post.slug },    params: { slug: post.id },    props: post,  }));}---
```
4. **Switch to the new `render()` function**. Entries no longer have a `render()` method, as they are now serializable plain objects. Instead, import the `render()` function from `astro:content`.




src/pages/index.astro


```
---import { getEntry } from 'astro:content';import { getEntry, render } from 'astro:content';
const post = await getEntry('blog', params.slug);
const { Content, headings } = await post.render();const { Content, headings } = await render(post);---
<Content />
```


#### Learn more

[Section titled Learn more](#learn-more)
For a complete overview and the full API reference, see [the Content Layer API RFC](https://github.com/withastro/roadmap/blob/content-layer/proposals/0050-content-layer.md) and [share your feedback](https://github.com/withastro/roadmap/pull/982).


Reference