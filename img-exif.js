'use strict'

/* global EXIF:false */

const template = document.currentScript.ownerDocument.querySelector('template')

class ImageExif extends HTMLElement {
  constructor () {
    super()

    this.debug = false
    if (this.debug) console.log('constructing')

    this.attachShadow({mode: 'open'})
    this.root = this.shadowRoot

    this.root.appendChild(document.importNode(template.content, true))
  }

  connectedCallback () {
    if (this.debug) console.log('connected img-exif')

    this.$figure = this.root.querySelector('figure')
    this.$img = this.root.querySelector('img')

    this.render()
  }

  render () {
    if (this.src && !this.isConnected) return
    if (this.debug) console.log('rendering img-exif')

    const $this = this
    const $img = $this.$img
    const $figure = $this.$figure

    // parse image for orientation
    EXIF.getData({src: this.src}, function (buffer) {
      if ($this.debug) console.log('got EXIF data', this.src)

      // get orientation
      const orientation = EXIF.getTag(this, 'Orientation')
      if ($this.debug) console.log(`orientation code: ${orientation}`)

      // set image attributes
      if ($this.alt) $img.alt = $this.alt

      // use image data buffer as image src
      $img.src = URL.createObjectURL(new Blob([buffer]))
      $img.onload = () => {
        if ($this.debug) console.log('image loaded')

        if (!orientation || orientation === 1) {
          if ($this.width) $img.width = $this.width
          if ($this.height) $img.height = $this.height
          $figure.style.width = `${$img.width}px`
          $figure.style.height = `${$img.height}px`
        }

        $img.classList.remove('loading')
        $img.classList.add(`o${orientation}`)

        if (orientation && orientation !== 1) {
        // if image dimensions have changed
          if ([5, 6, 7, 8].includes(orientation)) {
            if ($this.width) $img.height = $this.width
            if ($this.height) $img.width = $this.height

            $figure.style.height = `${$img.width}px`
            $figure.style.width = `${$img.height}px`
          } else {
            if ($this.height) $img.height = $this.height
            if ($this.width) $img.width = $this.height

            $figure.style.width = `${$img.width}px`
            $figure.style.height = `${$img.height}px`
          }

          const m = $img.width / 8
          $this.style.setProperty('--magic', m)
        }
      }
    })
  }

  get src () {
    return this.getAttribute('src')
  }

  set src (val) {
    return this.setAttribute('src', val)
  }

  get width () {
    return this.hasAttribute('width') ? this.getAttribute('width') : null
  }

  set width (val) {
    return this.setAttribute('width', val)
  }

  get height () {
    return this.hasAttribute('height') ? this.getAttribute('height') : null
  }

  set height (val) {
    return this.setAttribute('height', val)
  }

  get alt () {
    return this.hasAttribute('alt') ? this.getAttribute('alt') : null
  }

  set alt (val) {
    return this.setAttribute('alt', val)
  }

  disconnectedCallback () {
    if (this.debug) console.log('disconnection img-exif')
  }

  adoptedCallback () {
    if (this.debug) console.log('adopted img-exif')
  }

  static get observedAttributes () {
    return ['src', 'width', 'height', 'alt']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    if (this.debug) console.log(`attribute changed on img-exif: ${attrName}, ${oldVal} => ${newVal}`)

    const changes = {
      src: () => { if (oldVal !== newVal) this.render() },
      width: () => { if (oldVal !== newVal) this.render() },
      height: () => { if (oldVal !== newVal) this.render() },
      alt: () => { if (oldVal !== newVal) this.render() }
    }

    if (attrName in changes) changes[attrName]()
  }
}

window.customElements.define('img-exif', ImageExif)
