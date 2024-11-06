---
author: AA
category:
- Three
cover: https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw4fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: blue boats parked on river between multicolored buildings at sunset
description: ''
pubDate: 2024-01-09 00:00:00
slug: reference-reference-cli-reference
tags:
- astro
- CSharp
- Less
title: CLI Commands 
---

You can use the Command\-Line Interface (CLI) provided by Astro to develop, build, and preview your project from a terminal window.


### `astro` commands

[Section titled astro commands](#astro-commands)
Use the CLI by running one of the **commands** documented on this page with your preferred package manager, optionally followed by any **flags**. Flags customize the behavior of a command.


One of the commands you’ll use most often is `astro dev`. This command starts the development server and gives you a live, updating preview of your site in a browser as you work:





* [npm](#tab-panel-605)
* [pnpm](#tab-panel-606)
* [Yarn](#tab-panel-607)






Terminal window


```
# start the development servernpx astro dev
```





Terminal window


```
# start the development serverpnpm astro dev
```





Terminal window


```
# start the development serveryarn astro dev
```





You can type `astro --help` in your terminal to display a list of all available commands:




* [npm](#tab-panel-608)
* [pnpm](#tab-panel-609)
* [Yarn](#tab-panel-610)






Terminal window


```
npx astro --help
```





Terminal window


```
pnpm astro --help
```





Terminal window


```
yarn astro --help
```




The following message will display in your terminal:




Terminal window


```
astro [command] [...flags]
Commands              add  Add an integration.            build  Build your project and write it to disk.            check  Check your project for errors.              dev  Start the development server.             docs  Open documentation in your web browser.             info  List info about your current Astro setup.          preview  Preview your build locally.             sync  Generate TypeScript types for all Astro modules.      preferences  Configure user preferences.        telemetry  Configure telemetry settings.
Global Flags  --config <path>  Specify your config file.    --root <path>  Specify your project root folder.     --site <url>  Specify your project site.--base <pathname>  Specify your project base.        --verbose  Enable verbose logging.         --silent  Disable all logging.        --version  Show the version number and exit.           --open  Open the app in the browser on server start.           --help  Show this help message.
```

Note

The extra `--` before any flag is necessary for `npm` to pass your flags to the `astro` command.


### `package.json` scripts

[Section titled package.json scripts](#packagejson-scripts)
You can also use scripts in `package.json` for shorter versions of these commands. Using a script allows you to use the same commands that you may be familiar with from other projects, such as `npm run build`.


The following scripts for the most common `astro` commands (`astro dev`, `astro build`, and `astro preview`) are added for you automatically when you create a project using [the `create astro` wizard](/en/install-and-setup/).


When you follow the instructions to [install Astro manually](/en/install-and-setup/#manual-setup), you are instructed to add these scripts yourself. You can also add more scripts to this list manually for any commands you use frequently.




package.json


```
{  "scripts": {    "dev": "astro dev",    "start": "astro dev",    "build": "astro build",    "preview": "astro preview"  }}
```

You will often use these `astro` commands, or the scripts that run them, without any flags. Add flags to the command when you want to customize the command’s behavior. For example, you may wish to start the development server on a different port, or build your site with verbose logs for debugging.




* [npm](#tab-panel-611)
* [pnpm](#tab-panel-612)
* [Yarn](#tab-panel-613)






Terminal window


```
# run the dev server on port 8080 using the `start` script in `package.json`npm run start -- --port 8080
# build your site with verbose logs using the `build` script in `package.json`npm run build -- --verbose
```





Terminal window


```
# run the dev server on port 8080 using the `start` script in `package.json`pnpm start --port 8080
# build your site with verbose logs using the `build` script in `package.json`pnpm build --verbose
```





Terminal window


```
# run the dev server on port 8080 using the `start` script in `package.json`yarn start --port 8080
# build your site with verbose logs using the `build` script in `package.json`yarn build --verbose
```




`astro dev`
-----------

[Section titled astro dev](#astro-dev)
Runs Astro’s development server. This is a local HTTP server that doesn’t bundle assets. It uses Hot Module Replacement (HMR) to update your browser as you save changes in your editor.


`astro build`
-------------

[Section titled astro build](#astro-build)
Builds your site for deployment. By default, this will generate static files and place them in a `dist/` directory. If [SSR is enabled](/en/guides/server-side-rendering/), this will generate the necessary server files to serve your site.


Can be combined with the [common flags](#common-flags) documented below.


`astro preview`
---------------

[Section titled astro preview](#astro-preview)
Starts a local server to serve the contents of your static directory (`dist/` by default) created by running `astro build`.


This command allows you to preview your site locally [after building](#astro-build) to catch any errors in your build output before deploying it. It is not designed to be run in production. For help with production hosting, check out our guide on [Deploying an Astro Website](/en/guides/deploy/).


Since Astro 1\.5\.0, `astro preview` also works for SSR builds if you use an adapter that supports it. Currently, only the [Node adapter](/en/guides/integrations-guide/node/) supports `astro preview`.


Can be combined with the [common flags](#common-flags) documented below.


`astro check`
-------------

[Section titled astro check](#astro-check)
Runs diagnostics (such as type\-checking within `.astro` files) against your project and reports errors to the console. If any errors are found the process will exit with a code of **1**.


This command is intended to be used in CI workflows.


### Flags


Use these flags to customize the behavior of the command.


#### `--watch`

[Section titled \-\-watch](#--watch)
The command will watch for any changes in your project, and will report any errors.


#### `--root <path-to-dir>`

[Section titled \-\-root \&lt;path\-to\-dir\&gt;](#--root-path-to-dir)
Specifies a different root directory to check. Uses the current working directory by default.


#### `--tsconfig <path-to-file>`

[Section titled \-\-tsconfig \&lt;path\-to\-file\&gt;](#--tsconfig-path-to-file)
Specifies a `tsconfig.json` file to use manually. If not provided, Astro will attempt to find a config, or infer the project’s config automatically.


#### `--minimumFailingSeverity <error|warning|hint>`

[Section titled \-\-minimumFailingSeverity \&lt;error\|warning\|hint\&gt;](#--minimumfailingseverity-errorwarninghint)
Specifies the minimum severity needed to exit with an error code. Defaults to `error`.


For example, running `astro check --minimumFailingSeverity warning` will cause the command to exit with an error if any warnings are detected.


#### `--minimumSeverity <error|warning|hint>`

[Section titled \-\-minimumSeverity \&lt;error\|warning\|hint\&gt;](#--minimumseverity-errorwarninghint)
Specifies the minimum severity to output. Defaults to `hint`.


For example, running `astro check --minimumSeverity warning` will show errors and warning, but not hints.


#### `--preserveWatchOutput`

[Section titled \-\-preserveWatchOutput](#--preservewatchoutput)
Specifies not to clear the ouput between checks when in watch mode.


#### `--noSync`

[Section titled \-\-noSync](#--nosync)
Specifies not to run `astro sync` before checking the project.




Read more about [type checking in Astro](/en/guides/typescript/#type-checking).

`astro sync`
------------

[Section titled astro sync](#astro-sync)

**Added in:**
`astro@2.0.0`



Tip

Running `astro dev`, `astro build` or `astro check` will run the `sync` command as well.


Generates TypeScript types for all Astro modules. This sets up a [`src/env.d.ts` file](/en/guides/typescript/#setup) for type inferencing, and defines modules for features that rely on generated types:


* The `astro:content` module for the [Content Collections API](/en/guides/content-collections/).
* The `astro:db` module for [Astro DB](/en/guides/astro-db/).
* The `astro:env` module for [experimental Astro Env](/en/reference/configuration-reference/#experimentalenv).
* The `astro:actions` module for [Astro Actions](/en/guides/actions/)


`astro add`
-----------

[Section titled astro add](#astro-add)
Adds an integration to your configuration. Read more in [the integrations guide](/en/guides/integrations-guide/#automatic-integration-setup).


`astro docs`
------------

[Section titled astro docs](#astro-docs)
Launches the Astro Docs website directly from the terminal.


`astro info`
------------

[Section titled astro info](#astro-info)
Reports useful information about your current Astro environment. Useful for providing information when opening an issue.




Terminal window


```
astro info
```

Example output:







```
Astro                    v3.0.12Node                     v20.5.1System                   macOS (arm64)Package Manager          pnpmOutput                   serverAdapter                  @astrojs/vercel/serverlessIntegrations             none
```

`astro preferences`
-------------------

[Section titled astro preferences](#astro-preferences)
Manage user preferences with the `astro preferences` command. User preferences are specific to individual Astro users, unlike the `astro.config.mjs` file which changes behavior for everyone working on a project.


User preferences are scoped to the current project by default, stored in a local `.astro/settings.json` file.


Using the `--global` flag, user preferences can also be applied to every Astro project on the current machine. Global user preferences are stored in an operating system\-specific location.


### Available preferences


* `devToolbar` — Enable or disable the development toolbar in the browser. (Default: `true`)
* `checkUpdates` — Enable or disable automatic update checks for the Astro CLI. (Default: `true`)


The `list` command prints the current settings of all configurable user preferences. It also supports a machine\-readable `--json` output.




Terminal window


```
astro preferences list
```

Example terminal output:




| Preference | Value |
| --- | --- |
| devToolbar.enabled | true |
|
| checkUpdates.enabled | true |


You can `enable`, `disable`, or `reset` preferences to their default.


For example, to disable the devToolbar in a specific Astro project:




Terminal window


```
astro preferences disable devToolbar
```

To disable the devToolbar in all Astro projects on the current machine:




Terminal window


```
astro preferences disable --global devToolbar
```

The devToolbar can later be enabled with:




Terminal window


```
astro preferences enable devToolbar
```

The `reset` command resets a preference to its default value:




Terminal window


```
astro preferences reset devToolbar
```

`astro telemetry`
-----------------

[Section titled astro telemetry](#astro-telemetry)
Sets telemetry configuration for the current CLI user. Telemetry is anonymous data that provides the Astro team insights into which Astro features are most often used. For more information see [Astro’s telemetry page](https://astro.build/telemetry/).


Telemetry can be disabled with this CLI command:




Terminal window


```
astro telemetry disable
```

Telemetry can later be re\-enabled with:




Terminal window


```
astro telemetry enable
```

The `reset` command resets the telemetry data:




Terminal window


```
astro telemetry reset
```

Want to disable telemetry in CI environments?

Add the `astro telemetry disable` command to your CI scripts or set the `ASTRO_TELEMETRY_DISABLED` environment variable.


Common flags
------------

[Section titled Common flags](#common-flags)
### `--root <path>`

[Section titled \-\-root \&lt;path\&gt;](#--root-path)
Specifies the path to the project root. If not specified, the current working directory is assumed to be the root.


The root is used for finding the Astro configuration file.




Terminal window


```
astro --root myRootFolder/myProjectFolder dev
```

### `--config <path>`

[Section titled \-\-config \&lt;path\&gt;](#--config-path)
Specifies the path to the config file relative to the project root. Defaults to `astro.config.mjs`. Use this if you use a different name for your configuration file or have your config file in another folder.




Terminal window


```
astro --config config/astro.config.mjs dev
```

### `--outDir <path>`

[Section titled \-\-outDir \&lt;path\&gt;](#--outdir-path)

**Added in:**
`astro@3.3.0`



Configures the [`outDir`](/en/reference/configuration-reference/#outdir) for your project. Passing this flag will override the `outDir` value in your `astro.config.mjs` file, if one exists.


### `--site <url>`

[Section titled \-\-site \&lt;url\&gt;](#--site-url)
Configures the [`site`](/en/reference/configuration-reference/#site) for your project. Passing this flag will override the `site` value in your `astro.config.mjs` file, if one exists.


### `--base <pathname>`

[Section titled \-\-base \&lt;pathname\&gt;](#--base-pathname)

**Added in:**
`astro@1.4.1`



Configures the [`base`](/en/reference/configuration-reference/#base) for your project. Passing this flag will override the `base` value in your `astro.config.mjs` file, if one exists.


### `--port <number>`

[Section titled \-\-port \&lt;number\&gt;](#--port-number)
Specifies which port to run the dev server and preview server on. Defaults to `4321`.


### `--host [optional host address]`

[Section titled \-\-host \[optional host address]](#--host-optional-host-address)
Sets which network IP addresses the dev server and preview server should listen on (i.e. non\-localhost IPs). This can be useful for testing your project on local devices like a mobile phone during development.


* `--host` — listen on all addresses, including LAN and public addresses
* `--host <custom-address>` — expose on a network IP address at `<custom-address>`


Caution

Do not use the `--host` flag to expose the dev server and preview server in a production environment. The servers are designed for local use while developing your site only.


### `--verbose`

[Section titled \-\-verbose](#--verbose)
Enables verbose logging, which is helpful when debugging an issue.


### `--silent`

[Section titled \-\-silent](#--silent)
Enables silent logging, which will run the server without any console output.


Global flags
------------

[Section titled Global flags](#global-flags)
Use these flags to get information about the `astro` CLI.


### `--version`

[Section titled \-\-version](#--version)
Prints the Astro version number and exits.


### `--open`

[Section titled \-\-open](#--open)
Automatically opens the app in the browser on server start. Can be passed a full URL string (e.g. `--open http://example.com`) or a pathname (e.g. `--open /about`) to specify the URL to open.


### `--help`

[Section titled \-\-help](#--help)
Prints the help message and exits.


Advanced APIs (Experimental)
----------------------------

[Section titled Advanced APIs (Experimental)](#advanced-apis-experimental)
If you need more control when running Astro, the `"astro"` package also exports APIs to programmatically run the CLI commands.


These APIs are experimental and their API signature may change. Any updates will be mentioned in the [Astro changelog](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md) and the information below will always show the current, up\-to\-date information.


### `AstroInlineConfig`

[Section titled AstroInlineConfig](#astroinlineconfig)
The `AstroInlineConfig` type is used by all of the command APIs below. It extends from the user [Astro config](/en/reference/configuration-reference/) type:







```
interface AstroInlineConfig extends AstroUserConfig {  configFile?: string | false;  mode?: "development" | "production";  logLevel?: "debug" | "info" | "warn" | "error" | "silent";}
```

#### `configFile`

[Section titled configFile](#configfile)
**Type:** `string | false`  

**Default:** `undefined`


A custom path to the Astro config file.


If this value is undefined (default) or unset, Astro will search for an `astro.config.(js,mjs,ts,mts)` file relative to the `root` and load the config file if found.


If a relative path is set, it will resolve based on the `root` option.


Set to `false` to disable loading any config files.


The inline config passed in this object will take highest priority when merging with the loaded user config.


#### `mode`

[Section titled mode](#mode)
**Type:** `"development" | "production"`  

**Default:** `"development"` when running `astro dev`, `"production"` when running `astro build`


The mode used when building your site to generate either “development” or “production” code.


#### `logLevel`

[Section titled logLevel](#loglevel)
**Type:** `"debug" | "info" | "warn" | "error" | "silent"`  

**Default:** `"info"`


The logging level to filter messages logged by Astro.


* `"debug"`: Log everything, including noisy debugging diagnostics.
* `"info"`: Log informational messages, warnings, and errors.
* `"warn"`: Log warnings and errors.
* `"error"`: Log errors only.
* `"silent"`: No logging.


### `dev()`

[Section titled dev()](#dev)
**Type:** `(inlineConfig: AstroInlineConfig) => Promise<DevServer>`


Similar to [`astro dev`](#astro-dev), it runs Astro’s development server.







```
import { dev } from "astro";
const devServer = await dev({  root: "./my-project",});
// Stop the server if neededawait devServer.stop();
```

#### `DevServer`

[Section titled DevServer](#devserver)





```
export interface DevServer {  address: AddressInfo;  handle: (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => void;  watcher: vite.FSWatcher;  stop(): Promise<void>;}
```

##### `address`

[Section titled address](#address)
The address the dev server is listening on.


This property contains the value returned by Node’s [`net.Server#address()` method](https://nodejs.org/api/net.html#serveraddress).


##### `handle()`

[Section titled handle()](#handle)
A handle for raw Node HTTP requests. You can call `handle()` with an [`http.IncomingMessage`](https://nodejs.org/api/http.html#class-httpincomingmessage) and an [`http.ServerResponse`](https://nodejs.org/api/http.html#class-httpserverresponse) instead of sending a request through the network.


##### `watcher`

[Section titled watcher](#watcher)
The [Chokidar file watcher](https://github.com/paulmillr/chokidar#getting-started) as exposed by [Vite’s development server](https://vite.dev/guide/api-javascript#vitedevserver).


##### `stop()`

[Section titled stop()](#stop)
Stops the development server. This closes all idle connections and stops listening for new connections.


Returns a `Promise` that resolves once all pending requests have been fulfilled and all idle connections have been closed.


### `build()`

[Section titled build()](#build)
**Type:** `(inlineConfig: AstroInlineConfig) => Promise<void>`


Similar to [`astro build`](#astro-build), it builds your site for deployment.







```
import { build } from "astro";
await build({  root: "./my-project",});
```

### `preview()`

[Section titled preview()](#preview)
**Type:** `(inlineConfig: AstroInlineConfig) => Promise<PreviewServer>`


Similar to [`astro preview`](#astro-preview), it starts a local server to serve your build output.


If no adapter is set in the configuration, the preview server will only serve the built static files.
If an adapter is set in the configuration, the preview server is provided by the adapter. Adapters are not required to provide a preview server, so this feature may not be available depending on your adapter of choice.







```
import { preview } from "astro";
const previewServer = await preview({  root: "./my-project",});
// Stop the server if neededawait previewServer.stop();
```

#### `PreviewServer`

[Section titled PreviewServer](#previewserver)





```
export interface PreviewServer {  host?: string;  port: number;  closed(): Promise<void>;  stop(): Promise<void>;}
```

##### `host`

[Section titled host](#host)
The host where the server is listening for connections.


Adapters are allowed to leave this field unset. The value of `host` is implementation\-specific.


##### `port`

[Section titled port](#port)
The port where the server is listening for connections.


##### `stop()`

[Section titled stop()](#stop-1)
Asks the preview server to close, stop accepting requests, and drop idle connections.


The returned `Promise` resolves when the close request has been sent. This does not mean that the server has closed yet. Use the [`closed()`](#closed) method if you need to ensure the server has fully closed.


##### `closed()`

[Section titled closed()](#closed)
Returns a `Promise` that will resolve once the server is closed and reject if an error happens on the server.


### `sync()`

[Section titled sync()](#sync)
**Type:** `(inlineConfig: AstroInlineConfig) => Promise<void>`


Similar to [`astro sync`](#astro-sync), it generates TypeScript types for all Astro modules.







```
import { sync } from "astro";
await sync({  root: "./my-project",});
```

Reference