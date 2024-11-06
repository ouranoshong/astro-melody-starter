---
author: AA
category:
- One
cover: https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw3fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: low angle photography of gray building at daytime
description: ''
pubDate: 2024-01-28 00:00:00
slug: astro-api-reference-reference-modules-astro-assets
tags:
- tutorial
- Go
- Less
title: Assets API Reference 
---

**Added in:**
`astro@3.0.0`



Astro provides built\-in components and helper functions for optimizing and displaying your images. For features and usage examples, [see our image guide](/en/guides/images/).


Imports from `astro:assets`
---------------------------

[Section titled Imports from astro:assets](#imports-from-astroassets)





```
import {  Image,  Picture,  getImage,  inferRemoteSize, } from 'astro:assets';
```

### `<Image />`

[Section titled \&lt;Image /\&gt;](#image-)


src/components/MyComponent.astro


```
---// import the Image component and the imageimport { Image } from 'astro:assets';import myImage from "../assets/my_image.png"; // Image is 1600x900---
<!-- `alt` is mandatory on the Image component --><Image src={myImage} alt="A description of my image." />
```






```
<!-- Output --><!-- Image is optimized, proper attributes are enforced --><img  src="/_astro/my_image.hash.webp"  width="1600"  height="900"  decoding="async"  loading="lazy"  alt="A description of my image."/>
```

#### Image properties

[Section titled Image properties](#image-properties)
The `<Image />` component accepts all properties accepted by the HTML `<img>` tag in addition to the properties described below.


##### src (required)

[Section titled src (required)](#src-required)
**Type:** `ImageMetadata | string | Promise<{ default: ImageMetadata }>`


The format of the `src` value of your image file depends on where your image file is located:


* **Local images in `src/`** \- you must **also import the image** using a relative file path or configure and use an [import alias](/en/guides/imports/#aliases). Then use the import name as the `src` value:




src/pages/index.astro


```
---import { Image } from 'astro:assets';import myImportedImage from '../assets/my-local-image.png';---<Image src={myImportedImage} alt="descriptive text" />
```
* **Images in the `public/` folder** \- use the image’s **file path relative to the public folder**:




src/pages/index.astro


```
---import { Image } from 'astro:assets';---<Image  src="/images/my-public-image.png"  alt="descriptive text"  width="200"  height="150"/>
```
* **Remote images** \- use the image’s **full URL** as the property value:




src/pages/index.astro


```
---import { Image } from 'astro:assets';---<Image  src="https://example.com/remote-image.jpg"  alt="descriptive text"  width="200"  height="150"/>
```


##### alt (required)

[Section titled alt (required)](#alt-required)
**Type:** `string`


Use the required `alt` attribute to provide a string of [descriptive alt text](https://www.w3.org/WAI/tutorials/images/) for images.


If an image is merely decorative (i.e. doesn’t contribute to the understanding of the page), set `alt=""` so that screen readers and other assistive technologies know to ignore the image.


##### width and height (required for images in `public/`)

[Section titled width and height (required for images in public/)](#width-and-height-required-for-images-in-public)
**Type:** `number | undefined`


These properties define the dimensions to use for the image.


When using images in their original aspect ratio, `width` and `height` are optional. These dimensions can be automatically inferred from image files located in `src/`. For remote images, add [the `inferSize` attribute set to `true`](#infersize) on the `<Image />` or `<Picture />` component or use [`inferRemoteSize()` function](#inferremotesize).


However, both of these properties are required for images stored in your `public/` folder as Astro is unable to analyze these files.


##### densities

[Section titled densities](#densities)
**Type:** `(number | `${number}x`)[] | undefined`  



**Added in:**
`astro@3.3.0`

A list of pixel densities to generate for the image.


If provided, this value will be used to generate a `srcset` attribute on the `<img>` tag. Do not provide a value for `widths` when using this value.


Densities that are equal to widths larger than the original image will be ignored to avoid upscaling the image.




src/components/MyComponent.astro


```
---import { Image } from 'astro:assets';import myImage from '../assets/my_image.png';---<Image  src={myImage}  width={myImage.width / 2}  densities={[1.5, 2]}  alt="A description of my image."/>
```






```
<!-- Output --><img  src="/_astro/my_image.hash.webp"  srcset="    /_astro/my_image.hash.webp 1.5x    /_astro/my_image.hash.webp 2x  "  alt="A description of my image."  width="800"  height="450"  loading="lazy"  decoding="async"/>
```

##### widths

[Section titled widths](#widths)
**Type:** `number[] | undefined`  



**Added in:**
`astro@3.3.0`

A list of widths to generate for the image.


If provided, this value will be used to generate a `srcset` attribute on the `<img>` tag. A [`sizes` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes) must also be provided.


Do not provide a value for `densities` when using this value. Only one of these two values can be used to generate a `srcset`.


Widths that are larger than the original image will be ignored to avoid upscaling the image.







```
---import { Image } from 'astro:assets';import myImage from '../assets/my_image.png'; // Image is 1600x900---<Image  src={myImage}  widths={[240, 540, 720, myImage.width]}  sizes={`(max-width: 360px) 240px, (max-width: 720px) 540px, (max-width: 1600px) 720px, ${myImage.width}px`}  alt="A description of my image."/>
```






```
<!-- Output --><img  src="/_astro/my_image.hash.webp"  srcset="    /_astro/my_image.hash.webp 240w,    /_astro/my_image.hash.webp 540w,    /_astro/my_image.hash.webp 720w,    /_astro/my_image.hash.webp 1600w  "  sizes="    (max-width: 360px) 240px,    (max-width: 720px) 540px,    (max-width: 1600px) 720px,    1600px  "  alt="A description of my image."  width="1600"  height="900"  loading="lazy"  decoding="async"/>
```

##### format

[Section titled format](#format)
**Type:** `ImageOutputFormat | undefined`


You can optionally state the [image file type](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#common_image_file_types) output to be used.


By default, the `<Image />` component will produce a `.webp` file.


##### quality

[Section titled quality](#quality)
**Type:** `ImageQuality | undefined`


`quality` is an optional property that can either be:


* a preset (`low`, `mid`, `high`, `max`) that is automatically normalized between formats.
* a number from `0` to `100` (interpreted differently between formats).


##### inferSize

[Section titled inferSize](#infersize)
**Type:** `boolean`  



**Added in:**
`astro@4.4.0`

Allows you to set the original `width` and `height` of a remote image automatically.


By default, this value is set to `false` and you must manually specify both dimensions for your remote image.


Add `inferSize` to the `<Image />` component (or `inferSize: true` to `getImage()`) to infer these values from the image content when fetched. This is helpful if you don’t know the dimensions of the remote image, or if they might change:







```
---import { Image } from 'astro:assets';---<Image src="https://example.com/cat.png" inferSize alt="A cat sleeping in the sun." />
```

`inferSize` can fetch the dimensions of a [remote image from a domain that has not been authorized](/en/guides/images/#authorizing-remote-images), however the image itself will remain unprocessed.


### `<Picture />`

[Section titled \&lt;Picture /\&gt;](#picture-)

**Added in:**
`astro@3.3.0`



Use the built\-in `<Picture />` Astro component to display a responsive image with multiple formats and/or sizes.




src/pages/index.astro


```
---import { Picture } from 'astro:assets';import myImage from "../assets/my_image.png"; // Image is 1600x900---
<!-- `alt` is mandatory on the Picture component --><Picture src={myImage} formats={['avif', 'webp']} alt="A description of my image." />
```






```
<!-- Output --><picture>  <source srcset="/_astro/my_image.hash.avif" type="image/avif" />  <source srcset="/_astro/my_image.hash.webp" type="image/webp" />  <img    src="/_astro/my_image.hash.png"    width="1600"    height="900"    decoding="async"    loading="lazy"    alt="A description of my image."  /></picture>
```

#### Picture properties

[Section titled Picture properties](#picture-properties)
`<Picture />` accepts all the properties of [the `<Image />` component](#image-properties), plus the following:


##### `formats`

[Section titled formats](#formats)
**Type:** `ImageOutputFormat[]`


An array of image formats to use for the `<source>` tags. Entries will be added as `<source>` elements in the order they are listed, and this order determines which format is displayed. For the best performance, list the most modern format first (e.g. `webp` or `avif`). By default, this is set to `['webp']`.


##### `fallbackFormat`

[Section titled fallbackFormat](#fallbackformat)
**Type:** `ImageOutputFormat`


Format to use as a fallback value for the `<img>` tag. Defaults to `.png` for static images (or `.jpg` if the image is a JPG), `.gif` for animated images, and `.svg` for SVG files.


##### `pictureAttributes`

[Section titled pictureAttributes](#pictureattributes)
**Type:** `HTMLAttributes<'picture'>`


An object of attributes to be added to the `<picture>` tag.


Use this property to apply attributes to the outer `<picture>` element itself. Attributes applied to the `<Picture />` component directly will apply to the inner `<img>` element, except for those used for image transformation.




src/components/MyComponent.astro


```
---import { Picture } from "astro:assets";import myImage from "../my_image.png"; // Image is 1600x900---
<Picture  src={myImage}  alt="A description of my image."  pictureAttributes={{ style: "background-color: red;" }}/>
```






```
<!-- Output --><picture style="background-color: red;">  <source srcset="/_astro/my_image.hash.webp" type="image/webp" />  <img    src="/_astro/my_image.hash.png"    alt="A description of my image."    width="1600"    height="900"    loading="lazy"    decoding="async"  /></picture>
```

### `getImage()`

[Section titled getImage()](#getimage)
**Type:** `(options: UnresolvedImageTransform) => Promise<GetImageResult>`


Caution

`getImage()` relies on server\-only APIs and breaks the build when used on the client.


The `getImage()` function is intended for generating images destined to be used somewhere else than directly in HTML, for example in an [API Route](/en/guides/endpoints/#server-endpoints-api-routes). It also allows you to create your own custom `<Image />` component.


`getImage()` takes an options object with the [same properties as the Image component](#image-properties) (except `alt`).







```
---import { getImage } from "astro:assets";import myBackground from "../background.png"
const optimizedBackground = await getImage({src: myBackground, format: 'avif'})---
<div style={`background-image: url(${optimizedBackground.src});`}></div>
```

It returns an object with the following type:







```
type GetImageResult = {  /* Additional HTML attributes needed to render the image (width, height, style, etc..) */  attributes: Record<string, any>;  /* Validated parameters passed */  options: ImageTransform;  /* Original parameters passed */  rawOptions: ImageTransform;  /* Path to the generated image */  src: string;  srcSet: {    /* Generated values for srcset, every entry has a url and a size descriptor */    values: SrcSetValue[];    /* A value ready to use in`srcset` attribute */    attribute: string;  };}
```

### inferRemoteSize()

[Section titled inferRemoteSize()](#inferremotesize)
**Type:** `(url: string) => Promise<Omit<ImageMetadata, 'src' | 'fsPath'>>`  



**Added in:**
`astro@4.12.0`

A function to infer the dimensions of remote images. This can be used as an alternative to passing the `inferSize` property.







```
import { inferRemoteSize } from 'astro:assets';const {width, height} = await inferRemoteSize("https://example.com/cat.png");
```

Reference