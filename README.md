# img-exif

This vanilla web component simply takes a `src` attribute like the standard `img` tag and renders it in it's correct orientation using any embedded EXIF data.

Note: This component only works for **same-origin images** or **images with cross-origin headers**!

img-exif has **no dependencies** (but may require a polyfill).


<!-- ## Demo

**[See demo page for examples](https://robjtede.uk/open-source/img-exif)** -->

## Usage

Import the HTML file in the `<head>` after [installing](#Installation).
```html
<link rel="import" href="./node_modules/img-exif/img-exif.html">
```

Use the tag on your page.
```html
<img-exif src="./your-image.jpg"></img-exif>
```

## Installation

Simply install with your preferred node package manager.

```bash
yarn add img-exif
```

or

```bash
npm install --save img-exif
```

You will need to include any polyfills for browsers that do not support the Web Components v1 spec. See [https://github.com/webcomponents/webcomponentsjs](https://github.com/webcomponents/webcomponentsjs).
