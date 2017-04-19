# &lt;img-exif&gt;

> This vanilla web component simply takes a `src` attribute like the standard `img` element and renders it in it's correct orientation using any embedded EXIF data.
>
> Note: This component only works for **same-origin images** or **images with cross-origin headers**!
>
> `img-exif` has **no dependencies** (but may require a polyfill).


<!-- ## Demo

**[See demo page for examples](https://robjtede.uk/open-source/img-exif)** -->


## Install

Install `img-exif` with your preferred node package manager.

```sh
$ yarn add img-exif

or

$ npm install --save img-exif
```

You will need to include any polyfills for browsers that do not support the Web Components v1 spec. See [https://github.com/webcomponents/webcomponentsjs](https://github.com/webcomponents/webcomponentsjs).


## Usage

Import the HTML file in the `<head>` after [installing](#install).
```html
<link rel="import" href="./node_modules/img-exif/img-exif.html">
```

Use the tag on your page.
```html
<img-exif src="./your-image.jpg"></img-exif>
```


## Options

| Attribute | Type  | Default | Description            |
|:----------|:------|:--------|:-----------------------|
| `src`     | *url* |         | Same as `<img src="">` |
<!--
| `loading` | *boolean*            | true    | Show animated loading indicator? |
 -->

## Limitations
- No option to use `height=` or `width=` attributes. Use CSS `width:` and `height:` properties instead.

## History

For changelog, [see releases.](https://github.com/robjtede/img-exif/releases)

## License

[MIT License](https://github.com/robjtede/img-exif/blob/master/LICENSE.md)
