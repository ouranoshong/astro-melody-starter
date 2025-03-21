---
author: AA
category:
- Three
cover: https://images.unsplash.com/photo-1514539079130-25950c84af65?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw1fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: closeup photo of castle with mist
description: Learn how to create type-safe server functions you can call from anywhere.
pubDate: 2024-01-06 00:00:00
slug: routes-and-navigation-guides-actions
tags:
- basics
- Rust
- Stylus
title: Actions 
---

**Added in:**
`astro@4.15`



Astro Actions allow you to define and call backend functions with type\-safety. Actions perform data fetching, JSON parsing, and input validation for you. This can greatly reduce the amount of boilerplate needed compared to using an [API endpoint](/en/guides/endpoints/).


Use actions instead of API endpoints for seamless communication between your client and server code and to:


* Automatically validate JSON and form data inputs using [Zod validation](https://zod.dev/?id=primitives).
* Generate type\-safe functions to call your backend from the client and even [from HTML form actions](#call-actions-from-an-html-form-action). No need for manual `fetch()` calls.
* Standardize backend errors with the [`ActionError`](/en/reference/modules/astro-actions/#actionerror) object.


Basic usage
-----------

[Section titled Basic usage](#basic-usage)
Actions are defined in a `server` object exported from `src/actions/index.ts`:




src/actions/index.ts


```
import { defineAction } from 'astro:actions';import { z } from 'astro:schema';
export const server = {  myAction: defineAction({ /* ... */ })}
```

Your actions are available as functions from the `astro:actions` module. Import `actions` and call them client\-side within a [UI framework component](/en/guides/framework-components/), [a form POST request](#call-actions-from-an-html-form-action), or by using a `<script>` tag in an Astro component.


When you call an action, it returns an object with either `data` containing the JSON\-serialized result, or `error` containing thrown errors.




src/pages/index.astro


```
------
<script>import { actions } from 'astro:actions';
async () => {  const { data, error } = await actions.myAction({ /* ... */ });}</script>
```

### Write your first action

[Section titled Write your first action](#write-your-first-action)
Follow these steps to define an action and call it in a `script` tag in your Astro page.


1. Create a `src/actions/index.ts` file and export a `server` object.




src/actions/index.ts


```
export const server = {  // action declarations}
```
2. Import the `defineAction()` utility from `astro:actions`, and the `z` object from `astro:schema`.




src/actions/index.ts


```
import { defineAction } from 'astro:actions';import { z } from 'astro:schema';
 export const server = {  // action declarations}
```
3. Use the `defineAction()` utility to define a `getGreeting` action. The `input` property will be used to validate input parameters with a [Zod](https://zod.dev) schema and the `handler()` function includes the backend logic to run on the server.




src/actions/index.ts


```
import { defineAction } from 'astro:actions';import { z } from 'astro:schema';
export const server = {  getGreeting: defineAction({    input: z.object({      name: z.string(),    }),    handler: async (input) => {      return `Hello, ${input.name}!`    }  })}
```
4. Create an Astro component with a button that will fetch a greeting using your `getGreeting` action when clicked.




src/pages/index.astro


```
------
<button>Get greeting</button>
<script>const button = document.querySelector('button');button?.addEventListener('click', async () => {  // Show alert pop-up with greeting from action});</script>
```
5. To use your action, import `actions` from `astro:actions` and then call `actions.getGreeting()` in the click handler. The `name` option will be sent to your action’s `handler()` on the server and, if there are no errors, the result will be available as the `data` property.




src/pages/index.astro


```
------
<button>Get greeting</button>
<script>import { actions } from 'astro:actions';
const button = document.querySelector('button');button?.addEventListener('click', async () => {  // Show alert pop-up with greeting from action  const { data, error } = await actions.getGreeting({ name: "Houston" });  if (!error) alert(data);})</script>
```




See the full Actions API documentation for details on [`defineAction()`](/en/reference/modules/astro-actions/#defineaction) and its properties.

Organizing actions
------------------

[Section titled Organizing actions](#organizing-actions)
All actions in your project must be exported from the `server` object in the `src/actions/index.ts` file. You can define actions inline or you can move action definitions to separate files and import them. You can even group related functions in nested objects.


For example, to colocate all of your user actions, you can create a `src/actions/user.ts` file and nest the definitions of both `getUser` and `createUser` inside a single `user` object.




src/actions/user.ts


```
import { defineAction } from 'astro:actions';
export const user = {  getUser: defineAction(/* ... */),  createUser: defineAction(/* ... */),}
```

Then, you can import this `user` object into your `src/actions/index.ts` file and add it as a top\-level key to the `server` object alongside any other actions:




src/actions/index.ts


```
import { user } from './user';
export const server = {  myAction: defineAction({ /* ... */ }),  user,}
```

Now, all of your user actions are callable from the `actions.user` object:


* `actions.user.getUser()`
* `actions.user.createUser()`


Handling returned data
----------------------

[Section titled Handling returned data](#handling-returned-data)
Actions return an object containing either `data` with the type\-safe return value of your `handler()`, or an `error` with any backend errors. Errors may come from validation errors on the `input` property or thrown errors within the `handler()`.


### Checking for errors

[Section titled Checking for errors](#checking-for-errors)
It’s best to check if an `error` is present before using the `data` property. This allows you to handle errors in advance and ensures `data` is defined without an `undefined` check.







```
const { data, error } = await actions.example();
if (error) {  // handle error cases  return;}// use `data`
```

### Accessing `data` directly without an error check

[Section titled Accessing data directly without an error check](#accessing-data-directly-without-an-error-check)
To skip error handling, for example while prototyping or using a library that will catch errors for you, use the `.orThrow()` property on your action call to throw errors instead of returning an `error`. This will return the action’s `data` directly.


This example calls a `likePost()` action that returns the updated number of likes as a `number` from the action `handler`:







```
const updatedLikes = await actions.likePost.orThrow({ postId: 'example' });//    ^ type: number
```

### Handling backend errors in your action

[Section titled Handling backend errors in your action](#handling-backend-errors-in-your-action)
You can use the provided `ActionError` to throw an error from your action `handler()`, such as “not found” when a database entry is missing, or “unauthorized” when a user is not logged in. This has two main benefits over returning `undefined`:


* You can set a status code like `404 - Not found` or `401 - Unauthorized`. This improves debugging errors in both development and in production by letting you see the status code of each request.
* In your application code, all errors are passed to the `error` object on an action result. This avoids the need for `undefined` checks on data, and allows you to display targeted feedback to the user depending on what went wrong.


#### Creating an `ActionError`

[Section titled Creating an ActionError](#creating-an-actionerror)
To throw an error, import the `ActionError()` class from the `astro:actions` module. Pass it a human\-readable status `code` (e.g. `"NOT_FOUND"` or `"BAD_REQUEST"`), and an optional `message` to provide further information about the error.


This example throws an error from a `likePost` action when a user is not logged in, after checking a hypothetical “user\-session” cookie for authentication:




src/actions/index.ts


```
import { defineAction, ActionError } from "astro:actions";import { z } from "astro:schema";
export const server = {  likePost: defineAction({    input: z.object({ postId: z.string() }),    handler: async (input, ctx) => {      if (!ctx.cookies.has('user-session')) {        throw new ActionError({          code: "UNAUTHORIZED",          message: "User must be logged in.",        });      }      // Otherwise, like the post    },  }),};
```

#### Handling an `ActionError`

[Section titled Handling an ActionError](#handling-an-actionerror)
To handle this error, you can call the action from your application and check whether an `error` property is present. This property will be of type `ActionError` and will contain your `code` and `message`.


In the following example, a `LikeButton.tsx` component calls the `likePost()` action when clicked. If an authentication error occurs, the `error.code` attribute is used to determine whether to display a login link:




src/components/LikeButton.tsx


```
import { actions } from 'astro:actions';import { useState } from 'preact/hooks';
export function LikeButton({ postId }: { postId: string }) {  const [showLogin, setShowLogin] = useState(false);  return (    <>      {        showLogin && <a href="/signin">Log in to like a post.</a>      }      <button onClick={async () => {        const { data, error } = await actions.likePost({ postId });        if (error?.code === 'UNAUTHORIZED') setShowLogin(true);        // Early return for unexpected errors        else if (error) return;        // update likes      }}>        Like      </button>    </>  )}
```

### Handling client redirects

[Section titled Handling client redirects](#handling-client-redirects)
When calling actions from the client, you can integrate with a client\-side library like `react-router`, or you can use Astro’s [`navigate()` function](/en/guides/view-transitions/#trigger-navigation) to redirect to a new page when an action succeeds.


This example navigates to the homepage after a `logout` action returns successfully:




src/pages/LogoutButton.tsx


```
import { actions } from 'astro:actions';import { navigate } from 'astro:transitions/client';
export function LogoutButton() {  return (    <button onClick={async () => {      const { error } = await actions.logout();      if (!error) navigate('/');    }}>      Logout    </button>  );}
```

Accepting form data from an action
----------------------------------

[Section titled Accepting form data from an action](#accepting-form-data-from-an-action)
Actions accept JSON data by default. To accept form data from an HTML form, set `accept: 'form'` in your `defineAction()` call:




src/actions/index.ts


```
import { defineAction } from 'astro:actions';import { z } from 'astro:schema';
export const server = {  comment: defineAction({    accept: 'form',    input: z.object(/* ... */),    handler: async (input) => { /* ... */ },  })}
```

### Validating form data

[Section titled Validating form data](#validating-form-data)
Actions will parse submitted form data to an object, using the value of each input’s `name` attribute as the object keys. For example, a form containing `<input name="search">` will be parsed to an object like `{ search: 'user input' }`. Your action’s `input` schema will be used to validate this object.


To receive the raw `FormData` object in your action handler instead of a parsed object, omit the `input` property in your action definition.


The following example shows a validated newsletter registration form that accepts a user’s email and requires a “terms of service” agreement checkbox.


1. Create an HTML form component with unique `name` attributes on each input:




src/components/Newsletter.astro


```
<form>  <label for="email">E-mail</label>  <input id="email" required type="email" name="email" />  <label>    <input required type="checkbox" name="terms">    I agree to the terms of service  </label>  <button>Sign up</button></form>
```
2. Define a `newsletter` action to handle the submitted form. Validate the `email` field using the `z.string().email()` validator, and the `terms` checkbox using `z.boolean()`:




src/actions/index.ts


```
import { defineAction } from 'astro:actions';import { z } from 'astro:schema';
export const server = {  newsletter: defineAction({    accept: 'form',    input: z.object({      email: z.string().email(),      terms: z.boolean(),    }),    handler: async ({ email, terms }) => { /* ... */ },  })}
```



See the [`input` API reference](/en/reference/modules/astro-actions/#input-validator) for all available form validators.
3. Add a `<script>` to the HTML form to submit the user input. This example overrides the form’s default submit behavior to call `actions.newsletter()`, and redirects to `/confirmation` using the `navigate()` function:




src/components/Newsletter.astro


```
<form>7 collapsed lines  <label for="email">E-mail</label>  <input id="email" required type="email" name="email" />  <label>    <input required type="checkbox" name="terms">    I agree to the terms of service  </label>  <button>Sign up</button></form>
<script>  import { actions } from 'astro:actions';  import { navigate } from 'astro:transitions/client';
  const form = document.querySelector('form');  form?.addEventListener('submit', async (event) => {    event.preventDefault();    const formData = new FormData(form);    const { error } = await actions.newsletter(formData);    if (!error) navigate('/confirmation');  })</script>
```



See [“Call actions from an HTML form action”](#call-actions-from-an-html-form-action) for an alternative way to submit form data.


### Displaying form input errors

[Section titled Displaying form input errors](#displaying-form-input-errors)
You can validate form inputs before submission using [native HTML form validation attributes](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#using_built-in_form_validation) like `required`, `type="email"`, and `pattern`. For more complex `input` validation on the backend, you can use the provided [`isInputError()`](/en/reference/modules/astro-actions/#isinputerror) utility function.


To retrieve input errors, use the `isInputError()` utility to check whether an error was caused by invalid input. Input errors contain a `fields` object with messages for each input name that failed to validate. You can use these messages to prompt your user to correct their submission.


The following example checks the error with `isInputError()`, then checks whether the error is in the email field, before finally creating a message from the errors. You can use JavaScript DOM manipulation or your preferred UI framework to display this message to users.







```
import { actions, isInputError } from 'astro:actions';
const form = document.querySelector('form');const formData = new FormData(form);const { error } = await actions.newsletter(formData);if (isInputError(error)) {  // Handle input errors.  if (error.fields.email) {    const message = error.fields.email.join(', ');  }}
```

Call actions from an HTML form action
-------------------------------------

[Section titled Call actions from an HTML form action](#call-actions-from-an-html-form-action)
Note

Pages must be on\-demand rendered when calling actions using a form action. [Ensure prerendering is disabled on the page](/en/guides/server-side-rendering/#opting-out-of-pre-rendering-in-hybrid-mode) before using this API.


You can enable zero\-JS form submissions with standard attributes on any `<form>` element. Form submissions without client\-side JavaScript may be useful both as a fallback for when JavaScript fails to load, or if you prefer to handle forms entirely from the server.


Calling [Astro.getActionResult()](/en/reference/api-reference/#astrogetactionresult) on the server returns the result of your form submission (`data` or `error`), and can be used to dynamically redirect, handle form errors, update the UI, and more.


To call an action from an HTML form, add `method="POST"` to your `<form>`, then set the form’s `action` attribute using your action, for example `action={actions.logout}`. This will set the `action` attribute to use a query string that is handled by the server automatically.


For example, this Astro component calls the `logout` action when the button is clicked and reloads the current page:




src/components/LogoutButton.astro


```
---import { actions } from 'astro:actions';---
<form method="POST" action={actions.logout}>  <button>Log out</button></form>
```

### Redirect on action success

[Section titled Redirect on action success](#redirect-on-action-success)
To navigate to a different page when an action is successful without client\-side JavaScript, you can prepend a path in the `action` attribute.


For example, `action={'/confirmation' + actions.newsletter}` will navigate to `/confirmation` when the `newsletter` action succeeds:




src/components/NewsletterSignup.astro


```
---import { actions } from 'astro:actions';---
<form method="POST" action={'/confirmation' + actions.newsletter}>  <label>E-mail <input required type="email" name="email" /></label>  <button>Sign up</button></form>
```

#### Dynamic redirect on action success

[Section titled Dynamic redirect on action success](#dynamic-redirect-on-action-success)
If you need to decide where to redirect to dynamically, you can use an action’s result on the server. A common example is creating a product record and redirecting to the new product’s page, e.g. `/products/[id]`.


For example, say you have a `createProduct` action that returns the generated product id:




src/actions/index.ts


```
import { defineAction } from 'astro:actions';import { z } from 'astro:schema';
export const server = {  createProduct: defineAction({    accept: 'form',    input: z.object({ /* ... */ }),    handler: async (input) => {      const product = await persistToDatabase(input);      return { id: product.id };    },  })}
```

You can retrieve the action result from your Astro component by calling `Astro.getActionResult()`. This returns an object containing `data` or `error` properties when an action is called, or `undefined` if the action was not called during this request.


Use the `data` property to construct a URL to use with `Astro.redirect()`:




src/pages/products/create.astro


```
---import { actions } from 'astro:actions';
const result = Astro.getActionResult(actions.createProduct);if (result && !result.error) {  return Astro.redirect(`/products/${result.data.id}`);}---
<form method="POST" action={actions.createProduct}>  <!--...--></form>
```

### Handle form action errors

[Section titled Handle form action errors](#handle-form-action-errors)
Astro will not redirect to your `action` route when an action fails. Instead, the current page is reloaded with any errors the action returned. Calling `Astro.getActionResult()` in the Astro component containing your form gives you access to the `error` object for custom error handling.


The following example displays a general failure message when a `newsletter` action fails:




src/pages/index.astro


```
---import { actions } from 'astro:actions';
const result = Astro.getActionResult(actions.newsletter);---
{result?.error && (  <p class="error">Unable to sign up. Please try again later.</p>)}<form method="POST" action={'/confirmation' + actions.newsletter}>  <label>    E-mail    <input required type="email" name="email" />  </label>  <button>Sign up</button></form>
```

For more customization, you can [use the `isInputError()` utility](#displaying-form-input-errors) to check whether an error is caused by invalid input.


The following example renders an error banner under the `email` input field when an invalid email is submitted:




src/pages/index.astro


```
---import { actions, isInputError } from 'astro:actions';
const result = Astro.getActionResult(actions.newsletter);const inputErrors = isInputError(result?.error) ? result.error.fields : {};---
<form method="POST" action={'/confirmation' + actions.newsletter}>  <label>    E-mail    <input required type="email" name="email" aria-describedby="error" />  </label>  {inputErrors.email && <p id="error">{inputErrors.email.join(',')}</p>}  <button>Sign up</button></form>
```

Note

Astro persists action `data` and `error` with a single\-use cookie. This means `getActionResult()` will return a result on the first request *only*, and `undefined` when revisiting the page.


#### Preserve input values on error

[Section titled Preserve input values on error](#preserve-input-values-on-error)
Inputs will be cleared whenever a form is submitted. To persist input values, you can [enable view transitions](/en/guides/view-transitions/#adding-view-transitions-to-a-page) on the page and apply the `transition:persist` directive to each input:







```
<input transition:persist required type="email" name="email" />
```

### Update the UI with a form action result

[Section titled Update the UI with a form action result](#update-the-ui-with-a-form-action-result)
The result returned by `Astro.getActionResult()` is single\-use, and will reset to `undefined` whenever the page is refreshed. This is ideal for [displaying input errors](#handle-form-action-errors) and showing temporary notifications to the user on success.


Tip

If you need a result to be displayed across page refreshes, consider storing the result in a database or [in a cookie](/en/reference/api-reference/#astrocookies).


Pass an action to `Astro.getActionResult()` and use the returned `data` property to render any temporary UI you want to display. This example uses the `productName` property returned by an `addToCart` action to show a success message:




src/pages/products/\[slug].astro


```
---import { actions } from 'astro:actions';
const result = Astro.getActionResult(actions.addToCart);---
{result && !result.error && (  <p class="success">Added {result.data.productName} to cart</p>)}
<!--...-->
```

Caution

Action data is passed using a persisted cookie. **This cookie is not encrypted** and is limited to 4 KB in size, although the exact limit may vary between browsers.

In general, we recommend returning the minimum information required from your action `handler` to avoid vulnerabilities, and persist other sensitive information in a database.

For example, you might return the name of a product in an `addToCart` action, rather than returning the entire `product` object:



src/actions/index.ts


```
import { defineAction } from 'astro:actions';
export const server = {  addToCart: defineAction({    handler: async () => {      /* ... */      return product;      return { productName: product.name };    }  })}
```

Learn