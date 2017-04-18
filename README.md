# img-exif

The img-exif component simply takes a `src` like the standard `img` tag and renders it in it's correct orientation using embedded any EXIF data.

Note: This component only works for **same-origin images** or **images with cross-origin headers**!

## Usage

Import the HTML file in the `<head>`.
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
