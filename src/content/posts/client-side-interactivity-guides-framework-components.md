---
author: AA
category:
- Three
cover: https://images.unsplash.com/photo-1443641723753-250ff9bb3c83?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw5fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: black concrete building during daytime
description: Learn how to use React, Svelte, etc.
pubDate: 2024-02-09 00:00:00
slug: client-side-interactivity-guides-framework-components
tags:
- basics
- CSharp
- Less
title: Framework Components 
---

Build your Astro website without sacrificing your favorite component framework. Create Astro [islands](/en/concepts/islands/) with the UI frameworks of your choice.


Official UI Framework Integrations
----------------------------------

[Section titled Official UI Framework Integrations](#official-ui-framework-integrations)
Astro supports a variety of popular frameworks including [React](https://react.dev/), [Preact](https://preactjs.com/), [Svelte](https://svelte.dev/), [Vue](https://vuejs.org/), [SolidJS](https://www.solidjs.com/), [AlpineJS](https://alpinejs.dev/) and [Lit](https://lit.dev/) with official integrations.


Find even more [community\-maintained framework integrations](https://astro.build/integrations/?search=&categories%5B%5D=frameworks) (e.g. Angular, Qwik, Elm) in our integrations directory.


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



Installing Integrations
-----------------------

[Section titled Installing Integrations](#installing-integrations)
One or several of these Astro integrations can be installed and configured in your project.


See the [Integrations Guide](/en/guides/integrations-guide/) for more details on installing and configuring Astro integrations.


Tip

Want to see an example for the framework of your choice? Visit [astro.new](https://astro.new/latest/frameworks) and select one of the framework templates.


Using Framework Components
--------------------------

[Section titled Using Framework Components](#using-framework-components)
Use your JavaScript framework components in your Astro pages, layouts and components just like Astro components! All your components can live together in `/src/components`, or can be organized in any way you like.


To use a framework component, import it from its relative path in your Astro component script. Then, use the component alongside other components, HTML elements and JSX\-like expressions in the component template.




src/pages/static\-components.astro


```
---import MyReactComponent from '../components/MyReactComponent.jsx';---<html>  <body>    <h1>Use React components directly in Astro!</h1>    <MyReactComponent />  </body></html>
```

By default, your framework components will only render on the server, as static HTML. This is useful for templating components that are not interactive and avoids sending any unnecessary JavaScript to the client.


Hydrating Interactive Components
--------------------------------

[Section titled Hydrating Interactive Components](#hydrating-interactive-components)
A framework component can be made interactive (hydrated) using a [`client:*` directive](/en/reference/directives-reference/#client-directives). These are component attributes that determine when your component’s JavaScript should be sent to the browser.


With all client directives except `client:only`, your component will first render on the server to generate static HTML. Component JavaScript will be sent to the browser according to the directive you chose. The component will then hydrate and become interactive.




src/pages/interactive\-components.astro


```
---// Example: hydrating framework components in the browser.import InteractiveButton from '../components/InteractiveButton.jsx';import InteractiveCounter from '../components/InteractiveCounter.jsx';import InteractiveModal from '../components/InteractiveModal.svelte';---<!-- This component's JS will begin importing when the page loads --><InteractiveButton client:load />
<!-- This component's JS will not be sent to the client untilthe user scrolls down and the component is visible on the page --><InteractiveCounter client:visible />
<!-- This component won't render on the server, but will render on the client when the page loads --><InteractiveModal client:only="svelte" />
```

The JavaScript framework (React, Svelte, etc.) needed to render the component will be sent to the browser along with the component’s own JavaScript. If two or more components on a page use the same framework, the framework will only be sent once.


Accessibility

Most framework\-specific accessibility patterns should work the same when these components are used in Astro. Be sure to choose a client directive that will ensure any accessibility\-related JavaScript is properly loaded and executed at the appropriate time!


### Available Hydration Directives

[Section titled Available Hydration Directives](#available-hydration-directives)
There are several hydration directives available for UI framework components: `client:load`, `client:idle`, `client:visible`, `client:media={QUERY}` and `client:only={FRAMEWORK}`.




See our [directives reference](/en/reference/directives-reference/#client-directives) page for a full description of these hydration directives, and their usage.

Mixing Frameworks
-----------------

[Section titled Mixing Frameworks](#mixing-frameworks)
You can import and render components from multiple frameworks in the same Astro component.




src/pages/mixing\-frameworks.astro


```
---// Example: Mixing multiple framework components on the same page.import MyReactComponent from '../components/MyReactComponent.jsx';import MySvelteComponent from '../components/MySvelteComponent.svelte';import MyVueComponent from '../components/MyVueComponent.vue';---<div>  <MySvelteComponent />  <MyReactComponent />  <MyVueComponent /></div>
```

Caution

Only **Astro** components (`.astro`) can contain components from multiple frameworks.


Passing Props to Framework Components
-------------------------------------

[Section titled Passing Props to Framework Components](#passing-props-to-framework-components)
You can pass props from Astro components to framework components:




src/pages/frameworks\-props.astro


```
---import TodoList from '../components/TodoList.jsx';import Counter from '../components/Counter.svelte';---<div>  <TodoList initialTodos={["learn Astro", "review PRs"]} />  <Counter startingCount={1} /></div>
```

Passing functions as props

You can pass a function as a prop to a framework component, but it only works during server rendering. If you try to use the function in a hydrated component (for example, as an event handler), an error will occur.

This is because functions can’t be *serialized* (transferred from the server to the client) by Astro.


Passing Children to Framework Components
----------------------------------------

[Section titled Passing Children to Framework Components](#passing-children-to-framework-components)
Inside of an Astro component, you **can** pass children to framework components. Each framework has its own patterns for how to reference these children: React, Preact, and Solid all use a special prop named `children`, while Svelte and Vue use the `<slot />` element.




src/pages/component\-children.astro


```
---import MyReactSidebar from '../components/MyReactSidebar.jsx';---<MyReactSidebar>  <p>Here is a sidebar with some text and a button.</p></MyReactSidebar>
```

Additionally, you can use [Named Slots](/en/basics/astro-components/#named-slots) to group specific children together.


For React, Preact, and Solid, these slots will be converted to a top\-level prop. Slot names using `kebab-case` will be converted to `camelCase`.




src/pages/named\-slots.astro


```
---import MySidebar from '../components/MySidebar.jsx';---<MySidebar>  <h2 slot="title">Menu</h2>  <p>Here is a sidebar with some text and a button.</p>  <ul slot="social-links">    <li><a href="https://twitter.com/astrodotbuild">Twitter</a></li>    <li><a href="https://github.com/withastro">GitHub</a></li>  </ul></MySidebar>
```



src/components/MySidebar.jsx


```
export default function MySidebar(props) {  return (    <aside>      <header>{props.title}</header>      <main>{props.children}</main>      <footer>{props.socialLinks}</footer>    </aside>  )}
```

For Svelte and Vue these slots can be referenced using a `<slot>` element with the `name` attribute. Slot names using `kebab-case` will be preserved.




src/components/MySidebar.svelte


```
<aside>  <header><slot name="title" /></header>  <main><slot /></main>  <footer><slot name="social-links" /></footer></aside>
```

Nesting Framework Components
----------------------------

[Section titled Nesting Framework Components](#nesting-framework-components)
Inside of an Astro file, framework component children can also be hydrated components. This means that you can recursively nest components from any of these frameworks.




src/pages/nested\-components.astro


```
---import MyReactSidebar from '../components/MyReactSidebar.jsx';import MyReactButton from '../components/MyReactButton.jsx';import MySvelteButton from '../components/MySvelteButton.svelte';---<MyReactSidebar>  <p>Here is a sidebar with some text and a button.</p>  <div slot="actions">    <MyReactButton client:idle />    <MySvelteButton client:idle />  </div></MyReactSidebar>
```

Caution

Remember: framework component files themselves (e.g. `.jsx`, `.svelte`) cannot mix multiple frameworks.


This allows you to build entire “apps” in your preferred JavaScript framework and render them, via a parent component, to an Astro page.


Note

Astro components are always rendered to static HTML, even when they include framework components that are hydrated. This means that you can only pass props that don’t do any HTML rendering. Passing React’s “render props” to framework components from an Astro component will not work, because Astro components can’t provide the client runtime behavior that this pattern requires. Instead, use named slots.


Can I use Astro Components inside my Framework Components?
----------------------------------------------------------

[Section titled Can I use Astro Components inside my Framework Components?](#can-i-use-astro-components-inside-my-framework-components)
Any UI framework component becomes an “island” of that framework. These components must be written entirely as valid code for that framework, using only its own imports and packages. You cannot import `.astro` components in a UI framework component (e.g. `.jsx` or `.svelte`).


You can, however, use [the Astro `<slot />` pattern](/en/basics/astro-components/#slots) to pass static content generated by Astro components as children to your framework components **inside an `.astro` component**.




src/pages/astro\-children.astro


```
---import MyReactComponent from  '../components/MyReactComponent.jsx';import MyAstroComponent from '../components/MyAstroComponent.astro';---<MyReactComponent>  <MyAstroComponent slot="name" /></MyReactComponent>
```

Can I Hydrate Astro Components?
-------------------------------

[Section titled Can I Hydrate Astro Components?](#can-i-hydrate-astro-components)
If you try to hydrate an Astro component with a `client:` modifier, you will get an error.


[Astro components](/en/basics/astro-components/) are HTML\-only templating components with no client\-side runtime. But, you can use a `<script>` tag in your Astro component template to send JavaScript to the browser that executes in the global scope.




Learn more about [client\-side `<script>` tags in Astro components](/en/guides/client-side-scripts/)

Learn