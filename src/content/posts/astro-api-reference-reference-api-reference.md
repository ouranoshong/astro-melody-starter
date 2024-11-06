---
author: AA
category:
- One
cover: https://images.unsplash.com/photo-1514539079130-25950c84af65?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw1fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: closeup photo of castle with mist
description: ''
pubDate: 2024-02-25 00:00:00
slug: astro-api-reference-reference-api-reference
tags:
- astro
- Go
- Sass
title: Astro Runtime API 
---

`Astro` global
--------------

[Section titled Astro global](#astro-global)
The `Astro` global is available in all contexts in `.astro` files. It has the following functions:


### `Astro.glob()`

[Section titled Astro.glob()](#astroglob)
`Astro.glob()` is a way to load many local files into your static site setup.




src/components/my\-component.astro


```
---const posts = await Astro.glob('../pages/post/*.md'); // returns an array of posts that live at ./src/pages/post/*.md---
<div>{posts.slice(0, 3).map((post) => (  <article>    <h2>{post.frontmatter.title}</h2>    <p>{post.frontmatter.description}</p>    <a href={post.url}>Read more</a>  </article>))}</div>
```

`.glob()` only takes one parameter: a relative URL glob of which local files you’d like to import. It’s asynchronous, and returns an array of the exports from matching files.


`.glob()` can’t take variables or strings that interpolate them, as they aren’t statically analyzable. (See [the troubleshooting guide](/en/guides/troubleshooting/#supported-values) for a workaround.) This is because `Astro.glob()` is a wrapper of Vite’s [`import.meta.glob()`](https://vite.dev/guide/features.html#glob-import).


Note

You can also use `import.meta.glob()` itself in your Astro project. You may want to do this when:

* You need this feature in a file that isn’t `.astro`, like an API route. `Astro.glob()` is only available in `.astro` files, while `import.meta.glob()` is available anywhere in the project.
* You don’t want to load each file immediately. `import.meta.glob()` can return functions that import the file content, rather than returning the content itself. Note that this import includes all styles and scripts for any imported files. These will be bundled and added to the page whether or not a file is actually used, as this is decided by static analysis, not at runtime.
* You want access to each file’s path. `import.meta.glob()` returns a map of a file’s path to its content, while `Astro.glob()` returns a list of content.
* You want to pass multiple patterns; for example, you want to add a “negative pattern” that filters out certain files. `import.meta.glob()` can optionally take an array of glob strings, rather than a single string.

Read more in the [Vite documentation](https://vite.dev/guide/features.html#glob-import).


#### Markdown Files

[Section titled Markdown Files](#markdown-files)
Markdown files loaded with `Astro.glob()` return the following `MarkdownInstance` interface:







```
export interface MarkdownInstance<T extends Record<string, any>> {  /* Any data specified in this file's YAML frontmatter */  frontmatter: T;  /* The absolute file path of this file */  file: string;  /* The rendered path of this file */  url: string | undefined;  /* Astro Component that renders the contents of this file */  Content: AstroComponentFactory;  /** (Markdown only) Raw Markdown file content, excluding layout HTML and YAML frontmatter */  rawContent(): string;  /** (Markdown only) Markdown file compiled to HTML, excluding layout HTML */  compiledContent(): string;  /* Function that returns an array of the h1...h6 elements in this file */  getHeadings(): Promise<{ depth: number; slug: string; text: string }[]>;  default: AstroComponentFactory;}
```

You can optionally provide a type for the `frontmatter` variable using a TypeScript generic.







```
---interface Frontmatter {  title: string;  description?: string;}const posts = await Astro.glob<Frontmatter>('../pages/post/*.md');---
<ul>  {posts.map(post => <li>{post.frontmatter.title}</li>)}</ul>
```

#### Astro Files

[Section titled Astro Files](#astro-files)
Astro files have the following interface:







```
export interface AstroInstance {  /* The file path of this file */  file: string;  /* The URL for this file (if it is in the pages directory) */  url: string | undefined;  default: AstroComponentFactory;}
```

#### Other Files

[Section titled Other Files](#other-files)
Other files may have various different interfaces, but `Astro.glob()` accepts a TypeScript generic if you know exactly what an unrecognized file type contains.







```
---interface CustomDataFile {  default: Record<string, any>;}const data = await Astro.glob<CustomDataFile>('../data/**/*.js');---
```

### `Astro.props`

[Section titled Astro.props](#astroprops)
`Astro.props` is an object containing any values that have been passed as [component attributes](/en/basics/astro-components/#component-props). Layout components for `.md` and `.mdx` files receive frontmatter values as props.




src/components/Heading.astro


```
---const { title, date } = Astro.props;---<div>  <h1>{title}</h1>  <p>{date}</p></div>
```



src/pages/index.astro


```
---import Heading from '../components/Heading.astro';---<Heading title="My First Post" date="09 Aug 2022" />
```



Learn more about how [Markdown and MDX Layouts](/en/guides/markdown-content/#frontmatter-layout-property) handle props.



Learn how to add [TypeScript type definitions for your props](/en/guides/typescript/#component-props).

### `Astro.params`

[Section titled Astro.params](#astroparams)
`Astro.params` is an object containing the values of dynamic route segments matched for this request.


In static builds, this will be the `params` returned by `getStaticPaths()` used for prerendering [dynamic routes](/en/guides/routing/#dynamic-routes).




src/pages/posts/\[id].astro


```
---export function getStaticPaths() {  return [    { params: { id: '1' } },    { params: { id: '2' } },    { params: { id: '3' } }  ];}
const { id } = Astro.params;---<h1>{id}</h1>
```

In SSR builds, this can be any value matching the path segments in the dynamic route pattern.




src/pages/posts/\[id].astro


```
---import { getPost } from '../api';
const post = await getPost(Astro.params.id);
// No posts found with this IDif (!post) {  Astro.redirect("/404")}---<html>  <h1>{post.name}</h1></html>
```

See also: [`params`](#params)


### `Astro.request`

[Section titled Astro.request](#astrorequest)
**Type:** `Request`


`Astro.request` is a standard [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object. It can be used to get the `url`, `headers`, `method`, and even body of the request.







```
<p>Received a {Astro.request.method} request to "{Astro.request.url}".</p><p>Received request headers: <code>{JSON.stringify(Object.fromEntries(Astro.request.headers))}</code>
```

See also: [`Astro.url`](#astrourl)


Note

With the default `output: 'static'` option, `Astro.request.url` does not contain search parameters, like `?foo=bar`, as it’s not possible to determine them ahead of time during static builds. However in `output: 'server'` mode, `Astro.request.url` does contain search parameters as it can be determined from a server request.


### `Astro.response`

[Section titled Astro.response](#astroresponse)
**Type:** `ResponseInit & { readonly headers: Headers }`


`Astro.response` is a standard `ResponseInit` object. It has the following structure.


* `status`: The numeric status code of the response, e.g., `200`.
* `statusText`: The status message associated with the status code, e.g., `'OK'`.
* `headers`: A [`Headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers) instance that you can use to set the HTTP headers of the response.


`Astro.response` is used to set the `status`, `statusText`, and `headers` for a page’s response.







```
---if(condition) {  Astro.response.status = 404;  Astro.response.statusText = 'Not found';}---
```

Or to set a header:







```
---Astro.response.headers.set('Set-Cookie', 'a=b; Path=/;');---
```

### `Astro.cookies`

[Section titled Astro.cookies](#astrocookies)
**Type:** `AstroCookies`  



**Added in:**
`astro@1.4.0`

`Astro.cookies` contains utilities for reading and manipulating cookies in [server\-side rendering](/en/guides/server-side-rendering/) mode.


##### `get`

[Section titled get](#get)
**Type:** `(key: string, options?: [AstroCookieGetOptions](#astrocookiegetoptions)) => [AstroCookie](#astrocookie) | undefined`


Gets the cookie as an [`AstroCookie`](#astrocookie) object, which contains the `value` and utility functions for converting the cookie to non\-string types.


##### `has`

[Section titled has](#has)
**Type:** `(key: string, options?: [AstroCookieGetOptions](#astrocookiegetoptions)) => boolean`


Whether this cookie exists. If the cookie has been set via `Astro.cookies.set()` this will return true, otherwise it will check cookies in the `Astro.request`.


##### `set`

[Section titled set](#set)
**Type:** `(key: string, value: string | object, options?: [AstroCookieSetOptions](#astrocookiesetoptions)) => void`


Sets the cookie `key` to the given value. This will attempt to convert the cookie value to a string. Options provide ways to set [cookie features](https://www.npmjs.com/package/cookie#options-1), such as the `maxAge` or `httpOnly`.


##### `delete`

[Section titled delete](#delete)
**Type:** `(key: string, options?: AstroCookieDeleteOptions) => void`


Invalidates a cookie by setting the expiration date in the past (0 in Unix time).


Once a cookie is “deleted” (expired), `Astro.cookies.has()` will return `false` and `Astro.cookies.get()` will return an [`AstroCookie`](#astrocookie) with a `value` of `undefined`. Options available when deleting a cookie are: `domain`, `path`, `httpOnly`, `sameSite`, and `secure`.


##### `merge`

[Section titled merge](#merge)
**Type:** `(cookies: AstroCookies) => void`


Merges a new `AstroCookies` instance into the current instance. Any new cookies will be added to the current instance and any cookies with the same name will overwrite existing values.


##### `headers`

[Section titled headers](#headers)
**Type:** `() => Iterator<string>`


Gets the header values for `Set-Cookie` that will be sent out with the response.


#### `AstroCookie`

[Section titled AstroCookie](#astrocookie)
Getting a cookie via `Astro.cookies.get()` returns a `AstroCookie` type. It has the following structure.


##### `value`

[Section titled value](#value)
**Type:** `string`


The raw string value of the cookie.


##### `json`

[Section titled json](#json)
**Type:** `() => Record<string, any>`


Parses the cookie value via `JSON.parse()`, returning an object. Throws if the cookie value is not valid JSON.


##### `number`

[Section titled number](#number)
**Type:** `() => number`


Parses the cookie value as a Number. Returns NaN if not a valid number.


##### `boolean`

[Section titled boolean](#boolean)
**Type:** `() => boolean`


Converts the cookie value to a boolean.


#### `AstroCookieGetOptions`

[Section titled AstroCookieGetOptions](#astrocookiegetoptions)

**Added in:**
`astro@4.1.0`



Getting a cookie also allows specifying options via the `AstroCookieGetOptions` interface:


##### `decode`

[Section titled decode](#decode)
**Type:** `(value: string) => string`


Allows customization of how a cookie is deserialized into a value.


#### `AstroCookieSetOptions`

[Section titled AstroCookieSetOptions](#astrocookiesetoptions)

**Added in:**
`astro@4.1.0`



Setting a cookie via `Astro.cookies.set()` allows passing in a `AstroCookieSetOptions` to customize how the cookie is serialized.


##### `domain`

[Section titled domain](#domain)
**Type:** `string`


Specifies the domain. If no domain is set, most clients will interpret to apply to the current domain.


##### `expires`

[Section titled expires](#expires)
**Type:** `Date`


Specifies the date on which the cookie will expire.


##### `httpOnly`

[Section titled httpOnly](#httponly)
**Type:** `boolean`


If true, the cookie will not be accessible client\-side.


##### `maxAge`

[Section titled maxAge](#maxage)
**Type:** `number`


Specifies a number, in seconds, for which the cookie is valid.


##### `path`

[Section titled path](#path)
**Type:** `string`


Specifies a subpath of the domain in which the cookie is applied.


##### `sameSite`

[Section titled sameSite](#samesite)
**Type:** `boolean | 'lax' | 'none' | 'strict'`


Specifies the value of the [SameSite](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-09#section-5.4.7) cookie header.


##### `secure`

[Section titled secure](#secure)
**Type:** `boolean`


If true, the cookie is only set on https sites.


##### `encode`

[Section titled encode](#encode)
**Type:** `(value: string) => string`


Allows customizing how the cookie is serialized.


### `Astro.redirect()`

[Section titled Astro.redirect()](#astroredirect)
**Type:** `(path: string, status?: number) => Response`


Allows you to redirect to another page, and optionally provide an [HTTP response status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages) as a second parameter.


A page (and not a child component) must `return` the result of `Astro.redirect()` for the redirect to occur.


For statically\-generated sites, this will produce a client redirect using a [`<meta http-equiv="refresh">` tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#http-equiv) and does not support status codes.


When using an on\-demand rendering mode, status codes are supported. Astro will serve redirected requests with a default HTTP response status of `302` unless another code is specified.


The following example redirects a user to a login page:




src/pages/account.astro


```
---import { isLoggedIn } from '../utils';
const cookie = Astro.request.headers.get('cookie');
// If the user is not logged in, redirect them to the login pageif (!isLoggedIn(cookie)) {  return Astro.redirect('/login');}---
```

### `Astro.rewrite()`

[Section titled Astro.rewrite()](#astrorewrite)
**Type:** `(rewritePayload: string | URL | Request) => Promise<Response>`  



**Added in:**
`astro@4.13.0`

Allows you to serve content from a different URL or path without redirecting the browser to a new page.


The method accepts either a string, a `URL`, or a `Request` for the location of the path.


Use a string to provide an explicit path:




src/pages/index.astro


```
---return Astro.rewrite("/login")---
```

Use a `URL` type when you need to construct the URL path for the rewrite. The following example renders a page’s parent path by creating a new URL from the relative `"../"` path:




src/pages/blog/index.astro


```
---return Astro.rewrite(new URL("../", Astro.url))---
```

Use a `Request` type for complete control of the `Request` sent to the server for the new path. The following example sends a request to render the parent page while also providing headers:




src/pages/blog/index.astro


```
---return Astro.rewrite(new Request(new URL("../", Astro.url), {  headers: {    "x-custom-header": JSON.stringify(Astro.locals.someValue)  }}))---
```

### `Astro.url`

[Section titled Astro.url](#astrourl)
**Type:** `URL`  



**Added in:**
`astro@1.0.0-rc`

A [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object constructed from the current `Astro.request.url` URL string value. Useful for interacting with individual properties of the request URL, like pathname and origin.


Equivalent to doing `new URL(Astro.request.url)`.


`Astro.url` will be `localhost` in dev mode if [site](/en/reference/configuration-reference/#site) is not configured for static sites, and for on\-demand rendered sites using `server` or `hybrid` output.







```
<h1>The current URL is: {Astro.url}</h1><h1>The current URL pathname is: {Astro.url.pathname}</h1><h1>The current URL origin is: {Astro.url.origin}</h1>
```

You can also use `Astro.url` to create new URLs by passing it as an argument to [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL).




src/pages/index.astro


```
---// Example: Construct a canonical URL using your production domainconst canonicalURL = new URL(Astro.url.pathname, Astro.site);// Example: Construct a URL for SEO meta tags using your current domainconst socialImageURL = new URL('/images/preview.png', Astro.url);---<link rel="canonical" href={canonicalURL} /><meta property="og:image" content={socialImageURL} />
```

### `Astro.clientAddress`

[Section titled Astro.clientAddress](#astroclientaddress)
**Type:** `string`  



**Added in:**
`astro@1.0.0-rc`

Specifies the [IP address](https://en.wikipedia.org/wiki/IP_address) of the request. This property is only available when building for SSR (server\-side rendering) and should not be used for static sites.







```
---const ip = Astro.clientAddress;---
<div>Your IP address is: <span class="address">{ ip }</span></div>
```

### `Astro.site`

[Section titled Astro.site](#astrosite)
**Type:** `URL | undefined`


`Astro.site` returns a `URL` made from `site` in your Astro config. If `site` in your Astro config isn’t defined, `Astro.site` won’t be defined.


### `Astro.generator`

[Section titled Astro.generator](#astrogenerator)
**Type:** `string`  



**Added in:**
`astro@1.0.0`

`Astro.generator` is a convenient way to add a [`<meta name="generator">`](https://html.spec.whatwg.org/multipage/semantics.html#meta-generator) tag with your current version of Astro. It follows the format `"Astro v1.x.x"`.







```
<html>  <head>    <meta name="generator" content={Astro.generator} />  </head>  <body>    <footer>      <p>Built with <a href="https://astro.build">{Astro.generator}</a></p>    </footer>  </body></html>
```

### `Astro.slots`

[Section titled Astro.slots](#astroslots)
`Astro.slots` contains utility functions for modifying an Astro component’s slotted children.


#### `Astro.slots.has()`

[Section titled Astro.slots.has()](#astroslotshas)
**Type:** `(slotName: string) => boolean`


You can check whether content for a specific slot name exists with `Astro.slots.has()`. This can be useful when you want to wrap slot contents, but only want to render the wrapper elements when the slot is being used.




src/pages/index.astro


```
------<slot />
{Astro.slots.has('more') && (  <aside>    <h2>More</h2>    <slot name="more" />  </aside>)}
```

#### `Astro.slots.render()`

[Section titled Astro.slots.render()](#astroslotsrender)
**Type:** `(slotName: string, args?: any[]) => Promise<string>`


You can asynchronously render the contents of a slot to a string of HTML using `Astro.slots.render()`.







```
---const html = await Astro.slots.render('default');---<Fragment set:html={html} />
```

Note

This is for advanced use cases! In most circumstances, it is simpler to render slot contents with [the `<slot />` element](/en/basics/astro-components/#slots).


`Astro.slots.render()` optionally accepts a second argument: an array of parameters that will be forwarded to any function children. This can be useful for custom utility components.


For example, this `<Shout />` component converts its `message` prop to uppercase and passes it to the default slot:




src/components/Shout.astro


```
---const message = Astro.props.message.toUpperCase();let html = '';if (Astro.slots.has('default')) {  html = await Astro.slots.render('default', [message]);}---<Fragment set:html={html} />
```

A callback function passed as `<Shout />`’s child will receive the all\-caps `message` parameter:




src/pages/index.astro


```
---import Shout from "../components/Shout.astro";---<Shout message="slots!">  {(message) => <div>{message}</div>}</Shout>
<!-- renders as <div>SLOTS!</div> -->
```

Callback functions can be passed to named slots inside a wrapping HTML element tag with a `slot` attribute. This element is only used to transfer the callback to a named slot and will not be rendered onto the page.







```
<Shout message="slots!">  <fragment slot="message">    {(message) => <div>{message}</div>}  </fragment></Shout>
```

Use a standard HTML element for the wrapping tag, or any lower case tag (e.g. `<fragment>` instead of `<Fragment />`) that will not be interpreted as a component. Do not use the HTML `<slot>` element as this will be interpreted as an Astro slot.


### `Astro.self`

[Section titled Astro.self](#astroself)
`Astro.self` allows Astro components to be recursively called. This behaviour lets you render an Astro component from within itself by using `<Astro.self>` in the component template. This can be helpful for iterating over large data stores and nested data\-structures.




NestedList.astro


```
---const { items } = Astro.props;---<ul class="nested-list">  {items.map((item) => (    <li>      <!-- If there is a nested data-structure we render `<Astro.self>` -->      <!-- and can pass props through with the recursive call -->      {Array.isArray(item) ? (        <Astro.self items={item} />      ) : (        item      )}    </li>  ))}</ul>
```

This component could then be used like this:







```
---import NestedList from './NestedList.astro';---<NestedList items={['A', ['B', 'C'], 'D']} />
```

And would render HTML like this:







```
<ul class="nested-list">  <li>A</li>  <li>    <ul class="nested-list">      <li>B</li>      <li>C</li>    </ul>  </li>  <li>D</li></ul>
```

### `Astro.locals`

[Section titled Astro.locals](#astrolocals)

**Added in:**
`astro@2.4.0`



`Astro.locals` is an object containing any values from the [`context.locals`](#contextlocals) object from a middleware. Use this to access data returned by middleware in your `.astro` files.




src/pages/Orders.astro


```
---const title = Astro.locals.welcomeTitle();const orders = Array.from(Astro.locals.orders.entries());---<h1>{title}</h1><ul>    {orders.map(order => {        return <li>{/* do something with each order */}</li>    })}</ul>
```

### `Astro.preferredLocale`

[Section titled Astro.preferredLocale](#astropreferredlocale)
**Type:** `string | undefined`  



**Added in:**
`astro@3.5.0`

`Astro.preferredLocale` is a computed value that represents the preferred locale of the user.


It is computed by checking the configured locales in your `i18n.locales` array and locales supported by the users’s browser via the header `Accept-Language`. This value is `undefined` if no such match exists.


This property is only available when building for SSR (server\-side rendering) and should not be used for static sites.


### `Astro.preferredLocaleList`

[Section titled Astro.preferredLocaleList](#astropreferredlocalelist)
**Type:** `string[] | undefined`  



**Added in:**
`astro@3.5.0`

`Astro.preferredLocaleList` represents the array of all locales that are both requested by the browser and supported by your website. This produces a list of all compatible languages between your site and your visitor.


If none of the browser’s requested languages are found in your locales array, then the value is `[]`: you do not support any of your visitor’s preferred locales.


If the browser does not specify any preferred languages, then this value will be [`i18n.locales`](/en/reference/configuration-reference/#i18nlocales): all of your supported locales will be considered equally preferred by a visitor with no preferences.


This property is only available when building for SSR (server\-side rendering) and should not be used for static sites.


### `Astro.currentLocale`

[Section titled Astro.currentLocale](#astrocurrentlocale)
**Type:** `string | undefined`  



**Added in:**
`astro@3.5.6`

The locale computed from the current URL, using the syntax specified in your `locales` configuration. If the URL does not contain a `/[locale]/` prefix, then the value will default to `i18n.defaultLocale`.


### `Astro.getActionResult()`

[Section titled Astro.getActionResult()](#astrogetactionresult)
**Type:** `(action: TAction) => ActionReturnType<TAction> | undefined`  



**Added in:**
`astro@4.15.0`

`Astro.getActionResult()` is a function that returns the result of an [Action](/en/guides/actions/) submission. This accepts an action function as an argument (e.g. `actions.logout`) and returns a `data` or `error` object when a submission is received. Otherwise, it will return `undefined`.




src/pages/index.astro


```
---import { actions } from 'astro:actions';
const result = Astro.getActionResult(actions.logout);---
<form action={actions.logout}>  <button type="submit">Log out</button></form>{result?.error && <p>Failed to log out. Please try again.</p>}
```

### `Astro.callAction()`

[Section titled Astro.callAction()](#astrocallaction)

**Added in:**
`astro@4.15.0`



`Astro.callAction()` is a function used to call an Action handler directly from your Astro component. This function accepts an Action function as the first argument (e.g. `actions.logout`) and any input that action receives as the second argument. It returns the result of the action as a promise.




src/pages/index.astro


```
---import { actions } from 'astro:actions';
const { data, error } = await Astro.callAction(actions.logout, { userId: '123' });---
```

Endpoint Context
----------------

[Section titled Endpoint Context](#endpoint-context)
[Endpoint functions](/en/guides/endpoints/) receive a context object as the first parameter. It mirrors many of the `Astro` global properties.




endpoint.json.ts


```
import type { APIContext } from 'astro';
export function GET(context: APIContext) {  // ...}
```

### `context.params`

[Section titled context.params](#contextparams)
`context.params` is an object containing the values of dynamic route segments matched for this request.


In static builds, this will be the `params` returned by `getStaticPaths()` used for prerendering [dynamic routes](/en/guides/routing/#dynamic-routes).


In SSR builds, this can be any value matching the path segments in the dynamic route pattern.




src/pages/posts/\[id].json.ts


```
import type { APIContext } from 'astro';
export function getStaticPaths() {  return [    { params: { id: '1' } },    { params: { id: '2' } },    { params: { id: '3' } }  ];}
export function GET({ params }: APIContext) {  return new Response(    JSON.stringify({ id: params.id }),  );}
```

See also: [`params`](#params)


### `context.props`

[Section titled context.props](#contextprops)

**Added in:**
`astro@1.5.0`



`context.props` is an object containing any `props` passed from `getStaticPaths()`. Because `getStaticPaths()` is not used when building for SSR (server\-side rendering), `context.props` is only available in static builds.




src/pages/posts/\[id].json.ts


```
import type { APIContext } from 'astro';
export function getStaticPaths() {  return [    { params: { id: '1' }, props: { author: 'Blu' } },    { params: { id: '2' }, props: { author: 'Erika' } },    { params: { id: '3' }, props: { author: 'Matthew' } }  ];}
export function GET({ props }: APIContext) {  return new Response(    JSON.stringify({ author: props.author }),  );}
```

See also: [Data Passing with `props`](#data-passing-with-props)


### `context.request`

[Section titled context.request](#contextrequest)
**Type:** `Request`


A standard [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object. It can be used to get the `url`, `headers`, `method`, and even body of the request.







```
import type { APIContext } from 'astro';
export function GET({ request }: APIContext) {  return new Response(`Hello ${request.url}`);}
```

See also: [Astro.request](#astrorequest)


### `context.cookies`

[Section titled context.cookies](#contextcookies)
**Type:** `AstroCookies`


`context.cookies` contains utilities for reading and manipulating cookies.


See also: [Astro.cookies](#astrocookies)


### `context.url`

[Section titled context.url](#contexturl)
**Type:** `URL`  



**Added in:**
`astro@1.5.0`

A [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object constructed from the current `context.request.url` URL string value.


See also: [Astro.url](#astrourl)


### `context.clientAddress`

[Section titled context.clientAddress](#contextclientaddress)
**Type:** `string`  



**Added in:**
`astro@1.5.0`

Specifies the [IP address](https://en.wikipedia.org/wiki/IP_address) of the request. This property is only available when building for SSR (server\-side rendering) and should not be used for static sites.







```
import type { APIContext } from 'astro';
export function GET({ clientAddress }: APIContext) {  return new Response(`Your IP address is: ${clientAddress}`);}
```

See also: [Astro.clientAddress](#astroclientaddress)


### `context.site`

[Section titled context.site](#contextsite)
**Type:** `URL | undefined`  



**Added in:**
`astro@1.5.0`

`context.site` returns a `URL` made from `site` in your Astro config. If undefined, this will return a URL generated from `localhost`.


See also: [Astro.site](#astrosite)


### `context.generator`

[Section titled context.generator](#contextgenerator)
**Type:** `string`  



**Added in:**
`astro@1.5.0`

`context.generator` is a convenient way to indicate the version of Astro your project is running. It follows the format `"Astro v1.x.x"`.




src/pages/site\-info.json.ts


```
import type { APIContext } from 'astro';
export function GET({ generator, site }: APIContext) {  const body = JSON.stringify({ generator, site });  return new Response(body);}
```

See also: [Astro.generator](#astrogenerator)


### `context.redirect()`

[Section titled context.redirect()](#contextredirect)
**Type:** `(path: string, status?: number) => Response`  



**Added in:**
`astro@1.5.0`

`context.redirect()` returns a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object that allows you to redirect to another page. This function is only available when building for SSR (server\-side rendering) and should not be used for static sites.







```
import type { APIContext } from 'astro';
export function GET({ redirect }: APIContext) {  return redirect('/login', 302);}
```

See also: [`Astro.redirect()`](#astroredirect)


### `context.rewrite()`

[Section titled context.rewrite()](#contextrewrite)
**Type:** `(rewritePayload: string | URL | Request) => Promise<Response>`  



**Added in:**
`astro@4.13.0`

Allows you to serve content from a different URL or path without redirecting the browser to a new page.


The method accepts either a string, a `URL`, or a `Request` for the location of the path.


Use a string to provide an explicit path:







```
import type { APIContext } from 'astro';
export function GET({ rewrite }: APIContext) {  return rewrite('/login');}
```

Use a `URL` type when you need to construct the URL path for the rewrite. The following example renders a page’s parent path by creating a new URL from the relative `"../"` path:







```
import type { APIContext } from 'astro';
export function GET({ rewrite }: APIContext) {  return rewrite(new URL("../", Astro.url));}
```

Use a `Request` type for complete control of the `Request` sent to the server for the new path. The following example sends a request to render the parent page while also providing headers:







```
import type { APIContext } from 'astro';
export function GET({ rewrite }: APIContext) {  return rewrite(new Request(new URL("../", Astro.url), {   headers: {     "x-custom-header": JSON.stringify(Astro.locals.someValue)   } }));}
```

See also: [`Astro.rewrite()`](#astrorewrite)


### `context.locals`

[Section titled context.locals](#contextlocals)

**Added in:**
`astro@2.4.0`



`context.locals` is an object used to store and access arbitrary information during the lifecycle of a request.


Middleware functions can read and write the values of `context.locals`:




src/middleware.ts


```
import type { MiddlewareHandler } from 'astro';
export const onRequest: MiddlewareHandler = ({ locals }, next) => {  if (!locals.title) {    locals.title = "Default Title";  }  return next();}
```

API endpoints can only read information from `context.locals`:




src/pages/hello.ts


```
import type { APIContext } from 'astro';
export function GET({ locals }: APIContext) {  return new Response(locals.title); // "Default Title"}
```

See also: [`Astro.locals`](#astrolocals)


### `context.getActionResult()`

[Section titled context.getActionResult()](#contextgetactionresult)
**Type:** `(action: TAction) => ActionReturnType<TAction> | undefined`  



**Added in:**
`astro@4.15.0`

`context.getActionResult()` is a function that returns the result of an [Action](/en/guides/actions/) submission. This accepts an action function as an argument (e.g. `actions.logout`), and returns a `data` or `error` object when a submission is received. Otherwise, it will return `undefined`.


See also [`Astro.getActionResult()`](#astrogetactionresult)


### `context.callAction()`

[Section titled context.callAction()](#contextcallaction)

**Added in:**
`astro@4.15.0`



`context.callAction()` is a function used to call an Action handler directly from your Astro component. This function accepts an Action function as the first argument (e.g. `actions.logout`) and any input that action receives as the second argument. It returns the result of the action as a promise.


See also [`Astro.callAction()`](#astrocallaction)


`getStaticPaths()`
------------------

[Section titled getStaticPaths()](#getstaticpaths)
**Type:** `(options: GetStaticPathsOptions) => Promise<GetStaticPathsResult> | GetStaticPathsResult`


If a page uses dynamic params in the filename, that component will need to export a `getStaticPaths()` function.


This function is required because Astro is a static site builder. That means that your entire site is built ahead of time. If Astro doesn’t know to generate a page at build time, your users won’t see it when they visit your site.







```
---export async function getStaticPaths() {  return [    { params: { /* required */ }, props: { /* optional */ } },    { params: { ... } },    { params: { ... } },    // ...  ];}---<!-- Your HTML template here. -->
```

The `getStaticPaths()` function should return an array of objects to determine which paths will be pre\-rendered by Astro.


It can also be used in static file endpoints for [dynamic routing](/en/guides/endpoints/#params-and-dynamic-routing).


Tip

When using TypeScript, use the [`GetStaticPaths`](/en/guides/typescript/#infer-getstaticpaths-types) type utility to ensure type\-safe access of your `params` and `props`.


Caution

The `getStaticPaths()` function executes in its own isolated scope once, before any page loads. Therefore you can’t reference anything from its parent scope, other than file imports. The compiler will warn if you break this requirement.


### `params`

[Section titled params](#params)
The `params` key of every returned object tells Astro what routes to build. The returned params must map back to the dynamic parameters and rest parameters defined in your component filepath.


`params` are encoded into the URL, so only strings are supported as values. The value for each `params` object must match the parameters used in the page name.


For example, suppose that you have a page at `src/pages/posts/[id].astro`. If you export `getStaticPaths` from this page and return the following for paths:







```
---export async function getStaticPaths() {  return [    { params: { id: '1' } },    { params: { id: '2' } },    { params: { id: '3' } }  ];}
const { id } = Astro.params;---<h1>{id}</h1>
```

Then Astro will statically generate `posts/1`, `posts/2`, and `posts/3` at build time.


### Data Passing with `props`

[Section titled Data Passing with props](#data-passing-with-props)
To pass additional data to each generated page, you can also set a `props` value on every returned path object. Unlike `params`, `props` are not encoded into the URL and so aren’t limited to only strings.


For example, suppose that you generate pages based off of data fetched from a remote API. You can pass the full data object to the page component inside of `getStaticPaths`:







```
---export async function getStaticPaths() {  const data = await fetch('...').then(response => response.json());
  return data.map((post) => {    return {      params: { id: post.id },      props: { post },    };  });}
const { id } = Astro.params;const { post } = Astro.props;---<h1>{id}: {post.name}</h1>
```

You can also pass a regular array, which may be helpful when generating or stubbing a known list of routes.







```
---export async function getStaticPaths() {  const posts = [    {id: '1', category: "astro", title: "API Reference"},    {id: '2', category: "react", title: "Creating a React Counter!"}  ];  return posts.map((post) => {    return {      params: { id: post.id },      props: { post }    };  });}const {id} = Astro.params;const {post} = Astro.props;---<body>  <h1>{id}: {post.title}</h1>  <h2>Category: {post.category}</h2></body>
```

Then Astro will statically generate `posts/1` and `posts/2` at build time using the page component in `pages/posts/[id].astro`. The page can reference this data using `Astro.props`:


### `paginate()`

[Section titled paginate()](#paginate)
Pagination is a common use\-case for websites that Astro natively supports via the `paginate()` function. `paginate()` will automatically generate the array to return from `getStaticPaths()` that creates one URL for every page of the paginated collection. The page number will be passed as a param, and the page data will be passed as a `page` prop.







```
export async function getStaticPaths({ paginate }) {  // Load your data with fetch(), Astro.glob(), etc.  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);  const result = await response.json();  const allPokemon = result.results;
  // Return a paginated collection of paths for all posts  return paginate(allPokemon, { pageSize: 10 });}
// If set up correctly, The page prop now has everything that// you need to render a single page (see next section).const { page } = Astro.props;
```

`paginate()` has the following arguments:


* `data` \- array containing the page’s data passed to the `paginate()` function
* `options` \- Optional object with the following properties:
	+ `pageSize` \- The number of items shown per page (`10` by default)
	+ `params` \- Send additional parameters for creating dynamic routes
	+ `props` \- Send additional props to be available on each page


`paginate()` assumes a file name of `[page].astro` or `[...page].astro`. The `page` param becomes the page number in your URL:


* `/posts/[page].astro` would generate the URLs `/posts/1`, `/posts/2`, `/posts/3`, etc.
* `/posts/[...page].astro` would generate the URLs `/posts`, `/posts/2`, `/posts/3`, etc.


#### The pagination `page` prop

[Section titled The pagination page prop](#the-pagination-page-prop)
**Type:** `Page<TData>`


Pagination will pass a `page` prop to every rendered page that represents a single page of data in the paginated collection. This includes the data that you’ve paginated (`page.data`) as well as metadata for the page (`page.url`, `page.start`, `page.end`, `page.total`, etc). This metadata is useful for things like a “Next Page” button or a “Showing 1\-10 of 100” message.


##### `page.data`

[Section titled page.data](#pagedata)
**Type:** `Array<TData>`


Array of data returned from the `paginate()` function for the current page.


##### `page.start`

[Section titled page.start](#pagestart)
**Type:** `number`


Index of first item on current page, starting at `0`. (e.g. if `pageSize: 25`, this would be `0` on page 1, `25` on page 2, etc.)


##### `page.end`

[Section titled page.end](#pageend)
**Type:** `number`


Index of last item on current page.


##### `page.size`

[Section titled page.size](#pagesize)
**Type:** `number`  

**Default:** `10`


How many items per\-page.


##### `page.total`

[Section titled page.total](#pagetotal)
**Type:** `number`


The total number of items across all pages.


##### `page.currentPage`

[Section titled page.currentPage](#pagecurrentpage)
**Type:** `number`


The current page number, starting with `1`.


##### `page.lastPage`

[Section titled page.lastPage](#pagelastpage)
**Type:** `number`


The total number of pages.


##### `page.url.current`

[Section titled page.url.current](#pageurlcurrent)
**Type:** `string`


Get the URL of the current page (useful for canonical URLs).


##### `page.url.prev`

[Section titled page.url.prev](#pageurlprev)
**Type:** `string | undefined`


Get the URL of the previous page (will be `undefined` if on page 1\). If a value is set for [`base`](/en/reference/configuration-reference/#base), prepend the base path to the URL.


##### `page.url.next`

[Section titled page.url.next](#pageurlnext)
**Type:** `string | undefined`


Get the URL of the next page (will be `undefined` if no more pages). If a value is set for [`base`](/en/reference/configuration-reference/#base), prepend the base path to the URL.


##### `page.url.first`

[Section titled page.url.first](#pageurlfirst)
**Type:** `string | undefined`  



**Added in:**
`astro@4.12.0`

Get the URL of the first page (will be `undefined` if on page 1\). If a value is set for [`base`](/en/reference/configuration-reference/#base), prepend the base path to the URL.


##### `page.url.last`

[Section titled page.url.last](#pageurllast)
**Type:** `string | undefined`  



**Added in:**
`astro@4.12.0`

Get the URL of the last page (will be `undefined` if no more pages). If a value is set for [`base`](/en/reference/configuration-reference/#base), prepend the base path to the URL.


`import.meta`
-------------

[Section titled import.meta](#importmeta)
All ESM modules include a `import.meta` property. Astro adds `import.meta.env` through [Vite](https://vite.dev/guide/env-and-mode.html).


**`import.meta.env.SSR`** can be used to know when rendering on the server. Sometimes you might want different logic, like a component that should only be rendered in the client:







```
export default function () {  return import.meta.env.SSR ? <div class="spinner"></div> : <FancyComponent />;}
```

Reference