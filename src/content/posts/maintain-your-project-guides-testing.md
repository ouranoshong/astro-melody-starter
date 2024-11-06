---
author: AA
category:
- Two
cover: https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw4fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: blue boats parked on river between multicolored buildings at sunset
description: An intro to testing in Astro
pubDate: 2024-02-28 00:00:00
slug: maintain-your-project-guides-testing
tags:
- astro
- Javascript
- Sass
title: Testing 
---

Testing helps you write and maintain working Astro code. Astro supports many popular tools for unit tests, component tests, and end\-to\-end tests including Jest, Mocha, Jasmine, [Cypress](https://cypress.io) and [Playwright](https://playwright.dev). You can even install framework\-specific testing libraries such as React Testing Library to test your UI framework components.


Testing frameworks allow you to state **assertions** or **expectations** about how your code should behave in specific situations, then compare these to the actual behavior of your current code.


Unit and integration tests
--------------------------

[Section titled Unit and integration tests](#unit-and-integration-tests)
### Vitest

[Section titled Vitest](#vitest)
A Vite\-native unit test framework with ESM, TypeScript and JSX support powered by esbuild.


Use Astro’s `getViteConfig()` helper in your [`vitest.config.ts` configuration file](https://vitest.dev/config/) to set up Vitest with your Astro project’s settings:




vitest.config.ts


```
/// <reference types="vitest" />import { getViteConfig } from 'astro/config';
export default getViteConfig({  test: {    // Vitest configuration options  },});
```

By default, `getViteConfig()` will try to load an Astro config file in your project and apply it to the test environment.
As of Astro 4\.8, if you need to customize the Astro configuration applied in your tests, pass a second argument to `getViteConfig()`:







```
export default getViteConfig(  { test: { /* Vitest configuration options */ } },  {    site: 'https://example.com/',    trailingSlash: 'always',  },);
```

See the [Astro \+ Vitest starter template](https://github.com/withastro/astro/tree/latest/examples/with-vitest) on GitHub.


#### Vitest and Container API

[Section titled Vitest and Container API](#vitest-and-container-api)

**Added in:**
`astro@4.9.0`



You can natively test Astro components using the [container API](/en/reference/container-reference/). First, setup [`vitest` as explained above](#vitest), then create a `.test.js` file to test your component:




example.test.js


```
import { experimental_AstroContainer as AstroContainer } from 'astro/container';import { expect, test } from 'vitest';import Card from '../src/components/Card.astro';
test('Card with slots', async () => {  const container = await AstroContainer.create();  const result = await container.renderToString(Card, {    slots: {      default: 'Card content',    },  });
  expect(result).toContain('This is a card');  expect(result).toContain('Card content');});
```

End\-to\-end tests
------------------

[Section titled End\-to\-end tests](#end-to-end-tests)
### Playwright

[Section titled Playwright](#playwright)
Playwright is an end\-to\-end testing framework for modern web apps. Use the Playwright API in JavaScript or TypeScript to test your Astro code on all modern rendering engines including Chromium, WebKit, and Firefox.


#### Installation

[Section titled Installation](#installation)
You can get started and run your tests using the [VS Code Extension](https://playwright.dev/docs/getting-started-vscode).


Alternatively, you can install Playwright within your Astro project using the package manager of your choice. Follow the CLI steps to choose JavaScript/TypeScript, name your test folder, and add an optional GitHub Actions workflow.





* [npm](#tab-panel-486)
* [pnpm](#tab-panel-487)
* [Yarn](#tab-panel-488)






Terminal window


```
npm init playwright@latest
```





Terminal window


```
pnpm dlx create-playwright
```





Terminal window


```
yarn create playwright
```





#### Create your first Playwright test

[Section titled Create your first Playwright test](#create-your-first-playwright-test)
1. Choose a page to test. This example will test the example page `index.astro` below.




src/pages/index.astro


```
------<html lang="en">  <head>    <title>Astro is awesome!</title>    <meta name="description" content="Pull content from anywhere and serve it fast with Astro's next-gen island architecture." />  </head>  <body></body></html>
```
2. Create a new folder and add the following test file in `src/test`. Copy and paste the following test into the file to verify that the page meta information is correct. Update the value of the page `<title>` to match the page you are testing.




src/test/index.spec.ts


```
import { test, expect } from '@playwright/test';
test('meta is correct', async ({ page }) => {  await page.goto("http://localhost:4321/");
  await expect(page).toHaveTitle('Astro is awesome!');});
```

Set a `baseUrl`

You can set [`"baseURL": "http://localhost:4321"`](https://playwright.dev/docs/api/class-testoptions#test-options-base-url) in the `playwright.config.ts` configuration file to use `page.goto("/")` instead of `page.goto("http://localhost:4321/")` for a more convenient URL.


#### Running your Playwright tests

[Section titled Running your Playwright tests](#running-your-playwright-tests)
You can run a single test or several tests at once, testing one or multiple browsers. By default, your test results will be shown in the terminal. Optionally, you can open the HTML Test Reporter to show a full report and filter test results.


1. To run our test from the previous example using the command line, use the `test` command. Optionally, include the file name to run just the single test:




Terminal window


```
npx playwright test index.spec.ts
```
2. To see the full HTML Test Report, open it using the following command:




Terminal window


```
npx playwright show-report
```


Tip

Run your tests against your production code to more closely resemble your live, deployed site.


##### Advanced: Launching a development web server during the tests

[Section titled Advanced: Launching a development web server during the tests](#advanced-launching-a-development-web-server-during-the-tests)
You can also have Playwright start your server when you run your testing script by using the [`webServer`](https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests) option in the Playwright configuration file.


Here is an example of the configuration and commands required when using npm:


1. Add a test script to your `package.json` file in the project root, such as `"test:e2e": "playwright test"`.
2. In `playwright.config.ts`, add the `webServer` object and update the command value to `npm run preview`.




playwright.config.ts


```
import { defineConfig } from '@playwright/test';
export default defineConfig({  webServer: {    command: 'npm run preview',    url: 'http://localhost:4321/',    timeout: 120 * 1000,    reuseExistingServer: !process.env.CI,  },  use: {    baseURL: 'http://localhost:4321/',  },});
```
3. Run `npm run build`, then run `npm run test:e2e` to run the Playwright tests.


More information about Playwright can be found in the links below:


* [Getting started with Playwright](https://playwright.dev/docs/intro)
* [Use a development server](https://playwright.dev/docs/test-webserver#configuring-a-web-server)


### Cypress

[Section titled Cypress](#cypress)
Cypress is a front\-end testing tool built for the modern web. Cypress enables you to write end\-to\-end tests for your Astro site.


#### Installation

[Section titled Installation](#installation-1)
You can install Cypress using the package manager of your choice.




* [npm](#tab-panel-489)
* [pnpm](#tab-panel-490)
* [Yarn](#tab-panel-491)






Terminal window


```
npm install -D cypress
```
This will install Cypress locally as a dev dependency for your project.






Terminal window


```
pnpm add cypress --save-dev
```





Terminal window


```
yarn add cypress --dev
```




#### Configuration

[Section titled Configuration](#configuration)
In the root of your project, create a `cypress.config.js` file with the following content:




cypress.config.js


```
import { defineConfig } from 'cypress'
export default defineConfig({  e2e: {    supportFile: false  }})
```

#### Create your first Cypress test

[Section titled Create your first Cypress test](#create-your-first-cypress-test)
1. Choose a page to test. This example will test the example page `index.astro` below.




src/pages/index.astro


```
------<html lang="en">  <head>    <title>Astro is awesome!</title>    <meta name="description" content="Pull content from anywhere and serve it fast with Astro's next-gen island architecture." />  </head>  <body>  <h1>Hello world from Astro</h1>  </body></html>
```
2. Create an `index.cy.js` file in the `cypress/e2e` folder. Use the following test in the file to verify that the page title and header are correct.




cypress/e2e/index.cy.js


```
it('titles are correct', () => {  const page = cy.visit('http://localhost:4321');
  page.get('title').should('have.text', 'Astro is awesome!')  page.get('h1').should('have.text', 'Hello world from Astro');});
```

Set a `baseUrl`

You can set [`"baseUrl": "http://localhost:4321"`](https://docs.cypress.io/guides/end-to-end-testing/testing-your-app#Step-3-Configure-Cypress) in the `cypress.config.js` configuration file to use `cy.visit("/")` instead of `cy.visit("http://localhost:4321/")` for a more convenient URL.


#### Running your Cypress tests

[Section titled Running your Cypress tests](#running-your-cypress-tests)
Cypress can be run from the command line or from the Cypress App. The App provides a visual interface for running and debugging your tests.


First, start the dev server so Cypress can access your live site.


To run our test from the previous example using the command line, execute the following command:




Terminal window


```
npx cypress run
```

Alternatively, to run the test using the Cypress App, execute the following command:




Terminal window


```
npx cypress open
```

Once the Cypress App is launched, choose **E2E Testing**, then select the browser to be used to run tests.


Once the test run is finished, you should see green check marks in the output confirming that your test passed:




Output from npx cypress run


```
Running:  index.cy.js                                                                     (1 of 1)
✓ titles are correct (107ms)
1 passing (1s)
```

Fail the test

To check that your test really does work, you can change the following line in the `index.astro` file:



src/pages/index.astro


```
 <body>   <h1>Hello world from Astro</h1>   <h1>Hello from Astro</h1> </body>
```
Then run the test again. You should see a red “x” in the output confirming that your test failed.


#### Next steps

[Section titled Next steps](#next-steps)
More information about Cypress can be found in the links below:


* [Introduction to Cypress](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress)
* [Testing Your App](https://docs.cypress.io/guides/end-to-end-testing/testing-your-app)


### NightwatchJS

[Section titled NightwatchJS](#nightwatchjs)
Nightwatch.js is a test automation framework with a powerful set of tools to write, run, and debug your tests across the web with built\-in support for all major browsers and their mobile equivalents, as well as native mobile applications.


#### Installation

[Section titled Installation](#installation-2)
You can install NightwatchJS within your Astro project using the package manager of your choice. Follow the CLI steps to choose JavaScript/TypeScript, name your test folder, and select whether or not to include component testing and testing on mobile browsers.




* [npm](#tab-panel-492)
* [pnpm](#tab-panel-493)
* [Yarn](#tab-panel-494)






Terminal window


```
npm init nightwatch@latest
```





Terminal window


```
pnpm dlx create-nightwatch
```





Terminal window


```
yarn create nightwatch
```




#### Create your first Nightwatch test

[Section titled Create your first Nightwatch test](#create-your-first-nightwatch-test)
1. Choose a page to test. This example will test the example page `index.astro` below.




src/pages/index.astro


```
------<html lang="en">  <head>    <title>Astro is awesome!</title>    <meta name="description" content="Pull content from anywhere and serve it fast with Astro's next-gen island architecture." />  </head>  <body></body></html>
```
2. Create a new folder `src/test/` and add the following test file:




src/test/index.js


```
describe('Astro testing with Nightwatch', function () {    before(browser => browser.navigateTo('http://localhost:4321/'));
    it("check that the title is correct", function (browser) {        browser.assert.titleEquals('Astro is awesome!')    });
    after(browser => browser.end());});
```

Set a `baseUrl`

You can set [`"baseURL": "http://localhost:4321"`](https://nightwatchjs.org/guide/reference/settings.html#setting-the-baseurl-property) in the `nightwatch.conf.js` configuration file to use `browser.navigateTo("/")` instead of `browser.navigateTo("http://localhost:4321/")` for a more convenient URL.


#### Running your NightwatchJS tests

[Section titled Running your NightwatchJS tests](#running-your-nightwatchjs-tests)
You can run a single test or several tests at once, testing one or multiple browsers. By default, your test results will be shown in the terminal. Optionally, you can open the HTML Test Reporter to show a full report and filter test results.


You can run the tests with the [NightwatchJS VSCode Extension](https://marketplace.visualstudio.com/items?itemName=browserstackcom.nightwatch) or using the CLI steps below:


1. To run all tests, enter the following command in the terminal. Optionally, include the file name to run just the single test:




Terminal window


```
npx nightwatch test/index.js
```

Additionally, you can run the tests against a specific browser using the `--environment` or `-e` CLI argument. If you don’t have the relevant browser installed, Nightwatch will attempt to set it up for you using [Selenium Manager](https://www.selenium.dev/blog/2022/introducing-selenium-manager/):




Terminal window


```
npx nightwatch test/index.ts -e firefox
```
2. To see the full HTML Test Report, open it using the following command:




Terminal window


```
npx nightwatch test/index.ts --open
```


Tip

Run your tests against your production code to more closely resemble your live, deployed site.


More information about NightwatchJS can be found in the links below:


* [Intro to Nightwatch](https://nightwatchjs.org/guide/overview/what-is-nightwatch.html)
* [Testing with Nightwatch](https://nightwatchjs.org/guide/writing-tests/introduction.html)


Learn