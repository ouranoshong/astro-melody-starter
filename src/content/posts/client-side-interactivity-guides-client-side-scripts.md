---
author: AA
category:
- Three
cover: https://images.unsplash.com/photo-1414438992182-69e404046f80?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw0fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: Leaning Tower of Pisa, Italy
description: How to add client-side interactivity to Astro components using native
  browser JavaScript APIs.
pubDate: 2024-01-05 00:00:00
slug: client-side-interactivity-guides-client-side-scripts
tags:
- documentation
- Javascript
- Sass
title: Scripts and Event Handling 
---

You can add interactivity to your Astro components without [using a UI framework](/en/guides/framework-components/) like React, Svelte, Vue, etc. using standard HTML `<script>` tags. This allows you to send JavaScript to run in the browser and add functionality to your Astro components.


Client\-Side Scripts
--------------------

[Section titled Client\-Side Scripts](#client-side-scripts)
Scripts can be used to add event listeners, send analytics data, play animations, and everything else JavaScript can do on the web.




src/components/ConfettiButton.astro


```
<button data-confetti-button>Celebrate!</button>
<script>  // Import npm modules.  import confetti from 'canvas-confetti';
  // Find our component DOM on the page.  const buttons = document.querySelectorAll('[data-confetti-button]');
  // Add event listeners to fire confetti when a button is clicked.  buttons.forEach((button) => {    button.addEventListener('click', () => confetti());  });</script>
```

By default, Astro processes and bundles `<script>` tags, adding support for importing npm modules, writing TypeScript, and more.


Using `<script>` in Astro
-------------------------

[Section titled Using \&lt;script\&gt; in Astro](#using-script-in-astro)
In `.astro` files, you can add client\-side JavaScript by adding one (or more) `<script>` tags.


In this example, adding the `<Hello />` component to a page will log a message to the browser console.




src/components/Hello.astro


```
<h1>Welcome, world!</h1>
<script>  console.log('Welcome, browser console!');</script>
```

### Script processing

[Section titled Script processing](#script-processing)
By default, `<script>` tags are processed by Astro.


* Any imports will be bundled, allowing you to import local files or Node modules.
* The processed script will be injected into your page’s `<head>` with [`type="module"`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
* TypeScript is fully supported, including importing TypeScript files.
* If your component is used several times on a page, the script will only be included once.




src/components/Example.astro


```
<script>  // Processed! Bundled! TypeScript-supported!  // Importing local scripts and Node modules works.</script>
```

The `type="module"` attribute makes the browser treat the script as a JavaScript module. This has several performance benefits:


* Rendering is not blocked. The browser continues to process the rest of the HTML while the module script and its dependencies load.
* The browser waits for HTML to be processed before executing module scripts. You do not need to listen for the “load” event.
* `async` and `defer` attributes are unnecessary. Module scripts are always deferred.


Note

The `async` attribute is valuable for normal scripts because it prevents them from blocking rendering. However, module scripts already have this behavior. Adding `async` to a module script will cause it to execute before the page has fully loaded. This is probably not what you want.


### Opting out of processing

[Section titled Opting out of processing](#opting-out-of-processing)
To prevent Astro from processing a script, add the `is:inline` directive.




src/components/InlineScript.astro


```
<script is:inline>  // Will be rendered into the HTML exactly as written!  // Local imports are not resolved and will not work.  // If in a component, repeats each time the component is used.</script>
```

Note

Astro will not process your script tags in some situations. In particular, adding `type="module"` or any attribute other than `src` to a `<script>` tag will cause Astro to treat the tag as if it had an `is:inline` directive. The same will be true when the script is written in a JSX expression.




See our [directives reference](/en/reference/directives-reference/#script--style-directives) page for more information about the directives available on `<script>` tags.

### Include JavaScript files on your page

[Section titled Include JavaScript files on your page](#include-javascript-files-on-your-page)
You may want to write your scripts as separate `.js`/`.ts` files or need to reference an external script on another server. You can do this by referencing these in a `<script>` tag’s `src` attribute.


#### Import local scripts

[Section titled Import local scripts](#import-local-scripts)
**When to use this:** when your script lives inside of `src/`.


Astro will build, optimize, and add these scripts to the page for you, following its [script processing rules](#script-processing).




src/components/LocalScripts.astro


```
<!-- relative path to script at `src/scripts/local.js` --><script src="../scripts/local.js"></script>
<!-- also works for local TypeScript files --><script src="./script-with-types.ts"></script>
```

#### Load external scripts

[Section titled Load external scripts](#load-external-scripts)
**When to use this:** when your JavaScript file lives inside of `public/` or on a CDN.


To load scripts outside of your project’s `src/` folder, include the `is:inline` directive. This approach skips the JavaScript processing, bundling, and optimizations that are provided by Astro when you import scripts as described above.




src/components/ExternalScripts.astro


```
<!-- absolute path to a script at `public/my-script.js` --><script is:inline src="/my-script.js"></script>
<!-- full URL to a script on a remote server --><script is:inline src="https://my-analytics.com/script.js"></script>
```

Common script patterns
----------------------

[Section titled Common script patterns](#common-script-patterns)
### Handle `onclick` and other events

[Section titled Handle onclick and other events](#handle-onclick-and-other-events)
Some UI frameworks use custom syntax for event handling like `onClick={...}` (React/Preact) or `@click="..."` (Vue). Astro follows standard HTML more closely and does not use custom syntax for events.


Instead, you can use [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) in a `<script>` tag to handle user interactions.




src/components/AlertButton.astro


```
<button class="alert">Click me!</button>
<script>  // Find all buttons with the `alert` class on the page.  const buttons = document.querySelectorAll('button.alert');
  // Handle clicks on each button.  buttons.forEach((button) => {    button.addEventListener('click', () => {      alert('Button was clicked!');    });  });</script>
```

Note

If you have multiple `<AlertButton />` components on a page, Astro will not run the script multiple times. Scripts are bundled and only included once per page. Using `querySelectorAll` ensures that this script attaches the event listener to every button with the `alert` class found on the page.


### Web components with custom elements

[Section titled Web components with custom elements](#web-components-with-custom-elements)
You can create your own HTML elements with custom behavior using the Web Components standard. Defining a [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) in a `.astro` component allows you to build interactive components without needing a UI framework library.


In this example, we define a new `<astro-heart>` HTML element that tracks how many times you click the heart button and updates the `<span>` with the latest count.




src/components/AstroHeart.astro


```
<!-- Wrap the component elements in our custom element “astro-heart”. --><astro-heart>  <button aria-label="Heart">💜</button> × <span>0</span></astro-heart>
<script>  // Define the behaviour for our new type of HTML element.  class AstroHeart extends HTMLElement {    connectedCallback() {      let count = 0;
      const heartButton = this.querySelector('button');      const countSpan = this.querySelector('span');
      // Each time the button is clicked, update the count.      heartButton.addEventListener('click', () => {        count++;        countSpan.textContent = count.toString();      });    }  }
  // Tell the browser to use our AstroHeart class for <astro-heart> elements.  customElements.define('astro-heart', AstroHeart);</script>
```

There are two advantages to using a custom element here:


1. Instead of searching the whole page using `document.querySelector()`, you can use `this.querySelector()`, which only searches within the current custom element instance. This makes it easier to work with only the children of one component instance at a time.
2. Although a `<script>` only runs once, the browser will run our custom element’s `constructor()` method each time it finds `<astro-heart>` on the page. This means you can safely write code for one component at a time, even if you intend to use this component multiple times on a page.




You can learn more about custom elements in [web.dev’s Reusable Web Components guide](https://web.dev/custom-elements-v1/) and [MDN’s introduction to custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

### Pass frontmatter variables to scripts

[Section titled Pass frontmatter variables to scripts](#pass-frontmatter-variables-to-scripts)
In Astro components, the code in [the frontmatter](/en/basics/astro-components/#the-component-script) between the `---` fences runs on the server and is not available in the browser. To send variables from the server to the client, we need a way to store our variables and then read them when JavaScript runs in the browser.


One way to do this is to use [`data-*` attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) to store the value of variables in your HTML output. Scripts, including custom elements, can then read these attributes using an element’s `dataset` property once your HTML loads in the browser.


In this example component, a `message` prop is stored in a `data-message` attribute, so the custom element can read `this.dataset.message` and get the value of the prop in the browser.




src/components/AstroGreet.astro


```
---const { message = 'Welcome, world!' } = Astro.props;---
<!-- Store the message prop as a data attribute. --><astro-greet data-message={message}>  <button>Say hi!</button></astro-greet>
<script>  class AstroGreet extends HTMLElement {    connectedCallback() {      // Read the message from the data attribute.      const message = this.dataset.message;      const button = this.querySelector('button');      button.addEventListener('click', () => {        alert(message);      });    }  }
  customElements.define('astro-greet', AstroGreet);</script>
```

Now we can use our component multiple times and be greeted by a different message for each one.




src/pages/example.astro


```
---import AstroGreet from '../components/AstroGreet.astro';---
<!-- Use the default message: “Welcome, world!” --><AstroGreet />
<!-- Use custom messages passed as a props. --><AstroGreet message="Lovely day to build components!" /><AstroGreet message="Glad you made it! 👋" />
```

Did you know?

This is actually what Astro does behind the scenes when you pass props to a component written using a UI framework like React! For components with a `client:*` directive, Astro creates an `<astro-island>` custom element with a `props` attribute that stores your server\-side props in the HTML output.


### Combining scripts and UI Frameworks

[Section titled Combining scripts and UI Frameworks](#combining-scripts-and-ui-frameworks)
Elements rendered by a UI framework may not be available yet when a `<script>` tag executes. If your script also needs to handle [UI framework components](/en/guides/framework-components/), using a custom element is recommended.


Learn