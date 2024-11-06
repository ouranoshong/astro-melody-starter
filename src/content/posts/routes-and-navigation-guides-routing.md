---
author: AA
category:
- One
cover: https://images.unsplash.com/photo-1443641723753-250ff9bb3c83?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw5fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: black concrete building during daytime
description: An intro to routing with Astro.
pubDate: 2024-01-20 00:00:00
slug: routes-and-navigation-guides-routing
tags:
- documentation
- Go
- Sass
title: Routing 
---

Astro uses **file\-based routing** to generate your build URLs based on the file layout of your project `src/pages/` directory.


Navigating between pages
------------------------

[Section titled Navigating between pages](#navigating-between-pages)
Astro uses standard HTML [`<a>` elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) to navigate between routes. There is no framework\-specific `<Link>` component provided.




src/pages/index.astro


```
<p>Read more <a href="/about/">about</a> Astro!</p>
<!-- With `base: "/docs"` configured --><p>Learn more in our <a href="/docs/reference/">reference</a> section!</p>
```

Static routes
-------------

[Section titled Static routes](#static-routes)
`.astro` [page components](/en/basics/astro-pages/) as well as Markdown and MDX Files (`.md`, `.mdx`) within the `src/pages/` directory **automatically become pages on your website**. Each page’s route corresponds to its path and filename within the `src/pages/` directory.







```
# Example: Static routessrc/pages/index.astro        -> mysite.com/src/pages/about.astro        -> mysite.com/aboutsrc/pages/about/index.astro  -> mysite.com/aboutsrc/pages/about/me.astro     -> mysite.com/about/mesrc/pages/posts/1.md         -> mysite.com/posts/1
```

Tip

There is no separate “routing config” to maintain in an Astro project! When you add a file to the `src/pages/` directory, a new route is automatically created for you. In static builds, you can customize the file output format using the [`build.format`](/en/reference/configuration-reference/#buildformat) configuration option.


Dynamic routes
--------------

[Section titled Dynamic routes](#dynamic-routes)
An Astro page file can specify dynamic route parameters in its filename to generate multiple, matching pages. For example, `src/pages/authors/[author].astro` generates a bio page for every author on your blog. `author` becomes a *parameter* that you can access from inside the page.


In Astro’s default static output mode, these pages are generated at build time, and so you must predetermine the list of `author`s that get a corresponding file. In SSR mode, a page will be generated on request for any route that matches.


### Static (SSG) Mode

[Section titled Static (SSG) Mode](#static-ssg-mode)
Because all routes must be determined at build time, a dynamic route must export a `getStaticPaths()` that returns an array of objects with a `params` property. Each of these objects will generate a corresponding route.


`[dog].astro` defines the dynamic `dog` parameter in its filename, so the objects returned by `getStaticPaths()` must include `dog` in their `params`. The page can then access this parameter using `Astro.params`.




src/pages/dogs/\[dog].astro


```
---export function getStaticPaths() {  return [    {params: {dog: 'clifford'}},    {params: {dog: 'rover'}},    {params: {dog: 'spot'}},  ];}
const { dog } = Astro.params;---<div>Good dog, {dog}!</div>
```

This will generate three pages: `/dogs/clifford`, `/dogs/rover`, and `/dogs/spot`, each displaying the corresponding dog name.


The filename can include multiple parameters, which must all be included in the `params` objects in `getStaticPaths()`:




src/pages/\[lang]\-\[version]/info.astro


```
---export function getStaticPaths () { return [    {params: {lang: 'en', version: 'v1'}},    {params: {lang: 'fr', version: 'v2'}},  ];}
const { lang, version } = Astro.params;---...
```

This will generate `/en-v1/info` and `/fr-v2/info`.


Parameters can be included in separate parts of the path. For example, the file `src/pages/[lang]/[version]/info.astro` with the same `getStaticPaths()` above will generate the routes `/en/v1/info` and `/fr/v2/info`.




Learn more about [`getStaticPaths()`](/en/reference/api-reference/#getstaticpaths).




**Related recipe:**
[Add i18n features](/en/recipes/i18n/) 


#### Rest parameters

[Section titled Rest parameters](#rest-parameters)
If you need more flexibility in your URL routing, you can use a [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) (`[...path]`) in your `.astro` filename to match file paths of any depth:




src/pages/sequences/\[...path].astro


```
---export function getStaticPaths() {  return [    {params: {path: 'one/two/three'}},    {params: {path: 'four'}},    {params: {path: undefined }}  ]}
const { path } = Astro.params;---...
```

This will generate `/sequences/one/two/three`, `/sequences/four`, and `/sequences`. (Setting the rest parameter to `undefined` allows it to match the top level page.)


Rest parameters can be used with **other named parameters**. For example, GitHub’s file viewer can be represented with the following dynamic route:







```
/[org]/[repo]/tree/[branch]/[...file]
```

In this example, a request for `/withastro/astro/tree/main/docs/public/favicon.svg` would be split into the following named parameters:







```
{  org: 'withastro',  repo: 'astro',  branch: 'main',  file: 'docs/public/favicon.svg'}
```

#### Example: Dynamic pages at multiple levels

[Section titled Example: Dynamic pages at multiple levels](#example-dynamic-pages-at-multiple-levels)
In the following example, a rest parameter (`[...slug]`) and the [`props`](/en/reference/api-reference/#data-passing-with-props) feature of `getStaticPaths()` generate pages for slugs of different depths.




src/pages/\[...slug].astro


```
---export async function getStaticPaths() {  const pages = [    {      slug: undefined,      title: "Astro Store",      text: "Welcome to the Astro store!",    },    {      slug: "products",      title: "Astro products",      text: "We have lots of products for you",    },    {      slug: "products/astro-handbook",      title: "The ultimate Astro handbook",      text: "If you want to learn Astro, you must read this book.",    },  ];  return pages.map(({ slug, title, text }) => {    return {      params: { slug },      props: { title, text },    };  });}
const { title, text } = Astro.props;---<html>  <head>    <title>{title}</title>  </head>  <body>    <h1>{title}</h1>    <p>{text}</p>  </body></html>
```

### Server (SSR) Mode

[Section titled Server (SSR) Mode](#server-ssr-mode)
In [SSR mode](/en/guides/server-side-rendering/), dynamic routes are defined the same way: include `[param]` or `[...path]` brackets in your file names to match arbitrary strings or paths. But because the routes are no longer built ahead of time, the page will be served to any matching route. Since these are not “static” routes, `getStaticPaths` should not be used.




src/pages/resources/\[resource]/\[id].astro


```
---const { resource, id } = Astro.params;---<h1>{resource}: {id}</h1>
```

This page will be served for any value of `resource` and `id`: `resources/users/1`, `resources/colors/blue`, etc.


#### Modifying the `[...slug]` example for SSR

[Section titled Modifying the \[...slug] example for SSR](#modifying-the-slug-example-for-ssr)
Because SSR pages can’t use `getStaticPaths()`, they can’t receive props. The [previous example](#example-dynamic-pages-at-multiple-levels) can be adapted for SSR mode by looking up the value of the `slug` param in an object. If the route is at the root (”/”), the slug param will be `undefined`. If the value doesn’t exist in the object, we redirect to a 404 page.




src/pages/\[...slug].astro


```
---const pages = [  {    slug: undefined,    title: 'Astro Store',    text: 'Welcome to the Astro store!',  },  {    slug: 'products',    title: 'Astro products',    text: 'We have lots of products for you',  },  {    slug: 'products/astro-handbook',    title: 'The ultimate Astro handbook',    text: 'If you want to learn Astro, you must read this book.',  }];
const { slug } = Astro.params;const page = pages.find((page) => page.slug === slug);if (!page) return Astro.redirect("/404");const { title, text } = page;---<html><head>  <title>{title}</title></head><body>  <h1>{title}</h1>  <p>{text}</p></body></html>
```

Redirects
---------

[Section titled Redirects](#redirects)
Sometimes you will need to redirect your readers to a new page, either permanently because your site structure has changed or in response to an action such as logging in to an authenticated route.


You can define rules to [redirect users to permanently\-moved pages](#configured-redirects) in your Astro config. Or, [redirect users dynamically](#dynamic-redirects) as they use your site.


### Configured Redirects

[Section titled Configured Redirects](#configured-redirects)

**Added in:**
`astro@2.9.0`



You can specify a mapping of permanent redirects in your Astro config with the `redirects` value. For most redirects, this is a mapping of an old route to the new route:




astro.config.mjs


```
import { defineConfig } from 'astro/config';
export default defineConfig({  redirects: {    '/old-page': '/new-page'  }});
```

These redirects follow [the same priority rules as file\-based routes](#route-priority-order) and will always take lower precedence than an existing page file of the same name in your project. For example, `/old-page` will not redirect to `/new-page` if your project contains the file `src/pages/old-page.astro`.


Dynamic routes are allowed as long as both the new and old routes contain the same parameters, for example:







```
{  "/blog/[...slug]": "/articles/[...slug]"}
```

Using SSR or a static adapter, you can also provide an object as the value, allowing you to specify the `status` code in addition to the new `destination`:




astro.config.mjs


```
import { defineConfig } from 'astro/config';
export default defineConfig({  redirects: {    '/old-page': {      status: 302,      destination: '/new-page'    }  }});
```

When running `astro build`, Astro will output HTML files with the [meta refresh](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#examples) tag by default. Supported adapters will instead write out the host’s configuration file with the redirects.


The status code is `301` by default. If building to HTML files the status code is not used by the server.


### Dynamic redirects

[Section titled Dynamic redirects](#dynamic-redirects)
On the `Astro` global, the `Astro.redirect` method allows you to redirect to another page dynamically. You might do this after checking if the user is logged in by getting their session from a cookie.




src/pages/account.astro


```
---import { isLoggedIn } from '../utils';
const cookie = Astro.request.headers.get('cookie');
// If the user is not logged in, redirect them to the login pageif (!isLoggedIn(cookie)) {  return Astro.redirect('/login');}---<html>  <!-- Page here... --></html>
```

Rewrites
--------

[Section titled Rewrites](#rewrites)

**Added in:**
`astro@4.13.0`



A rewrite allows you to serve a different route without redirecting the browser to a different page. The browser will show the original address in the URL bar, but will instead display the content of the URL provided to [`Astro.rewrite()`](/en/reference/api-reference/#astrorewrite).


Tip

For content that has permanently moved, or to direct your user to a different page with a new URL (e.g. a user dashboard after logging in), use a [redirect](#redirects) instead.


Rewrites can be useful for showing the same content at multiple paths (e.g. `/products/shoes/men/` and `/products/men/shoes/`) without needing to maintain two different source files.


Rewrites are also useful for SEO purposes and user experience. They allow you to display content that otherwise would require redirecting your visitor to a different page or would return a 404 status. One common use of rewrites is to show the same localized content for different variants of a language.


The following example uses a rewrite to render the `/es/` version of a page when the `/es-CU/` (Cuban Spanish) URL path is visited. When a visitor navigates to the URL `/es-cu/articles/introduction`, Astro will render the content generated by the file `src/pages/es/articles/introduction.astro`.




src/pages/es\-cu/articles/introduction.astro


```
---return Astro.rewrite("/es/articles/introduction")---
```

Use `context.rewrite()` in your endpoint files to reroute to a different page:




src/pages/api.js


```
export function GET(context) {  if (!context.locals.allowed) {    return context.rewrite("/")  }}
```

If the URL passed to `Astro.rewrite()` emits a runtime error, Astro will show the overlay error in development and return a 500 status code in production. If the URL does not exist in your project, a 404 status code will be returned.


You can intentionally create a rewrite to render your `/404` page, for example to indicate that a product in your e\-commerce shop is no longer available:




src/pages/\[item].astro


```
---const { item } = Astro.params;
if (!itemExists(item)) {  return Astro.rewrite("/404")}---
<div>...</div>
```

You can also conditionally rewrite based on an HTTP response status, for example to display a certain page on your site when visiting a URL that doesn’t exist:




src/middleware.mjs


```
export const onRequest = async (context, next) => {  const response = await next();  if (response.status === 404) {    return context.rewrite("/");  }  return response;}
```

Before displaying the content from the specified rewrite path, the function `Astro.rewrite()` will trigger a new, complete rendering phase. This re\-executes any middleware for the new route/request.




See the [`Astro.rewrite()` API reference](/en/reference/api-reference/#astrorewrite) for more information.

Route Priority Order
--------------------

[Section titled Route Priority Order](#route-priority-order)
It’s possible for multiple defined routes to attempt to build the same URL path. For example, all of these routes could build `/posts/create`:


* Directorysrc/pages/

	+ \[…slug].astro
	+ Directoryposts/
	
		- create.astro
		- \[page].astro
		- \[pid].ts
		- \[…slug].astro

Astro needs to know which route should be used to build the page. To do so, it sorts them according to the following rules in order:


* Astro [reserved routes](#reserved-routes)
* Routes with more path segments will take precedence over less specific routes. In the example above, all routes under `/posts/` take precedence over `/[...slug].astro` at the root.
* Static routes without path parameters will take precedence over dynamic routes. E.g. `/posts/create.astro` takes precedence over all the other routes in the example.
* Dynamic routes using named parameters take precedence over rest parameters. E.g. `/posts/[page].astro` takes precedence over `/posts/[...slug].astro`.
* Pre\-rendered dynamic routes take precedence over server dynamic routes.
* Endpoints take precedence over pages.
* File\-based routes take precedence over redirects.
* If none of the rules above decide the order, routes are sorted alphabetically based on the default locale of your Node installation.


Given the example above, here are a few examples of how the rules will match a requested URL to the route used to build the HTML:


* `pages/posts/create.astro` \- Will build only `/posts/create`
* `pages/posts/[pid].ts` \- Will build `/posts/abc`, `/posts/xyz`, etc. But not `/posts/create`
* `pages/posts/[page].astro` \- Will build `/posts/1`, `/posts/2`, etc. But not `/posts/create`, `/posts/abc` nor `/posts/xyz`
* `pages/posts/[...slug].astro` \- Will build `/posts/1/2`, `/posts/a/b/c`, etc. But not `/posts/create`, `/posts/1`, `/posts/abc`, etc.
* `pages/[...slug].astro` \- Will build `/abc`, `/xyz`, `/abc/xyz`, etc. But not `/posts/create`, `/posts/1`, `/posts/abc`, , etc.


### Reserved routes

[Section titled Reserved routes](#reserved-routes)
Internal routes take priority over any user\-defined or integration\-defined routes as they are required for Astro features to work. The following are Astro’s reserved routes:


* `_astro/`: Serves all of the static assets to the client, including CSS documents, bundled client scripts, optimized images, and any Vite assets.
* `_server_islands/`: Serves the dynamic components deferred into a [server island](/en/reference/configuration-reference/#experimentalserverislands).
* `_actions/`: Serves any defined [actions](/en/guides/actions/).


Pagination
----------

[Section titled Pagination](#pagination)
Astro supports built\-in pagination for large collections of data that need to be split into multiple pages. Astro will generate common pagination properties, including previous/next page URLs, total number of pages, and more.


Paginated route names should use the same `[bracket]` syntax as a standard dynamic route. For instance, the file name `/astronauts/[page].astro` will generate routes for `/astronauts/1`, `/astronauts/2`, etc, where `[page]` is the generated page number.


You can use the `paginate()` function to generate these pages for an array of values like so:




src/pages/astronauts/\[page].astro


```
---export async function getStaticPaths({ paginate }) {  const astronautPages = [{    astronaut: 'Neil Armstrong',  }, {    astronaut: 'Buzz Aldrin',  }, {    astronaut: 'Sally Ride',  }, {    astronaut: 'John Glenn',  }];  // Generate pages from our array of astronauts, with 2 to a page  return paginate(astronautPages, { pageSize: 2 });}// All paginated data is passed on the "page" propconst { page } = Astro.props;---
<!--Display the current page number. Astro.params.page can also be used!--><h1>Page {page.currentPage}</h1><ul>  <!--List the array of astronaut info-->  {page.data.map(({ astronaut }) => <li>{astronaut}</li>)}</ul>
```

This generates the following pages, with 2 items to a page:


* `/astronauts/1` \- Page 1: Displays “Neil Armstrong” and “Buzz Aldrin”
* `/astronauts/2` \- Page 2: Displays “Sally Ride” and “John Glenn”


### The `page` prop

[Section titled The page prop](#the-page-prop)
When you use the `paginate()` function, each page will be passed its data via a `page` prop. The `page` prop has many useful properties that you can use to build pages and links between them:







```
interface Page<T = any> {  /** array containing the page’s slice of data that you passed to the paginate() function */  data: T[];  /** metadata */  /** the count of the first item on the page, starting from 0 */  start: number;  /** the count of the last item on the page, starting from 0 */  end: number;  /** total number of results */  total: number;  /** the current page number, starting from 1 */  currentPage: number;  /** number of items per page (default: 10) */  size: number;  /** number of last page */  lastPage: number;  url: {    /** url of the current page */    current: string;    /** url of the previous page (if there is one) */    prev: string | undefined;    /** url of the next page (if there is one) */    next: string | undefined;    /** url of the first page (if the current page is not the first page) */    first: string | undefined;    /** url of the last page (if the current page in not the last page) */    last: string | undefined;  };}
```

The following example displays current information for the page along with links to navigate between pages:




src/pages/astronauts/\[page].astro


```
---// Paginate same list of { astronaut } objects as the previous exampleexport async function getStaticPaths({ paginate }) { /* ... */ }const { page } = Astro.props;---<h1>Page {page.currentPage}</h1><ul>  {page.data.map(({ astronaut }) => <li>{astronaut}</li>)}</ul>{page.url.first ? <a href={page.url.first}>First</a> : null}{page.url.prev ? <a href={page.url.prev}>Previous</a> : null}{page.url.next ? <a href={page.url.next}>Next</a> : null}{page.url.last ? <a href={page.url.last}>Last</a> : null}
```



Learn more about [the pagination `page` prop](/en/reference/api-reference/#the-pagination-page-prop).

### Nested Pagination

[Section titled Nested Pagination](#nested-pagination)
A more advanced use\-case for pagination is **nested pagination.** This is when pagination is combined with other dynamic route params. You can use nested pagination to group your paginated collection by some property or tag.


For example, if you want to group your paginated Markdown posts by some tag, you would use nested pagination by creating a `/src/pages/[tag]/[page].astro` page that would match the following URLS:


* `/red/1` (tag\=red)
* `/red/2` (tag\=red)
* `/blue/1` (tag\=blue)
* `/green/1` (tag\=green)


Nested pagination works by returning an array of `paginate()` results from `getStaticPaths()`, one for each grouping.


In the following example, we will implement nested pagination to build the URLs listed above:




src/pages/\[tag]/\[page].astro


```
---export async function getStaticPaths({ paginate }) {  const allTags = ['red', 'blue', 'green'];  const allPosts = await Astro.glob('../../posts/*.md');  // For every tag, return a paginate() result.  // Make sure that you pass `{params: {tag}}` to `paginate()`  // so that Astro knows which tag grouping the result is for.  return allTags.flatMap((tag) => {    const filteredPosts = allPosts.filter((post) => post.frontmatter.tag === tag);    return paginate(filteredPosts, {      params: { tag },      pageSize: 10    });  });}const { page } = Astro.props;const params = Astro.params;
```

Excluding pages
---------------

[Section titled Excluding pages](#excluding-pages)
You can exclude pages or directories from being built by prefixing their names with an underscore (`_`). Files with the `_` prefix won’t be recognized by the router and won’t be placed into the `dist/` directory.


You can use this to temporarily disable pages, and also to put tests, utilities, and components in the same folder as their related pages.


In this example, only `src/pages/index.astro` and `src/pages/posts/post1.md` will be built as page routes and HTML files.


* Directorysrc/pages/

	+ Directory\_hidden\-directory/
	
		- page1\.md
		- page2\.md
	+ \_hidden\-page.astro
	+ **index.astro**
	+ Directoryposts/
	
		- \_SomeComponent.astro
		- \_utils.js
		- **post1\.md**

Learn