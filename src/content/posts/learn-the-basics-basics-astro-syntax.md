---
author: AA
category:
- Three
cover: https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHwyfHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: worm's-eye view photography of concrete building
description: An intro to the .astro component syntax.
pubDate: 2024-02-02 00:00:00
slug: learn-the-basics-basics-astro-syntax
tags:
- astro
- Rust
- Less
title: Astro Syntax 
---

**If you know HTML, you already know enough to write your first Astro component.**


Astro component syntax is a superset of HTML. The syntax was [designed to feel familiar to anyone with experience writing HTML or JSX](#differences-between-astro-and-jsx), and adds support for including components and JavaScript expressions.


JSX\-like Expressions
---------------------

[Section titled JSX\-like Expressions](#jsx-like-expressions)
You can define local JavaScript variables inside of the frontmatter component script between the two code fences (`---`) of an Astro component. You can then inject these variables into the component’s HTML template using JSX\-like expressions!


Dynamic vs reactive

Using this approach, you can include **dynamic** values that are calculated in the frontmatter. But once included, these values are not **reactive** and will never change. Astro components are templates that only run once, during the rendering step.

See below for more examples of [differences between Astro and JSX](#differences-between-astro-and-jsx).


### Variables

[Section titled Variables](#variables)
Local variables can be added into the HTML using the curly braces syntax:




src/components/Variables.astro


```
---const name = "Astro";---<div>  <h1>Hello {name}!</h1>  <!-- Outputs <h1>Hello Astro!</h1> --></div>
```

### Dynamic Attributes

[Section titled Dynamic Attributes](#dynamic-attributes)
Local variables can be used in curly braces to pass attribute values to both HTML elements and components:




src/components/DynamicAttributes.astro


```
---const name = "Astro";---<h1 class={name}>Attribute expressions are supported</h1>
<MyComponent templateLiteralNameAttribute={`MyNameIs${name}`} />
```

Caution

HTML attributes will be converted to strings, so it is not possible to pass functions and objects to HTML elements.
For example, you can’t assign an event handler to an HTML element in an Astro component:



dont\-do\-this.astro


```
---function handleClick () {    console.log("button clicked!");}---<!-- ❌ This doesn't work! ❌ --><button onClick={handleClick}>Nothing will happen when you click me!</button>
```
Instead, use a client\-side script to add the event handler, like you would in vanilla JavaScript:



do\-this\-instead.astro


```
------<button id="button">Click Me</button><script>  function handleClick () {    console.log("button clicked!");  }  document.getElementById("button").addEventListener("click", handleClick);</script>
```

### Dynamic HTML

[Section titled Dynamic HTML](#dynamic-html)
Local variables can be used in JSX\-like functions to produce dynamically\-generated HTML elements:




src/components/DynamicHtml.astro


```
---const items = ["Dog", "Cat", "Platypus"];---<ul>  {items.map((item) => (    <li>{item}</li>  ))}</ul>
```

Astro can conditionally display HTML using JSX logical operators and ternary expressions.




src/components/ConditionalHtml.astro


```
---const visible = true;---{visible && <p>Show me!</p>}
{visible ? <p>Show me!</p> : <p>Else show me!</p>}
```

### Dynamic Tags

[Section titled Dynamic Tags](#dynamic-tags)
You can also use dynamic tags by assigning an HTML tag name to a variable or with a component import reassignment:




src/components/DynamicTags.astro


```
---import MyComponent from "./MyComponent.astro";const Element = 'div'const Component = MyComponent;---<Element>Hello!</Element> <!-- renders as <div>Hello!</div> --><Component /> <!-- renders as <MyComponent /> -->
```

When using dynamic tags:


* **Variable names must be capitalized.** For example, use `Element`, not `element`. Otherwise, Astro will try to render your variable name as a literal HTML tag.
* **Hydration directives are not supported.** When using [`client:*` hydration directives](/en/guides/framework-components/#hydrating-interactive-components), Astro needs to know which components to bundle for production, and the dynamic tag pattern prevents this from working.
* **The [define:vars directive](/en/reference/directives-reference/#definevars) is not supported.** If you cannot wrap the children with an extra element (e.g `<div>`), then you can manually add a `style={`--myVar:${value}`}` to your Element.


### Fragments

[Section titled Fragments](#fragments)
Astro supports using either `<Fragment> </Fragment>` or the shorthand `<> </>`.


Fragments can be useful to avoid wrapper elements when adding [`set:*` directives](/en/reference/directives-reference/#sethtml), as in the following example:




src/components/SetHtml.astro


```
---const htmlString = '<p>Raw HTML content</p>';---<Fragment set:html={htmlString} />
```

### Differences between Astro and JSX

[Section titled Differences between Astro and JSX](#differences-between-astro-and-jsx)
Astro component syntax is a superset of HTML. It was designed to feel familiar to anyone with HTML or JSX experience, but there are a couple of key differences between `.astro` files and JSX.


#### Attributes

[Section titled Attributes](#attributes)
In Astro, you use the standard `kebab-case` format for all HTML attributes instead of the `camelCase` used in JSX. This even works for `class`, which is not supported by React.




example.astro


```
<div className="box" dataValue="3" /><div class="box" data-value="3" />
```

#### Multiple Elements

[Section titled Multiple Elements](#multiple-elements)
An Astro component template can render multiple elements with no need to wrap everything in a single `<div>` or `<>`, unlike JavaScript or JSX.




src/components/RootElements.astro


```
---// Template with multiple elements---<p>No need to wrap elements in a single containing element.</p><p>Astro supports multiple root elements in a template.</p>
```

#### Comments

[Section titled Comments](#comments)
In Astro, you can use standard HTML comments or JavaScript\-style comments.




example.astro


```
------<!-- HTML comment syntax is valid in .astro files -->{/* JS comment syntax is also valid */}
```

Caution

HTML\-style comments will be included in browser DOM, while JS ones will be skipped. To leave TODO messages or other development\-only explanations, you may wish to use JavaScript\-style comments instead.


Learn