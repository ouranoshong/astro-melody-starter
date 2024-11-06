---
author: AA
category:
- Three
cover: https://images.unsplash.com/photo-1443641723753-250ff9bb3c83?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw5fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: black concrete building during daytime
description: Learn how to structure a project with Astro.
pubDate: 2024-01-10 00:00:00
slug: learn-the-basics-basics-project-structure
tags:
- astro-build
- Python
- Stylus
title: Project Structure 
---

Your new Astro project generated from the `create astro` CLI wizard already includes some files and folders. Others, you will create yourself and add to Astro’s existing file structure.


Here’s how an Astro project is organized, and some files you will find in your new project.


Directories and Files
---------------------

[Section titled Directories and Files](#directories-and-files)
Astro leverages an opinionated folder layout for your project. Every Astro project root should include the following directories and files:


* `src/*` \- Your project source code (components, pages, styles, etc.)
* `public/*` \- Your non\-code, unprocessed assets (fonts, icons, etc.)
* `package.json` \- A project manifest.
* `astro.config.mjs` \- An Astro configuration file. (recommended)
* `tsconfig.json` \- A TypeScript configuration file. (recommended)


### Example Project Tree

[Section titled Example Project Tree](#example-project-tree)
A common Astro project directory might look like this:


* Directorypublic/

	+ robots.txt
	+ favicon.svg
	+ social\-image.png
* Directorysrc/

	+ Directorycomponents/
	
		- Header.astro
		- Button.jsx
	+ Directorycontent/
	
		- config.ts
		- Directoryposts/
		
			* post1\.md
			* post2\.md
			* post3\.md
	+ Directorylayouts/
	
		- PostLayout.astro
	+ Directorypages/
	
		- Directoryposts/
		
			* \[post].astro
		- about.astro
		- **index.astro**
		- rss.xml.js
	+ Directorystyles/
	
		- global.css
* astro.config.mjs
* package.json
* tsconfig.json

### `src/`

[Section titled src/](#src)
The `src/` folder is where most of your project source code lives. This includes:


* [Pages](/en/basics/astro-pages/)
* [Layouts](/en/basics/layouts/)
* [Astro components](/en/basics/astro-components/)
* [UI framework components (React, etc.)](/en/guides/framework-components/)
* [Styles (CSS, Sass)](/en/guides/styling/)
* [Markdown](/en/guides/markdown-content/)


Astro processes, optimizes, and bundles your `src/` files to create the final website that is shipped to the browser. Unlike the static `public/` directory, your `src/` files are built and handled for you by Astro.


Some files (like Astro components) are not even sent to the browser as written but are instead rendered to static HTML. Other files (like CSS) are sent to the browser but may be optimized or bundled with other CSS files for performance.


Tip

While this guide describes some popular conventions used in the Astro community, the only directories reserved by Astro are `src/pages/` and `src/content/`. You are free to rename and reorganize any other directories in a way that works best for you.


### `src/pages`

[Section titled src/pages](#srcpages)
Pages routes are created for your site by adding [supported file types](/en/basics/astro-pages/#supported-page-files) to this directory.


Caution

`src/pages` is a **required** sub\-directory in your Astro project. Without it, your site will have no pages or routes!


### `src/components`

[Section titled src/components](#srccomponents)
**Components** are reusable units of code for your HTML pages. These could be [Astro components](/en/basics/astro-components/), or [UI framework components](/en/guides/framework-components/) like React or Vue. It is common to group and organize all of your project components together in this folder.


This is a common convention in Astro projects, but it is not required. Feel free to organize your components however you like!


### `src/content`

[Section titled src/content](#srccontent)
The `src/content/` directory is reserved to store [content collections](/en/guides/content-collections/) and a configuration file. No other files are allowed inside this folder.


### `src/layouts`

[Section titled src/layouts](#srclayouts)
[Layouts](/en/basics/layouts/) are Astro components that define the UI structure shared by one or more [pages](/en/basics/astro-pages/).


Just like `src/components`, this directory is a common convention but not required.


### `src/styles`

[Section titled src/styles](#srcstyles)
It is a common convention to store your CSS or Sass files in a `src/styles` directory, but this is not required. As long as your styles live somewhere in the `src/` directory and are imported correctly, Astro will handle and optimize them.


### `public/`

[Section titled public/](#public)
The `public/` directory is for files and assets in your project that do not need to be processed during Astro’s build process. The files in this folder will be copied into the build folder untouched, and then your site will be built.


This behavior makes `public/` ideal for common assets like images and fonts, or special files such as `robots.txt` and `manifest.webmanifest`.


You can place CSS and JavaScript in your `public/` directory, but be aware that those files will not be bundled or optimized in your final build.


Tip

As a general rule, any CSS or JavaScript that you write yourself should live in your `src/` directory.


### `package.json`

[Section titled package.json](#packagejson)
This is a file used by JavaScript package managers to manage your dependencies. It also defines the scripts that are commonly used to run Astro (ex: `npm start`, `npm run build`).


There are [two kinds of dependencies](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file) you can specify in a `package.json`: `dependencies` and `devDependencies`. In most cases, these work the same: Astro needs all dependencies at build time, and your package manager will install both. We recommend putting all of your dependencies in `dependencies` to start, and only use `devDependencies` if you find a specific need to do so.


For help creating a new `package.json` file for your project, check out the [manual setup](/en/install-and-setup/#manual-setup) instructions.


### `astro.config.mjs`

[Section titled astro.config.mjs](#astroconfigmjs)
This file is generated in every starter template and includes configuration options for your Astro project. Here you can specify integrations to use, build options, server options, and more.


Astro supports several file formats for its JavaScript configuration file: `astro.config.js`, `astro.config.mjs`, `astro.config.cjs` and `astro.config.ts`. We recommend using `.mjs` in most cases or `.ts` if you want to write TypeScript in your config file.


TypeScript config file loading is handled using [`tsm`](https://github.com/lukeed/tsm) and will respect your project’s `tsconfig` options.


See the [Configuring Astro Guide](/en/guides/configuring-astro/) for details on setting configurations.


### `tsconfig.json`

[Section titled tsconfig.json](#tsconfigjson)
This file is generated in every starter template and includes TypeScript configuration options for your Astro project. Some features (like npm package imports) aren’t fully supported in the editor without a `tsconfig.json` file.


See the [TypeScript Guide](/en/guides/typescript/) for details on setting configurations.


Learn