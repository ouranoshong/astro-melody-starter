---
author: AA
category:
- One
cover: https://images.unsplash.com/photo-1514539079130-25950c84af65?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw1fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: closeup photo of castle with mist
description: ''
pubDate: 2024-02-15 00:00:00
slug: astro-api-reference-reference-modules-astro-i18n
tags:
- tutorial
- CSharp
- Css
title: Internationalization API Reference 
---

**Added in:**
`astro@3.5.0`



This module provides functions to help you create URLs using your project’s configured locales.


Creating routes for your project with the i18n router will depend on certain configuration values you have set that affect your page routes. When creating routes with these functions, be sure to take into account your individual settings for:


* [`base`](/en/reference/configuration-reference/#base)
* [`trailingSlash`](/en/reference/configuration-reference/#trailingslash)
* [`build.format`](/en/reference/configuration-reference/#buildformat)
* [`site`](/en/reference/configuration-reference/#site)


Also, note that the returned URLs created by these functions for your `defaultLocale` will reflect your `i18n.routing` configuration.


For features and usage examples, [see our i18n routing guide](/en/guides/internationalization/).


Imports from `astro:i18n`
-------------------------

[Section titled Imports from astro:i18n](#imports-from-astroi18n)





```
import {  getRelativeLocaleUrl,  getAbsoluteLocaleUrl,  getRelativeLocaleUrlList,  getAbsoluteLocaleUrlList,  getPathByLocale,  getLocaleByPath,  redirectToDefaultLocale,  redirectToFallback,  notFound,  middleware,  requestHasLocale, } from 'astro:i18n';
```

### `getRelativeLocaleUrl()`

[Section titled getRelativeLocaleUrl()](#getrelativelocaleurl)
**Type:** `(locale: string, path?: string, options?: GetLocaleOptions) => string`


Use this function to retrieve a relative path for a locale. If the locale doesn’t exist, Astro throws an error.







```
---import { getRelativeLocaleUrl } from 'astro:i18n';
getRelativeLocaleUrl("fr");// returns /fr
getRelativeLocaleUrl("fr", "");// returns /fr
getRelativeLocaleUrl("fr", "getting-started");// returns /fr/getting-started
getRelativeLocaleUrl("fr_CA", "getting-started", {  prependWith: "blog"});// returns /blog/fr-ca/getting-started
getRelativeLocaleUrl("fr_CA", "getting-started", {  prependWith: "blog",  normalizeLocale: false});// returns /blog/fr_CA/getting-started---
```

### `getAbsoluteLocaleUrl()`

[Section titled getAbsoluteLocaleUrl()](#getabsolutelocaleurl)
**Type:** `(locale: string, path: string, options?: GetLocaleOptions) => string`


Use this function to retrieve an absolute path for a locale when \[`site`] has a value. If \[`site`] isn’t configured, the function returns a relative URL. If the locale doesn’t exist, Astro throws an error.




src/pages/index.astro


```
---import { getAbsoluteLocaleUrl } from 'astro:i18n';
// If `site` is set to be `https://example.com`
getAbsoluteLocaleUrl("fr");// returns https://example.com/fr
getAbsoluteLocaleUrl("fr", "");// returns https://example.com/fr
getAbsoluteLocaleUrl("fr", "getting-started");// returns https://example.com/fr/getting-started
getAbsoluteLocaleUrl("fr_CA", "getting-started", {  prependWith: "blog"});// returns https://example.com/blog/fr-ca/getting-started
getAbsoluteLocaleUrl("fr_CA", "getting-started", {  prependWith: "blog",  normalizeLocale: false});// returns https://example.com/blog/fr_CA/getting-started---
```

### `getRelativeLocaleUrlList()`

[Section titled getRelativeLocaleUrlList()](#getrelativelocaleurllist)
**Type:** `(path?: string, options?: GetLocaleOptions) => string[]`


Use this like [`getRelativeLocaleUrl`](#getrelativelocaleurl) to return a list of relative paths for all the locales.


### `getAbsoluteLocaleUrlList()`

[Section titled getAbsoluteLocaleUrlList()](#getabsolutelocaleurllist)
**Type:** `(path?: string, options?: GetLocaleOptions) => string[]`


Use this like [`getAbsoluteLocaleUrl`](/en/guides/internationalization/#custom-locale-paths) to return a list of absolute paths for all the locales.


### `getPathByLocale()`

[Section titled getPathByLocale()](#getpathbylocale)
**Type:** `(locale: string) => string`


A function that returns the `path` associated to one or more `codes` when [custom locale paths](/en/guides/internationalization/#custom-locale-paths) are configured.




astro.config.mjs


```
export default defineConfig({  i18n: {    locales: ["es", "en", {      path: "french",      codes: ["fr", "fr-BR", "fr-CA"]    }]  }})
```



src/pages/index.astro


```
---import { getPathByLocale } from 'astro:i18n';
getPathByLocale("fr"); // returns "french"getPathByLocale("fr-CA"); // returns "french"---
```

### `getLocaleByPath()`

[Section titled getLocaleByPath()](#getlocalebypath)
**Type:** `(path: string) => string`


A function that returns the `code` associated to a locale `path`.




astro.config.mjs


```
export default defineConfig({  i18n: {    locales: ["es", "en", {      path: "french",      codes: ["fr", "fr-BR", "fr-CA"]    }]  }})
```



src/pages/index.astro


```
---import { getLocaleByPath } from 'astro:i18n';
getLocaleByPath("french"); // returns "fr" because that's the first code configured---
```

### `redirectToDefaultLocale()`

[Section titled redirectToDefaultLocale()](#redirecttodefaultlocale)
**Type:** `(context: APIContext, statusCode?: ValidRedirectStatus) => Promise<Response>`  



**Added in:**
`astro@4.6.0`

Note

Available only when `i18n.routing` is set to `"manual"`


A function that returns a `Response` that redirects to the `defaultLocale` configured. It accepts an optional valid redirect status code.




middleware.js


```
import { defineMiddleware } from "astro:middleware";import { redirectToDefaultLocale } from "astro:i18n";
export const onRequest = defineMiddleware((context, next) => {  if (context.url.pathname.startsWith("/about")) {    return next();  } else {    return redirectToDefaultLocale(context, 302);  }})
```

### `redirectToFallback()`

[Section titled redirectToFallback()](#redirecttofallback)
**Type:** `(context: APIContext, response: Response) => Promise<Response>`  



**Added in:**
`astro@4.6.0`

Note

Available only when `i18n.routing` is set to `"manual"`


A function that allows you to use your [`i18n.fallback` configuration](/en/reference/configuration-reference/#i18nfallback) in your own middleware.




middleware.js


```
import { defineMiddleware } from "astro:middleware";import { redirectToFallback } from "astro:i18n";
export const onRequest = defineMiddleware(async (context, next) => {  const response = await next();  if (response.status >= 300) {    return redirectToFallback(context, response)  }  return response;})
```

### `notFound()`

[Section titled notFound()](#notfound)
**Type:** `(context: APIContext, response?: Response) => Promise<Response> | undefined`  



**Added in:**
`astro@4.6.0`

Note

Available only when `i18n.routing` is set to `"manual"`


Use this function in your routing middleware to return a 404 when:


* the current path isn’t a root. e.g. `/` or `/<base>`
* the URL doesn’t contain a locale


When a `Response` is passed, the new `Response` emitted by this function will contain the same headers of the original response.




middleware.js


```
import { defineMiddleware } from "astro:middleware";import { notFound } from "astro:i18n";
export const onRequest = defineMiddleware((context, next) => {  const pathNotFound = notFound(context);  if (pathNotFound) {    return pathNotFound;  }  return next();})
```

### `middleware()`

[Section titled middleware()](#middleware)
**Type:** `(options: { prefixDefaultLocale: boolean, redirectToDefaultLocale: boolean }) => MiddlewareHandler`  



**Added in:**
`astro@4.6.0`

Note

Available only when `i18n.routing` is set to `"manual"`


A function that allows you to programmatically create the Astro i18n middleware.


This is use useful when you still want to use the default i18n logic, but add only a few exceptions to your website.




middleware.js


```
import { middleware } from "astro:i18n";import { sequence, defineMiddleware } from "astro:middleware";
const customLogic = defineMiddleware(async (context, next) => {  const response = await next();
  // Custom logic after resolving the response.  // It's possible to catch the response coming from Astro i18n middleware.
  return response;});
export const onRequest = sequence(customLogic, middleware({  prefixDefaultLocale: true,  redirectToDefaultLocale: false}))
```

### `requestHasLocale()`

[Section titled requestHasLocale()](#requesthaslocale)
**Type:** `(context: APIContext) => boolean`  



**Added in:**
`astro@4.6.0`

Note

Available only when `i18n.routing` is set to `"manual"`


Checks whether the current URL contains a configured locale. Internally, this function will use `APIContext#url.pathname`.




middleware.js


```
import { defineMiddleware } from "astro:middleware";import { requestHasLocale } from "astro:i18n";
export const onRequest = defineMiddleware(async (context, next) => {  if (requestHasLocale(context)) {    return next();  }  return new Response("Not found", { status: 404 });})
```

Reference