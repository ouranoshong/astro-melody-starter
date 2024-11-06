---
author: AA
category:
- One
cover: https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHwyfHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: worm's-eye view photography of concrete building
description: Learn how to upgrade Astro
pubDate: 2024-01-13 00:00:00
slug: maintain-your-project-upgrade-astro
tags:
- basics
- Javascript
- Less
title: Upgrade Astro 
---

This guide covers how to update your version of Astro and related dependencies, how to learn what has changed from one version to the next, and how to understand Astro’s versioning system and corresponding documentation updates.


What has changed?
-----------------

[Section titled What has changed?](#what-has-changed)
The latest release of Astro is v4\.16\.8.


You can find an exhaustive list of all changes in [Astro’s changelog](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md), and important instructions for upgrading to each new [major version](#major-changes) in our [upgrade guides](#upgrade-guides).


Upgrade to the latest version
-----------------------------

[Section titled Upgrade to the latest version](#upgrade-to-the-latest-version)
Update your project’s version of Astro and all official integrations to the latest versions with one command using your package manager:





* [npm](#tab-panel-638)
* [pnpm](#tab-panel-639)
* [Yarn](#tab-panel-640)






Terminal window


```
# Upgrade Astro and official integrations togethernpx @astrojs/upgrade
```





Terminal window


```
# Upgrade Astro and official integrations togetherpnpm dlx @astrojs/upgrade
```





Terminal window


```
# Upgrade Astro and official integrations togetheryarn dlx @astrojs/upgrade
```





### Manual Upgrading

[Section titled Manual Upgrading](#manual-upgrading)
To update Astro and integrations to their current versions manually, use the appropriate command for your package manager.




* [npm](#tab-panel-641)
* [pnpm](#tab-panel-642)
* [Yarn](#tab-panel-643)






Terminal window


```
# Example: upgrade Astro with React and Tailwind integrationsnpm install astro@latest @astrojs/react@latest @astrojs/tailwind@latest
```





Terminal window


```
# Example: upgrade Astro with React and Tailwind integrationspnpm add astro@latest @astrojs/react@latest @astrojs/tailwind@latest
```





Terminal window


```
# Example: upgrade Astro with React and Tailwind integrationsyarn add astro@latest @astrojs/react@latest @astrojs/tailwind@latest
```




### Install a specific version number

[Section titled Install a specific version number](#install-a-specific-version-number)
To install a specific [version of Astro](https://www.npmjs.com/package/astro?activeTab=versions) or integrations, use the appropriate command for your package manager.




* [npm](#tab-panel-644)
* [pnpm](#tab-panel-645)
* [Yarn](#tab-panel-646)






Terminal window


```
npm install astro@4.5.3 @astrojs/react@3.0.10
```





Terminal window


```
pnpm add astro@4.5.3 @astrojs/react@3.0.10
```





Terminal window


```
yarn add astro@4.5.3 @astrojs/react@3.0.10
```




Documentation updates
---------------------

[Section titled Documentation updates](#documentation-updates)
This documentation is updated for each [minor release](#minor-changes) and [major version release](#major-changes). When new features are added, or existing usage changes, the docs will update to reflect the **current behavior of Astro**. If your project is not updated, then you may notice some behaviors do not match the up\-to\-date documentation.


New features are added to docs with the specific version number in which they were added. This means that if you have not updated to the latest release of Astro, some documented features may be unavailable. Always check the `Added in:` version number and make sure your project is updated before attempting to use new features!


If you have not upgraded to the latest major version of Astro, you may encounter significant differences between the Astro documentation and your project’s behavior. We strongly recommend upgrading to the current major version of Astro as soon as you are able. Both the code and the documentation for earlier versions is unsupported.


### Upgrade Guides

[Section titled Upgrade Guides](#upgrade-guides)
After every [major version release](#major-changes), you will find an **upgrade guide** with information about important changes and instructions for upgrading your project code.


The main Astro documentation pages are always **accurate for the latest released version of Astro**. They do not describe or compare to how things worked in previous versions, nor do they highlight updated or changed behavior.


See the upgrade guides below for an explanation of changes, comparing the new version to the old. The upgrade guides include everything that could require you to change your own code: breaking changes, deprecations, feature removals and replacements as well as updated usage guidance. Each change to Astro includes a “What should I do?” section to help you successfully update your project code.


Tip

Want to upgrade to the v5 beta? Check out the [v5 upgrade guide in the beta docs](https://5-0-0-beta.docs.astro.build/en/guides/upgrade-to/v5/).


* [Upgrade to v4](/en/guides/upgrade-to/v4/)
* [Upgrade to v3](/en/guides/upgrade-to/v3/)
* [Upgrade to v2](/en/guides/upgrade-to/v2/)
* [Upgrade to v1](/en/guides/upgrade-to/v1/)


### Older docs (unmaintained)

[Section titled Older docs (unmaintained)](#older-docs-unmaintained)
Documentation for older versions of Astro is not maintained, but is available as a static snapshot. Use these versions of docs if you are unable to upgrade your project, but still wish to consult guides and reference:


* [unmaintained v3\.6\.3 snapshot](https://docs-git-v3-docs-unmaintained-astrodotbuild.vercel.app/)
* [unmaintained v2\.10\.15 snapshot](https://deploy-preview-4405--astro-docs-2.netlify.app/en/getting-started/)


Semantic versioning
-------------------

[Section titled Semantic versioning](#semantic-versioning)
Astro attempts to adhere as much as possible to [semantic versioning](https://semver.org/), which is a set of rules developers use to determine how to assign a version number to a release. Semantic version follows a predictable pattern to inform users of the kind of changes they can expect from one version to the next.


Semantic versioning enforces a pattern of `X.Y.Z` for software version numbers. These values represent **major (X)**, **minor (Y)**, and **patch (Z)** updates.


### Patch changes

[Section titled Patch changes](#patch-changes)
Patch changes are the least disruptive changes. They do not change the way you use Astro, and no change to your own code is required when you update.


When Astro issues a “patch” version, the last number increases. (e.g. `astro@4.3.14` \-\> `astro@4.3.15`)


Patches may be released for reasons such as:


* Internal changes that do not change Astro’s functionality:
	+ refactors
	+ performance improvements
	+ increase or change in test coverage
	+ aligning with stated documentation and expected behavior
* Improvements to logging and error messages.
* Re\-releases after a failed release.


Patch changes also include **most bug fixes**, even in cases where users were taking advantage of existing unintended or undesirable behavior.


### Minor changes

[Section titled Minor changes](#minor-changes)
Minor releases primarily introduce new features and improvements that you may wish to try, but require no changes to your code. Some existing features may also be **deprecated** (marked for deletion in a future version while continuing to function) in a minor release, giving you the opportunity to prepare for their eventual removal.


Minor releases include changes such as:


* **Deprecations** of existing features/options with a warning that they will be removed in an upcoming major release.
* Introduction of new functionalities.
* Introduction of new options in the integration hooks.
* Introduction of new functionalities in `astro/app`, notably used for creating new adapters.


A minor release may also include smaller, patch changes at the same time.


### Major changes

[Section titled Major changes](#major-changes)
Major releases will include breaking changes to at least some existing code. These breaking changes are always documented in an [“Upgrade to vX” guide](#upgrade-guides) in Astro.


Major releases allow Astro to make significant changes not only to internal logic, but also to intended behavior and usage. Documentation will be updated to reflect the latest version only, and **static, unmaintained snapshots of older docs** are available as a historical record for older projects that are not yet upgraded.


Major releases include changes such as:


* Removal of previously deprecated functionalities.
* Changes of existing functionalities.
* Changes of existing options in the integration hooks.
* Changes of existing options and functionalities in `astro/app`, notably used for creating new adapters.


A major release may also include some non\-breaking changes and improvements that would normally be released separately in a minor or patch release.


### Exceptions

[Section titled Exceptions](#exceptions)
* **Experimental features**. Releasing versions of Astro without adhering to semantic versioning allows Astro developers the greatest flexibility to explore, and even radically change course, during the development of experimental features. Therefore, the behavior of these features can break in minor and patch changes.


These features are usually accompanied by an ongoing, public [Request for Consideration (RFC) stage 3](https://github.com/withastro/roadmap#stage-3-rfc--development). It is expected that beta users will follow for updates, and leave early feedback on the discussion to help guide development of these features.


Once these features are out of their experimental period, they will follow the normal semantic versioning contract.
* **Improvements to the documentation** (e.g. reference and error messages). They are built from source for the `docs` repository. This allows Astro to quickly update docs fixes and improvements in the cases where documentation source content is stored in the main `astro` repository.


### Node.js support and upgrade policies

[Section titled Node.js support and upgrade policies](#nodejs-support-and-upgrade-policies)
#### Support

[Section titled Support](#support)
* Astro supports the [**latest *Maintenance* LTS** version of Node.js](https://nodejs.org/en/about/previous-releases#release-schedule).
* Astro supports the [**current *Active* LTS** version of Node.js](https://nodejs.org/en/about/previous-releases#release-schedule)
* Astro can support odd versions of Node.js.


#### Upgrade

[Section titled Upgrade](#upgrade)
The following rules define when Astro may deprecate, drop, or add support for versions of Node.js:


* Odd versions of Node.js can be deprecated and/or dropped when the next even version of Node.js published. This change can occur in a **minor** release of Astro, after a reasonable period of extended support as decided by the Astro Core team.
* Upgrading the minimum ***Maintenance* LTS** (within the same major range, e.g. from `v18.14.*` to `v18.20.*`) version of Node.js can occur in a **minor** release of Astro.
	+ Security exception: If a security flaw in Node.js that **affects Astro** is disclosed and fixed, the Core team can bump the minimum version of the ***Maintenance* LTS** in a **patch** release.
* Upgrading minor or major versions of Node.js (**not** Maintenance LTS) occurs only in major versions of Astro.
	+ Security exception: If a security flaw in Node.js that **affects Astro** is disclosed and fixed, the Core team can bump the minimum version in a **minor** release.


### Extended maintenance

[Section titled Extended maintenance](#extended-maintenance)
The Core team will provide extended maintenance **for security fixes only** for one previous major version. This means that if the current major is `v4.*`, the Core team will back port security fixes and issue a new `v3.*` release.


Learn